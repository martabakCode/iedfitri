'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type TemplateType = 'classic' | 'modern' | 'minimal' | 'elegant';

interface Template {
    id: TemplateType;
    name: string;
    emojis: string[];
    cardBg: string;
    accentColor: string;
    textColor: string;
}

// Quranic prayers for Eid
const quranicPrayers = [
    { id: 1, text: "Taqabbalallahuminna wa minkum\n\nSemoga Allah menerima dari kami dan dari kalian" },
    { id: 2, text: "Mohon maaf lahir dan batin\n\nDari hati yang tulus, kami memohon ampunan" },
    { id: 3, text: "Selamat Hari Raya Idul Fitri 1447 H\n\nTaqabbalallah wa antum wa taqabbal minna" },
    { id: 4, text: "Agar kita kembali fitrah\n\nDalam kemenangan menuju kedamaian" },
    { id: 5, text: "Di hari yang penuh berkah\n\nKita merayakan kemenangan jiwa" },
];

// Music options for Eid - using local files from public/music
const musicOptions = [
    {
        id: 1,
        name: 'Ketipak Ketipung Raya',
        artist: 'Aisha Retno, Aziz Harun',
        emoji: '🥥',
        url: '/music/Aisha Retno, Aziz Harun - Ketipak Ketipung Raya (Official Video).mp3'
    },
    {
        id: 2,
        name: 'Suasana Hari Raya',
        artist: 'Cover by Daiyan Trisha',
        emoji: '🕌',
        url: '/music/Suasana Hari Raya (Cover by Daiyan Trisha).mp3'
    },
    {
        id: 3,
        name: 'Ramadhan Datang',
        artist: 'Tompi',
        emoji: '🌙',
        url: '/music/Tompi - Ramadhan Datang (Official Music Video).mp3'
    },
];

const templates: Template[] = [
    {
        id: 'classic',
        name: 'Klasik',
        emojis: ['🥥', '🌙', '✨'],
        cardBg: 'bg-gradient-to-br from-green-900/90 to-emerald-900/90',
        accentColor: 'text-green-300',
        textColor: 'text-green-100',
    },
    {
        id: 'modern',
        name: 'Modern',
        emojis: ['✨', '💜', '💗'],
        cardBg: 'bg-gradient-to-br from-purple-900/90 to-pink-900/90',
        accentColor: 'text-purple-300',
        textColor: 'text-purple-100',
    },
    {
        id: 'minimal',
        name: 'Minimal',
        emojis: ['🌙', '⭐'],
        cardBg: 'bg-slate-900/90',
        accentColor: 'text-slate-300',
        textColor: 'text-slate-200',
    },
    {
        id: 'elegant',
        name: 'Elegan',
        emojis: ['🕌', '✨', '🌟'],
        cardBg: 'bg-gradient-to-br from-amber-900/90 to-yellow-900/90',
        accentColor: 'text-amber-300',
        textColor: 'text-amber-100',
    },
];

