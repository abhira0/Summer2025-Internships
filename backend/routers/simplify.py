from fastapi import APIRouter, Depends, HTTPException, Header
from typing import Optional
import httpx
import json
from ..dependencies import get_current_user
from backend.core.config import settings
from io import BytesIO
from fastapi import Body
from backend.utils.db import get_database

import os
from ..utils import parse_simplify

import nc_py_api

router = APIRouter()

NEXTCLOUD_CLIENT = nc_py_api.Nextcloud(nextcloud_url="https://hulkinblue.dragon.usbx.me/nextcloud", nc_auth_user=settings.NEXTCLOUD_USER, nc_auth_pass=settings.NEXTCLOUD_PASSWORD)

async def fetch_all_results(cookies: str, page_size: int = 500, page_max: Optional[int] = None):
# async def fetch_all_results(cookies: str, page_size: int = 500, page_max: Optional[int] = None):
    all_results = []
    total_pages = 1
    page = 0
    base_url = 'https://api.simplify.jobs/v2/candidate/me/tracker/?value=&archived=false'

    # Parse cookies
    cookie_dict = {}
    for cookie in cookies.split('; '):
        if '=' in cookie:
            name, value = cookie.split('=', 1)
            cookie_dict[name] = value

    # Prepare headers
    headers = {
        'accept': '*/*',
        'content-type': 'application/json',
        'x-csrf-token': cookie_dict.get('csrf', ''),
        'referer': 'https://simplify.jobs/',
        'origin': 'https://simplify.jobs',
        'cookie': cookies
    }

    async with httpx.AsyncClient() as client:
        while page < total_pages and (page_max is None or page < page_max):
            url = f"{base_url}&page={page}&size={page_size}"
            
            response = await client.get(url, headers=headers)
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Failed to fetch data from Simplify API: {response.text}"
                )

            data = response.json()

            if 'items' in data and data['items']:
                all_results.extend(data['items'])
            
            page += 1
            
            if page == 1 and 'pages' in data:
                total_pages = data['pages']

    return all_results

@router.get("/tracker")
async def get_tracker(
    cookies: str = Header(...),
    current_user: dict = Depends(get_current_user)
):
    try:
        results = await fetch_all_results(cookies)
        return {"items": results}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch tracker data: {str(e)}"
        )

def save_at_cloud(username: str, data: dict):
    """Save tracker data to Nextcloud storage"""
    json_data = json.dumps(data)
    file_like = BytesIO(json_data.encode('utf-8'))
    try:
        NEXTCLOUD_CLIENT.files.mkdir(f"simplify_tracker_data/{username}")
    except:
        pass
    NEXTCLOUD_CLIENT.files.upload_stream(
        f"simplify_tracker_data/{username}/raw.json",
        file_like
    )

@router.post("/nextcloud/tracker")
async def post_tracker(
    cookies: str = Header(...),
    current_user: dict = Depends(get_current_user)
):
    try:
        # Fetch all results from Simplify
        results = await fetch_all_results(cookies)
        
        # Save to Nextcloud
        save_at_cloud(current_user["username"], results)
        
        return {
            "message": "Tracker data fetched and saved successfully",
            "items_count": len(results)
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch and save tracker data: {str(e)}"
        )

@router.post("/refresh")
async def post_tracker_local(
    current_user: dict = Depends(get_current_user)
):
    # try:
        # Get cookie from database
        db = get_database()
        user = await db.users.find_one({"username": current_user["username"]})
        if not user or "simplify_cookie" not in user:
            raise HTTPException(
                status_code=404,
                detail="Simplify cookie not found"
            )
            
        # Fetch all results from Simplify
        results = await fetch_all_results(user["simplify_cookie"])
        
        # Create directory if it doesn't exist
        os.makedirs(f"cache/{current_user['username']}", exist_ok=True)
        
        # Save to local file
        with open(f"cache/{current_user['username']}/raw.json", 'w') as f:
            json.dump(results, f)
        
        parse_simplify.main(f"cache/{current_user['username']}/raw.json", f"cache/{current_user['username']}/parsed.json")
        
        return {
            "message": "Tracker data fetched and saved locally",
            "items_count": len(results)
        }
    # except Exception as e:
    #     raise HTTPException(
    #         status_code=500,
    #         detail=f"Failed to fetch and save tracker data locally: {str(e)}"
    #     )

@router.get("/parsed")
async def get_parsed(
    current_user: dict = Depends(get_current_user)
):
    try:
        file_path = f"cache/{current_user['username']}/parsed.json"
        if not os.path.exists(file_path):
            raise HTTPException(
                status_code=404,
                detail="Parsed data not found. Please refresh the tracker first."
            )
            
        with open(file_path, 'r') as f:
            data = json.load(f)
            
        return data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to read parsed data: {str(e)}"
        )


@router.put("/cookie")
async def update_simplify_cookie(
    cookie: str = Body(..., embed=True),  # Changed to expect JSON body
    current_user: dict = Depends(get_current_user)
):
    """Update user's Simplify cookie"""
    
    db = get_database()
    try:
        await db.users.update_one(
            {"username": current_user["username"]},
            {"$set": {"simplify_cookie": cookie}}
        )
        return {"message": "Simplify cookie updated successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update Simplify cookie: {str(e)}"
        )

@router.get("/cookie")
async def get_simplify_cookie(
    current_user: dict = Depends(get_current_user)
):
    """Get user's Simplify cookie from MongoDB"""
    db = get_database()
    try:
        user = await db.users.find_one({"username": current_user["username"]})
        if not user or "simplify_cookie" not in user:
            raise HTTPException(
                status_code=404,
                detail="Simplify cookie not found"
            )
        return {"cookie": user["simplify_cookie"]}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get Simplify cookie: {str(e)}"
        )