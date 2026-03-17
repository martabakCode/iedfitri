'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

type TemplateType = 'classic' | 'modern' | 'minimal' | 'elegant';

interface Template {
    id: TemplateType;
    emojis: string[];
    cardBg: string;
    accentColor: string;
    textColor: string;
    borderColor: string;
}

interface WishData {
    from_name: string;
    to_name: string;
    message: string | null;
    background_url?: string | null;
    template?: TemplateType;
    music_url?: string | null;
}

const templates: Record<TemplateType, Template> = {
    classic: {
        id: 'classic',
        emojis: ['🥥', '🌙', '✨'],
        cardBg: 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900',
        accentColor: 'text-green-200',
        textColor: 'text-green-50',
        borderColor: 'border-green-500/30',
    },
    modern: {
        id: 'modern',
        emojis: ['✨', '💜', '💗'],
        cardBg: 'bg-gradient-to-br from-purple-900 via-fuchsia-800 to-pink-900',
        accentColor: 'text-purple-200',
        textColor: 'text-purple-50',
        borderColor: 'border-purple-400/30',
    },
    minimal: {
        id: 'minimal',
        emojis: ['🌙', '⭐'],
        cardBg: 'bg-gradient-to-br from-slate-900 via-gray-800 to-zinc-900',
        accentColor: 'text-slate-200',
        textColor: 'text-slate-100',
        borderColor: 'border-slate-500/30',
    },
    elegant: {
        id: 'elegant',
        emojis: ['🕌', '✨', '🌟'],
        cardBg: 'bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900',
        accentColor: 'text-amber-200',
        textColor: 'text-amber-50',
        borderColor: 'border-amber-400/30',
    },
};

