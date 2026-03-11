import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

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

export default PoemsList;
