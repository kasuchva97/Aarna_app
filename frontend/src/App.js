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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
          
          <Card 
            className="p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-br from-purple-100 to-violet-200 border-4 border-purple-300"
            onClick={() => onNavigate('poems')}
          >
            <div className="text-center space-y-6">
              <div className="text-6xl">🎵</div>
              <h2 className="text-3xl font-bold text-purple-700">Poems</h2>
              <p className="text-lg text-purple-600">Beautiful poems in Telugu and English!</p>
            </div>
          </Card>
          
          <Card 
            className="p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-br from-teal-100 to-cyan-200 border-4 border-teal-300"
            onClick={() => onNavigate('funzone')}
          >
            <div className="text-center space-y-6">
              <div className="text-6xl">🎮</div>
              <h2 className="text-3xl font-bold text-teal-700">Fun Zone</h2>
              <p className="text-lg text-teal-600">Puzzles and games for little ones!</p>
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

// Poems Grid
const PoemsGrid = ({ onNavigate, onBack }) => {
  const poemCategories = [
    { id: 'telugu-poems', name: 'Telugu Poems', emoji: '🇮🇳', color: 'from-orange-100 to-red-200' },
    { id: 'english-poems', name: 'English Poems', emoji: '🎼', color: 'from-blue-100 to-purple-200' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-violet-100 to-pink-100">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Button onClick={onBack} className="mr-4 bg-white hover:bg-gray-100 text-purple-700 border-2 border-purple-300">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-purple-700">Beautiful Poems</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {poemCategories.map((category) => (
            <Card 
              key={category.id}
              className={`p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-br ${category.color} border-4 border-purple-200`}
              onClick={() => onNavigate('poems-list', category.id)}
            >
              <div className="text-center space-y-6">
                <div className="text-6xl">{category.emoji}</div>
                <h3 className="text-2xl font-bold text-purple-700">{category.name}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Poems List Component
const PoemsList = ({ category, onNavigate, onBack }) => {
  const poems = {
    'telugu-poems': [
      { id: 'chandamama', title: 'చందమామ', description: 'అందమైన చందమామ గురించి కవిత', emoji: '🌙' },
      { id: 'nani-pillalu', title: 'నాని పిల్లలు', description: 'చిన్న పిల్లల ఆటల గురించి', emoji: '👶' },
      { id: 'pakshulu', title: 'పక్షులు', description: 'రంగురంగుల పక్షుల గురించి కవిత', emoji: '🐦' },
      { id: 'pushpalu', title: 'పుష్పాలు', description: 'అందమైన పూల గురించి కవిత', emoji: '🌺' },
      { id: 'vana-jeevulu', title: 'వన జీవులు', description: 'అడవి జంతువుల గురించి కవిత', emoji: '🦁' },
      { id: 'varshalu', title: 'వర్షాలు', description: 'వర్షం గురించి ఆనందకరమైన కవిత', emoji: '🌧️' }
    ],
    'english-poems': [
      { id: 'twinkle-star', title: 'Twinkle Twinkle Little Star', description: 'Classic nursery rhyme about stars', emoji: '⭐' },
      { id: 'wheels-bus', title: 'The Wheels on the Bus', description: 'Fun song about a bus ride', emoji: '🚌' },
      { id: 'old-macdonald', title: 'Old MacDonald Had a Farm', description: 'Farm animals and their sounds', emoji: '🚜' },
      { id: 'humpty-dumpty', title: 'Humpty Dumpty', description: 'Classic tale of Humpty Dumpty', emoji: '🥚' },
      { id: 'mary-lamb', title: 'Mary Had a Little Lamb', description: 'Sweet story of Mary and her lamb', emoji: '🐑' },
      { id: 'baa-black-sheep', title: 'Baa Baa Black Sheep', description: 'Traditional nursery rhyme', emoji: '🐑' }
    ]
  };

  const categoryPoems = poems[category] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-violet-100">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Button onClick={onBack} className="mr-4 bg-white hover:bg-gray-100 text-purple-700 border-2 border-purple-300">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-purple-700">Poems</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {categoryPoems.map((poem) => (
            <Card 
              key={poem.id}
              className="p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-white border-3 border-purple-200"
              onClick={() => onNavigate('poem', poem.id)}
            >
              <div className="space-y-4">
                <div className="text-4xl text-center">{poem.emoji}</div>
                <h3 className="text-2xl font-bold text-purple-700 text-center">{poem.title}</h3>
                <p className="text-lg text-purple-600 text-center">{poem.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Poem Viewer Component
const PoemViewer = ({ poemId, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const poems = {
    // Telugu Poems
    'chandamama': {
      title: 'చందమామ',
      language: 'telugu',
      content: `చందమామ దూరంగా ఉన్నావు ఎందుకు?
చిన్న పిల్లలకోసం దిగి రాకు!
రాత్రి అంతా వెలుగు ఇవ్వావు,
తెల్లవారుఝామున దాక్కుంటావు.

వెండి వెలుగుతో మెరుస్తున్నావు,
చిన్న నక్షత్రాలతో ఆడుకుంటున్నావు.
ఆకాశంలో ఎత్తుగా కూర్చున్నావు,
మా కలల్లోకి వచ్చి వెళ్తున్నావు.`,
      meaning: 'అర్థం: ఈ కవిత చంద్రుడి అందం గురించి చెబుతుంది. చంద్రుడు ఎందుకు దూరంగా ఉంటాడో, అతను రాత్రి వేళ ఎలా వెలుగు ఇస్తాడో చిన్న పిల్లలకు తెలియజేస్తుంది.',
      illustration: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78'
    },
    'nani-pillalu': {
      title: 'నాని పిల్లలు',
      language: 'telugu',
      content: `నాని పిల్లలు ఆట ఆడుతున్నారు,
చిన్న చేతుల్తో తాళి కొట్టుకుంటున్నారు.
నవ్వుల్తో నిండిన ముఖాలు,
ఆనందంతో చేస్తున్న వింతలు.

అమ్మ చేసిన లాలి పాట విని,
తల్లి ప్రేమలో మునిగి తేలి,
కళ్లు మూసుకుని నిద్రపోతున్నారు,
కలల రాజ్యంలోకి వెళ్తున్నారు.`,
      meaning: 'అర్థం: ఈ కవిత చిన్న పిల్లల అమాయకత్వం గురించి చెబుతుంది. వారు ఎలా ఆట ఆడతారో, తల్లుల ప్రేమను ఎలా అనుభవిస్తారో తెలియజేస్తుంది.',
      illustration: 'https://images.unsplash.com/photo-1544776527-0818bd051bec'
    },
    
    // English Poems
    'twinkle-star': {
      title: 'Twinkle Twinkle Little Star',
      language: 'english',
      content: `Twinkle, twinkle, little star,
How I wonder what you are!
Up above the world so high,
Like a diamond in the sky.

Twinkle, twinkle, little star,
How I wonder what you are!

When the blazing sun is gone,
When he nothing shines upon,
Then you show your little light,
Twinkle, twinkle, all the night.`,
      meaning: 'Meaning: This classic nursery rhyme expresses wonder about stars. It teaches children to observe and appreciate the beauty of nature, especially the night sky filled with twinkling stars that look like diamonds.',
      illustration: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78'
    },
    'wheels-bus': {
      title: 'The Wheels on the Bus',
      language: 'english',
      content: `The wheels on the bus go round and round,
Round and round, round and round,
The wheels on the bus go round and round,
All through the town!

The wipers on the bus go swish, swish, swish,
Swish, swish, swish, swish, swish, swish,
The wipers on the bus go swish, swish, swish,
All through the town!

The horn on the bus goes beep, beep, beep,
Beep, beep, beep, beep, beep, beep,
The horn on the bus goes beep, beep, beep,
All through the town!`,
      meaning: 'Meaning: This fun song helps children learn about different parts of a bus and their sounds. It encourages movement and helps develop motor skills through actions that match the words.',
      illustration: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'
    }
  };

  const poem = poems[poemId];

  const toggleAudio = () => {
    if (!poem) return;

    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const utterance = speakText(poem.content, poem.language === 'telugu' ? 'te-IN' : 'en-US');
      if (utterance) {
        utterance.onend = () => {
          setIsPlaying(false);
        };
      }
    }
  };

  if (!poem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎵</div>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Poem Coming Soon!</h1>
          <Button onClick={onBack} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-violet-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} className="bg-white hover:bg-gray-100 text-purple-700 border-2 border-purple-300">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-purple-700">{poem.title}</h1>
          <div className="w-20"></div>
        </div>

        <Card className="max-w-4xl mx-auto p-8 shadow-2xl bg-white">
          <div className="space-y-8">
            {/* Illustration */}
            <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden">
              <img 
                src={poem.illustration} 
                alt={poem.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full hidden items-center justify-center text-6xl bg-gradient-to-br from-purple-100 to-pink-100">
                🎵
              </div>
            </div>

            {/* Poem Content */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-purple-800 mb-8">{poem.title}</h2>
              <div className={`text-2xl leading-relaxed font-medium ${poem.language === 'telugu' ? 'font-["Noto Sans Telugu", sans-serif] text-orange-800' : 'text-blue-800'} bg-${poem.language === 'telugu' ? 'orange' : 'blue'}-50 p-8 rounded-lg whitespace-pre-line`}>
                {poem.content}
              </div>
            </div>

            {/* Audio Control */}
            <div className="text-center">
              <Button 
                onClick={toggleAudio}
                className={`${
                  isPlaying 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white px-8 py-4 text-xl rounded-full`}
              >
                {isPlaying ? (
                  <>
                    <VolumeX className="w-6 h-6 mr-2" />
                    Stop Poem
                  </>
                ) : (
                  <>
                    <Volume2 className="w-6 h-6 mr-2" />
                    Play Poem
                  </>
                )}
              </Button>
              {isPlaying && (
                <div className="mt-2 text-sm text-purple-600 animate-pulse">
                  🎵 Reciting poem aloud...
                </div>
              )}
            </div>

            {/* Meaning */}
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">
                {poem.language === 'telugu' ? '📖 అర్థం:' : '📖 Meaning:'}
              </h3>
              <p className="text-lg text-yellow-800 leading-relaxed">
                {poem.meaning}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Fun Zone Grid
const FunZoneGrid = ({ onNavigate, onBack }) => {
  const games = [
    { id: 'picture-match', name: 'Picture Match', emoji: '🎯', color: 'from-cyan-100 to-blue-200', description: 'Match gods and animals!' },
    { id: 'jigsaw-puzzle', name: 'Jigsaw Puzzle', emoji: '🧩', color: 'from-green-100 to-emerald-200', description: '2-4 piece puzzles!' },
    { id: 'find-object', name: 'Find the Object', emoji: '🔍', color: 'from-yellow-100 to-orange-200', description: 'Tap hidden objects!' },
    { id: 'simple-riddles', name: 'Simple Riddles', emoji: '🤔', color: 'from-purple-100 to-pink-200', description: 'Fun riddles with hints!' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Button onClick={onBack} className="mr-4 bg-white hover:bg-gray-100 text-teal-700 border-2 border-teal-300">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-teal-700">Fun Zone - Games & Puzzles</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {games.map((game) => (
            <Card 
              key={game.id}
              className={`p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-br ${game.color} border-4 border-teal-200`}
              onClick={() => onNavigate('game', game.id)}
            >
              <div className="text-center space-y-6">
                <div className="text-8xl">{game.emoji}</div>
                <h3 className="text-3xl font-bold text-teal-700">{game.name}</h3>
                <p className="text-xl text-teal-600">{game.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Picture Match Game Component
const PictureMatchGame = ({ onBack }) => {
  const [gameItems] = useState([
    { id: 1, name: 'Krishna', emoji: '🦚', matched: false },
    { id: 2, name: 'Hanuman', emoji: '🐒', matched: false },
    { id: 3, name: 'Ganesha', emoji: '🐘', matched: false },
    { id: 4, name: 'Lion', emoji: '🦁', matched: false },
  ]);
  
  const [matches, setMatches] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const handleItemClick = (item) => {
    if (selectedItem && selectedItem.id === item.id) {
      // Same item clicked, mark as matched
      setMatches([...matches, item.id]);
      setSelectedItem(null);
      setScore(score + 10);
      
      if (matches.length + 1 === gameItems.length) {
        setGameComplete(true);
      }
    } else if (selectedItem) {
      // Different item, reset selection
      setSelectedItem(item);
    } else {
      // First selection
      setSelectedItem(item);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 p-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} className="bg-white hover:bg-gray-100 text-cyan-700 border-2 border-cyan-300">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold text-cyan-800">Picture Match Game</h1>
          <div className="text-2xl font-bold text-cyan-800">Score: {score}</div>
        </div>

        {gameComplete && (
          <div className="text-center mb-8 p-6 bg-green-100 rounded-lg border-4 border-green-300">
            <h2 className="text-4xl font-bold text-green-800 mb-4">🎉 Great Job! 🎉</h2>
            <p className="text-2xl text-green-700">You matched all the pictures!</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {gameItems.map((item) => (
            <Card
              key={item.id}
              className={`p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl border-4 ${
                matches.includes(item.id) 
                  ? 'bg-green-200 border-green-400' 
                  : selectedItem?.id === item.id 
                    ? 'bg-yellow-200 border-yellow-400'
                    : 'bg-white border-cyan-300 hover:border-cyan-400'
              }`}
              onClick={() => handleItemClick(item)}
            >
              <div className="text-center space-y-4">
                <div className="text-8xl">{item.emoji}</div>
                <h3 className="text-2xl font-bold text-cyan-800">{item.name}</h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-xl text-cyan-800 mb-4">
            {gameComplete 
              ? "Amazing! You completed the game!" 
              : "Tap the same picture twice to match it!"}
          </p>
        </div>
      </div>
    </div>
  );
};

// Simple Game Router Component
const GameViewer = ({ gameId, onBack }) => {
  if (gameId === 'picture-match') {
    return <PictureMatchGame onBack={onBack} />;
  }

  // Placeholder for other games
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl">
        <div className="text-6xl mb-4">🎮</div>
        <h1 className="text-3xl font-bold text-teal-700 mb-4">Game Coming Soon!</h1>
        <p className="text-lg text-teal-600 mb-6">This fun game is being prepared for you!</p>
        <Button onClick={onBack} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full">
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back to Fun Zone
        </Button>
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
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const backendUrl = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${backendUrl}/api/stories/category/${category}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setStories(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError(err.message);
        setStories([]);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchStories();
    }
  }, [category]);

  // Category names for display
  const categoryNames = {
    'aarna-adventures': "Aarna's Adventures",
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
    'classic-moral': 'Moral Stories',
    'friendship-stories': 'Friendship Stories',
    'kindness-stories': 'Kindness Stories',
    'ramayana': 'Ramayana Stories',
    'mahabharata': 'Mahabharata Stories'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <div className="text-2xl font-bold text-purple-700">Loading stories...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <div className="text-2xl font-bold text-red-700 mb-4">Oops! Something went wrong</div>
          <div className="text-lg text-red-600 mb-4">{error}</div>
          <Button onClick={onBack} className="bg-purple-600 hover:bg-purple-700 text-white">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Show "Coming Soon" for categories with no stories
  if (!stories || stories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center mb-8">
            <Button onClick={onBack} className="mr-4 bg-white hover:bg-gray-100 text-purple-700 border-2 border-purple-300">
              <ArrowLeft className="w-6 h-6 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-purple-700">
              {categoryNames[category] || category}
            </h1>
          </div>
          
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="text-8xl mb-8">🚧</div>
            <h2 className="text-4xl font-bold text-purple-700 mb-4">Coming Soon!</h2>
            <p className="text-xl text-purple-600 mb-8">
              New stories are being added for this section. Check back soon!
            </p>
            <Button onClick={onBack} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }
      { id: 'sita-abduction', title: 'Sita\'s Abduction', description: 'Ravana kidnaps Sita', emoji: '😢' },
      { id: 'hanuman-meets-rama', title: 'Hanuman Meets Rama', description: 'The beginning of eternal devotion', emoji: '🤝' },
      { id: 'lanka-war', title: 'The Great War of Lanka', description: 'Good versus evil in epic battle', emoji: '⚔️' },
      { id: 'ravana-defeat', title: 'Ravana\'s Defeat', description: 'The end of the demon king', emoji: '👹' },
      { id: 'sita-rescue', title: 'Sita\'s Rescue', description: 'Rama saves his beloved wife', emoji: '💕' },
      { id: 'rama-coronation', title: 'Rama\'s Coronation', description: 'The rightful king takes his throne', emoji: '👑' },
      { id: 'rama-ayodhya', title: 'Return to Ayodhya', description: 'The joyous homecoming', emoji: '🏰' },
      { id: 'bharata-devotion', title: 'Bharata\'s Devotion', description: 'A brother\'s love and sacrifice', emoji: '❤️' },
      { id: 'lakshmana-loyalty', title: 'Lakshmana\'s Loyalty', description: 'The devoted younger brother', emoji: '👬' }
    ],

    // Mahabharata Stories (12 stories)
    mahabharata: [
      { id: 'arjuna-ekalavya', title: 'Arjuna and Ekalavya', description: 'A lesson about dedication and skill', emoji: '🏹' },
      { id: 'bhima-hidimba', title: 'Bhima and Hidimba', description: 'The strong Pandava\'s forest adventure', emoji: '👹' },
      { id: 'draupadi-swayamvara', title: 'Draupadi\'s Swayamvara', description: 'The princess chooses her husband', emoji: '👸' },
      { id: 'krishna-arjuna', title: 'Krishna and Arjuna\'s Friendship', description: 'The divine friendship', emoji: '🤝' },
      { id: 'pandava-exile', title: 'The Pandavas\' Exile', description: '13 years in the forest', emoji: '🌲' },
      { id: 'abhimanyu-chakravyuh', title: 'Abhimanyu and the Chakravyuh', description: 'The brave young warrior\'s sacrifice', emoji: '⚡' },
      { id: 'bhishma-devotion', title: 'Bhishma\'s Sacrifice', description: 'The grandfather\'s ultimate sacrifice', emoji: '🙏' },
      { id: 'karna-generosity', title: 'Karna\'s Generosity', description: 'The warrior with a golden heart', emoji: '💰' },
      { id: 'yudhishthira-dharma', title: 'Yudhishthira\'s Dharma', description: 'The righteous king\'s trials', emoji: '⚖️' },
      { id: 'gandhari-sacrifice', title: 'Gandhari\'s Sacrifice', description: 'A mother\'s love and blindfold', emoji: '👩‍👦' },
      { id: 'kurukshetra-war', title: 'The Great War of Kurukshetra', description: 'The epic battle for righteousness', emoji: '⚔️' },
      { id: 'pandava-heaven', title: 'The Pandavas\' Journey to Heaven', description: 'The final spiritual journey', emoji: '☁️' }
    ],

    // Moral Story Categories (Expanded to 10+ each)
    'panchatantra': [
      { id: 'monkey-crocodile', title: 'The Monkey and the Crocodile', description: 'A tale of quick thinking and friendship', emoji: '🐒' },
      { id: 'four-friends-elephant', title: 'The Four Friends and the Elephant', description: 'Unity is strength story', emoji: '🐘' },
      { id: 'tortoise-geese', title: 'The Tortoise and the Geese', description: 'Why we should listen to wise advice', emoji: '🐢' },
      { id: 'brahmin-goat', title: 'The Brahmin and the Goat', description: 'Don\'t believe everything you hear', emoji: '🐐' },
      { id: 'lion-jackal', title: 'The Lion and the Jackal', description: 'Cleverness over strength', emoji: '🦁' },
      { id: 'mouse-elephant', title: 'The Mouse and the Elephant', description: 'Small friends, big help', emoji: '🐭' },
      { id: 'wise-crow', title: 'The Wise Crow', description: 'Intelligence solves problems', emoji: '🐦‍⬛' },
      { id: 'greedy-dog', title: 'The Greedy Dog', description: 'Greed leads to loss', emoji: '🐕' },
      { id: 'blue-jackal', title: 'The Blue Jackal', description: 'Truth always comes out', emoji: '🔵' },
      { id: 'musical-donkey', title: 'The Musical Donkey', description: 'Wrong time, wrong place', emoji: '🫏' },
      { id: 'merchant-iron', title: 'The Merchant and the Iron', description: 'Dishonesty doesn\'t pay', emoji: '⚖️' },
      { id: 'snake-frogs', title: 'The Snake and the Frogs', description: 'Be careful who you trust', emoji: '🐸' }
    ],
    'animal-fables': [
      { id: 'lion-mouse', title: 'The Lion and the Mouse', description: 'A small act of kindness saves the day', emoji: '🦁' },
      { id: 'clever-fox-crow', title: 'The Clever Fox and the Crow', description: 'A lesson about flattery and pride', emoji: '🦊' },
      { id: 'ant-grasshopper', title: 'The Ant and the Grasshopper', description: 'The importance of hard work and planning', emoji: '🐜' },
      { id: 'fox-grapes', title: 'The Fox and the Grapes', description: 'Don\'t give up too easily on your dreams', emoji: '🍇' },
      { id: 'rabbit-tortoise', title: 'The Rabbit and the Tortoise', description: 'Slow and steady wins the race', emoji: '🐰' },
      { id: 'wolf-sheep', title: 'The Wolf in Sheep\'s Clothing', description: 'Don\'t judge by appearance', emoji: '🐺' },
      { id: 'dog-bone', title: 'The Dog and His Bone', description: 'Be happy with what you have', emoji: '🦴' },
      { id: 'city-mouse-country', title: 'The City Mouse and Country Mouse', description: 'Simple life vs fancy life', emoji: '🏘️' },
      { id: 'eagle-wren', title: 'The Eagle and the Wren', description: 'Size doesn\'t matter', emoji: '🦅' },
      { id: 'bear-bees', title: 'The Bear and the Bees', description: 'Think before you act', emoji: '🐻' },
      { id: 'owl-birds', title: 'The Owl and Other Birds', description: 'Wisdom comes with experience', emoji: '🦉' },
      { id: 'frog-ox', title: 'The Frog and the Ox', description: 'Don\'t try to be someone else', emoji: '🐸' }
    ],
    'classic-moral': [
      { id: 'boy-wolf', title: 'The Boy Who Cried Wolf', description: 'Always tell the truth', emoji: '🐺' },
      { id: 'golden-eggs', title: 'The Goose with Golden Eggs', description: 'Don\'t be too greedy', emoji: '🪿' },
      { id: 'country-city-mouse', title: 'The Country Mouse and City Mouse', description: 'Simple life can be better than fancy life', emoji: '🐭' },
      { id: 'honest-woodcutter', title: 'The Honest Woodcutter', description: 'Honesty is the best policy', emoji: '🪓' },
      { id: 'king-new-clothes', title: 'The King\'s New Clothes', description: 'Speak the truth even when others don\'t', emoji: '👑' },
      { id: 'wise-old-man', title: 'The Wise Old Man', description: 'Experience teaches valuable lessons', emoji: '👴' },
      { id: 'patient-farmer', title: 'The Patient Farmer', description: 'Good things come to those who wait', emoji: '👨‍🌾' },
      { id: 'generous-baker', title: 'The Generous Baker', description: 'Sharing brings happiness', emoji: '🧑‍🍳' },
      { id: 'brave-little-girl', title: 'The Brave Little Girl', description: 'Courage comes in all sizes', emoji: '👧' },
      { id: 'thankful-heart', title: 'The Thankful Heart', description: 'Gratitude makes everything better', emoji: '❤️' },
      { id: 'helping-hands', title: 'The Helping Hands', description: 'Many hands make light work', emoji: '🤝' },
      { id: 'golden-rule', title: 'The Golden Rule', description: 'Treat others as you want to be treated', emoji: '⭐' }
    ],
    'friendship-stories': [
      { id: 'dog-elephant', title: 'The Dog and the Elephant', description: 'True friends come in all sizes', emoji: '🐕' },
      { id: 'birds-together', title: 'The Birds Who Stayed Together', description: 'Unity is strength', emoji: '🐦' },
      { id: 'cat-mouse-friends', title: 'The Cat and Mouse Who Became Friends', description: 'Enemies can become friends', emoji: '🐱' },
      { id: 'lonely-tree', title: 'The Lonely Tree', description: 'Everyone needs friends', emoji: '🌳' },
      { id: 'sharing-toys', title: 'The Children Who Shared Toys', description: 'Sharing makes friendships stronger', emoji: '🧸' },
      { id: 'playground-heroes', title: 'The Playground Heroes', description: 'Standing up for friends', emoji: '🛝' },
      { id: 'lost-puppy', title: 'The Lost Puppy', description: 'Friends help in times of need', emoji: '🐶' },
      { id: 'birthday-surprise', title: 'The Birthday Surprise', description: 'Thoughtful friends make life special', emoji: '🎂' },
      { id: 'new-student', title: 'The New Student', description: 'Welcoming new friends', emoji: '🎒' },
      { id: 'forgiveness-friends', title: 'Friends Who Forgive', description: 'True friends forgive mistakes', emoji: '🤗' },
      { id: 'adventure-buddies', title: 'The Adventure Buddies', description: 'Adventures are better with friends', emoji: '🗺️' },
      { id: 'rainy-day-friends', title: 'Rainy Day Friends', description: 'Friends make any day better', emoji: '☔' }
    ],
    'kindness-stories': [
      { id: 'kind-woodcutter', title: 'The Kind Woodcutter', description: 'Honesty is always rewarded', emoji: '🪓' },
      { id: 'helpful-sparrow', title: 'The Helpful Little Sparrow', description: 'Small acts of kindness matter', emoji: '🐦' },
      { id: 'caring-nurse', title: 'The Caring Nurse', description: 'Helping others feel better', emoji: '👩‍⚕️' },
      { id: 'generous-shopkeeper', title: 'The Generous Shopkeeper', description: 'Kindness comes back to you', emoji: '🏪' },
      { id: 'gentle-giant', title: 'The Gentle Giant', description: 'Big hearts in big people', emoji: '👹' },
      { id: 'animal-rescuer', title: 'The Animal Rescuer', description: 'Caring for creatures in need', emoji: '🐾' },
      { id: 'grandmother-cookies', title: 'Grandmother\'s Cookies', description: 'Love shared through food', emoji: '🍪' },
      { id: 'student-teacher', title: 'The Student Who Helped Teacher', description: 'Kindness in the classroom', emoji: '📚' },
      { id: 'street-cleaner', title: 'The Street Cleaner\'s Smile', description: 'Every job deserves respect', emoji: '🧹' },
      { id: 'flower-garden', title: 'The Flower Garden Helper', description: 'Beauty grows with care', emoji: '🌸' },
      { id: 'library-volunteer', title: 'The Library Volunteer', description: 'Sharing knowledge freely', emoji: '📖' },
      { id: 'soup-kitchen', title: 'The Soup Kitchen Story', description: 'Feeding those in need', emoji: '🥣' }
    ],

    // Additional categories for remaining gods...
    ganesha: [
      { id: 'ganesha-moon', title: 'Ganesha and the Moon', description: 'Why Ganesha cursed the moon', emoji: '🌙' },
      { id: 'ganesha-writer', title: 'Ganesha the Great Writer', description: 'How Ganesha became the scribe of the Mahabharata', emoji: '✍️' },
      { id: 'ganesha-modak', title: 'Ganesha and the Modaks', description: 'The elephant god\'s favorite sweet', emoji: '🍬' },
      { id: 'ganesha-mouse', title: 'Ganesha and His Mouse', description: 'How the mighty mouse became Ganesha\'s vehicle', emoji: '🐭' },
      { id: 'ganesha-wisdom', title: 'Ganesha\'s Wisdom Test', description: 'The contest between Ganesha and Kartikeya', emoji: '🧠' },
      { id: 'ganesha-obstacles', title: 'Ganesha the Obstacle Remover', description: 'Why we pray to Ganesha first', emoji: '🚧' },
      { id: 'ganesha-broken-tusk', title: 'Ganesha\'s Broken Tusk', description: 'The story of sacrifice for knowledge', emoji: '🦷' },
      { id: 'ganesha-birth', title: 'The Birth of Ganesha', description: 'How Parvati created her son', emoji: '👶' },
      { id: 'ganesha-kubera', title: 'Ganesha and Kubera', description: 'A lesson about pride and humility', emoji: '💰' },
      { id: 'ganesha-devotee', title: 'Ganesha\'s Devotee', description: 'The power of true devotion', emoji: '🙏' }
    ],
    
    // Add more categories as needed...
    rama: [
      { id: 'rama-bow', title: 'Rama Breaks the Bow', description: 'How Prince Rama won Sita\'s hand', emoji: '🏹' },
      { id: 'rama-forest', title: 'Rama in the Forest', description: 'Rama\'s exile and adventures in the forest', emoji: '🌲' }
      // More Rama stories would be added here
    ],
    
    shiva: [
      { id: 'shiva-dance', title: 'Shiva\'s Cosmic Dance', description: 'The dance that creates and destroys the universe', emoji: '💃' },
      { id: 'shiva-ganges', title: 'Shiva and the River Ganges', description: 'How Shiva brought the holy river to earth', emoji: '🌊' }
      // More Shiva stories would be added here
    ],
    
    durga: [
      { id: 'durga-demon', title: 'Durga and the Buffalo Demon', description: 'How Goddess Durga defeated Mahishasura', emoji: '⚔️' },
      { id: 'durga-power', title: 'Durga\'s Divine Power', description: 'The story of the fierce goddess\'s strength', emoji: '💪' }
      // More Durga stories would be added here
    ],
    
    lakshmi: [
      { id: 'lakshmi-ocean', title: 'Lakshmi from the Ocean', description: 'How the goddess of wealth emerged from the sea', emoji: '🌊' },
      { id: 'lakshmi-vishnu', title: 'Lakshmi and Vishnu', description: 'The eternal love story of divine couple', emoji: '💕' }
      // More Lakshmi stories would be added here
    ],
    
    saraswati: [
      { id: 'saraswati-music', title: 'Saraswati\'s Gift of Music', description: 'How the goddess blessed the world with music', emoji: '🎵' },
      { id: 'saraswati-knowledge', title: 'Saraswati and the Gift of Knowledge', description: 'The story of wisdom and learning', emoji: '📚' }
      // More Saraswati stories would be added here
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

// Story Viewer Component
const StoryViewer = ({ storyId, onBack }) => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Fetch story data from backend API
  useEffect(() => {
    if (!storyId) return;
    
    const fetchStory = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/stories/${storyId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to load story: ${response.status}`);
        }
        
        const storyData = await response.json();
        setStory(storyData);
      } catch (err) {
        console.error('Error fetching story:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  const toggleAudio = () => {
    if (!story || !story.slides || !story.slides[currentSlide]) return;

    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const slide = story.slides[currentSlide];
      
      // Play Telugu first, then English
      const teluguUtterance = speakText(slide.telugu, 'te-IN');
      if (teluguUtterance) {
        teluguUtterance.onend = () => {
          const englishUtterance = speakText(slide.english, 'en-US');
          if (englishUtterance) {
            englishUtterance.onend = () => {
              setIsPlaying(false);
            };
          }
        };
      }
    }
  };

  const nextSlide = () => {
    if (story && currentSlide < story.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      if (isPlaying) {
        speechSynthesis.cancel();
        setIsPlaying(false);
      }
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      if (isPlaying) {
        speechSynthesis.cancel();
        setIsPlaying(false);
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">📖</div>
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Loading Story...</h1>
          <div className="animate-pulse text-lg text-blue-500">Please wait while we prepare your story!</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-xl">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Story Not Found</h1>
          <p className="text-lg text-red-500 mb-6">We couldn't load this story right now.</p>
          <Button onClick={onBack} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // No story data
  if (!story || !story.slides || story.slides.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-xl">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-3xl font-bold text-orange-600 mb-4">Story Coming Soon!</h1>
          <p className="text-lg text-orange-500 mb-6">We're working on this wonderful story for you!</p>
          <Button onClick={onBack} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const currentSlideData = story.slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} className="bg-white hover:bg-gray-100 text-purple-700 border-2 border-purple-300">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-purple-700">{story.title}</h1>
          <div className="text-sm text-purple-600">
            {currentSlide + 1} / {story.slides.length}
          </div>
        </div>

        <Card className="max-w-4xl mx-auto p-8 shadow-2xl bg-white">
          <div className="space-y-8">
            {/* Story Image */}
            <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden">
              <img 
                src={currentSlideData.image} 
                alt={story.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full hidden items-center justify-center text-6xl bg-gradient-to-br from-blue-100 to-purple-100">
                📖
              </div>
            </div>

            {/* Telugu Text */}
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
              <h3 className="text-xl font-bold text-orange-800 mb-4">📖 తెలుగు:</h3>
              <p className="text-lg text-orange-800 leading-relaxed font-['Noto Sans Telugu', sans-serif]">
                {currentSlideData.telugu}
              </p>
            </div>

            {/* English Text */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
              <h3 className="text-xl font-bold text-blue-800 mb-4">📖 English:</h3>
              <p className="text-lg text-blue-800 leading-relaxed">
                {currentSlideData.english}
              </p>
            </div>

            {/* Audio Controls */}
            <div className="text-center space-y-4">
              <Button 
                onClick={toggleAudio}
                className={`${
                  isPlaying 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white px-8 py-4 text-xl rounded-full`}
              >
                {isPlaying ? (
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
              {isPlaying && (
                <div className="text-sm text-purple-600 animate-pulse">
                  🎵 Reading story aloud...
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-full"
              >
                <ArrowLeft className="w-6 h-6 mr-2" />
                Previous
              </Button>

              <div className="flex space-x-2">
                {story.slides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentSlide ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <Button 
                onClick={nextSlide}
                disabled={currentSlide === story.slides.length - 1}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-full"
              >
                Next
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
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
    } else if (screen === 'poems-list') {
      setCurrentCategory(param);
    } else if (screen === 'poem') {
      setCurrentStoryId(param);
    } else if (screen === 'game') {
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
      case 'poems':
        return <PoemsGrid onNavigate={navigate} onBack={goBack} />;
      case 'poems-list':
        return <PoemsList category={currentCategory} onNavigate={navigate} onBack={goBack} />;
      case 'poem':
        return <PoemViewer poemId={currentStoryId} onBack={goBack} />;
      case 'funzone':
        return <FunZoneGrid onNavigate={navigate} onBack={goBack} />;
      case 'game':
        return <GameViewer gameId={currentStoryId} onBack={goBack} />;
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