export default function WishCard({ wish }: { wish: WishData }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [autoplayAttempted, setAutoplayAttempted] = useState(false);
    const template = templates[wish.template as TemplateType] || templates.classic;

    // Parse message for better rendering
    const messageLines = wish.message?.split('\n') || [];

    // Auto-play music when card loads
    useEffect(() => {
        if (wish.music_url && wish.music_url.trim() !== '' && !autoplayAttempted) {
            const audio = new Audio(wish.music_url);
            audio.loop = true;
            audioRef.current = audio;

            // Try to autoplay
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                        setAutoplayAttempted(true);
                    })
                    .catch((error) => {
                        console.log('Autoplay prevented by browser:', error);
                        setAutoplayAttempted(true);
                        // Will show play button instead
                    });
            }
        }
    }, [wish.music_url, autoplayAttempted]);

    const playMusic = () => {
        if (audioRef.current) {
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch(() => { });
        } else if (wish.music_url && wish.music_url.trim() !== '') {
            const audio = new Audio(wish.music_url);
            audio.loop = true;
            audioRef.current = audio;
            audio.play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch(() => { });
        }
    };

    return (
        <motion.div
            className="relative w-full max-w-lg mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {/* Hidden audio element - used for preloading */}
            <audio ref={audioRef} loop />

            {/* Card Container - Apple HIG: Proper rounded corners, shadow for depth */}
            <div
                className={`
                    relative overflow-hidden rounded-3xl
                    ${template.cardBg}
                    border-2 ${template.borderColor}
                    shadow-2xl
                    backdrop-blur-sm
                `}
            >
                {/* Background Image Overlay */}
                {wish.background_url && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={wish.background_url}
                            alt="Background"
                            className="w-full h-full object-cover opacity-30"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        <div className={`absolute inset-0 ${template.cardBg} opacity-70`} />
                    </div>
                )}

                {/* Content Layer */}
                <div className="relative z-10 p-8 sm:p-10">
                    {/* Header with Emojis */}
                    <motion.div
                        className="text-center mb-8"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex justify-center items-center gap-3 mb-4">
                            {template.emojis.map((emoji, index) => (
                                <motion.span
                                    key={index}
                                    className="text-3xl sm:text-4xl"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                >
                                    {emoji}
                                </motion.span>
                            ))}
                        </div>

                        <h1 className={`${template.accentColor} text-2xl sm:text-3xl font-bold tracking-wide`}>
                            Selamat Hari Raya
                        </h1>
                        <p className={`${template.textColor} text-lg sm:text-xl font-medium mt-1`}>
                            Idul Fitri 1447 H
                        </p>
                    </motion.div>

                    {/* Decorative Divider */}
                    <motion.div
                        className="flex justify-center items-center gap-2 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-current opacity-30" style={{ color: template.accentColor.replace('text-', '') }} />
                        <span className={`${template.accentColor} text-xl`}>🥥</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-current opacity-30" style={{ color: template.accentColor.replace('text-', '') }} />
                    </motion.div>

                    {/* Recipient Section */}
                    <motion.div
                        className="mb-6 text-center"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className={`${template.accentColor} text-sm uppercase tracking-wider font-semibold mb-1`}>
                            Untuk
                        </p>
                        <p className={`${template.textColor} text-2xl sm:text-3xl font-bold`}>
                            {wish.to_name}
                        </p>
                    </motion.div>

                    {/* Message Section */}
                    <motion.div
                        className="mb-8"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className={`${template.textColor} space-y-2 text-lg sm:text-xl leading-relaxed text-center`}>
                            {messageLines.length > 0 ? (
                                messageLines.map((line, index) => (
                                    <p key={index} className={line.startsWith(' ') ? 'pl-4' : ''}>
                                        {line}
                                    </p>
                                ))
                            ) : (
                                <p>Selamat Hari Raya Idul Fitri</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Decorative Divider */}
                    <motion.div
                        className="flex justify-center items-center gap-2 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-current opacity-30" style={{ color: template.accentColor.replace('text-', '') }} />
                        <span className={`${template.accentColor} text-xl`}>🥥</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-current opacity-30" style={{ color: template.accentColor.replace('text-', '') }} />
                    </motion.div>

                    {/* Sender Section */}
                    <motion.div
                        className="text-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <p className={`${template.accentColor} text-sm uppercase tracking-wider font-semibold mb-1`}>
                            Dari
                        </p>
                        <p className={`${template.textColor} text-xl sm:text-2xl font-semibold`}>
                            {wish.from_name}
                        </p>
                    </motion.div>

                    {/* Bottom Emojis */}
                    <motion.div
                        className="flex justify-center gap-2 mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        {template.emojis.map((emoji, index) => (
                            <span key={index} className="text-lg">{emoji}</span>
                        ))}
                    </motion.div>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg" />
            </div>

            {/* Music Control - Only show if autoplay was prevented */}
            {wish.music_url && wish.music_url.trim() !== '' && !isPlaying && (
                <motion.button
                    onClick={playMusic}
                    className="
                        mt-4 w-full 
                        bg-amber-500/80 hover:bg-amber-600 
                        text-white font-semibold
                        py-3 px-6 rounded-2xl
                        text-base
                        border border-amber-400/30
                        shadow-lg
                        transition-all duration-200
                        min-h-[52px]
                        flex items-center justify-center gap-3
                    "
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    Putar Musik 🎵
                </motion.button>
            )}

            {/* Share Button */}
            <motion.button
                onClick={() => {
                    const shareText = `Selamat Hari Raya Idul Fitri 1447 H\n\nDari: ${wish.from_name}\nUntuk: ${wish.to_name}`;
                    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + window.location.href)}`;
                    window.open(whatsappUrl, '_blank');
                }}
                className="
                    mt-4 w-full 
                    bg-emerald-500 hover:bg-emerald-600 
                    text-white font-semibold
                    py-4 px-6 rounded-2xl
                    text-lg
                    border border-emerald-400/30
                    shadow-lg
                    transition-all duration-200
                    min-h-[56px]
                    flex items-center justify-center gap-3
                "
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Bagikan ke WhatsApp
            </motion.button>
        </motion.div>
    );
}
