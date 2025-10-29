'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pledge } from '@/types/pledge';
import { Award, Download, Share2, Star } from 'lucide-react';
import { useRef } from 'react';

interface CertificateProps {
  pledge: Pledge;
  onClose: () => void;
}

export default function Certificate({ pledge, onClose }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // In a real app, you'd use html2canvas or similar
    alert('Download feature would be implemented with html2canvas or similar library');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Climate Action Pledge Certificate',
        text: `I just took the Climate Action Pledge! Join me in making a difference. 🌍`,
        url: window.location.href,
      });
    } else {
      alert('Share feature not supported on this browser');
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <Award className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            🎉 Congratulations!
          </h2>
          <p className="text-xl text-gray-600">
            You&apos;ve successfully taken the Climate Action Pledge
          </p>
        </div>

        {/* Certificate */}
        <Card
          ref={certificateRef}
          className="p-12 bg-gradient-to-br from-white via-green-50 to-blue-50 border-4 border-green-600 shadow-2xl"
        >
          <div className="text-center space-y-6">
            {/* Header */}
            <div className="border-b-2 border-green-600 pb-6">
              <h3 className="text-3xl font-serif text-green-800 mb-2">
                Certificate of Commitment
              </h3>
              <p className="text-lg text-gray-600">Climate Action Pledge</p>
            </div>

            {/* Body */}
            <div className="space-y-4 py-6">
              <p className="text-lg text-gray-700">This certifies that</p>
              
              <h4 className="text-4xl font-bold text-gray-900 py-3">
                {pledge.name}
              </h4>

              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                has pledged to take action against climate change and commit to a sustainable future
              </p>

              {/* Commitments */}
              <div className="bg-white/50 rounded-lg p-6 my-6">
                <p className="font-semibold text-gray-800 mb-3">Committed Actions:</p>
                <ul className="space-y-2">
                  {pledge.commitments.map((commitment, index) => (
                    <li key={index} className="text-gray-700 flex items-center justify-center gap-2">
                      <span className="text-green-600">✓</span>
                      {commitment}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 my-4">
                {Array.from({ length: pledge.rating }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-gray-600">
                Commitment Level: {pledge.rating}/5 Stars
              </p>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-green-600 pt-6 space-y-2">
              <p className="text-sm text-gray-600">
                Pledge ID: <span className="font-mono font-semibold">{pledge.id}</span>
              </p>
              <p className="text-sm text-gray-600">
                Date: {new Date(pledge.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button
            onClick={handleDownload}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <Download className="w-5 h-5" />
            Download Certificate
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share
          </Button>
          <Button
            onClick={onClose}
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            View Pledge Wall
          </Button>
        </div>

        {/* Quote */}
        <div className="text-center mt-12">
          <blockquote className="text-xl italic text-gray-700 max-w-2xl mx-auto">
            &ldquo;Your commitment today is a gift to tomorrow&apos;s generations.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
