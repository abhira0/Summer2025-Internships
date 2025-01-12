# backend/app/core/config.py
from pydantic_settings import BaseSettings
from typing import Optional
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

class Settings(BaseSettings):
    # Project metadata
    PROJECT_NAME: str = "Internship Tracker"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 90  # 90 days
    
    # Server settings
    SERVER_PORT: int
    PORT: int
    
    # Database
    MONGODB_URL: str
    
    # CORS
    FRONTEND_URL: str = "http://localhost:5173"  # Default value, override in .env

    class Config:
        env_file = "../../.env"  # Adjust the path to point to the root .env file
        case_sensitive = True

settings = Settings()