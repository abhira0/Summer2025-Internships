# In backend/dependencies.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from backend.core.config import settings
from backend.utils.db import get_database

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    print("=== Auth Debug ===")
    print("Received token:", token[:20] + "..." if token else None)
    
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username: str = payload.get("sub")
        print("Decoded username:", username)
        
        if username is None:
            print("No username in token")
            raise credentials_exception
            
        db = get_database()
        user = await db.users.find_one({"username": username})
        print("Found user:", bool(user))
        
        if user is None:
            print("User not found in database")
            raise credentials_exception
            
        return user
        
    except JWTError as e:
        print("JWT Error:", str(e))
        raise credentials_exception
    except Exception as e:
        print("Unexpected error:", str(e))
        raise credentials_exception