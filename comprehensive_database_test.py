#!/usr/bin/env python3
"""
Comprehensive Database Testing for Telugu Storybook App
Testing the improved state after database reinitialization with 14 stories
"""

import requests
import json
from datetime import datetime
from collections import defaultdict

class ComprehensiveDatabaseTester:
    def __init__(self, base_url="https://telugu-tales.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.results = {
            'total_stories': 0,
            'category_counts': {},
            'issues': [],
            'successes': [],
            'api_status': {}
        }

    def log_success(self, message):
        """Log a successful test result"""
        print(f"✅ {message}")
        self.results['successes'].append(message)

    def log_issue(self, message):
        """Log an issue found during testing"""
        print(f"❌ {message}")
        self.results['issues'].append(message)

    def log_info(self, message):
        """Log informational message"""
        print(f"ℹ️  {message}")

    def test_database_initialization(self):
        """Test database initialization and verify story count improvement"""
        print("\n" + "="*60)
        print("🔄 TESTING DATABASE INITIALIZATION")
        print("="*60)
        
        try:
            # Initialize database
            response = requests.post(f"{self.api_url}/init-data", timeout=10)
            if response.status_code == 200:
                data = response.json()
                self.log_success(f"Database initialization successful: {data.get('message', 'No message')}")
                
                # Extract story count from message
                message = data.get('message', '')
                if 'Initialized' in message:
                    import re
                    count_match = re.search(r'(\d+)', message)
                    if count_match:
                        initialized_count = int(count_match.group(1))
                        self.log_info(f"Stories initialized from file: {initialized_count}")
                        
                        if initialized_count >= 14:
                            self.log_success(f"✅ IMPROVEMENT CONFIRMED: {initialized_count} stories (≥14 expected)")
                        else:
                            self.log_issue(f"Story count below expected: {initialized_count} < 14")
                
            else:
                self.log_issue(f"Database initialization failed: {response.status_code}")
                
        except Exception as e:
            self.log_issue(f"Database initialization error: {str(e)}")

    def test_total_story_count(self):
        """Test total story count in database"""
        print("\n" + "="*60)
        print("📊 TESTING TOTAL STORY COUNT")
        print("="*60)
        
        try:
            response = requests.get(f"{self.api_url}/stories", timeout=10)
            if response.status_code == 200:
                stories = response.json()
                self.results['total_stories'] = len(stories)
                
                self.log_info(f"Total stories found in database: {len(stories)}")
                
                if len(stories) >= 14:
                    self.log_success(f"✅ IMPROVEMENT VERIFIED: {len(stories)} stories (≥14 expected)")
                else:
                    self.log_issue(f"Total story count below expected: {len(stories)} < 14")
                
                return stories
            else:
                self.log_issue(f"Failed to fetch stories: {response.status_code}")
                return []
                
        except Exception as e:
            self.log_issue(f"Error fetching stories: {str(e)}")
            return []

    def test_aarna_category_improvement(self):
        """Test Aarna category specifically for the 12 stories improvement"""
        print("\n" + "="*60)
        print("🌟 TESTING AARNA CATEGORY IMPROVEMENT")
        print("="*60)
        
        try:
            response = requests.get(f"{self.api_url}/stories/category/aarna-adventures", timeout=10)
            if response.status_code == 200:
                aarna_stories = response.json()
                count = len(aarna_stories)
                self.results['category_counts']['aarna-adventures'] = count
                
                self.log_info(f"Aarna adventures found: {count}")
                
                if count >= 12:
                    self.log_success(f"✅ AARNA IMPROVEMENT CONFIRMED: {count} stories (≥12 expected)")
                    
                    # List all Aarna stories
                    self.log_info("Aarna adventure stories:")
                    for story in aarna_stories:
                        print(f"   • {story.get('title', 'No title')}")
                        
                elif count >= 2:
                    self.log_issue(f"Aarna stories count improved but not to target: {count} (expected 12)")
                else:
                    self.log_issue(f"Aarna stories count too low: {count} (expected 12)")
                    
            else:
                self.log_issue(f"Failed to fetch Aarna stories: {response.status_code}")
                
        except Exception as e:
            self.log_issue(f"Error testing Aarna category: {str(e)}")

    def test_all_category_counts(self):
        """Test all story categories and their counts"""
        print("\n" + "="*60)
        print("📚 TESTING ALL CATEGORY STORY COUNTS")
        print("="*60)
        
        # Define expected categories
        categories = {
            'aarna-adventures': 'Aarna Adventures',
            'krishna': 'Krishna Stories',
            'hanuman': 'Hanuman Stories', 
            'ganesha': 'Ganesha Stories',
            'rama': 'Rama Stories',
            'shiva': 'Shiva Stories',
            'durga': 'Durga Stories',
            'lakshmi': 'Lakshmi Stories',
            'saraswati': 'Saraswati Stories',
            'panchatantra': 'Panchatantra Tales',
            'animal-fables': 'Animal Fables',
            'classic-moral': 'Classic Moral Stories',
            'friendship-stories': 'Friendship Stories',
            'kindness-stories': 'Kindness Stories',
            'ramayana': 'Ramayana Stories',
            'mahabharata': 'Mahabharata Stories'
        }
        
        for category_id, category_name in categories.items():
            try:
                response = requests.get(f"{self.api_url}/stories/category/{category_id}", timeout=10)
                if response.status_code == 200:
                    stories = response.json()
                    count = len(stories)
                    self.results['category_counts'][category_id] = count
                    
                    if count > 0:
                        self.log_success(f"{category_name}: {count} stories")
                    else:
                        self.log_issue(f"{category_name}: 0 stories (needs content)")
                        
                else:
                    self.log_issue(f"Failed to fetch {category_name}: {response.status_code}")
                    self.results['category_counts'][category_id] = 0
                    
            except Exception as e:
                self.log_issue(f"Error testing {category_name}: {str(e)}")
                self.results['category_counts'][category_id] = 0

    def test_story_content_structure(self):
        """Test story content structure for Telugu/English text and slides"""
        print("\n" + "="*60)
        print("📖 TESTING STORY CONTENT STRUCTURE")
        print("="*60)
        
        try:
            # Get all stories
            response = requests.get(f"{self.api_url}/stories", timeout=10)
            if response.status_code == 200:
                stories = response.json()
                
                valid_stories = 0
                invalid_stories = 0
                
                for story in stories[:5]:  # Test first 5 stories for structure
                    story_id = story.get('id', 'unknown')
                    title = story.get('title', 'No title')
                    
                    # Check required fields
                    has_slides = 'slides' in story and len(story['slides']) > 0
                    has_category = 'category' in story and story['category']
                    has_description = 'description' in story
                    
                    if has_slides and has_category and has_description:
                        # Check slide structure
                        slide = story['slides'][0]
                        has_telugu = 'telugu' in slide and slide['telugu']
                        has_english = 'english' in slide and slide['english']
                        
                        if has_telugu and has_english:
                            valid_stories += 1
                            self.log_success(f"Story '{title}' has proper structure")
                        else:
                            invalid_stories += 1
                            self.log_issue(f"Story '{title}' missing Telugu/English content")
                    else:
                        invalid_stories += 1
                        self.log_issue(f"Story '{title}' missing required fields")
                
                self.log_info(f"Content structure test: {valid_stories} valid, {invalid_stories} invalid")
                
            else:
                self.log_issue(f"Failed to fetch stories for content testing: {response.status_code}")
                
        except Exception as e:
            self.log_issue(f"Error testing story content structure: {str(e)}")

    def test_api_endpoints(self):
        """Test all API endpoints are working correctly"""
        print("\n" + "="*60)
        print("🔌 TESTING API ENDPOINTS")
        print("="*60)
        
        endpoints = [
            ('GET', '', 'Root endpoint'),
            ('GET', 'health', 'Health check'),
            ('GET', 'categories/mythology', 'Mythology categories'),
            ('GET', 'categories/moral', 'Moral categories'),
            ('GET', 'categories/aarna', 'Aarna categories'),
            ('GET', 'categories/history', 'History categories'),
            ('GET', 'stories', 'All stories'),
        ]
        
        for method, endpoint, description in endpoints:
            try:
                url = f"{self.api_url}/{endpoint}" if endpoint else f"{self.api_url}/"
                response = requests.get(url, timeout=10)
                
                if response.status_code == 200:
                    self.log_success(f"{description}: Working")
                    self.results['api_status'][endpoint or 'root'] = 'working'
                else:
                    self.log_issue(f"{description}: Failed ({response.status_code})")
                    self.results['api_status'][endpoint or 'root'] = f'failed-{response.status_code}'
                    
            except Exception as e:
                self.log_issue(f"{description}: Error - {str(e)}")
                self.results['api_status'][endpoint or 'root'] = f'error-{str(e)}'

    def test_no_coming_soon_issues(self):
        """Verify no 'story coming soon' issues remain"""
        print("\n" + "="*60)
        print("🚫 TESTING FOR 'COMING SOON' ISSUES")
        print("="*60)
        
        # This is primarily a frontend issue, but we can check if we have sufficient stories
        total_categories_with_stories = sum(1 for count in self.results['category_counts'].values() if count > 0)
        total_categories = len(self.results['category_counts'])
        
        if total_categories_with_stories == total_categories:
            self.log_success("All categories have stories - no 'coming soon' issues expected")
        else:
            empty_categories = [cat for cat, count in self.results['category_counts'].items() if count == 0]
            self.log_issue(f"Categories with no stories (may show 'coming soon'): {empty_categories}")

    def generate_report(self):
        """Generate comprehensive test report"""
        print("\n" + "="*80)
        print("📋 COMPREHENSIVE TEST REPORT")
        print("="*80)
        
        print(f"\n📊 SUMMARY:")
        print(f"   Total Stories: {self.results['total_stories']}")
        print(f"   Categories Tested: {len(self.results['category_counts'])}")
        print(f"   Issues Found: {len(self.results['issues'])}")
        print(f"   Successes: {len(self.results['successes'])}")
        
        print(f"\n📚 CATEGORY BREAKDOWN:")
        for category, count in self.results['category_counts'].items():
            status = "✅" if count > 0 else "❌"
            print(f"   {status} {category}: {count} stories")
        
        print(f"\n🔌 API STATUS:")
        for endpoint, status in self.results['api_status'].items():
            status_icon = "✅" if status == 'working' else "❌"
            print(f"   {status_icon} {endpoint}: {status}")
        
        if self.results['issues']:
            print(f"\n❌ ISSUES FOUND:")
            for issue in self.results['issues']:
                print(f"   • {issue}")
        
        if self.results['successes']:
            print(f"\n✅ SUCCESSES:")
            for success in self.results['successes'][:10]:  # Show first 10
                print(f"   • {success}")
            if len(self.results['successes']) > 10:
                print(f"   ... and {len(self.results['successes']) - 10} more")
        
        # Overall assessment
        print(f"\n🎯 OVERALL ASSESSMENT:")
        if self.results['total_stories'] >= 14:
            print("   ✅ Database improvement CONFIRMED - 14+ stories achieved")
        else:
            print("   ❌ Database improvement NOT achieved - less than 14 stories")
            
        if self.results['category_counts'].get('aarna-adventures', 0) >= 12:
            print("   ✅ Aarna category improvement CONFIRMED - 12+ stories")
        else:
            print("   ❌ Aarna category improvement NOT achieved")

    def run_comprehensive_test(self):
        """Run all comprehensive tests"""
        print("🚀 STARTING COMPREHENSIVE DATABASE TESTING")
        print(f"📍 Testing against: {self.base_url}")
        print(f"🕐 Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        start_time = datetime.now()
        
        try:
            self.test_database_initialization()
            self.test_total_story_count()
            self.test_aarna_category_improvement()
            self.test_all_category_counts()
            self.test_story_content_structure()
            self.test_api_endpoints()
            self.test_no_coming_soon_issues()
            
        except KeyboardInterrupt:
            print("\n⚠️  Tests interrupted by user")
        except Exception as e:
            print(f"\n❌ Unexpected error during testing: {str(e)}")
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        self.generate_report()
        
        print(f"\n⏱️  Total testing time: {duration:.2f} seconds")
        print(f"🏁 Testing completed at: {end_time.strftime('%Y-%m-%d %H:%M:%S')}")
        
        return len(self.results['issues']) == 0

def main():
    tester = ComprehensiveDatabaseTester()
    success = tester.run_comprehensive_test()
    return 0 if success else 1

if __name__ == "__main__":
    import sys
    sys.exit(main())