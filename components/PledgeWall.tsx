'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pledge } from '@/types/pledge';
import { Star, MapPin, User, Calendar, ChevronDown, Leaf, Sparkles } from 'lucide-react';

interface PledgeWallProps {
  pledges: Pledge[];
}

const INITIAL_DISPLAY = 6;
const MAX_DISPLAY = 30;

export default function PledgeWall({ pledges }: PledgeWallProps) {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);

  // Sort pledges by date (newest first)
  const sortedPledges = [...pledges].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const displayedPledges = sortedPledges.slice(0, Math.min(displayCount, MAX_DISPLAY));
  const hasMore = sortedPledges.length > displayCount && displayCount < MAX_DISPLAY;
  const totalAvailable = Math.min(sortedPledges.length, MAX_DISPLAY);

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 6, MAX_DISPLAY));
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            🌟 Pledge Wall
          </h2>
          <p className="text-xl text-gray-600">
            See who&apos;s committed to climate action
          </p>
          {pledges.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {displayedPledges.length} of {totalAvailable} pledges shown
            </p>
          )}
        </div>

        {pledges.length === 0 ? (
          // Empty State
          <Card className="p-12 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-dashed border-green-300">
            <div className="text-center max-w-lg mx-auto">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Leaf className="w-24 h-24 text-green-400 opacity-50" />
                  <Sparkles className="w-8 h-8 text-green-600 absolute -top-2 -right-2 animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Pledges Yet
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Be the first climate champion! Take the pledge and inspire others to join the movement.
              </p>
              <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
                <span>🌍 Every journey begins with a single step</span>
                <span>💚 Your pledge will appear here for everyone to see</span>
                <span>✨ Lead the way to a sustainable future</span>
              </div>
            </div>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedPledges.map((pledge) => (
                <Card
                  key={pledge.id}
                  className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-green-500"
                >
                  <div className="space-y-4">
                    {/* Header with Name and Stars */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {pledge.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {pledge.state}
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: pledge.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Profile Badge */}
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <Badge variant="secondary">{pledge.profile}</Badge>
                    </div>

                    {/* Commitments */}
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Commitments:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {pledge.commitments.slice(0, 3).map((commitment, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-green-50 text-green-700 border-green-200"
                          >
                            {commitment}
                          </Badge>
                        ))}
                        {pledge.commitments.length > 3 && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-gray-50 text-gray-600"
                          >
                            +{pledge.commitments.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Footer with Date and ID */}
                    <div className="pt-4 border-t border-gray-200 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(pledge.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      <p className="text-xs text-gray-400 font-mono">
                        {pledge.id}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <Button
                  onClick={handleLoadMore}
                  size="lg"
                  variant="outline"
                  className="gap-2 group hover:bg-green-50 hover:border-green-500 hover:text-green-700"
                >
                  <span>Load More Pledges</span>
                  <ChevronDown className="w-5 h-5 group-hover:animate-bounce" />
                </Button>
                <p className="text-sm text-gray-500 mt-3">
                  {totalAvailable - displayedPledges.length} more pledges available
                </p>
              </div>
            )}

            {/* Max Reached Message */}
            {displayCount >= MAX_DISPLAY && sortedPledges.length > MAX_DISPLAY && (
              <div className="text-center mt-8">
                <Card className="inline-block p-4 bg-blue-50 border-blue-200">
                  <p className="text-sm text-blue-700">
                    Showing maximum of {MAX_DISPLAY} pledges. {sortedPledges.length - MAX_DISPLAY} more pledges exist!
                  </p>
                </Card>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
