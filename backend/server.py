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
    """Get all categories for a specific type (mythology or moral)"""
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
    ]
    
    if category_type == "mythology":
        return mythology_categories
    elif category_type == "moral":
        return moral_categories
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

# Initialize sample data
@api_router.post("/init-data")
async def initialize_sample_data():
    """Initialize the database with sample stories"""
    
    # Check if data already exists
    existing_stories = await db.stories.count_documents({})
    if existing_stories > 0:
        return {"message": "Sample data already exists"}
    
    sample_stories = [
        {
            "id": "hanuman-sun",
            "title": "Hanuman Flies to the Sun",
            "category": "hanuman",
            "description": "The brave monkey god's amazing adventure",
            "slides": [
                {
                    "image": "https://images.pexels.com/photos/8051165/pexels-photo-8051165.jpeg",
                    "telugu": "హనుమాన్ ఒక చిన్న వానరుడు. అతను సూర్యుడిని పండుగ అని అనుకున్నాడు.",
                    "english": "Little Hanuman saw the bright sun and thought it was a delicious fruit.",
                    "audio": "hanuman-slide-1.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1743964451734-90a90b395a84",
                    "telugu": "హనుమాన్ సూర్యుడి వైపు దూకాడు. అతను చాలా వేగంగా ఎగిరాడు.",
                    "english": "Brave Hanuman leaped towards the sun, flying faster and faster through the sky.",
                    "audio": "hanuman-slide-2.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1632302937441-3dcd8af686e5",
                    "telugu": "దేవతలు భయపడ్డారు. వారు హనుమాన్‌ను ఆపాలని అనుకున్నారు.",
                    "english": "The gods were worried and decided they must stop little Hanuman.",
                    "audio": "hanuman-slide-3.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1696527014256-4755b3ac0b4a",
                    "telugu": "నైతిక పాఠం: ధైర్యం మంచిది, కానీ జ్ఞానంతో కూడా ఉండాలి.",
                    "english": "Moral: Courage is good, but it should be combined with wisdom.",
                    "audio": "hanuman-moral.mp3"
                }
            ]
        },
        {
            "id": "lion-mouse",
            "title": "The Lion and the Mouse",
            "category": "animal-fables",
            "description": "A small act of kindness saves the day",
            "slides": [
                {
                    "image": "https://images.unsplash.com/photo-1743964451734-90a90b395a84",
                    "telugu": "ఒక పెద్ద సింహం అడవిలో నిద్రపోతూ ఉండేది.",
                    "english": "A big lion was sleeping peacefully in the forest.",
                    "audio": "lion-slide-1.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1742404894161-75ef71f65be0",
                    "telugu": "ఒక చిన్న ఎలుక సింహం మీద పరిగెత్తింది.",
                    "english": "A tiny mouse ran across the lion and woke him up.",
                    "audio": "lion-slide-2.mp3"
                },
                {
                    "image": "https://images.pexels.com/photos/33443603/pexels-photo-33443603.jpeg",
                    "telugu": "ఎలుక సింహాన్ని కబళింపజేయకుండా వేటగాళ్ళ వలల నుండి రక్షించింది.",
                    "english": "The little mouse helped free the lion from hunters' nets.",
                    "audio": "lion-slide-3.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1696527018053-3343b9853505",
                    "telugu": "నైతిక పాఠం: చిన్న సహాయం కూడా పెద్ద మార్పు తీసుకురాగలదు.",
                    "english": "Moral: Even small acts of kindness can make a big difference.",
                    "audio": "lion-moral.mp3"
                }
            ]
        }
    ]
    
    for story_data in sample_stories:
        story = Story(**story_data)
        await db.stories.insert_one(story.dict())
    
    return {"message": f"Initialized {len(sample_stories)} sample stories"}

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