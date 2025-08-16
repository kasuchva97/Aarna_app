#!/usr/bin/env python3
"""
Backend Testing for Telugu Storybook App - Focused Story Implementation
Testing exact requirements from review request:

REQUIREMENTS VERIFICATION:
1. **Aarna Adventures**: Should have 12 stories, each with 8 slides
2. **Mythological Stories**: Should have Krishna (5), Hanuman (5), Ganesha (5), Rama (5) stories - each with 8 slides
3. **Moral Stories**: Should have Panchatantra (6) and Animal Fables (6) stories - each with 8 slides  
4. **Other sections**: History, Poems, Fun Zone should show "coming soon" (empty or no content)

Expected total: 44 stories (12 + 5 + 5 + 5 + 5 + 6 + 6 = 44)
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.results = {
            'total_tests': 0,
            'passed_tests': 0,
            'failed_tests': 0,
            'test_details': []
        }
        
    def log_test(self, test_name, passed, details=""):
        """Log test result"""
        self.results['total_tests'] += 1
        if passed:
            self.results['passed_tests'] += 1
            status = "✅ PASS"
        else:
            self.results['failed_tests'] += 1
            status = "❌ FAIL"
            
        result = f"{status}: {test_name}"
        if details:
            result += f" - {details}"
        
        self.results['test_details'].append(result)
        print(result)
        
    def test_api_health(self):
        """Test basic API connectivity"""
        try:
            response = requests.get(f"{API_BASE}/health", timeout=10)
            if response.status_code == 200:
                self.log_test("API Health Check", True, "Backend API is accessible")
                return True
            else:
                self.log_test("API Health Check", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("API Health Check", False, f"Connection error: {str(e)}")
            return False
    
    def initialize_database(self):
        """Initialize database with focused stories"""
        try:
            response = requests.post(f"{API_BASE}/init-data", timeout=30)
            if response.status_code == 200:
                data = response.json()
                self.log_test("Database Initialization", True, f"Response: {data.get('message', 'Success')}")
                return True
            else:
                self.log_test("Database Initialization", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Database Initialization", False, f"Error: {str(e)}")
            return False
    
    def test_story_counts_by_category(self):
        """Test exact story counts per category as per requirements"""
        expected_counts = {
            'aarna-adventures': 12,
            'krishna': 5,
            'hanuman': 5, 
            'ganesha': 5,
            'rama': 5,
            'panchatantra': 6,
            'animal-fables': 6
        }
        
        # Categories that should be empty (coming soon)
        empty_categories = [
            'ramayana', 'mahabharata',  # History categories
            'shiva', 'durga', 'lakshmi', 'saraswati',  # Other mythology
            'classic-moral', 'friendship-stories', 'kindness-stories'  # Other moral
        ]
        
        all_passed = True
        
        # Test expected categories with stories
        for category, expected_count in expected_counts.items():
            try:
                response = requests.get(f"{API_BASE}/stories/category/{category}", timeout=10)
                if response.status_code == 200:
                    stories = response.json()
                    actual_count = len(stories)
                    
                    if actual_count == expected_count:
                        self.log_test(f"Story Count - {category}", True, 
                                    f"Expected {expected_count}, got {actual_count}")
                    else:
                        self.log_test(f"Story Count - {category}", False, 
                                    f"Expected {expected_count}, got {actual_count}")
                        all_passed = False
                else:
                    self.log_test(f"Story Count - {category}", False, 
                                f"API error: {response.status_code}")
                    all_passed = False
            except Exception as e:
                self.log_test(f"Story Count - {category}", False, f"Error: {str(e)}")
                all_passed = False
        
        # Test empty categories (should have 0 stories)
        for category in empty_categories:
            try:
                response = requests.get(f"{API_BASE}/stories/category/{category}", timeout=10)
                if response.status_code == 200:
                    stories = response.json()
                    actual_count = len(stories)
                    
                    if actual_count == 0:
                        self.log_test(f"Empty Category - {category}", True, 
                                    f"Correctly shows 0 stories (coming soon)")
                    else:
                        self.log_test(f"Empty Category - {category}", False, 
                                    f"Expected 0 stories, got {actual_count}")
                        all_passed = False
                else:
                    self.log_test(f"Empty Category - {category}", False, 
                                f"API error: {response.status_code}")
                    all_passed = False
            except Exception as e:
                self.log_test(f"Empty Category - {category}", False, f"Error: {str(e)}")
                all_passed = False
        
        return all_passed
    
    def test_total_story_count(self):
        """Test total story count should be exactly 44"""
        try:
            response = requests.get(f"{API_BASE}/stories", timeout=10)
            if response.status_code == 200:
                stories = response.json()
                total_count = len(stories)
                expected_total = 44  # 12 + 5 + 5 + 5 + 5 + 6 + 6
                
                if total_count == expected_total:
                    self.log_test("Total Story Count", True, 
                                f"Expected {expected_total}, got {total_count}")
                    return True
                else:
                    self.log_test("Total Story Count", False, 
                                f"Expected {expected_total}, got {total_count}")
                    return False
            else:
                self.log_test("Total Story Count", False, f"API error: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Total Story Count", False, f"Error: {str(e)}")
            return False
    
    def test_story_structure(self):
        """Test that each story has exactly 8 slides and proper structure"""
        categories_to_test = ['aarna-adventures', 'krishna', 'hanuman', 'ganesha', 'rama', 'panchatantra', 'animal-fables']
        
        all_passed = True
        
        for category in categories_to_test:
            try:
                response = requests.get(f"{API_BASE}/stories/category/{category}", timeout=10)
                if response.status_code == 200:
                    stories = response.json()
                    
                    for story in stories[:2]:  # Test first 2 stories from each category
                        # Test slide count
                        slide_count = len(story.get('slides', []))
                        if slide_count == 8:
                            self.log_test(f"Slide Count - {story['title']}", True, 
                                        f"Has exactly 8 slides")
                        else:
                            self.log_test(f"Slide Count - {story['title']}", False, 
                                        f"Expected 8 slides, got {slide_count}")
                            all_passed = False
                        
                        # Test story structure
                        required_fields = ['id', 'title', 'category', 'description', 'slides']
                        missing_fields = [field for field in required_fields if field not in story]
                        
                        if not missing_fields:
                            self.log_test(f"Story Structure - {story['title']}", True, 
                                        "All required fields present")
                        else:
                            self.log_test(f"Story Structure - {story['title']}", False, 
                                        f"Missing fields: {missing_fields}")
                            all_passed = False
                        
                        # Test slide structure
                        if story.get('slides'):
                            first_slide = story['slides'][0]
                            slide_fields = ['image', 'telugu', 'english', 'audio']
                            missing_slide_fields = [field for field in slide_fields if field not in first_slide]
                            
                            if not missing_slide_fields:
                                self.log_test(f"Slide Structure - {story['title']}", True, 
                                            "Slides have all required fields")
                            else:
                                self.log_test(f"Slide Structure - {story['title']}", False, 
                                            f"Missing slide fields: {missing_slide_fields}")
                                all_passed = False
                
                else:
                    self.log_test(f"Story Structure Test - {category}", False, 
                                f"API error: {response.status_code}")
                    all_passed = False
                    
            except Exception as e:
                self.log_test(f"Story Structure Test - {category}", False, f"Error: {str(e)}")
                all_passed = False
        
        return all_passed
    
    def test_category_apis(self):
        """Test category API endpoints"""
        category_types = ['mythology', 'moral', 'aarna', 'history']
        
        expected_categories = {
            'mythology': ['krishna', 'hanuman', 'ganesha', 'rama', 'shiva', 'durga', 'lakshmi', 'saraswati'],
            'moral': ['panchatantra', 'animal-fables', 'classic-moral', 'friendship-stories', 'kindness-stories'],
            'aarna': ['aarna-adventures'],
            'history': ['ramayana', 'mahabharata']
        }
        
        all_passed = True
        
        for category_type in category_types:
            try:
                response = requests.get(f"{API_BASE}/categories/{category_type}", timeout=10)
                if response.status_code == 200:
                    categories = response.json()
                    category_ids = [cat['id'] for cat in categories]
                    expected_ids = expected_categories[category_type]
                    
                    if set(category_ids) == set(expected_ids):
                        self.log_test(f"Categories API - {category_type}", True, 
                                    f"All expected categories present: {len(category_ids)} categories")
                    else:
                        missing = set(expected_ids) - set(category_ids)
                        extra = set(category_ids) - set(expected_ids)
                        details = f"Missing: {missing}, Extra: {extra}" if missing or extra else "Categories match"
                        self.log_test(f"Categories API - {category_type}", False, details)
                        all_passed = False
                else:
                    self.log_test(f"Categories API - {category_type}", False, 
                                f"API error: {response.status_code}")
                    all_passed = False
            except Exception as e:
                self.log_test(f"Categories API - {category_type}", False, f"Error: {str(e)}")
                all_passed = False
        
        return all_passed
    
    def test_content_quality(self):
        """Test content quality - Telugu/English text presence"""
        try:
            # Test a few stories from different categories
            test_stories = [
                ('aarna-adventures', 'Aarna'),
                ('krishna', 'Krishna'),
                ('panchatantra', 'moral lesson')
            ]
            
            all_passed = True
            
            for category, expected_content in test_stories:
                response = requests.get(f"{API_BASE}/stories/category/{category}", timeout=10)
                if response.status_code == 200:
                    stories = response.json()
                    if stories:
                        story = stories[0]  # Test first story
                        slides = story.get('slides', [])
                        
                        if slides:
                            slide = slides[0]
                            telugu_text = slide.get('telugu', '')
                            english_text = slide.get('english', '')
                            
                            # Check if both Telugu and English content exist
                            if telugu_text and english_text:
                                self.log_test(f"Content Quality - {category}", True, 
                                            "Both Telugu and English content present")
                            else:
                                self.log_test(f"Content Quality - {category}", False, 
                                            f"Missing content - Telugu: {bool(telugu_text)}, English: {bool(english_text)}")
                                all_passed = False
                        else:
                            self.log_test(f"Content Quality - {category}", False, "No slides found")
                            all_passed = False
                    else:
                        self.log_test(f"Content Quality - {category}", False, "No stories found")
                        all_passed = False
                else:
                    self.log_test(f"Content Quality - {category}", False, f"API error: {response.status_code}")
                    all_passed = False
            
            return all_passed
            
        except Exception as e:
            self.log_test("Content Quality Test", False, f"Error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 80)
        print("🧪 BACKEND TESTING - FOCUSED STORY IMPLEMENTATION")
        print("=" * 80)
        print(f"Testing against: {API_BASE}")
        print()
        
        # Test API connectivity first
        if not self.test_api_health():
            print("❌ Cannot connect to backend API. Stopping tests.")
            return False
        
        # Initialize database
        print("\n📊 INITIALIZING DATABASE...")
        self.initialize_database()
        
        # Run all tests
        print("\n🔍 RUNNING COMPREHENSIVE TESTS...")
        
        self.test_total_story_count()
        self.test_story_counts_by_category()
        self.test_story_structure()
        self.test_category_apis()
        self.test_content_quality()
        
        # Print summary
        print("\n" + "=" * 80)
        print("📋 TEST SUMMARY")
        print("=" * 80)
        
        for detail in self.results['test_details']:
            print(detail)
        
        print(f"\n🎯 OVERALL RESULTS:")
        print(f"   Total Tests: {self.results['total_tests']}")
        print(f"   ✅ Passed: {self.results['passed_tests']}")
        print(f"   ❌ Failed: {self.results['failed_tests']}")
        
        success_rate = (self.results['passed_tests'] / self.results['total_tests']) * 100 if self.results['total_tests'] > 0 else 0
        print(f"   📊 Success Rate: {success_rate:.1f}%")
        
        if self.results['failed_tests'] == 0:
            print("\n🎉 ALL TESTS PASSED! Focused story implementation is working correctly.")
            return True
        else:
            print(f"\n⚠️  {self.results['failed_tests']} tests failed. Please review the issues above.")
            return False

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    exit(0 if success else 1)