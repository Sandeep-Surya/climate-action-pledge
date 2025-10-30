'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Target, TrendingUp, Award, GraduationCap, Briefcase, Users } from 'lucide-react';
import { Pledge } from '@/types/pledge';

interface KPISectionProps {
  currentCount: number;
  pledges: Pledge[];
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

export default function KPISection({ currentCount, pledges }: KPISectionProps) {
  const TARGET = 1000000;
  const progress = (currentCount / TARGET) * 100;
  
  // Calculate filtered counts
  const studentCount = pledges.filter(p => p.profile === 'Student').length;
  const workingProfessionalCount = pledges.filter(p => p.profile === 'Working Professional').length;
  const othersCount = pledges.filter(p => p.profile === 'Other').length;
  
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
      icon: Users,
      label: 'Demographics',
      isMultiValue: true,
      demographics: {
        students: studentCount,
        professionals: workingProfessionalCount,
        others: othersCount,
      },
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      iconColor: 'text-purple-400',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden bg-gradient-to-br from-background via-teal-50/20 to-emerald-50/20">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.60 0.20 150 / 0.15)_0%,transparent_50%)]" />
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
            <span className="px-6 py-3 rounded-full glass-morph border border-primary/20 text-primary text-sm font-space-grotesk font-semibold">
              Live Statistics
            </span>
          </motion.div>
          <h2 className="font-syne text-5xl md:text-6xl font-black mb-6">
            <span className="text-mask-gradient">
              Our Impact
            </span>
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-2xl mx-auto">
            Track our collective journey towards a sustainable future
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <motion.div
                className="relative group overflow-hidden neo-morph p-8 hover:scale-105 transition-all duration-500"
                whileHover={{ y: -10 }}
              >
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
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
                  {kpi.isMultiValue && kpi.demographics ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-inter text-sm text-muted-foreground">Students</span>
                        <span className={`font-poppins text-2xl font-bold bg-gradient-to-br ${kpi.color} text-transparent bg-clip-text`}>
                          <AnimatedNumber value={kpi.demographics.students} />
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-inter text-sm text-muted-foreground">Professionals</span>
                        <span className={`font-poppins text-2xl font-bold bg-gradient-to-br ${kpi.color} text-transparent bg-clip-text`}>
                          <AnimatedNumber value={kpi.demographics.professionals} />
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-inter text-sm text-muted-foreground">Others</span>
                        <span className={`font-poppins text-2xl font-bold bg-gradient-to-br ${kpi.color} text-transparent bg-clip-text`}>
                          <AnimatedNumber value={kpi.demographics.others} />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className={`text-5xl font-black bg-gradient-to-br ${kpi.color} text-transparent bg-clip-text`}>
                      <AnimatedNumber value={kpi.value || 0} />
                    </div>
                  )}
                </div>

                {/* Label */}
                <p className="font-space-grotesk text-foreground text-sm font-semibold mb-2">{kpi.label}</p>

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
          <div className="glass-morph rounded-3xl p-8 border-2 border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-poppins text-2xl font-bold text-foreground">Overall Progress</h3>
              <span className="font-space-grotesk text-primary text-xl font-bold">
                {progress.toFixed(2)}%
              </span>
            </div>
            
            {/* Progress Track */}
            <div className="relative h-6 neo-morph-inset rounded-full overflow-hidden">
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
              <span className="font-inter text-muted-foreground">
                <span className="text-primary font-bold">{currentCount.toLocaleString('en-IN')}</span> pledges made
              </span>
              <span className="font-inter text-muted-foreground">
                <span className="text-teal-600 font-bold">{(TARGET - currentCount).toLocaleString('en-IN')}</span> to go
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
