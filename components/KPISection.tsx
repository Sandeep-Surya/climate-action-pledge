'use client';

import { Card } from '@/components/ui/card';
import { Users, Target, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface KPISectionProps {
  currentCount: number;
}

export default function KPISection({ currentCount }: KPISectionProps) {
  const [animatedCount, setAnimatedCount] = useState(0);
  const TARGET = 1000000;
  const percentage = ((currentCount / TARGET) * 100).toFixed(2);

  useEffect(() => {
    let start = 0;
    const increment = currentCount / 50;
    const timer = setInterval(() => {
      start += increment;
      if (start >= currentCount) {
        setAnimatedCount(currentCount);
        clearInterval(timer);
      } else {
        setAnimatedCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [currentCount]);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Our Impact So Far
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Target KPI */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex justify-center mb-4">
              <Target className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Target</h3>
            <p className="text-4xl font-bold text-blue-600">
              {TARGET.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-gray-600 mt-2">Pledges Goal</p>
          </Card>

          {/* Achieved KPI */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Achieved</h3>
            <p className="text-4xl font-bold text-green-600">
              {animatedCount.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-gray-600 mt-2">Pledges Made</p>
          </Card>

          {/* Progress KPI */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex justify-center mb-4">
              <TrendingUp className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Progress</h3>
            <p className="text-4xl font-bold text-purple-600">{percentage}%</p>
            <p className="text-sm text-gray-600 mt-2">of Target</p>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-1000 flex items-center justify-end px-4"
              style={{ width: `${Math.min(parseFloat(percentage), 100)}%` }}
            >
              <span className="text-white text-xs font-semibold">
                {currentCount > 0 && `${percentage}%`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
