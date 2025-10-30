'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Star, Shield, Info, Check, User, Mail, Phone, MapPin, Briefcase, Search } from 'lucide-react';
import { INDIAN_STATES, PROFILES, COMMITMENT_THEMES, PledgeFormData } from '@/types/pledge';
import { submitPledge } from '@/app/actions/pledge';
import { Pledge } from '@/types/pledge';

interface PledgeFormProps {
  onSuccess: (pledge: Pledge) => void;
}

export default function PledgeFormEnhanced({ onSuccess }: PledgeFormProps) {
  const [formData, setFormData] = useState<PledgeFormData>({
    name: '',
    email: '',
    mobile: '',
    state: '',
    profile: '',
    customProfile: '',
    commitments: [],
    rating: 0,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stateSearch, setStateSearch] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  // Filter states based on search
  const filteredStates = INDIAN_STATES.filter(state =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  );

  // Auto-calculate rating
  const calculateRating = (commitmentsCount: number): number => {
    if (commitmentsCount === 0) return 0;
    if (commitmentsCount <= 2) return 1;
    if (commitmentsCount <= 4) return 2;
    if (commitmentsCount <= 6) return 3;
    if (commitmentsCount <= 8) return 4;
    return 5;
  };

  const handleCommitmentToggle = (commitment: string) => {
    const newCommitments = formData.commitments.includes(commitment)
      ? formData.commitments.filter((c) => c !== commitment)
      : [...formData.commitments, commitment];
    
    setFormData((prev) => ({
      ...prev,
      commitments: newCommitments,
      rating: calculateRating(newCommitments.length),
    }));
  };

  // Sanitization helpers
  const sanitizeName = (name: string): string => {
    // Allow only letters, spaces, dots, apostrophes, and hyphens (for names like "Mary-Jane" or "O'Brien")
    // Remove all other special characters during input
    return name.replace(/[^a-zA-Z\s.'-]/g, '').slice(0, 100);
  };

  const sanitizeEmail = (email: string): string => {
    return email.trim().toLowerCase().slice(0, 100);
  };

  const sanitizeMobile = (mobile: string): string => {
    return mobile.replace(/[^0-9+\s-]/g, '').slice(0, 20);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    const sanitizedName = sanitizeName(formData.name).trim();
    if (!sanitizedName) {
      newErrors.name = 'Name is required';
    } else if (sanitizedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s.'-]+$/.test(sanitizedName)) {
      newErrors.name = 'Name can only contain letters, spaces, and basic punctuation';
    }

    // Email validation
    const sanitizedEmail = sanitizeEmail(formData.email);
    if (!sanitizedEmail) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(sanitizedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Mobile validation
    const sanitizedMobile = sanitizeMobile(formData.mobile);
    if (!sanitizedMobile) {
      newErrors.mobile = 'Mobile number is required';
    } else {
      const digitsOnly = sanitizedMobile.replace(/[^0-9]/g, '');
      if (digitsOnly.length < 10) {
        newErrors.mobile = 'Mobile number must be at least 10 digits';
      } else if (digitsOnly.length > 15) {
        newErrors.mobile = 'Mobile number cannot exceed 15 digits';
      } else if (!/^[+]?[0-9\s-]+$/.test(sanitizedMobile)) {
        newErrors.mobile = 'Invalid mobile number format';
      }
    }

    if (!formData.state) newErrors.state = 'Please select your state';
    if (!formData.profile) newErrors.profile = 'Please select your profile';
    if (formData.profile === 'Other' && !formData.customProfile?.trim()) {
      newErrors.customProfile = 'Please specify your profile';
    }
    if (formData.commitments.length === 0) {
      newErrors.commitments = 'Please select at least one commitment';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    try {
      const pledge = await submitPledge(formData);
      onSuccess(pledge);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        state: '',
        profile: '',
        customProfile: '',
        commitments: [],
        rating: 0,
      });
      setErrors({});
      setStateSearch('');
    } catch (error) {
      alert('Failed to submit pledge. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pledge-form" className="py-24 px-4 bg-gradient-to-br from-background via-teal-50/30 to-emerald-50/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-syne text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-4">
            <span className="text-mask-gradient">Make Your Pledge</span>
          </h2>
          <p className="font-inter text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of climate champions and commit to meaningful action
          </p>
        </motion.div>

        <Card className="glass-morph border-2 border-primary/20 shadow-2xl p-8 sm:p-10 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-space-grotesk font-semibold flex items-center gap-2 text-foreground">
                  <User className="w-4 h-4 text-primary" />
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const sanitized = sanitizeName(e.target.value);
                    setFormData({ ...formData, name: sanitized });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="Your full name"
                  className="neo-morph-inset text-base py-5 font-inter"
                  maxLength={100}
                />
                {errors.name && <p className="text-red-500 text-sm font-inter">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-space-grotesk font-semibold flex items-center gap-2 text-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    const sanitized = sanitizeEmail(e.target.value);
                    setFormData({ ...formData, email: sanitized });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="email@example.com"
                  className="neo-morph-inset text-base py-5 font-inter"
                  maxLength={100}
                />
                {errors.email && <p className="text-red-500 text-sm font-inter">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="font-space-grotesk font-semibold flex items-center gap-2 text-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  Mobile <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => {
                    const sanitized = sanitizeMobile(e.target.value);
                    setFormData({ ...formData, mobile: sanitized });
                    if (errors.mobile) setErrors({ ...errors, mobile: '' });
                  }}
                  placeholder="+91 98765 43210"
                  className="neo-morph-inset text-base py-5 font-inter"
                  maxLength={20}
                />
                {errors.mobile && <p className="text-red-500 text-sm font-inter">{errors.mobile}</p>}
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-primary/80 glass-morph p-3 rounded-xl">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="font-inter">Mobile Number and Email are required for validation but never shown publicly.
Data is used only for verification and engagement.</span>
            </div>

            {/* Location & Profile */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* State Selection with Search */}
              <div className="space-y-2 relative">
                <Label htmlFor="state" className="font-space-grotesk font-semibold flex items-center gap-2 text-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  State <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={stateSearch || formData.state}
                    onChange={(e) => {
                      setStateSearch(e.target.value);
                      setShowStateDropdown(true);
                      if (e.target.value === '') setFormData({ ...formData, state: '' });
                    }}
                    onFocus={() => setShowStateDropdown(true)}
                    placeholder="Search your state..."
                    className="neo-morph-inset text-base py-5 pl-10 font-inter"
                  />
                  {showStateDropdown && stateSearch && (
                    <div className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto glass-morph border border-primary/20 rounded-xl shadow-xl z-10">
                      {filteredStates.length > 0 ? (
                        filteredStates.map((state) => (
                          <button
                            key={state}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, state });
                              setStateSearch(state);
                              setShowStateDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors font-inter text-sm"
                          >
                            {state}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-muted-foreground font-inter">
                          No states found
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {errors.state && <p className="text-red-500 text-sm font-inter">{errors.state}</p>}
              </div>

              {/* Profile as Badges */}
              <div className="space-y-2">
                <Label className="font-space-grotesk font-semibold flex items-center gap-2 text-foreground">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Profile <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-wrap gap-2 pt-2">
                  {PROFILES.map((profile) => (
                    <motion.div key={profile} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Badge
                        onClick={() => setFormData({ ...formData, profile, customProfile: profile !== 'Other' ? '' : formData.customProfile })}
                        className={`cursor-pointer px-4 py-2 text-sm font-space-grotesk font-semibold transition-all ${
                          formData.profile === profile
                            ? 'bg-primary text-white border-primary'
                            : 'glass-morph text-foreground border-primary/20 hover:border-primary/50'
                        }`}
                      >
                        {profile}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                {errors.profile && <p className="text-red-500 text-sm mt-2 font-inter">{errors.profile}</p>}
                
                {formData.profile === 'Other' && (
                  <motion.div 
                    className="mt-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <Input
                      type="text"
                      value={formData.customProfile || ''}
                      onChange={(e) => setFormData({ ...formData, customProfile: e.target.value })}
                      placeholder="Specify your profile"
                      className="neo-morph-inset text-base py-5 font-inter"
                    />
                    {errors.customProfile && <p className="text-red-500 text-sm mt-1 font-inter">{errors.customProfile}</p>}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Commitments */}
            <div className="space-y-6">
              <div>
                <Label className="font-space-grotesk font-semibold text-xl text-foreground mb-2 block">
                  Your Commitments <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-muted-foreground font-inter">
                  Select all climate actions you commit to - each one makes a difference! 🌱
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {COMMITMENT_THEMES.map((theme, themeIndex) => (
                  <motion.div
                    key={theme.theme}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: themeIndex * 0.1 }}
                  >
                    <div className="group neo-morph hover:shadow-xl transition-all duration-300 rounded-3xl p-6 h-full border-2 border-transparent hover:border-primary/20">
                      <div className="mb-4">
                        <h4 className="font-space-grotesk font-bold text-foreground text-base flex items-center gap-2 mb-1">
                          <motion.span 
                            className="w-3 h-3 bg-gradient-to-r from-primary to-teal-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          {theme.theme}
                        </h4>
                        <div className="h-1 w-12 bg-gradient-to-r from-primary to-teal-500 rounded-full"></div>
                      </div>
                      
                      <div className="space-y-2">
                        {theme.commitments.map((commitment, commitmentIndex) => {
                          const isSelected = formData.commitments.includes(commitment);
                          return (
                            <motion.label
                              key={commitment}
                              className={`flex items-start gap-3 cursor-pointer p-3 rounded-xl transition-all text-sm group/item relative overflow-hidden ${
                                isSelected 
                                  ? 'bg-gradient-to-r from-primary/10 to-teal-500/10 border-2 border-primary shadow-lg' 
                                  : 'hover:bg-primary/5 border-2 border-transparent hover:border-primary/10'
                              }`}
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (themeIndex * 0.1) + (commitmentIndex * 0.05) }}
                            >
                              {/* Shimmer effect on selected */}
                              {isSelected && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                  animate={{ x: ['-100%', '200%'] }}
                                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                />
                              )}
                              
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {
                                  handleCommitmentToggle(commitment);
                                  if (errors.commitments) setErrors({ ...errors, commitments: '' });
                                }}
                                className="hidden"
                              />
                              
                              {/* Custom checkbox */}
                              <motion.div 
                                className={`relative flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                  isSelected 
                                    ? 'bg-primary border-primary shadow-lg' 
                                    : 'border-muted-foreground/30 bg-background'
                                }`}
                                whileHover={{ rotate: 5 }}
                                animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 0.3 }}
                              >
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                                  >
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                  </motion.div>
                                )}
                              </motion.div>
                              
                              <span className={`font-inter flex-1 leading-tight transition-colors relative z-10 ${
                                isSelected ? 'text-foreground font-medium' : 'text-muted-foreground'
                              }`}>
                                {commitment}
                              </span>
                            </motion.label>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {errors.commitments && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="glass-morph border-2 border-red-500/50 bg-red-50 p-4 rounded-xl flex items-center gap-3"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                  >
                    <Info className="w-5 h-5 text-red-500" />
                  </motion.div>
                  <p className="text-red-600 text-sm font-inter font-medium">{errors.commitments}</p>
                </motion.div>
              )}
              
              {formData.commitments.length > 0 && (
                <motion.div 
                  className="glass-morph border-2 border-primary/20 p-5 rounded-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-space-grotesk font-bold text-foreground text-lg">
                        {formData.commitments.length} commitment{formData.commitments.length !== 1 ? 's' : ''} selected
                      </span>
                      <p className="text-sm text-muted-foreground font-inter mt-1">Your impact rating</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isActive = star <= formData.rating;
                        return (
                          <motion.div
                            key={star}
                            initial={false}
                            animate={isActive ? { 
                              scale: [1, 1.3, 1],
                              rotate: [0, 15, 0]
                            } : { scale: 1, rotate: 0 }}
                            transition={{ 
                              duration: 0.4,
                              ease: "easeOut"
                            }}
                          >
                            <Star
                              className={`w-7 h-7 transition-colors duration-300 ${
                                isActive ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'
                              }`}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Privacy Note */}
            <div className="glass-morph border border-primary/20 p-5 rounded-2xl flex gap-4">
              <Shield className="w-6 h-6 text-primary flex-shrink-0" />
              <div className="text-sm font-inter text-foreground">
                <strong className="font-space-grotesk">Privacy Protected:</strong> Your email and mobile number are kept private and never displayed publicly.
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto"
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="relative w-full md:w-auto bg-gradient-to-r from-primary to-teal-600 hover:from-teal-600 hover:to-primary text-white text-base px-12 py-6 font-space-grotesk font-bold shadow-xl rounded-full overflow-hidden"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Submit My Pledge</span>
                      <motion.span
                        className="ml-2 inline-block relative z-10"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ✨
                      </motion.span>
                    </>
                  )}
                  {/* Continuous shiny effect - left to right */}
                  <div 
                    className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:200%_0,0_0] bg-no-repeat animate-shine"
                    style={{
                      animation: 'shine 3s infinite',
                    }}
                  />
                </Button>
              </motion.div>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
