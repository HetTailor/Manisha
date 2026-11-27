import React, { useState, useEffect, useMemo } from 'react';
import { X, Calculator, Send, CheckCircle, Info, AlertCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, BRAND } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import { EASE_STUDIO } from './MotionPrimitives';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------
type MainCategory = 'stationery-printing' | 'wedding-cards' | 'pharmaceutical-printing' | 'book-work';

type StationeryProduct =
  | 'visiting-cards'
  | 'letterhead'
  | 'bill-book'
  | 'envelope'
  | 'brochure'
  | 'sticker'
  | 'other';

type PharmaProduct =
  | 'labels'
  | 'boxes'
  | 'leaflets'
  | 'artwork'
  | 'other';

type BookProduct =
  | 'cover-design'
  | 'typesetting'
  | 'complete-design'
  | 'other';

// ---------------------------------------------------------------------------
// Reusable Component: 2. Estimated Quantity Selector with Custom Quantity
// ---------------------------------------------------------------------------
interface EstimatedQuantitySelectorProps {
  label?: string;
  unitName: string;
  options: number[];
  quantity: number | 'custom';
  customQty: string;
  onSelectOption: (q: number) => void;
  onSelectCustom: () => void;
  onChangeCustom: (val: string) => void;
  isLight: boolean;
}

