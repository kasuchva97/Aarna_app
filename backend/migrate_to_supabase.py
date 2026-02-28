import os
from supabase import create_client, Client
from proper_stories_content import COMPREHENSIVE_STORIES_FULL

# Initialize Supabase client
url: str = "https://jypkofybplnhmalovbsd.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cGtvZnlicGxuaG1hbG92YnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyODg4NDAsImV4cCI6MjA4Nzg2NDg0MH0.6hSJnG28OfXmgfgnznGoORzOgW1aite4SkSsRlzoEik"
supabase: Client = create_client(url, key)

def migrate_data():
    print(f"Starting migration of {len(COMPREHENSIVE_STORIES_FULL)} stories to Supabase...")
    
    success_count = 0
    error_count = 0
    
    for story in COMPREHENSIVE_STORIES_FULL:
        try:
            # We insert the story into the 'stories' table.
            # Supabase handles JSON nicely, so we can just pass the dict.
            data = supabase.table("stories").insert(story).execute()
            print(f"Successfully inserted: {story['title']}")
            success_count += 1
        except Exception as e:
            print(f"Error inserting {story['title']}: {e}")
            error_count += 1
            
    print("\n--- Migration Complete ---")
    print(f"Successfully migrated: {success_count}")
    print(f"Failed to migrate: {error_count}")

if __name__ == "__main__":
    migrate_data()
