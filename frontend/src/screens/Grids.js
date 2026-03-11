import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const MythologyGrid = ({ onNavigate, onBack }) => {
    const gods = [
        { id: 'krishna', name: 'Krishna', image: 'https://images.unsplash.com/photo-1641730259879-ad98e7db7bcb', emoji: '🦚', fallback: 'https://images.pexels.com/photos/33444855/pexels-photo-33444855.jpeg' },
        { id: 'hanuman', name: 'Hanuman', image: 'https://images.unsplash.com/photo-1730191567375-e82ce67160df', emoji: '🐒', fallback: 'https://images.unsplash.com/photo-1564984069790-2d0767de5856' },
        { id: 'ganesha', name: 'Ganesha', image: 'https://images.unsplash.com/photo-1567591391293-f9a99c77e128', emoji: '🐘', fallback: 'https://images.unsplash.com/photo-1567591414240-e9c1e59f3e06' },
        { id: 'rama', name: 'Rama', image: 'https://images.unsplash.com/photo-1609309783328-b2fcbf559d14', emoji: '🏹', fallback: 'https://images.pexels.com/photos/30323414/pexels-photo-30323414.jpeg' },
        { id: 'shiva', name: 'Shiva', image: 'https://images.unsplash.com/photo-1566890910598-c5768889e83e', emoji: '🔱', fallback: 'https://images.pexels.com/photos/6556790/pexels-photo-6556790.jpeg' },
        { id: 'durga', name: 'Durga', image: 'https://images.pexels.com/photos/2969469/pexels-photo-2969469.jpeg', emoji: '👑', fallback: 'https://images.pexels.com/photos/12428561/pexels-photo-12428561.jpeg' },
        { id: 'lakshmi', name: 'Lakshmi', image: 'https://images.pexels.com/photos/12428566/pexels-photo-12428566.jpeg', emoji: '🪷', fallback: 'https://images.pexels.com/photos/16354577/pexels-photo-16354577.jpeg' },
        { id: 'saraswati', name: 'Saraswati', image: 'https://images.pexels.com/photos/16354577/pexels-photo-16354577.jpeg', emoji: '🎼', fallback: 'https://images.pexels.com/photos/12428566/pexels-photo-12428566.jpeg' },
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

export const AarnaGrid = ({ onNavigate, onBack, profile }) => {
    const childName = profile?.kidName || 'Aarna';
    const categories = [
        { id: 'aarna-adventures', name: `${childName}'s Adventures`, emoji: '🌟', color: 'from-pink-100 to-rose-200' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100">
            <div className="container mx-auto px-6 py-8">
                <div className="flex items-center mb-8">
                    <Button onClick={onBack} className="mr-4 bg-white hover:bg-gray-100 text-pink-700 border-2 border-pink-300">
                        <ArrowLeft className="w-6 h-6 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-3xl font-bold text-pink-700">{childName}'s Adventures</h1>
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

export const HistoryGrid = ({ onNavigate, onBack }) => {
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

export const PoemsGrid = ({ onNavigate, onBack }) => {
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

export const MoralGrid = ({ onNavigate, onBack }) => {
    const categories = [
        { id: 'panchatantra', name: 'Panchatantra', emoji: '🐒', color: 'from-green-100 to-emerald-200' },
        { id: 'animal-fables', name: 'Animal Fables', emoji: '🦊', color: 'from-teal-100 to-cyan-200' },
        { id: 'classic-moral', name: 'Classic Tales', emoji: '🧚', color: 'from-blue-100 to-indigo-200' },
        { id: 'friendship-stories', name: 'Friendship', emoji: '🤝', color: 'from-rose-100 to-pink-200' },
        { id: 'kindness-stories', name: 'Kindness', emoji: '❤️', color: 'from-red-100 to-orange-200' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
            <div className="container mx-auto px-6 py-8">
                <div className="flex items-center mb-8">
                    <Button onClick={onBack} className="mr-4 bg-white hover:bg-gray-100 text-green-700 border-2 border-green-300">
                        <ArrowLeft className="w-6 h-6 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-3xl font-bold text-green-700">Moral Stories</h1>
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

export const FunZoneGrid = ({ onNavigate, onBack }) => {
    const games = [
        { id: 'memory-match', name: 'Memory Match', description: 'Find the matching pairs!', emoji: '🧠', color: 'from-pink-400 to-rose-500' },
        { id: 'color-pop', name: 'Color Pop', description: 'Pop the colorful balloons!', emoji: '🎈', color: 'from-blue-400 to-indigo-500' },
        { id: 'animal-sounds', name: 'Animal Sounds', description: 'Guess who makes this sound!', emoji: '🐶', color: 'from-green-400 to-emerald-500' },
        { id: 'shape-sorter', name: 'Shape Sorter', description: 'Put shapes in right places!', emoji: '⭐', color: 'from-yellow-400 to-amber-500' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-100">
            <div className="container mx-auto px-6 py-8">
                <div className="flex items-center mb-8">
                    <Button onClick={onBack} className="mr-4 bg-white hover:bg-gray-100 text-blue-700 border-2 border-blue-300">
                        <ArrowLeft className="w-6 h-6 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-3xl font-bold text-blue-700">Fun Zone</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {games.map((game) => (
                        <Card
                            key={game.id}
                            className="group cursor-pointer transform hover:scale-105 transition-all duration-300 overflow-hidden border-4 border-white shadow-xl hover:shadow-2xl"
                            onClick={() => onNavigate('game', game.id)}
                        >
                            <div className={`p-8 bg-gradient-to-br ${game.color} h-full text-white`}>
                                <div className="flex items-center space-x-6">
                                    <div className="text-7xl bg-white/20 p-4 rounded-2xl backdrop-blur-sm group-hover:rotate-12 transition-transform duration-300">
                                        {game.emoji}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold mb-2 drop-shadow-md">{game.name}</h3>
                                        <p className="text-white/90 text-lg font-medium">{game.description}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
