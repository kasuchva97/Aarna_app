import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { ArrowLeft, ArrowRight, Home, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Audio Context for TTS
const audioContext = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;

// Text-to-Speech function
const speakText = (text, lang = 'te-IN') => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    utterance.volume = 0.8;
    
    // Try to get appropriate voice
    const voices = speechSynthesis.getVoices();
    const teluguVoice = voices.find(voice => voice.lang.includes('te'));
    const englishVoice = voices.find(voice => voice.lang.includes('en'));
    
    if (lang === 'te-IN' && teluguVoice) {
      utterance.voice = teluguVoice;
    } else if (lang === 'en-US' && englishVoice) {
      utterance.voice = englishVoice;
    }
    
    speechSynthesis.speak(utterance);
    return utterance;
  }
  return null;
};

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card 
            className="p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-br from-pink-100 to-rose-200 border-4 border-pink-300"
            onClick={() => onNavigate('aarna')}
          >
            <div className="text-center space-y-6">
              <div className="text-6xl">🌟</div>
              <h2 className="text-3xl font-bold text-pink-700">Aarna's Adventures</h2>
              <p className="text-lg text-pink-600">Amazing adventures with Aarna, Ram, and Lahari!</p>
            </div>
          </Card>
          
          <Card 
            className="p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-200 border-4 border-blue-300"
            onClick={() => onNavigate('mythology')}
          >
            <div className="text-center space-y-6">
              <div className="text-6xl">🏛️</div>
              <h2 className="text-3xl font-bold text-blue-700">Mythology Stories</h2>
              <p className="text-lg text-blue-600">Discover amazing tales of gods and heroes!</p>
            </div>
          </Card>
          
          <Card 
            className="p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-br from-green-100 to-emerald-200 border-4 border-green-300"
            onClick={() => onNavigate('moral')}
          >
            <div className="text-center space-y-6">
              <div className="text-6xl">🦁</div>
              <h2 className="text-3xl font-bold text-green-700">Moral Stories</h2>
              <p className="text-lg text-green-600">Learn valuable lessons through fun tales!</p>
            </div>
          </Card>
          
          <Card 
            className="p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-br from-amber-100 to-yellow-200 border-4 border-amber-300"
            onClick={() => onNavigate('history')}
          >
            <div className="text-center space-y-6">
              <div className="text-6xl">📚</div>
              <h2 className="text-3xl font-bold text-amber-700">History Stories</h2>
              <p className="text-lg text-amber-600">Epic tales from Ramayana and Mahabharata!</p>
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
    { 
      id: 'krishna', 
      name: 'Krishna', 
      image: 'https://images.unsplash.com/photo-1641730259879-ad98e7db7bcb', 
      emoji: '🦚',
      fallback: 'https://images.pexels.com/photos/33444855/pexels-photo-33444855.jpeg' 
    },
    { 
      id: 'hanuman', 
      name: 'Hanuman', 
      image: 'https://images.unsplash.com/photo-1730191567375-e82ce67160df', 
      emoji: '🐒',
      fallback: 'https://images.unsplash.com/photo-1564984069790-2d0767de5856' 
    },
    { 
      id: 'ganesha', 
      name: 'Ganesha', 
      image: 'https://images.unsplash.com/photo-1567591391293-f9a99c77e128', 
      emoji: '🐘',
      fallback: 'https://images.unsplash.com/photo-1567591414240-e9c1e59f3e06' 
    },
    { 
      id: 'rama', 
      name: 'Rama', 
      image: 'https://images.unsplash.com/photo-1609309783328-b2fcbf559d14', 
      emoji: '🏹',
      fallback: 'https://images.pexels.com/photos/30323414/pexels-photo-30323414.jpeg' 
    },
    { 
      id: 'shiva', 
      name: 'Shiva', 
      image: 'https://images.unsplash.com/photo-1566890910598-c5768889e83e', 
      emoji: '🔱',
      fallback: 'https://images.pexels.com/photos/6556790/pexels-photo-6556790.jpeg' 
    },
    { 
      id: 'durga', 
      name: 'Durga', 
      image: 'https://images.pexels.com/photos/2969469/pexels-photo-2969469.jpeg', 
      emoji: '👑',
      fallback: 'https://images.pexels.com/photos/12428561/pexels-photo-12428561.jpeg' 
    },
    { 
      id: 'lakshmi', 
      name: 'Lakshmi', 
      image: 'https://images.pexels.com/photos/12428566/pexels-photo-12428566.jpeg', 
      emoji: '🪷',
      fallback: 'https://images.pexels.com/photos/16354577/pexels-photo-16354577.jpeg' 
    },
    { 
      id: 'saraswati', 
      name: 'Saraswati', 
      image: 'https://images.pexels.com/photos/16354577/pexels-photo-16354577.jpeg', 
      emoji: '🎼',
      fallback: 'https://images.pexels.com/photos/12428566/pexels-photo-12428566.jpeg' 
    },
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
                      e.target.src = god.fallback;
                      e.target.onerror = () => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      };
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

