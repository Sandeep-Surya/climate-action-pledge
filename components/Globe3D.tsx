'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Pledge } from '@/types/pledge';

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

// Approximate coordinates for Indian states (major cities/capitals)
const STATE_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "Andhra Pradesh": { lat: 15.9129, lng: 79.7400 },
  "Arunachal Pradesh": { lat: 28.2180, lng: 94.7278 },
  "Assam": { lat: 26.2006, lng: 92.9376 },
  "Bihar": { lat: 25.0961, lng: 85.3131 },
  "Chhattisgarh": { lat: 21.2787, lng: 81.8661 },
  "Goa": { lat: 15.2993, lng: 74.1240 },
  "Gujarat": { lat: 22.2587, lng: 71.1924 },
  "Haryana": { lat: 29.0588, lng: 76.0856 },
  "Himachal Pradesh": { lat: 31.1048, lng: 77.1734 },
  "Jharkhand": { lat: 23.6102, lng: 85.2799 },
  "Karnataka": { lat: 15.3173, lng: 75.7139 },
  "Kerala": { lat: 10.8505, lng: 76.2711 },
  "Madhya Pradesh": { lat: 22.9734, lng: 78.6569 },
  "Maharashtra": { lat: 19.7515, lng: 75.7139 },
  "Manipur": { lat: 24.6637, lng: 93.9063 },
  "Meghalaya": { lat: 25.4670, lng: 91.3662 },
  "Mizoram": { lat: 23.1645, lng: 92.9376 },
  "Nagaland": { lat: 26.1584, lng: 94.5624 },
  "Odisha": { lat: 20.9517, lng: 85.0985 },
  "Punjab": { lat: 31.1471, lng: 75.3412 },
  "Rajasthan": { lat: 27.0238, lng: 74.2179 },
  "Sikkim": { lat: 27.5330, lng: 88.5122 },
  "Tamil Nadu": { lat: 11.1271, lng: 78.6569 },
  "Telangana": { lat: 18.1124, lng: 79.0193 },
  "Tripura": { lat: 23.9408, lng: 91.9882 },
  "Uttar Pradesh": { lat: 26.8467, lng: 80.9462 },
  "Uttarakhand": { lat: 30.0668, lng: 79.0193 },
  "West Bengal": { lat: 22.9868, lng: 87.8550 },
};

interface Globe3DProps {
  pledges: Pledge[];
}

interface HexData {
  lat: number;
  lng: number;
  altitude: number;
  color: string;
  state: string;
  count: number;
}

interface PointData {
  lat: number;
  lng: number;
  size: number;
  color: string;
  state: string;
  count: number;
}

