import React from 'react';

/**
 * HeroBackgroundDesign
 * 
 * Clean, high-impact dark & crimson geometric background matching the authentic
 * Manisha Graphix reference banner (manisha_logo_updated.png):
 * - Deep dark gradient backdrop (#060609 -> #0e070c)
 * - Dynamic diagonal faceted crimson/red polygon shards
 * - Precision red halftone screen dots on the left edge
 * - Sleek angled light streaks and atmospheric ambient red glows
 * - Completely free of distracting blueprint/schematic annotations
 */
export const HeroBackgroundDesign: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      
      {/* 1. Deep Atmospheric Dark Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#060608] via-[#09080d] to-[#0e070c]" />

      {/* 2. Ambient Red & Golden Glows */}
      {/* Central Red Ambient Radiance */}
      <div className="absolute top-1/3 left-1/3 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] bg-[#FF0000]/10 rounded-full blur-[180px]" />
      
      {/* Bottom Left Golden Ambient Glow */}
      <div className="absolute -bottom-24 -left-20 w-[450px] h-[450px] bg-[#C99A50]/15 rounded-full blur-[140px]" />

      {/* Top Right Golden Shimmer */}
      <div className="absolute -top-24 right-0 w-[500px] h-[500px] bg-[#C99A50]/12 rounded-full blur-[160px]" />

      {/* 3. Left-Edge Golden Halftone Dot Grid */}
      <div 
        className="absolute top-0 left-0 w-32 sm:w-48 lg:w-64 h-full opacity-35 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #C99A50 1.3px, transparent 1.3px)',
          backgroundSize: '15px 15px',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
        }}
      />

      {/* 4. Diagonal Red & Golden Faceted Ribbons & Shards */}
      <svg
        className="absolute inset-0 w-full h-full opacity-85"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <defs>
          {/* Primary Linear Gradients */}
          <linearGradient id="facetPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0000" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#C99A50" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="facetSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF0000" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#800000" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="streakGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#C99A50" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF0000" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Top-Right to Center-Left Diagonal Facet Blade */}
        <polygon points="1440,0 1200,0 720,480 840,480 1440,120" fill="url(#facetSecondary)" />
        
        {/* Crisp Glowing Golden Edge Line along the diagonal */}
        <line x1="1200" y1="0" x2="720" y2="480" stroke="url(#streakGlow)" strokeWidth="1.5" opacity="0.6" />

        {/* Bottom-Left Angular Wing */}
        <polygon points="0,520 280,380 400,560 120,800 0,800" fill="url(#facetPrimary)" opacity="0.6" />
        <line x1="0" y1="520" x2="280" y2="380" stroke="#C99A50" strokeWidth="1.5" opacity="0.6" />

        {/* Far Right Corner Crimson Shards */}
        <polygon points="1440,460 1280,620 1440,780" fill="url(#facetPrimary)" opacity="0.5" />
        <line x1="1440" y1="460" x2="1280" y2="620" stroke="#C99A50" strokeWidth="2" opacity="0.6" />
      </svg>

      {/* 5. Subtle Angular Golden & Red Light Streaks */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(135deg, transparent 42%, rgba(201, 154, 80, 0.25) 45%, rgba(255, 255, 255, 0.2) 46%, rgba(255, 0, 0, 0.25) 47%, transparent 52%),
            linear-gradient(135deg, transparent 70%, rgba(201, 154, 80, 0.22) 72%, transparent 76%)
          `,
        }}
      />

      {/* 6. Authentic Logo Triangle & Golden Circle Geometry in Background */}
      <div className="absolute left-[8%] top-[14%] w-72 h-72 opacity-[0.06] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="100" cy="35" r="18" fill="#C99A50" />
          <polygon points="20,170 100,50 180,170" fill="#FF0000" />
        </svg>
      </div>

      {/* 7. Bottom Edge Gradient Transition */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#060609] to-transparent pointer-events-none" />
      
    </div>
  );
};
