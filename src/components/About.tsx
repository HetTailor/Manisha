import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const About: React.FC = () => {
  const { colorMode } = useTheme();
  const isLight = colorMode === 'light';

  return (
    <section id="about" className={`py-20 ${isLight ? 'bg-white' : 'bg-[#0c0c12]'} border-b ${isLight ? 'border-neutral-200' : 'border-neutral-800'} relative overflow-hidden transition-colors duration-500`}>
      {/* Background Halftone Dotted Graphics in corner */}
      <div 
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#FF0000 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'radial-gradient(#FF0000 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: iMac Workspace Photo on Designer Desk */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/80 group">
              <img
                src="/assets/ref/about-imac.png"
                alt="Manisha Graphix Prepress & Design Studio Workspace"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-102"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />
            </div>
          </div>

          {/* Center Column: ABOUT US Copy & Owner Signature */}
          <div className="lg:col-span-4 space-y-4 text-left">
            {/* Kicker */}
            <div className="text-xs font-mono font-bold tracking-widest text-[#FF0000] uppercase">
              ABOUT US
            </div>

            {/* Headline with PRINT in Vivid Red */}
            <h2 className={`text-2xl sm:text-3xl xl:text-4xl font-display font-black tracking-tight leading-tight uppercase ${isLight ? 'text-slate-950' : 'text-white'}`}>
              TURNING IDEAS INTO <span className="text-[#FF0000]">PRINT</span>
            </h2>

            {/* Description Paragraphs exactly matching reference */}
            <div className={`space-y-3.5 text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-neutral-300'} leading-relaxed font-sans`}>
              <p>
                Manisha Graphix is a creative graphic design and printing studio owned by Harshil Mistry. We provide professional printing solutions for businesses, brands, special occasions, pharmaceutical companies and publications.
              </p>
              <p>
                From elegant wedding invitations and professional stationery to pharmaceutical printing and complete book work, we focus on quality, creativity and precision in every project.
              </p>
            </div>

            {/* Owner Signature */}
            <div className="pt-2">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/ref/harshil-signature.png"
                  alt="Harshil Mistry Signature"
                  className="h-9 w-auto object-contain filter contrast-125"
                />
              </div>
              <div className={`text-xs font-mono font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-neutral-200'}`}>
                Harshil Mistry
              </div>
              <div className={`text-[11px] font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                Owner
              </div>
            </div>
          </div>

          {/* Right Column: Vertical Divider & Large Brand Logo */}
          <div className="lg:col-span-3 flex items-center justify-center lg:justify-end lg:border-l lg:border-neutral-200 lg:pl-10">
            <div className="flex flex-col items-center justify-center p-4">
              <img
                src="https://het.assistwebstudio.in/wp-content/uploads/2026/11/Manisha-graphix-scaled.png"
                alt="Manisha Graphix Brand Emblem"
                className="w-44 sm:w-52 h-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
