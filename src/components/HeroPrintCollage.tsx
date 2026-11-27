import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  ExternalLink, 
  Check, 
  Eye, 
  Maximize2, 
  X, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  FileText,
  BookOpen,
  Heart,
  Package,
  Printer
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeroPrintCollageProps {
  onSelectItemForQuote?: (itemKey: string) => void;
}

export interface CollageItem {
  id: string;
  name: string;
  shortLabel: string;
  category: 'stationery' | 'invitations' | 'marketing' | 'packaging' | 'publishing' | 'machinery';
  specs: {
    material: string;
    finish: string;
    machine: string;
    speed: string;
  };
  description: string;
}

export const COLLAGE_ITEMS: CollageItem[] = [
  {
    id: 'business-cards',
    name: 'Luxury Velvet Business Cards',
    shortLabel: 'Business Cards',
    category: 'stationery',
    specs: {
      material: '450 GSM Ultra-Black Velvet Board',
      finish: 'Metallic Gold & Hot Foil Stamping + Raised Spot UV',
      machine: 'Heidelberg Suprasetter & Kluge Press',
      speed: '24-Hour Express Dispatch'
    },
    description: 'Double-sided executive cards with gilded gold edges, tactile matte velvet finish, and crisp raised spot UV on black.'
  },
  {
    id: 'wedding-invitations',
    name: 'Royal Indian Wedding Invitation Suite',
    shortLabel: 'Wedding Cards',
    category: 'invitations',
    specs: {
      material: '600 GSM Royal Crimson & Gold Board',
      finish: 'Multi-Level Gold Foil + Laser-Cut Lace + Wax Seal',
      machine: 'Precision German Laser Cutting System',
      speed: 'Custom Handcrafted Suite'
    },
    description: 'Regal wedding suites with intricate floral filigree, metallic crimson foil calligraphy, and custom monogram wax seal.'
  },
  {
    id: 'brochures',
    name: 'Corporate Tri-Fold Gloss Brochure',
    shortLabel: 'Brochures',
    category: 'marketing',
    specs: {
      material: '250 GSM High-Bulk Art Gloss Paper',
      finish: 'Aqueous Gloss Coating + Precision Score & Fold',
      machine: 'Komori Lithrone 5-Color UV Press',
      speed: '15,000 Sheets / Hour'
    },
    description: 'Crisp 6-panel corporate tri-fold brochure with razor-sharp CMYK imagery, deep obsidian black panels, and red accents.'
  },
  {
    id: 'flyers',
    name: 'High-Impact Promotional Flyers',
    shortLabel: 'Marketing Flyers',
    category: 'marketing',
    specs: {
      material: '170 GSM Premium Glossy Art Paper',
      finish: 'Full UV Coating + Dual-Sided Vivid Color',
      machine: 'High-Speed Digital & Offset Presses',
      speed: 'Same-Day Batch Printing'
    },
    description: 'Vibrant marketing flyers featuring eye-catching red-to-golden gradient graphics, sharp promotional copy, and gloss shine.'
  },
  {
    id: 'catalogues',
    name: 'Comprehensive Product Catalogues',
    shortLabel: 'Product Catalogues',
    category: 'publishing',
    specs: {
      material: '300 GSM Cover + 130 GSM Gloss Inner Pages',
      finish: 'Matte Lamination with Spot UV Cover + Wire-O Bound',
      machine: 'Automated In-Line Perfect Binder',
      speed: 'High-Volume Runs'
    },
    description: 'Multi-page lookbooks and technical industrial product catalogues with true-to-life CMYK color accuracy and clean indexing.'
  },
  {
    id: 'press-sheets',
    name: 'Offset Press-Proof Calibration Sheets',
    shortLabel: 'CMYK Press Sheets',
    category: 'marketing',
    specs: {
      material: '200 GSM Uncoated Proofing Stock',
      finish: 'CMYK + 2 Spot Pantone Inks (Red 199C & Metallic Gold 871C)',
      machine: 'X-Rite Spectrophotometer Calibrated',
      speed: 'ISO 12647-2 Certified'
    },
    description: 'Full-format press proof with CMYK color density test wedges, registration crosshairs, and color gradient ramps.'
  },
  {
    id: 'pharma-packaging',
    name: 'Certified Pharmaceutical Packaging',
    shortLabel: 'Pharma Packaging',
    category: 'packaging',
    specs: {
      material: '350 GSM Food-Grade SBS Bleached Board',
      finish: 'Embossed Braille Dots + Tamper-Evident Hologram',
      machine: 'Bobst Die-Cutter & Folding Gluer',
      speed: 'Strict Batch Numbering & Verification'
    },
    description: 'Clinical grade medicine cartons and tuck-end boxes with precision die-cut windows, pharmaceutical barcodes, and blister mockups.'
  },
  {
    id: 'books',
    name: 'Hardcover Bound Art & Corporate Books',
    shortLabel: 'Hardcover Books',
    category: 'publishing',
    specs: {
      material: '150 GSM Woodfree Interior + 3mm Rigid Hardcase',
      finish: 'Foil Stamped Spine + Textured Dust Jacket + Ribbon',
      machine: 'Kolbus Hardcover Bookbinding Line',
      speed: 'Archival Thread Sewn'
    },
    description: 'Heirloom hardcover book editions with hot-stamped crimson foil spines, satin ribbons, and lay-flat Smyth-sewn binding.'
  },
  {
    id: 'printing-machines',
    name: 'Heidelberg 5-Color UV Offset Press',
    shortLabel: 'Offset Press Machinery',
    category: 'machinery',
    specs: {
      material: 'Heavy-Duty Industrial Steel & Micro-Drop Rollers',
      finish: 'Direct UV Curing System + In-Line Spectrometer',
      machine: 'Speedmaster XL 75 Series with Digital Console',
      speed: '18,000 Sheets / Hour Continuous'
    },
    description: 'High-tonnage precision commercial offset printing press with computerized touchscreen prepress console and instant LED UV curing.'
  }
];

