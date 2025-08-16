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
    if existing_stories > 10:  # Allow re-init if we have fewer stories
        return {"message": "Sample data already exists"}
    
    # Clear existing data for fresh start
    await db.stories.delete_many({})
    
    sample_stories = [
        # Hindu Mythology Stories
        {
            "id": "hanuman-sun",
            "title": "Hanuman Flies to the Sun",
            "category": "hanuman",
            "description": "The brave monkey god's amazing adventure",
            "slides": [
                {
                    "image": "https://images.unsplash.com/photo-1730191567375-e82ce67160df",
                    "telugu": "చిన్న హనుమాన్ ఒక తెలివైన మరియు బలమైన వానర బాలుడు. అతను ఎల్లప్పుడూ ఆట మరియు రోమాంచకమైన సాహసాలను వెతుకుతూ ఉండేవాడు.",
                    "english": "Little Hanuman was a clever and strong monkey child. He was always looking for games and exciting adventures.",
                    "audio": "hanuman-slide-1.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1525490829609-d166ddb58678",
                    "telugu": "ఒక ఉదయం హనుమాన్ ఆకాశంలో మెరుస్తున్న పెద్ద ఎర్రని సూర్యుడిని చూశాడు. \"అది ఎంత అందమైన పండు!\" అని అనుకున్నాడు.",
                    "english": "One morning, Hanuman saw the big, bright red sun shining in the sky. \"What a beautiful fruit!\" he thought.",
                    "audio": "hanuman-slide-2.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1654463085571-85d4edcea4dc",
                    "telugu": "హనుమాన్ గాలిలో దూకి, తన దైవిక శక్తులను ఉపయోగించి సూర్యుడి వైపు వేగంగా ఎగరడం మొదలుపెట్టాడు. అతను మేఘాలను దాటి వెళ్ళాడు.",
                    "english": "Hanuman jumped into the air and started flying fast towards the sun using his divine powers. He soared past the clouds.",
                    "audio": "hanuman-slide-3.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1604949210966-9440c324823f",
                    "telugu": "హనుమాన్ వేగంగా ఎగురుతుండగా, సూర్యుడు మరింత పెద్దదిగా మరియు మరింత వేడిమిగా అయ్యాడు. కానీ హనుమాన్ భయపడలేదు.",
                    "english": "As Hanuman flew faster, the sun became bigger and hotter. But Hanuman was not afraid.",
                    "audio": "hanuman-slide-4.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1579539447503-ec82f0aab843",
                    "telugu": "అప్పుడు దేవతలు హనుమాన్‌ని చూశారు. వారు చాలా ఆశ్చర్యపోయారు మరియు భయపడ్డారు. \"ఈ చిన్న వానరుడు సూర్యుడిని తింటే ప్రపంచం చీకటిలో మునిగిపోతుంది!\" అని వారు అనుకున్నారు.",
                    "english": "Then the gods saw Hanuman. They were very surprised and worried. \"If this little monkey eats the sun, the world will be in darkness!\" they thought.",
                    "audio": "hanuman-slide-5.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1654463084969-339ebab5c207",
                    "telugu": "ఇంద్రుడు తన వజ్రాయుధాన్ని హనుమాన్ మీద విసిరాడు. హనుమాన్ భూమి మీద పడ్డాడు, కానీ అతను గాయపడలেదు. అతని తల్లి అతనిని కౌగిలించుకుంది.",
                    "english": "Indra threw his thunderbolt at Hanuman. Hanuman fell to earth, but he was not badly hurt. His mother hugged him tight.",
                    "audio": "hanuman-slide-6.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1696527014256-4755b3ac0b4a",
                    "telugu": "దేవతలు హనుమాన్‌కు చాలా ఆశీర్వాదాలు ఇచ్చారు. అప్పటి నుండి హనుమాన్ ఎల్లప్పుడూ మంచి కోసం తన శక్తులను ఉపయోగించాడు.",
                    "english": "The gods gave Hanuman many blessings. From that day on, Hanuman always used his powers for good.",
                    "audio": "hanuman-slide-7.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1696527018053-3343b9853505",
                    "telugu": "నైతిక పాఠం: ధైర్యం మంచిది, కానీ జ్ఞానం మరియు వినయంతో కూడా ఉండాలి. మన శక్తులను ఎల్లప్పుడూ మంచి కార్యాలకు ఉపయోగించాలి.",
                    "english": "Moral: Courage is good, but it should be combined with wisdom and humility. We should always use our powers for good deeds.",
                    "audio": "hanuman-moral.mp3"
                }
            ]
        },
        {
            "id": "krishna-butter",
            "title": "Krishna and the Butter Pot",
            "category": "krishna",
            "description": "Little Krishna's mischievous adventures",
            "slides": [
                {
                    "image": "https://images.unsplash.com/photo-1641730259879-ad98e7db7bcb",
                    "telugu": "చిన్న కృష్ణుడు చాలా కృష్ణుడు మరియు చిలిపిగా ఉండేవాడు. అతను వెన్న తినడానికి చాలా ఇష్టపడేవాడు.",
                    "english": "Little Krishna was very playful and mischievous. He loved eating butter more than anything else.",
                    "audio": "krishna-butter-1.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1655577480801-2781cb89d628",
                    "telugu": "ప్రతిరోజూ కృష్ణుడు తన స్నేహితులతో కలిసి ఇంట్లో ఉన్న వెన్న కుండలను దొంగిలించేవాడు.",
                    "english": "Every day Krishna would steal butter pots from houses with his friends.",
                    "audio": "krishna-butter-2.mp3"
                },
                {
                    "image": "https://images.pexels.com/photos/33444855/pexels-photo-33444855.jpeg",
                    "telugu": "ఒక రోజు యశోద మాత కృష్ణుడిని పట్టుకుని, చెట్టుకు కట్టేసింది. కానీ కృష్ణుడు రెండు చెట్లను లాగి పడగొట్టాడు.",
                    "english": "One day Mother Yashoda caught Krishna and tied him to a tree. But Krishna pulled down two trees.",
                    "audio": "krishna-butter-3.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1696527014256-4755b3ac0b4a",
                    "telugu": "నైతిక పాఠం: చిలిపితనం సరే కానీ తల్లిదండ్రుల మాట వినాలి.",
                    "english": "Moral: Mischief is okay, but we should listen to our parents.",
                    "audio": "krishna-butter-moral.mp3"
                }
            ]
        },
        
        # Enhanced Lion and Mouse Story
        {
            "id": "lion-mouse",
            "title": "The Lion and the Mouse",
            "category": "animal-fables",
            "description": "A small act of kindness saves the day",
            "slides": [
                {
                    "image": "https://images.unsplash.com/photo-1694094537357-57cb4fb17bcc",
                    "telugu": "ఒక పెద్ద అడవిలో ఒక గర్వంగా ఉండే సింహం నివసించేది. అతను రాజులా గర్వంగా నడిచేవాడు మరియు అందరూ అతనికి భయపడేవారు.",
                    "english": "In a big forest lived a proud lion. He walked like a king with great pride, and everyone was afraid of him.",
                    "audio": "lion-slide-1.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1525490829609-d166ddb58678",
                    "telugu": "ఒక వేడిమిగిన మధ్యాహ్నం, సింహం ఒక చెట్టు కింద నిద్రపోతూ ఉండేవాడు. అతను గల గలలాడుతూ గాఢనిద్రలో ఉండేవాడు.",
                    "english": "One hot afternoon, the lion was sleeping under a tree. He was snoring loudly in deep sleep.",
                    "audio": "lion-slide-2.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1531943865082-287018833410",
                    "telugu": "ఒక చిన్న ఎలుక ఆట ఆడుతూ సింహం మీద పరిగెత్తింది. సింహం లేచి కోపంగా ఎలుకను పట్టుకున్నాడు.",
                    "english": "A tiny mouse was playing and ran across the lion. The lion woke up and angrily caught the little mouse.",
                    "audio": "lion-slide-3.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1511172889608-21d24d0d1995",
                    "telugu": "\"దయచేసి నన్ను వదిలేయండి!\" ఎలుక వేడుకుంది. \"నేను చాలా చిన్నదాన్ని, కానీ ఒక రోజు మీకు సహాయం చేయగలను!\" సింహం నవ్వి ఎలుకను వదిలేసాడు.",
                    "english": "\"Please let me go!\" begged the mouse. \"I am very small, but one day I might be able to help you!\" The lion laughed and let the mouse go.",
                    "audio": "lion-slide-4.mp3"
                },
                {
                    "image": "https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg",
                    "telugu": "కొన్ని రోజుల తరువాత, వేటగాళ్ళు సింహాన్ని వలలో పట్టుకున్నారు. సింహం గట్టిగా గర్జించాడు కానీ తప్పించుకోలేకపోయాడు.",
                    "english": "A few days later, hunters caught the lion in a net. The lion roared loudly but could not escape.",
                    "audio": "lion-slide-5.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1531943865082-287018833410",
                    "telugu": "చిన్న ఎలుక సింహం గర్జన విని పరిగెత్తి వచ్చింది. ఆమె తన చిన్న దంతాలతో వలను కొరికి తెంచింది.",
                    "english": "The little mouse heard the lion roaring and ran to help. She chewed through the net with her tiny teeth.",
                    "audio": "lion-slide-6.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1694094537357-57cb4fb17bcc",
                    "telugu": "సింహం స్వేచ్చగా బయటపడ్డాడు. \"ధన్యవాదాలు, చిన్న స్నేహితుడా!\" అతను అన్నాడు. \"నీవు నిజంగా నాకు సహాయం చేశావు!\"",
                    "english": "The lion was free! \"Thank you, little friend!\" he said. \"You really did help me!\"",
                    "audio": "lion-slide-7.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1696527018053-3343b9853505",
                    "telugu": "నైతిక పాఠం: చిన్న సహాయం కూడా పెద్ద మార్పు తీసుకురాగలదు. ఎవరైనా చిన్న వారైనా లేదా పెద్దవారైనా, అందరూ ముఖ్యమైనవారు.",
                    "english": "Moral: Even small acts of kindness can make a big difference. Whether someone is small or big, everyone is important.",
                    "audio": "lion-moral.mp3"
                }
            ]
        },

        # New Panchatantra Story
        {
            "id": "monkey-crocodile",
            "title": "The Monkey and the Crocodile",
            "category": "panchatantra",
            "description": "A tale of quick thinking and friendship",
            "slides": [
                {
                    "image": "https://images.unsplash.com/photo-1531943865082-287018833410",
                    "telugu": "ఒక నదీతీరంలో ఒక మామిడి చెట్టు ఉండేది. ఆ చెట్టు మీద ఒక తెలివైన కోతి నివసించేది.",
                    "english": "By a river bank stood a mango tree. On this tree lived a clever monkey.",
                    "audio": "monkey-crocodile-1.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1525490829609-d166ddb58678",
                    "telugu": "నదిలో ఒక మొసలి నివసించేది. కోతి ప్రతిరోజూ తీపి మామిడిపండ్లను మొసలికి ఇచ్చేది.",
                    "english": "In the river lived a crocodile. Every day the monkey would give sweet mangoes to the crocodile.",
                    "audio": "monkey-crocodile-2.mp3"
                },
                {
                    "image": "https://images.pexels.com/photos/33461789/pexels-photo-33461789.jpeg",
                    "telugu": "మొసలి భార్య కోతి హృదయం తినాలని అనుకుంది. మొసలి కోతిని తన వీపుకు తీసుకెళ్లడానికి ఆహ్వానించింది.",
                    "english": "The crocodile's wife wanted to eat the monkey's heart. The crocodile invited the monkey to ride on his back.",
                    "audio": "monkey-crocodile-3.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1696527014256-4755b3ac0b4a",
                    "telugu": "కోతి తెలివిగా చెప్పింది: \"నా హృదయం చెట్టు మీద వదిలేసాను!\" మొసలి తిరిగి తీసుకెళ్లింది, కోతి చెట్టు ఎక్కి తప్పించుకుంది.",
                    "english": "The clever monkey said: \"I left my heart on the tree!\" The crocodile took him back, and the monkey escaped by climbing the tree.",
                    "audio": "monkey-crocodile-4.mp3"
                },
                {
                    "image": "https://images.unsplash.com/photo-1696527018053-3343b9853505",
                    "telugu": "నైతిక పాఠం: కష్ట సమయంలో తెలివిని ఉపయోగించండి. నమ్మకాన్ని దుర్వినియోగం చేయకూడదు.",
                    "english": "Moral: Use your intelligence in difficult times. Trust should not be misused.",
                    "audio": "monkey-crocodile-moral.mp3"
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