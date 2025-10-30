'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import KPISection from '@/components/KPISectionNew';
import WhySectionTabbed from '@/components/WhySectionTabbed';
import SmoothScroll from '@/components/SmoothScroll';
import PledgeForm from '@/components/PledgeFormEnhanced';
import Certificate from '@/components/Certificate';
import PledgeWall from '@/components/PledgeWallNew';
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

  const loadPledges = async () => {
    try {
      // Priority 1: Try Google Sheets
      const sheetData = await getPledges();
      
      if (sheetData && sheetData.length > 0) {
        setPledges(sheetData);
        setLoading(false);
        return;
      }
      
      // Priority 2: Fallback to local seed data
      const response = await fetch('/data/seedPledges.json');
      if (response.ok) {
        const seedData = await response.json();
        setPledges(seedData);
      } else {
        setPledges([]);
      }
    } catch (error) {
      // Final fallback: try local seed data
      try {
        const response = await fetch('/data/seedPledges.json');
        if (response.ok) {
          const seedData = await response.json();
          setPledges(seedData);
        }
      } catch (fallbackError) {
        setPledges([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPledges();
    
    // Set up real-time polling every 30 seconds
    const interval = setInterval(() => {
      loadPledges();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

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
      <div className="min-h-screen bg-background">
        {/* Success Splash Screen */}
        {showSplash && currentPledge && (
          <SuccessSplash 
            name={currentPledge.name} 
            onComplete={handleSplashComplete} 
          />
        )}


        <HeroSection pledges={pledges} />
        <KPISection currentCount={pledges.length} pledges={pledges} />
        <WhySectionTabbed />
        
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