export default function Globe3D({ pledges }: Globe3DProps) {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hexData, setHexData] = useState<HexData[]>([]);
  const [pointsData, setPointsData] = useState<PointData[]>([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const [isMobile, setIsMobile] = useState(false);

  // Diverse color palette for pledge sticks (vibrant and distinct colors)
  const colorPalette = useMemo(() => [
    '#10b981', // Emerald
    '#3b82f6', // Blue
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#8b5cf6', // Violet
    '#ec4899', // Pink
    '#14b8a6', // Teal
    '#f97316', // Orange
    '#06b6d4', // Cyan
    '#a855f7', // Purple
    '#84cc16', // Lime
    '#f43f5e', // Rose
    '#6366f1', // Indigo
    '#eab308', // Yellow
    '#059669', // Emerald darker
    '#2563eb', // Blue darker
    '#d97706', // Amber darker
    '#dc2626', // Red darker
    '#7c3aed', // Violet darker
    '#db2777', // Pink darker
    '#0d9488', // Teal darker
    '#ea580c', // Orange darker
    '#0891b2', // Cyan darker
    '#9333ea', // Purple darker
    '#65a30d', // Lime darker
    '#e11d48', // Rose darker
    '#4f46e5', // Indigo darker
    '#ca8a04', // Yellow darker
  ], []);

  // Normalize state name to match coordinates
  const normalizeStateName = (state: string): string => {
    if (!state) return '';
    
    // Remove extra whitespace
    let normalized = state.trim();
    
    // Try exact match first
    if (STATE_COORDINATES[normalized]) {
      return normalized;
    }
    
    // Try to find close match
    const stateKey = Object.keys(STATE_COORDINATES).find(
      key => key.toLowerCase() === normalized.toLowerCase()
    );
    
    return stateKey || normalized;
  };

  // Calculate state-wise pledge counts
  const stateCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    pledges.forEach((pledge) => {
      const state = normalizeStateName(pledge.state);
      if (state) {
        counts[state] = (counts[state] || 0) + 1;
      }
    });
    
    return counts;
  }, [pledges]);

  // Handle container resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        const windowWidth = window.innerWidth;
        
        // Check if mobile or tablet
        setIsMobile(windowWidth < 1024); // lg breakpoint
        
        // Use full container dimensions without scaling to avoid cropping
        setDimensions({ 
          width: offsetWidth, 
          height: offsetHeight 
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (Object.keys(stateCounts).length === 0) {
      setHexData([]);
      setPointsData([]);
      return;
    }

    // Find min and max pledge counts for scaling
    const counts = Object.values(stateCounts);
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);
    
    // Height scaling parameters
    const MIN_HEIGHT = 0.15;  // Minimum visible height (for states with lowest pledges)
    const MAX_HEIGHT = 0.8;   // Maximum height (for states with highest pledges)
    
    // Generate single hex data per state
    const hexagons: HexData[] = [];
    
    Object.entries(stateCounts).forEach(([state, count], index) => {
      const coords = STATE_COORDINATES[state];
      
      if (!coords) {
        return;
      }
      
      // Calculate altitude using linear interpolation between MIN and MAX
      let altitude: number;
      if (minCount === maxCount) {
        altitude = (MIN_HEIGHT + MAX_HEIGHT) / 2;
      } else {
        const normalized = (count - minCount) / (maxCount - minCount);
        altitude = MIN_HEIGHT + (normalized * (MAX_HEIGHT - MIN_HEIGHT));
      }
      
      // Assign a unique color to each state from the color palette
      const uniqueColor = colorPalette[index % colorPalette.length];
      
      const hexData: HexData = {
        lat: coords.lat,
        lng: coords.lng,
        altitude,
        color: uniqueColor,
        state,
        count,
      };
      
      hexagons.push(hexData);
    });

    setHexData(hexagons);

    // Generate points data for hover tooltips with matching colors
    const points: PointData[] = [];
    Object.entries(stateCounts).forEach(([state, count], index) => {
      const coords = STATE_COORDINATES[state];
      if (!coords) return;
      
      // Use the same unique color as the hex stick
      const uniqueColor = colorPalette[index % colorPalette.length];
      
      const pointData: PointData = {
        lat: coords.lat,
        lng: coords.lng,
        size: 0.8, // Fixed size for tooltip points
        color: uniqueColor,
        state,
        count,
      };
      
      points.push(pointData);
    });

    setPointsData(points);

    // Initialize globe controls - Always center on India
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      controls.autoRotate = false; // We'll handle rotation manually
      controls.enableZoom = true;
      controls.minDistance = 200;
      controls.maxDistance = 500;
      
      // Always point to India (center of India coordinates)
      // Adjust altitude based on device size
      const altitude = isMobile ? 2.6 : 2.2;
      
      globeEl.current.pointOfView({ 
        lat: 20.5937, 
        lng: 78.9629, 
        altitude 
      }, 0);
    }
  }, [stateCounts, isMobile, colorPalette]);

  // Back-and-forth rotation animation focused on India
  useEffect(() => {
    if (!globeEl.current) return;

    let angle = 0;
    const rotationRange = 30; // Rotate ±30 degrees from center
    const animationId = setInterval(() => {
      angle += 0.3;
      // Oscillate between -30 and +30 degrees using sine wave
      const oscillation = Math.sin(angle * 0.02) * rotationRange;
      
      // Adjust altitude based on device size for better viewing
      const altitude = isMobile ? 2.6 : 2.2;
      
      globeEl.current.pointOfView({ 
        lat: 20.5937, 
        lng: 78.9629 + oscillation, // Oscillate longitude around India
        altitude 
      }, 100);
    }, 50);

    return () => clearInterval(animationId);
  }, [isMobile]);

  // Initialize globe to point to India immediately on mount
  useEffect(() => {
    if (!globeEl.current) return;

    // Set initial view to India as soon as globe is ready
    const altitude = isMobile ? 2.6 : 2.2;
    
    setTimeout(() => {
      if (globeEl.current) {
        globeEl.current.pointOfView({ 
          lat: 20.5937, 
          lng: 78.9629, 
          altitude 
        }, 0); // 0 duration for instant positioning
      }
    }, 100); // Small delay to ensure globe is fully initialized
  }, [isMobile]);

  const getColorByCount = (count: number): string => {
    if (count >= 10) return 'oklch(0.60 0.25 150)'; // Dark green
    if (count >= 5) return 'oklch(0.65 0.20 160)'; // Medium green
    if (count >= 2) return 'oklch(0.70 0.15 170)'; // Light green
    return 'oklch(0.75 0.12 180)'; // Very light teal
  };

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl={null}
        backgroundColor="rgba(0,0,0,0)"
        
        // Points layer (showing states with pledges)
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.05}
        pointRadius={0.8}
        pointLabel={(d: any) => `
          <div style="
            background: oklch(0.99 0.01 120 / 0.95);
            padding: 12px 16px;
            border-radius: 12px;
            border: 2px solid oklch(0.60 0.20 150);
            font-family: var(--font-inter);
            box-shadow: 0 8px 24px oklch(0.20 0.02 140 / 0.2);
          ">
            <div style="
              font-weight: 700;
              font-size: 16px;
              color: oklch(0.20 0.02 140);
              margin-bottom: 4px;
            ">
              ${d.state}
            </div>
            <div style="
              font-size: 14px;
              color: oklch(0.50 0.02 140);
            ">
              ${d.count} pledge${d.count !== 1 ? 's' : ''}
            </div>
          </div>
        `}
        
        // Cylinders using hexBinPointsData
        hexBinPointsData={hexData}
        hexBinPointLat="lat"
        hexBinPointLng="lng"
        hexBinPointWeight={(d: any) => 1}
        hexAltitude={(d: any) => {
          // d.sumWeight is the total weight of points in this bin
          // Scale based on number of points
          const points = d.points || [];
          if (points.length === 0) return 0;
          
          // Use the altitude from the first point (they're all from same state)
          const altitude = points[0]?.altitude || 0.15;
          return altitude;
        }}
        hexTopColor={(d: any) => {
          const points = d.points || [];
          if (points.length === 0) return '#6ee7b7';
          
          // Use the unique color assigned to this state
          return points[0]?.color || '#10b981';
        }}
        hexSideColor={(d: any) => {
          const points = d.points || [];
          if (points.length === 0) return '#34d399';
          
          // Use a slightly darker version of the unique color for sides
          const baseColor = points[0]?.color || '#10b981';
          // Darken the color by reducing brightness (simplified approach)
          return baseColor + 'dd'; // Add alpha for darker effect
        }}
        hexBinResolution={4}
        hexMargin={0.2}
        hexTransitionDuration={1000}
        hexLabel={(d: any) => {
          const points = d.points || [];
          if (points.length === 0) return '';
          
          const point = points[0];
          return `
            <div style="
              background: white;
              padding: 12px 16px;
              border-radius: 12px;
              border: 2px solid #10b981;
              box-shadow: 0 8px 24px rgba(0,0,0,0.2);
            ">
              <div style="font-weight: 700; font-size: 16px; color: #1f2937; margin-bottom: 4px;">
                ${point.state}
              </div>
              <div style="font-size: 14px; color: #6b7280;">
                ${point.count} pledge${point.count !== 1 ? 's' : ''}
              </div>
            </div>
          `;
        }}
        
        // Styling
        atmosphereColor="oklch(0.65 0.18 160)"
        atmosphereAltitude={0.15}
        
        // Performance
        enablePointerInteraction={true}
        animateIn={true}
        
        // Initialize view to India immediately when globe is ready
        onGlobeReady={() => {
          if (globeEl.current) {
            const altitude = isMobile ? 2.6 : 2.2;
            globeEl.current.pointOfView({ 
              lat: 20.5937, 
              lng: 78.9629, 
              altitude 
            }, 0);
          }
        }}
      />
    </div>
  );
}
