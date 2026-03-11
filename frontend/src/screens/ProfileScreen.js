import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const ProfileScreen = ({ onComplete }) => {
    const [kidName, setKidName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (kidName && fatherName && motherName) {
            const profileInfo = { kidName, fatherName, motherName };
            localStorage.setItem('aarnaAppProfile', JSON.stringify(profileInfo));
            onComplete(profileInfo);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex flex-col items-center justify-center p-6">
            <Card className="w-full max-w-md p-8 shadow-2xl bg-white/90 backdrop-blur rounded-2xl border-4 border-purple-300">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🌟</div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        Welcome to Storybook!
                    </h1>
                    <p className="text-gray-600 mt-2">Let's personalize your magical adventure.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-purple-700 mb-1">Kid's Name</label>
                        <input
                            type="text"
                            required
                            value={kidName}
                            onChange={(e) => setKidName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 outline-none transition-colors"
                            placeholder="e.g., Aarna"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-purple-700 mb-1">Father's Name</label>
                        <input
                            type="text"
                            required
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 outline-none transition-colors"
                            placeholder="e.g., Ram"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-purple-700 mb-1">Mother's Name</label>
                        <input
                            type="text"
                            required
                            value={motherName}
                            onChange={(e) => setMotherName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 outline-none transition-colors"
                            placeholder="e.g., Lahari"
                        />
                    </div>

                    <Button type="submit" className="w-full py-6 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl shadow-lg transform transition hover:scale-[1.02]">
                        Start Magic Journey ✨
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default ProfileScreen;
