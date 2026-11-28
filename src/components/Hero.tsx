import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, FileText, Heart, Plus, BookOpen } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import heroFullBg from '../assets/images/hero_full_background_1795019097178.jpg';
import heroFullBgWebp from '../assets/images/hero_full_background_1795019097178.webp';

// Refined Cinematic Easing Curve (Smooth editorial deceleration, zero bounce)
const EASE_EDITORIAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Permanent Original Hero Copy (Editable HTML Text)
const HERO_KICKER = 'GRAPHIC DESIGN & PRINTING STUDIO';
const HERO_TITLE_PRIMARY = 'MANISHA';
const HERO_TITLE_ACCENT = 'GRAPHIX';
const HERO_TAGLINE = 'WE DESIGN. WE PRINT. WE CREATE.';
const HERO_DESCRIPTION =
  'Creative graphic design and professional printing solutions crafted with precision, quality and attention to detail.';

interface HeroProps {
  onOpenQuoteModal: () => void;
  onSelectServiceForQuote?: (serviceId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuoteModal,
  onSelectServiceForQuote,
}) => {
  const { navigate } = useNavigation();
  const [bgError, setBgError] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleSelectItemForQuote = (serviceId: string) => {
    if (onSelectServiceForQuote) {
      onSelectServiceForQuote(serviceId);
    } else {
      onOpenQuoteModal();
    }
  };

  const categories = [
    { id: 'stationery-printing', label: 'Stationery', icon: FileText },
    { id: 'wedding-cards', label: 'Wedding Cards', icon: Heart },
    { id: 'pharmaceutical-printing', label: 'Pharmaceutical', icon: Plus },
    { id: 'book-work', label: 'Book Work', icon: BookOpen },
  ];

  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 bg-[#000000] text-white overflow-hidden border-b border-neutral-900 min-h-[540px] lg:min-h-[620px] flex items-center">
      {/* Static Full-Bleed Studio Background Image (No movement, zoom, scaling, or panning) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {!bgError ? (
          <picture className="block w-full h-full">
            <source srcSet={heroFullBgWebp} type="image/webp" />
            <img
              src={heroFullBg}
              width={1376}
              height={768}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={() => setBgError(true)}
              referrerPolicy="no-referrer"
              alt="Manisha Graphix commercial printing and design showcase background"
              className="w-full h-full object-cover object-[78%_center] sm:object-[70%_center] lg:object-center"
            />
          </picture>
        ) : (
          <div aria-hidden="true" className="w-full h-full bg-[#000000]" />
        )}

        {/* Measured Contrast Scrims for WCAG AA Legibility over Photography */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/45 lg:from-black/92 lg:via-black/50 lg:to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Hero Content Anchored on Clean Left Backdrop */}
        <div className="max-w-xl lg:max-w-[590px] space-y-5 sm:space-y-6 text-left">

          {/* Eyebrow Heading: GRAPHIC DESIGN & PRINTING STUDIO */}
          <motion.div
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReduced ? 0.01 : 0.65,
              delay: prefersReduced ? 0 : 0.05,
              ease: EASE_EDITORIAL,
            }}
            className="flex items-center gap-3"
          >
            <span className="w-8 h-[3px] bg-[#C99A50] rounded-full inline-block shrink-0" />
            <span className="text-[11px] sm:text-xs md:text-[13px] font-sans font-bold tracking-[0.18em] text-white uppercase leading-snug whitespace-normal break-normal [writing-mode:horizontal-tb] [overflow-wrap:normal] select-text selection:bg-[#FF0000] selection:text-white">
              {HERO_KICKER}
            </span>
          </motion.div>

          {/* 1 & 2. Main Brand Title: MANISHA (Line 1) -> GRAPHIX (Line 2) Sequential Upward Masked Reveal */}
          <h1 className="m-0 font-sans font-black tracking-tight uppercase leading-[0.9] text-[44px] min-[390px]:text-5xl sm:text-6xl md:text-7xl lg:text-[72px] xl:text-[82px] antialiased select-text whitespace-normal break-normal [writing-mode:horizontal-tb] [overflow-wrap:normal]">
            {/* Line 1: MANISHA */}
            <span className="block overflow-hidden py-[0.04em] -my-[0.04em]">
              <motion.span
                initial={
                  prefersReduced
                    ? { opacity: 1, y: '0%' }
                    : { opacity: 0, y: '105%' }
                }
                animate={{ opacity: 1, y: '0%' }}
                transition={{
                  duration: prefersReduced ? 0.01 : 0.85,
                  delay: prefersReduced ? 0 : 0.16,
                  ease: EASE_EDITORIAL,
                }}
                className="block whitespace-nowrap will-change-transform text-white selection:bg-[#FF0000] selection:text-white"
              >
                {HERO_TITLE_PRIMARY}
              </motion.span>
            </span>

            {/* Line 2: GRAPHIX (Sequential after MANISHA) */}
            <span className="block overflow-hidden py-[0.04em] -my-[0.04em]">
              <motion.span
                initial={
                  prefersReduced
                    ? { opacity: 1, y: '0%' }
                    : { opacity: 0, y: '105%' }
                }
                animate={{ opacity: 1, y: '0%' }}
                transition={{
                  duration: prefersReduced ? 0.01 : 0.85,
                  delay: prefersReduced ? 0 : 0.42,
                  ease: EASE_EDITORIAL,
                }}
                className="block whitespace-nowrap will-change-transform text-[#FF0000] selection:bg-white selection:text-[#FF0000]"
              >
                {HERO_TITLE_ACCENT}
              </motion.span>
            </span>
          </h1>

          {/* 3. Tagline: WE DESIGN. WE PRINT. WE CREATE. — Subtle Fade-Up */}
          <div className="pt-0.5 sm:pt-1">
            <motion.p
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReduced ? 0.01 : 0.7,
                delay: prefersReduced ? 0 : 0.72,
                ease: EASE_EDITORIAL,
              }}
              className="text-base sm:text-lg md:text-xl font-sans font-bold text-white tracking-wide uppercase whitespace-normal break-normal [writing-mode:horizontal-tb] [overflow-wrap:normal] select-text"
            >
              {HERO_TAGLINE}
            </motion.p>
          </div>

          {/* 4. Description — Slight Delay & Smooth Fade-Up */}
          <motion.p
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReduced ? 0.01 : 0.7,
              delay: prefersReduced ? 0 : 0.9,
              ease: EASE_EDITORIAL,
            }}
            className="text-xs sm:text-sm md:text-[15px] text-neutral-200 leading-relaxed font-sans max-w-lg font-normal whitespace-normal break-normal [writing-mode:horizontal-tb] [overflow-wrap:normal] select-text"
          >
            {HERO_DESCRIPTION}
          </motion.p>

          {/* 5a. Four Category Items — Sequential Subtle Fade-Up */}
          <div className="py-1">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 sm:gap-x-3 text-xs sm:text-[13px] font-sans font-medium text-white">
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                const itemDelay = prefersReduced ? 0 : 1.06 + idx * 0.08;
                return (
                  <React.Fragment key={cat.id}>
                    {idx > 0 && (
                      <motion.span
                        aria-hidden="true"
                        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: prefersReduced ? 0.01 : 0.45,
                          delay: itemDelay,
                          ease: EASE_EDITORIAL,
                        }}
                        className="hidden sm:inline-block w-[1px] h-3.5 bg-[#C99A50]/65 select-none"
                      />
                    )}
                    <motion.span
                      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: prefersReduced ? 0.01 : 0.55,
                        delay: itemDelay,
                        ease: EASE_EDITORIAL,
                      }}
                      className="inline-flex shrink-0"
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectItemForQuote(cat.id)}
                        className="inline-flex shrink-0 items-center gap-1.5 sm:gap-2 hover:text-[#C99A50] transition-colors duration-300 cursor-pointer group whitespace-nowrap"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#C99A50] text-white flex items-center justify-center shrink-0">
                          <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.2]" />
                        </span>
                        <span className="whitespace-nowrap link-underline-glide">{cat.label}</span>
                      </button>
                    </motion.span>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* 5b. CTA Buttons: Get a Quote & View Our Work — Sequential Subtle Fade-Up */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2 sm:pt-3">
            <motion.div
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReduced ? 0.01 : 0.55,
                delay: prefersReduced ? 0 : 1.38,
                ease: EASE_EDITORIAL,
              }}
              className="inline-flex shrink-0"
            >
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="group inline-flex items-center gap-2 px-7 py-3 text-xs sm:text-sm font-sans font-bold rounded-full bg-[#FF0000] hover:bg-[#D60000] text-white transition-colors duration-300 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </button>
            </motion.div>

            <motion.div
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReduced ? 0.01 : 0.55,
                delay: prefersReduced ? 0 : 1.48,
                ease: EASE_EDITORIAL,
              }}
              className="inline-flex shrink-0"
            >
              <button
                type="button"
                onClick={() => navigate('portfolio')}
                className="inline-flex items-center gap-2 px-7 py-3 text-xs sm:text-sm font-sans font-medium rounded-full bg-black/40 hover:bg-white/10 text-white border border-white/25 hover:border-[#C99A50]/70 transition-colors duration-300 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>View Our Work</span>
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
