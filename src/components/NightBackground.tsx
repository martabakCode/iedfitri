'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
}

export default function NightBackground() {
    const [stars, setStars] = useState<Star[]>([]);
    const [shootingStar, setShootingStar] = useState(false);

    useEffect(() => {
        // Generate random stars
        const newStars: Star[] = [];
        for (let i = 0; i < 150; i++) {
            newStars.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2 + 1,
                delay: Math.random() * 5,
                duration: Math.random() * 3 + 2,
            });
        }
        setStars(newStars);

        // Random shooting star
        const interval = setInterval(() => {
            setShootingStar(true);
            setTimeout(() => setShootingStar(false), 3000);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0B132B] to-[#1C2541]" />

            {/* Stars */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute bg-white rounded-full"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: star.duration,
                        delay: star.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Shooting Star */}
            {shootingStar && (
                <motion.div
                    initial={{ left: '10%', top: '10%', opacity: 1 }}
                    animate={{ left: '80%', top: '80%', opacity: 0 }}
                    transition={{ duration: 2, ease: 'easeIn' }}
                    className="absolute w-32 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{
                        transform: 'rotate(45deg)',
                    }}
                />
            )}

            {/* Moon */}
            <motion.div
                className="absolute top-20 md:top-32 right-10 md:right-32"
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <div
                    className="w-20 h-20 md:w-32 md:h-32 rounded-full"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, #fffbeb, #fde68a, #d4a853)',
                        boxShadow: '0 0 60px rgba(255, 255, 255, 0.3), 0 0 100px rgba(255, 255, 255, 0.2)',
                    }}
                />
            </motion.div>

            {/* Mosque Silhouette */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 200"
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,200 L0,150 Q100,120 200,140 Q300,160 400,130 Q500,100 600,120 Q700,140 800,110 Q900,80 1000,100 Q1100,120 1200,90 Q1300,60 1440,80 L1440,200 Z"
                        fill="#0a0f1a"
                    />
                    {/* Mosque dome */}
                    <ellipse cx="720" cy="80" rx="60" ry="40" fill="#0a0f1a" />
                    {/* Minaret */}
                    <rect x="650" y="40" width="8" height="80" fill="#0a0f1a" />
                    <circle cx="654" cy="40" r="8" fill="#0a0f1a" />
                    {/* Small dome lights */}
                    <circle cx="600" cy="130" r="3" fill="#F4C542" className="animate-pulse" />
                    <circle cx="840" cy="120" r="3" fill="#F4C542" className="animate-pulse" style={{ animationDelay: '1s' }} />
                </svg>
            </div>

            {/* Lanterns - Left */}
            <motion.div
                className="absolute left-8 md:left-20 top-1/3"
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-3 h-8 bg-gradient-to-b from-[#FFB347] to-[#FF8C00] rounded-lg shadow-lg" style={{ boxShadow: '0 0 20px rgba(255, 179, 71, 0.5)' }} />
                <div className="w-6 h-6 bg-gradient-to-b from-[#FFB347] to-[#FF8C00] rounded-b-full -mt-2 ml-1.5" style={{ boxShadow: '0 0 30px rgba(255, 179, 71, 0.7)' }} />
            </motion.div>

            {/* Lanterns - Right */}
            <motion.div
                className="absolute right-8 md:right-20 top-1/4"
                animate={{ rotate: [3, -3, 3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
                <div className="w-4 h-10 bg-gradient-to-b from-[#FFB347] to-[#FF8C00] rounded-lg shadow-lg" style={{ boxShadow: '0 0 20px rgba(255, 179, 71, 0.5)' }} />
                <div className="w-8 h-8 bg-gradient-to-b from-[#FFB347] to-[#FF8C00] rounded-b-full -mt-2 ml-0" style={{ boxShadow: '0 0 30px rgba(255, 179, 71, 0.7)' }} />
            </motion.div>

            {/* Floating Lanterns - Multiple */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    initial={{ x: `${10 + i * 20}%`, y: '100%', opacity: 0.6 }}
                    animate={{
                        y: ['100%', '-10%'],
                        x: [`${10 + i * 20}%`, `${15 + i * 18}%`],
                        opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{
                        duration: 15 + i * 3,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 3,
                    }}
                >
                    <div className="w-3 h-4 bg-gradient-to-b from-[#FFB347] to-[#FF8C00] rounded-full" style={{ boxShadow: '0 0 15px rgba(255, 179, 71, 0.5)' }} />
                </motion.div>
            ))}
        </div>
    );
}
