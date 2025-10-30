'use client';

import { motion } from 'framer-motion';

interface ArtisticImageProps {
  initials: string;
  color: string;
  name: string;
  role?: string;
}

export function ArtisticImage({
  initials,
  color,
  name,
  role,
}: ArtisticImageProps) {
  const colors: Record<string, string> = {
    'blue': 'from-blue-500 to-cyan-500',
    'red': 'from-rose-500 to-pink-500',
    'green': 'from-emerald-500 to-teal-500',
    'purple': 'from-violet-500 to-purple-500',
  };

  const gradientClass = colors[color] || colors['blue'];

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${gradientClass} shadow-lg overflow-hidden`}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {/* Artistic circular pattern background */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="dots" patternUnits="userSpaceOnUse" width="10" height="10">
                <circle cx="5" cy="5" r="1.5" fill="white" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots)" />
          </svg>
        </div>

        {/* Main content - initials */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="text-3xl font-bold text-white drop-shadow-lg">
              {initials}
            </p>
          </motion.div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 blur-2xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-8 h-8 bg-white/10 blur-xl rounded-full" />
      </motion.div>

      {/* Name and role */}
      <div className="text-center">
        <p className="font-semibold text-gray-800 text-sm">{name}</p>
        {role && <p className="text-xs text-gray-600">{role}</p>}
      </div>
    </div>
  );
}
