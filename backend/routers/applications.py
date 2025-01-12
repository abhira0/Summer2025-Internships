
# backend/app/routers/applications.py
from fastapi import APIRouter, Depends, HTTPException
from backend.schemas.application import ApplicationUpdate, ApplicationResponse
from backend.dependencies import get_current_user
from backend.utils.db import get_database

router = APIRouter()

@router.get("", response_model=ApplicationResponse)
async def get_applications(current_user: dict = Depends(get_current_user)):
    db = get_database()
    applications = await db.applications.find_one(
        {"username": current_user["username"]}
    ) or {"applications": {current_user["username"]: {"applied": [], "hidden": []}}}
    return applications

@router.post("", response_model=ApplicationResponse)
async def update_application(
    application: ApplicationUpdate,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    username = current_user["username"]
    
    # Get or create user's applications
    user_applications = await db.applications.find_one({"username": username})
    if not user_applications:
        user_applications = {
            "username": username,
            "applications": {username: {"applied": [], "hidden": []}}
        }
    
    apps = user_applications["applications"][username]
    status_list = apps.get(application.status, [])
    
    if application.value and application.job_id not in status_list:
        status_list.append(application.job_id)
    elif not application.value and application.job_id in status_list:
        status_list.remove(application.job_id)
    
    apps[application.status] = status_list
    
    await db.applications.update_one(
        {"username": username},
        {"$set": user_applications},
        upsert=True
    )
    
    return user_applications