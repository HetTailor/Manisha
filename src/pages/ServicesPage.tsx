import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  Reveal,
  MaskedTextReveal,
  ImageReveal,
  EASE_STUDIO,
  VIEWPORT_ONCE,
} from '../components/MotionPrimitives';

interface ServicesPageProps {
  onOpenQuoteModal: () => void;
  onSelectServiceForQuote: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenQuoteModal,
  onSelectServiceForQuote,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const services = [
    {
      id: 'stationery-printing',
      category: 'stationery',
      title: 'Stationery & Corporate Identity',
      tagline: 'Professional corporate collateral crafted to reinforce prestige and credibility.',
      image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/11/4b3741cc531e22908bb5572077d57799.jpg',
      gsmRange: '100 – 600 GSM',
      turnaround: '24–48 Hours',
      deliverables: [
        'Executive Visiting Cards (Velvet Matte, Spot UV, Gold Foil)',
        'Corporate Letterheads (100–120 GSM Alabaster / Bond Paper)',
        'Branded Envelopes (Self-seal peel & strip, DL, C4, C5 sizes)',
        'Pocket Folders & Presentation Kits (Gloss / Matte lamination)',
        'Carbonless NCR Bill Books & Invoice Vouchers (Numbered)',
        'Company Brochures & Tri-Fold Product Flyers',
      ],
      finishes: ['Gold / Silver Foil', 'Velvet Matte Lamination', 'Raised Spot UV', 'Edge Gilding'],
    },
    {
      id: 'wedding-cards',
      category: 'wedding',
      title: 'Luxury Wedding Cards & Social Invitations',
      tagline: 'Exquisite multi-piece invitation suites celebrating sacred beginnings.',
      image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/11/a984285e57d4a2c8c4563ac52ee5b7a1.jpg',
      gsmRange: '300 – 800 GSM Rigid',
      turnaround: '4–7 Days',
      deliverables: [
        'Royal Rigid Boxed Invitations with Magnetic Closures',
        'Traditional Scroll Invites with Silk Ribbons & Metallic Tubes',
        'Laser-Cut Filigree Envelopes & Detailed Die-Cut Pockets',
        'Custom Wax Seal Monograms & Velvet Ribbon Accents',
        'Save The Date, Sangeet & Reception Insert Sets',
        'Eco-Friendly Seed Paper & Handmade Textured Cotton Suites',
      ],
      finishes: ['Multi-Level Embossing', 'Hot Foil Stamping', 'Laser Die-Cutting', 'Acrylic Engraving'],
    },
    {
      id: 'pharmaceutical-printing',
      category: 'pharma',
      title: 'Pharmaceutical & Medical Packaging',
      tagline: 'Rigorous cleanroom printing adhering to regulatory compliance and batch accuracy.',
      image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-21-at-4.43.24-PM.jpeg',
      gsmRange: '38 GSM Inserts · 250–400 GSM Cartons',
      turnaround: '3–5 Days',
      deliverables: [
        'Printed Medicine Outer Cartons (Virgin Duplex & SBS Board)',
        'Ultra-Thin Pharmacopeia Package Inserts (38–45 GSM Bible Paper)',
        'Blister Card Backings & Unit Dose Paperboard Packaging',
        'Braille Embossed Cartons for Visually Impaired Compliance',
        'Tamper-Evident Holographic Security Seals & Void Labels',
        'Doctor Prescription Pads & Medical Lab Stationery',
      ],
      finishes: ['Braille Embossing', 'Anti-Counterfeit Hologram', 'Aqueous Coating', 'Micro-Folding'],
    },
    {
      id: 'book-work',
      category: 'books',
      title: 'Book Work & Publication Printing',
      tagline: 'Complete editorial publication and bookbinding solutions built for longevity.',
      image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/11/c600663b76e9b1e5d854e40adb471489.jpg',
      gsmRange: '70–130 GSM Inner · 350+ GSM Hardcover',
      turnaround: '5–8 Days',
      deliverables: [
        'Hardcover Smyth-Sewn Monographs & Coffee Table Books',
        'High-Gloss Product Catalogues & Wholesale Order Guides',
        'Corporate Annual Reports with Foil-Stamped Covers',
        'Educational Textbooks & Spiral/Wire-O Bound Workbooks',
        'Custom Magazines, Periodicals & Art Booklets',
        'Thermal Laminated Dust Jackets & Slipcases',
      ],
      finishes: ['Smyth-Sewn Binding', 'Spot Gloss UV', 'Thermal Matte Lamination', 'Case Binding'],
    },
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(s => s.category === activeTab);

  return (
    <div className="bg-[#f8f9fb] dark:bg-[#09090e] text-neutral-900 dark:text-neutral-100 min-h-screen pt-20 lg:pt-24 transition-colors duration-300">
      
      {/* 1. Technical Header */}
      <section className="bg-white dark:bg-[#0c0c12] border-b border-neutral-200 dark:border-neutral-800 py-12 sm:py-14 lg:py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal immediate distance={14} duration={0.55} className="flex items-center gap-2 mb-2.5 sm:mb-3">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: EASE_STUDIO }}
                className="w-5 h-1 bg-[#FF0000] rounded-full inline-block origin-left"
              />
              <span className="text-xs font-mono font-bold tracking-widest text-[#FF0000] uppercase">
                COMMERCIAL PRINTING CATALOG
              </span>
            </Reveal>
            <MaskedTextReveal immediate delay={0.08}>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-neutral-900 dark:text-white uppercase tracking-tight leading-tight">
                PRECISION CRAFT FOR <span className="text-[#FF0000]">EVERY MEDIUM</span>
              </h1>
            </MaskedTextReveal>
            <Reveal immediate delay={0.18} distance={14}>
              <p className="mt-3 sm:mt-3.5 text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                From microscopic typography on pharmaceutical cartons to sumptuous gold-stamped royal wedding invitations, our Vadodara press floor delivers uncompromised mechanical quality.
              </p>
            </Reveal>
          </div>

          {/* Category Filter Tabs */}
          <Reveal immediate delay={0.24} distance={12} className="mt-8 sm:mt-10 flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'stationery', label: 'Stationery' },
              { id: 'wedding', label: 'Wedding Cards' },
              { id: 'pharma', label: 'Pharmaceutical' },
              { id: 'books', label: 'Book Work' },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-250 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-white'
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="services-active-filter"
                      transition={{ duration: 0.34, ease: EASE_STUDIO }}
                      className="absolute inset-0 rounded-full bg-[#FF0000] shadow-md shadow-red-600/20"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* 2. Detailed Service Modules */}
      <section className="py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: EASE_STUDIO }}
              className="grid grid-cols-1 gap-y-10 sm:gap-y-12 lg:auto-rows-fr"
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.16), ease: EASE_STUDIO }}
                  className="group bg-white dark:bg-[#14141e] rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C99A50]/60 transition-[box-shadow,border-color,background-color] duration-350 grid grid-cols-1 lg:grid-cols-12"
                >
                  {/* Service Imagery */}
                  <div className="lg:col-span-5 relative bg-neutral-900 overflow-hidden aspect-[1199/1028] lg:aspect-auto lg:h-full">
                    <ImageReveal className="w-full h-full lg:absolute lg:inset-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </ImageReveal>
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                      <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white text-[11px] font-mono font-bold">
                        {service.gsmRange}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#FF0000] text-white text-[11px] font-mono font-bold">
                        {service.turnaround}
                      </span>
                    </div>
                  </div>

                  {/* Service Specs & Deliverables */}
                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#C99A50]" />
                        <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                          Service Line 0{index + 1}
                        </span>
                      </div>

                      <h2 className="text-2xl font-display font-black text-neutral-900 dark:text-white uppercase mb-2 group-hover:text-[#FF0000] transition-colors duration-250">
                        {service.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed mb-6">
                        {service.tagline}
                      </p>

                      <div className="mb-6">
                        <span className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-200 uppercase block mb-3">
                          Production Deliverables Included:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A50] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <span className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-200 uppercase block mb-2">
                          Available Specialty Finishes:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {service.finishes.map((finish, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-[11px] font-mono font-medium border border-neutral-200 dark:border-neutral-700 transition-colors duration-250 hover:border-[#C99A50]/60"
                            >
                              {finish}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                        Direct Press Floor Run · Vadodara
                      </div>

                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ y: -1.5 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.24, ease: EASE_STUDIO }}
                          onClick={() => onSelectServiceForQuote(service.id)}
                          className="group/btn px-5 py-2.5 rounded-full bg-[#FF0000] hover:bg-[#D60000] text-white text-xs font-mono font-bold uppercase transition-[background-color,box-shadow] duration-300 shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Request Quote for this</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover/btn:translate-x-1" />
                        </motion.button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Instant Quote Bottom Strip */}
      <section className="py-12 sm:py-14 lg:py-16 bg-[#000000] text-white border-y border-neutral-800">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold uppercase">Have custom print dimensions or unique artwork?</h3>
            <p className="text-xs text-neutral-400 mt-1">Our estimators calculate exact paper yield and plate costs within 15 minutes.</p>
          </div>
          <motion.button
            whileHover={{ y: -1.5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.24, ease: EASE_STUDIO }}
            onClick={onOpenQuoteModal}
            className="px-7 py-3 rounded-full bg-[#FF0000] hover:bg-[#D60000] text-white text-xs font-mono font-bold uppercase transition-[background-color,box-shadow] duration-300 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 shrink-0 cursor-pointer"
          >
            Open Quote Calculator →
          </motion.button>
        </Reveal>
      </section>

      {/* Vertical spacing between CTA section and Footer (~112px on desktop, responsive on mobile) */}
      <div className="h-16 sm:h-20 lg:h-28" aria-hidden="true" />
    </div>
  );
};
