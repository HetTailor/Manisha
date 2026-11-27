import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Calendar, Folder, Award, Smile, Clock } from 'lucide-react';
import { Hero } from '../components/Hero';
import {
  Reveal,
  MaskedTextReveal,
  HairlineRule,
  StaggerContainer,
  StaggerItem,
  CountUpNumber,
  EASE_STUDIO,
  VIEWPORT_ONCE,
} from '../components/MotionPrimitives';
import { useNavigation } from '../context/NavigationContext';

interface HomePageProps {
  onOpenQuoteModal: () => void;
  onSelectServiceForQuote: (serviceId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenQuoteModal,
  onSelectServiceForQuote,
}) => {
  const { navigate } = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileError, setMobileError] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = mobileNumber.replace(/[\s\-\(\)]/g, '');
    const normalized = cleaned.replace(/^(\+91|91|0)/, '');
    
    if (!/^[6-9]\d{9}$/.test(normalized)) {
      setMobileError('Please enter a valid 10-digit Indian mobile number (e.g. 98765 43210).');
      return;
    }
    
    // Clear validation error; ready for future backend integration
    setMobileError('');
  };

  // 5 Process Steps
  const processSteps = [
    {
      number: '01',
      title: 'DISCUSS',
      desc: "Understand your project requirements, quantities, and paper preferences.",
    },
    {
      number: '02',
      title: 'DESIGN',
      desc: 'Prepare artwork with precise prepress bleeds, margins, and color profiles.',
    },
    {
      number: '03',
      title: 'REVIEW',
      desc: 'You review and approve the calibrated digital or physical sample proof.',
    },
    {
      number: '04',
      title: 'PRINT',
      desc: 'Approved artwork enters offset or digital production with strict quality checks.',
    },
    {
      number: '05',
      title: 'DELIVER',
      desc: 'Finished prints are neatly trimmed, carefully packed, and safely dispatched.',
    },
  ];

  return (
    <div className="space-y-0 selection:bg-[#FF0000] selection:text-white">
      
      {/* ------------------------------------------------------------------ */}
      {/* SECTION 2: HERO SECTION                                            */}
      {/* ------------------------------------------------------------------ */}
      <Hero
        onOpenQuoteModal={onOpenQuoteModal}
        onSelectServiceForQuote={onSelectServiceForQuote}
      />

      {/* ------------------------------------------------------------------ */}
      {/* ------------------------------------------------------------------ */}
      {/* SECTION 3: OUR PRINTING SERVICES (CLEAN TEXT-ONLY CARDS)           */}
      {/* ------------------------------------------------------------------ */}
      <section id="printing-services" className="py-14 sm:py-18 lg:py-20 bg-white dark:bg-[#0c0c12] text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800/80 relative overflow-hidden transition-colors duration-300">
        {/* Subtle decorative lines using brand colors red (#FF0000) and golden (#C99A50) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="mb-10 sm:mb-12 lg:mb-14 text-left">
            <Reveal distance={14} duration={0.58} className="inline-flex items-center gap-2 mb-2.5">
              <span className="w-6 h-1 bg-[#FF0000] rounded-full inline-block" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#FF0000] uppercase">
                OUR CREATIVE SERVICES
              </span>
            </Reveal>

            <MaskedTextReveal delay={0.08}>
              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase text-neutral-900 dark:text-white">
                CREATIVE DESIGN <span className="text-[#FF0000]">SOLUTIONS</span>
              </h2>
            </MaskedTextReveal>

            <HairlineRule
              delay={0.18}
              className="w-20 h-0.5 bg-gradient-to-r from-[#FF0000] to-[#C99A50] mt-3 mb-4 rounded-full"
            />

            <Reveal delay={0.16} distance={16}>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl font-sans leading-relaxed">
                From stationery and wedding invitations to pharmaceutical design and book layouts, we deliver creative solutions tailored to every project with quality, precision, and attention to detail.
              </p>
            </Reveal>
          </div>

          {/* 4 Service Text Cards in a Single Horizontal Row on Desktop (lg:grid-cols-4) */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6 items-stretch" staggerDelay={0.09}>
            
            {/* Card 01: Stationery Design & Printing */}
            <StaggerItem className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: EASE_STUDIO }}
                className="relative h-full group"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-[2px] rounded-[18px] bg-gradient-to-br from-[#DFB670]/50 via-[#C99A50]/35 to-[#B5853C]/50 dark:from-[#E5BE76]/45 dark:via-[#C99A50]/30 dark:to-[#9F7230]/45 blur-[8px] opacity-60 group-hover:opacity-100 group-hover:blur-[11px] transition-[opacity,filter] duration-300"
                />
                <div className="relative z-10 p-5 sm:p-6 lg:px-4.5 lg:py-6 xl:px-6 xl:py-7 rounded-2xl bg-[#FCFCFC] dark:bg-[#14141e] border border-[#C99A50]/50 dark:border-[#C99A50]/45 group-hover:border-[#C99A50]/90 dark:group-hover:border-[#DFB670]/85 group-hover:bg-white dark:group-hover:bg-[#191926] shadow-[0_0_16px_-3px_rgba(201,154,80,0.24)] dark:shadow-[0_0_20px_-3px_rgba(201,154,80,0.26)] group-hover:shadow-[0_0_26px_0px_rgba(201,154,80,0.4),0_12px_28px_-10px_rgba(201,154,80,0.24)] dark:group-hover:shadow-[0_0_30px_0px_rgba(201,154,80,0.44),0_14px_30px_-10px_rgba(0,0,0,0.5)] transition-[border-color,background-color,box-shadow] duration-300 flex flex-col justify-between h-full">
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200/80 dark:border-neutral-800">
                      <span className="text-sm font-mono font-bold text-[#FF0000] tracking-wider">
                        01.
                      </span>
                      <span className="w-6 h-0.5 bg-neutral-300 dark:bg-neutral-700 group-hover:w-10 group-hover:bg-[#FF0000] transition-all duration-300 ease-out rounded-full" />
                    </div>

                    <h3 className="text-lg font-display font-black text-neutral-900 dark:text-white uppercase tracking-tight mb-3 group-hover:text-[#FF0000] transition-colors duration-250 min-h-[3.25rem] flex items-start">
                      Stationery Design & Printing
                    </h3>

                    <p className="text-xs sm:text-sm lg:text-[12px] xl:text-[13px] text-neutral-600 dark:text-neutral-300 font-sans leading-[1.65] min-h-[5.25rem] flex-1">
                      Creative stationery design and quality printing for business cards, letterheads, envelopes, and business essentials.
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold text-[#C99A50] uppercase tracking-wider">
                      Design & Print
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] transition-transform duration-300 ease-out group-hover:scale-125" />
                  </div>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Card 02: Wedding Card Design */}
            <StaggerItem className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: EASE_STUDIO }}
                className="relative h-full group"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-[2px] rounded-[18px] bg-gradient-to-br from-[#DFB670]/50 via-[#C99A50]/35 to-[#B5853C]/50 dark:from-[#E5BE76]/45 dark:via-[#C99A50]/30 dark:to-[#9F7230]/45 blur-[8px] opacity-60 group-hover:opacity-100 group-hover:blur-[11px] transition-[opacity,filter] duration-300"
                />
                <div className="relative z-10 p-5 sm:p-6 lg:px-4.5 lg:py-6 xl:px-6 xl:py-7 rounded-2xl bg-[#FCFCFC] dark:bg-[#14141e] border border-[#C99A50]/50 dark:border-[#C99A50]/45 group-hover:border-[#C99A50]/90 dark:group-hover:border-[#DFB670]/85 group-hover:bg-white dark:group-hover:bg-[#191926] shadow-[0_0_16px_-3px_rgba(201,154,80,0.24)] dark:shadow-[0_0_20px_-3px_rgba(201,154,80,0.26)] group-hover:shadow-[0_0_26px_0px_rgba(201,154,80,0.4),0_12px_28px_-10px_rgba(201,154,80,0.24)] dark:group-hover:shadow-[0_0_30px_0px_rgba(201,154,80,0.44),0_14px_30px_-10px_rgba(0,0,0,0.5)] transition-[border-color,background-color,box-shadow] duration-300 flex flex-col justify-between h-full">
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200/80 dark:border-neutral-800">
                      <span className="text-sm font-mono font-bold text-[#FF0000] tracking-wider">
                        02.
                      </span>
                      <span className="w-6 h-0.5 bg-neutral-300 dark:bg-neutral-700 group-hover:w-10 group-hover:bg-[#FF0000] transition-all duration-300 ease-out rounded-full" />
                    </div>

                    <h3 className="text-lg font-display font-black text-neutral-900 dark:text-white uppercase tracking-tight mb-3 group-hover:text-[#FF0000] transition-colors duration-250 min-h-[3.25rem] flex items-start">
                      Wedding Card Design
                    </h3>

                    <p className="text-xs sm:text-sm lg:text-[12px] xl:text-[13px] text-neutral-600 dark:text-neutral-300 font-sans leading-[1.65] min-h-[5.25rem] flex-1">
                      Elegant wedding card designs, printed invitations, and personalized digital wedding cards for your special occasions.
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold text-[#C99A50] uppercase tracking-wider">
                      Print & Digital
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] transition-transform duration-300 ease-out group-hover:scale-125" />
                  </div>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Card 03: Pharmaceutical Design */}
            <StaggerItem className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: EASE_STUDIO }}
                className="relative h-full group"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-[2px] rounded-[18px] bg-gradient-to-br from-[#DFB670]/50 via-[#C99A50]/35 to-[#B5853C]/50 dark:from-[#E5BE76]/45 dark:via-[#C99A50]/30 dark:to-[#9F7230]/45 blur-[8px] opacity-60 group-hover:opacity-100 group-hover:blur-[11px] transition-[opacity,filter] duration-300"
                />
                <div className="relative z-10 p-5 sm:p-6 lg:px-4.5 lg:py-6 xl:px-6 xl:py-7 rounded-2xl bg-[#FCFCFC] dark:bg-[#14141e] border border-[#C99A50]/50 dark:border-[#C99A50]/45 group-hover:border-[#C99A50]/90 dark:group-hover:border-[#DFB670]/85 group-hover:bg-white dark:group-hover:bg-[#191926] shadow-[0_0_16px_-3px_rgba(201,154,80,0.24)] dark:shadow-[0_0_20px_-3px_rgba(201,154,80,0.26)] group-hover:shadow-[0_0_26px_0px_rgba(201,154,80,0.4),0_12px_28px_-10px_rgba(201,154,80,0.24)] dark:group-hover:shadow-[0_0_30px_0px_rgba(201,154,80,0.44),0_14px_30px_-10px_rgba(0,0,0,0.5)] transition-[border-color,background-color,box-shadow] duration-300 flex flex-col justify-between h-full">
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200/80 dark:border-neutral-800">
                      <span className="text-sm font-mono font-bold text-[#FF0000] tracking-wider">
                        03.
                      </span>
                      <span className="w-6 h-0.5 bg-neutral-300 dark:bg-neutral-700 group-hover:w-10 group-hover:bg-[#FF0000] transition-all duration-300 ease-out rounded-full" />
                    </div>

                    <h3 className="text-lg font-display font-black text-neutral-900 dark:text-white uppercase tracking-tight mb-3 group-hover:text-[#FF0000] transition-colors duration-250 min-h-[3.25rem] flex items-start">
                      Pharmaceutical Design
                    </h3>

                    <p className="text-xs sm:text-sm lg:text-[12px] xl:text-[13px] text-neutral-600 dark:text-neutral-300 font-sans leading-[1.65] min-h-[5.25rem] flex-1">
                      Professional designs for pharmaceutical packaging, medicine labels, and other pharma materials with clear visual presentation.
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold text-[#C99A50] uppercase tracking-wider">
                      Design Only
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] transition-transform duration-300 ease-out group-hover:scale-125" />
                  </div>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Card 04: Book Design & Layout */}
            <StaggerItem className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: EASE_STUDIO }}
                className="relative h-full group"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-[2px] rounded-[18px] bg-gradient-to-br from-[#DFB670]/50 via-[#C99A50]/35 to-[#B5853C]/50 dark:from-[#E5BE76]/45 dark:via-[#C99A50]/30 dark:to-[#9F7230]/45 blur-[8px] opacity-60 group-hover:opacity-100 group-hover:blur-[11px] transition-[opacity,filter] duration-300"
                />
                <div className="relative z-10 p-5 sm:p-6 lg:px-4.5 lg:py-6 xl:px-6 xl:py-7 rounded-2xl bg-[#FCFCFC] dark:bg-[#14141e] border border-[#C99A50]/50 dark:border-[#C99A50]/45 group-hover:border-[#C99A50]/90 dark:group-hover:border-[#DFB670]/85 group-hover:bg-white dark:group-hover:bg-[#191926] shadow-[0_0_16px_-3px_rgba(201,154,80,0.24)] dark:shadow-[0_0_20px_-3px_rgba(201,154,80,0.26)] group-hover:shadow-[0_0_26px_0px_rgba(201,154,80,0.4),0_12px_28px_-10px_rgba(201,154,80,0.24)] dark:group-hover:shadow-[0_0_30px_0px_rgba(201,154,80,0.44),0_14px_30px_-10px_rgba(0,0,0,0.5)] transition-[border-color,background-color,box-shadow] duration-300 flex flex-col justify-between h-full">
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200/80 dark:border-neutral-800">
                      <span className="text-sm font-mono font-bold text-[#FF0000] tracking-wider">
                        04.
                      </span>
                      <span className="w-6 h-0.5 bg-neutral-300 dark:bg-neutral-700 group-hover:w-10 group-hover:bg-[#FF0000] transition-all duration-300 ease-out rounded-full" />
                    </div>

                    <h3 className="text-lg font-display font-black text-neutral-900 dark:text-white uppercase tracking-tight mb-3 group-hover:text-[#FF0000] transition-colors duration-250 min-h-[3.25rem] flex items-start">
                      Book Design & Layout
                    </h3>

                    <p className="text-xs sm:text-sm lg:text-[12px] xl:text-[13px] text-neutral-600 dark:text-neutral-300 font-sans leading-[1.65] min-h-[5.25rem] flex-1">
                      Creative book covers, professional page layouts, and organized typesetting for attractive and readable publications.
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold text-[#C99A50] uppercase tracking-wider">
                      Layout & Typesetting
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] transition-transform duration-300 ease-out group-hover:scale-125" />
                  </div>
                </div>
              </motion.div>
            </StaggerItem>

          </StaggerContainer>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION: ACHIEVEMENTS & RESULTS (PROPER TYPOGRAPHY & VECTOR ART)   */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="achievements"
        className="relative py-14 sm:py-18 lg:py-20 bg-[#FFFFFF] dark:bg-[#09090e] text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800/80 scroll-mt-20 overflow-hidden transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Card Canvas */}
          <Reveal className="relative w-full rounded-2xl sm:rounded-3xl lg:rounded-[36px] overflow-hidden bg-gradient-to-br from-white via-[#FCFAF8] to-[#FFF6F6] dark:from-[#12121b] dark:via-[#14121b] dark:to-[#1a1016] border border-neutral-100/90 dark:border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.06),0_2px_8px_rgba(255,0,0,0.02)] dark:shadow-[0_20px_56px_rgba(0,0,0,0.45)] p-5 sm:p-7 lg:p-8 xl:p-10 2xl:p-12">
            
            {/* Top-Edge Luxury Accent Bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.8, ease: EASE_STUDIO }}
              className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF0000] via-[#C99A50] to-[#FF0000] opacity-80 origin-left"
            />

            {/* Top-Right Golden Dotted Grid (matching reference) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-7 lg:top-7 lg:right-9 pointer-events-none select-none opacity-40 sm:opacity-50">
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1.5 sm:gap-2">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span key={`dot-tr-${i}`} className="w-1.5 h-1.5 rounded-full bg-[#C99A50]" />
                ))}
              </div>
            </div>

            {/* Bottom-Left Golden Dotted Grid (matching reference) */}
            <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-7 lg:bottom-7 lg:left-9 pointer-events-none select-none opacity-30 sm:opacity-50">
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 sm:gap-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span key={`dot-bl-${i}`} className="w-1.5 h-1.5 rounded-full bg-[#C99A50]" />
                ))}
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 xl:gap-10 2xl:gap-12">
              
              {/* LEFT COLUMN: Headline, Story & CTA Button */}
              <div className="w-full lg:w-[320px] xl:w-[360px] 2xl:w-[400px] shrink-0 flex flex-col items-start text-left">
                {/* Eyebrow Kicker matching reference screenshot */}
                <Reveal distance={14} duration={0.58} className="flex items-center gap-2 mb-2 sm:mb-2.5">
                  <span className="w-6 h-[2.5px] bg-[#FF0000] rounded-full inline-block" />
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-neutral-800 dark:text-neutral-200 uppercase font-sans">
                    Our Achievements in Numbers
                  </span>
                </Reveal>

                {/* Main Headline (Exactly 2 lines on desktop/laptop, bold black & red results) */}
                <MaskedTextReveal delay={0.08}>
                  <h2 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-[36px] 2xl:text-[40px] font-black text-neutral-900 dark:text-white leading-[1.12] tracking-tight uppercase">
                    CREATIVITY THAT<br className="hidden lg:block" />
                    {' '}DELIVERS <span className="text-[#FF0000]">RESULTS</span>
                  </h2>
                </MaskedTextReveal>

                {/* Supporting Paragraph */}
                <Reveal delay={0.16} distance={16}>
                  <p className="mt-3 sm:mt-3.5 text-xs sm:text-sm lg:text-[13px] xl:text-[14px] text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal max-w-sm xl:max-w-md">
                    With 25+ years of experience, 2,500+ projects completed, and a commitment to quality, MANISHA GRAPHIX turns creative ideas into impactful designs and printing solutions.
                  </p>
                </Reveal>

                {/* Explore Our Work CTA Button with layered golden shadow accent */}
                <Reveal delay={0.24} distance={14} className="relative inline-block mt-4 sm:mt-5 lg:mt-6">
                  {/* Soft red glow backing */}
                  <div className="absolute inset-0 rounded-full bg-[#FF0000] blur-md opacity-30" />
                  <motion.button
                    type="button"
                    whileHover={{ y: -1.5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.24, ease: EASE_STUDIO }}
                    onClick={() => navigate('portfolio')}
                    className="relative z-10 group inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#8E000A] via-[#C0000D] to-[#FF0000] text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_8px_20px_rgba(200,0,0,0.32)] hover:shadow-[0_12px_26px_rgba(255,0,0,0.44)] transition-shadow duration-300 cursor-pointer border border-white/20"
                  >
                    <span>Explore Our Work</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 ease-out group-hover:translate-x-1" />
                  </motion.button>
                </Reveal>
              </div>

              {/* RIGHT COLUMN: 4 Floating Stat Cards */}
              <div className="w-full lg:flex-1 min-w-0 relative mt-4 lg:mt-0">
                
                {/* ============================================================ */}
                {/* LAPTOP & DESKTOP LAYOUT (hidden lg:block)                     */}
                {/* 4 Tilted Floating Cards Connected by Wavy Line with Nodes    */}
                {/* ============================================================ */}
                <div className="hidden lg:block relative pt-8 pb-3">
                  {/* Thin Red/Golden Connecting Wave SVG drawing smoothly on scroll */}
                  <svg
                    className="w-full h-16 xl:h-20 pointer-events-none absolute -top-4 xl:-top-5 left-0 z-20"
                    viewBox="0 0 1000 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M 0 54 C 45 54 80 38 125 38 C 170 38 205 58 250 58 C 295 58 330 38 375 38 C 420 38 455 58 500 58 C 545 58 580 38 625 38 C 670 38 705 58 750 58 C 795 58 830 38 875 38 C 920 38 960 50 1000 50"
                      stroke="#C0000D"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.9"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={VIEWPORT_ONCE}
                      transition={{ duration: 1.25, ease: EASE_STUDIO }}
                    />
                    {/* Nodes directly at the top apex of each of the 4 badges */}
                    {[125, 375, 625, 875].map((cx, idx) => (
                      <motion.circle
                        key={cx}
                        cx={cx}
                        cy="38"
                        r="4.5"
                        fill="#FF0000"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={VIEWPORT_ONCE}
                        transition={{ delay: 0.25 + idx * 0.14, duration: 0.35, ease: EASE_STUDIO }}
                      />
                    ))}
                  </svg>

                  {/* 4 Floating Cards Grid Container */}
                  <StaggerContainer className="grid grid-cols-4 gap-3 xl:gap-4 2xl:gap-5 relative z-10" staggerDelay={0.1} delayChildren={0.15}>
                    
                    {/* CARD 1: 25+ Years Experience */}
                    <StaggerItem>
                      <div className="relative group transition-all duration-300 hover:-translate-y-2 transform -rotate-[2deg] hover:rotate-0">
                        <div className="absolute -bottom-2 -left-2 right-2 h-14 bg-gradient-to-br from-[#99000C] via-[#FF0000] to-[#8E000A] rounded-2xl rounded-bl-[28px] z-0 shadow-md opacity-95" />
                        <div className="absolute -top-1.5 -right-1.5 w-7 h-10 bg-gradient-to-br from-[#F5D595] to-[#C99A50] rounded-tr-2xl opacity-90 z-0" />
                        
                        <div className="relative z-10 bg-white dark:bg-[#191926] rounded-2xl border border-neutral-100 dark:border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.07)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] pt-8 xl:pt-10 pb-4 xl:pb-5 px-2 xl:px-3 text-center">
                          <div className="absolute -top-6 xl:-top-7 left-1/2 -translate-x-1/2 w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-gradient-to-b from-white via-[#F5F2EB] to-[#DFD7C9] dark:from-neutral-800 dark:via-neutral-900 dark:to-black ring-2 ring-white dark:ring-neutral-800 shadow-[0_6px_16px_rgba(255,0,0,0.35)] p-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF4D5B] via-[#FF0000] to-[#99000D] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_2px_6px_rgba(255,0,0,0.35)] flex items-center justify-center relative overflow-hidden">
                              <span className="absolute top-0.5 left-1.5 w-4 h-1.5 rounded-full bg-white/45 blur-[0.3px] pointer-events-none" />
                              <div className="relative flex items-center justify-center text-white">
                                <Calendar className="w-4 h-4 xl:w-5 xl:h-5 stroke-[2.2]" />
                                <Clock className="w-2 h-2 xl:w-2.5 xl:h-2.5 stroke-[2.5] absolute -bottom-0.5 -right-0.5 text-white bg-[#99000D] rounded-full" />
                              </div>
                            </div>
                          </div>

                          <p className="text-xl lg:text-[24px] xl:text-[30px] 2xl:text-[34px] font-black text-[#FF0000] tracking-tight leading-none mt-1">
                            <CountUpNumber target={25} suffix="+" durationMs={1100} />
                          </p>
                          <p className="text-[11px] xl:text-[13px] 2xl:text-[14px] font-bold text-neutral-800 dark:text-neutral-100 leading-tight mt-2 min-h-[30px] xl:min-h-[34px] flex items-center justify-center">
                            Years Experience
                          </p>
                          <div className="w-6 xl:w-7 h-[2px] bg-[#C0000D] rounded-full mx-auto mt-2 opacity-90" />
                        </div>
                      </div>
                    </StaggerItem>

                    {/* CARD 2: 2500+ Projects Done */}
                    <StaggerItem>
                      <div className="relative group transition-all duration-300 hover:-translate-y-2 transform rotate-[2deg] hover:rotate-0">
                        <div className="absolute -bottom-2 inset-x-1.5 h-14 bg-gradient-to-br from-[#99000C] via-[#FF0000] to-[#B0000E] rounded-2xl rounded-b-[24px] z-0 shadow-md opacity-95" />
                        
                        <div className="relative z-10 bg-white dark:bg-[#191926] rounded-2xl border border-neutral-100 dark:border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.07)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] pt-8 xl:pt-10 pb-4 xl:pb-5 px-2 xl:px-3 text-center">
                          <div className="absolute -top-6 xl:-top-7 left-1/2 -translate-x-1/2 w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-gradient-to-b from-white via-[#F5F2EB] to-[#DFD7C9] dark:from-neutral-800 dark:via-neutral-900 dark:to-black ring-2 ring-white dark:ring-neutral-800 shadow-[0_6px_16px_rgba(255,0,0,0.35)] p-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF4D5B] via-[#FF0000] to-[#99000D] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_2px_6px_rgba(255,0,0,0.35)] flex items-center justify-center relative overflow-hidden">
                              <span className="absolute top-0.5 left-1.5 w-4 h-1.5 rounded-full bg-white/45 blur-[0.3px] pointer-events-none" />
                              <Folder className="w-4 h-4 xl:w-5 xl:h-5 text-white stroke-[2.2] relative z-10" />
                            </div>
                          </div>

                          <p className="text-xl lg:text-[24px] xl:text-[30px] 2xl:text-[34px] font-black text-[#FF0000] tracking-tight leading-none mt-1">
                            <CountUpNumber target={2500} suffix="+" durationMs={1400} />
                          </p>
                          <p className="text-[11px] xl:text-[13px] 2xl:text-[14px] font-bold text-neutral-800 dark:text-neutral-100 leading-tight mt-2 min-h-[30px] xl:min-h-[34px] flex items-center justify-center">
                            Projects Done
                          </p>
                          <div className="w-6 xl:w-7 h-[2px] bg-[#C0000D] rounded-full mx-auto mt-2 opacity-90" />
                        </div>
                      </div>
                    </StaggerItem>

                    {/* CARD 3: 2300+ Successful Projects */}
                    <StaggerItem>
                      <div className="relative group transition-all duration-300 hover:-translate-y-2 transform -rotate-[1deg] hover:rotate-0">
                        <div className="absolute -bottom-2 inset-x-1.5 h-14 bg-gradient-to-br from-[#99000C] via-[#FF0000] to-[#B0000E] rounded-2xl rounded-b-[24px] z-0 shadow-md opacity-95" />
                        
                        <div className="relative z-10 bg-white dark:bg-[#191926] rounded-2xl border border-neutral-100 dark:border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.07)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] pt-8 xl:pt-10 pb-4 xl:pb-5 px-2 xl:px-3 text-center">
                          <div className="absolute -top-6 xl:-top-7 left-1/2 -translate-x-1/2 w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-gradient-to-b from-white via-[#F5F2EB] to-[#DFD7C9] dark:from-neutral-800 dark:via-neutral-900 dark:to-black ring-2 ring-white dark:ring-neutral-800 shadow-[0_6px_16px_rgba(255,0,0,0.35)] p-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF4D5B] via-[#FF0000] to-[#99000D] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_2px_6px_rgba(255,0,0,0.35)] flex items-center justify-center relative overflow-hidden">
                              <span className="absolute top-0.5 left-1.5 w-4 h-1.5 rounded-full bg-white/45 blur-[0.3px] pointer-events-none" />
                              <Award className="w-4 h-4 xl:w-5 xl:h-5 text-white stroke-[2.2] relative z-10" />
                            </div>
                          </div>

                          <p className="text-xl lg:text-[24px] xl:text-[30px] 2xl:text-[34px] font-black text-[#FF0000] tracking-tight leading-none mt-1">
                            <CountUpNumber target={2300} suffix="+" durationMs={1400} />
                          </p>
                          <p className="text-[11px] xl:text-[13px] 2xl:text-[14px] font-bold text-neutral-800 dark:text-neutral-100 leading-tight mt-2 min-h-[30px] xl:min-h-[34px] flex items-center justify-center">
                            Successful Projects
                          </p>
                          <div className="w-6 xl:w-7 h-[2px] bg-[#C0000D] rounded-full mx-auto mt-2 opacity-90" />
                        </div>
                      </div>
                    </StaggerItem>

                    {/* CARD 4: 95% Customer Satisfaction */}
                    <StaggerItem>
                      <div className="relative group transition-all duration-300 hover:-translate-y-2 transform rotate-[2.5deg] hover:rotate-0">
                        <div className="absolute -bottom-2 -right-2 left-1.5 h-14 bg-gradient-to-br from-[#99000C] via-[#FF0000] to-[#C99A50] rounded-2xl rounded-br-[28px] z-0 shadow-md opacity-95" />
                        
                        <div className="relative z-10 bg-white dark:bg-[#191926] rounded-2xl border border-neutral-100 dark:border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.07)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] pt-8 xl:pt-10 pb-4 xl:pb-5 px-2 xl:px-3 text-center">
                          <div className="absolute -top-6 xl:-top-7 left-1/2 -translate-x-1/2 w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-gradient-to-b from-white via-[#F5F2EB] to-[#DFD7C9] dark:from-neutral-800 dark:via-neutral-900 dark:to-black ring-2 ring-white dark:ring-neutral-800 shadow-[0_6px_16px_rgba(255,0,0,0.35)] p-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF4D5B] via-[#FF0000] to-[#99000D] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_2px_6px_rgba(255,0,0,0.35)] flex items-center justify-center relative overflow-hidden">
                              <span className="absolute top-0.5 left-1.5 w-4 h-1.5 rounded-full bg-white/45 blur-[0.3px] pointer-events-none" />
                              <Smile className="w-4 h-4 xl:w-5 xl:h-5 text-white stroke-[2.2] relative z-10" />
                            </div>
                          </div>

                          <p className="text-xl lg:text-[24px] xl:text-[30px] 2xl:text-[34px] font-black text-[#FF0000] tracking-tight leading-none mt-1">
                            <CountUpNumber target={95} suffix="%" durationMs={1250} />
                          </p>
                          <p className="text-[11px] xl:text-[13px] 2xl:text-[14px] font-bold text-neutral-800 dark:text-neutral-100 leading-tight mt-2 min-h-[30px] xl:min-h-[34px] flex items-center justify-center">
                            Customer Satisfaction
                          </p>
                          <div className="w-6 xl:w-7 h-[2px] bg-[#C0000D] rounded-full mx-auto mt-2 opacity-90" />
                        </div>
                      </div>
                    </StaggerItem>

                  </StaggerContainer>
                </div>

                {/* ============================================================ */}
                {/* MOBILE / TABLET VIEW (lg:hidden)                             */}
                {/* ============================================================ */}
                <div className="lg:hidden w-full relative pt-6 pb-6 sm:pb-8">
                  <StaggerContainer className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12 max-w-sm sm:max-w-md mx-auto relative z-10" staggerDelay={0.08}>
                    
                    {/* Item 1: 25+ Years Experience */}
                    <StaggerItem className="relative group">
                      <div className="absolute -bottom-1 -left-1.5 right-1 h-9 bg-gradient-to-br from-[#B0000E] via-[#FF0000] to-[#8E000A] rounded-xl rounded-bl-2xl opacity-95 z-0" />
                      <div className="relative z-10 bg-white dark:bg-[#191926] rounded-2xl border border-neutral-100 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)] pt-7 pb-4 px-3 text-center">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#FF4D5B] via-[#FF0000] to-[#99000D] ring-3 ring-red-100 dark:ring-neutral-900 shadow-[0_4px_12px_rgba(255,0,0,0.35)] flex items-center justify-center overflow-hidden">
                          <span className="absolute top-0.5 left-1.5 w-4 h-1.5 rounded-full bg-white/45 blur-[0.3px] pointer-events-none" />
                          <Calendar className="w-4 h-4 text-white stroke-[2.2]" />
                        </div>
                        <p className="text-2xl font-black text-[#FF0000] leading-none mt-1">
                          <CountUpNumber target={25} suffix="+" durationMs={1100} />
                        </p>
                        <p className="text-xs font-bold text-neutral-800 dark:text-neutral-100 leading-tight mt-2 min-h-[28px] flex items-center justify-center">
                          Years Experience
                        </p>
                        <div className="w-6 h-[2px] bg-[#FF0000] rounded-full mx-auto mt-2" />
                      </div>
                    </StaggerItem>

                    {/* Item 2: 2500+ Projects Done */}
                    <StaggerItem className="relative group">
                      <div className="absolute -bottom-1 inset-x-1 h-9 bg-gradient-to-br from-[#C99A50] via-[#E5B56E] to-[#9E7330] rounded-xl rounded-b-2xl opacity-95 z-0" />
                      <div className="relative z-10 bg-white dark:bg-[#191926] rounded-2xl border border-neutral-100 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)] pt-7 pb-4 px-3 text-center">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#F5D595] via-[#C99A50] to-[#8F6622] ring-3 ring-amber-100 dark:ring-neutral-900 shadow-[0_4px_12px_rgba(201,154,80,0.35)] flex items-center justify-center overflow-hidden">
                          <span className="absolute top-0.5 left-1.5 w-4 h-1.5 rounded-full bg-white/50 blur-[0.3px] pointer-events-none" />
                          <Folder className="w-4 h-4 text-white stroke-[2.2]" />
                        </div>
                        <p className="text-2xl font-black text-[#FF0000] leading-none mt-1">
                          <CountUpNumber target={2500} suffix="+" durationMs={1400} />
                        </p>
                        <p className="text-xs font-bold text-neutral-800 dark:text-neutral-100 leading-tight mt-2 min-h-[28px] flex items-center justify-center">
                          Projects Done
                        </p>
                        <div className="w-6 h-[2px] bg-[#C99A50] rounded-full mx-auto mt-2" />
                      </div>
                    </StaggerItem>

                    {/* Item 3: 2300+ Successful Projects */}
                    <StaggerItem className="relative group">
                      <div className="absolute -bottom-1 -left-1.5 right-1 h-9 bg-gradient-to-br from-[#B0000E] via-[#FF0000] to-[#8E000A] rounded-xl rounded-bl-2xl opacity-95 z-0" />
                      <div className="relative z-10 bg-white dark:bg-[#191926] rounded-2xl border border-neutral-100 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)] pt-7 pb-4 px-3 text-center">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#FF4D5B] via-[#FF0000] to-[#99000D] ring-3 ring-red-100 dark:ring-neutral-900 shadow-[0_4px_12px_rgba(255,0,0,0.35)] flex items-center justify-center overflow-hidden">
                          <span className="absolute top-0.5 left-1.5 w-4 h-1.5 rounded-full bg-white/45 blur-[0.3px] pointer-events-none" />
                          <Award className="w-4 h-4 text-white stroke-[2.2]" />
                        </div>
                        <p className="text-2xl font-black text-[#FF0000] leading-none mt-1">
                          <CountUpNumber target={2300} suffix="+" durationMs={1400} />
                        </p>
                        <p className="text-xs font-bold text-neutral-800 dark:text-neutral-100 leading-tight mt-2 min-h-[28px] flex items-center justify-center">
                          Successful Projects
                        </p>
                        <div className="w-6 h-[2px] bg-[#FF0000] rounded-full mx-auto mt-2" />
                      </div>
                    </StaggerItem>

                    {/* Item 4: 95% Customer Satisfaction */}
                    <StaggerItem className="relative group">
                      <div className="absolute -bottom-1 inset-x-1 h-9 bg-gradient-to-br from-[#C99A50] via-[#E5B56E] to-[#9E7330] rounded-xl rounded-b-2xl opacity-95 z-0" />
                      <div className="relative z-10 bg-white dark:bg-[#191926] rounded-2xl border border-neutral-100 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)] pt-7 pb-4 px-3 text-center">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#F5D595] via-[#C99A50] to-[#8F6622] ring-3 ring-amber-100 dark:ring-neutral-900 shadow-[0_4px_12px_rgba(201,154,80,0.35)] flex items-center justify-center overflow-hidden">
                          <span className="absolute top-0.5 left-1.5 w-4 h-1.5 rounded-full bg-white/50 blur-[0.3px] pointer-events-none" />
                          <Smile className="w-4 h-4 text-white stroke-[2.2]" />
                        </div>
                        <p className="text-2xl font-black text-[#FF0000] leading-none mt-1">
                          <CountUpNumber target={95} suffix="%" durationMs={1250} />
                        </p>
                        <p className="text-xs font-bold text-neutral-800 dark:text-neutral-100 leading-tight mt-2 min-h-[28px] flex items-center justify-center">
                          Customer Satisfaction
                        </p>
                        <div className="w-6 h-[2px] bg-[#C99A50] rounded-full mx-auto mt-2" />
                      </div>
                    </StaggerItem>

                  </StaggerContainer>
                </div>

              </div>

            </div>

          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 4: OUR WORK PROCESS                                        */}
      {/* ------------------------------------------------------------------ */}
      <section id="process" className="py-14 sm:py-18 lg:py-20 bg-white dark:bg-[#0c0c12] text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800/80 relative overflow-hidden transition-colors duration-300">
        {/* Halftone Graphic on Right */}
        <div 
          className="absolute top-0 right-0 w-80 h-full pointer-events-none opacity-15"
          style={{
            backgroundImage: 'radial-gradient(#FF0000 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-left mb-10 sm:mb-12 lg:mb-14 space-y-2">
            <Reveal distance={14} duration={0.58} className="inline-flex items-center gap-2">
              <span className="w-5 h-1 bg-[#FF0000] rounded-full inline-block" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#FF0000] uppercase">
                OUR WORK PROCESS
              </span>
            </Reveal>

            <MaskedTextReveal delay={0.08}>
              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase text-neutral-900 dark:text-white">
                A SIMPLE <span className="text-[#FF0000]">5-STEP PROCESS</span>
              </h2>
            </MaskedTextReveal>
            <Reveal delay={0.16} distance={14}>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans max-w-xl">
                From understanding your needs to delivering the final result, our simple five-step process keeps every project organized, smooth, and hassle-free.
              </p>
            </Reveal>
          </div>

          {/* 5 Connected Stages */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 items-start" staggerDelay={0.1}>
            {processSteps.map((step, idx) => {
              const isLast = idx === processSteps.length - 1;
              return (
                <StaggerItem key={step.number} className="relative flex flex-col items-center md:items-start text-center md:text-left group">
                  
                  {/* Top Indicator & Connecting Arrow */}
                  <div className="flex items-center w-full justify-center md:justify-start relative mb-4">
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.24, ease: EASE_STUDIO }}
                      className="w-11 h-11 rounded-full bg-[#FF0000] text-white flex items-center justify-center font-mono font-bold text-xs shadow-md shadow-red-600/25 group-hover:shadow-lg group-hover:shadow-red-600/35 transition-shadow duration-300 shrink-0 z-10"
                    >
                      {step.number}
                    </motion.div>

                    {!isLast && (
                      <div className="hidden md:flex items-center flex-1 ml-3 pr-2">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={VIEWPORT_ONCE}
                          transition={{ duration: 0.65, delay: 0.2 + idx * 0.1, ease: EASE_STUDIO }}
                          className="h-0.5 bg-neutral-200 dark:bg-neutral-800 w-full relative origin-left"
                        >
                          <ArrowRight className="w-3 h-3 text-[#FF0000] absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-tight group-hover:text-[#FF0000] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FINAL CALL-TO-ACTION                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#000000] text-white border-b border-neutral-800 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3.5 sm:space-y-4">
          {/* Small Heading */}
          <Reveal distance={14} duration={0.58} className="inline-flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 bg-[#FF0000] rounded-full inline-block" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF0000] uppercase">
              LET'S CREATE TOGETHER
            </span>
            <span className="w-4 h-0.5 bg-[#C99A50] rounded-full inline-block" />
          </Reveal>

          <MaskedTextReveal delay={0.08}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase leading-tight">
              YOUR IDEAS. <span className="text-[#FF0000]">OUR CREATIVITY.</span>
            </h2>
          </MaskedTextReveal>

          <Reveal delay={0.16} distance={16}>
            <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-2xl mx-auto leading-relaxed">
              From stationery and wedding invitations to pharmaceutical design and book layouts, we turn your vision into something remarkable.
            </p>
          </Reveal>

          <Reveal delay={0.24} distance={14} className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.24, ease: EASE_STUDIO }}
              onClick={onOpenQuoteModal}
              className="group inline-flex items-center gap-2 px-7 py-3 text-xs sm:text-sm font-mono font-bold rounded-full bg-[#FF0000] hover:bg-[#D60000] text-white shadow-xl shadow-red-600/25 hover:shadow-red-600/40 transition-[background-color,box-shadow] duration-300 cursor-pointer"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.24, ease: EASE_STUDIO }}
              onClick={() => navigate('contact')}
              className="inline-flex items-center gap-2 px-7 py-3 text-xs sm:text-sm font-mono font-bold rounded-full bg-transparent hover:bg-white/10 text-white border border-neutral-700 hover:border-neutral-500 transition-[background-color,border-color] duration-300 cursor-pointer"
            >
              <span>Contact Our Studio</span>
            </motion.button>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PREMIUM CONTACT SECTION (ABOVE FOOTER)                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#FFFFFF] dark:bg-[#0e0e16] text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          
          {/* Small Heading */}
          <Reveal distance={14} duration={0.58} className="inline-flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 bg-[#FF0000] rounded-full inline-block" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF0000] uppercase">
              LET'S CREATE SOMETHING GREAT
            </span>
            <span className="w-4 h-0.5 bg-[#C99A50] rounded-full inline-block" />
          </Reveal>

          {/* Main Heading */}
          <MaskedTextReveal delay={0.08}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight text-[#111111] dark:text-white uppercase">
              LET'S BRING YOUR DESIGN TO LIFE.
            </h2>
          </MaskedTextReveal>

          {/* Description */}
          <Reveal delay={0.14} distance={14}>
            <p className="text-xs sm:text-sm text-[#555555] dark:text-neutral-300 font-sans max-w-xl mx-auto leading-relaxed">
              Have a design or printing project in mind? Share your mobile number and let's get started.
            </p>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.2} distance={14} className="pt-2">
            <form onSubmit={handleContactSubmit} className="max-w-md mx-auto space-y-2" noValidate>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full">
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      if (mobileError) setMobileError('');
                    }}
                    placeholder="Enter your mobile number"
                    className="w-full bg-[#FFFFFF] dark:bg-[#161622] border border-neutral-300 dark:border-neutral-700 rounded-full px-5 py-3 text-xs sm:text-sm text-[#111111] dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-[border-color,box-shadow,background-color] duration-250 shadow-sm"
                  />
                </div>
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.22, ease: EASE_STUDIO }}
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#FF0000] hover:bg-[#D60000] text-white text-xs font-mono font-bold uppercase tracking-wider transition-[background-color,box-shadow] duration-300 shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 shrink-0 cursor-pointer"
                >
                  Submit
                </motion.button>
              </div>
              <AnimatePresence>
                {mobileError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: EASE_STUDIO }}
                    className="text-xs text-[#FF0000] font-sans text-center sm:text-left pl-3 pt-1"
                  >
                    {mobileError}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

        </div>
      </section>

    </div>
  );
};
