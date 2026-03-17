'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import NightBackground from '@/components/NightBackground';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Night Background */}
      <NightBackground />

      {/* Content - Apple HIG: Proper padding and safe area */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-2xl text-center">
          {/* Hero Section - Apple HIG: Clear typography hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="text-6xl md:text-7xl mb-6"
            >
              🕌
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              Selamat Ramadhan
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-amber-400"
            >
              1447 H
            </motion.h2>
          </motion.div>

          {/* Glass Card - Apple HIG: Proper rounded corners, clear visual hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 mb-10 shadow-2xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-white mb-4 font-medium leading-relaxed"
            >
              Taqabbalallahuminna wa minkum
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-300 text-lg"
            >
              Semoga Allah menerima dari kami dan dari kalian
            </motion.p>

            {/* Decorative elements - Apple HIG: Subtle visual hierarchy */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center gap-3 mt-8 text-3xl"
            >
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity }}>🪔</motion.span>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}>⭐</motion.span>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}>🌙</motion.span>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}>⭐</motion.span>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}>🪔</motion.span>
            </motion.div>
          </motion.div>

          {/* Features - Apple HIG: Clear grid layout, 44pt touch targets */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 gap-4 mb-10"
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-lg min-h-[100px]"
            >
              <div className="text-4xl mb-3">✍️</div>
              <p className="text-white font-semibold text-lg">Buat Mudah</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-lg min-h-[100px]"
            >
              <div className="text-4xl mb-3">🎨</div>
              <p className="text-white font-semibold text-lg">4 Template</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-lg min-h-[100px]"
            >
              <div className="text-4xl mb-3">🖼️</div>
              <p className="text-white font-semibold text-lg">Background</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-lg min-h-[100px]"
            >
              <div className="text-4xl mb-3">📲</div>
              <p className="text-white font-semibold text-lg">Share Instant</p>
            </motion.div>
          </motion.div>

          {/* CTA Button - Apple HIG: 44pt minimum touch target */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: 'spring' }}
          >
            <Link
              href="/create"
              className="
                inline-block 
                bg-gradient-to-r from-emerald-600 to-teal-600 
                hover:from-emerald-500 hover:to-teal-500 
                text-white font-bold 
                py-5 px-12 
                rounded-2xl 
                text-xl 
                transition-all 
                shadow-xl hover:shadow-2xl 
                border border-amber-400/30
                min-h-[60px]
              "
            >
              📨 Kirim Ucapan
            </Link>
          </motion.div>

          {/* Footer - Apple HIG: Proper contrast */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 text-gray-400"
          >
            <p className="flex items-center justify-center gap-3 text-lg">
              <span className="text-amber-400">✨</span>
              <span>Mohon maaf lahir dan batin</span>
              <span className="text-amber-400">✨</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
