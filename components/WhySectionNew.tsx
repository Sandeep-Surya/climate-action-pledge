'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Globe, Heart, Users, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function WhySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const reasons = [
    {
      icon: Globe,
      title: 'For Our Planet',
      description: 'Climate change is real and urgent. Every action counts in protecting our Earth for future generations.',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: Heart,
      title: 'For Our Health',
      description: 'A cleaner environment means cleaner air, water, and a healthier life for you and your loved ones.',
      color: 'from-rose-500 to-pink-500',
      gradient: 'from-rose-500/20 to-pink-500/20',
    },
    {
      icon: Users,
      title: 'For Our Community',
      description: 'Together we are stronger. Join a global movement of climate champions making real change.',
      color: 'from-emerald-500 to-teal-500',
      gradient: 'from-emerald-500/20 to-teal-500/20',
    },
    {
      icon: Sparkles,
      title: 'For Our Future',
      description: 'Build a sustainable legacy. Your commitment today creates opportunities for tomorrow.',
      color: 'from-violet-500 to-purple-500',
      gradient: 'from-violet-500/20 to-purple-500/20',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden bg-white">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(16 185 129) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative Blobs */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-20"
        style={{ y }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
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
            <span className="px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
              Why It Matters
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-transparent bg-clip-text">
              Make a Difference
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Your pledge is more than a promise—it's a powerful step towards a sustainable future
          </p>
        </motion.div>

        {/* Reason Cards - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="group relative overflow-hidden h-full p-8 bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 hover:border-slate-300 transition-all duration-500 shadow-lg hover:shadow-2xl">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon Container */}
                    <motion.div
                      className="mb-6"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${reason.color} p-4 shadow-lg group-hover:shadow-xl transition-shadow duration-500`}>
                        <reason.icon className="w-full h-full text-white" strokeWidth={1.5} />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${reason.color} text-transparent bg-clip-text`}>
                      {reason.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {reason.description}
                    </p>
                  </div>

                  {/* Decorative Corner Accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${reason.color} opacity-10 rounded-bl-full`} />
                  
                  {/* Glow Effect */}
                  <div className={`absolute -bottom-20 -right-20 w-48 h-48 bg-gradient-to-br ${reason.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Inspiring Quote */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="backdrop-blur-xl bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-12 border-2 border-emerald-200 shadow-xl">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                className="mb-6"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <span className="text-6xl">🌍</span>
              </motion.div>
              
              <blockquote className="text-2xl md:text-3xl font-light text-slate-700 mb-6 italic leading-relaxed">
                "We don't need a handful of people doing zero waste perfectly. We need millions of people doing it imperfectly."
              </blockquote>
              
              <p className="text-slate-500 font-medium">— Anne Marie Bonneau</p>
              
              {/* Decorative Quotation Marks */}
              <div className="absolute top-8 left-8 text-8xl text-emerald-200 font-serif leading-none">"</div>
              <div className="absolute bottom-8 right-8 text-8xl text-emerald-200 font-serif leading-none rotate-180">"</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-xl text-slate-600 mb-6">
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
