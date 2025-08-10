# backend/app/utils/db.py
from motor.motor_asyncio import AsyncIOMotorClient
from backend.core.config import settings
import logging
from typing import Optional

logger = logging.getLogger(__name__)

DB_NAME = "internship-tracker"

class Database:
    client: Optional[AsyncIOMotorClient] = None
    
    @classmethod
    def get_db(cls) -> AsyncIOMotorClient:
        if cls.client is None:
            raise ConnectionError("Database connection not established")
        return cls.client.get_database(DB_NAME)

def get_database() -> AsyncIOMotorClient:
    if Database.client is None:
        raise ConnectionError("Database connection not established")
    return Database.client.get_database(DB_NAME)

async def connect_to_mongo():
    try:
        Database.client = AsyncIOMotorClient(settings.MONGODB_URL)
        # Verify connection
        await Database.client.admin.command('ping')
        logger.info("Successfully connected to MongoDB")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {str(e)}")
        raise

async def close_mongo_connection():
    try:
        if Database.client is not None:
            Database.client.close()
            Database.client = None
            logger.info("MongoDB connection closed")
    except Exception as e:
        logger.error(f"Error closing MongoDB connection: {str(e)}")
        raise