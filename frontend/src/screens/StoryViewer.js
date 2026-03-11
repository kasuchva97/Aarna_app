import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { personalizeText } from '../utils/text';
import { speakText } from '../utils/audio';

const StoryViewer = ({ storyId, onBack, profile }) => {
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePersonalize = (text) => personalizeText(text, profile);

    // Fetch story data from backend API
    useEffect(() => {
        if (!storyId) return;

        const fetchStory = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log(`[DEBUG] Fetching story with ID: ${storyId}`);
                const { data: storyData, error } = await supabase
                    .from('stories')
                    .select('*')
                    .eq('id', storyId)
                    .single();

                console.log(`[DEBUG] Supabase response for story ${storyId}:`, { data: storyData, error });
                if (error) {
                    throw new Error(error.message);
                }
                setStory(storyData);
            } catch (err) {
                console.error('[DEBUG] Error fetching story:', err);
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
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel();
            }
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            const slide = story.slides[currentSlide];

            // Play Telugu first, then English
            const teluguUtterance = speakText(handlePersonalize(slide.telugu), 'te-IN');
            if (teluguUtterance) {
                teluguUtterance.onend = () => {
                    const englishUtterance = speakText(handlePersonalize(slide.english), 'en-US');
                    if (englishUtterance) {
                        englishUtterance.onend = () => {
                            setIsPlaying(false);
                        };
                    }
                };
            } else {
                setIsPlaying(false); // In case TTS is not supported
            }
        }
    };

    const nextSlide = () => {
        if (story && currentSlide < story.slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
            if (isPlaying && 'speechSynthesis' in window) {
                speechSynthesis.cancel();
                setIsPlaying(false);
            }
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
            if (isPlaying && 'speechSynthesis' in window) {
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
                    <h1 className="text-2xl font-bold text-purple-700">{handlePersonalize(story.title)}</h1>
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
                                alt={handlePersonalize(story.title)}
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
                                {handlePersonalize(currentSlideData.telugu)}
                            </p>
                        </div>

                        {/* English Text */}
                        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                            <h3 className="text-xl font-bold text-blue-800 mb-4">📖 English:</h3>
                            <p className="text-lg text-blue-800 leading-relaxed">
                                {handlePersonalize(currentSlideData.english)}
                            </p>
                        </div>

                        {/* Audio Controls */}
                        <div className="text-center space-y-4">
                            <Button
                                onClick={toggleAudio}
                                className={`${isPlaying
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
                                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-purple-600' : 'bg-gray-300'
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

export default StoryViewer;
