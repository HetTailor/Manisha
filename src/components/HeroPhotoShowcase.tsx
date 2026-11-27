import React, { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';

interface HeroPhotoShowcaseProps {
  onSelectItemForQuote?: (serviceId: string) => void;
}

export const HeroPhotoShowcase: React.FC<HeroPhotoShowcaseProps> = ({ onSelectItemForQuote }) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const primaryImage = '/assets/ref/hero-composition.png';
  const fullBannerImage = '/assets/manisha_logo_updated.png';

  return (
    <div className="relative group w-full">
      
      {/* Outer Card Subtle Golden & Red Glow Rim */}
      <div className="absolute -inset-1 bg-gradient-to-tr from-[#C99A50]/25 via-transparent to-[#FF0000]/20 rounded-2xl blur-md -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Outer Card Container with exact matching aspect ratio (589x302 = ~1.95:1) */}
      <div className="relative rounded-2xl overflow-hidden border border-neutral-800/90 group-hover:border-[#C99A50]/60 bg-[#09080d] shadow-2xl shadow-black/90 transition-all duration-300">
        
        {/* Main Photo Showcase Container with exact 589/302 aspect ratio */}
        <div className="relative aspect-[589/302] w-full bg-neutral-950 overflow-hidden">
          <img
            src={primaryImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src = fullBannerImage;
            }}
            alt="Manisha Graphix Studio Production Showcase — Your Vision, Our Print"
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
          />

          {/* Quick Zoom / Inspect Button */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <button
              onClick={() => setIsZoomOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/60 hover:bg-[#FF0000] text-white text-[11px] sm:text-xs font-sans font-medium backdrop-blur-md border border-white/20 transition-all shadow-lg hover:border-transparent cursor-pointer"
              title="Expand High-Resolution Inspection Lightbox"
            >
              <ZoomIn className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Inspect</span>
            </button>
          </div>

        </div>

      </div>

      {/* Lightbox Zoom Inspection Modal */}
      {isZoomOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="hero-showcase-title"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsZoomOpen(false)}
        >
          <div 
            className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF0000]" />
                <span id="hero-showcase-title" className="text-xs sm:text-sm font-sans font-bold text-white uppercase tracking-wider">
                  Manisha Graphix — Production Showcase
                </span>
              </div>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close zoom modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[589/302] w-full bg-black">
              <img
                src={primaryImage}
                alt="Full resolution print inspection"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-5 bg-neutral-950 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800/80">
              <div className="text-left text-xs font-sans text-neutral-400">
                <span className="text-white font-bold block mb-0.5">High-Fidelity Studio Production</span>
                <span>Custom Wedding Invites · Thermal Velvet Visiting Cards · Pantone Matching · Offset Printing</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/assets/manisha_logo_updated.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-sans font-medium text-neutral-300 hover:text-white border border-neutral-700 rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  View Master Banner
                </a>
                <button
                  onClick={() => {
                    setIsZoomOpen(false);
                    if (onSelectItemForQuote) {
                      onSelectItemForQuote('wedding-cards');
                    }
                  }}
                  className="px-5 py-2 text-xs font-sans font-bold rounded-lg bg-[#FF0000] hover:bg-[#D60000] text-white transition-colors cursor-pointer"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
