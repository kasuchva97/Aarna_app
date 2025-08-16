import requests
import sys
import json
from datetime import datetime

class StorybookAPITester:
    def __init__(self, base_url="https://telugu-stories-1.preview.emergentagent.com"):
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
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Additional response validation if provided
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
                if response.content:
                    try:
                        error_data = response.json()
                        print(f"   Error: {error_data}")
                    except:
                        print(f"   Error: {response.text}")
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_endpoints(self):
        """Test basic health and root endpoints"""
        print("\n" + "="*50)
        print("TESTING HEALTH ENDPOINTS")
        print("="*50)
        
        # Test root endpoint
        self.run_test("Root Endpoint", "GET", "", 200)
        
        # Test API root
        self.run_test("API Root", "GET", "", 200)
        
        # Test health check
        self.run_test("Health Check", "GET", "health", 200, 
                     check_response=lambda r: 'status' in r and r['status'] == 'healthy')

    def test_categories_endpoints(self):
        """Test category endpoints"""
        print("\n" + "="*50)
        print("TESTING CATEGORIES ENDPOINTS")
        print("="*50)
        
        # Test mythology categories
        def check_mythology(response):
            if not isinstance(response, list):
                return False
            expected_gods = ['krishna', 'hanuman', 'ganesha', 'rama', 'shiva', 'durga', 'lakshmi', 'saraswati']
            found_ids = [item.get('id') for item in response]
            return all(god_id in found_ids for god_id in expected_gods)
        
        self.run_test("Mythology Categories", "GET", "categories/mythology", 200,
                     check_response=check_mythology)
        
        # Test moral categories  
        def check_moral(response):
            if not isinstance(response, list):
                return False
            expected_categories = ['panchatantra', 'animal-fables', 'classic-moral']
            found_ids = [item.get('id') for item in response]
            return all(cat_id in found_ids for cat_id in expected_categories)
        
        self.run_test("Moral Categories", "GET", "categories/moral", 200,
                     check_response=check_moral)
        
        # Test invalid category type
        self.run_test("Invalid Category Type", "GET", "categories/invalid", 404)

    def test_stories_endpoints(self):
        """Test story-related endpoints"""
        print("\n" + "="*50)
        print("TESTING STORIES ENDPOINTS")
        print("="*50)
        
        # First initialize sample data
        self.run_test("Initialize Sample Data", "POST", "init-data", 200)
        
        # Test get all stories
        def check_stories_list(response):
            return isinstance(response, list)
        
        success, stories_data = self.run_test("Get All Stories", "GET", "stories", 200,
                                            check_response=check_stories_list)
        
        # Test get stories by category - Hanuman
        def check_hanuman_stories(response):
            if not isinstance(response, list):
                return False
            # Should have at least one story
            return len(response) > 0 and any(story.get('category') == 'hanuman' for story in response)
        
        self.run_test("Get Hanuman Stories", "GET", "stories/category/hanuman", 200,
                     check_response=check_hanuman_stories)
        
        # Test get stories by category - Animal Fables
        def check_animal_fables(response):
            if not isinstance(response, list):
                return False
            return len(response) > 0 and any(story.get('category') == 'animal-fables' for story in response)
        
        self.run_test("Get Animal Fables Stories", "GET", "stories/category/animal-fables", 200,
                     check_response=check_animal_fables)
        
        # Test specific story - Hanuman Flies to the Sun
        def check_hanuman_story(response):
            return (response.get('id') == 'hanuman-sun' and 
                   response.get('title') == 'Hanuman Flies to the Sun' and
                   'slides' in response and len(response['slides']) > 0)
        
        self.run_test("Get Hanuman Sun Story", "GET", "stories/hanuman-sun", 200,
                     check_response=check_hanuman_story)
        
        # Test specific story - Lion and Mouse
        def check_lion_story(response):
            return (response.get('id') == 'lion-mouse' and 
                   response.get('title') == 'The Lion and the Mouse' and
                   'slides' in response and len(response['slides']) > 0)
        
        self.run_test("Get Lion Mouse Story", "GET", "stories/lion-mouse", 200,
                     check_response=check_lion_story)
        
        # Test non-existent story
        self.run_test("Get Non-existent Story", "GET", "stories/non-existent", 404)

    def test_story_crud_operations(self):
        """Test creating, updating, and deleting stories"""
        print("\n" + "="*50)
        print("TESTING STORY CRUD OPERATIONS")
        print("="*50)
        
        # Create a test story
        test_story = {
            "title": "Test Story",
            "category": "test-category",
            "description": "A test story for API testing",
            "slides": [
                {
                    "image": "https://example.com/test.jpg",
                    "telugu": "టెస్ట్ స్టోరీ",
                    "english": "This is a test story",
                    "audio": "test.mp3"
                }
            ]
        }
        
        success, created_story = self.run_test("Create Test Story", "POST", "stories", 201, 
                                             data=test_story)
        
        if success and 'id' in created_story:
            story_id = created_story['id']
            
            # Test updating the story
            updated_story = test_story.copy()
            updated_story['title'] = "Updated Test Story"
            
            self.run_test("Update Test Story", "PUT", f"stories/{story_id}", 200,
                         data=updated_story)
            
            # Test deleting the story
            self.run_test("Delete Test Story", "DELETE", f"stories/{story_id}", 200)
            
            # Verify story is deleted
            self.run_test("Verify Story Deleted", "GET", f"stories/{story_id}", 404)
        else:
            print("⚠️  Skipping update/delete tests due to create failure")

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting My Little Storybook API Tests")
        print(f"📍 Testing against: {self.base_url}")
        
        start_time = datetime.now()
        
        try:
            self.test_health_endpoints()
            self.test_categories_endpoints()
            self.test_stories_endpoints()
            self.test_story_crud_operations()
        except KeyboardInterrupt:
            print("\n⚠️  Tests interrupted by user")
        except Exception as e:
            print(f"\n❌ Unexpected error during testing: {str(e)}")
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        # Print final results
        print("\n" + "="*60)
        print("📊 FINAL TEST RESULTS")
        print("="*60)
        print(f"✅ Tests passed: {self.tests_passed}")
        print(f"❌ Tests failed: {self.tests_run - self.tests_passed}")
        print(f"📈 Total tests: {self.tests_run}")
        print(f"⏱️  Duration: {duration:.2f} seconds")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            success_rate = (self.tests_passed / self.tests_run) * 100
            print(f"⚠️  Success rate: {success_rate:.1f}%")
            return 1

def main():
    tester = StorybookAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())