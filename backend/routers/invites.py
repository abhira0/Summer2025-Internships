from fastapi import APIRouter, Depends, HTTPException, status, Body, Query
from backend.dependencies import require_admin
from backend.utils.db import get_database
from typing import Optional
from datetime import datetime, timedelta, timezone
import secrets
from backend.core.security import get_password_hash

router = APIRouter()


def now_utc() -> datetime:
    return datetime.now(timezone.utc)


def to_aware_utc(value) -> datetime:
    """Normalize various datetime representations to timezone-aware UTC.

    - If `value` is an ISO string, parse it (supporting trailing 'Z').
    - If naive, assume UTC.
    - If aware, convert to UTC.
    - Fallback to `now_utc()`.
    """
    try:
        if isinstance(value, str):
            # Handle common 'Z' suffix by replacing with +00:00 to satisfy fromisoformat
            normalized = value.replace("Z", "+00:00") if value.endswith("Z") else value
            parsed = datetime.fromisoformat(normalized)
            value_dt = parsed
        elif isinstance(value, datetime):
            value_dt = value
        else:
            return now_utc()

        if value_dt.tzinfo is None:
            # Assume UTC for naive datetimes
            value_dt = value_dt.replace(tzinfo=timezone.utc)
        else:
            value_dt = value_dt.astimezone(timezone.utc)
        return value_dt
    except Exception:
        return now_utc()


@router.get("")
async def list_invites(
    _: dict = Depends(require_admin),
    page: int = Query(1, ge=1),
    size: int = Query(25, ge=1, le=200),
):
    db = get_database()
    query_filter = {"is_deleted": {"$ne": True}}
    total = await db.invites.count_documents(query_filter)
    skip = (page - 1) * size
    invites_list = []
    async for inv in (
        db.invites
        .find(query_filter)
        .sort("created_at", -1)
        .skip(skip)
        .limit(size)
    ):
        inv["_id"] = str(inv.get("_id")) if inv.get("_id") is not None else None
        invites_list.append(inv)
    total_pages = max(1, (total + size - 1) // size)
    return {"invites": invites_list, "page": page, "size": size, "total": total, "total_pages": total_pages}


@router.post("")
async def create_invite(
    payload: dict = Body(...),
    current_admin: dict = Depends(require_admin),
):
    email = (payload or {}).get("email")
    expires_in_days: int = int((payload or {}).get("expiresInDays", 7))
    if not email:
        raise HTTPException(status_code=400, detail="email is required")
    if expires_in_days < 1 or expires_in_days > 90:
        raise HTTPException(status_code=400, detail="expiresInDays must be between 1 and 90")

    db = get_database()
    token = secrets.token_urlsafe(24)
    created_at = now_utc()
    expires_at = created_at + timedelta(days=expires_in_days)
    invite = {
        "token": token,
        "email": email,
        "created_by": current_admin.get("username"),
        "created_at": created_at.isoformat(),
        "expires_at": expires_at.isoformat(),
        "is_used": False,
        "is_deleted": False,
    }
    result = await db.invites.insert_one(invite)
    # Motor/PyMongo mutates the original dict to include _id; ensure it's JSON-serializable
    if "_id" in invite:
        try:
            invite["_id"] = str(invite["_id"])  # type: ignore[assignment]
        except Exception:
            invite["_id"] = str(result.inserted_id) if getattr(result, "inserted_id", None) else None
    return {"invite": invite}


@router.get("/{token}")
async def get_invite(token: str):
    db = get_database()
    invite = await db.invites.find_one({"token": token})
    if not invite:
        return {"valid": False}
    # Deleted invites are invalid
    if invite.get("is_deleted"):
        return {
            "valid": False,
            "invite": {
                "email": invite.get("email"),
                "token": invite.get("token"),
                "expires_at": invite.get("expires_at"),
                "is_used": bool(invite.get("is_used")),
            },
            "isExpired": None,
            "isUsed": bool(invite.get("is_used")),
        }
    # derive status
    expires_at = to_aware_utc(invite.get("expires_at"))
    is_expired = expires_at < now_utc()
    is_used = bool(invite.get("is_used"))
    return {
        "valid": (not is_expired) and (not is_used),
        "invite": {
            "email": invite.get("email"),
            "token": invite.get("token"),
            "expires_at": invite.get("expires_at"),
            "is_used": is_used,
        },
        "isExpired": is_expired,
        "isUsed": is_used,
    }


@router.post("/redeem")
async def redeem_invite(payload: dict = Body(...)):
    db = get_database()
    token = (payload or {}).get("token")
    username = (payload or {}).get("username")
    password = (payload or {}).get("password")
    if not token:
        raise HTTPException(status_code=422, detail="token is required")
    if not username:
        raise HTTPException(status_code=422, detail="username is required")
    if not password or len(str(password)) < 6:
        raise HTTPException(status_code=422, detail="password must be at least 6 characters")

    invite = await db.invites.find_one({"token": token})
    if not invite:
        raise HTTPException(status_code=400, detail="Invalid invite")

    expires_at = datetime.fromisoformat(invite["expires_at"]) if isinstance(invite.get("expires_at"), str) else invite.get("expires_at", now_utc())
    if expires_at < now_utc():
        raise HTTPException(status_code=400, detail="Invite expired")
    if invite.get("is_used"):
        raise HTTPException(status_code=400, detail="Invite already used")
    if invite.get("is_deleted"):
        raise HTTPException(status_code=400, detail="Invite is no longer valid")

    # Ensure username is unique
    if await db.users.find_one({"username": username}):
        raise HTTPException(status_code=400, detail="Username already taken")

    # Create user with email from invite
    try:
        user_doc = {
            "username": username,
            "email": invite.get("email"),
            "hashed_password": get_password_hash(password),
            "role": "user",
            "created_at": now_utc().isoformat(),
        }
        await db.users.insert_one(user_doc)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")

    await db.invites.update_one({"token": token}, {"$set": {"is_used": True}})
    return {"ok": True}


@router.delete("/{token}")
async def delete_invite(token: str, _: dict = Depends(require_admin)):
    """Soft delete an invite by marking it as deleted."""
    db = get_database()
    res = await db.invites.update_one({"token": token}, {"$set": {"is_deleted": True}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Invite not found")
    return {"ok": True}


