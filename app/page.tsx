'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import KPISection from '@/components/KPISectionNew';
import WhySection from '@/components/WhySectionNew';
import SmoothScroll from '@/components/SmoothScroll';
import PledgeForm from '@/components/PledgeForm';
import Certificate from '@/components/Certificate';
import PledgeWall from '@/components/PledgeWall';
import Footer from '@/components/Footer';
import SuccessSplash from '@/components/SuccessSplash';
import { Pledge } from '@/types/pledge';
import { getPledges } from '@/app/actions/pledge';

export default function Home() {
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [showSplash, setShowSplash] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [currentPledge, setCurrentPledge] = useState<Pledge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPledges();
  }, []);

  const loadPledges = async () => {
    try {
      const data = await getPledges();
      setPledges(data);
    } catch (error) {
      console.error('Failed to load pledges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePledgeSuccess = (pledge: Pledge) => {
    setCurrentPledge(pledge);
    setShowSplash(true);
    // Add to local state immediately
    setPledges([pledge, ...pledges]);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
    setShowCertificate(true);
  };

  const handleCloseCertificate = () => {
    setShowCertificate(false);
    // Scroll to pledge wall
    const pledgeWall = document.getElementById('pledge-wall');
    pledgeWall?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-slate-950">
        {/* Success Splash Screen */}
        {showSplash && currentPledge && (
          <SuccessSplash 
            name={currentPledge.name} 
            onComplete={handleSplashComplete} 
          />
        )}

        <HeroSection />
        <KPISection currentCount={pledges.length} />
        <WhySection />
        
        {!showCertificate ? (
          <PledgeForm onSuccess={handlePledgeSuccess} />
        ) : (
          currentPledge && (
            <Certificate pledge={currentPledge} onClose={handleCloseCertificate} />
          )
        )}
        
        <div id="pledge-wall">
          <PledgeWall pledges={pledges} />
        </div>
        
        <Footer />
      </div>
    </SmoothScroll>
  );
}