const EstimatedQuantitySelector: React.FC<EstimatedQuantitySelectorProps> = ({
  label = '2. Estimated Quantity',
  unitName,
  options,
  quantity,
  customQty,
  onSelectOption,
  onSelectCustom,
  onChangeCustom,
  isLight,
}) => {
  const isCustom = quantity === 'custom';
  const displayQty = isCustom
    ? customQty && Number(customQty) > 0
      ? Number(customQty).toLocaleString()
      : '0'
    : quantity.toLocaleString();

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Keep only numeric characters
    const clean = e.target.value.replace(/[^0-9]/g, '');
    // Remove leading zeros
    const normalized = clean.replace(/^0+/, '');
    onChangeCustom(normalized);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent decimal point, negative sign, plus, exponential notation, comma
    if (['.', ',', '-', '+', 'e', 'E'].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className={`text-xs font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} uppercase font-mono`}>
          {label}
        </label>
        <span className="text-xs font-mono font-bold text-[#FF0000]">
          {displayQty} {unitName}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs font-mono">
        {options.map((q) => {
          const isSelected = !isCustom && quantity === q;
          return (
            <button
              type="button"
              key={q}
              onClick={() => onSelectOption(q)}
              className={`py-1.5 px-3 rounded-lg border text-center font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#FF0000] text-white border-[#FF0000] shadow-sm'
                  : isLight
                    ? 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                    : 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              {q.toLocaleString()}
            </button>
          );
        })}

        {/* Custom Quantity Option Button (Last Option) */}
        <button
          type="button"
          onClick={onSelectCustom}
          className={`py-1.5 px-3 rounded-lg border text-center font-bold transition-all cursor-pointer ${
            isCustom
              ? 'bg-[#FF0000] text-white border-[#FF0000] shadow-sm'
              : isLight
                ? 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                : 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:bg-neutral-800'
          }`}
        >
          Custom Quantity
        </button>
      </div>

      {/* When Custom Quantity is selected, display numeric input field */}
      {isCustom && (
        <div className="mt-2.5">
          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
            Enter Your Required Quantity
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={customQty}
            onChange={handleCustomChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter quantity (e.g., 750)"
            className={`w-full text-xs p-2.5 rounded-lg border font-mono ${
              isLight
                ? 'border-neutral-300 bg-white text-slate-900 placeholder-neutral-400'
                : 'border-neutral-700 bg-neutral-900 text-white placeholder-neutral-500'
            } focus:outline-none focus:border-[#FF0000]`}
          />
          {(!customQty || Number(customQty) <= 0) && (
            <span className="text-[10px] text-red-500 font-mono mt-1 block">
              Please enter a valid positive whole number.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const { colorMode } = useTheme();
  const isLight = colorMode === 'light';

  // -------------------------------------------------------------------------
  // Persistent Customer Fields (Preserved across category switching)
  // -------------------------------------------------------------------------
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // -------------------------------------------------------------------------
  // Category Selection
  // -------------------------------------------------------------------------
  const [category, setCategory] = useState<MainCategory>(
    (preselectedServiceId as MainCategory) || 'stationery-printing'
  );

  // -------------------------------------------------------------------------
  // Stationery & Printing State
  // -------------------------------------------------------------------------
  const [stationeryItem, setStationeryItem] = useState<StationeryProduct>('visiting-cards');
  const [stationeryOtherDesc, setStationeryOtherDesc] = useState('');

  // Visiting Card
  const [vcSize, setVcSize] = useState<'standard' | 'custom'>('standard');
  const [vcCustomWidth, setVcCustomWidth] = useState('3.5');
  const [vcCustomHeight, setVcCustomHeight] = useState('2.0');
  const [vcPrintSide, setVcPrintSide] = useState<'single' | 'double'>('double');
  const [vcQuantity, setVcQuantity] = useState<number | 'custom'>(1000);
  const [vcCustomQty, setVcCustomQty] = useState('1000');
  const [vcPaper, setVcPaper] = useState('350-gsm-board');

  // Letterhead
  const [lhSize, setLhSize] = useState<'a4' | 'custom'>('a4');
  const [lhCustomWidth, setLhCustomWidth] = useState('210');
  const [lhCustomHeight, setLhCustomHeight] = useState('297');
  const [lhPrintType, setLhPrintType] = useState<'colour' | 'bw'>('colour');
  const [lhPaper, setLhPaper] = useState('100-sunshine');
  const [lhQuantity, setLhQuantity] = useState<number | 'custom'>(1000);
  const [lhCustomQty, setLhCustomQty] = useState('1000');

  // Bill Book
  const [bbSize, setBbSize] = useState<'1-8-demy' | '1-4-demy' | '1-2-demy' | 'custom'>('1-8-demy');
  const [bbCustomWidth, setBbCustomWidth] = useState('5.5');
  const [bbCustomHeight, setBbCustomHeight] = useState('8.5');
  const [bbSetsPerBook, setBbSetsPerBook] = useState<'50' | '100'>('50');
  const [bbCopies, setBbCopies] = useState<'duplicate' | 'triplicate' | 'quadruplicate'>('duplicate');
  const [bbQuantity, setBbQuantity] = useState<number | 'custom'>(20);
  const [bbCustomQty, setBbCustomQty] = useState('20');
  const [bbPaperType, setBbPaperType] = useState<'ncr' | 'carbon'>('ncr');
  const [bbNumbering, setBbNumbering] = useState<'yes' | 'no'>('yes');
  const [bbBinding, setBbBinding] = useState<'hard-bound' | 'soft-pad'>('hard-bound');

  // Envelope
  const [envSize, setEnvSize] = useState<'standard-10' | 'a4-doc' | 'banker' | 'custom'>('standard-10');
  const [envCustomWidth, setEnvCustomWidth] = useState('9.5');
  const [envCustomHeight, setEnvCustomHeight] = useState('4.25');
  const [envPrintType, setEnvPrintType] = useState<'single' | 'multicolour'>('multicolour');
  const [envPaper, setEnvPaper] = useState('100-sunshine');
  const [envQuantity, setEnvQuantity] = useState<number | 'custom'>(1000);
  const [envCustomQty, setEnvCustomQty] = useState('1000');

  // Brochure / Flyer
  const [brochureSize, setBrochureSize] = useState<'a4' | 'a5' | 'dl' | 'custom'>('a4');
  const [brochureCustomWidth, setBrochureCustomWidth] = useState('8.27');
  const [brochureCustomHeight, setBrochureCustomHeight] = useState('11.69');
  const [brochureSides, setBrochureSides] = useState<'single' | 'double'>('double');
  const [brochureGsm, setBrochureGsm] = useState('170-art');
  const [brochureFold, setBrochureFold] = useState<'flat' | 'bi-fold' | 'tri-fold'>('bi-fold');
  const [brochureQuantity, setBrochureQuantity] = useState<number | 'custom'>(1000);
  const [brochureCustomQty, setBrochureCustomQty] = useState('1000');

  // Sticker / Label
  const [stickerSize, setStickerSize] = useState<'2x2' | '3x2' | '4x3' | 'custom'>('3x2');
  const [stickerCustomWidth, setStickerCustomWidth] = useState('3.0');
  const [stickerCustomHeight, setStickerCustomHeight] = useState('2.0');
  const [stickerShape, setStickerShape] = useState<'rectangle' | 'circle' | 'die-cut'>('rectangle');
  const [stickerMaterial, setStickerMaterial] = useState('chromo-paper');
  const [stickerQuantity, setStickerQuantity] = useState<number | 'custom'>(1000);
  const [stickerCustomQty, setStickerCustomQty] = useState('1000');

  // -------------------------------------------------------------------------
  // Wedding Cards State
  // -------------------------------------------------------------------------
  const [wcSize, setWcSize] = useState<'small' | 'standard' | 'large' | 'custom' | 'not-sure'>('standard');
  const [wcCustomWidth, setWcCustomWidth] = useState('8.0');
  const [wcCustomHeight, setWcCustomHeight] = useState('6.0');
  const [wcStyle, setWcStyle] = useState<'folded' | 'flat' | 'box' | 'other'>('folded');
  const [wcStyleOther, setWcStyleOther] = useState('');
  const [wcPaperStock, setWcPaperStock] = useState('metallic-shimmer');
  const [wcPrintingPreference, setWcPrintingPreference] = useState('foil-screen');
  const [wcEnvelope, setWcEnvelope] = useState('matching-printed');
  const [wcQuantity, setWcQuantity] = useState<number | 'custom'>(300);
  const [wcCustomQty, setWcCustomQty] = useState('300');

  // -------------------------------------------------------------------------
  // Pharmaceutical Printing State
  // -------------------------------------------------------------------------
  const [pharmaItem, setPharmaItem] = useState<PharmaProduct>('boxes');
  const [pharmaOtherDesc, setPharmaOtherDesc] = useState('');
  const [pharmaServiceScope, setPharmaServiceScope] = useState<'design-only' | 'printing-only' | 'design-and-print'>('design-and-print');
  const [pharmaDimensions, setPharmaDimensions] = useState('Standard Size');
  const [pharmaPaper, setPharmaPaper] = useState('pharma-sbs');
  const [pharmaQuantity, setPharmaQuantity] = useState<number | 'custom'>(5000);
  const [pharmaCustomQty, setPharmaCustomQty] = useState('5000');

  // -------------------------------------------------------------------------
  // Book Work State
  // -------------------------------------------------------------------------
  const [bookItem, setBookItem] = useState<BookProduct>('complete-design');
  const [bookOtherDesc, setBookOtherDesc] = useState('');
  const [bookServiceScope, setBookServiceScope] = useState<'design-only' | 'print-only' | 'design-and-print'>('design-and-print');
  const [bookSize, setBookSize] = useState<'a4' | 'a5' | 'custom'>('a5');
  const [bookCustomWidth, setBookCustomWidth] = useState('5.83');
  const [bookCustomHeight, setBookCustomHeight] = useState('8.27');
  const [bookPageCount, setBookPageCount] = useState<number | 'custom'>(96);
  const [bookCustomPages, setBookCustomPages] = useState('96');
  const [bookInterior, setBookInterior] = useState<'bw' | 'colour' | 'mixed'>('bw');
  const [bookCoverType, setBookCoverType] = useState<'softcover' | 'hardcover' | 'french-flaps'>('softcover');
  const [bookBinding, setBookBinding] = useState<'perfect' | 'hardbound' | 'saddle' | 'spiral'>('perfect');
  const [bookQuantity, setBookQuantity] = useState<number | 'custom'>(500);
  const [bookCustomQty, setBookCustomQty] = useState('500');

  // -------------------------------------------------------------------------
  // Specialty Finishes (Universal across categories where applicable)
  // -------------------------------------------------------------------------
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>(['spot-uv']);

  // Synchronize category if preselectedServiceId changes
  useEffect(() => {
    if (preselectedServiceId && ['stationery-printing', 'wedding-cards', 'pharmaceutical-printing', 'book-work'].includes(preselectedServiceId)) {
      setCategory(preselectedServiceId as MainCategory);
    }
  }, [preselectedServiceId]);

  const toggleFinish = (id: string) => {
    setSelectedFinishes((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // -------------------------------------------------------------------------
  // Handle Category Switching cleanly
  // -------------------------------------------------------------------------
  const handleCategoryChange = (newCat: MainCategory) => {
    if (newCat === category) return;
    setCategory(newCat);
    setFormError('');
    // Clear product-specific configurations to defaults to prevent stale selections
    if (newCat === 'stationery-printing') {
      setStationeryItem('visiting-cards');
      setSelectedFinishes(['spot-uv']);
    } else if (newCat === 'wedding-cards') {
      setWcSize('standard');
      setWcStyle('folded');
      setSelectedFinishes(['hot-foil', 'emboss']);
    } else if (newCat === 'pharmaceutical-printing') {
      setPharmaItem('boxes');
      setPharmaServiceScope('design-and-print');
      setSelectedFinishes([]);
    } else if (newCat === 'book-work') {
      setBookItem('complete-design');
      setBookServiceScope('design-and-print');
      setSelectedFinishes(['spot-uv']);
    }
  };


  // -------------------------------------------------------------------------
  // Form Submission Handler
  // -------------------------------------------------------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!clientName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!clientPhone.trim()) {
      setFormError('Please enter your mobile phone number.');
      return;
    }

    // Indian mobile number check or 10-digit check
    const cleanedPhone = clientPhone.replace(/[\s\-\(\)]/g, '').replace(/^(\+91|91|0)/, '');
    if (!/^[6-9]\d{9}$/.test(cleanedPhone) && cleanedPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number so we can reach you.');
      return;
    }

    // Validate quantities if custom was selected
    let activeQuantity: number | null = null;
    if (category === 'stationery-printing') {
      if (stationeryItem === 'visiting-cards') {
        activeQuantity = vcQuantity === 'custom' ? Number(vcCustomQty) : vcQuantity;
      } else if (stationeryItem === 'letterhead') {
        activeQuantity = lhQuantity === 'custom' ? Number(lhCustomQty) : lhQuantity;
      } else if (stationeryItem === 'bill-book') {
        activeQuantity = bbQuantity === 'custom' ? Number(bbCustomQty) : bbQuantity;
      } else if (stationeryItem === 'envelope') {
        activeQuantity = envQuantity === 'custom' ? Number(envCustomQty) : envQuantity;
      } else if (stationeryItem === 'brochure') {
        activeQuantity = brochureQuantity === 'custom' ? Number(brochureCustomQty) : brochureQuantity;
      } else if (stationeryItem === 'sticker') {
        activeQuantity = stickerQuantity === 'custom' ? Number(stickerCustomQty) : stickerQuantity;
      }
    } else if (category === 'wedding-cards') {
      activeQuantity = wcQuantity === 'custom' ? Number(wcCustomQty) : wcQuantity;
    } else if (category === 'pharmaceutical-printing' && pharmaServiceScope !== 'design-only') {
      activeQuantity = pharmaQuantity === 'custom' ? Number(pharmaCustomQty) : pharmaQuantity;
    } else if (category === 'book-work' && bookServiceScope !== 'design-only') {
      activeQuantity = bookQuantity === 'custom' ? Number(bookCustomQty) : bookQuantity;
    }

    if (activeQuantity !== null && (!activeQuantity || isNaN(activeQuantity) || activeQuantity <= 0)) {
      setFormError('Please enter a valid positive whole number for your required quantity.');
      return;
    }

    // If Custom Size was chosen, validate dimensions
    if (category === 'stationery-printing') {
      if (stationeryItem === 'visiting-cards' && vcSize === 'custom') {
        if (!vcCustomWidth || !vcCustomHeight || Number(vcCustomWidth) <= 0 || Number(vcCustomHeight) <= 0) {
          setFormError('Please enter valid positive custom dimensions for visiting cards.');
          return;
        }
      }
      if (stationeryItem === 'other' && !stationeryOtherDesc.trim()) {
        setFormError('Please describe the custom stationery item you require.');
        return;
      }
    } else if (category === 'wedding-cards' && wcSize === 'custom') {
      if (!wcCustomWidth || !wcCustomHeight || Number(wcCustomWidth) <= 0 || Number(wcCustomHeight) <= 0) {
        setFormError('Please enter valid positive custom dimensions for wedding cards.');
        return;
      }
    }

    setIsSubmitted(true);
  };

  // Build a formatted summary text for confirmation and WhatsApp enquiry
  const quoteSummary = useMemo(() => {
    const lines: string[] = [];
    lines.push(`Category: ${SERVICES.find((s) => s.id === category)?.title || category}`);

    if (category === 'stationery-printing') {
      lines.push(`Item: ${stationeryItem.toUpperCase().replace('-', ' ')}${stationeryItem === 'other' ? ` (${stationeryOtherDesc})` : ''}`);
      if (stationeryItem === 'visiting-cards') {
        lines.push(`Size: ${vcSize === 'custom' ? `${vcCustomWidth} × ${vcCustomHeight} in` : 'Standard (3.5 × 2 in)'}`);
        lines.push(`Printing: ${vcPrintSide === 'double' ? 'Double Sided' : 'Single Sided'}`);
        lines.push(`Quantity: ${vcQuantity === 'custom' ? `${vcCustomQty} (Custom)` : `${vcQuantity} Units`}`);
      } else if (stationeryItem === 'letterhead') {
        lines.push(`Size: ${lhSize === 'custom' ? `${lhCustomWidth} × ${lhCustomHeight} mm` : 'A4'}`);
        lines.push(`Printing: ${lhPrintType === 'colour' ? 'Colour Print' : 'Black & White'}`);
        lines.push(`Quantity: ${lhQuantity === 'custom' ? `${lhCustomQty} (Custom)` : `${lhQuantity} Sheets`}`);
      } else if (stationeryItem === 'bill-book') {
        lines.push(`Size: ${bbSize}`);
        lines.push(`Sets: ${bbSetsPerBook} Sets/Book • Copies: ${bbCopies}`);
        lines.push(`Quantity: ${bbQuantity === 'custom' ? `${bbCustomQty} (Custom)` : `${bbQuantity} Books`}`);
      } else if (stationeryItem === 'envelope') {
        lines.push(`Size: ${envSize === 'custom' ? `${envCustomWidth} × ${envCustomHeight} in` : envSize}`);
        lines.push(`Printing: ${envPrintType === 'multicolour' ? 'Multi-Colour' : 'Single Colour'}`);
        lines.push(`Quantity: ${envQuantity === 'custom' ? `${envCustomQty} (Custom)` : `${envQuantity} Envelopes`}`);
      } else if (stationeryItem === 'brochure') {
        lines.push(`Size: ${brochureSize} • Sides: ${brochureSides}`);
        lines.push(`Fold: ${brochureFold} • Paper: ${brochureGsm}`);
        lines.push(`Quantity: ${brochureQuantity === 'custom' ? `${brochureCustomQty} (Custom)` : `${brochureQuantity} Copies`}`);
      } else if (stationeryItem === 'sticker') {
        lines.push(`Size: ${stickerSize} • Shape: ${stickerShape}`);
        lines.push(`Material: ${stickerMaterial}`);
        lines.push(`Quantity: ${stickerQuantity === 'custom' ? `${stickerCustomQty} (Custom)` : `${stickerQuantity} Stickers`}`);
      }
    } else if (category === 'wedding-cards') {
      lines.push(`Card Size: ${wcSize === 'custom' ? `${wcCustomWidth} × ${wcCustomHeight} in` : wcSize.toUpperCase()}`);
      lines.push(`Card Style: ${wcStyle}${wcStyle === 'other' ? ` (${wcStyleOther})` : ''}`);
      lines.push(`Stock: ${wcPaperStock}`);
      lines.push(`Quantity: ${wcQuantity === 'custom' ? `${wcCustomQty} (Custom)` : `${wcQuantity} Cards`}`);
      lines.push(`Envelope: ${wcEnvelope}`);
    } else if (category === 'pharmaceutical-printing') {
      lines.push(`Pharma Item: ${pharmaItem.toUpperCase()}${pharmaItem === 'other' ? ` (${pharmaOtherDesc})` : ''}`);
      lines.push(`Service Scope: ${pharmaServiceScope}`);
      if (pharmaServiceScope !== 'design-only') {
        lines.push(`Quantity: ${pharmaQuantity === 'custom' ? `${pharmaCustomQty} (Custom)` : `${pharmaQuantity} Units`}`);
      }
    } else if (category === 'book-work') {
      lines.push(`Book Item: ${bookItem.toUpperCase()}${bookItem === 'other' ? ` (${bookOtherDesc})` : ''}`);
      lines.push(`Service Scope: ${bookServiceScope}`);
      lines.push(`Size: ${bookSize === 'custom' ? `${bookCustomWidth} × ${bookCustomHeight} in` : bookSize.toUpperCase()}`);
      lines.push(`Pages: ${bookPageCount === 'custom' ? `${bookCustomPages} Pages` : `${bookPageCount} Pages`}`);
      lines.push(`Interior: ${bookInterior.toUpperCase()} • Cover: ${bookCoverType}`);
      if (bookServiceScope !== 'design-only') {
        lines.push(`Binding: ${bookBinding} • Quantity: ${bookQuantity === 'custom' ? `${bookCustomQty} (Custom)` : `${bookQuantity} Books`}`);
      }
    }

    if (selectedFinishes.length > 0) {
      lines.push(`Finishes: ${selectedFinishes.join(', ')}`);
    }

    if (notes.trim()) {
      lines.push(`Project Notes: ${notes.trim()}`);
    }

    return lines;
  }, [
    category,
    stationeryItem,
    stationeryOtherDesc,
    vcSize,
    vcCustomWidth,
    vcCustomHeight,
    vcPrintSide,
    vcQuantity,
    vcCustomQty,
    lhSize,
    lhCustomWidth,
    lhCustomHeight,
    lhPrintType,
    lhQuantity,
    lhCustomQty,
    bbSize,
    bbSetsPerBook,
    bbCopies,
    bbQuantity,
    bbCustomQty,
    envSize,
    envCustomWidth,
    envCustomHeight,
    envPrintType,
    envQuantity,
    envCustomQty,
    brochureSize,
    brochureSides,
    brochureFold,
    brochureGsm,
    brochureQuantity,
    brochureCustomQty,
    stickerSize,
    stickerShape,
    stickerMaterial,
    stickerQuantity,
    stickerCustomQty,
    wcSize,
    wcCustomWidth,
    wcCustomHeight,
    wcStyle,
    wcStyleOther,
    wcPaperStock,
    wcQuantity,
    wcCustomQty,
    wcEnvelope,
    pharmaItem,
    pharmaOtherDesc,
    pharmaServiceScope,
    pharmaQuantity,
    pharmaCustomQty,
    bookItem,
    bookOtherDesc,
    bookServiceScope,
    bookSize,
    bookCustomWidth,
    bookCustomHeight,
    bookPageCount,
    bookCustomPages,
    bookInterior,
    bookCoverType,
    bookBinding,
    bookQuantity,
    bookCustomQty,
    selectedFinishes,
    notes,
  ]);

  const whatsappMessage = encodeURIComponent(
    `*Quote Request from Manisha Graphix Website*\n\n` +
      `*Client:* ${clientName}\n` +
      `*Phone:* ${clientPhone}\n` +
      (clientEmail ? `*Email:* ${clientEmail}\n` : '') +
      `\n*Specifications:*\n` +
      quoteSummary.map((line) => `• ${line}`).join('\n')
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="quote-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_STUDIO }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            key="quote-modal-card"
            initial={{ opacity: 0, scale: 0.97, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.32, ease: EASE_STUDIO }}
            onClick={(e) => e.stopPropagation()}
            className={`${
              isLight ? 'bg-white border-neutral-200 text-slate-900' : 'bg-neutral-900 border-neutral-800 text-white'
            } border rounded-2xl max-w-3xl w-full max-h-[94vh] flex flex-col shadow-2xl relative transition-colors overflow-hidden my-auto`}
          >
            {/* Sticky Header with Close Button */}
            <div className={`px-6 py-4.5 border-b ${isLight ? 'border-neutral-200 bg-neutral-50/70' : 'border-neutral-800 bg-neutral-950/70'} flex items-center justify-between shrink-0`}>
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-[#FF0000]">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Instant Estimator & Enquiry</span>
                </div>
                <h3 className={`text-xl sm:text-2xl font-display font-extrabold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  Request a Custom Print Quote
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-neutral-400'} mt-0.5`}>
                  Configure your exact job specifications for Manisha Graphix.
                </p>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2, ease: EASE_STUDIO }}
                onClick={onClose}
                className={`p-2 rounded-full ${
                  isLight ? 'text-slate-400 hover:text-slate-800 hover:bg-neutral-200' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                } transition-colors duration-200 cursor-pointer`}
                aria-label="Close quote modal"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto px-6 py-5 sm:p-8 flex-1">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="quote-submitted"
                    initial={{ opacity: 0, scale: 0.97, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -10 }}
                    transition={{ duration: 0.34, ease: EASE_STUDIO }}
                    className="py-6 text-center space-y-5"
                  >
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.38, delay: 0.08, ease: EASE_STUDIO }}
                      className={`w-14 h-14 ${
                        isLight ? 'bg-[#C99A50]/10 border-[#C99A50]/40 text-[#FF0000]' : 'bg-neutral-950 border-red-500/40 text-[#FF0000]'
                      } border rounded-full flex items-center justify-center mx-auto`}
                    >
                      <CheckCircle className="w-8 h-8" />
                    </motion.div>

                    <div>
                      <h3 className={`text-2xl font-display font-extrabold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                        Quotation Request Received!
                      </h3>
                      <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-neutral-300'} max-w-lg mx-auto leading-relaxed mt-1.5`}>
                        Thank you, <strong className={isLight ? 'text-slate-950' : 'text-white'}>{clientName}</strong>. Harshil Mistry from <strong className={isLight ? 'text-slate-950' : 'text-white'}>Manisha Graphix</strong> will personally review your project specifications and contact you at <strong className={isLight ? 'text-slate-950' : 'text-white'}>{clientPhone}</strong>.
                      </p>
                    </div>

                    {/* Summary Card */}
                    <div className={`text-left p-4.5 rounded-xl border ${isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-800' : 'bg-neutral-950 border-neutral-800 text-neutral-300'} text-xs font-mono max-w-xl mx-auto space-y-1.5`}>
                      <div className="font-bold uppercase tracking-wider text-[11px] pb-1 border-b border-neutral-300/60 dark:border-neutral-800 text-[#FF0000]">
                        Submitted Specifications:
                      </div>
                      {quoteSummary.map((line, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#FF0000] shrink-0">•</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                      <motion.a
                        whileHover={{ y: -1.5 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.24, ease: EASE_STUDIO }}
                        href={`https://wa.me/${BRAND.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg shadow-emerald-600/20 transition-colors duration-300 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send Directly on WhatsApp</span>
                      </motion.a>

                      <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.22, ease: EASE_STUDIO }}
                        onClick={() => {
                          setIsSubmitted(false);
                          onClose();
                        }}
                        className={`py-2.5 px-6 ${
                          isLight ? 'bg-neutral-100 hover:bg-neutral-200 text-slate-800' : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                        } rounded-xl text-xs font-mono font-semibold transition-colors duration-250 cursor-pointer`}
                      >
                        Close Window
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="quote-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
              
              {/* ============================================================= */}
              {/* STEP 1: MAIN CATEGORY SELECTION                               */}
              {/* ============================================================= */}
              <div>
                <label className={`block text-xs font-bold ${isLight ? 'text-slate-800' : 'text-neutral-200'} mb-2 uppercase font-mono tracking-wide`}>
                  1. Select Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {SERVICES.map((s) => {
                    const isSelected = category === s.id;
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => handleCategoryChange(s.id as MainCategory)}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#FF0000] text-white border-[#FF0000] shadow-md shadow-red-600/25 ring-2 ring-[#FF0000]/20'
                            : isLight
                              ? 'bg-neutral-50 hover:bg-neutral-100 text-slate-700 border-neutral-300'
                              : 'bg-neutral-950 hover:bg-neutral-850 text-neutral-300 border-neutral-800'
                        }`}
                      >
                        <span className="block leading-tight">{s.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ============================================================= */}
              {/* STEP 2: CATEGORY SPECIFIC FIELDS                              */}
              {/* ============================================================= */}

              {/* ------------------------------------------------------------- */}
              {/* CATEGORY A: STATIONERY & PRINTING                             */}
              {/* ------------------------------------------------------------- */}
              {category === 'stationery-printing' && (
                <div className={`p-4 rounded-xl border ${isLight ? 'bg-neutral-50/60 border-neutral-200' : 'bg-neutral-950/60 border-neutral-800'} space-y-5`}>
                  
                  {/* Product Subcategory Selection */}
                  <div>
                    <label className={`block text-xs font-bold ${isLight ? 'text-slate-800' : 'text-neutral-200'} mb-2 uppercase font-mono`}>
                      What would you like to print?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'visiting-cards', label: 'Visiting Cards' },
                        { id: 'letterhead', label: 'A4 Letterhead / Paper' },
                        { id: 'bill-book', label: 'Bill Book' },
                        { id: 'envelope', label: 'Envelope' },
                        { id: 'brochure', label: 'Brochure / Flyer' },
                        { id: 'sticker', label: 'Sticker / Label' },
                        { id: 'other', label: 'Other' },
                      ].map((item) => {
                        const isSelected = stationeryItem === item.id;
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => setStationeryItem(item.id as StationeryProduct)}
                            className={`py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#FF0000] text-white border-[#FF0000] shadow-sm'
                                : isLight
                                  ? 'bg-white text-slate-700 border-neutral-300 hover:bg-neutral-100'
                                  : 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:bg-neutral-800'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sub-fields for: Visiting Cards */}
                  {stationeryItem === 'visiting-cards' && (
                    <div className="space-y-4 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Size */}
                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                            Card Size
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setVcSize('standard')}
                              className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                                vcSize === 'standard'
                                  ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                  : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                              }`}
                            >
                              Standard (3.5 × 2 in)
                            </button>
                            <button
                              type="button"
                              onClick={() => setVcSize('custom')}
                              className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                                vcSize === 'custom'
                                  ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                  : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                              }`}
                            >
                              Custom Size
                            </button>
                          </div>

                          {vcSize === 'custom' && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div>
                                <label className="text-[10px] text-neutral-500 font-mono">Width (in):</label>
                                <input
                                  type="number"
                                  step="0.1"
                                  min="1"
                                  value={vcCustomWidth}
                                  onChange={(e) => setVcCustomWidth(e.target.value)}
                                  className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                                  placeholder="e.g. 3.5"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-neutral-500 font-mono">Height (in):</label>
                                <input
                                  type="number"
                                  step="0.1"
                                  min="1"
                                  value={vcCustomHeight}
                                  onChange={(e) => setVcCustomHeight(e.target.value)}
                                  className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                                  placeholder="e.g. 2.0"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Printing Sides */}
                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                            Printing Sides
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setVcPrintSide('single')}
                              className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                                vcPrintSide === 'single'
                                  ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                  : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                              }`}
                            >
                              Single Sided
                            </button>
                            <button
                              type="button"
                              onClick={() => setVcPrintSide('double')}
                              className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                                vcPrintSide === 'double'
                                  ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                  : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                              }`}
                            >
                              Double Sided
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Paper Stock */}
                      <div>
                        <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                          Paper Stock & GSM
                        </label>
                        <select
                          value={vcPaper}
                          onChange={(e) => setVcPaper(e.target.value)}
                          className={`w-full text-xs font-medium rounded-lg border ${
                            isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                          } p-2.5 focus:outline-none focus:border-[#FF0000]`}
                        >
                          <option value="350-gsm-board">350 GSM Heavy Rigid Board (Recommended Standard)</option>
                          <option value="300-gsm-matte">300 GSM Premium Matte Art Card</option>
                          <option value="velvet-450">450 GSM Velvet Soft-Touch Imported Board</option>
                          <option value="shimmer-300">Metallic / Gold Shimmer Card Stock</option>
                          <option value="textured">Textured Linen / Laid Natural Board</option>
                        </select>
                      </div>

                      {/* 2. Estimated Quantity Selector with Custom Quantity */}
                      <EstimatedQuantitySelector
                        label="2. Estimated Quantity"
                        unitName="Cards"
                        options={[250, 500, 1000, 2000, 5000]}
                        quantity={vcQuantity}
                        customQty={vcCustomQty}
                        onSelectOption={(q) => setVcQuantity(q)}
                        onSelectCustom={() => setVcQuantity('custom')}
                        onChangeCustom={(val) => setVcCustomQty(val)}
                        isLight={isLight}
                      />
                    </div>
                  )}

                  {/* Sub-fields for: A4 Letterhead / Paper */}
                  {stationeryItem === 'letterhead' && (
                    <div className="space-y-4 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                            Letterhead Size
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setLhSize('a4')}
                              className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                                lhSize === 'a4'
                                  ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                  : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                              }`}
                            >
                              A4 (210 × 297 mm)
                            </button>
                            <button
                              type="button"
                              onClick={() => setLhSize('custom')}
                              className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                                lhSize === 'custom'
                                  ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                  : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                              }`}
                            >
                              Custom Size
                            </button>
                          </div>
                          {lhSize === 'custom' && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div>
                                <label className="text-[10px] text-neutral-500 font-mono">Width (mm):</label>
                                <input
                                  type="number"
                                  min="50"
                                  value={lhCustomWidth}
                                  onChange={(e) => setLhCustomWidth(e.target.value)}
                                  className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                                  placeholder="e.g. 210"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-neutral-500 font-mono">Height (mm):</label>
                                <input
                                  type="number"
                                  min="50"
                                  value={lhCustomHeight}
                                  onChange={(e) => setLhCustomHeight(e.target.value)}
                                  className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                                  placeholder="e.g. 297"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                            Printing Type
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setLhPrintType('colour')}
                              className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                                lhPrintType === 'colour'
                                  ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                  : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                              }`}
                            >
                              Colour Print
                            </button>
                            <button
                              type="button"
                              onClick={() => setLhPrintType('bw')}
                              className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                                lhPrintType === 'bw'
                                  ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                  : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                              }`}
                            >
                              Black & White
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Paper Stock */}
                      <div>
                        <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                          Paper Stock & GSM
                        </label>
                        <select
                          value={lhPaper}
                          onChange={(e) => setLhPaper(e.target.value)}
                          className={`w-full text-xs font-medium rounded-lg border ${
                            isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                          } p-2.5 focus:outline-none focus:border-[#FF0000]`}
                        >
                          <option value="100-sunshine">100 GSM Alabaster / Sunshine Super White</option>
                          <option value="85-bond">85 GSM Executive Bond Paper</option>
                          <option value="120-royal">120 GSM Royal Executive Watermark Bond</option>
                          <option value="kraft-recycled">Textured Kraft / Eco-Recycled Paper</option>
                        </select>
                      </div>

                      {/* 2. Estimated Quantity Selector with Custom Quantity */}
                      <EstimatedQuantitySelector
                        label="2. Estimated Quantity"
                        unitName="Sheets"
                        options={[500, 1000, 2000, 5000]}
                        quantity={lhQuantity}
                        customQty={lhCustomQty}
                        onSelectOption={(q) => setLhQuantity(q)}
                        onSelectCustom={() => setLhQuantity('custom')}
                        onChangeCustom={(val) => setLhCustomQty(val)}
                        isLight={isLight}
                      />
                    </div>
                  )}

                  {/* Sub-fields for: Bill Book */}
                  {stationeryItem === 'bill-book' && (
                    <div className="space-y-4 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                            Book Size
                          </label>
                          <select
                            value={bbSize}
                            onChange={(e) => setBbSize(e.target.value as any)}
                            className={`w-full text-xs font-medium rounded-lg border ${
                              isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                            } p-2.5 focus:outline-none focus:border-[#FF0000]`}
                          >
                            <option value="1-8-demy">1/8 Demy (Approx 4.5 × 7.25 in - Standard Receipt)</option>
                            <option value="1-4-demy">1/4 Demy (Approx 7 × 8.5 in - A5 Bill Book)</option>
                            <option value="1-2-demy">1/2 Demy (Approx 8.5 × 11 in - A4 Tax Invoice)</option>
                            <option value="custom">Custom Size</option>
                          </select>
                          {bbSize === 'custom' && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <input
                                type="text"
                                placeholder="Width (in)"
                                value={bbCustomWidth}
                                onChange={(e) => setBbCustomWidth(e.target.value)}
                                className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                              />
                              <input
                                type="text"
                                placeholder="Height (in)"
                                value={bbCustomHeight}
                                onChange={(e) => setBbCustomHeight(e.target.value)}
                                className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                            Copies (Parts per Set)
                          </label>
                          <div className="grid grid-cols-3 gap-1.5">
                            <button
                              type="button"
                              onClick={() => setBbCopies('duplicate')}
                              className={`py-2 px-1 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                                bbCopies === 'duplicate'
                                  ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                  : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                              }`}
                            >
                              Duplicate (1+1)
                            </button>
                            <button
                              type="button"
                              onClick={() => setBbCopies('triplicate')}
                              className={`py-2 px-1 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                                bbCopies === 'triplicate'
                                  ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                  : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                              }`}
                            >
                              Triplicate (1+2)
                            </button>
                            <button
                              type="button"
                              onClick={() => setBbCopies('quadruplicate')}
                              className={`py-2 px-1 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                                bbCopies === 'quadruplicate'
                                  ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                  : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                              }`}
                            >
                              4-Part (1+3)
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                            Sets Per Book
                          </label>
                          <select
                            value={bbSetsPerBook}
                            onChange={(e) => setBbSetsPerBook(e.target.value as any)}
                            className={`w-full text-xs font-medium rounded-lg border ${
                              isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                            } p-2 focus:outline-none`}
                          >
                            <option value="50">50 Sets per Book</option>
                            <option value="100">100 Sets per Book</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                            Paper Format
                          </label>
                          <select
                            value={bbPaperType}
                            onChange={(e) => setBbPaperType(e.target.value as any)}
                            className={`w-full text-xs font-medium rounded-lg border ${
                              isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                            } p-2 focus:outline-none`}
                          >
                            <option value="ncr">Carbonless NCR Paper</option>
                            <option value="carbon">Standard Paper + Carbon Sheet</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                            Numbering & Binding
                          </label>
                          <select
                            value={bbNumbering}
                            onChange={(e) => setBbNumbering(e.target.value as any)}
                            className={`w-full text-xs font-medium rounded-lg border ${
                              isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                            } p-2 focus:outline-none`}
                          >
                            <option value="yes">With Serial Numbering</option>
                            <option value="no">Without Numbering</option>
                          </select>
                        </div>
                      </div>

                      {/* 2. Estimated Quantity Selector with Custom Quantity */}
                      <EstimatedQuantitySelector
                        label="2. Estimated Quantity (Books)"
                        unitName="Books"
                        options={[10, 20, 50, 100]}
                        quantity={bbQuantity}
                        customQty={bbCustomQty}
                        onSelectOption={(q) => setBbQuantity(q)}
                        onSelectCustom={() => setBbQuantity('custom')}
                        onChangeCustom={(val) => setBbCustomQty(val)}
                        isLight={isLight}
                      />
                    </div>
                  )}

                  {/* Sub-fields for: Envelope */}
                  {stationeryItem === 'envelope' && (
                    <div className="space-y-4 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                            Envelope Size
                          </label>
                          <select
                            value={envSize}
                            onChange={(e) => setEnvSize(e.target.value as any)}
                            className={`w-full text-xs font-medium rounded-lg border ${
                              isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                            } p-2.5 focus:outline-none`}
                          >
                            <option value="standard-10">Standard Office #10 (9.5 × 4.25 in)</option>
                            <option value="a4-doc">A4 Document Envelope (10 × 12 in)</option>
                            <option value="banker">Small Banker Envelope (9 × 4 in)</option>
                            <option value="custom">Custom Dimensions</option>
                          </select>
                          {envSize === 'custom' && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <input
                                type="text"
                                placeholder="Width (in)"
                                value={envCustomWidth}
                                onChange={(e) => setEnvCustomWidth(e.target.value)}
                                className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                              />
                              <input
                                type="text"
                                placeholder="Height (in)"
                                value={envCustomHeight}
                                onChange={(e) => setEnvCustomHeight(e.target.value)}
                                className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                            Printing Type
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setEnvPrintType('multicolour')}
                              className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                                envPrintType === 'multicolour'
                                  ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                  : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                              }`}
                            >
                              Multi-Colour Print
                            </button>
                            <button
                              type="button"
                              onClick={() => setEnvPrintType('single')}
                              className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                                envPrintType === 'single'
                                  ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                  : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                              }`}
                            >
                              Single Colour
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Paper Stock */}
                      <div>
                        <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                          Envelope Paper Stock
                        </label>
                        <select
                          value={envPaper}
                          onChange={(e) => setEnvPaper(e.target.value)}
                          className={`w-full text-xs font-medium rounded-lg border ${
                            isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                          } p-2.5 focus:outline-none`}
                        >
                          <option value="100-sunshine">100 GSM Sunshine Super White Paper</option>
                          <option value="80-maplitho">80 GSM Maplitho White Paper</option>
                          <option value="120-royal">120 GSM Royal Executive Bond</option>
                          <option value="brown-kraft">Unbleached Brown Kraft Heavy Paper</option>
                        </select>
                      </div>

                      {/* 2. Estimated Quantity Selector with Custom Quantity */}
                      <EstimatedQuantitySelector
                        label="2. Estimated Quantity"
                        unitName="Envelopes"
                        options={[500, 1000, 2500, 5000]}
                        quantity={envQuantity}
                        customQty={envCustomQty}
                        onSelectOption={(q) => setEnvQuantity(q)}
                        onSelectCustom={() => setEnvQuantity('custom')}
                        onChangeCustom={(val) => setEnvCustomQty(val)}
                        isLight={isLight}
                      />
                    </div>
                  )}

                  {/* Sub-fields for: Brochure / Flyer */}
                  {stationeryItem === 'brochure' && (
                    <div className="space-y-4 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                            Size
                          </label>
                          <select
                            value={brochureSize}
                            onChange={(e) => setBrochureSize(e.target.value as any)}
                            className={`w-full text-xs font-medium rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'} p-2`}
                          >
                            <option value="a4">A4 (8.27 × 11.69 in)</option>
                            <option value="a5">A5 (5.83 × 8.27 in)</option>
                            <option value="dl">DL Tri-Fold (3.9 × 8.27 in)</option>
                            <option value="custom">Custom Size</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                            Sides
                          </label>
                          <select
                            value={brochureSides}
                            onChange={(e) => setBrochureSides(e.target.value as any)}
                            className={`w-full text-xs font-medium rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'} p-2`}
                          >
                            <option value="single">Single-sided</option>
                            <option value="double">Double-sided</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                            Folding Style
                          </label>
                          <select
                            value={brochureFold}
                            onChange={(e) => setBrochureFold(e.target.value as any)}
                            className={`w-full text-xs font-medium rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'} p-2`}
                          >
                            <option value="flat">Flat (No Fold)</option>
                            <option value="bi-fold">Bi-Fold (Half Fold)</option>
                            <option value="tri-fold">Tri-Fold (C / Z Fold)</option>
                          </select>
                        </div>
                      </div>

                      {brochureSize === 'custom' && (
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Custom Width (in)"
                            value={brochureCustomWidth}
                            onChange={(e) => setBrochureCustomWidth(e.target.value)}
                            className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                          />
                          <input
                            type="text"
                            placeholder="Custom Height (in)"
                            value={brochureCustomHeight}
                            onChange={(e) => setBrochureCustomHeight(e.target.value)}
                            className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                          />
                        </div>
                      )}

                      {/* Paper GSM */}
                      <div>
                        <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                          Paper Stock & GSM
                        </label>
                        <select
                          value={brochureGsm}
                          onChange={(e) => setBrochureGsm(e.target.value)}
                          className={`w-full text-xs font-medium rounded-lg border ${
                            isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                          } p-2.5 focus:outline-none`}
                        >
                          <option value="130-art">130 GSM Gloss / Matte Art Paper (Standard Flyers)</option>
                          <option value="170-art">170 GSM Premium Heavy Art Paper (Corporate Brochures)</option>
                          <option value="250-board">250 GSM Rigid Art Board</option>
                          <option value="300-card">300 GSM Heavy Card Stock</option>
                        </select>
                      </div>

                      {/* 2. Estimated Quantity Selector with Custom Quantity */}
                      <EstimatedQuantitySelector
                        label="2. Estimated Quantity"
                        unitName="Flyers"
                        options={[500, 1000, 2500, 5000]}
                        quantity={brochureQuantity}
                        customQty={brochureCustomQty}
                        onSelectOption={(q) => setBrochureQuantity(q)}
                        onSelectCustom={() => setBrochureQuantity('custom')}
                        onChangeCustom={(val) => setBrochureCustomQty(val)}
                        isLight={isLight}
                      />
                    </div>
                  )}

                  {/* Sub-fields for: Sticker / Label */}
                  {stationeryItem === 'sticker' && (
                    <div className="space-y-4 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                            Size
                          </label>
                          <select
                            value={stickerSize}
                            onChange={(e) => setStickerSize(e.target.value as any)}
                            className={`w-full text-xs font-medium rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'} p-2`}
                          >
                            <option value="2x2">2 × 2 in (Small)</option>
                            <option value="3x2">3 × 2 in (Standard Label)</option>
                            <option value="4x3">4 × 3 in (Product Label)</option>
                            <option value="custom">Custom Size</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                            Shape
                          </label>
                          <select
                            value={stickerShape}
                            onChange={(e) => setStickerShape(e.target.value as any)}
                            className={`w-full text-xs font-medium rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'} p-2`}
                          >
                            <option value="rectangle">Rectangle / Square</option>
                            <option value="circle">Circle / Oval</option>
                            <option value="die-cut">Custom Die-Cut</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                            Material
                          </label>
                          <select
                            value={stickerMaterial}
                            onChange={(e) => setStickerMaterial(e.target.value)}
                            className={`w-full text-xs font-medium rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'} p-2`}
                          >
                            <option value="chromo-paper">Chromo Paper Sticker</option>
                            <option value="waterproof-vinyl">Waterproof Vinyl</option>
                            <option value="transparent-pvc">Transparent PVC</option>
                            <option value="metallic-poly">Metallic Gold / Silver Polyester</option>
                          </select>
                        </div>
                      </div>

                      {stickerSize === 'custom' && (
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Width (in)"
                            value={stickerCustomWidth}
                            onChange={(e) => setStickerCustomWidth(e.target.value)}
                            className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                          />
                          <input
                            type="text"
                            placeholder="Height (in)"
                            value={stickerCustomHeight}
                            onChange={(e) => setStickerCustomHeight(e.target.value)}
                            className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                          />
                        </div>
                      )}

                      {/* 2. Estimated Quantity Selector with Custom Quantity */}
                      <EstimatedQuantitySelector
                        label="2. Estimated Quantity"
                        unitName="Stickers"
                        options={[500, 1000, 2500, 5000]}
                        quantity={stickerQuantity}
                        customQty={stickerCustomQty}
                        onSelectOption={(q) => setStickerQuantity(q)}
                        onSelectCustom={() => setStickerQuantity('custom')}
                        onChangeCustom={(val) => setStickerCustomQty(val)}
                        isLight={isLight}
                      />
                    </div>
                  )}

                  {/* Sub-fields for: Other */}
                  {stationeryItem === 'other' && (
                    <div className="space-y-3 pt-1">
                      <div>
                        <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                          Describe the Printing Item *
                        </label>
                        <input
                          type="text"
                          required
                          value={stationeryOtherDesc}
                          onChange={(e) => setStationeryOtherDesc(e.target.value)}
                          placeholder="e.g. Presentation folders, Desk calendars, Custom hang tags, ID cards..."
                          className={`w-full text-xs p-2.5 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                        />
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* CATEGORY B: WEDDING CARDS                                     */}
              {/* ------------------------------------------------------------- */}
              {category === 'wedding-cards' && (
                <div className={`p-4 rounded-xl border ${isLight ? 'bg-neutral-50/60 border-neutral-200' : 'bg-neutral-950/60 border-neutral-800'} space-y-4`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Card Size */}
                    <div>
                      <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                        Card Size
                      </label>
                      <select
                        value={wcSize}
                        onChange={(e) => setWcSize(e.target.value as any)}
                        className={`w-full text-xs font-medium rounded-lg border ${
                          isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                        } p-2.5 focus:outline-none`}
                      >
                        <option value="standard">Standard (Approx 8 × 6 in)</option>
                        <option value="small">Small / Compact (Approx 5 × 7 in)</option>
                        <option value="large">Large / Regal Gala (Approx 9 × 7 in)</option>
                        <option value="custom">Custom Dimensions</option>
                        <option value="not-sure">Not Sure / Recommend Based on Design</option>
                      </select>

                      {wcSize === 'custom' && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <input
                            type="text"
                            placeholder="Width (in)"
                            value={wcCustomWidth}
                            onChange={(e) => setWcCustomWidth(e.target.value)}
                            className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                          />
                          <input
                            type="text"
                            placeholder="Height (in)"
                            value={wcCustomHeight}
                            onChange={(e) => setWcCustomHeight(e.target.value)}
                            className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                          />
                        </div>
                      )}
                    </div>

                    {/* Card Style */}
                    <div>
                      <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                        Card Style
                      </label>
                      <select
                        value={wcStyle}
                        onChange={(e) => setWcStyle(e.target.value as any)}
                        className={`w-full text-xs font-medium rounded-lg border ${
                          isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                        } p-2.5 focus:outline-none`}
                      >
                        <option value="folded">Folded (Booklet / Gatefold Invitation)</option>
                        <option value="flat">Flat Card (Single / Multi-Insert Suite)</option>
                        <option value="box">Box Style (Rigid Luxury Box Invitation)</option>
                        <option value="other">Other / Custom Concept</option>
                      </select>
                      {wcStyle === 'other' && (
                        <input
                          type="text"
                          placeholder="Describe wedding card style concept"
                          value={wcStyleOther}
                          onChange={(e) => setWcStyleOther(e.target.value)}
                          className={`w-full text-xs p-2 mt-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                        />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Paper or Card Stock */}
                    <div>
                      <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                        Paper / Card Stock
                      </label>
                      <select
                        value={wcPaperStock}
                        onChange={(e) => setWcPaperStock(e.target.value)}
                        className={`w-full text-xs font-medium rounded-lg border ${
                          isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                        } p-2.5 focus:outline-none`}
                      >
                        <option value="metallic-shimmer">Metallic Shimmer Board (300 GSM)</option>
                        <option value="cotton-rag">Handmade Textured Cotton Rag Board</option>
                        <option value="velvet-luxury">Luxury Velvet Soft-Touch Board (450–600 GSM)</option>
                        <option value="acrylic-vellum">Translucent Vellum / Acrylic Accent Suite</option>
                        <option value="not-sure">Not Sure / Show Studio Material Samples</option>
                      </select>
                    </div>

                    {/* Printing Preferences */}
                    <div>
                      <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                        Printing Preferences
                      </label>
                      <select
                        value={wcPrintingPreference}
                        onChange={(e) => setWcPrintingPreference(e.target.value)}
                        className={`w-full text-xs font-medium rounded-lg border ${
                          isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                        } p-2.5 focus:outline-none`}
                      >
                        <option value="foil-screen">Traditional Screen Printing + Gold Foil Highlights</option>
                        <option value="full-offset">Full-Colour Offset with Metallic Inks</option>
                        <option value="digital-run">High-Resolution Digital Short-Run</option>
                      </select>
                    </div>
                  </div>

                  {/* Envelope Requirements */}
                  <div>
                    <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                      Envelope Requirement
                    </label>
                    <select
                      value={wcEnvelope}
                      onChange={(e) => setWcEnvelope(e.target.value)}
                      className={`w-full text-xs font-medium rounded-lg border ${
                        isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                      } p-2.5 focus:outline-none`}
                    >
                      <option value="matching-printed">Matching Designer Printed Envelope Included</option>
                      <option value="plain-textured">Plain Textured / Shimmer Envelope</option>
                      <option value="box-outer">Rigid Box Outer Mailing Enclosure</option>
                      <option value="not-required">Envelopes Not Required</option>
                    </select>
                  </div>

                  {/* 2. Estimated Quantity Selector with Custom Quantity */}
                  <EstimatedQuantitySelector
                    label="2. Estimated Quantity"
                    unitName="Cards"
                    options={[100, 200, 300, 500]}
                    quantity={wcQuantity}
                    customQty={wcCustomQty}
                    onSelectOption={(q) => setWcQuantity(q)}
                    onSelectCustom={() => setWcQuantity('custom')}
                    onChangeCustom={(val) => setWcCustomQty(val)}
                    isLight={isLight}
                  />
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* CATEGORY C: PHARMACEUTICAL PRINTING                           */}
              {/* ------------------------------------------------------------- */}
              {category === 'pharmaceutical-printing' && (
                <div className={`p-4 rounded-xl border ${isLight ? 'bg-neutral-50/60 border-neutral-200' : 'bg-neutral-950/60 border-neutral-800'} space-y-4`}>
                  
                  {/* Pharma Item */}
                  <div>
                    <label className={`block text-xs font-bold ${isLight ? 'text-slate-800' : 'text-neutral-200'} mb-2 uppercase font-mono`}>
                      Pharmaceutical Product Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'boxes', label: 'Medicine Boxes / Mono Cartons' },
                        { id: 'leaflets', label: 'Pharmaceutical Leaflets / Inserts' },
                        { id: 'labels', label: 'Product & Vial Labels' },
                        { id: 'artwork', label: 'Packaging Artwork / Prepress' },
                        { id: 'other', label: 'Other Pharma Print' },
                      ].map((item) => {
                        const isSelected = pharmaItem === item.id;
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => setPharmaItem(item.id as PharmaProduct)}
                            className={`py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {pharmaItem === 'other' && (
                    <div>
                      <label className="text-[10px] text-neutral-500 font-mono uppercase">Describe Item:</label>
                      <input
                        type="text"
                        value={pharmaOtherDesc}
                        onChange={(e) => setPharmaOtherDesc(e.target.value)}
                        placeholder="e.g. Tamper-evident seals, blister backing cards..."
                        className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                      />
                    </div>
                  )}

                  {/* Scope: Clearly distinguish Design-Only from Physical Printing */}
                  <div>
                    <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                      Service Requirement
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'design-only', title: 'Design Only', desc: 'Prepress artwork, dielines & regulatory compliance' },
                        { id: 'design-and-print', title: 'Design & Printing', desc: 'Complete artwork design + physical batch production' },
                        { id: 'printing-only', title: 'Physical Printing Only', desc: 'Production from your approved print-ready files' },
                      ].map((s) => (
                        <button
                          type="button"
                          key={s.id}
                          onClick={() => setPharmaServiceScope(s.id as any)}
                          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                            pharmaServiceScope === s.id
                              ? 'bg-[#C99A50]/15 text-[#FF0000] border-[#FF0000] font-semibold dark:bg-neutral-900 dark:text-white'
                              : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-400'
                          }`}
                        >
                          <span className="block text-xs font-bold">{s.title}</span>
                          <span className="block text-[10px] text-neutral-500 mt-0.5 leading-tight">{s.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dimensions & Specifications */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                        Dimensions / Dieline Size
                      </label>
                      <input
                        type="text"
                        value={pharmaDimensions}
                        onChange={(e) => setPharmaDimensions(e.target.value)}
                        placeholder="e.g. 35 × 35 × 110 mm, or A5 leaflet, or custom"
                        className={`w-full text-xs p-2.5 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                      />
                    </div>

                    <div>
                      <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                        Paper / Material Grade
                      </label>
                      <select
                        value={pharmaPaper}
                        onChange={(e) => setPharmaPaper(e.target.value)}
                        className={`w-full text-xs font-medium rounded-lg border ${
                          isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                        } p-2.5 focus:outline-none`}
                      >
                        <option value="pharma-sbs">SBS Board 300–350 GSM (Barrier Medical Cartons)</option>
                        <option value="pharma-bible">40–50 GSM Lightweight Opaque Bible Paper (Leaflets)</option>
                        <option value="pharma-duplex">Greyback Duplex Board (Economical Outer Cartons)</option>
                        <option value="pharma-label-chromo">Self-Adhesive Chromo Bottle & Ampoule Paper</option>
                      </select>
                    </div>
                  </div>

                  {/* Quantity (Only if Physical Printing is requested) */}
                  {pharmaServiceScope !== 'design-only' ? (
                    <EstimatedQuantitySelector
                      label="2. Estimated Quantity"
                      unitName="Units"
                      options={[1000, 2500, 5000, 10000]}
                      quantity={pharmaQuantity}
                      customQty={pharmaCustomQty}
                      onSelectOption={(q) => setPharmaQuantity(q)}
                      onSelectCustom={() => setPharmaQuantity('custom')}
                      onChangeCustom={(val) => setPharmaCustomQty(val)}
                      isLight={isLight}
                    />
                  ) : (
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        <strong>Design Only Scope:</strong> You will receive print-ready, high-resolution vector artwork with dielines, bleeds, and regulatory layouts. No physical printing costs will be added.
                      </span>
                    </div>
                  )}

                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* CATEGORY D: BOOK WORK                                         */}
              {/* ------------------------------------------------------------- */}
              {category === 'book-work' && (
                <div className={`p-4 rounded-xl border ${isLight ? 'bg-neutral-50/60 border-neutral-200' : 'bg-neutral-950/60 border-neutral-800'} space-y-4`}>
                  
                  {/* Book Item Options */}
                  <div>
                    <label className={`block text-xs font-bold ${isLight ? 'text-slate-800' : 'text-neutral-200'} mb-2 uppercase font-mono`}>
                      Book Project Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'complete-design', label: 'Complete Book Design' },
                        { id: 'cover-design', label: 'Book Cover Design' },
                        { id: 'typesetting', label: 'Layout & Typesetting' },
                        { id: 'other', label: 'Other' },
                      ].map((item) => {
                        const isSelected = bookItem === item.id;
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => setBookItem(item.id as BookProduct)}
                            className={`py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#FF0000] text-white border-[#FF0000]'
                                : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {bookItem === 'other' && (
                    <div>
                      <input
                        type="text"
                        value={bookOtherDesc}
                        onChange={(e) => setBookOtherDesc(e.target.value)}
                        placeholder="Describe book project (e.g. Souvenir magazine, Academic journal, Corporate catalog...)"
                        className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                      />
                    </div>
                  )}

                  {/* Service Requirement */}
                  <div>
                    <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1.5 font-mono uppercase`}>
                      Service Scope
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'design-only', title: 'Design & Typesetting Only', desc: 'Cover, inner layout & print-ready master PDF' },
                        { id: 'design-and-print', title: 'Design & Physical Printing', desc: 'Complete design plus offset book production' },
                        { id: 'print-only', title: 'Printing Only', desc: 'Production from your finished PDF book files' },
                      ].map((s) => (
                        <button
                          type="button"
                          key={s.id}
                          onClick={() => setBookServiceScope(s.id as any)}
                          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                            bookServiceScope === s.id
                              ? 'bg-[#C99A50]/15 text-[#FF0000] border-[#FF0000] font-semibold dark:bg-neutral-900 dark:text-white'
                              : isLight ? 'bg-white border-neutral-300 text-neutral-700' : 'bg-neutral-900 border-neutral-700 text-neutral-400'
                          }`}
                        >
                          <span className="block text-xs font-bold">{s.title}</span>
                          <span className="block text-[10px] text-neutral-500 mt-0.5 leading-tight">{s.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size & Page Count */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                        Book Trim Size
                      </label>
                      <select
                        value={bookSize}
                        onChange={(e) => setBookSize(e.target.value as any)}
                        className={`w-full text-xs font-medium rounded-lg border ${
                          isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                        } p-2.5 focus:outline-none`}
                      >
                        <option value="a5">A5 (5.83 × 8.27 in - Standard Novels & Handbooks)</option>
                        <option value="a4">A4 (8.27 × 11.69 in - Annual Reports & Textbooks)</option>
                        <option value="custom">Custom Size</option>
                      </select>
                      {bookSize === 'custom' && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <input
                            type="text"
                            placeholder="Width (in)"
                            value={bookCustomWidth}
                            onChange={(e) => setBookCustomWidth(e.target.value)}
                            className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                          />
                          <input
                            type="text"
                            placeholder="Height (in)"
                            value={bookCustomHeight}
                            onChange={(e) => setBookCustomHeight(e.target.value)}
                            className={`w-full text-xs p-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                        Estimated Page Count
                      </label>
                      <select
                        value={bookPageCount}
                        onChange={(e) => setBookPageCount(e.target.value === 'custom' ? 'custom' : parseInt(e.target.value, 10))}
                        className={`w-full text-xs font-medium rounded-lg border ${
                          isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                        } p-2.5 focus:outline-none`}
                      >
                        <option value={48}>48 Pages</option>
                        <option value={96}>96 Pages</option>
                        <option value={160}>160 Pages</option>
                        <option value={240}>240 Pages</option>
                        <option value="custom">Custom Page Count</option>
                      </select>
                      {bookPageCount === 'custom' && (
                        <input
                          type="number"
                          min="8"
                          value={bookCustomPages}
                          onChange={(e) => setBookCustomPages(e.target.value)}
                          placeholder="Enter exact total pages"
                          className={`w-full text-xs p-2 mt-2 rounded-lg border ${isLight ? 'border-neutral-300 bg-white' : 'border-neutral-700 bg-neutral-900 text-white'}`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Interior & Cover */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                        Interior Printing
                      </label>
                      <select
                        value={bookInterior}
                        onChange={(e) => setBookInterior(e.target.value as any)}
                        className={`w-full text-xs font-medium rounded-lg border ${
                          isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                        } p-2.5 focus:outline-none`}
                      >
                        <option value="bw">Black & White (Monochrome Text)</option>
                        <option value="colour">Full Colour Interior Pages</option>
                        <option value="mixed">B&W Text with Colour Insert Section</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                        Cover Requirements
                      </label>
                      <select
                        value={bookCoverType}
                        onChange={(e) => setBookCoverType(e.target.value as any)}
                        className={`w-full text-xs font-medium rounded-lg border ${
                          isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                        } p-2.5 focus:outline-none`}
                      >
                        <option value="softcover">Softcover (Paperback - 300 GSM Art Card)</option>
                        <option value="hardcover">Hardcover (Deluxe Rigid Case Bound)</option>
                        <option value="french-flaps">Softcover with French Flap Extensions</option>
                      </select>
                    </div>
                  </div>

                  {/* Binding Preference & 2. Estimated Quantity Selector */}
                  {bookServiceScope !== 'design-only' && (
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                          Binding Preference
                        </label>
                        <select
                          value={bookBinding}
                          onChange={(e) => setBookBinding(e.target.value as any)}
                          className={`w-full text-xs font-medium rounded-lg border ${
                            isLight ? 'border-neutral-300 bg-white text-slate-900' : 'border-neutral-700 bg-neutral-900 text-white'
                          } p-2.5 focus:outline-none`}
                        >
                          <option value="perfect">Perfect Binding (Glued Square Spine)</option>
                          <option value="hardbound">Section Sewn Hardcover Binding</option>
                          <option value="saddle">Saddle Stitch (Center Stapled, for &lt;64 pgs)</option>
                          <option value="spiral">Spiral / Wire-O Binding</option>
                        </select>
                      </div>

                      {/* 2. Estimated Quantity Selector with Custom Quantity */}
                      <EstimatedQuantitySelector
                        label="2. Estimated Quantity"
                        unitName="Books"
                        options={[100, 250, 500, 1000]}
                        quantity={bookQuantity}
                        customQty={bookCustomQty}
                        onSelectOption={(q) => setBookQuantity(q)}
                        onSelectCustom={() => setBookQuantity('custom')}
                        onChangeCustom={(val) => setBookCustomQty(val)}
                        isLight={isLight}
                      />
                    </div>
                  )}

                </div>
              )}

              {/* ============================================================= */}
              {/* STEP 3: SPECIALTY FINISHES & EMBELLISHMENTS (PRESERVED)      */}
              {/* ============================================================= */}
              <div>
                <label className={`block text-xs font-bold ${isLight ? 'text-slate-800' : 'text-neutral-200'} mb-1.5 uppercase font-mono tracking-wide`}>
                  Specialty Finishes & Embellishments
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'spot-uv', label: 'Spot UV Gloss' },
                    { id: 'hot-foil', label: 'Hot Foil Stamping' },
                    { id: 'emboss', label: 'Blind Embossing' },
                    { id: 'velvet-lam', label: 'Velvet Lamination' },
                    { id: 'die-cut', label: 'Custom Die-Cut' },
                    { id: 'other-finish', label: 'Other / Not Sure' },
                  ].map((finish) => {
                    const isChecked = selectedFinishes.includes(finish.id);
                    return (
                      <button
                        type="button"
                        key={finish.id}
                        onClick={() => toggleFinish(finish.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                          isChecked
                            ? isLight
                              ? 'bg-[#C99A50]/15 text-[#FF0000] border-[#FF0000] font-semibold'
                              : 'bg-neutral-950 text-white border-[#FF0000] font-semibold'
                            : isLight
                              ? 'bg-white border-neutral-300 text-slate-700 hover:bg-neutral-50'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:bg-neutral-850'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{finish.label}</span>
                          <span
                            className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] font-bold ${
                              isChecked
                                ? 'bg-[#FF0000] border-[#FF0000] text-white'
                                : isLight ? 'border-neutral-400' : 'border-neutral-700'
                            }`}
                          >
                            {isChecked ? '✓' : ''}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ============================================================= */}
              {/* STEP 5: CLIENT CONTACT DETAILS                                */}
              {/* ============================================================= */}
              <div className="space-y-3">
                <label className={`block text-xs font-bold ${isLight ? 'text-slate-800' : 'text-neutral-200'} uppercase font-mono tracking-wide`}>
                  Your Contact Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className={`block text-[11px] font-semibold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1`}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Enter full name"
                      className={`w-full text-xs rounded-lg border ${
                        isLight ? 'border-neutral-300 bg-white text-slate-900 placeholder-neutral-400' : 'border-neutral-700 bg-neutral-950 text-white'
                      } p-2.5 focus:outline-none focus:border-[#FF0000]`}
                    />
                  </div>

                  <div>
                    <label className={`block text-[11px] font-semibold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1`}>
                      Mobile Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className={`w-full text-xs rounded-lg border ${
                        isLight ? 'border-neutral-300 bg-white text-slate-900 placeholder-neutral-400' : 'border-neutral-700 bg-neutral-950 text-white'
                      } p-2.5 focus:outline-none focus:border-[#FF0000]`}
                    />
                  </div>

                  <div>
                    <label className={`block text-[11px] font-semibold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1`}>
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="name@example.com"
                      className={`w-full text-xs rounded-lg border ${
                        isLight ? 'border-neutral-300 bg-white text-slate-900 placeholder-neutral-400' : 'border-neutral-700 bg-neutral-950 text-white'
                      } p-2.5 focus:outline-none focus:border-[#FF0000]`}
                    />
                  </div>
                </div>
              </div>

              {/* ============================================================= */}
              {/* STEP 6: EXISTING PROJECT NOTES (OPTIONAL) FIELD               */}
              {/* ============================================================= */}
              <div>
                <label className={`block text-[11px] font-semibold ${isLight ? 'text-slate-700' : 'text-neutral-300'} mb-1 font-mono uppercase`}>
                  Project Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any extra requirements? Write them here…"
                  className={`w-full text-xs rounded-lg border ${
                    isLight ? 'border-neutral-300 bg-white text-slate-900 placeholder-neutral-400' : 'border-neutral-700 bg-neutral-950 text-white'
                  } p-2.5 focus:outline-none focus:border-[#FF0000] resize-none`}
                />
              </div>

              {/* Error Message banner if validation fails */}
              <AnimatePresence>
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 rounded-lg bg-[#C99A50]/10 border border-[#C99A50]/30 text-neutral-800 dark:text-neutral-200 text-xs flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Submit Button */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  whileHover={{ y: -1.5 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.24, ease: EASE_STUDIO }}
                  className="group w-full py-3.5 px-4 font-bold text-xs rounded-xl transition-[background-color,box-shadow] duration-300 shadow-xl flex items-center justify-center gap-2 bg-[#FF0000] hover:bg-[#D60000] text-white shadow-red-600/25 hover:shadow-red-600/40 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                  <span>Submit Quote Request to Harshil Mistry</span>
                </motion.button>
              </div>

                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
