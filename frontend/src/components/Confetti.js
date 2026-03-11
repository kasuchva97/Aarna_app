import React, { useState, useEffect } from 'react';

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

export default Confetti;
