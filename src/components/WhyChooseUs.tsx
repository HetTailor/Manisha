import React, { useState } from 'react';
import { CheckCircle, Eye, Sparkles, Layers, Sliders, ShieldCheck } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/content';
import { SectionImageSlot } from './SectionImageSlot';

interface WhyChooseUsProps {
  onOpenPhotoGuide: () => void;
  customWhyImage?: string;
  onUploadWhyImage?: (dataUrl: string) => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  onOpenPhotoGuide,
  customWhyImage,
  onUploadWhyImage,
}) => {
  const [activeFinish, setActiveFinish] = useState<'foil' | 'spotuv' | 'emboss' | 'velvet' | 'diecut'>('foil');

  const finishes = {
    foil: {
      name: 'Metallic Hot Foil Stamping',
      tone: 'Gold, Antique Brass, Copper, Silver',
      desc: 'Heat-transferred metallic foil creates a radiant, reflective impression that catches light at every angle. Ideal for royal wedding suites and executive logos.',
      accent: 'border-amber-400/80 bg-amber-500/10 text-amber-900',
    },
    spotuv: {
      name: 'High-Gloss Spot UV Coating',
      tone: 'Clear Polymeric Gloss on Matte Surface',
      desc: 'Selective high-gloss polymer applied to specific text, logos, or patterns. Creates a tactile dimensional contrast against matte or soft-touch backgrounds.',
      accent: 'border-sky-400/80 bg-sky-500/10 text-sky-950',
    },
    emboss: {
      name: 'Multi-Level Blind Embossing',
      tone: 'Dimensional Bas-Relief (No Ink)',
      desc: 'Custom-milled brass dies press the paper fiber upward without ink to sculpt an understated, aristocratic texture that begs to be felt by hand.',
      accent: 'border-stone-400/80 bg-stone-500/10 text-stone-900',
    },
    velvet: {
      name: 'Soft-Touch Velvet Lamination',
      tone: 'Silky Matte Anti-Scuff Barrier',
      desc: 'A premium micro-textured thermal film that gives heavy cardstock the plush feel of velvet peach skin while guarding against fingerprints and scuffs.',
      accent: 'border-purple-400/80 bg-purple-500/10 text-purple-950',
    },
    diecut: {
      name: 'Custom Contour Die-Cutting',
      tone: 'Intricate Geometric & Rounded Cuts',
      desc: 'High-precision steel rule dies engineered to produce unique silhouettes, peek-through windows, tabbed dividers, and folding lock mechanisms.',
      accent: 'border-emerald-400/80 bg-emerald-500/10 text-emerald-950',
    },
  };

  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-white border-b border-neutral-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold mb-2">
            <span>Our Commitment</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Craft</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight text-balance">
            Quality That You Can See
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            In commercial printing, the difference between ordinary and extraordinary lies in microscopic registration, ink density control, and tactile finishing.
          </p>
        </div>

        {/* 6 Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={item.id}
              className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate-400 font-semibold">
                    0{index + 1}
                  </span>
                  <span className="text-[11px] font-mono text-amber-800">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Standard on every Mistry Graphix run</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Showcase & Finishing Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
          
          {/* Left: Image Slot with Macro Print Detail */}
          <div className="lg:col-span-6">
            <SectionImageSlot
              id="why-choose-us-macro"
              title="Close-Up Printing & Finishing Detail"
              suggestedText="Close-up photograph of high-quality printed materials and finishing/printing details."
              searchKeyword="printing machine close up"
              aspectRatioClass="aspect-4/3"
              themeType="finishing"
              onOpenGuide={onOpenPhotoGuide}
              userCustomImage={customWhyImage}
              onUploadImage={onUploadWhyImage}
            />
          </div>

          {/* Right: Interactive Finishing Inspector */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold">
                Finishing Inspector
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mt-1">
                Explore Tactile Print Finishes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Select a specialty technique below to inspect how we elevate ordinary paper into luxury heirlooms and distinctive brand collateral:
              </p>
            </div>

            {/* Finishing Selector Tabs (Functional buttons as permitted for interactive filter) */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-white rounded-lg border border-slate-200">
              <button
                onClick={() => setActiveFinish('foil')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeFinish === 'foil'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hot Foil
              </button>
              <button
                onClick={() => setActiveFinish('spotuv')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeFinish === 'spotuv'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Spot UV Gloss
              </button>
              <button
                onClick={() => setActiveFinish('emboss')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeFinish === 'emboss'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Blind Emboss
              </button>
              <button
                onClick={() => setActiveFinish('velvet')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeFinish === 'velvet'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Velvet Soft-Touch
              </button>
              <button
                onClick={() => setActiveFinish('diecut')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeFinish === 'diecut'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Die-Cutting
              </button>
            </div>

            {/* Active Finish Details Box */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">
                  {finishes[activeFinish].name}
                </h4>
                <span className="text-[11px] font-mono text-slate-500">
                  {finishes[activeFinish].tone}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {finishes[activeFinish].desc}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
