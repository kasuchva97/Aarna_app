import requests
import sys
import json
from datetime import datetime

class ComprehensiveStorybookTester:
    def __init__(self, base_url="https://telugu-tales.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, check_response=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if not endpoint.startswith('http') else endpoint
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=15)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=15)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                if check_response and response.status_code == 200:
                    try:
                        response_data = response.json()
                        validation_result = check_response(response_data)
                        if validation_result:
                            print(f"   ✅ Response validation passed")
                        else:
                            print(f"   ⚠️  Response validation failed")
                            success = False
                            self.tests_passed -= 1
                            self.failed_tests.append(f"{name}: Response validation failed")
                    except Exception as e:
                        print(f"   ⚠️  Response validation error: {str(e)}")
                        success = False
                        self.tests_passed -= 1
                        self.failed_tests.append(f"{name}: Validation error - {str(e)}")
                
                return success, response.json() if response.content else {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                self.failed_tests.append(f"{name}: Expected {expected_status}, got {response.status_code}")
                if response.content:
                    try:
                        error_data = response.json()
                        print(f"   Error: {error_data}")
                    except:
                        print(f"   Error: {response.text}")
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            self.failed_tests.append(f"{name}: Request timeout")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            self.failed_tests.append(f"{name}: Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append(f"{name}: {str(e)}")
            return False, {}

    def test_database_initialization(self):
        """Test database initialization with comprehensive stories"""
        print("\n" + "="*70)
        print("TESTING DATABASE INITIALIZATION")
        print("="*70)
        
        def check_init_response(response):
            message = response.get('message', '')
            print(f"   📊 Init response: {message}")
            return 'comprehensive stories' in message.lower() or 'initialized' in message.lower()
        
        success, response = self.run_test(
            "Initialize Comprehensive Data", 
            "POST", 
            "init-data", 
            200,
            check_response=check_init_response
        )
        
        return success

    def test_category_verification(self):
        """Test all new category endpoints as specified in review"""
        print("\n" + "="*70)
        print("TESTING CATEGORY VERIFICATION")
        print("="*70)
        
        # Test mythology categories (should return 8 gods)
        def check_mythology_8_gods(response):
            if not isinstance(response, list):
                return False
            print(f"   📊 Found {len(response)} mythology categories")
            expected_gods = ['krishna', 'hanuman', 'ganesha', 'rama', 'shiva', 'durga', 'lakshmi', 'saraswati']
            found_ids = [item.get('id') for item in response]
            print(f"   📋 Gods found: {found_ids}")
            return len(response) == 8 and all(god_id in found_ids for god_id in expected_gods)
        
        self.run_test(
            "Mythology Categories (8 gods)", 
            "GET", 
            "categories/mythology", 
            200,
            check_response=check_mythology_8_gods
        )
        
        # Test moral categories (should return 5 categories)
        def check_moral_5_categories(response):
            if not isinstance(response, list):
                return False
            print(f"   📊 Found {len(response)} moral categories")
            expected_categories = ['panchatantra', 'animal-fables', 'classic-moral', 'friendship-stories', 'kindness-stories']
            found_ids = [item.get('id') for item in response]
            print(f"   📋 Categories found: {found_ids}")
            return len(response) == 5 and all(cat_id in found_ids for cat_id in expected_categories)
        
        self.run_test(
            "Moral Categories (5 categories)", 
            "GET", 
            "categories/moral", 
            200,
            check_response=check_moral_5_categories
        )
        
        # Test aarna categories (should return Aarna's Adventures)
        def check_aarna_category(response):
            if not isinstance(response, list):
                return False
            print(f"   📊 Found {len(response)} aarna categories")
            expected = [{'id': 'aarna-adventures', 'name': "Aarna's Adventures", 'type': 'aarna'}]
            found = response[0] if response else {}
            print(f"   📋 Aarna category: {found}")
            return (len(response) == 1 and 
                   found.get('id') == 'aarna-adventures' and 
                   found.get('name') == "Aarna's Adventures")
        
        self.run_test(
            "Aarna Categories", 
            "GET", 
            "categories/aarna", 
            200,
            check_response=check_aarna_category
        )
        
        # Test history categories (should return Ramayana and Mahabharata)
        def check_history_categories(response):
            if not isinstance(response, list):
                return False
            print(f"   📊 Found {len(response)} history categories")
            expected_ids = ['ramayana', 'mahabharata']
            found_ids = [item.get('id') for item in response]
            print(f"   📋 History categories: {found_ids}")
            return (len(response) == 2 and 
                   all(hist_id in found_ids for hist_id in expected_ids))
        
        self.run_test(
            "History Categories (Ramayana & Mahabharata)", 
            "GET", 
            "categories/history", 
            200,
            check_response=check_history_categories
        )

    def test_story_retrieval_new_categories(self):
        """Test story endpoints for new categories"""
        print("\n" + "="*70)
        print("TESTING STORY RETRIEVAL FOR NEW CATEGORIES")
        print("="*70)
        
        # Test aarna-adventures stories (should have 10+ stories)
        def check_aarna_stories(response):
            if not isinstance(response, list):
                return False
            print(f"   📊 Found {len(response)} Aarna adventure stories")
            aarna_stories = [s for s in response if s.get('category') == 'aarna-adventures']
            print(f"   📋 Aarna stories count: {len(aarna_stories)}")
            return len(aarna_stories) >= 10
        
        self.run_test(
            "Aarna Adventures Stories (10+ expected)", 
            "GET", 
            "stories/category/aarna-adventures", 
            200,
            check_response=check_aarna_stories
        )
        
        # Test ramayana stories (should have 10+ stories)
        def check_ramayana_stories(response):
            if not isinstance(response, list):
                return False
            print(f"   📊 Found {len(response)} Ramayana stories")
            ramayana_stories = [s for s in response if s.get('category') == 'ramayana']
            print(f"   📋 Ramayana stories count: {len(ramayana_stories)}")
            return len(ramayana_stories) >= 10
        
        self.run_test(
            "Ramayana Stories (10+ expected)", 
            "GET", 
            "stories/category/ramayana", 
            200,
            check_response=check_ramayana_stories
        )
        
        # Test mahabharata stories (should have 10+ stories)
        def check_mahabharata_stories(response):
            if not isinstance(response, list):
                return False
            print(f"   📊 Found {len(response)} Mahabharata stories")
            mahabharata_stories = [s for s in response if s.get('category') == 'mahabharata']
            print(f"   📋 Mahabharata stories count: {len(mahabharata_stories)}")
            return len(mahabharata_stories) >= 10
        
        self.run_test(
            "Mahabharata Stories (10+ expected)", 
            "GET", 
            "stories/category/mahabharata", 
            200,
            check_response=check_mahabharata_stories
        )

    def test_existing_functionality(self):
        """Test existing Krishna and Hanuman stories still work"""
        print("\n" + "="*70)
        print("TESTING EXISTING FUNCTIONALITY")
        print("="*70)
        
        # Test Krishna stories
        def check_krishna_stories(response):
            if not isinstance(response, list):
                return False
            print(f"   📊 Found {len(response)} Krishna stories")
            krishna_stories = [s for s in response if s.get('category') == 'krishna']
            print(f"   📋 Krishna stories count: {len(krishna_stories)}")
            return len(krishna_stories) >= 10
        
        self.run_test(
            "Krishna Stories Still Work", 
            "GET", 
            "stories/category/krishna", 
            200,
            check_response=check_krishna_stories
        )
        
        # Test Hanuman stories
        def check_hanuman_stories(response):
            if not isinstance(response, list):
                return False
            print(f"   📊 Found {len(response)} Hanuman stories")
            hanuman_stories = [s for s in response if s.get('category') == 'hanuman']
            print(f"   📋 Hanuman stories count: {len(hanuman_stories)}")
            return len(hanuman_stories) >= 10
        
        self.run_test(
            "Hanuman Stories Still Work", 
            "GET", 
            "stories/category/hanuman", 
            200,
            check_response=check_hanuman_stories
        )
        
        # Test specific existing stories
        def check_hanuman_sun_story(response):
            return (response.get('id') == 'hanuman-sun' and 
                   response.get('title') == 'Hanuman Flies to the Sun' and
                   'slides' in response and len(response['slides']) >= 6)
        
        self.run_test(
            "Hanuman Sun Story", 
            "GET", 
            "stories/hanuman-sun", 
            200,
            check_response=check_hanuman_sun_story
        )
        
        def check_krishna_butter_story(response):
            return (response.get('id') == 'krishna-butter' and 
                   response.get('title') == 'Krishna and the Butter Pot' and
                   'slides' in response and len(response['slides']) >= 3)
        
        self.run_test(
            "Krishna Butter Story", 
            "GET", 
            "stories/krishna-butter", 
            200,
            check_response=check_krishna_butter_story
        )

    def test_story_content_structure(self):
        """Test that stories have proper Telugu and English text with slides"""
        print("\n" + "="*70)
        print("TESTING STORY CONTENT STRUCTURE")
        print("="*70)
        
        # Test Aarna story structure
        def check_aarna_story_structure(response):
            slides = response.get('slides', [])
            if not slides:
                print("   ❌ No slides found")
                return False
            
            print(f"   📊 Story has {len(slides)} slides")
            
            # Check first slide has required fields
            first_slide = slides[0]
            required_fields = ['image', 'telugu', 'english', 'audio']
            has_all_fields = all(field in first_slide for field in required_fields)
            
            print(f"   📋 First slide fields: {list(first_slide.keys())}")
            print(f"   ✅ Has all required fields: {has_all_fields}")
            
            # Check Telugu and English content
            has_telugu = bool(first_slide.get('telugu', '').strip())
            has_english = bool(first_slide.get('english', '').strip())
            
            print(f"   📝 Has Telugu content: {has_telugu}")
            print(f"   📝 Has English content: {has_english}")
            
            return has_all_fields and has_telugu and has_english
        
        self.run_test(
            "Aarna Story Content Structure", 
            "GET", 
            "stories/aarna-magic-forest", 
            200,
            check_response=check_aarna_story_structure
        )
        
        # Test Ramayana story structure
        def check_ramayana_story_structure(response):
            slides = response.get('slides', [])
            if not slides:
                print("   ❌ No slides found")
                return False
            
            print(f"   📊 Ramayana story has {len(slides)} slides")
            
            first_slide = slides[0]
            required_fields = ['image', 'telugu', 'english', 'audio']
            has_all_fields = all(field in first_slide for field in required_fields)
            
            has_telugu = bool(first_slide.get('telugu', '').strip())
            has_english = bool(first_slide.get('english', '').strip())
            
            print(f"   📝 Has Telugu content: {has_telugu}")
            print(f"   📝 Has English content: {has_english}")
            
            return has_all_fields and has_telugu and has_english
        
        self.run_test(
            "Ramayana Story Content Structure", 
            "GET", 
            "stories/rama-birth", 
            200,
            check_response=check_ramayana_story_structure
        )

    def test_comprehensive_story_count(self):
        """Test that database has 50+ comprehensive stories"""
        print("\n" + "="*70)
        print("TESTING COMPREHENSIVE STORY COUNT")
        print("="*70)
        
        def check_total_story_count(response):
            if not isinstance(response, list):
                return False
            
            total_stories = len(response)
            print(f"   📊 Total stories in database: {total_stories}")
            
            # Count stories by category
            category_counts = {}
            for story in response:
                category = story.get('category', 'unknown')
                category_counts[category] = category_counts.get(category, 0) + 1
            
            print(f"   📋 Stories by category:")
            for category, count in sorted(category_counts.items()):
                print(f"      {category}: {count} stories")
            
            return total_stories >= 50
        
        self.run_test(
            "Total Story Count (50+ expected)", 
            "GET", 
            "stories", 
            200,
            check_response=check_total_story_count
        )

    def run_comprehensive_tests(self):
        """Run all comprehensive tests for the enhanced storybook"""
        print("🚀 Starting Comprehensive Enhanced Storybook Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("🎯 Testing Requirements from Review Request:")
        print("   1. Database initialization with comprehensive stories")
        print("   2. Category verification (mythology=8, moral=5, aarna, history)")
        print("   3. Story retrieval for new categories (10+ stories each)")
        print("   4. Existing functionality (Krishna & Hanuman)")
        print("   5. Story content structure (Telugu & English with slides)")
        
        start_time = datetime.now()
        
        try:
            # Run tests in order
            self.test_database_initialization()
            self.test_category_verification()
            self.test_story_retrieval_new_categories()
            self.test_existing_functionality()
            self.test_story_content_structure()
            self.test_comprehensive_story_count()
            
        except KeyboardInterrupt:
            print("\n⚠️  Tests interrupted by user")
        except Exception as e:
            print(f"\n❌ Unexpected error during testing: {str(e)}")
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        # Print final results
        print("\n" + "="*70)
        print("📊 COMPREHENSIVE TEST RESULTS")
        print("="*70)
        print(f"✅ Tests passed: {self.tests_passed}")
        print(f"❌ Tests failed: {self.tests_run - self.tests_passed}")
        print(f"📈 Total tests: {self.tests_run}")
        print(f"⏱️  Duration: {duration:.2f} seconds")
        
        if self.failed_tests:
            print(f"\n❌ Failed Tests Details:")
            for i, failure in enumerate(self.failed_tests, 1):
                print(f"   {i}. {failure}")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All comprehensive tests passed!")
            print("✅ Enhanced storybook backend is working correctly!")
            return 0
        else:
            success_rate = (self.tests_passed / self.tests_run) * 100
            print(f"⚠️  Success rate: {success_rate:.1f}%")
            return 1

def main():
    tester = ComprehensiveStorybookTester()
    return tester.run_comprehensive_tests()

if __name__ == "__main__":
    sys.exit(main())