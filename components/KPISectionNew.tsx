'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Target, TrendingUp, Award } from 'lucide-react';

interface KPISectionProps {
  currentCount: number;
}

function AnimatedNumber({ value, duration = 2 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isInView]);

  return <div ref={ref}>{displayValue.toLocaleString('en-IN')}</div>;
}

export default function KPISection({ currentCount }: KPISectionProps) {
  const TARGET = 1000000;
  const progress = (currentCount / TARGET) * 100;
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const kpis = [
    {
      icon: Target,
      label: 'Target Pledges',
      value: TARGET,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      iconColor: 'text-blue-400',
    },
    {
      icon: TrendingUp,
      label: 'Pledges Made',
      value: currentCount,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      iconColor: 'text-emerald-400',
    },
    {
      icon: Award,
      label: 'Progress',
      value: progress,
      suffix: '%',
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/20',
      iconColor: 'text-violet-400',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_50%)]" />
      </div>

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
            <span className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              Live Statistics
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-transparent bg-clip-text">
              Our Impact
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Track our collective journey towards a sustainable future
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <motion.div
                className={`relative group overflow-hidden rounded-3xl ${kpi.bgColor} backdrop-blur-xl border ${kpi.borderColor} p-8 hover:scale-105 transition-all duration-500`}
                whileHover={{ y: -10 }}
              >
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div
                  className="mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`w-16 h-16 rounded-2xl ${kpi.bgColor} flex items-center justify-center`}>
                    <kpi.icon className={`w-8 h-8 ${kpi.iconColor}`} />
                  </div>
                </motion.div>

                {/* Value */}
                <div className="mb-4">
                  <div className={`text-5xl font-black bg-gradient-to-br ${kpi.color} text-transparent bg-clip-text`}>
                    <AnimatedNumber value={kpi.value} />
                    {kpi.suffix && <span className="text-3xl">{kpi.suffix}</span>}
                  </div>
                </div>

                {/* Label */}
                <p className="text-slate-400 font-medium text-lg">{kpi.label}</p>

                {/* Decorative Glow */}
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${kpi.color} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="backdrop-blur-xl bg-slate-900/50 rounded-3xl p-8 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-slate-200">Goal Progress</h3>
              <span className="text-emerald-400 text-xl font-bold">
                {progress.toFixed(2)}%
              </span>
            </div>
            
            {/* Progress Track */}
            <div className="relative h-6 bg-slate-800 rounded-full overflow-hidden">
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Progress Fill */}
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full relative overflow-hidden"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${Math.min(progress, 100)}%` } : {}}
                transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
              >
                {/* Animated Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </div>

            {/* Stats Below Progress */}
            <div className="mt-6 flex justify-between text-sm">
              <span className="text-slate-400">
                <span className="text-emerald-400 font-bold">{currentCount.toLocaleString('en-IN')}</span> pledges made
              </span>
              <span className="text-slate-400">
                <span className="text-cyan-400 font-bold">{(TARGET - currentCount).toLocaleString('en-IN')}</span> to go
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-emerald-400 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </section>
  );
}
