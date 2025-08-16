from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
from complete_focused_stories import COMPREHENSIVE_STORIES_FULL

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="My Little Storybook API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Pydantic models
class Story(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    description: str
    slides: List[dict]
    created_at: datetime = Field(default_factory=datetime.utcnow)

class StoryCreate(BaseModel):
    title: str
    category: str
    description: str
    slides: List[dict]

class Category(BaseModel):
    id: str
    name: str
    type: str  # 'mythology' or 'moral'
    emoji: str
    description: Optional[str] = None

# API Routes
@api_router.get("/")
async def root():
    return {"message": "My Little Storybook API is running!"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Categories endpoints
@api_router.get("/categories/{category_type}")
async def get_categories(category_type: str):
    """Get all categories for a specific type (mythology, moral, aarna, or history)"""
    mythology_categories = [
        {"id": "krishna", "name": "Krishna", "type": "mythology", "emoji": "🦚"},
        {"id": "hanuman", "name": "Hanuman", "type": "mythology", "emoji": "🐒"},
        {"id": "ganesha", "name": "Ganesha", "type": "mythology", "emoji": "🐘"},
        {"id": "rama", "name": "Rama", "type": "mythology", "emoji": "🏹"},
        {"id": "shiva", "name": "Shiva", "type": "mythology", "emoji": "🔱"},
        {"id": "durga", "name": "Durga", "type": "mythology", "emoji": "👑"},
        {"id": "lakshmi", "name": "Lakshmi", "type": "mythology", "emoji": "🪷"},
        {"id": "saraswati", "name": "Saraswati", "type": "mythology", "emoji": "🎼"},
    ]
    
    moral_categories = [
        {"id": "panchatantra", "name": "Panchatantra Tales", "type": "moral", "emoji": "🦊"},
        {"id": "animal-fables", "name": "Animal Fables", "type": "moral", "emoji": "🦁"},
        {"id": "classic-moral", "name": "Classic Moral Stories", "type": "moral", "emoji": "📚"},
        {"id": "friendship-stories", "name": "Friendship Stories", "type": "moral", "emoji": "🤝"},
        {"id": "kindness-stories", "name": "Kindness Stories", "type": "moral", "emoji": "💝"},
    ]
    
    aarna_categories = [
        {"id": "aarna-adventures", "name": "Aarna's Adventures", "type": "aarna", "emoji": "🌟"},
    ]
    
    history_categories = [
        {"id": "ramayana", "name": "Ramayana Stories", "type": "history", "emoji": "🏹"},
        {"id": "mahabharata", "name": "Mahabharata Stories", "type": "history", "emoji": "⚔️"},
    ]
    
    if category_type == "mythology":
        return mythology_categories
    elif category_type == "moral":
        return moral_categories
    elif category_type == "aarna":
        return aarna_categories
    elif category_type == "history":
        return history_categories
    else:
        raise HTTPException(status_code=404, detail="Category type not found")

# Stories endpoints
@api_router.get("/stories")
async def get_all_stories():
    """Get all stories"""
    stories = await db.stories.find().to_list(1000)
    return [Story(**story) for story in stories]

@api_router.get("/stories/category/{category_id}")
async def get_stories_by_category(category_id: str):
    """Get all stories for a specific category"""
    stories = await db.stories.find({"category": category_id}).to_list(1000)
    return [Story(**story) for story in stories]

@api_router.get("/stories/{story_id}")
async def get_story(story_id: str):
    """Get a specific story by ID"""
    story = await db.stories.find_one({"id": story_id})
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    return Story(**story)

@api_router.post("/stories", response_model=Story)
async def create_story(story_data: StoryCreate):
    """Create a new story"""
    story = Story(**story_data.dict())
    await db.stories.insert_one(story.dict())
    return story

@api_router.put("/stories/{story_id}", response_model=Story)
async def update_story(story_id: str, story_data: StoryCreate):
    """Update an existing story"""
    existing_story = await db.stories.find_one({"id": story_id})
    if not existing_story:
        raise HTTPException(status_code=404, detail="Story not found")
    
    updated_data = story_data.dict()
    updated_data["id"] = story_id
    updated_data["created_at"] = existing_story["created_at"]
    
    story = Story(**updated_data)
    await db.stories.replace_one({"id": story_id}, story.dict())
    return story

@api_router.delete("/stories/{story_id}")
async def delete_story(story_id: str):
    """Delete a story"""
    result = await db.stories.delete_one({"id": story_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Story not found")
    return {"message": "Story deleted successfully"}

# Initialize comprehensive sample data
@api_router.post("/init-data")
async def initialize_sample_data():
    """Initialize the database with comprehensive sample stories"""
    
    # Check if data already exists
    existing_stories = await db.stories.count_documents({})
    if existing_stories > 50:  # Allow re-init if we have fewer stories
        return {"message": "Comprehensive story data already exists"}
    
    # Clear existing data for fresh start
    await db.stories.delete_many({})
    
    # Use the comprehensive stories from our external file
    for story_data in COMPREHENSIVE_STORIES_FULL:
        story = Story(**story_data)
        await db.stories.insert_one(story.dict())
    
    return {"message": f"Initialized {len(COMPREHENSIVE_STORIES_FULL)} comprehensive stories"}

# Include the router in the main app
app.include_router(api_router)

# Serve static files (for images and audio)
static_dir = ROOT_DIR / "static"
static_dir.mkdir(exist_ok=True)

# Mount static files
app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("My Little Storybook API starting up...")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("My Little Storybook API shutting down...")
    client.close()

# Root endpoint for health check
@app.get("/")
async def root():
    return {"message": "My Little Storybook API", "status": "running"}