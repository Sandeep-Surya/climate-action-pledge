'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Star, Shield } from 'lucide-react';
import { INDIAN_STATES, PROFILES, COMMITMENT_OPTIONS, PledgeFormData } from '@/types/pledge';
import { submitPledge } from '@/app/actions/pledge';
import { Pledge } from '@/types/pledge';

interface PledgeFormProps {
  onSuccess: (pledge: Pledge) => void;
}

export default function PledgeForm({ onSuccess }: PledgeFormProps) {
  const [formData, setFormData] = useState<PledgeFormData>({
    name: '',
    email: '',
    mobile: '',
    state: '',
    profile: '',
    commitments: [],
    rating: 5,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCommitmentToggle = (commitment: string) => {
    setFormData((prev) => ({
      ...prev,
      commitments: prev.commitments.includes(commitment)
        ? prev.commitments.filter((c) => c !== commitment)
        : [...prev.commitments, commitment],
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
    else if (!/^[+]?[0-9]{10,15}$/.test(formData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Invalid mobile number';
    }
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.profile) newErrors.profile = 'Profile is required';
    if (formData.commitments.length === 0) {
      newErrors.commitments = 'Select at least one commitment';
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
        commitments: [],
        rating: 5,
      });
      setErrors({});
    } catch (error) {
      alert('Failed to submit pledge. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pledge-form" className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Make Your Pledge
          </h2>
          <p className="text-lg text-gray-600">
            Fill in your details and commit to climate action today
          </p>
        </div>

        <Card className="p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-base">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="mt-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-base">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="mt-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <Label htmlFor="mobile" className="text-base">
                Mobile Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="+91 98765 43210"
                className="mt-2"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* State */}
            <div>
              <Label htmlFor="state" className="text-base">
                State <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </div>

            {/* Profile */}
            <div>
              <Label htmlFor="profile" className="text-base">
                Profile <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.profile} onValueChange={(value) => setFormData({ ...formData, profile: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your profile" />
                </SelectTrigger>
                <SelectContent>
                  {PROFILES.map((profile) => (
                    <SelectItem key={profile} value={profile}>
                      {profile}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.profile && (
                <p className="text-red-500 text-sm mt-1">{errors.profile}</p>
              )}
            </div>

            {/* Commitments */}
            <div>
              <Label className="text-base">
                Your Commitments <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-gray-500 mt-1 mb-3">
                Select all climate actions you commit to:
              </p>
              <div className="flex flex-wrap gap-2">
                {COMMITMENT_OPTIONS.map((commitment) => (
                  <Badge
                    key={commitment}
                    variant={formData.commitments.includes(commitment) ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-green-100"
                    onClick={() => handleCommitmentToggle(commitment)}
                  >
                    {commitment}
                  </Badge>
                ))}
              </div>
              {errors.commitments && (
                <p className="text-red-500 text-sm mt-2">{errors.commitments}</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <Label className="text-base">
                Rate Your Commitment Level
              </Label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        rating <= formData.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      } hover:text-yellow-400 transition`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <strong>Privacy Note:</strong> Your email and mobile number will be kept private and never displayed publicly. We only show your name, state, and commitments on the pledge wall.
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit My Pledge'
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
