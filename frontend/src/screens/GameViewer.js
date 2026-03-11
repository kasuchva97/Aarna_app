import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Confetti from '../components/Confetti';

const gamesData = {
    'memory-match': {
        title: 'Memory Match',
        description: 'Find all matching pairs of cards',
        icon: '🧠',
        color: 'from-pink-400 to-rose-500',
        type: 'matching',
        items: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']
    },
    'color-pop': {
        title: 'Color Pop',
        description: 'Pop balloons of the target color',
        icon: '🎈',
        color: 'from-blue-400 to-indigo-500',
        type: 'clicking',
        colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange']
    },
    'shape-sorter': {
        title: 'Shape Sorter',
        description: 'Match shapes to their holes',
        icon: '⭐',
        color: 'from-yellow-400 to-amber-500',
        type: 'sorting',
        shapes: ['circle', 'square', 'triangle', 'star', 'heart']
    }
};

const GameViewer = ({ gameId, onBack }) => {
    const [gameState, setGameState] = useState('playing'); // playing, won
    const [score, setScore] = useState(0);
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);

    const game = gamesData[gameId];

    // Specific Logic for Memory Match (Simplest to implement as a demo)
    useEffect(() => {
        if (gameId === 'memory-match') {
            const gameItems = [...game.items, ...game.items];
            // Shuffle
            for (let i = gameItems.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [gameItems[i], gameItems[j]] = [gameItems[j], gameItems[i]];
            }
            setCards(gameItems.map((item, index) => ({ id: index, content: item })));
            setFlipped([]);
            setMatched([]);
            setGameState('playing');
        }
    }, [gameId, game.items]);

    const handleCardClick = (index) => {
        if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            if (cards[newFlipped[0]].content === cards[newFlipped[1]].content) {
                setTimeout(() => {
                    setMatched([...matched, ...newFlipped]);
                    setFlipped([]);
                    setScore(s => s + 10);
                    if (matched.length + 2 === cards.length) {
                        setGameState('won');
                    }
                }, 500);
            } else {
                setTimeout(() => {
                    setFlipped([]);
                    setScore(s => Math.max(0, s - 2));
                }, 1000);
            }
        }
    };

    if (!game) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Game not found</h2>
                    <Button onClick={onBack}>Go Back</Button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-gradient-to-br ${game.color} p-6`}>
            {gameState === 'won' && <Confetti />}

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8 text-white">
                    <Button onClick={onBack} variant="outline" className="bg-white/20 hover:bg-white/30 border-none text-white backdrop-blur">
                        <ArrowLeft className="w-6 h-6 mr-2" />
                        Back
                    </Button>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold font-['Comic_Sans_MS']">{game.title}</h1>
                        <p className="text-white/80">{game.description}</p>
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur font-bold text-xl">
                        Score: {score}
                    </div>
                </div>

                <Card className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-none min-h-[60vh] flex flex-col items-center justify-center relative overflow-hidden">
                    {gameId === 'memory-match' && gameState === 'playing' ? (
                        <div className="grid grid-cols-4 gap-4 w-full max-w-2xl">
                            {cards.map((card, index) => (
                                <div
                                    key={card.id}
                                    onClick={() => handleCardClick(index)}
                                    className={`aspect-square sm:h-32 flex items-center justify-center text-4xl sm:text-6xl cursor-pointer rounded-2xl transition-all duration-300 shadow-md border-4 ${flipped.includes(index) || matched.includes(index)
                                            ? 'bg-white border-blue-200 cursor-default scale-100'
                                            : 'bg-blue-500 border-blue-600 hover:bg-blue-400 hover:-translate-y-1'
                                        }`}
                                >
                                    <div className={`transition-opacity duration-300 ${flipped.includes(index) || matched.includes(index) ? 'opacity-100' : 'opacity-0'
                                        }`}>
                                        {card.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : gameState === 'won' ? (
                        <div className="text-center space-y-6 animate-bounce-slow">
                            <div className="text-8xl">🏆</div>
                            <h2 className="text-4xl font-extrabold text-blue-600">You Won!</h2>
                            <p className="text-2xl text-blue-500 font-bold">Great Job!</p>
                            <div className="text-xl text-gray-600">Final Score: {score}</div>
                            <Button
                                onClick={() => {
                                    setGameState('playing');
                                    setScore(0);
                                    setMatched([]);
                                    setFlipped([]);
                                    // Reshuffle cards
                                    const reshuffled = [...cards].sort(() => Math.random() - 0.5);
                                    setCards(reshuffled);
                                }}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-xl rounded-full mt-4"
                            >
                                Play Again
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center space-y-6 text-gray-500">
                            <div className="text-6xl animate-pulse">🚧</div>
                            <h2 className="text-3xl font-bold text-gray-700">Game In Progress</h2>
                            <p className="text-xl">This game is still being built.</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default GameViewer;