export const HeroPrintCollage: React.FC<HeroPrintCollageProps> = ({ onSelectItemForQuote }) => {
  const { theme, colorMode } = useTheme();
  const isLight = colorMode === 'light';
  const [activeItem, setActiveItem] = useState<CollageItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [zoomModalItem, setZoomModalItem] = useState<CollageItem | null>(null);

  const filteredItems = filterCategory === 'all' 
    ? COLLAGE_ITEMS 
    : COLLAGE_ITEMS.filter(item => {
        if (filterCategory === 'stationery') return item.id === 'business-cards' || item.id === 'wedding-invitations';
        if (filterCategory === 'marketing') return item.id === 'brochures' || item.id === 'flyers' || item.id === 'press-sheets';
        if (filterCategory === 'packaging-books') return item.id === 'pharma-packaging' || item.id === 'books' || item.id === 'catalogues';
        if (filterCategory === 'machinery') return item.id === 'printing-machines';
        return true;
      });

  return (
    <div className={`relative w-full rounded-3xl ${isLight ? 'bg-white/95 border-neutral-200 shadow-2xl' : 'bg-[#09090e]/90 border-white/10 shadow-2xl'} border p-3 sm:p-5 backdrop-blur-md overflow-hidden transition-colors`}>
      
      {/* Studio Lighting & Ambient Flare (Vivid Red) */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(230, 0, 38, 0.3) 0%, rgba(255, 23, 68, 0.1) 45%, transparent 70%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(230, 0, 38, 0.2) 0%, transparent 70%)'
        }}
      />
      
      {/* Top Header of Collage Container: Category Pills + Title */}
      <div className={`relative z-20 flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b ${isLight ? 'border-neutral-200' : 'border-white/10'}`}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF0000] animate-pulse" />
          <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
            MANISHA GRAPHIX · Studio Production Collage
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {[
            { id: 'all', label: 'All 9 Items' },
            { id: 'stationery', label: 'Cards & Suites' },
            { id: 'marketing', label: 'Brochures & Proofs' },
            { id: 'packaging-books', label: 'Packaging & Books' },
            { id: 'machinery', label: 'Press Machinery' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-md transition-all whitespace-nowrap ${
                filterCategory === tab.id
                  ? 'bg-[#FF0000] text-white font-bold shadow-sm'
                  : isLight 
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-neutral-100'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Collage Canvas (Tactile Flatlay & Isometric Composition) */}
      <div className="relative z-10 pt-4 pb-2">
        <div className="grid grid-cols-12 gap-3 sm:gap-4 items-stretch">
          
          {/* ========================================================
              ITEM 1: INDIAN WEDDING INVITATION SUITE (Top Left, 7 Cols)
             ======================================================== */}
          <div 
            onClick={() => setActiveItem(COLLAGE_ITEMS[1])}
            className={`col-span-12 sm:col-span-7 rounded-2xl cursor-pointer group relative overflow-hidden transition-all duration-300 ${
              activeItem?.id === 'wedding-invitations' 
                ? 'ring-2 ring-[#C99A50] scale-[1.01] shadow-2xl shadow-[#C99A50]/20' 
                : 'hover:border-[#C99A50]/50 hover:shadow-xl'
            } bg-gradient-to-br from-[#7a1428] via-[#a81c38] to-[#4c0715] border border-[#C99A50]/30 p-4 sm:p-5`}
          >
            {/* Silk Texture & Golden Filigree Watermark */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffd700_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="relative border border-amber-300/40 rounded-xl p-4 bg-black/25 backdrop-blur-xs flex flex-col justify-between h-full space-y-3">
              <div className="flex items-start justify-between">
                <div className="text-[10px] font-mono font-bold tracking-widest text-amber-200 uppercase flex items-center gap-1.5">
                  <Heart className="w-3 h-3 text-[#C99A50]" />
                  <span>Royal Wedding Invitation</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-black/40 text-[9px] font-mono text-amber-300 border border-amber-300/30">
                  Gold Foil · 600 GSM
                </span>
              </div>

              {/* Calligraphy Header & Ornate Seal */}
              <div className="text-center py-2 space-y-1">
                <div className="text-[11px] font-mono text-amber-200/90 tracking-widest">
                  || श्री गणेशाय नमः ||
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-amber-100">
                  Royal Invitation
                </h3>
                <p className="font-cursive text-amber-200 text-xl font-normal">
                  Save The Blessed Date
                </p>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto my-1" />
                <p className="text-[10px] font-mono text-neutral-300 tracking-wider">
                  Harshil & Mansi · Grand Ballroom
                </p>
              </div>

              {/* Bottom Details with Wax Seal Accent */}
              <div className="flex items-center justify-between pt-2 border-t border-amber-300/20 text-[10px] text-amber-200/90 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#e0b268] via-[#C99A50] to-[#996e2b] flex items-center justify-center font-bold text-black text-[10px] shadow-sm">
                    M
                  </div>
                  <span>Laser-Cut Filigree & Wax Seal</span>
                </div>
                <span className="text-[9px] text-amber-300/70">Click to Inspect</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              ITEM 2: LUXURY BUSINESS CARDS (Top Right, 5 Cols)
             ======================================================== */}
          <div 
            onClick={() => setActiveItem(COLLAGE_ITEMS[0])}
            className={`col-span-12 sm:col-span-5 rounded-2xl cursor-pointer group relative overflow-hidden transition-all duration-300 ${
              activeItem?.id === 'business-cards' 
                ? 'ring-2 ring-[#FF0000] scale-[1.01] shadow-2xl' 
                : 'hover:border-[#C99A50]/40 hover:shadow-xl'
            } bg-[#0e0e14] border border-white/15 p-4 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#FF0000] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C99A50]" />
                <span>Executive Visiting Card</span>
              </span>
              <span className="text-[9px] font-mono text-neutral-400">450 GSM</span>
            </div>

            {/* Front Card: Deep Obsidian Black with Metallic Gold Foil */}
            <div className="my-2.5 rounded-xl bg-neutral-950 border border-neutral-800 p-3 shadow-lg relative overflow-hidden group-hover:border-[#C99A50]/40 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C99A50]/15 via-transparent to-transparent pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-sm tracking-tight text-white uppercase">
                  MANISHA <span className="text-[#FF0000]">GRAPHIX</span>
                </span>
                <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-[#C99A50]/20 text-[#e0b268] border border-[#C99A50]/40">
                  SPOT UV
                </span>
              </div>
              <div className="mt-2 text-xs font-bold text-neutral-200">
                Harshil Mistry
              </div>
              <div className="text-[10px] text-neutral-400 font-mono">
                Owner & Creative Director
              </div>
              <div className="mt-2 flex items-center justify-between text-[9px] text-neutral-400 font-mono">
                <span>+91 97268 03078</span>
                <span className="text-[#C99A50]">Gilded Gold Edges</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-1">
              <span>Velvet Touch & Hot Foil</span>
              <span className="text-[#C99A50] text-[9px]">Inspect →</span>
            </div>
          </div>

          {/* ========================================================
              ITEM 3: CORPORATE TRI-FOLD BROCHURE (Mid Left, 4 Cols)
             ======================================================== */}
          <div 
            onClick={() => setActiveItem(COLLAGE_ITEMS[2])}
            className={`col-span-12 sm:col-span-4 rounded-2xl cursor-pointer group relative overflow-hidden transition-all duration-300 ${
              activeItem?.id === 'brochures' 
                ? 'ring-2 ring-[#FF0000] scale-[1.01]' 
                : 'hover:border-[#C99A50]/40'
            } bg-neutral-900/90 border border-white/10 p-4 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400">
              <span className="text-white font-bold flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#FF0000]" />
                <span>Tri-Fold Brochure</span>
              </span>
              <span className="text-[#C99A50]">Gloss 250 GSM</span>
            </div>

            {/* Simulated 3-Panel Fold Representation */}
            <div className="my-3 grid grid-cols-3 gap-1 rounded-lg bg-black/40 p-2 border border-neutral-800">
              <div className="bg-gradient-to-b from-[#FF0000] to-[#800000] rounded p-1.5 text-white flex flex-col justify-between min-h-[90px]">
                <div className="text-[7px] font-mono font-bold uppercase">Cover</div>
                <div className="font-display font-black text-[10px] leading-tight">MANISHA PRINT</div>
                <div className="text-[6px] opacity-80">2026 Edition</div>
              </div>
              <div className="bg-neutral-950 rounded p-1.5 text-neutral-300 flex flex-col justify-between min-h-[90px] border border-neutral-800">
                <div className="text-[7px] font-mono text-neutral-400">Inside 1</div>
                <div className="space-y-1">
                  <div className="w-full h-1 bg-white/20 rounded" />
                  <div className="w-3/4 h-1 bg-white/20 rounded" />
                  <div className="w-1/2 h-1 bg-white/20 rounded" />
                </div>
                <div className="text-[6px] text-[#C99A50] font-mono">Infographic</div>
              </div>
              <div className="bg-white rounded p-1.5 text-black flex flex-col justify-between min-h-[90px]">
                <div className="text-[7px] font-mono text-neutral-600">Inside 2</div>
                <div className="font-bold text-[9px] leading-tight text-neutral-900">Precision Offset</div>
                <div className="text-[6px] text-[#FF0000] font-mono">Contact Info</div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-neutral-400 truncate">
              Precision Scored & Gloss Coated
            </div>
          </div>

          {/* ========================================================
              ITEM 4: PHARMACEUTICAL PACKAGING (Mid Center, 4 Cols)
             ======================================================== */}
          <div 
            onClick={() => setActiveItem(COLLAGE_ITEMS[6])}
            className={`col-span-12 sm:col-span-4 rounded-2xl cursor-pointer group relative overflow-hidden transition-all duration-300 ${
              activeItem?.id === 'pharma-packaging' 
                ? 'ring-2 ring-emerald-400 scale-[1.01]' 
                : 'hover:border-emerald-400/50'
            } bg-[#0c1218] border border-emerald-500/20 p-4 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between text-[9px] font-mono text-emerald-300">
              <span className="font-bold flex items-center gap-1">
                <Package className="w-3 h-3 text-emerald-400" />
                <span>Pharma Carton Box</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                FDA Compliant
              </span>
            </div>

            {/* Realistic Medicine Carton & Blister Mockup */}
            <div className="my-2.5 rounded-xl bg-white p-3 text-black shadow-lg relative overflow-hidden">
              {/* Tamper Evident Hologram Seal on Corner */}
              <div className="absolute top-1 right-1 w-5 h-5 rounded-xs bg-gradient-to-tr from-cyan-300 via-[#e0b268] to-amber-300 opacity-90 border border-neutral-300 shadow-xs" title="Hologram Security Seal" />
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded bg-emerald-600 flex items-center justify-center text-white text-[8px] font-bold">
                  +
                </div>
                <div className="text-[9px] font-mono font-bold tracking-wider text-emerald-900">
                  MEDIPACK STERILE
                </div>
              </div>
              <div className="font-bold text-xs text-neutral-900 mt-1">
                Amoxicillin 500mg
              </div>
              <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500 mt-1">
                <span>Batch: MG-2026-X</span>
                <span>Exp: 12/2028</span>
              </div>
              {/* Simulated Braille Dots */}
              <div className="mt-1 flex gap-1">
                <span className="w-1 h-1 rounded-full bg-neutral-400" />
                <span className="w-1 h-1 rounded-full bg-neutral-400" />
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span className="w-1 h-1 rounded-full bg-neutral-400" />
                <span className="text-[7px] text-neutral-500 ml-1 font-mono">Braille Embossed</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span>Holographic Tamper Seal</span>
              <span className="text-emerald-400 text-[9px]">Inspect →</span>
            </div>
          </div>

          {/* ========================================================
              ITEM 5: HARDCOVER BOOKS & CATALOGUES (Mid Right, 4 Cols)
             ======================================================== */}
          <div 
            onClick={() => setActiveItem(COLLAGE_ITEMS[7])}
            className={`col-span-12 sm:col-span-4 rounded-2xl cursor-pointer group relative overflow-hidden transition-all duration-300 ${
              activeItem?.id === 'books' 
                ? 'ring-2 ring-amber-400 scale-[1.01]' 
                : 'hover:border-amber-400/50'
            } bg-neutral-950 border border-white/15 p-4 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between text-[9px] font-mono text-amber-300">
              <span className="font-bold flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-amber-400" />
                <span>Hardcover Book Work</span>
              </span>
              <span className="text-neutral-400">Smyth Sewn</span>
            </div>

            {/* Stacked Hardcover Book Spines with Gold Stamping */}
            <div className="my-2.5 space-y-1.5">
              <div className="rounded-lg bg-gradient-to-r from-[#4a0815] via-[#8a1428] to-[#4a0815] p-2.5 border-l-4 border-amber-300 text-white shadow-md flex items-center justify-between">
                <span className="font-serif font-bold text-[11px] text-amber-200 tracking-wide">
                  THE ART OF PRINTING
                </span>
                <span className="text-[8px] font-mono text-amber-300">VOL. I</span>
              </div>
              <div className="rounded-lg bg-neutral-900 p-2.5 border-l-4 border-[#FF0000] text-neutral-200 shadow-md flex items-center justify-between">
                <span className="font-display font-bold text-[11px] text-white">
                  MANISHA CATALOGUE 2026
                </span>
                <span className="text-[8px] font-mono text-[#C99A50]">300 GSM</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span>Textured Cloth & Ribbon</span>
              <span className="text-amber-400 text-[9px]">Inspect →</span>
            </div>
          </div>

          {/* ========================================================
              ITEM 6: OFFSET PRESS MACHINERY & CONTROL CONSOLE (Bottom Left, 6 Cols)
             ======================================================== */}
          <div 
            onClick={() => setActiveItem(COLLAGE_ITEMS[8])}
            className={`col-span-12 sm:col-span-6 rounded-2xl cursor-pointer group relative overflow-hidden transition-all duration-300 ${
              activeItem?.id === 'printing-machines' 
                ? 'ring-2 ring-cyan-400 scale-[1.01]' 
                : 'hover:border-cyan-400/50'
            } bg-gradient-to-br from-[#0c141f] via-[#090d14] to-black border border-cyan-500/30 p-4 sm:p-5 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-cyan-900/40">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300">
                <Printer className="w-3.5 h-3.5 text-cyan-400" />
                <span>5-Color High-Speed Offset Press</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-[9px] font-mono text-cyan-300 border border-cyan-700/50 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                18,000 SPH
              </span>
            </div>

            {/* Architectural Industrial Press Machine Graphic */}
            <div className="my-3 rounded-xl bg-black/60 border border-cyan-950 p-3 space-y-2.5">
              {/* Press Unit Towers with Status LED Strips */}
              <div className="grid grid-cols-5 gap-1.5">
                {['C - Cyan', 'M - Magenta', 'Y - Yellow', 'K - Black', 'UV Varnish'].map((unit, i) => (
                  <div key={unit} className="bg-neutral-900/90 rounded border border-neutral-800 p-1.5 text-center flex flex-col items-center justify-between min-h-[55px]">
                    <span className="text-[7px] font-mono text-neutral-400">Unit 0{i+1}</span>
                    <div className={`w-3.5 h-3.5 rounded-full border ${
                      i === 0 ? 'bg-cyan-400 border-cyan-300' :
                      i === 1 ? 'bg-fuchsia-600 border-fuchsia-400' :
                      i === 2 ? 'bg-amber-300 border-amber-200' :
                      i === 3 ? 'bg-neutral-950 border-neutral-600' :
                      'bg-[#C99A50] border-[#e0b268]'
                    }`} />
                    <span className="text-[7px] font-mono font-bold text-neutral-300">{unit.split(' ')[0]}</span>
                  </div>
                ))}
              </div>

              {/* Digital Touchscreen Prepress Interface Console */}
              <div className="rounded bg-neutral-950 p-2 border border-cyan-900/40 flex items-center justify-between text-[9px] font-mono">
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-neutral-300">Auto-Plate Loader · Spectrodensitometer</span>
                </div>
                <span className="text-emerald-400 font-bold">Delta E &lt; 1.2</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span>Heidelberg Speedmaster XL Series</span>
              <span className="text-cyan-400 text-[9px]">Inspect Machinery →</span>
            </div>
          </div>

          {/* ========================================================
              ITEM 7 & 8: COLORFUL PRINTED SHEETS & MARKETING FLYERS (Bottom Right, 6 Cols)
             ======================================================== */}
          <div 
            onClick={() => setActiveItem(COLLAGE_ITEMS[5])}
            className={`col-span-12 sm:col-span-6 rounded-2xl cursor-pointer group relative overflow-hidden transition-all duration-300 ${
              activeItem?.id === 'press-sheets' || activeItem?.id === 'flyers'
                ? 'ring-2 ring-[#C99A50] scale-[1.01]' 
                : 'hover:border-[#C99A50]/50'
            } bg-neutral-950 border border-white/15 p-4 sm:p-5 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#C99A50]" />
                <span>Press Proofs & Vibrant Marketing Flyers</span>
              </span>
              <span className="text-[9px] font-mono text-[#C99A50]">Pantone Calibrated</span>
            </div>

            {/* CMYK Color Calibration Bars & Registration Marks */}
            <div className="my-3 rounded-xl bg-neutral-900/90 border border-neutral-800 p-3 space-y-2">
              <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400">
                <span>Color Registration Targets ⌖</span>
                <span className="text-white font-bold">Density Check 100%</span>
              </div>

              {/* High-Contrast CMYK Strip */}
              <div className="grid grid-cols-8 gap-1">
                <div className="h-6 rounded bg-[#00ffff] flex items-center justify-center text-[8px] font-mono font-bold text-black">C</div>
                <div className="h-6 rounded bg-[#ff00ff] flex items-center justify-center text-[8px] font-mono font-bold text-white">M</div>
                <div className="h-6 rounded bg-[#ffff00] flex items-center justify-center text-[8px] font-mono font-bold text-black">Y</div>
                <div className="h-6 rounded bg-[#000000] border border-neutral-700 flex items-center justify-center text-[8px] font-mono font-bold text-white">K</div>
                <div className="h-6 rounded bg-[#FF0000] flex items-center justify-center text-[8px] font-mono font-bold text-white">199C</div>
                <div className="h-6 rounded bg-[#C99A50] flex items-center justify-center text-[8px] font-mono font-bold text-white">871C</div>
                <div className="h-6 rounded bg-gradient-to-r from-[#FF0000] to-[#C99A50]" />
                <div className="h-6 rounded bg-gradient-to-r from-amber-400 to-emerald-400" />
              </div>

              {/* Promotional Flyer Mini Card Preview */}
              <div className="rounded bg-gradient-to-r from-[#FF0000]/20 via-[#C99A50]/20 to-transparent p-2 border border-[#C99A50]/30 flex items-center justify-between text-[10px] font-mono">
                <span className="text-white font-bold">MANISHA Marketing Flyer A4</span>
                <span className="text-[#C99A50]">170 GSM Art Gloss</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span>Full Color Test Ramp & Trim Marks</span>
              <span className="text-[#C99A50] text-[9px]">Inspect Proofs →</span>
            </div>
          </div>

        </div>
      </div>

      {/* Signature Cursive Branding Footer Tagline */}
      <div className={`pt-3 border-t ${isLight ? 'border-neutral-200' : 'border-white/10'} flex flex-wrap items-center justify-between gap-3 text-xs`}>
        <div className={`flex items-center gap-2 ${isLight ? 'text-slate-600' : 'text-neutral-400'} font-mono text-[11px]`}>
          <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Branding Palette:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF0000] inline-block" title="Vivid Red (#FF0000)" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#C99A50] inline-block" title="Brand Golden (#C99A50)" />
            <span className="w-2.5 h-2.5 rounded-full bg-white border border-neutral-300 inline-block" title="Pure White (#FFFFFF)" />
            <span className="w-2.5 h-2.5 rounded-full bg-black inline-block" title="Deep Black (#000000)" />
          </span>
          <span className={isLight ? 'text-slate-400' : 'text-neutral-500'}>· Click any item to inspect technical specifications</span>
        </div>

        <div className="font-cursive text-xl sm:text-2xl text-[#FF0000] tracking-wide font-bold">
          "Your Vision, Our Print."
        </div>
      </div>

      {/* Interactive Item Inspector Drawer / Modal */}
      {activeItem && (
        <div 
          role="dialog" 
          aria-label="Item Inspector"
          className={`mt-4 rounded-2xl ${isLight ? 'bg-white border-[#C99A50]/40' : 'bg-neutral-950 border-[#C99A50]/40'} border p-4 sm:p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200`}
        >
          <div className={`flex items-start justify-between pb-3 border-b ${isLight ? 'border-neutral-200' : 'border-neutral-800'}`}>
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded ${isLight ? 'bg-[#C99A50]/15 text-[#FF0000] border-[#C99A50]/40' : 'bg-[#C99A50]/20 text-[#FF0000] border-[#C99A50]/50'} border text-[10px] font-mono uppercase font-bold`}>
                  {activeItem.shortLabel}
                </span>
                <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>Technical Production Spec</span>
              </div>
              <h4 className={`text-lg sm:text-xl font-display font-black ${isLight ? 'text-slate-950' : 'text-white'} mt-1`}>
                {activeItem.name}
              </h4>
            </div>

            <button
              onClick={() => setActiveItem(null)}
              className={`p-1.5 rounded-lg ${isLight ? 'text-slate-400 hover:text-slate-700 hover:bg-neutral-100' : 'text-neutral-400 hover:text-white hover:bg-white/10'} transition-colors`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-neutral-300'} mt-2.5 leading-relaxed`}>
            {activeItem.description}
          </p>

          {/* 4 Technical Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3.5">
            <div className={`p-2.5 rounded-xl ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900 border-neutral-800'} border`}>
              <span className={`text-[10px] font-mono ${isLight ? 'text-slate-400' : 'text-neutral-500'} block uppercase`}>Paper / Material</span>
              <span className={`text-xs font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'} mt-0.5 block`}>{activeItem.specs.material}</span>
            </div>
            <div className={`p-2.5 rounded-xl ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900 border-neutral-800'} border`}>
              <span className={`text-[10px] font-mono ${isLight ? 'text-slate-400' : 'text-neutral-500'} block uppercase`}>Finish & Effects</span>
              <span className="text-xs font-mono font-bold text-[#C99A50] mt-0.5 block">{activeItem.specs.finish}</span>
            </div>
            <div className={`p-2.5 rounded-xl ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900 border-neutral-800'} border`}>
              <span className={`text-[10px] font-mono ${isLight ? 'text-slate-400' : 'text-neutral-500'} block uppercase`}>Press Machinery</span>
              <span className={`text-xs font-mono font-bold ${isLight ? 'text-cyan-700' : 'text-cyan-300'} mt-0.5 block`}>{activeItem.specs.machine}</span>
            </div>
            <div className={`p-2.5 rounded-xl ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900 border-neutral-800'} border`}>
              <span className={`text-[10px] font-mono ${isLight ? 'text-slate-400' : 'text-neutral-500'} block uppercase`}>Turnaround / Speed</span>
              <span className={`text-xs font-mono font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-300'} mt-0.5 block`}>{activeItem.specs.speed}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className={`flex flex-wrap items-center justify-between gap-3 pt-2 border-t ${isLight ? 'border-neutral-200' : 'border-neutral-800'}`}>
            <div className={`flex items-center gap-2 text-xs font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>MANISHA GRAPHIX Certified Quality Guarantee</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (onSelectItemForQuote) {
                    onSelectItemForQuote(activeItem.id);
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF0000] hover:bg-[#D60000] text-white font-mono font-bold text-xs shadow-lg shadow-red-600/30 transition-all hover:scale-102 active:scale-98"
              >
                <span>Request Quote for {activeItem.shortLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