// Aarna Adventures Grid
const AarnaGrid = ({ onNavigate, onBack }) => {
  const categories = [
    { id: 'aarna-adventures', name: "Aarna's Adventures", emoji: '🌟', color: 'from-pink-100 to-rose-200' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Button onClick={onBack} className="mr-4 bg-white hover:bg-gray-100 text-pink-700 border-2 border-pink-300">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-pink-700">Aarna's Adventures</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className={`p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-br ${category.color} border-4 border-pink-200`}
              onClick={() => onNavigate('stories', category.id)}
            >
              <div className="text-center space-y-6">
                <div className="text-6xl">{category.emoji}</div>
                <h3 className="text-2xl font-bold text-pink-700">{category.name}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// History Stories Grid
const HistoryGrid = ({ onNavigate, onBack }) => {
  const categories = [
    { id: 'ramayana', name: 'Ramayana Stories', emoji: '🏹', color: 'from-amber-100 to-orange-200' },
    { id: 'mahabharata', name: 'Mahabharata Stories', emoji: '⚔️', color: 'from-yellow-100 to-amber-200' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Button onClick={onBack} className="mr-4 bg-white hover:bg-gray-100 text-amber-700 border-2 border-amber-300">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-amber-700">Epic History Stories</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className={`p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-br ${category.color} border-4 border-amber-200`}
              onClick={() => onNavigate('stories', category.id)}
            >
              <div className="text-center space-y-6">
                <div className="text-6xl">{category.emoji}</div>
                <h3 className="text-2xl font-bold text-amber-700">{category.name}</h3>
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
    { id: 'friendship-stories', name: 'Friendship Stories', emoji: '🤝', color: 'from-pink-100 to-rose-200' },
    { id: 'kindness-stories', name: 'Kindness Stories', emoji: '💝', color: 'from-yellow-100 to-amber-200' },
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
    // Hindu God Stories
    krishna: [
      { id: 'krishna-butter', title: 'Krishna and the Butter Pot', description: 'Little Krishna\'s mischievous adventures', emoji: '🧈' },
      { id: 'krishna-kaliya', title: 'Krishna and the Serpent Kaliya', description: 'How Krishna defeated the mighty serpent', emoji: '🐍' }
    ],
    hanuman: [
      { id: 'hanuman-sun', title: 'Hanuman Flies to the Sun', description: 'The brave monkey god\'s amazing adventure', emoji: '☀️' },
      { id: 'hanuman-mountain', title: 'Hanuman Lifts the Mountain', description: 'How Hanuman saved Lakshmana\'s life', emoji: '⛰️' }
    ],
    ganesha: [
      { id: 'ganesha-moon', title: 'Ganesha and the Moon', description: 'Why Ganesha cursed the moon', emoji: '🌙' },
      { id: 'ganesha-writer', title: 'Ganesha the Great Writer', description: 'How Ganesha became the scribe of the Mahabharata', emoji: '✍️' }
    ],
    rama: [
      { id: 'rama-bow', title: 'Rama Breaks the Bow', description: 'How Prince Rama won Sita\'s hand', emoji: '🏹' },
      { id: 'rama-forest', title: 'Rama in the Forest', description: 'Rama\'s exile and adventures in the forest', emoji: '🌲' }
    ],
    shiva: [
      { id: 'shiva-dance', title: 'Shiva\'s Cosmic Dance', description: 'The dance that creates and destroys the universe', emoji: '💃' },
      { id: 'shiva-ganges', title: 'Shiva and the River Ganges', description: 'How Shiva brought the holy river to earth', emoji: '🌊' }
    ],
    durga: [
      { id: 'durga-demon', title: 'Durga and the Buffalo Demon', description: 'How Goddess Durga defeated Mahishasura', emoji: '⚔️' },
      { id: 'durga-power', title: 'Durga\'s Divine Power', description: 'The story of the fierce goddess\'s strength', emoji: '💪' }
    ],
    lakshmi: [
      { id: 'lakshmi-ocean', title: 'Lakshmi from the Ocean', description: 'How the goddess of wealth emerged from the sea', emoji: '🌊' },
      { id: 'lakshmi-vishnu', title: 'Lakshmi and Vishnu', description: 'The eternal love story of divine couple', emoji: '💕' }
    ],
    saraswati: [
      { id: 'saraswati-music', title: 'Saraswati\'s Gift of Music', description: 'How the goddess blessed the world with music', emoji: '🎵' },
      { id: 'saraswati-knowledge', title: 'Saraswati and the Gift of Knowledge', description: 'The story of wisdom and learning', emoji: '📚' }
    ],

    // Moral Story Categories
    'panchatantra': [
      { id: 'monkey-crocodile', title: 'The Monkey and the Crocodile', description: 'A tale of quick thinking and friendship', emoji: '🐒' },
      { id: 'tortoise-geese', title: 'The Tortoise and the Geese', description: 'Why we should listen to wise advice', emoji: '🐢' },
      { id: 'brahmin-goat', title: 'The Brahmin and the Goat', description: 'Don\'t believe everything you hear', emoji: '🐐' }
    ],
    'animal-fables': [
      { id: 'lion-mouse', title: 'The Lion and the Mouse', description: 'A small act of kindness saves the day', emoji: '🦁' },
      { id: 'ant-grasshopper', title: 'The Ant and the Grasshopper', description: 'The importance of hard work and planning', emoji: '🐜' },
      { id: 'fox-grapes', title: 'The Fox and the Grapes', description: 'Don\'t give up too easily on your dreams', emoji: '🦊' },
      { id: 'rabbit-tortoise', title: 'The Rabbit and the Tortoise', description: 'Slow and steady wins the race', emoji: '🐰' }
    ],
    'classic-moral': [
      { id: 'boy-wolf', title: 'The Boy Who Cried Wolf', description: 'Always tell the truth', emoji: '🐺' },
      { id: 'golden-eggs', title: 'The Goose with Golden Eggs', description: 'Don\'t be too greedy', emoji: '🪿' },
      { id: 'country-city-mouse', title: 'The Country Mouse and City Mouse', description: 'Simple life can be better than fancy life', emoji: '🐭' }
    ],
    'friendship-stories': [
      { id: 'dog-elephant', title: 'The Dog and the Elephant', description: 'True friends come in all sizes', emoji: '🐕' },
      { id: 'birds-together', title: 'The Birds Who Stayed Together', description: 'Unity is strength', emoji: '🐦' }
    ],
    'kindness-stories': [
      { id: 'kind-woodcutter', title: 'The Kind Woodcutter', description: 'Honesty is always rewarded', emoji: '🪓' },
      { id: 'helpful-sparrow', title: 'The Helpful Little Sparrow', description: 'Small acts of kindness matter', emoji: '🐦' }
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);

  const stories = {
    // Enhanced Hanuman Sun Story with more slides
    'hanuman-sun': {
      title: 'Hanuman Flies to the Sun',
      slides: [
        {
          image: 'https://images.unsplash.com/photo-1730191567375-e82ce67160df',
          telugu: 'చిన్న హనుమాన్ ఒక తెలివైన మరియు బలమైన వానర బాలుడు. అతను ఎల్లప్పుడూ ఆట మరియు రోమాంచకమైన సాహసాలను వెతుకుతూ ఉండేవాడు.',
          english: 'Little Hanuman was a clever and strong monkey child. He was always looking for games and exciting adventures.',
          audio: 'hanuman-slide-1.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1525490829609-d166ddb58678',
          telugu: 'ఒక ఉదయం హనుమాన్ ఆకాశంలో మెరుస్తున్న పెద్ద ఎర్రని సూర్యుడిని చూశాడు. "అది ఎంత అందమైన పండు!" అని అనుకున్నాడు.',
          english: 'One morning, Hanuman saw the big, bright red sun shining in the sky. "What a beautiful fruit!" he thought.',
          audio: 'hanuman-slide-2.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1654463085571-85d4edcea4dc',
          telugu: 'హనుమాన్ గాలిలో దూకి, తన దైవిక శక్తులను ఉపయోగించి సూర్యుడి వైపు వేగంగా ఎగరడం మొదలుపెట్టాడు. అతను మేఘాలను దాటి వెళ్ళాడు.',
          english: 'Hanuman jumped into the air and started flying fast towards the sun using his divine powers. He soared past the clouds.',
          audio: 'hanuman-slide-3.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1604949210966-9440c324823f',
          telugu: 'హనుమాన్ వేగంగా ఎగురుతుండగా, సూర్యుడు మరింత పెద్దదిగా మరియు మరింత వేడిమిగా అయ్యాడు. కానీ హనుమాన్ భయపడలేదు.',
          english: 'As Hanuman flew faster, the sun became bigger and hotter. But Hanuman was not afraid.',
          audio: 'hanuman-slide-4.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1579539447503-ec82f0aab843',
          telugu: 'అప్పుడు దేవతలు హనుమాన్‌ని చూశారు. వారు చాలా ఆశ్చర్యపోయారు మరియు భయపడ్డారు. "ఈ చిన్న వానరుడు సూర్యుడిని తింటే ప్రపంచం చీకటిలో మునిగిపోతుంది!" అని వారు అనుకున్నారు.',
          english: 'Then the gods saw Hanuman. They were very surprised and worried. "If this little monkey eats the sun, the world will be in darkness!" they thought.',
          audio: 'hanuman-slide-5.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1654463084969-339ebab5c207',
          telugu: 'ఇంద్రుడు తన వజ్రాయుధాన్ని హనుమాన్ మీద విసిరాడు. హనుమాన్ భూమి మీద పడ్డాడు, కానీ అతను గాయపడలేదు. అతని తల్లి అతనిని కౌగిలించుకుంది.',
          english: 'Indra threw his thunderbolt at Hanuman. Hanuman fell to earth, but he was not badly hurt. His mother hugged him tight.',
          audio: 'hanuman-slide-6.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1696527014256-4755b3ac0b4a',
          telugu: 'దేవతలు హనుమాన్‌కు చాలా ఆశీర్వాదాలు ఇచ్చారు. అప్పటి నుండి హనుమాన్ ఎల్లప్పుడూ మంచి కోసం తన శక్తులను ఉపయోగించాడు.',
          english: 'The gods gave Hanuman many blessings. From that day on, Hanuman always used his powers for good.',
          audio: 'hanuman-slide-7.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1696527018053-3343b9853505',
          telugu: 'నైతిక పాఠం: ధైర్యం మంచిది, కానీ జ్ఞానం మరియు వినయంతో కూడా ఉండాలి. మన శక్తులను ఎల్లప్పుడూ మంచి కార్యాలకు ఉపయోగించాలి.',
          english: 'Moral: Courage is good, but it should be combined with wisdom and humility. We should always use our powers for good deeds.',
          audio: 'hanuman-moral.mp3'
        }
      ]
    },
    
    // Enhanced Lion Mouse Story
    'lion-mouse': {
      title: 'The Lion and the Mouse',
      slides: [
        {
          image: 'https://images.unsplash.com/photo-1694094537357-57cb4fb17bcc',
          telugu: 'ఒక పెద్ద అడవిలో ఒక గర్వంగా ఉండే సింహం నివసించేది. అతను రాజులా గర్వంగా నడిచేవాడు మరియు అందరూ అతనికి భయపడేవారు.',
          english: 'In a big forest lived a proud lion. He walked like a king with great pride, and everyone was afraid of him.',
          audio: 'lion-slide-1.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1525490829609-d166ddb58678',
          telugu: 'ఒక వేడిమిగిన మధ్యాహ్నం, సింహం ఒక చెట్టు కింద నిద్రపోతూ ఉండేవాడు. అతను గల గలలాడుతూ గాఢనిద్రలో ఉండేవాడు.',
          english: 'One hot afternoon, the lion was sleeping under a tree. He was snoring loudly in deep sleep.',
          audio: 'lion-slide-2.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1531943865082-287018833410',
          telugu: 'ఒక చిన్న ఎలుక ఆట ఆడుతూ సింహం మీద పరిగెత్తింది. సింహం లేచి కోపంగా ఎలుకను పట్టుకున్నాడు.',
          english: 'A tiny mouse was playing and ran across the lion. The lion woke up and angrily caught the little mouse.',
          audio: 'lion-slide-3.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1511172889608-21d24d0d1995',
          telugu: '"దయచేసి నన్ను వదిలేయండి!" ఎలుక వేడుకుంది. "నేను చాలా చిన్నదాన్ని, కానీ ఒక రోజు మీకు సహాయం చేయగలను!" సింహం నవ్వి ఎలుకను వదిలేసాడు.',
          english: '"Please let me go!" begged the mouse. "I am very small, but one day I might be able to help you!" The lion laughed and let the mouse go.',
          audio: 'lion-slide-4.mp3'
        },
        {
          image: 'https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg',
          telugu: 'కొన్ని రోజుల తరువాత, వేటగాళ్ళు సింహాన్ని వలలో పట్టుకున్నారు. సింహం గట్టిగా గర్జించాడు కానీ తప్పించుకోలేకపోయాడు.',
          english: 'A few days later, hunters caught the lion in a net. The lion roared loudly but could not escape.',
          audio: 'lion-slide-5.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1531943865082-287018833410',
          telugu: 'చిన్న ఎలుక సింహం గర్జన విని పరిగెత్తి వచ్చింది. ఆమె తన చిన్న దంతాలతో వలను కొరికి తెంచింది.',
          english: 'The little mouse heard the lion roaring and ran to help. She chewed through the net with her tiny teeth.',
          audio: 'lion-slide-6.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1694094537357-57cb4fb17bcc',
          telugu: 'సింహం స్వేచ్చగా బయటపడ్డాడు. "ధన్యవాదాలు, చిన్న స్నేహితుడా!" అతను అన్నాడు. "నీవు నిజంగా నాకు సహాయం చేశావు!"',
          english: 'The lion was free! "Thank you, little friend!" he said. "You really did help me!"',
          audio: 'lion-slide-7.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1696527018053-3343b9853505',
          telugu: 'నైతిక పాఠం: చిన్న సహాయం కూడా పెద్ద మార్పు తీసుకురాగలదు. ఎవరైనా చిన్న వారైనా లేదా పెద్దవారైనా, అందరూ ముఖ్యమైనవారు.',
          english: 'Moral: Even small acts of kindness can make a big difference. Whether someone is small or big, everyone is important.',
          audio: 'lion-moral.mp3'
        }
      ]
    },

    // New Krishna story
    'krishna-butter': {
      title: 'Krishna and the Butter Pot',
      slides: [
        {
          image: 'https://images.unsplash.com/photo-1641730259879-ad98e7db7bcb',
          telugu: 'చిన్న కృష్ణుడు చాలా కృష్ణుడు మరియు చిలిపిగా ఉండేవాడు. అతను వెన్న తినడానికి చాలా ఇష్టపడేవాడు.',
          english: 'Little Krishna was very playful and mischievous. He loved eating butter more than anything else.',
          audio: 'krishna-butter-1.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1655577480801-2781cb89d628',
          telugu: 'ప్రతిరోజూ కృష్ణుడు తన స్నేహితులతో కలిసి ఇంట్లో ఉన్న వెన్న కుండలను దొంగిలించేవాడు.',
          english: 'Every day Krishna would steal butter pots from houses with his friends.',
          audio: 'krishna-butter-2.mp3'
        },
        {
          image: 'https://images.pexels.com/photos/33444855/pexels-photo-33444855.jpeg',
          telugu: 'ఒక రోజు యశోద మాత కృష్ణుడిని పట్టుకుని, చెట్టుకు కట్టేసింది. కానీ కృష్ణుడు రెండు చెట్లను లాగి పడగొట్టాడు.',
          english: 'One day Mother Yashoda caught Krishna and tied him to a tree. But Krishna pulled down two trees.',
          audio: 'krishna-butter-3.mp3'
        },
        {
          image: 'https://images.unsplash.com/photo-1696527014256-4755b3ac0b4a',
          telugu: 'నైతిక పాఠం: చిలిపితనం సరే కానీ తల్లిదండ్రుల మాట వినాలి.',
          english: 'Moral: Mischief is okay, but we should listen to our parents.',
          audio: 'krishna-butter-moral.mp3'
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
      setIsSpeaking(false);
      // Stop any ongoing speech
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    } else {
      // Show "The End" confetti
      setCurrentSlide('end');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setIsPlaying(false);
      setIsSpeaking(false);
      // Stop any ongoing speech
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    }
  };

  const toggleAudio = () => {
    if (!currentSlideData) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setIsSpeaking(true);
      
      // Speak Telugu first, then English
      const teluguText = currentSlideData.telugu;
      const englishText = currentSlideData.english;
      
      const teluguUtterance = speakText(teluguText, 'te-IN');
      
      if (teluguUtterance) {
        teluguUtterance.onend = () => {
          // Small pause, then speak English
          setTimeout(() => {
            const englishUtterance = speakText(englishText, 'en-US');
            if (englishUtterance) {
              englishUtterance.onend = () => {
                setIsSpeaking(false);
                setIsPlaying(false);
              };
            }
          }, 500);
        };
      }
    }
  };

  // Load voices when component mounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        speechSynthesis.getVoices();
      };
      speechSynthesis.addEventListener('voiceschanged', loadVoices);
      loadVoices();
      
      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, []);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Story Coming Soon!</h1>
          <p className="text-lg text-red-500 mb-6">We're working on this wonderful story for you!</p>
          <Button onClick={onBack} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
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
                key={currentSlide} // Force image update on slide change
                src={currentSlideData.image} 
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
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
                <p className="text-lg font-medium text-orange-800 telugu-text" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
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
                className={`${
                  isSpeaking 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white px-6 py-3 rounded-full text-lg`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-6 h-6 mr-2" />
                    Stop Story
                  </>
                ) : (
                  <>
                    <Volume2 className="w-6 h-6 mr-2" />
                    Play Story
                  </>
                )}
              </Button>
              {isSpeaking && (
                <div className="mt-2 text-sm text-green-600 animate-pulse">
                  🔊 Reading story aloud...
                </div>
              )}
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
      case 'aarna':
        return <AarnaGrid onNavigate={navigate} onBack={goBack} />;
      case 'mythology':
        return <MythologyGrid onNavigate={navigate} onBack={goBack} />;
      case 'moral':
        return <MoralGrid onNavigate={navigate} onBack={goBack} />;
      case 'history':
        return <HistoryGrid onNavigate={navigate} onBack={goBack} />;
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