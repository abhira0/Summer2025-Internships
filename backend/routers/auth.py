# backend/app/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status, Body, Query
from fastapi.security import OAuth2PasswordRequestForm
from backend.core.security import create_access_token, get_password_hash, verify_password
from backend.schemas.user import UserCreate, Token
from backend.utils.db import get_database
from datetime import timedelta, datetime, timezone
from backend.core.config import settings
from backend.dependencies import get_current_user

router = APIRouter()

@router.post("/register", response_model=dict)
async def register(user: UserCreate):
    db = get_database()
    if await db.users.find_one({"username": user.username}):
        raise HTTPException(
            status_code=400,
            detail="Username already registered"
        )
    
    hashed_password = get_password_hash(user.password)
    # default new users to role "user"
    user_in_db = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_password,
        "role": user.role if hasattr(user, "role") and user.role in ["user", "admin"] else "user",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    
    result = await db.users.insert_one(user_in_db)
    return {"message": "User created successfully"}

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = get_database()
    user = await db.users.find_one({"username": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    # include role claim for frontend visibility and backend checks
    access_token = create_access_token(
        data={"sub": user["username"], "role": user.get("role", "user")}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=dict)
async def me(current_user: dict = Depends(get_current_user)):
    # Return a safe subset of user fields including saved rules for convenience
    db = get_database()
    user = await db.users.find_one({"username": current_user.get("username")})
    filter_rules = user.get("filter_rules") if user else None
    sort_rules = user.get("sort_rules") if user else None
    return {
        "username": current_user.get("username"),
        "email": current_user.get("email"),
        "role": current_user.get("role", "user"),
        "filter_rules": filter_rules or [],
        "sort_rules": sort_rules or [],
    }


@router.get("/users", response_model=dict)
async def list_users(
    _: dict = Depends(get_current_user),
    page: int = Query(1, ge=1),
    size: int = Query(25, ge=1, le=200),
):
    """Admin-only: list users with pagination."""
    from backend.dependencies import require_admin
    await require_admin(_)
    db = get_database()
    total = await db.users.count_documents({})
    skip = (page - 1) * size
    cursor = (
        db.users
        .find({}, {"hashed_password": 0})
        .sort("created_at", -1)
        .skip(skip)
        .limit(size)
    )
    users = []
    async for u in cursor:
        if "_id" in u:
            u["_id"] = str(u["_id"])  # serialize
        users.append(u)
    total_pages = max(1, (total + size - 1) // size)
    return {"users": users, "page": page, "size": size, "total": total, "total_pages": total_pages}


@router.put("/me/rules", response_model=dict)
async def save_rules(
    payload: dict = Body(...),
    current_user: dict = Depends(get_current_user)
):
    """Save filter_rules and/or sort_rules for the current user.
    Payload may include either or both keys: { "filter_rules": [...], "sort_rules": [...] }
    """
    db = get_database()
    updates = {}
    if "filter_rules" in payload:
        updates["filter_rules"] = payload.get("filter_rules") or []
    if "sort_rules" in payload:
        updates["sort_rules"] = payload.get("sort_rules") or []
    if not updates:
        raise HTTPException(status_code=400, detail="Nothing to update")
    await db.users.update_one({"username": current_user["username"]}, {"$set": updates})
    return {"ok": True}


@router.delete("/me/rules", response_model=dict)
async def delete_rules(
    payload: dict = Body(None),
    current_user: dict = Depends(get_current_user)
):
    """Delete saved rules. If payload includes keys, delete only those; else delete both."""
    db = get_database()
    to_unset = {}
    keys = set()
    if payload and isinstance(payload, dict):
        if payload.get("filter_rules", True):
            keys.add("filter_rules")
        if payload.get("sort_rules", True):
            keys.add("sort_rules")
    else:
        keys = {"filter_rules", "sort_rules"}
    for k in keys:
        to_unset[k] = ""
    if not to_unset:
        raise HTTPException(status_code=400, detail="Nothing to delete")
    await db.users.update_one({"username": current_user["username"]}, {"$unset": to_unset})
    return {"ok": True}
