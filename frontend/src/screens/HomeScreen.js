import React from 'react';
import { Card } from '../components/ui/card';

const HomeScreen = ({ onNavigate, profile }) => {
    const childName = profile?.kidName || 'Aarna';
    const fatherName = profile?.fatherName || 'Ram';
    const motherName = profile?.motherName || 'Lahari';

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
                            <h2 className="text-3xl font-bold text-pink-700">{childName}'s Adventures</h2>
                            <p className="text-lg text-pink-600">Amazing adventures with {childName}, {fatherName}, and {motherName}!</p>
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

export default HomeScreen;
