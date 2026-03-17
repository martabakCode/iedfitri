'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import NightBackground from '@/components/NightBackground';
import WishForm from '@/components/WishForm';

export default function CreatePage() {
    return (
        <div className="min-h-screen relative">
            {/* Night Background */}
            <NightBackground />

            {/* Content - Apple HIG: Proper padding and safe area */}
            <div className="relative z-10 min-h-screen p-4 md:p-6">
                {/* Header - Apple HIG: Back navigation with 44pt touch target */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-4xl mx-auto py-6"
                >
                    <Link
                        href="/"
                        className="
                            inline-flex items-center gap-2 
                            text-white hover:text-amber-400 
                            font-medium 
                            bg-white/10 backdrop-blur-sm border border-white/20 
                            px-5 py-3 rounded-xl 
                            transition-all duration-200
                            min-h-[48px]
                        "
                    >
                        <span className="text-xl">←</span> Kembali
                    </Link>
                </motion.div>

                {/* Title - Apple HIG: Clear typography hierarchy */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="text-5xl md:text-6xl mb-4"
                    >
                        ✍️
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                        Buat Kartu Ucapan
                    </h1>

                    {/* Decorative */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className="flex items-center justify-center gap-2 text-2xl md:text-3xl mt-4"
                    >
                        <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity }}>🪔</motion.span>
                        <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}>⭐</motion.span>
                        <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}>🌙</motion.span>
                        <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}>⭐</motion.span>
                        <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}>🪔</motion.span>
                    </motion.div>
                </motion.div>

                {/* Form */}
                <div className="max-w-md mx-auto pb-8">
                    <WishForm />
                </div>
            </div>
        </div>
    );
}
