'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';

interface SuccessSplashProps {
  name: string;
  onComplete: () => void;
}

export default function SuccessSplash({ name, onComplete }: SuccessSplashProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Set window size for confetti
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.67; // 100 / 60 frames per second * 6 seconds
      });
    }, 100);

    // Complete after 6 seconds (increased from 3 seconds)
    const timer = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600">
      {/* Confetti */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={500}
        gravity={0.3}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Success Icon */}
        <div className="flex justify-center mb-8 animate-bounce">
          <div className="relative">
            <CheckCircle className="w-32 h-32 text-white" strokeWidth={2} />
            <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
          Congratulations!
        </h1>
        <h2 className="text-3xl md:text-4xl text-white mb-6">
          {name}
        </h2>
        <p className="text-2xl text-green-50 mb-8 max-w-2xl mx-auto">
          Thank you for taking the Climate Action Pledge! 🌍
        </p>
        <p className="text-xl text-green-100 mb-12">
          Your commitment makes a real difference for our planet
        </p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="bg-white/30 rounded-full h-2 overflow-hidden backdrop-blur-sm">
            <div
              className="bg-white h-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-green-100 mt-2">Preparing your certificate...</p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 text-6xl animate-pulse">🌱</div>
          <div className="absolute top-20 right-20 text-6xl animate-pulse delay-100">🌍</div>
          <div className="absolute bottom-10 left-20 text-6xl animate-pulse delay-200">♻️</div>
          <div className="absolute bottom-20 right-10 text-6xl animate-pulse delay-300">💚</div>
        </div>
      </div>
    </div>
  );
}
