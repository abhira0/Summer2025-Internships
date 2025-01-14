# backend/routers/applications.py
from fastapi import APIRouter, Depends, HTTPException
from backend.schemas.application import ApplicationUpdate, ApplicationResponse
from backend.dependencies import get_current_user
from backend.utils.db import get_database
import json
import os

router = APIRouter()

async def get_parsed_data(username: str):
    """Helper function to get parsed data from cache"""
    try:
        file_path = f"cache/{username}/parsed.json"
        if not os.path.exists(file_path):
            return []
        with open(file_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading parsed data: {str(e)}")
        return []

@router.get("", response_model=ApplicationResponse)
async def get_applications(current_user: dict = Depends(get_current_user)):
    db = get_database()
    username = current_user["username"]
    applications = await db.applications.find_one(
        {"username": username}
    ) or {"applications": {username: {"applied": [], "hidden": []}}}
    print(applications)

    # Get parsed data from cache
    parsed_data = await get_parsed_data(username)
    
    all_applied_jobs = set(applications["applications"][username]["applied"])
    for job in parsed_data:
        status_events = job.get("status_events", [])
        for event in status_events:
            if event.get("status") == "applied" and job.get("job_posting_id"):
                all_applied_jobs.add(job.get("job_posting_id"))
                break
    # Combine both sources
    applications["applications"][username]["applied"] = list(all_applied_jobs)
    
    print(applications)
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