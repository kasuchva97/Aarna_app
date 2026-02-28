import os
from supabase import create_client, Client

url: str = "https://jypkofybplnhmalovbsd.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cGtvZnlicGxuaG1hbG92YnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyODg4NDAsImV4cCI6MjA4Nzg2NDg0MH0.6hSJnG28OfXmgfgnznGoORzOgW1aite4SkSsRlzoEik"
supabase: Client = create_client(url, key)

monkey_crocodile = {
    "id": "monkey-crocodile-trust",
    "title": "The Monkey and the Crocodile",
    "category": "panchatantra",
    "description": "A story about trust and a smart monkey.",
    "slides": [
        {
            "image": "https://images.unsplash.com/photo-1540206395-68808572332f",
            "telugu": "ఒక నది ఒడ్డున ఒక కోతి ఉండేది.",
            "english": "A monkey lived on the bank of a river.",
            "audio": "monkey-1.mp3"
        },
        {
            "image": "https://images.unsplash.com/photo-1696527018053-3343b9853505",
            "telugu": "నైతిక పాఠం: ఆపదలో ధైర్యంగా ఆలోచించాలి.",
            "english": "Moral: Think bravely in danger.",
            "audio": "monkey-moral.mp3"
        }
    ]
}

data = supabase.table("stories").insert(monkey_crocodile).execute()
print(f"Successfully inserted The Monkey and the Crocodile")

