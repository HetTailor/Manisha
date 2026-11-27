import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  onOpenQuoteModal: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className="py-12 bg-[#0c0c12] text-white border-b border-neutral-800 relative overflow-hidden">
      {/* Subtle background ambient red glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF0000]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Script Calligraphy "Better Designs Brighter Brands" */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <span className="font-cursive text-3xl sm:text-4xl text-white font-bold leading-tight tracking-wide block -rotate-3 hover:rotate-0 transition-transform">
              Better Designs<br />
              <span className="text-white/90">Brighter Brands</span>
            </span>
          </div>

          {/* Center Column: Heading, Subtitle & Buttons */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-3.5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-black tracking-tight text-white uppercase">
              READY TO START YOUR PROJECT?
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              Get high-quality printing, creative designs and professional service — all under one roof.
            </p>

            {/* Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-mono font-bold rounded-full bg-[#FF0000] hover:bg-[#D60000] text-white shadow-xl shadow-red-600/30 transition-all hover:scale-103 active:scale-98"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-mono font-bold rounded-full bg-transparent hover:bg-white/10 text-white border border-neutral-700 transition-all"
              >
                <span>Contact Us</span>
              </a>
            </div>
          </div>

          {/* Right Column: Desk Photo with Swatches matching reference image */}
          <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl max-w-[320px] w-full group">
              <img
                src="/assets/ref/cta-print-desk.png"
                alt="Manisha Graphix Color Swatches & Proofs"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
