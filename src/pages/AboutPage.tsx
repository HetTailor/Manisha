import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  Reveal,
  MaskedTextReveal,
  ImageReveal,
  SubtleParallax,
  HairlineRule,
  StaggerContainer,
  StaggerItem,
  EASE_STUDIO,
} from '../components/MotionPrimitives';
import { useNavigation } from '../context/NavigationContext';

interface AboutPageProps {
  onOpenQuoteModal: () => void;
}

interface CareerMilestone {
  id: string;
  number: string;
  company: string;
  companySub?: string;
  role: string;
  period: string;
  descriptionLines: string[];
}

const careerMilestones: CareerMilestone[] = [
  {
    id: 'pratiksha',
    number: '01',
    company: 'Pratiksha Graphix',
    role: 'DTP Operator',
    period: '2011 – 2014',
    descriptionLines: [
      'Typesetting and multilingual DTP,',
      'layout design and print preparation.',
    ],
  },
  {
    id: 'aakar',
    number: '02',
    company: 'Aakar Packart',
    role: 'Graphic Designer / DTP Operator',
    period: '2014 – 2018',
    descriptionLines: [
      'Graphic design and layout creation,',
      'four-colour print preparation,',
      'packaging and label design.',
    ],
  },
  {
    id: 'savorite',
    number: '03',
    company: 'Savorite Pharmaceuticals',
    companySub: 'Pvt. Ltd.',
    role: 'Graphic Designer',
    period: '2018 – 2023',
    descriptionLines: [
      'Catalogues and visual aids design,',
      'packaging and label design,',
      'print-ready artwork and production support.',
    ],
  },
  {
    id: 'unicure',
    number: '04',
    company: 'Unicure Remedies',
    companySub: 'Pvt. Ltd.',
    role: 'Designer',
    period: '2023',
    descriptionLines: [
      'Pharmaceutical packaging design,',
      'label design and artwork,',
      'medical literature and promotional material.',
    ],
  },
  {
    id: 'afrinext',
    number: '05',
    company: 'Afrinext Overseas',
    companySub: 'Pvt. Ltd.',
    role: 'Designer',
    period: '2023 – 2024',
    descriptionLines: [
      'Pharmaceutical packaging design,',
      'labels and artwork creation,',
      'medical literature and product creatives.',
    ],
  },
  {
    id: 'nidhya',
    number: '06',
    company: 'Nidhya Overseas',
    role: 'Designer',
    period: '2024 – Present',
    descriptionLines: [
      'Export packaging design,',
      'labels and branding materials,',
      'product catalogue and promotional design.',
    ],
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  const { navigate } = useNavigation();



  return (
    <div className="bg-[#fcfcfd] dark:bg-[#09090e] text-neutral-900 dark:text-neutral-100 min-h-screen pt-20 lg:pt-24 pb-16 sm:pb-20 transition-colors duration-300">
      
      {/* 1. Page Header with Editorial Style */}
      <section className="border-b border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#0c0c12] py-12 sm:py-14 lg:py-16 relative overflow-hidden transition-colors duration-300">
        {/* Subtle decorative background ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-500/5 via-[#C99A50]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Eyebrow Kicker */}
            <Reveal immediate distance={14} duration={0.55} className="inline-flex items-center gap-2.5 mb-2.5 sm:mb-3">
              <span className="w-6 h-1 bg-[#FF0000] rounded-full inline-block" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#FF0000] uppercase">
                ABOUT MANISHA GRAPHIX
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C99A50]" />
            </Reveal>

            {/* Impactful Heading */}
            <MaskedTextReveal immediate delay={0.08}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-[#000000] dark:text-white uppercase tracking-tight leading-[1.12]">
                WE TURN IDEAS INTO <span className="text-[#FF0000]">CREATIVE REALITIES</span>
              </h1>
            </MaskedTextReveal>

            {/* Accent divider line in brand red and golden */}
            <HairlineRule
              immediate
              delay={0.18}
              className="w-20 h-1 bg-gradient-to-r from-[#FF0000] via-[#C99A50] to-[#C99A50] rounded-full mt-4 sm:mt-5"
            />

            {/* Paragraph */}
            <Reveal immediate delay={0.2} distance={14}>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-[19px] text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed max-w-3xl font-normal">
                <span className="font-semibold text-[#000000] dark:text-white">MANISHA GRAPHIX</span> brings creativity and precision together to deliver exceptional graphic design and printing solutions. From professional stationery and elegant wedding invitations to pharmaceutical designs and book layouts, we transform ideas into impactful designs with a strong focus on quality, detail, and craftsmanship.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Core 2-Column Editorial Grid: Prepress Studio & Founder Story */}
      <section className="py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white dark:bg-[#13131d] p-6 sm:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-300">
            
            {/* Col 1: Prepress Studio Photo */}
            <Reveal direction="up" distance={20} className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-md relative group">
                <SubtleParallax offsetPx={14} className="w-full">
                  <ImageReveal className="w-full">
                    <img
                      src="/assets/ref/about-imac.png"
                      alt="Manisha Graphix Prepress Studio Workspace"
                      className="w-full h-auto object-cover scale-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                  </ImageReveal>
                </SubtleParallax>
                <div className="p-3 bg-neutral-900 text-white text-[11px] font-mono flex items-center justify-between relative z-10">
                  <span>Prepress Studio Desk · Vadodara</span>
                  <span className="text-[#FF0000] font-bold">2400 DPI Proofing</span>
                </div>
              </div>
            </Reveal>

            {/* Col 2: The Founder Story & Philosophy */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="space-y-1">
                <Reveal distance={14} duration={0.55}>
                  <span className="text-xs font-mono font-bold text-[#FF0000] uppercase tracking-wider">
                    FOUNDER'S AND CEO
                  </span>
                </Reveal>
                <MaskedTextReveal delay={0.08}>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-neutral-900 dark:text-white uppercase">
                    Harshil Mistry
                  </h2>
                </MaskedTextReveal>
                <Reveal delay={0.14} distance={12}>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Founder & CEO · Over 12 Years Industry Experience</p>
                </Reveal>
              </div>

              <Reveal delay={0.18} distance={14}>
                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                  With over 12 years of experience in graphic design, pharmaceutical packaging, and printing, Harshil Mistry brings extensive industry knowledge and technical expertise to MANISHA GRAPHIX. His experience includes pharmaceutical box and label design, medical literature, catalogues, visual aids, offset printing, and multi-colour printing production.
                </p>
              </Reveal>

              <Reveal delay={0.24} distance={14}>
                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                  With a strong foundation in creative design and print production, he is committed to delivering precise, high-quality design solutions with attention to detail and professional craftsmanship.
                </p>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PROFESSIONAL JOURNEY: Chronological Career Timeline */}
      <section id="professional-journey" className="py-16 sm:py-20 lg:py-24 bg-[#F4F5F8] dark:bg-[#0a0a10] text-neutral-900 dark:text-neutral-100 border-t border-b border-neutral-200/80 dark:border-neutral-800 relative overflow-hidden transition-colors duration-300">
        {/* Anchor alias in case of references */}
        <span id="quality-pledge" className="absolute -top-24 pointer-events-none" />
        
        {/* Subtle decorative background ambient glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FF0000]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#C99A50]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <Reveal distance={14} duration={0.55}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C99A50]/15 border border-[#C99A50]/40 text-[#FF0000] text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C99A50]" />
                <span>CAREER RETROSPECTIVE · 12+ YEARS</span>
              </div>
            </Reveal>
            
            <MaskedTextReveal delay={0.08}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-neutral-950 dark:text-white uppercase tracking-tight">
                PROFESSIONAL <span className="text-[#FF0000]">JOURNEY</span>
              </h2>
            </MaskedTextReveal>
            
            <HairlineRule
              delay={0.18}
              className="w-20 h-1 bg-gradient-to-r from-[#FF0000] via-[#C99A50] to-[#FF0000] rounded-full mx-auto mt-4"
            />
            
            <Reveal delay={0.2} distance={14}>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans mt-4 leading-relaxed max-w-2xl mx-auto">
                Harshil Mistry’s technical career trajectory across commercial print studios, folding box converters, and leading pharmaceutical manufacturers — channeled into every print run at MANISHA GRAPHIX.
              </p>
            </Reveal>
          </div>

          {/* 6 Career Milestone Cards - Live Typography Styling */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 mt-10 sm:mt-12" staggerDelay={0.08}>
            {careerMilestones.map((item) => (
              <StaggerItem key={item.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: EASE_STUDIO }}
                  className="group relative flex flex-col justify-between rounded-[28px] sm:rounded-[32px] bg-white dark:bg-[#14141e] border border-neutral-100 dark:border-neutral-800 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.03)] dark:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_55px_-12px_rgba(0,0,0,0.13)] transition-shadow duration-350 overflow-hidden min-h-[415px] h-full"
                >
                {/* Content Section */}
                <div className="pt-7 sm:pt-8 px-6 sm:px-7 pb-4">
                  {/* Top Header: Number + Gold Dash + Date Period */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="text-[#C99A50] font-medium text-[28px] sm:text-[30px] leading-none tracking-tight font-sans">
                        {item.number}
                      </span>
                      <span className="w-9 sm:w-11 h-[2px] bg-[#C99A50]/85 rounded-full inline-block" />
                    </div>
                    <span className="text-[#64748B] dark:text-neutral-400 text-[13.5px] sm:text-[14px] font-normal tracking-normal font-sans">
                      {item.period}
                    </span>
                  </div>

                  {/* Company Name */}
                  <h3 className="text-[21px] sm:text-[23px] font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.25] mt-5 mb-1.5 font-sans">
                    {item.company}
                    {item.companySub && (
                      <span className="block">{item.companySub}</span>
                    )}
                  </h3>

                  {/* Job Role */}
                  <p className="text-[#C99A50] font-medium text-[15px] sm:text-[15.5px] mb-3.5 font-sans">
                    {item.role}
                  </p>

                  {/* Description with precise line breaks */}
                  <div className="text-[#52525B] dark:text-neutral-300 text-[13.5px] sm:text-[14px] leading-[1.65] font-normal font-sans space-y-0.5">
                    {item.descriptionLines.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>

                {/* Bottom Red & Gold Wave Accent with White Arrow */}
                <div className="relative w-full h-[115px] sm:h-[125px] mt-auto overflow-hidden">
                  <svg
                    viewBox="0 0 400 120"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full block"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id={`goldGrad-${item.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#C59746" />
                        <stop offset="35%" stopColor="#DFBA6B" />
                        <stop offset="70%" stopColor="#F1D595" />
                        <stop offset="100%" stopColor="#A4772B" />
                      </linearGradient>
                      <linearGradient id={`redGrad-${item.id}`} x1="0%" y1="0%" x2="100%" y2="80%">
                        <stop offset="0%" stopColor="#78000A" />
                        <stop offset="40%" stopColor="#A80014" />
                        <stop offset="75%" stopColor="#C9001E" />
                        <stop offset="100%" stopColor="#DF0026" />
                      </linearGradient>
                    </defs>

                    {/* Gold background wave */}
                    <path
                      d="M0,52 C85,25 170,68 260,45 C315,30 360,32 400,38 L400,120 L0,120 Z"
                      fill={`url(#goldGrad-${item.id})`}
                    />

                    {/* Ruby red foreground wave */}
                    <path
                      d="M0,74 C90,46 175,82 265,56 C320,38 365,34 400,38 L400,120 L0,120 Z"
                      fill={`url(#redGrad-${item.id})`}
                    />
                  </svg>

                  {/* Clean crisp white arrow pointing right */}
                  <div className="absolute right-6 sm:right-7 bottom-5 sm:bottom-6 z-10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Culmination Showcase Banner: Present Day at MANISHA GRAPHIX */}
          <Reveal className="mt-14 sm:mt-18 bg-gradient-to-br from-[#0c0c14] via-[#14141e] to-[#0c0c14] p-8 sm:p-10 rounded-3xl border-2 border-[#C99A50]/40 text-white shadow-2xl relative overflow-hidden">
            {/* Static Subtle Ambient Radial Lights */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C99A50]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C99A50]/50 text-[#C99A50] text-xs font-mono font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#C99A50]" />
                  <span>PRESENT · MANISHA GRAPHIX STUDIO & PRESS LINE</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black uppercase text-white tracking-tight">
                  12+ YEARS OF PACKAGING & PRINT MASTERY IN EVERY JOB
                </h3>
                
                <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-sans leading-relaxed">
                  Every wedding invitation, pharmaceutical carton, luxury visiting card, and publication produced by MANISHA GRAPHIX directly benefits from Harshil Mistry’s comprehensive career across prepress, offset production, and precision finishing.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <motion.button
                  whileHover={{ y: -1.5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.24, ease: EASE_STUDIO }}
                  onClick={onOpenQuoteModal}
                  className="group w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FF0000] hover:bg-[#D60000] text-white text-xs font-mono font-bold uppercase transition-[background-color,box-shadow] duration-300 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Print Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </motion.button>
                <motion.button
                  whileHover={{ y: -1.5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.24, ease: EASE_STUDIO }}
                  onClick={() => navigate('contact')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase transition-colors duration-300 flex items-center justify-center cursor-pointer"
                >
                  <span>Contact Harshil Mistry</span>
                </motion.button>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 4. Emblem Anatomy & Meaning (BRAND IDENTITY) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0c0c12] text-neutral-900 dark:text-neutral-100 relative overflow-hidden border-t border-neutral-200/90 dark:border-neutral-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mb-10 sm:mb-12 lg:mb-14">
            <Reveal distance={14} duration={0.55}>
              <span className="text-xs font-mono font-bold text-[#FF0000] tracking-widest uppercase block mb-1">
                BRAND IDENTITY
              </span>
            </Reveal>
            <MaskedTextReveal delay={0.08}>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-neutral-950 dark:text-white uppercase tracking-tight">
                THE ANATOMY OF OUR EMBLEM
              </h2>
            </MaskedTextReveal>
            <HairlineRule
              delay={0.16}
              className="w-16 h-1 bg-gradient-to-r from-[#FF0000] to-[#C99A50] rounded-full mt-3 mb-3"
            />
            <Reveal delay={0.18} distance={14}>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                Every curve, angle, and line in the Manisha Graphix mark represents a core principle of printing engineering.
              </p>
            </Reveal>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.1}>
            <StaggerItem>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: EASE_STUDIO }}
                className="group h-full p-7 rounded-2xl bg-white dark:bg-[#14141e] border-2 border-[#C99A50]/35 dark:border-[#C99A50]/30 shadow-sm hover:shadow-xl hover:border-[#FF0000] transition-[border-color,box-shadow,background-color] duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF0000] text-white flex items-center justify-center mb-5 font-mono font-bold text-xl shadow-md shadow-red-600/20 transition-transform duration-300 ease-out group-hover:scale-105">
                  ▲
                </div>
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-2 font-display">The Red Triangle</h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                  Represents geometric structural precision, razor-sharp guillotine trimming, and the unyielding foundation of mechanical craft.
                </p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: EASE_STUDIO }}
                className="group h-full p-7 rounded-2xl bg-white dark:bg-[#14141e] border-2 border-[#C99A50]/35 dark:border-[#C99A50]/30 shadow-sm hover:shadow-xl hover:border-[#C99A50] transition-[border-color,box-shadow,background-color] duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C99A50] text-white flex items-center justify-center mb-5 font-mono font-bold text-xl shadow-md shadow-amber-500/20 transition-transform duration-300 ease-out group-hover:scale-105">
                  ●
                </div>
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-2 font-display">The Golden Circle</h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                  Signifies the emblem's golden seal, fine metallic foiling, and the creative excellence that transforms ideas into prestigious brand assets.
                </p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: EASE_STUDIO }}
                className="group h-full p-7 rounded-2xl bg-white dark:bg-[#14141e] border-2 border-[#C99A50]/35 dark:border-[#C99A50]/30 shadow-sm hover:shadow-xl hover:border-black dark:hover:border-white/50 transition-[border-color,box-shadow,background-color] duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#000000] dark:bg-neutral-800 dark:border dark:border-white/15 text-white flex items-center justify-center mb-5 font-mono font-bold text-xl shadow-md shadow-neutral-900/20 transition-transform duration-300 ease-out group-hover:scale-105">
                  ≡
                </div>
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-2 font-display">The Striped Press Hatch</h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                  Symbolizes offset roller cylinders, high-speed sheet feeding, and multi-color plate registration working in rhythmic unison.
                </p>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>

          {/* Action Box */}
          <Reveal className="mt-14 p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-neutral-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase font-display">Ready to discuss your custom print specifications?</h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1.5">Our team provides physical sample paper swatches and instantaneous quotes.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <motion.button
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.24, ease: EASE_STUDIO }}
                onClick={onOpenQuoteModal}
                className="px-6 py-3 rounded-full bg-[#FF0000] hover:bg-[#D60000] text-white text-xs font-mono font-bold uppercase transition-[background-color,box-shadow] duration-300 shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/40 cursor-pointer"
              >
                Instant Quote
              </motion.button>
              <motion.button
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.24, ease: EASE_STUDIO }}
                onClick={() => navigate('contact')}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase transition-colors duration-300 cursor-pointer border border-white/15"
              >
                Contact Studio
              </motion.button>
            </div>
          </Reveal>

        </div>
      </section>

    </div>
  );
};
