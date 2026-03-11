"""
Script to generate contextual images and Telugu audio for Storybook slides.
Required packages: 
pip install openai edge-tts
"""

import os
import asyncio
import edge_tts
from openai import OpenAI

# Initialize OpenAI client (requires OPENAI_API_KEY environment variable)
# client = OpenAI()

async def generate_telugu_audio(text, output_filename):
    """Generates high-quality Telugu TTS using Edge TTS (free)."""
    voice = "te-IN-ShrutiNeural" # Female Telugu voice
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_filename)

def generate_contextual_image(english_text, output_filename):
    """Generates a contextual image using DALL-E 3 based on the slide's english text."""
    prompt = f"A beautiful children's storybook illustration: {english_text}. Vibrant colors, magical atmosphere, safe for kids, Pixar style."
    
    # Uncomment to actually generate images
    '''
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    
    image_url = response.data[0].url
    print(f"Generated image URL for {output_filename}: {image_url}")
    
    # Download the image and save it to the static folder:
    import requests
    img_data = requests.get(image_url).content
    with open(output_filename, 'wb') as handler:
        handler.write(img_data)
        
    return f"/static/images/{os.path.basename(output_filename)}"
    '''
    return "image_url_placeholder"

async def process_story(story_data):
    """Process a single story to generate all its missing assets."""
    print(f"Processing story: {story_data['title']}")
    
    audio_dir = "../static/audio"
    images_dir = "../static/images"
    os.makedirs(audio_dir, exist_ok=True)
    os.makedirs(images_dir, exist_ok=True)
    
    for i, slide in enumerate(story_data['slides']):
        slide_num = i + 1
        
        # 1. Generate Audio
        audio_filename = f"{audio_dir}/{story_data['id']}-{slide_num}.mp3"
        if not os.path.exists(audio_filename):
            print(f"Generating audio for slide {slide_num}...")
            await generate_telugu_audio(slide['telugu'], audio_filename)
            slide['audio'] = f"/static/audio/{story_data['id']}-{slide_num}.mp3"
            
        # 2. Generate Image
        image_filename = f"{images_dir}/{story_data['id']}-{slide_num}.png"
        if not os.path.exists(image_filename):
            print(f"Generating image for slide {slide_num}...")
            try:
                # slide['image'] = generate_contextual_image(slide['english'], image_filename)
                print("Skipping actual OpenAI call. Uncomment in code to run.")
            except Exception as e:
                print(f"Error generating image: {e}")

if __name__ == "__main__":
    print("Asset generation system ready.")
    print("To use: import your stories array and call process_story() on each.")
    
    # Example usage:
    # from data_seeds.proper_stories_content import COMPREHENSIVE_STORIES_FULL
    # asyncio.run(process_story(COMPREHENSIVE_STORIES_FULL[0]))
