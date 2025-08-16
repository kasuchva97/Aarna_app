import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { ArrowLeft, ArrowRight, Home, Play, Pause, Volume2 } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Confetti Component
const Confetti = () => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'];
    const newPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -10,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      speed: Math.random() * 3 + 2,
      drift: Math.random() * 2 - 1,
    }));
    setPieces(newPieces);

    const interval = setInterval(() => {
      setPieces(prev => prev.map(piece => ({
        ...piece,
        y: piece.y + piece.speed,
        x: piece.x + piece.drift,
        rotation: piece.rotation + 2,
      })).filter(piece => piece.y < window.innerHeight + 20));
    }, 50);

    setTimeout(() => clearInterval(interval), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
};

// Splash Screen
const SplashScreen = ({ onComplete }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowConfetti(true), 500);
    const timer2 = setTimeout(() => onComplete(), 4000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex flex-col items-center justify-center relative overflow-hidden">
      {showConfetti && <Confetti />}
      
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        <div className="text-6xl animate-bounce">🎉</div>
        
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            Happy 4th Birthday
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-pink-600 animate-pulse">
            Aarna Nyra ❤️
          </h2>
        </div>
        
        <div className="text-2xl animate-pulse">🎂✨🎈</div>
      </div>
    </div>
  );
};

// Home Screen
const HomeScreen = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4 font-['Comic_Sans_MS']">
            My Little Storybook
          </h1>
          <p className="text-xl text-purple-600 font-medium">Choose your adventure!</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
          <Card 
            className="flex-1 p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-200 border-4 border-blue-300"
            onClick={() => onNavigate('mythology')}
          >
            <div className="text-center space-y-6">
              <div className="text-6xl">🏛️</div>
              <h2 className="text-3xl font-bold text-blue-700">Mythology Stories</h2>
              <p className="text-lg text-blue-600">Discover amazing tales of gods and heroes!</p>
            </div>
          </Card>
          
          <Card 
            className="flex-1 p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-br from-green-100 to-emerald-200 border-4 border-green-300"
            onClick={() => onNavigate('moral')}
          >
            <div className="text-center space-y-6">
              <div className="text-6xl">🦁</div>
              <h2 className="text-3xl font-bold text-green-700">Moral Stories</h2>
              <p className="text-lg text-green-600">Learn valuable lessons through fun tales!</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Mythology Grid
