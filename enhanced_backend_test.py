import requests
import sys
import json
from datetime import datetime

class EnhancedStorybookTester:
    def __init__(self, base_url="https://telugu-tales.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, check_response=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if not endpoint.startswith('http') else endpoint
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                if check_response and response.status_code == 200:
                    try:
                        response_data = response.json()
                        if check_response(response_data):
                            print(f"   ✅ Response validation passed")
                        else:
                            print(f"   ⚠️  Response validation failed")
                            success = False
                            self.tests_passed -= 1
                    except Exception as e:
                        print(f"   ⚠️  Response validation error: {str(e)}")
                
                return success, response.json() if response.content else {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_enhanced_story_content(self):
        """Test the enhanced story content mentioned in review"""
        print("\n" + "="*60)
        print("TESTING ENHANCED STORY CONTENT")
        print("="*60)
        
        # Initialize data first
        self.run_test("Initialize Sample Data", "POST", "init-data", 200)
        
        # Test expanded Hanuman story (should have 8 slides)
        def check_hanuman_slides(response):
            slides = response.get('slides', [])
            print(f"   📊 Hanuman story has {len(slides)} slides")
            return len(slides) == 8
        
        self.run_test("Hanuman Story - 8 Slides", "GET", "stories/hanuman-sun", 200,
                     check_response=check_hanuman_slides)
        
        # Test Krishna butter story (should have 4 slides)
        def check_krishna_slides(response):
            slides = response.get('slides', [])
            print(f"   📊 Krishna story has {len(slides)} slides")
            return len(slides) == 4
        
        self.run_test("Krishna Butter Story - 4 Slides", "GET", "stories/krishna-butter", 200,
                     check_response=check_krishna_slides)
        
        # Test enhanced Lion and Mouse story (should have 8 slides)
        def check_lion_slides(response):
            slides = response.get('slides', [])
            print(f"   📊 Lion and Mouse story has {len(slides)} slides")
            return len(slides) == 8
        
        self.run_test("Lion Mouse Story - 8 Slides", "GET", "stories/lion-mouse", 200,
                     check_response=check_lion_slides)

    def test_new_stories_added(self):
        """Test new stories mentioned in review"""
        print("\n" + "="*60)
        print("TESTING NEW STORIES ADDED")
        print("="*60)
        
        # Test new Panchatantra story: "The Monkey and the Crocodile"
        def check_monkey_crocodile(response):
            return (response.get('id') == 'monkey-crocodile' and 
                   response.get('title') == 'The Monkey and the Crocodile' and
                   response.get('category') == 'panchatantra')
        
        self.run_test("Monkey Crocodile Story", "GET", "stories/monkey-crocodile", 200,
                     check_response=check_monkey_crocodile)

    def test_expanded_categories(self):
        """Test expanded moral story categories"""
        print("\n" + "="*60)
        print("TESTING EXPANDED CATEGORIES")
        print("="*60)
        
        # Test that moral categories now include 5 categories
        def check_expanded_moral_categories(response):
            if not isinstance(response, list):
                return False
            print(f"   📊 Found {len(response)} moral categories")
            expected_categories = ['panchatantra', 'animal-fables', 'classic-moral', 
                                 'friendship-stories', 'kindness-stories']
            found_ids = [item.get('id') for item in response]
            print(f"   📋 Categories: {found_ids}")
            return len(response) == 5 and all(cat_id in found_ids for cat_id in expected_categories)
        
        self.run_test("5 Moral Categories", "GET", "categories/moral", 200,
                     check_response=check_expanded_moral_categories)
        
        # Test that mythology categories include all 8 gods
        def check_all_mythology_gods(response):
            if not isinstance(response, list):
                return False
            print(f"   📊 Found {len(response)} mythology categories")
            expected_gods = ['krishna', 'hanuman', 'ganesha', 'rama', 'shiva', 'durga', 'lakshmi', 'saraswati']
            found_ids = [item.get('id') for item in response]
            print(f"   📋 Gods: {found_ids}")
            return len(response) == 8 and all(god_id in found_ids for god_id in expected_gods)
        
        self.run_test("8 Mythology Gods", "GET", "categories/mythology", 200,
                     check_response=check_all_mythology_gods)

    def test_story_data_structure(self):
        """Test that stories have proper data structure for audio and images"""
        print("\n" + "="*60)
        print("TESTING STORY DATA STRUCTURE")
        print("="*60)
        
        # Test Hanuman story structure
        def check_story_structure(response):
            slides = response.get('slides', [])
            if not slides:
                return False
            
            # Check first slide has required fields
            first_slide = slides[0]
            required_fields = ['image', 'telugu', 'english', 'audio']
            has_all_fields = all(field in first_slide for field in required_fields)
            
            print(f"   📋 First slide fields: {list(first_slide.keys())}")
            print(f"   ✅ Has all required fields: {has_all_fields}")
            
            return has_all_fields
        
        self.run_test("Story Structure - Hanuman", "GET", "stories/hanuman-sun", 200,
                     check_response=check_story_structure)
        
        self.run_test("Story Structure - Lion Mouse", "GET", "stories/lion-mouse", 200,
                     check_response=check_story_structure)

    def run_enhanced_tests(self):
        """Run all enhanced tests for the review"""
        print("🚀 Starting Enhanced My Little Storybook Tests")
        print(f"📍 Testing against: {self.base_url}")
        
        start_time = datetime.now()
        
        try:
            self.test_enhanced_story_content()
            self.test_new_stories_added()
            self.test_expanded_categories()
            self.test_story_data_structure()
        except Exception as e:
            print(f"\n❌ Unexpected error during testing: {str(e)}")
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        # Print final results
        print("\n" + "="*60)
        print("📊 ENHANCED TEST RESULTS")
        print("="*60)
        print(f"✅ Tests passed: {self.tests_passed}")
        print(f"❌ Tests failed: {self.tests_run - self.tests_passed}")
        print(f"📈 Total tests: {self.tests_run}")
        print(f"⏱️  Duration: {duration:.2f} seconds")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All enhanced tests passed!")
            return 0
        else:
            success_rate = (self.tests_passed / self.tests_run) * 100
            print(f"⚠️  Success rate: {success_rate:.1f}%")
            return 1

def main():
    tester = EnhancedStorybookTester()
    return tester.run_enhanced_tests()

if __name__ == "__main__":
    sys.exit(main())