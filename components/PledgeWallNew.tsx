'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Star, 
  User, 
  Calendar, 
  Award,
  Sparkles,
  ChevronDown,
  Filter,
  TrendingUp,
  Users
} from 'lucide-react';
import { Pledge } from '@/types/pledge';

interface PledgeWallProps {
  pledges: Pledge[];
}

export default function PledgeWallNew({ pledges }: PledgeWallProps) {
  const [displayCount, setDisplayCount] = useState(9);
  const [filterProfile, setFilterProfile] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'rating'>('recent');
  const MAX_DISPLAY = 150;

  // Filter and sort pledges
  let filteredPledges = pledges;
  if (filterProfile) {
    filteredPledges = pledges.filter(p => p.profile === filterProfile);
  }

  const sortedPledges = [...filteredPledges].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.rating - a.rating;
  });

  const displayedPledges = sortedPledges.slice(0, Math.min(displayCount, MAX_DISPLAY));
  const hasMore = sortedPledges.length > displayCount && displayCount < MAX_DISPLAY;
  const totalAvailable = Math.min(sortedPledges.length, MAX_DISPLAY);

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 9, MAX_DISPLAY));
  };

  // Get unique profiles
  const profiles = Array.from(new Set(pledges.map(p => p.profile)));

  // Stats
  const topRatedCount = pledges.filter(p => p.rating === 5).length;
  const recentPledges = pledges.filter(p => {
    const daysSince = (Date.now() - new Date(p.date).getTime()) / (1000 * 60 * 60 * 24);
    return daysSince <= 7;
  }).length;

  return (
    <section id="pledge-wall" className="py-24 px-4 bg-gradient-to-br from-background via-emerald-50/20 to-teal-50/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-teal-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-500/5 to-green-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 glass-morph px-6 py-3 rounded-full mb-6 border border-primary/20"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-space-grotesk font-semibold text-primary">Climate Champions</span>
          </motion.div>

          <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="text-mask-gradient">Pledge Wall</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Meet the inspiring individuals making a difference for our planet
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.div 
              className="neo-morph px-6 py-3 rounded-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-space-grotesk font-bold text-foreground">{pledges.length}</span>
                <span className="font-inter text-sm text-muted-foreground">Total Pledges</span>
              </div>
            </motion.div>

            <motion.div 
              className="neo-morph px-6 py-3 rounded-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="font-space-grotesk font-bold text-foreground">{topRatedCount}</span>
                <span className="font-inter text-sm text-muted-foreground">5-Star Champions</span>
              </div>
            </motion.div>

            <motion.div 
              className="neo-morph px-6 py-3 rounded-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <span className="font-space-grotesk font-bold text-foreground">{recentPledges}</span>
                <span className="font-inter text-sm text-muted-foreground">This Week</span>
              </div>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => {
                setFilterProfile(null);
                setDisplayCount(9);
              }}
              variant={filterProfile === null ? 'default' : 'outline'}
              size="sm"
              className={`rounded-full font-space-grotesk ${
                filterProfile === null 
                  ? 'bg-primary text-white' 
                  : 'glass-morph border-primary/20 hover:border-primary/40'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              All
            </Button>
            {profiles.map(profile => (
              <Button
                key={profile}
                onClick={() => {
                  setFilterProfile(filterProfile === profile ? null : profile);
                  setDisplayCount(9);
                }}
                variant={filterProfile === profile ? 'default' : 'outline'}
                size="sm"
                className={`rounded-full font-space-grotesk ${
                  filterProfile === profile 
                    ? 'bg-primary text-white' 
                    : 'glass-morph border-primary/20 hover:border-primary/40'
                }`}
              >
                {profile}
              </Button>
            ))}
          </div>

          {pledges.length > 0 && (
            <p className="text-sm text-muted-foreground mt-4 font-inter">
              Showing {displayedPledges.length} of {totalAvailable} pledges
            </p>
          )}
        </motion.div>

        {pledges.length === 0 ? (
          <Card className="neo-morph p-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-teal-500/10 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
              <h3 className="font-poppins text-2xl font-bold text-foreground mb-3">
                Be the First!
              </h3>
              <p className="font-inter text-muted-foreground mb-6">
                No pledges yet. Take the lead and inspire others to join the movement!
              </p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground font-inter">
                <span>🌱 Start your climate journey</span>
                <span>✨ Lead the way to a sustainable future</span>
              </div>
            </div>
          </Card>
        ) : (
          <>
            {/* Pledge Grid - Masonry Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <AnimatePresence mode="popLayout">
                {displayedPledges.map((pledge, index) => (
                  <motion.div
                    key={pledge.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.05,
                      layout: { duration: 0.3 }
                    }}
                  >
                    <Card className="group relative overflow-hidden neo-morph hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 h-full">
                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative p-6 space-y-4">
                        {/* Header with Name and Rating */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-poppins text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                              {pledge.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground font-inter">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>{pledge.state}</span>
                            </div>
                          </div>
                          
                          {/* Rating Stars */}
                          <motion.div 
                            className="flex gap-0.5"
                            whileHover={{ scale: 1.1 }}
                          >
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < pledge.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-muted-foreground/30'
                                }`}
                              />
                            ))}
                          </motion.div>
                        </div>

                        {/* Profile Badge */}
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          <Badge variant="secondary" className="glass-morph text-foreground border-primary/20 font-space-grotesk">
                            {pledge.profile}
                          </Badge>
                        </div>

                        {/* Commitments */}
                        <div>
                          <p className="font-space-grotesk text-sm font-semibold text-foreground mb-2">
                            Commitments ({pledge.commitments.length})
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {pledge.commitments.slice(0, 3).map((commitment, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-primary/5 text-primary border-primary/30 font-inter"
                              >
                                {commitment.length > 25 ? `${commitment.slice(0, 25)}...` : commitment}
                              </Badge>
                            ))}
                            {pledge.commitments.length > 3 && (
                              <Badge
                                variant="outline"
                                className="text-xs glass-morph text-muted-foreground border-primary/20 font-space-grotesk font-semibold"
                              >
                                +{pledge.commitments.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Footer with Date */}
                        <div className="pt-3 border-t border-primary/10 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground font-inter">
                            <Calendar className="w-3 h-3" />
                            {new Date(pledge.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                          <p className="text-xs text-muted-foreground/60 font-mono">
                            {pledge.id}
                          </p>
                        </div>

                        {/* Corner Accent */}
                        {pledge.rating === 5 && (
                          <motion.div
                            className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-bl-full"
                            animate={{ rotate: [0, 5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <Award className="absolute top-2 right-2 w-5 h-5 text-yellow-500" />
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More Button */}
            {hasMore && (
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Button
                  onClick={handleLoadMore}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-teal-600 hover:from-teal-600 hover:to-primary text-white font-space-grotesk font-bold shadow-xl rounded-full px-8 group"
                >
                  Load More Pledges
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronDown className="ml-2 w-5 h-5" />
                  </motion.div>
                </Button>
                <p className="text-sm text-muted-foreground mt-3 font-inter">
                  {sortedPledges.length - displayCount} more pledges available
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