export default function WishForm() {
    const router = useRouter();
    const audioPreviewRef = useRef<HTMLAudioElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fromName, setFromName] = useState('');
    const [toName, setToName] = useState('');
    const [message, setMessage] = useState('');
    const [selectedPrayer, setSelectedPrayer] = useState<number | null>(null);
    const [background, setBackground] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('classic');
    const [selectedMusic, setSelectedMusic] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            if (audioPreviewRef.current) {
                audioPreviewRef.current.pause();
                audioPreviewRef.current = null;
            }
        };
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBackground(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handlePrayerSelect = (prayerId: number) => {
        const prayer = quranicPrayers.find(p => p.id === prayerId);
        if (prayer) {
            setMessage(prayer.text);
            setSelectedPrayer(prayerId);
        }
    };

    const handleMusicSelect = (musicId: number) => {
        const music = musicOptions.find(m => m.id === musicId);
        if (music) {
            // If same music is selected, toggle play/pause
            if (selectedMusic === musicId) {
                if (audioPreviewRef.current) {
                    if (isPlaying) {
                        audioPreviewRef.current.pause();
                        setIsPlaying(false);
                    } else {
                        audioPreviewRef.current.play().catch(() => { });
                        setIsPlaying(true);
                    }
                }
                return;
            }

            // Stop current music if playing
            if (audioPreviewRef.current) {
                audioPreviewRef.current.pause();
            }

            // Create and play new audio
            const audio = new Audio(music.url);
            audio.loop = true;
            audio.play()
                .then(() => {
                    console.log('Music playing:', music.url);
                })
                .catch(err => {
                    console.log('Audio play error:', err);
                });

            audioPreviewRef.current = audio;
            setSelectedMusic(musicId);
            setIsPlaying(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Stop preview music before submitting
        if (audioPreviewRef.current) {
            audioPreviewRef.current.pause();
        }

        try {
            const selectedMusicData = selectedMusic ? musicOptions.find(m => m.id === selectedMusic) : null;

            const formData = new FormData();
            formData.append('from_name', fromName);
            formData.append('to_name', toName);
            formData.append('message', message);
            formData.append('template', selectedTemplate);
            formData.append('music_url', selectedMusicData?.url || '');
            if (background) formData.append('background', background);

            const response = await fetch('/api/wishes', { method: 'POST', body: formData });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Gagal membuat ucapan');

            router.push(data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-base">
                    {error}
                </div>
            )}

            {/* Section: Template Selection - Apple HIG: Clear section label */}
            <div className="space-y-3">
                <label className="block text-base font-semibold text-white">
                    Pilih Template
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {templates.map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedTemplate(t.id)}
                            className={`
                p-4 rounded-2xl border-2 transition-all duration-200 ease-out text-left min-h-[80px]
                ${selectedTemplate === t.id
                                    ? 'border-amber-400 bg-amber-400/10 shadow-lg'
                                    : 'border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10'
                                }
              `}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xl">
                                    {t.emojis.map((e, i) => <span key={i}>{e}</span>)}
                                </span>
                                {selectedTemplate === t.id && (
                                    <span className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-black text-sm font-bold">
                                        ✓
                                    </span>
                                )}
                            </div>
                            <div className="text-base font-medium text-white mt-2">{t.name}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Section: Music Selection - Apple HIG: Grouped content */}
            <div className="space-y-3">
                <label className="block text-base font-semibold text-white">
                    Pilih Musik Latar 🎵
                </label>
                <div className="space-y-2">
                    {musicOptions.map((music) => (
                        <button
                            key={music.id}
                            type="button"
                            onClick={() => handleMusicSelect(music.id)}
                            className={`
                w-full p-4 rounded-2xl border-2 transition-all duration-200 ease-out text-left
                ${selectedMusic === music.id
                                    ? 'border-amber-400 bg-amber-400/10'
                                    : 'border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10'
                                }
              `}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{music.emoji}</span>
                                    <div>
                                        <p className="text-white text-base font-medium">{music.name}</p>
                                        <p className="text-gray-400 text-sm">{music.artist}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {selectedMusic === music.id && isPlaying && (
                                        <span className="flex items-center gap-1 px-3 py-1 bg-emerald-500 rounded-full text-white text-sm">
                                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                            Playing
                                        </span>
                                    )}
                                    {selectedMusic === music.id && !isPlaying && (
                                        <span className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-black">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Section: Quranic Prayers - Apple HIG: Grouped content */}
            <div className="space-y-3">
                <label className="block text-base font-semibold text-white">
                    Pilih Ucapan
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto rounded-xl pr-2">
                    {quranicPrayers.map((prayer) => (
                        <button
                            key={prayer.id}
                            type="button"
                            onClick={() => handlePrayerSelect(prayer.id)}
                            className={`
                w-full p-4 rounded-2xl border-2 transition-all duration-200 ease-out text-left
                ${selectedPrayer === prayer.id
                                    ? 'border-amber-400 bg-amber-400/10'
                                    : 'border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10'
                                }
              `}
                        >
                            <p className="text-white text-base leading-relaxed">{prayer.text}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Input: From Name - Apple HIG: 44pt min touch target */}
            <div className="space-y-2">
                <label htmlFor="from_name" className="block text-base font-semibold text-white">
                    Dari Siapa <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    id="from_name"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    required
                    placeholder="Contoh: Ranoo"
                    className="
            w-full px-4 py-4 
            bg-white/10 border-2 border-white/20 rounded-xl 
            text-white text-base placeholder-gray-400
            focus:border-amber-400 focus:ring-0 focus:outline-none
            transition-all duration-200
            min-h-[52px]
          "
                />
            </div>

            {/* Input: To Name */}
            <div className="space-y-2">
                <label htmlFor="to_name" className="block text-base font-semibold text-white">
                    Untuk Siapa <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    id="to_name"
                    value={toName}
                    onChange={(e) => setToName(e.target.value)}
                    required
                    placeholder="Contoh: Keluarga Ranoo"
                    className="
            w-full px-4 py-4 
            bg-white/10 border-2 border-white/20 rounded-xl 
            text-white text-base placeholder-gray-400
            focus:border-amber-400 focus:ring-0 focus:outline-none
            transition-all duration-200
            min-h-[52px]
          "
                />
            </div>

            {/* Input: Message */}
            <div className="space-y-2">
                <label htmlFor="message" className="block text-base font-semibold text-white">
                    Ucapan
                </label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Atau tulis ucapanmu sendiri..."
                    className="
            w-full px-4 py-4 
            bg-white/10 border-2 border-white/20 rounded-xl 
            text-white text-base placeholder-gray-400
            focus:border-amber-400 focus:ring-0 focus:outline-none
            transition-all duration-200
            resize-none
          "
                />
            </div>

            {/* File Upload - Apple HIG: Clear drop zone */}
            <div className="space-y-2">
                <label className="block text-base font-semibold text-white">
                    Background (Opsional)
                </label>
                <div className="border-2 border-dashed border-white/30 rounded-2xl p-6 text-center hover:border-amber-400/50 transition-colors duration-200">
                    <input
                        type="file"
                        id="background"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <label htmlFor="background" className="cursor-pointer block">
                        {preview ? (
                            <div className="space-y-2">
                                <img src={preview} alt="Preview" className="max-h-36 mx-auto rounded-xl object-cover" />
                                <p className="text-gray-400 text-sm">Ketuk untuk ganti</p>
                            </div>
                        ) : (
                            <div className="py-4 space-y-2">
                                <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center">
                                    <span className="text-3xl">+</span>
                                </div>
                                <p className="text-gray-400 text-base">Ketuk untuk upload</p>
                            </div>
                        )}
                    </label>
                </div>
            </div>

            {/* Submit Button - Apple HIG: 44pt min height, clear feedback */}
            <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="
          w-full 
          bg-gradient-to-r from-emerald-500 to-teal-500 
          disabled:opacity-50 disabled:cursor-not-allowed
          text-white font-semibold 
          py-4 px-6 rounded-2xl 
          text-lg
          border border-white/10
          shadow-lg
          transition-all duration-200
          min-h-[56px]
        "
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Membuat...
                    </span>
                ) : (
                    'Buat Ucapan'
                )}
            </motion.button>
        </motion.form>
    );
}
