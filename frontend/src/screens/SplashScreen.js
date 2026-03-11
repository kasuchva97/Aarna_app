import React, { useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
    useEffect(() => {
        // Show splash screen for 2.5 seconds
        const timer = setTimeout(() => {
            onComplete();
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex flex-col items-center justify-center p-6">
            <div className="text-center animate-bounce-slow">
                <img
                    src="/logo512.png"
                    alt="Aarna App Logo"
                    className="w-48 h-48 mx-auto mb-8 rounded-2xl shadow-2xl border-4 border-white/50"
                />
                {/* <h1 className="text-5xl font-extrabold text-white tracking-wider drop-shadow-lg mb-4">
                    Aarna's
                </h1> */}
                <h1 className="text-3xl font-bold text-white/90 tracking-wide drop-shadow-md">
                    Storybook
                </h1>
            </div>
            <div className="absolute bottom-16">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
