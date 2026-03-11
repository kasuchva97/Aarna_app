import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { personalizeText } from '../utils/text';

const StoriesList = ({ category, onNavigate, onBack, profile }) => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                setLoading(true);
                console.log(`[DEBUG] Fetching stories for category: ${category}`);
                const { data, error } = await supabase
                    .from('stories')
                    .select('*')
                    .eq('category', category)
                    .order('created_at', { ascending: false });

                console.log(`[DEBUG] Supabase response for category ${category}:`, { data, error });
                if (error) {
                    throw new Error(error.message);
                }
                setStories(data);
                setError(null);
            } catch (err) {
                console.error('[DEBUG] Error fetching stories:', err);
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
        'aarna-adventures': personalizeText("Aarna's Adventures", profile),
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100">
            <div className="container mx-auto px-6 py-8">
                <div className="flex items-center mb-8">
                    <Button onClick={onBack} className="mr-4 bg-white hover:bg-gray-100 text-purple-700 border-2 border-purple-300">
                        <ArrowLeft className="w-6 h-6 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-3xl font-bold text-purple-700">
                        {categoryNames[category] || category} ({stories.length} stories)
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {stories.map((story) => (
                        <Card
                            key={story.id}
                            className="p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-white border-3 border-purple-200"
                            onClick={() => onNavigate('story', story.id)}
                        >
                            <div className="text-center space-y-4">
                                <div className="text-4xl">📖</div>
                                <div>
                                    <h3 className="text-xl font-bold text-purple-700 mb-2">{personalizeText(story.title, profile)}</h3>
                                    <p className="text-purple-600 text-sm">{personalizeText(story.description, profile)}</p>
                                    <div className="mt-3 text-xs text-purple-500">
                                        {story.slides ? `${story.slides.length} slides` : '8 slides'}
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

export default StoriesList;
