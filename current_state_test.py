#!/usr/bin/env python3
"""
Current State Backend Test for Telugu Tales Storybook
Tests the current backend functionality as requested in the review.
"""

import requests
import json
from datetime import datetime

class CurrentStateAPITester:
    def __init__(self, base_url="https://telugu-tales.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.results = {}
        
    def make_request(self, method, endpoint, data=None):
        """Make API request with error handling"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            
            return response.status_code, response.json() if response.content else {}
        except Exception as e:
            return 0, {"error": str(e)}
    
    def test_database_initialization(self):
        """Test /api/init-data to see current story count"""
        print("🔄 Testing Database Initialization...")
        
        status, response = self.make_request('POST', 'init-data')
        
        if status == 200:
            print(f"✅ Database initialization successful")
            print(f"   Response: {response}")
            self.results['init_data'] = {'status': 'success', 'response': response}
        else:
            print(f"❌ Database initialization failed: {status}")
            self.results['init_data'] = {'status': 'failed', 'error': response}
    
    def test_all_stories_count(self):
        """Get total story count"""
        print("\n📊 Testing Total Story Count...")
        
        status, response = self.make_request('GET', 'stories')
        
        if status == 200 and isinstance(response, list):
            story_count = len(response)
            print(f"✅ Total stories found: {story_count}")
            
            # Group by category
            categories = {}
            for story in response:
                cat = story.get('category', 'unknown')
                if cat not in categories:
                    categories[cat] = []
                categories[cat].append(story['title'])
            
            print(f"📋 Stories by category:")
            for cat, stories in categories.items():
                print(f"   {cat}: {len(stories)} stories")
                for story in stories[:3]:  # Show first 3 stories
                    print(f"     - {story}")
                if len(stories) > 3:
                    print(f"     ... and {len(stories) - 3} more")
            
            self.results['total_stories'] = {
                'count': story_count,
                'categories': {cat: len(stories) for cat, stories in categories.items()}
            }
        else:
            print(f"❌ Failed to get stories: {status}")
            self.results['total_stories'] = {'status': 'failed', 'error': response}
    
    def test_category_endpoints(self):
        """Test all category endpoints"""
        print("\n🏷️  Testing Category Endpoints...")
        
        category_types = ['mythology', 'moral', 'aarna', 'history']
        
        for cat_type in category_types:
            print(f"\n   Testing {cat_type} categories...")
            status, response = self.make_request('GET', f'categories/{cat_type}')
            
            if status == 200 and isinstance(response, list):
                print(f"   ✅ {cat_type}: {len(response)} categories found")
                for cat in response:
                    print(f"      - {cat.get('name', 'Unknown')} ({cat.get('id', 'no-id')}) {cat.get('emoji', '')}")
                self.results[f'{cat_type}_categories'] = {'count': len(response), 'categories': response}
            else:
                print(f"   ❌ {cat_type} failed: {status}")
                self.results[f'{cat_type}_categories'] = {'status': 'failed', 'error': response}
    
    def test_stories_by_category(self):
        """Test /api/stories/category/{category} for all known categories"""
        print("\n📚 Testing Stories by Category...")
        
        # Test all known categories
        test_categories = [
            'aarna-adventures', 'krishna', 'hanuman', 'ganesha', 'rama', 'shiva', 'durga', 'lakshmi', 'saraswati',
            'panchatantra', 'animal-fables', 'classic-moral', 'friendship-stories', 'kindness-stories',
            'ramayana', 'mahabharata'
        ]
        
        category_results = {}
        
        for category in test_categories:
            print(f"\n   Testing {category} stories...")
            status, response = self.make_request('GET', f'stories/category/{category}')
            
            if status == 200 and isinstance(response, list):
                story_count = len(response)
                print(f"   ✅ {category}: {story_count} stories found")
                
                if story_count > 0:
                    # Show first few story titles
                    for i, story in enumerate(response[:3]):
                        print(f"      {i+1}. {story.get('title', 'No title')}")
                    if story_count > 3:
                        print(f"      ... and {story_count - 3} more stories")
                    
                    # Check story structure
                    first_story = response[0]
                    has_slides = 'slides' in first_story and len(first_story['slides']) > 0
                    has_telugu = any('telugu' in slide for slide in first_story.get('slides', []))
                    has_english = any('english' in slide for slide in first_story.get('slides', []))
                    
                    print(f"      Structure: slides={has_slides}, telugu={has_telugu}, english={has_english}")
                    
                    category_results[category] = {
                        'count': story_count,
                        'has_slides': has_slides,
                        'has_telugu': has_telugu,
                        'has_english': has_english,
                        'titles': [s.get('title') for s in response]
                    }
                else:
                    print(f"      ⚠️  No stories found for {category}")
                    category_results[category] = {'count': 0}
            else:
                print(f"   ❌ {category} failed: {status}")
                category_results[category] = {'status': 'failed', 'error': response}
        
        self.results['stories_by_category'] = category_results
    
    def test_specific_story_content(self):
        """Test specific story content structure"""
        print("\n🔍 Testing Specific Story Content...")
        
        # Test a few specific stories to verify content structure
        test_stories = [
            'aarna-magic-forest',
            'hanuman-sun', 
            'lion-mouse'
        ]
        
        for story_id in test_stories:
            print(f"\n   Testing story: {story_id}")
            status, response = self.make_request('GET', f'stories/{story_id}')
            
            if status == 200:
                print(f"   ✅ Story found: {response.get('title', 'No title')}")
                print(f"      Category: {response.get('category', 'Unknown')}")
                print(f"      Description: {response.get('description', 'No description')[:50]}...")
                
                slides = response.get('slides', [])
                print(f"      Slides: {len(slides)}")
                
                if slides:
                    first_slide = slides[0]
                    print(f"      First slide has: telugu={bool(first_slide.get('telugu'))}, english={bool(first_slide.get('english'))}")
                
                self.results[f'story_{story_id}'] = {
                    'found': True,
                    'title': response.get('title'),
                    'category': response.get('category'),
                    'slide_count': len(slides)
                }
            else:
                print(f"   ❌ Story not found: {status}")
                self.results[f'story_{story_id}'] = {'found': False, 'error': response}
    
    def run_comprehensive_test(self):
        """Run all tests for current state verification"""
        print("🚀 Starting Current State Backend Testing")
        print(f"📍 Testing against: {self.base_url}")
        print("="*60)
        
        start_time = datetime.now()
        
        try:
            self.test_database_initialization()
            self.test_all_stories_count()
            self.test_category_endpoints()
            self.test_stories_by_category()
            self.test_specific_story_content()
            
        except Exception as e:
            print(f"\n❌ Unexpected error: {str(e)}")
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        # Print summary
        print("\n" + "="*60)
        print("📊 CURRENT STATE SUMMARY")
        print("="*60)
        
        if 'total_stories' in self.results:
            total_count = self.results['total_stories'].get('count', 0)
            print(f"📚 Total Stories in Database: {total_count}")
            
            if 'categories' in self.results['total_stories']:
                print(f"📋 Category Breakdown:")
                for cat, count in self.results['total_stories']['categories'].items():
                    print(f"   {cat}: {count} stories")
        
        print(f"\n⏱️  Test Duration: {duration:.2f} seconds")
        
        return self.results

def main():
    tester = CurrentStateAPITester()
    results = tester.run_comprehensive_test()
    
    # Save results to file for analysis
    with open('/app/current_state_results.json', 'w') as f:
        json.dump(results, f, indent=2, default=str)
    
    print(f"\n💾 Results saved to current_state_results.json")
    return 0

if __name__ == "__main__":
    exit(main())