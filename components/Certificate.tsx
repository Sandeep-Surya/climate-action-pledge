'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pledge } from '@/types/pledge';
import { Award, Download, Share2, Star, X, AlertTriangle } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface CertificateProps {
  pledge: Pledge;
  onClose: () => void;
}

export default function Certificate({ pledge, onClose }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState(false);

  // Show dialog when component mounts
  useEffect(() => {
    setShowDialog(true);
  }, []);

  const handleDownload = async () => {
    try {
      // Check if certificate element exists
      if (!certificateRef.current) {
        throw new Error('Certificate element not found');
      }

      console.log('Starting certificate download...');
      
      // Dynamically import html-to-image only when needed
      let toPng;
      try {
        const module = await import('html-to-image');
        toPng = module.toPng;
        console.log('html-to-image loaded successfully');
      } catch (importError) {
        console.error('Failed to import html-to-image:', importError);
        throw new Error('Failed to load certificate generator. Please refresh the page and try again.');
      }
      
      // Add a small delay to ensure the certificate is fully rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('Capturing certificate...');
      const dataUrl = await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      
      console.log('Certificate captured, creating download link...');
      const link = document.createElement('a');
      link.download = `climate-pledge-certificate-${pledge.id}.png`;
      link.href = dataUrl;
      link.click();
      
      console.log('Download initiated successfully');
      setShowDialog(false);
    } catch (error) {
      console.error('Error generating certificate:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create certificate image. Please try again or take a screenshot instead.';
      alert(errorMessage);
    }
  };

  const handleShare = async () => {
    if (certificateRef.current) {
      try {
        // Dynamically import html-to-image
        let toBlob;
        try {
          const module = await import('html-to-image');
          toBlob = module.toBlob;
        } catch (importError) {
          console.error('Failed to import html-to-image:', importError);
          throw new Error('Failed to load certificate generator');
        }
        
        // Add a small delay to ensure the certificate is fully rendered
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Convert certificate to blob
        const blob = await toBlob(certificateRef.current, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
        });
        
        if (!blob) {
          alert('Failed to create certificate image. Please try downloading instead.');
          return;
        }
        
        const file = new File([blob], 'climate-pledge-certificate.png', { type: 'image/png' });
        
        // Check if Web Share API supports files
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: 'Climate Action Pledge Certificate',
              text: `I just took the Climate Action Pledge! Join me in making a difference. 🌍`,
              files: [file],
            });
          } catch (err) {
            if ((err as Error).name !== 'AbortError') {
              console.error('Error sharing:', err);
              alert('Failed to share. Certificate will be downloaded instead.');
              const link = document.createElement('a');
              link.download = `climate-pledge-certificate-${pledge.id}.png`;
              link.href = URL.createObjectURL(blob);
              link.click();
            }
          }
        } else {
          // Fallback: Download the image
          const link = document.createElement('a');
          link.download = `climate-pledge-certificate-${pledge.id}.png`;
          link.href = URL.createObjectURL(blob);
          link.click();
          alert('Certificate image downloaded! You can share it from your files.');
        }
      } catch (error) {
        console.error('Error creating certificate image:', error);
        alert('Failed to create certificate image. Please try downloading instead or take a screenshot.');
      }
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleViewPledgeWall = () => {
    setShowDialog(false);
    onClose();
  };

  return (
    <>
      {/* Download Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={handleCloseDialog}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Download Your Certificate
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Would you like to download your certificate now?
                </p>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-900 font-medium mb-1">
                ⚠️ Important Notice
              </p>
              <p className="text-xs text-amber-800">
                This certificate will not be shown again after you close this page. Please download it now to keep a copy for your records.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleDownload}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
              >
                <Download className="w-4 h-4" />
                Download Now
              </Button>
              <Button
                onClick={handleCloseDialog}
                variant="outline"
                className="flex-1"
              >
                Skip
              </Button>
            </div>
          </div>
        </div>
      )}

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

        {/* Certificate - wrapped in a clean container for html2canvas */}
        <div ref={certificateRef} className="bg-white p-2 rounded-lg">
          <Card
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
        </div>

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
            Share Image
          </Button>
          <Button
            onClick={handleViewPledgeWall}
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
    </>
  );
}
