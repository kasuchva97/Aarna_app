import React, { useState, useEffect } from 'react';
import SplashScreen from './screens/SplashScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import { MythologyGrid, AarnaGrid, HistoryGrid, PoemsGrid, MoralGrid, FunZoneGrid } from './screens/Grids';
import PoemsList from './screens/PoemsList';
import PoemViewer from './screens/PoemViewer';
import GameViewer from './screens/GameViewer';
import StoriesList from './screens/StoriesList';
import StoryViewer from './screens/StoryViewer';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedPoem, setSelectedPoem] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Check if profile exists in localStorage
    const savedProfile = localStorage.getItem('aarnaAppProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleProfileComplete = (profileInfo) => {
    setProfile(profileInfo);
    setCurrentScreen('home');
  };

  const handleSplashComplete = () => {
    if (profile) {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('profile');
    }
  };

  const navigateTo = (screen, id = null) => {
    // Cancel any ongoing speech when navigating away
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }

    setCurrentScreen(screen);
    if (screen === 'stories') setSelectedCategory(id);
    else if (screen === 'story') setSelectedStory(id);
    else if (screen === 'poems-list') setSelectedCategory(id);
    else if (screen === 'poem') setSelectedPoem(id);
    else if (screen === 'game') setSelectedGame(id);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      case 'profile':
        return <ProfileScreen onComplete={handleProfileComplete} />;
      case 'home':
        return <HomeScreen onNavigate={navigateTo} profile={profile} />;
      case 'aarna':
        return <AarnaGrid onNavigate={navigateTo} onBack={() => navigateTo('home')} profile={profile} />;
      case 'mythology':
        return <MythologyGrid onNavigate={navigateTo} onBack={() => navigateTo('home')} />;
      case 'moral':
        return <MoralGrid onNavigate={navigateTo} onBack={() => navigateTo('home')} />;
      case 'history':
        return <HistoryGrid onNavigate={navigateTo} onBack={() => navigateTo('home')} />;
      case 'poems':
        return <PoemsGrid onNavigate={navigateTo} onBack={() => navigateTo('home')} />;
      case 'funzone':
        return <FunZoneGrid onNavigate={navigateTo} onBack={() => navigateTo('home')} />;
      case 'stories':
        return <StoriesList category={selectedCategory} onNavigate={navigateTo} onBack={() => {
          if (selectedCategory === 'aarna-adventures') navigateTo('aarna');
          else if (['krishna', 'hanuman', 'ganesha', 'rama', 'shiva', 'durga', 'lakshmi', 'saraswati'].includes(selectedCategory)) navigateTo('mythology');
          else if (['ramayana', 'mahabharata'].includes(selectedCategory)) navigateTo('history');
          else navigateTo('moral');
        }} profile={profile} />;
      case 'story':
        return <StoryViewer storyId={selectedStory} onBack={() => navigateTo('stories', selectedCategory)} profile={profile} />;
      case 'poems-list':
        return <PoemsList category={selectedCategory} onNavigate={navigateTo} onBack={() => navigateTo('poems')} />;
      case 'poem':
        return <PoemViewer poemId={selectedPoem} onBack={() => navigateTo('poems-list', selectedCategory)} />;
      case 'game':
        return <GameViewer gameId={selectedGame} onBack={() => navigateTo('funzone')} />;
      default:
        return <HomeScreen onNavigate={navigateTo} profile={profile} />;
    }
  };

  return (
    <div className="min-h-screen font-sans">
      {renderScreen()}
    </div>
  );
};

export default App;