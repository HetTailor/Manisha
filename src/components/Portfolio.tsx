import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface PortfolioProps {
  onSelectForQuote: (category: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectForQuote }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [inspectItem, setInspectItem] = useState<any | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'stationery', label: 'Stationery' },
    { id: 'wedding-cards', label: 'Wedding Cards' },
    { id: 'pharma', label: 'Pharmaceutical' },
    { id: 'books', label: 'Book Work' },
  ];

  const portfolioItems = [
    {
      id: 'item-1',
      category: 'stationery',
      title: 'Stationery & Executive Visiting Cards',
      categoryLabel: 'Stationery',
      specs: '450 GSM Velvet Board · Gold & Crimson Hot Foil Stamping',
      imageSrc: '/assets/ref/portfolio-1.png',
      desc: 'Complete corporate identity suite with laser-sharp registration, custom die-cut business cards, and branded envelopes.',
    },
    {
      id: 'item-2',
      category: 'wedding-cards',
      title: 'Royal Indian Wedding Invitation Suite',
      categoryLabel: 'Wedding Cards',
      specs: '600 GSM Handmade Rag · Intricate Laser Filigree & Wax Seal',
      imageSrc: '/assets/ref/portfolio-2.png',
      desc: 'Ornate royal multi-insert invitation box with metallic gold screen printing, embossed borders, and custom monograms.',
    },
    {
      id: 'item-3',
      category: 'pharma',
      title: 'Pharmaceutical Packaging & Medicine Bottles',
      categoryLabel: 'Pharmaceutical',
      specs: 'Pharma-Grade SBS Board · Braille Embossing & 2D Barcode',
      imageSrc: '/assets/ref/portfolio-3.png',
      desc: 'Zero-defect packaging cartons, safety seal labels, and certified medical product inserts for pharmaceutical brands.',
    },
    {
      id: 'item-4',
      category: 'books',
      title: 'Hardcover Monograph & Book Work',
      categoryLabel: 'Book Work',
      specs: 'Smyth Sewn Cloth Spine · Spot UV & Foil Stamped Hardcase',
      imageSrc: '/assets/ref/portfolio-4.png',
      desc: 'Studio edition architectural monograph with Smyth sewn lay-flat binding, satin ribbon markers, and tactile cloth covers.',
    },
    {
      id: 'item-5',
      category: 'stationery',
      title: 'Catalogues, Brochures & Publication Prints',
      categoryLabel: 'Stationery',
      specs: '170 GSM Sappi Silk · 5-Color Heidelberg Offset Press',
      imageSrc: '/assets/ref/portfolio-5.png',
      desc: 'Vibrant full-bleed product catalogues and fold-out corporate brochures with rich ink saturation and matte laminates.',
    },
  ];

  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  const handlePrev = () => {
    setCarouselIndex(prev => (prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex(prev => (prev >= filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="portfolio" className="py-20 bg-[#08080c] text-white border-b border-neutral-900 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF0000]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Category Filter Tabs on right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          
          {/* Left: Titles */}
          <div className="text-left space-y-2">
            <div className="text-xs font-mono font-bold tracking-widest text-[#FF0000] uppercase">
              OUR WORK
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase">
              EVERY DESIGN TELLS A <span className="text-[#FF0000]">STORY</span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-xl">
              A showcase of our creative work, combining thoughtful design, visual appeal and precision across different design categories.
            </p>
          </div>

          {/* Right: Filter Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setCarouselIndex(0);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#FF0000] text-white shadow-lg shadow-red-600/30 font-semibold'
                      : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Carousel / Gallery Showcase */}
        <div className="relative">
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous portfolio item"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900/90 border border-neutral-700 text-white flex items-center justify-center hover:bg-[#FF0000] hover:border-[#FF0000] transition-all shadow-xl z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Items Horizontal Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-hidden">
            {filteredItems.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  onClick={() => setInspectItem(item)}
                  className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-600/10"
                >
                  {/* Photo Thumbnail */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-left">
                      <div className="text-[10px] font-mono text-[#FF0000] font-bold uppercase">
                        {item.categoryLabel}
                      </div>
                      <div className="text-xs font-bold text-white line-clamp-1">
                        {item.title}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-neutral-300">
                        <Eye className="w-3 h-3 text-[#FF0000]" />
                        <span>Inspect Specs</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom title strip */}
                  <div className="p-3 text-left">
                    <div className="text-xs font-bold text-neutral-200 group-hover:text-white line-clamp-1">
                      {item.title}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 line-clamp-1 mt-0.5">
                      {item.specs}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next portfolio item"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900/90 border border-neutral-700 text-white flex items-center justify-center hover:bg-[#FF0000] hover:border-[#FF0000] transition-all shadow-xl z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="w-6 h-2 rounded-full bg-[#FF0000]" />
          <span className="w-2 h-2 rounded-full bg-neutral-700" />
          <span className="w-2 h-2 rounded-full bg-neutral-700" />
        </div>

      </div>

      {/* Lightbox / Spec Detail Modal */}
      {inspectItem && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-modal-title"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setInspectItem(null)}
        >
          <div 
            className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full bg-black">
              <img
                src={inspectItem.imageSrc}
                alt={inspectItem.title}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-red-400 text-xs font-mono font-bold uppercase">
                  {inspectItem.categoryLabel}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  Produced by Manisha Graphix
                </span>
              </div>

              <h3 id="portfolio-modal-title" className="text-xl sm:text-2xl font-display font-black text-white">
                {inspectItem.title}
              </h3>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300">
                <span className="text-[#FF0000] font-bold block mb-1">CRAFT & PRINT SPECS:</span>
                {inspectItem.specs}
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                {inspectItem.desc}
              </p>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setInspectItem(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-mono font-bold text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const cat = inspectItem.category;
                    setInspectItem(null);
                    onSelectForQuote(cat);
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-mono font-bold bg-[#FF0000] hover:bg-[#D60000] text-white shadow-lg shadow-red-600/30"
                >
                  Quote This Specification →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
