'use client';

import { useRef, useState, useEffect, useCallback, memo } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Globe, Heart, Users, Sparkles } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TypingEffect } from '@/components/TypingEffect';
import { ArtisticImage } from '@/components/ArtisticImage';

// Quote Carousel Component
interface Quote {
  id: string;
  text: string;
  author: string;
  role: string;
  initials: string;
  image: string;
  color: 'blue' | 'red' | 'green' | 'purple';
}

interface QuoteCarouselProps {
  quotes: Quote[];
  isInView: boolean;
}

const QuoteCarousel = memo(function QuoteCarousel({ quotes, isInView }: QuoteCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!isInView) return; // Pause animation when not in view
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [quotes.length, isInView]);

  const currentQuote = quotes[currentIndex];
  
  const getBackgroundGradient = useCallback((color: string) => {
    const gradients: Record<string, string> = {
      'blue': 'from-blue-500/20 via-cyan-500/10 to-transparent',
      'red': 'from-rose-500/20 via-pink-500/10 to-transparent',
      'green': 'from-emerald-500/20 via-teal-500/10 to-transparent',
      'purple': 'from-violet-500/20 via-purple-500/10 to-transparent',
    };
    return gradients[color] || gradients['blue'];
  }, []);

  const getInitialsGradient = useCallback((color: string) => {
    const gradients: Record<string, string> = {
      'blue': 'from-blue-500 to-cyan-500',
      'red': 'from-rose-500 to-pink-500',
      'green': 'from-emerald-500 to-teal-500',
      'purple': 'from-violet-500 to-purple-500',
    };
    return gradients[color] || gradients['blue'];
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-12 md:mt-20"
    >
      <div className="text-center mb-8 md:mb-12 px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Inspiring Voices
        </h3>
        <p className="text-sm md:text-base text-gray-600">
          Leaders and activists driving climate action
        </p>
      </div>

      {/* Single Neomorphic Card */}
      <div className="relative max-w-4xl mx-auto px-4">
        <div 
          className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.7)] bg-gradient-to-br from-gray-50 to-white border border-gray-200/50"
          style={{ minHeight: '280px', height: '280px' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="relative h-full"
            >
              {/* Artistic Background - Always on right side */}
              <div className={`hidden md:block absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l ${getBackgroundGradient(currentQuote.color)} opacity-40 overflow-hidden`}>
                {/* Large Image as Background with animation */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center p-4"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
                >
                  <div className="relative w-full h-full opacity-50">
                    <img
                      src={currentQuote.image}
                      alt={currentQuote.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
                
                {/* Decorative dots pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                      <pattern id={`dots-${currentIndex}`} patternUnits="userSpaceOnUse" width="10" height="10">
                        <circle cx="5" cy="5" r="1" fill="currentColor" opacity="0.3" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill={`url(#dots-${currentIndex})`} />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-12 lg:p-16 h-full flex flex-col justify-center">
                <blockquote className="text-sm md:text-lg lg:text-xl italic text-gray-800 mb-4 md:mb-6 leading-relaxed font-medium line-clamp-4">
                  <span className="text-2xl md:text-4xl text-emerald-400 opacity-50">"</span>
                  {currentQuote.text}
                  <span className="text-2xl md:text-4xl text-emerald-400 opacity-50">"</span>
                </blockquote>

                <div className="flex items-center gap-3 md:gap-4">
                  {/* Small artistic avatar with initials */}
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${getInitialsGradient(currentQuote.color)}`}
                  >
                    <span className="text-lg md:text-2xl font-bold text-white">
                      {currentQuote.initials}
                    </span>
                  </div>

                  <div>
                    <p className="font-bold text-gray-800 text-base md:text-lg">
                      {currentQuote.author}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">
                      {currentQuote.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-6 md:w-8 bg-emerald-500' 
                    : 'w-1.5 md:w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default function WhySectionTabbed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState('planet');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const reasons = [
    {
      id: 'planet',
      icon: Globe,
      title: 'For Our Planet',
      description: 'Climate change is real and urgent. Every action counts in protecting our Earth for future generations. From reducing carbon footprints to preserving biodiversity, your commitment helps maintain the ecological balance that sustains all life.',
      color: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-500',
      badge: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'health',
      icon: Heart,
      title: 'For Our Health',
      description: 'A cleaner environment means cleaner air, water, and a healthier life for you and your loved ones. Reducing pollution directly improves respiratory health, reduces disease rates, and creates safer communities. Climate action is health action.',
      color: 'from-rose-500 to-pink-500',
      iconBg: 'bg-rose-500',
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      id: 'community',
      icon: Users,
      title: 'For Our Community',
      description: 'Together we are stronger. Join a global movement of climate champions making real change. When communities unite for environmental causes, they inspire policy changes, support local green initiatives, and create a culture of sustainability.',
      color: 'from-emerald-500 to-teal-500',
      iconBg: 'bg-emerald-500',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'future',
      icon: Sparkles,
      title: 'For Our Future',
      description: 'Build a sustainable legacy. Your commitment today creates opportunities for tomorrow. The choices we make now determine the world our children inherit. Small actions compound into systemic change that shapes a thriving future.',
      color: 'from-violet-500 to-purple-500',
      iconBg: 'bg-violet-500',
      badge: 'bg-violet-50 text-violet-700 border-violet-200',
    },
  ];

  const quotes: Quote[] = [
    {
      id: 'quote1',
      text: "We don't need a handful of people doing zero waste perfectly. We need millions of people doing it imperfectly.",
      author: 'Anne Marie Bonneau',
      role: 'Environmental Advocate',
      initials: 'AB',
      image: '/images/quotes/anne-marie-bonneau.png',
      color: 'blue',
    },
    {
      id: 'quote2',
      text: 'The greatest threat to our planet is the belief that someone else will save it. We must act now.',
      author: 'Michael Pollan',
      role: 'Food Writer & Activist',
      initials: 'MP',
      image: '/images/quotes/michael-pollan.png',
      color: 'green',
    },
    {
      id: 'quote3',
      text: 'Climate action is not about sacrifice. It is about building a better world for ourselves and our children.',
      author: 'Greta Thunberg',
      role: 'Climate Activist',
      initials: 'GT',
      image: '/images/quotes/greta-thunberg.png',
      color: 'purple',
    },
    {
      id: 'quote4',
      text: 'The time to act is now. Every fraction of a degree of warming matters, and every action counts.',
      author: 'David Attenborough',
      role: 'Naturalist & Broadcaster',
      initials: 'DA',
      image: '/images/quotes/david-attenborough.png',
      color: 'red',
    },
  ];

  const getColorName = (gradient: string): 'blue' | 'green' | 'purple' | 'red' => {
    if (gradient.includes('blue')) return 'blue';
    if (gradient.includes('emerald')) return 'green';
    if (gradient.includes('violet')) return 'purple';
    return 'red';
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 px-4 overflow-hidden bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, oklch(0.60 0.20 150) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Decorative Blobs */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"
        style={{ y }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-green-300/15 to-lime-300/15 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 text-emerald-700 text-xs md:text-sm font-semibold">
              Why Take Climate Action
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text px-4">
            Make a Difference
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Every pledge counts. Join a growing community committed to creating lasting environmental change.
          </p>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 md:mb-12 lg:mb-16"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab Triggers */}
            <div className="flex justify-center mb-8 md:mb-12 px-2">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 bg-transparent h-auto p-0 w-full max-w-2xl md:max-w-none md:w-auto">
                {reasons.map((reason) => {
                  const Icon = reason.icon;
                  const isActive = activeTab === reason.id;
                  return (
                    <motion.div
                      key={reason.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <TabsTrigger
                        value={reason.id}
                        className={`flex flex-col items-center justify-center gap-1.5 md:gap-2 px-3 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl border-2 transition-all duration-300 w-full ${
                          isActive
                            ? `border-emerald-500 bg-white shadow-lg`
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                        }`}
                      >
                        <motion.div
                          className={`p-2 md:p-2 rounded-md md:rounded-lg ${reason.iconBg} text-white flex items-center justify-center`}
                          animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className="w-5 h-5 md:w-5 md:h-5" />
                        </motion.div>
                        <span className="text-xs md:text-sm font-bold whitespace-nowrap">
                          {reason.title.split(' ')[2]}
                        </span>
                      </TabsTrigger>
                    </motion.div>
                  );
                })}
              </TabsList>
            </div>

            {/* Tab Contents */}
            {reasons.map((reason) => (
              <TabsContent
                key={reason.id}
                value={reason.id}
                className="focus:outline-none"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`rounded-xl md:rounded-2xl bg-white border-2 border-gray-200 p-6 md:p-10 shadow-xl`}
                >
                  <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                    {/* Left - Icon and Title */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                        <motion.div
                          className={`w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${reason.color} p-3 md:p-4 shadow-lg flex items-center justify-center flex-shrink-0`}
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <reason.icon className="w-full h-full text-white" />
                        </motion.div>
                        <h3 className="text-xl md:text-3xl font-bold text-gray-800">
                          {reason.title}
                        </h3>
                      </div>

                      {/* Typing Effect for Description */}
                      <div className="text-sm md:text-lg text-gray-600 leading-relaxed">
                        <TypingEffect
                          text={reason.description}
                          delay={100}
                          speed={20}
                        />
                      </div>
                    </motion.div>

                    {/* Right - Statistics or Call to Action */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="flex justify-center"
                    >
                      <div className="text-center p-6 md:p-8 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                        <div className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">
                          {reason.id === 'planet'
                            ? '1.5°C'
                            : reason.id === 'health'
                            ? '10M+'
                            : reason.id === 'community'
                            ? '195'
                            : '2050'}
                        </div>
                        <p className="text-sm md:text-base text-gray-600 font-semibold">
                          {reason.id === 'planet'
                            ? 'Critical warming limit to avoid'
                            : reason.id === 'health'
                            ? 'Lives impacted by climate action'
                            : reason.id === 'community'
                            ? 'Countries in climate agreement'
                            : 'Target year for net-zero emissions'}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Inspiring Quotes Section - Single Rotating Card */}
        <QuoteCarousel quotes={quotes} isInView={isInView} />

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 md:mt-16 lg:mt-20 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-base md:text-xl text-gray-700 font-semibold mb-4 md:mb-6">
            Ready to be part of the solution?
          </p>
          <motion.div
            className="flex justify-center gap-2"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <span className="text-3xl">👇</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
