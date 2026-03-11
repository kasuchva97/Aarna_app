import os
import ast
from supabase import create_client, Client

url: str = "https://jypkofybplnhmalovbsd.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cGtvZnlicGxuaG1hbG92YnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyODg4NDAsImV4cCI6MjA4Nzg2NDg0MH0.6hSJnG28OfXmgfgnznGoORzOgW1aite4SkSsRlzoEik"
supabase: Client = create_client(url, key)

def migrate_missing_data():
    with open('comprehensive_stories_complete_full.py', 'r', encoding='utf-8') as f:
        content = f.read()

    # The file has been wrapped in quotes. Remove them.
    if content.startswith('\"\"\"'):
        content = content[3:]
    if content.endswith('\"\"\"'):
        content = content[:-3]
    
    # Exec the content in a dictionary namespace
    namespace = {}
    try:
        exec(content, namespace)
    except Exception as e:
        print("Error executing file content:", e)
        return

    all_stories = namespace.get('COMPREHENSIVE_STORIES_FULL', [])
    
    # The JSON specified these 3 missing stories:
    # 1. "The Monkey and the Crocodile" (panchatantra)
    # 2. "The Birth of Prince Rama" (ramayana)
    # 3. "Arjuna and Ekalavya" (mahabharata)

    missing_ids = ['rama-birth', 'arjuna-ekalavya']
    
    to_insert = [s for s in all_stories if s.get('id') in missing_ids]
    
    # The monkey and crocodile story might be in a different file or missing. Let's trace it.
    print(f"Found {len(to_insert)} of the missing stories in this file.")

    for story in to_insert:
        try:
            data = supabase.table("stories").insert(story).execute()
            print(f"Successfully inserted: {story['title']}")
        except Exception as e:
            print(f"Error inserting {story['title']}: {e}")

if __name__ == "__main__":
    migrate_missing_data()
