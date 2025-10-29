'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Leaf, ArrowDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const scrollToForm = () => {
    const form = document.getElementById('pledge-form');
    form?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-900 to-green-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-20"
        animate={{
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-20"
        animate={{
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Parallax Content */}
      <motion.div
        className="relative z-10 text-center px-4 py-20 max-w-6xl mx-auto"
        style={{ y, scale }}
      >
        {/* Floating Icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="relative"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="relative">
              <Leaf className="w-24 h-24 text-emerald-400" strokeWidth={1.5} />
              <motion.div
                className="absolute inset-0 bg-emerald-400 blur-2xl opacity-40"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </motion.div>
        </motion.div>

        {/* Main Heading with Gradient Text */}
        <motion.h1
          className="text-6xl md:text-8xl font-black mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 text-transparent bg-clip-text">
            Climate Action
          </span>
          <br />
          <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 text-transparent bg-clip-text">
            Pledge
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-emerald-100/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Join thousands of climate champions in making a real difference.
          <br className="hidden md:block" />
          <span className="text-emerald-300">Take the pledge today</span> and inspire others to create a sustainable future.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={scrollToForm}
              className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-lg px-16 py-8 rounded-full shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3 font-semibold">
                Take the Pledge
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5 }}
              />
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          className="mt-16 flex justify-center gap-8 flex-wrap"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {['1M+ Target', 'Global Impact', 'Join Now'].map((text, i) => (
            <motion.div
              key={text}
              className="backdrop-blur-md bg-white/10 px-6 py-3 rounded-full border border-white/20"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <p className="text-emerald-200 font-medium">{text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.2 },
            y: { duration: 2, repeat: Infinity },
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-emerald-300 text-sm font-medium">Scroll to explore</p>
            <div className="w-8 h-12 rounded-full border-2 border-emerald-400/50 flex items-start justify-center p-2">
              <motion.div
                className="w-2 h-3 rounded-full bg-emerald-400"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }}
      />
    </motion.section>
  );
}
