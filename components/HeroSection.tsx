'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Leaf, ArrowDown, Sparkles, Globe2, TreePine, Wind } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Pledge } from '@/types/pledge';

// Dynamically import Globe3D to avoid SSR issues
const Globe3D = dynamic(() => import('./Globe3D'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
  )
});

interface HeroSectionProps {
  pledges?: Pledge[];
}

export default function HeroSection({ pledges = [] }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Only render globe when it's in view
  const isGlobeInView = useInView(globeContainerRef, { 
    once: false,
    margin: '100px' 
  });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToForm = useCallback(() => {
    const form = document.getElementById('pledge-form');
    form?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Light Environmental Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 w-full">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, oklch(0.70 0.15 150 / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, oklch(0.65 0.18 180 / 0.12) 0%, transparent 50%)
          `
        }} />
        
        {/* Animated organic shapes */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl animate-liquid"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-green-300/15 to-lime-300/15 rounded-full blur-3xl animate-liquid"
            animate={{
              x: [0, -40, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-200/10 to-blue-200/10 rounded-full blur-3xl animate-pulse-slow"
          />
        </div>
      </div>

      {/* Centered Globe with Info at Corners/Sides */}
      <div className="relative z-10 w-full h-screen flex items-center justify-center">
        <div className="w-full px-0 md:px-4 relative h-full">
          {/* Center: 3D Globe (Full Screen) */}
          <div ref={globeContainerRef} className="absolute inset-0 flex items-center justify-center w-full">
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {mounted && pledges.length > 0 && isGlobeInView && (
                <Globe3D pledges={pledges} />
              )}
            </motion.div>
          </div>

          {/* Top Left: Title & Badge - Desktop Only */}
          <motion.div
            className="hidden lg:block absolute top-12 left-8 max-w-md z-20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="neo-morph px-6 py-3 rounded-full inline-flex items-center gap-3 mb-6"
            >
              <Globe2 className="w-5 h-5 text-primary" />
              <span className="font-space-grotesk font-semibold text-sm text-foreground">
                Join the National Movement
              </span>
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </motion.div>

            <h1 className="font-syne text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="block text-mask-gradient">
                Climate Action
              </span>
              <span className="block text-foreground">
                Pledge
              </span>
            </h1>
          </motion.div>

          {/* Top Right: Stats - Desktop Only */}
          <motion.div
            className="hidden lg:block absolute top-12 right-8 neo-morph p-6 rounded-3xl max-w-xs z-20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="text-center">
              <div className="text-5xl font-black text-mask-gradient mb-2">
                {pledges.length.toLocaleString()}
              </div>
              <div className="font-space-grotesk text-sm font-semibold text-muted-foreground">
                Climate Champions
              </div>
            </div>
          </motion.div>

          {/* Bottom Left: Info Card - Desktop Only */}
          <motion.div
            className="hidden lg:block absolute bottom-12 left-8 glass-morph p-6 rounded-3xl max-w-sm z-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-4">
              Join thousands making a real difference. Take the pledge today and inspire others to create a{' '}
              <span className="font-semibold text-foreground">sustainable future</span>.
            </p>
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={scrollToForm}
                  className="relative bg-gradient-to-r from-primary to-teal-600 hover:from-teal-600 hover:to-primary text-white font-space-grotesk font-bold px-8 py-3 overflow-hidden shadow-lg group"
                >
                  <span className="relative z-10">Take Pledge →</span>
                  {/* Continuous shiny effect - left to right */}
                  <div 
                    className="absolute inset-0 rounded-lg bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:200%_0,0_0] bg-no-repeat animate-shine"
                    style={{
                      animation: 'shine 3s infinite',
                    }}
                  />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Right: Quick Stats - Desktop Only */}
          <motion.div
            className="hidden lg:flex absolute bottom-12 right-8 gap-3 z-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { label: '1M+ Target', icon: '🎯' },
              { label: 'Global Impact', icon: '🌍' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="neo-morph px-5 py-3 rounded-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-foreground font-space-grotesk font-semibold text-xs flex items-center gap-2">
                  <span>{item.icon}</span>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile & Tablet: Overlay content on top of globe */}
          <div className="lg:hidden absolute inset-0 z-20 flex flex-col items-center justify-between py-8 px-4 pointer-events-none">
            {/* Top: Title */}
            <motion.div
              className="text-center pointer-events-auto"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="neo-morph px-4 py-2 rounded-full inline-flex items-center gap-2 mb-4"
              >
                <Globe2 className="w-4 h-4 text-primary" />
                <span className="font-space-grotesk font-semibold text-xs text-foreground">
                  Join the Movement
                </span>
              </motion.div>

              <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-3">
                <span className="block text-mask-gradient">
                  Climate Action
                </span>
                <span className="block text-foreground">
                  Pledge
                </span>
              </h1>

              <div className="neo-morph px-6 py-3 rounded-2xl inline-block">
                <div className="text-3xl font-black text-mask-gradient mb-1">
                  {pledges.length.toLocaleString()}
                </div>
                <div className="font-space-grotesk text-xs font-semibold text-muted-foreground">
                  Climate Champions
                </div>
              </div>
            </motion.div>

            {/* Bottom: CTA */}
            <motion.div
              className="text-center pointer-events-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="font-inter text-sm text-muted-foreground mb-4 glass-morph px-4 py-2 rounded-xl">
                Join thousands making a real difference
              </p>
              <Button 
                onClick={scrollToForm} 
                size="lg"
                className="relative bg-gradient-to-r from-primary to-teal-600 text-white font-space-grotesk font-bold px-8 py-3 shadow-lg"
              >
                Take the Pledge →
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Desktop Only */}
      <motion.div
        className="hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity },
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <p className="text-muted-foreground text-xs font-inter font-medium">Scroll to explore</p>
          <div className="w-6 h-9 rounded-full border-2 border-primary/40 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-2 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none w-full"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }}
      />
    </motion.section>
  );
}