const MythologyGrid = ({ onNavigate, onBack }) => {
  const gods = [
    { id: 'krishna', name: 'Krishna', image: 'https://images.unsplash.com/photo-1719500494935-c1a5e50a3ce9', emoji: '🦚' },
    { id: 'hanuman', name: 'Hanuman', image: 'https://images.pexels.com/photos/8051165/pexels-photo-8051165.jpeg', emoji: '🐒' },
    { id: 'ganesha', name: 'Ganesha', image: 'https://images.unsplash.com/photo-1696586905995-4a4fc35c45f6', emoji: '🐘' },
    { id: 'rama', name: 'Rama', image: 'https://images.pexels.com/photos/24821170/pexels-photo-24821170.jpeg', emoji: '🏹' },
    { id: 'shiva', name: 'Shiva', image: 'https://images.pexels.com/photos/12428561/pexels-photo-12428561.jpeg', emoji: '🔱' },
    { id: 'durga', name: 'Durga', image: 'https://images.pexels.com/photos/2969469/pexels-photo-2969469.jpeg', emoji: '👑' },
    { id: 'lakshmi', name: 'Lakshmi', image: 'https://images.pexels.com/photos/12428566/pexels-photo-12428566.jpeg', emoji: '🪷' },
    { id: 'saraswati', name: 'Saraswati', image: 'https://images.pexels.com/photos/16354577/pexels-photo-16354577.jpeg', emoji: '🎼' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Button onClick={onBack} className="mr-4 bg-white hover:bg-gray-100 text-purple-700 border-2 border-purple-300">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-purple-700">Choose Your God</h1>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gods.map((god) => (
            <Card 
              key={god.id}
              className="p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-white border-3 border-purple-200"
              onClick={() => onNavigate('stories', god.id)}
            >
              <div className="text-center space-y-4">
                <div className="w-full h-32 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                  <img 
                    src={god.image} 
                    alt={god.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full hidden items-center justify-center text-4xl">
                    {god.emoji}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-purple-700">{god.name}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Moral Stories Grid
const MoralGrid = ({ onNavigate, onBack }) => {
  const categories = [
    { id: 'panchatantra', name: 'Panchatantra Tales', emoji: '🦊', color: 'from-orange-100 to-red-200' },
    { id: 'animal-fables', name: 'Animal Fables', emoji: '🦁', color: 'from-green-100 to-emerald-200' },
    { id: 'classic-moral', name: 'Classic Moral Stories', emoji: '📚', color: 'from-blue-100 to-indigo-200' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-blue-100">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Button onClick={onBack} className="mr-4 bg-white hover:bg-gray-100 text-green-700 border-2 border-green-300">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-green-700">Choose Story Type</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className={`p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-br ${category.color} border-4 border-green-200`}
              onClick={() => onNavigate('stories', category.id)}
            >
              <div className="text-center space-y-6">
                <div className="text-6xl">{category.emoji}</div>
                <h3 className="text-2xl font-bold text-green-700">{category.name}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Stories List
const StoriesList = ({ category, onNavigate, onBack }) => {
  const stories = {
    hanuman: [
      { id: 'hanuman-sun', title: 'Hanuman Flies to the Sun', description: 'The brave monkey god\'s amazing adventure', emoji: '☀️' }
    ],
    'animal-fables': [
      { id: 'lion-mouse', title: 'The Lion and the Mouse', description: 'A small act of kindness saves the day', emoji: '🦁' }
    ]
  };

  const categoryStories = stories[category] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Button onClick={onBack} className="mr-4 bg-white hover:bg-gray-100 text-purple-700 border-2 border-purple-300">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-purple-700">Stories</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {categoryStories.map((story) => (
            <Card 
              key={story.id}
              className="p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-white border-3 border-purple-200"
              onClick={() => onNavigate('story', story.id)}
            >
              <div className="space-y-4">
                <div className="text-4xl text-center">{story.emoji}</div>
                <h3 className="text-2xl font-bold text-purple-700 text-center">{story.title}</h3>
                <p className="text-lg text-purple-600 text-center">{story.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Story Viewer
const StoryViewer = ({ storyId, onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const stories = {
    'hanuman-sun': {
      title: 'Hanuman Flies to the Sun',
      slides: [
        {
          image: 'https://images.pexels.com/photos/8051165/pexels-photo-8051165.jpeg',
          telugu: 'హనుమాన్ ఒక చిన్న వానరుడు. అతను సూర్యుడిని పండుగ అని అనుకున్నాడు.',
          english: 'Little Hanuman saw the bright sun and thought it was a delicious fruit.',
          audio: 'hanuman-slide-1.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1743964451734-90a90b395a84',
          telugu: 'హనుమాన్ సూర్యుడి వైపు దూకాడు. అతను చాలా వేగంగా ఎగిరాడు.',
          english: 'Brave Hanuman leaped towards the sun, flying faster and faster through the sky.',
          audio: 'hanuman-slide-2.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1632302937441-3dcd8af686e5',
          telugu: 'దేవతలు భయపడ్డారు. వారు హనుమాన్‌ను ఆపాలని అనుకున్నారు.',
          english: 'The gods were worried and decided they must stop little Hanuman.',
          audio: 'hanuman-slide-3.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1696527014256-4755b3ac0b4a',
          telugu: 'నైతిక పాఠం: ధైర్యం మంచిది, కానీ జ్ఞానంతో కూడా ఉండాలి.',
          english: 'Moral: Courage is good, but it should be combined with wisdom.',
          audio: 'hanuman-moral.mp3'
        }
      ]
    },
    'lion-mouse': {
      title: 'The Lion and the Mouse',
      slides: [
        {
          image: 'https://images.unsplash.com/photo-1743964451734-90a90b395a84',
          telugu: 'ఒక పెద్ద సింహం అడవిలో నిద్రపోతూ ఉండేది.',
          english: 'A big lion was sleeping peacefully in the forest.',
          audio: 'lion-slide-1.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1742404894161-75ef71f65be0',
          telugu: 'ఒక చిన్న ఎలుక సింహం మీద పరిగెత్తింది.',
          english: 'A tiny mouse ran across the lion and woke him up.',
          audio: 'lion-slide-2.mp3'
        },
        {
          image: 'https://images.pexels.com/photos/33443603/pexels-photo-33443603.jpeg',
          telugu: 'ఎలుక సింహాన్ని కబళింపజేయకుండా వేటగాళ్ళ వలల నుండి రక్షించింది.',
          english: 'The little mouse helped free the lion from hunters\' nets.',
          audio: 'lion-slide-3.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1696527018053-3343b9853505',
          telugu: 'నైతిక పాఠం: చిన్న సహాయం కూడా పెద్ద మార్పు తీసుకురాగలదు.',
          english: 'Moral: Even small acts of kindness can make a big difference.',
          audio: 'lion-moral.mp3'
        }
      ]
    }
  };

  const story = stories[storyId];
  const currentSlideData = story?.slides[currentSlide];

  const nextSlide = () => {
    if (currentSlide < story.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setIsPlaying(false);
    } else {
      // Show "The End" confetti
      setCurrentSlide('end');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would play/pause actual audio files
  };

  if (!story) {
    return <div>Story not found</div>;
  }

  if (currentSlide === 'end') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex flex-col items-center justify-center relative overflow-hidden">
        <Confetti />
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <div className="text-6xl">🎭</div>
          <h1 className="text-4xl font-bold text-purple-700">The End</h1>
          <div className="text-4xl">✨🎉✨</div>
          <Button 
            onClick={onBack}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-xl rounded-full"
          >
            <Home className="w-6 h-6 mr-2" />
            Back to Stories
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} className="bg-white hover:bg-gray-100 text-purple-700 border-2 border-purple-300">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-purple-700">{story.title}</h1>
          <div className="text-lg font-medium text-purple-600">
            {currentSlide + 1} / {story.slides.length}
          </div>
        </div>

        {/* Story Content */}
        <Card className="max-w-4xl mx-auto p-6 shadow-2xl bg-white">
          <div className="space-y-6">
            {/* Image */}
            <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
              <img 
                src={currentSlideData.image} 
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full hidden items-center justify-center text-6xl">
                🎨
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                <p className="text-lg font-medium text-orange-800" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
                  {currentSlideData.telugu}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-lg text-blue-800">
                  {currentSlideData.english}
                </p>
              </div>
            </div>

            {/* Audio Control */}
            <div className="text-center">
              <Button 
                onClick={toggleAudio}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full"
              >
                {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
                {isPlaying ? 'Pause' : 'Play'} Story
                <Volume2 className="w-6 h-6 ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
          <Button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-xl rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-8 h-8 mr-2" />
            Previous
          </Button>
          
          <Button 
            onClick={nextSlide}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-xl rounded-full"
          >
            Next
            <ArrowRight className="w-8 h-8 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [screenStack, setScreenStack] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentStoryId, setCurrentStoryId] = useState(null);

  const navigate = (screen, param = null) => {
    setScreenStack(prev => [...prev, { screen: currentScreen, category: currentCategory, storyId: currentStoryId }]);
    setCurrentScreen(screen);
    
    if (screen === 'stories') {
      setCurrentCategory(param);
    } else if (screen === 'story') {
      setCurrentStoryId(param);
    }
  };

  const goBack = () => {
    if (screenStack.length > 0) {
      const previous = screenStack[screenStack.length - 1];
      setScreenStack(prev => prev.slice(0, -1));
      setCurrentScreen(previous.screen);
      setCurrentCategory(previous.category);
      setCurrentStoryId(previous.storyId);
    } else {
      setCurrentScreen('home');
      setCurrentCategory(null);
      setCurrentStoryId(null);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomeScreen onNavigate={navigate} />;
      case 'mythology':
        return <MythologyGrid onNavigate={navigate} onBack={goBack} />;
      case 'moral':
        return <MoralGrid onNavigate={navigate} onBack={goBack} />;
      case 'stories':
        return <StoriesList category={currentCategory} onNavigate={navigate} onBack={goBack} />;
      case 'story':
        return <StoryViewer storyId={currentStoryId} onBack={goBack} />;
      default:
        return <HomeScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;