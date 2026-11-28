import React, { useState, useEffect } from 'react';
import { ArrowRight, Eye, X, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../context/NavigationContext';
import { BRAND } from '../data/content';
import {
  Reveal,
  MaskedTextReveal,
  EASE_STUDIO,
  VIEWPORT_ONCE,
} from '../components/MotionPrimitives';

interface PortfolioPageProps {
  onOpenQuoteModal: () => void;
  onSelectServiceForQuote: (serviceId: string) => void;
}

type PortfolioCategory = 'stationery' | 'wedding-cards' | 'pharma' | 'books';

interface DesignDetail {
  label: string;
  value: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string;
  image: string;
  description: string;
  designType: string;
  designConcept: string;
  visualElements: string;
  availableDetails: DesignDetail[];
  serviceId: string;
}

interface PortfolioImageProps {
  src: string;
  alt: string;
  title: string;
  categoryLabel: string;
  variant?: 'card' | 'modal';
  index?: number;
}

const PortfolioImage: React.FC<PortfolioImageProps> = ({
  src,
  alt,
  title,
  categoryLabel,
  variant = 'card',
  index = 0,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const safeSrc = encodeURI(src);

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6 text-center bg-neutral-950 text-neutral-300">
        <ImageIcon className="w-7 h-7 text-[#C99A50]" />
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#C99A50]">
          {categoryLabel}
        </span>
        <span className="text-xs font-sans text-white/90 line-clamp-2 max-w-[220px]">
          {title}
        </span>
      </div>
    );
  }

  if (variant === 'modal') {
    return (
      <div className="relative flex items-center justify-center max-h-[58vh] w-auto max-w-full">
        {!isLoaded && (
          <div className="absolute inset-0 bg-neutral-800 animate-pulse rounded-lg flex items-center justify-center">
            <span className="text-xs text-neutral-400 font-mono">Loading high-res view...</span>
          </div>
        )}
        <img
          src={safeSrc}
          alt={alt}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`max-h-[58vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center p-3 bg-gradient-to-b from-neutral-50 to-neutral-100/90 dark:from-[#181824] dark:to-[#101018] overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-200/80 dark:bg-neutral-800/80 animate-pulse flex items-center justify-center">
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono uppercase tracking-wider">Loading...</span>
        </div>
      )}
      <img
        src={safeSrc}
        alt={alt}
        width={800}
        height={600}
        loading={index < 3 ? 'eager' : 'lazy'}
        fetchPriority={index === 0 ? 'high' : 'auto'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-contain drop-shadow-sm transition-all duration-700 ease-out group-hover:scale-[1.045] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onOpenQuoteModal,
  onSelectServiceForQuote,
}) => {
  const { navigate } = useNavigation();
  const [activeCategory, setActiveCategory] = useState<'all' | PortfolioCategory>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

  const portfolioItems: PortfolioItem[] = [
    // A. STATIONERY — 4 PROJECTS
    {
      id: 'stationery-curved-teal-card',
      title: 'Curved Teal Corporate Visiting Card Design',
      category: 'stationery',
      categoryLabel: 'Stationery',
      image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/11/Untitled-design.jpg',
      description:
        'Clean two-tone visiting card pairing a crisp white logo section with a vibrant teal contact panel separated by layered curved ribbons.',
      designType: 'Visiting Card Design',
      designConcept:
        'Establishes a fresh corporate identity using rhythmic swooping bands that guide the eye cleanly from the geometric emblem to the contact details.',
      visualElements:
        'Interlocking teal geometric square emblem, bold uppercase brand lockup, triple-layered curved divider bands, clean sans-serif typography, and icon-aligned contact list.',
      availableDetails: [
        { label: 'Design Category', value: 'Stationery · Visiting Card Design' },
        { label: 'Orientation', value: 'Horizontal Card Layout' },
        { label: 'Visual Style', value: 'Modern Curved Two-Tone Corporate' },
        { label: 'Color Palette', value: 'Teal, Aqua Tint, White & Black' },
      ],
      serviceId: 'stationery-printing',
    },
    {
      id: 'stationery-minimalist-slate-card',
      title: 'Minimalist Geometric Slate Visiting Card',
      category: 'stationery',
      categoryLabel: 'Stationery',
      image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/11/Untitled-Design1.jpg',
      description:
        'Contemporary monochrome visiting card built around a sharp diagonal charcoal-and-slate split, isometric cube emblem, and crisp white typography.',
      designType: 'Visiting Card Design',
      designConcept:
        'Communicates architectural clarity and modern precision through cool slate geometry, disciplined negative space, and right-aligned contact hierarchy.',
      visualElements:
        'White isometric stacked-frame mark, diagonal two-tone slate split, crisp white diagonal accent line, italic role subtitle, and right-aligned contact icons.',
      availableDetails: [
        { label: 'Design Category', value: 'Stationery · Visiting Card Design' },
        { label: 'Orientation', value: 'Horizontal Card Layout' },
        { label: 'Visual Style', value: 'Minimalist Geometric Monochrome' },
        { label: 'Color Palette', value: 'Deep Charcoal, Slate Gray & White' },
      ],
      serviceId: 'stationery-printing',
    },
    {
      id: 'stationery-black-gold-card',
      title: 'Luxury Black & Gold Wave Visiting Card',
      category: 'stationery',
      categoryLabel: 'Stationery',
      image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/11/Untitled-Design2.jpg',
      description:
        'Executive visiting card pairing a jet-black canvas with luminous flowing gold wave contours, botanical crest, and refined serif typography.',
      designType: 'Visiting Card Design',
      designConcept:
        'Delivers understated prestige by contrasting deep black negative space against flowing golden ribbon forms and stately serif lettering.',
      visualElements:
        'Flowing metallic-look gold wave curves, botanical leaf brand crest, serif name and title lockup, and matching circular gold contact icons.',
      availableDetails: [
        { label: 'Design Category', value: 'Stationery · Visiting Card Design' },
        { label: 'Orientation', value: 'Horizontal Card Layout' },
        { label: 'Visual Style', value: 'Executive Luxury & Flowing Contours' },
        { label: 'Color Palette', value: 'Jet Black & Warm Gold' },
      ],
      serviceId: 'stationery-printing',
    },
    {
      id: 'stationery-black-yellow-letterhead',
      title: 'Modern Black & Yellow Corporate Letterhead',
      category: 'stationery',
      categoryLabel: 'Stationery',
      image:
        'https://het.assistwebstudio.in/wp-content/uploads/2026/11/Black-and-Yellow-Modern-Minimalist-Company-Letterhead-A4.jpg',
      description:
        'Minimalist company letterhead featuring a bold black-and-yellow geometric header block, structured contact icons, clean white body zone, and matching angled footer.',
      designType: 'Company Letterhead Design',
      designConcept:
        'Frames formal business correspondence with high-contrast black and warm yellow geometric bands while preserving generous, readable white space for letter content.',
      visualElements:
        'Angled black trapezoid logo badge with white botanical icon, warm yellow header banner, icon-led phone/email/website block, clear typographic body area, and mirrored angled footer bands.',
      availableDetails: [
        { label: 'Design Category', value: 'Stationery · Company Letterhead Design' },
        { label: 'Orientation', value: 'Portrait Letterhead Layout' },
        { label: 'Visual Style', value: 'Modern Minimalist Geometric Corporate' },
        { label: 'Color Palette', value: 'Black, Warm Yellow & Pure White' },
      ],
      serviceId: 'stationery-printing',
    },

    // B. WEDDING CARDS — 5 PROJECTS
    {
      id: 'wedding-traditional-gujarati-suite',
      title: 'Traditional Gujarati Wedding Invitation & Envelope Suite',
      category: 'wedding-cards',
      categoryLabel: 'Wedding Cards',
      image:
        'https://het.assistwebstudio.in/wp-content/uploads/2026/11/bf8d25b2-5078-4076-ac59-1b860a37aafa.png',
      description:
        'Classic cream-and-vermilion Gujarati wedding invitation card paired with a coordinated addressed envelope adorned with traditional ceremonial motifs.',
      designType: 'Wedding Invitation & Envelope',
      designConcept:
        'Honors traditional Gujarati wedding aesthetics with warm ivory tones, auspicious vermilion red ink, symmetrical event frames, and clear Gujarati ceremonial typography.',
      visualElements:
        'Lord Ganesha emblem on the envelope, traditional swastik and ornate arch borders, bride-and-groom ceremonial artwork, structured event schedule blocks, and lined guest addressing space.',
      availableDetails: [
        { label: 'Design Category', value: 'Wedding Cards · Invitation & Envelope' },
        { label: 'Script & Language', value: 'Gujarati' },
        { label: 'Visual Style', value: 'Traditional Ceremonial Heritage' },
        { label: 'Color Palette', value: 'Warm Cream & Vermilion Red' },
      ],
      serviceId: 'wedding-cards',
    },
    {
      id: 'wedding-blue-gold-watercolor-invitation',
      title: 'Blue & Gold Watercolor Floral Wedding Invitation',
      category: 'wedding-cards',
      categoryLabel: 'Wedding Cards',
      image:
        'https://het.assistwebstudio.in/wp-content/uploads/2026/11/Blue-and-Gold-Watercolor-Floral-Wedding-Invitation.png',
      description:
        'Graceful portrait wedding invitation framed by a delicate double gold arch and soft hand-painted blue watercolor roses with eucalyptus foliage.',
      designType: 'Wedding Invitation Design',
      designConcept:
        'Balances airy white space and fine geometric gold linework with lush blue botanical watercolor bouquets for a refined contemporary celebration aesthetic.',
      visualElements:
        'Double-line arched gold border, clustered royal-blue and sky-blue watercolor roses with sage leaves, flowing calligraphy couple names, and watercolor heart date accent.',
      availableDetails: [
        { label: 'Design Category', value: 'Wedding Cards · Wedding Invitation' },
        { label: 'Orientation', value: 'Portrait Card Layout' },
        { label: 'Visual Style', value: 'Botanical Watercolor & Gold Arch Frame' },
        { label: 'Color Palette', value: 'Royal Blue, Soft Sky, Sage & Gold' },
      ],
      serviceId: 'wedding-cards',
    },
    {
      id: 'wedding-blue-watercolor-greeting-card',
      title: 'Blue Watercolor Wildflower Wedding Greeting Card',
      category: 'wedding-cards',
      categoryLabel: 'Wedding Cards',
      image:
        'https://het.assistwebstudio.in/wp-content/uploads/2026/11/Blue-Watercolor-Flower-Wedding-Greeting-Card.png',
      description:
        'Landscape wedding greeting card combining a blooming left-edge bouquet of watercolor wildflowers with graceful navy script and personal message lines.',
      designType: 'Wedding Greeting Card',
      designConcept:
        'Uses an asymmetric horizontal composition where expressive botanical artwork anchors the left side while soft tinted open space highlights the congratulatory script.',
      visualElements:
        'Hand-painted blue roses, daisies, cornflowers, and hydrangeas over a soft cream-to-powder-blue wash, sweeping navy calligraphy heading, and dotted For/From signature lines.',
      availableDetails: [
        { label: 'Design Category', value: 'Wedding Cards · Wedding Greeting Card' },
        { label: 'Orientation', value: 'Landscape Card Layout' },
        { label: 'Visual Style', value: 'Asymmetric Watercolor Floral Illustration' },
        { label: 'Color Palette', value: 'Navy Blue, Periwinkle, Sage & Soft Cream' },
      ],
      serviceId: 'wedding-cards',
    },
    {
      id: 'wedding-red-pink-watercolor-card',
      title: 'Crimson & Blush Watercolor Floral Wedding Invitation',
      category: 'wedding-cards',
      categoryLabel: 'Wedding Cards',
      image:
        'https://het.assistwebstudio.in/wp-content/uploads/2026/11/Red-and-Pink-Watercolor-Floral-Wedding-Card.jpg',
      description:
        'Romantic portrait wedding invitation framed by vibrant crimson, rose-pink, and peach watercolor blossoms over a delicate blush backdrop.',
      designType: 'Wedding Invitation Design',
      designConcept:
        'Surrounds clean centered event details with warm floral clusters and a soft blush watercolor wash for a welcoming, celebratory visual tone.',
      visualElements:
        'Crimson, blush-pink, and coral watercolor flowers with olive foliage, graceful dark script couple names, clean ceremony detail typography, and soft rose vignette framing.',
      availableDetails: [
        { label: 'Design Category', value: 'Wedding Cards · Wedding Invitation' },
        { label: 'Orientation', value: 'Portrait Card Layout' },
        { label: 'Visual Style', value: 'Botanical Watercolor Floral Border' },
        { label: 'Color Palette', value: 'Crimson Red, Blush Pink, Peach & Olive' },
      ],
      serviceId: 'wedding-cards',
    },
    {
      id: 'wedding-heritage-gujarati-bifold',
      title: 'Heritage Gujarati Bifold Wedding Card & Envelope Suite',
      category: 'wedding-cards',
      categoryLabel: 'Wedding Cards',
      image:
        'https://het.assistwebstudio.in/wp-content/uploads/2026/11/Gemini_Generated_Image_1i1ppn1i1ppn1i1p.png',
      description:
        'Ornate bifold Gujarati wedding invitation card paired with a matching ceremonial envelope designed in rich maroon ink on a warm cream palette.',
      designType: 'Bifold Wedding Card & Envelope',
      designConcept:
        'Showcases classic Indian wedding invitation craftsmanship through structured multi-panel ceremony layouts, ornamental corner flourishes, and coordinated envelope branding.',
      visualElements:
        'Lord Ganesha illustration and decorative ribbon crest on the envelope, ornate traditional corner borders, ceremonial wedding couple and procession line artwork, and framed guest address block.',
      availableDetails: [
        { label: 'Design Category', value: 'Wedding Cards · Bifold Suite & Envelope' },
        { label: 'Script & Language', value: 'Gujarati' },
        { label: 'Visual Style', value: 'Classic Ornate Ceremonial Heritage' },
        { label: 'Color Palette', value: 'Warm Cream & Auspicious Deep Maroon' },
      ],
      serviceId: 'wedding-cards',
    },

    // C. PHARMACEUTICAL — 6 PROJECTS
    {
      id: 'pharma-dyacid-suspension',
      title: 'Dyacid 100 ml Oral Suspension Carton & Bottle Label',
      category: 'pharma',
      categoryLabel: 'Pharmaceutical',
      image:
        'https://het.assistwebstudio.in/wp-content/uploads/2026/11/6a7ae62a-2bdc-4ae6-be84-7478a8ad4ff3.png',
      description:
        'Coordinated pharmaceutical medicine carton and bottle label design for a mint-flavored oral suspension featuring clear clinical typography.',
      designType: 'Medicine Box & Bottle Label',
      designConcept:
        'Pairs soothing mint-green and warm yellow gradients with an illuminated digestive-relief graphic so pharmacists and patients can identify the product and flavor immediately.',
      visualElements:
        'Bold blue-to-red gradient "Dyacid" wordmark with leaf accent, circular digestive illustration, "Mint Flavour" callout, structured composition panels, QR code, and coordinated bottle wrap label.',
      availableDetails: [
        { label: 'Packaging Format', value: 'Outer Medicine Box & Bottle Label' },
        { label: 'Displayed Volume', value: '100 ml Oral Suspension' },
        { label: 'Labeling Language', value: 'Portuguese & English' },
        { label: 'Color Palette', value: 'Mint Green, Warm Yellow, Blue & Red' },
      ],
      serviceId: 'pharmaceutical-printing',
    },
    {
      id: 'pharma-dhyartem-injection',
      title: 'Dhyartem 80 Injection Carton & Ampoule Label',
      category: 'pharma',
      categoryLabel: 'Pharmaceutical',
      image:
        'https://het.assistwebstudio.in/wp-content/uploads/2026/11/89adf5cd-1888-4f8f-b3f2-72273397cac8.png',
      description:
        'Bilingual antimalarial injection carton and matching ampoule label designed for high-contrast clinical readability and instant dosage recognition.',
      designType: 'Injection Box & Ampoule Label',
      designConcept:
        'Uses a bold yellow and clean white sweeping arch layout to organize bilingual product titles, therapeutic icons, dosage callouts, and intramuscular usage notices.',
      visualElements:
        'Bilingual English/Portuguese clinical typography, diagonal syringe line drawing, antimalarial mosquito emblem, bold "For IM Use Only" notice, and vertically aligned ampoule label.',
      availableDetails: [
        { label: 'Packaging Format', value: 'Outer Carton & Ampoule Label' },
        { label: 'Displayed Pack Info', value: '6 x 1 ml Ampoules (80 mg/ml)' },
        { label: 'Labeling Language', value: 'Bilingual (English / Portuguese)' },
        { label: 'Color Palette', value: 'Bright Yellow, Clean White, Red & Blue' },
      ],
      serviceId: 'pharmaceutical-printing',
    },
    {
      id: 'pharma-sudytrim-suspension',
      title: 'Sudytrim 60 ml Oral Suspension Packaging Suite',
      category: 'pharma',
      categoryLabel: 'Pharmaceutical',
      image:
        'https://het.assistwebstudio.in/wp-content/uploads/2026/11/833dec77-8a4f-4e9b-aa50-1c2448f5c4ce.png',
      description:
        'Pharmaceutical medicine carton and bottle label design for an oral suspension featuring structured medical typography and anatomical illustrations.',
      designType: 'Medicine Box & Bottle Label',
      designConcept:
        'Anchors product identity with bold royal-blue typography over a fresh teal-green canvas and a luminous yellow focal circle illustrating therapeutic application areas.',
      visualElements:
        'Distinctive serif-styled "Sudytrim" wordmark, anatomical medical icons, structured side composition and barcode panels, and matching 60 ml bottle wrap label.',
      availableDetails: [
        { label: 'Packaging Format', value: 'Outer Medicine Box & Bottle Label' },
        { label: 'Displayed Volume', value: '60 ml Oral Suspension BP' },
        { label: 'Labeling Language', value: 'Portuguese' },
        { label: 'Color Palette', value: 'Teal Green, Luminous Yellow, Royal Blue & White' },
      ],
      serviceId: 'pharmaceutical-printing',
    },
    {
      id: 'pharma-dyalcip-tablets',
      title: 'Dyalcip 500 mg Tablet Carton Packaging',
      category: 'pharma',
      categoryLabel: 'Pharmaceutical',
      image:
        'https://het.assistwebstudio.in/wp-content/uploads/2026/11/ChatGPT-Image-Nov-13-2026-10_55_21-AM.png',
      description:
        'Clean pharmaceutical outer box design for 500 mg antibiotic tablets with fresh green color coding and structured regulatory side panels.',
      designType: 'Tablet Medicine Box',
      designConcept:
        'Pairs an open mint-white primary face with curved lime and deep forest-green bands to present dosage strength, pack count, and clinical indications clearly.',
      visualElements:
        'Stylized green "Dyalcip" logotype, 10 x 10 pack count indicator, curved two-tone green band with tablet visual, indication callouts, composition side panel, and QR code.',
      availableDetails: [
        { label: 'Packaging Format', value: 'Outer Tablet Carton' },
        { label: 'Displayed Pack Info', value: '500 mg · 10 x 10 Comprimidos' },
        { label: 'Labeling Language', value: 'Portuguese' },
        { label: 'Color Palette', value: 'Mint White, Lime Green & Deep Forest Green' },
      ],
      serviceId: 'pharmaceutical-printing',
    },
    {
      id: 'pharma-dyamox-capsules',
      title: 'Dyamox-500 Capsule Carton Packaging',
      category: 'pharma',
      categoryLabel: 'Pharmaceutical',
      image:
        'https://het.assistwebstudio.in/wp-content/uploads/2026/11/ChatGPT-Image-Nov-13-2026-10_55_49-AM.png',
      description:
        'Sky-blue and deep-navy antibiotic capsule carton design featuring bold central branding, capsule graphics, and crisp regulatory side panels.',
      designType: 'Capsule Medicine Box',
      designConcept:
        'Organizes essential dosage and formulation text inside a sweeping central aqua ribbon framed by deep navy curves for strong shelf visibility.',
      visualElements:
        'Bold navy "Dyamox-500" headline, curved aqua banner, contrasting red-and-yellow capsule illustrations, 10 x 10 corner indicator, side composition panel, and vertical barcode.',
      availableDetails: [
        { label: 'Packaging Format', value: 'Outer Capsule Carton' },
        { label: 'Displayed Pack Info', value: '500 mg · 10 x 10 Cápsula' },
        { label: 'Labeling Language', value: 'Portuguese' },
        { label: 'Color Palette', value: 'Deep Navy, Sky Aqua, White & Accent Red/Yellow' },
      ],
      serviceId: 'pharmaceutical-printing',
    },
    {
      id: 'pharma-cefridhya-injection',
      title: 'Cefridhya 1g Injection Carton & Vial Label',
      category: 'pharma',
      categoryLabel: 'Pharmaceutical',
      image:
        'https://het.assistwebstudio.in/wp-content/uploads/2026/11/dfeca919-6d68-45da-b384-29b210eced9e.png',
      description:
        'Clinical injectable carton and matching vial wrap label styled with crisp white negative space and sweeping royal-blue and plum wave accents.',
      designType: 'Injection Box & Vial Label',
      designConcept:
        'Balances uncluttered clinical white space with dynamic sweeping blue, violet, and lavender wave lines that extend seamlessly from the outer carton onto the vial label.',
      visualElements:
        'Gradient blue-to-purple "Cefridhya" title, white outline syringe-and-ampoule icon, "25 Frascos" pack count, structured medical panels, and coordinated 1g vial label.',
      availableDetails: [
        { label: 'Packaging Format', value: 'Outer Bulk Carton & Vial Label' },
        { label: 'Displayed Pack Info', value: '1g Injectable · 25 Frascos' },
        { label: 'Labeling Language', value: 'Portuguese' },
        { label: 'Color Palette', value: 'Crisp White, Royal Blue, Violet & Plum' },
      ],
      serviceId: 'pharmaceutical-printing',
    },

    // D. BOOK WORK — 3 PROJECTS
    {
      id: 'book-sundarkand-keepsake',
      title: 'Shri Ramcharitmanas Sundarkand Book & Presentation Box',
      category: 'books',
      categoryLabel: 'Book Work',
      image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/11/sundarkand-book.png',
      description:
        'Traditional horizontal devotional book design featuring a dark wood-grain aesthetic cover, braided cord closure, and matching crimson-and-gold presentation box.',
      designType: 'Devotional Book & Box Design',
      designConcept:
        'Elevates classic Hindi devotional scripture into a ceremonial keepsake edition by pairing warm deep-crimson packaging and dark wood-toned cover visuals with gleaming Devanagari gold lettering.',
      visualElements:
        'Bold golden Hindi title "श्री रामचरितमानस सुन्दरकाण्ड", dark wood-grain horizontal cover with braided orange-red cord and wooden bead, and matching deep-crimson presentation box.',
      availableDetails: [
        { label: 'Design Category', value: 'Book Work · Devotional Book & Box' },
        { label: 'Format', value: 'Horizontal Book & Presentation Box' },
        { label: 'Script & Language', value: 'Hindi (Devanagari)' },
        { label: 'Color Palette', value: 'Deep Crimson, Dark Wood Brown & Gold' },
      ],
      serviceId: 'book-work',
    },
    {
      id: 'book-ramayan-cover',
      title: 'Shri Ramcharitmanas Ramayan Illustrated Book Cover',
      category: 'books',
      categoryLabel: 'Book Work',
      image:
        'https://het.assistwebstudio.in/wp-content/uploads/2026/11/रामायण-पुस्तक-और-दीपक.png',
      description:
        'Full-wrap illustrated devotional book cover and spine design combining vibrant sacred artwork, golden Hindi display typography, and traditional temple motifs.',
      designType: 'Book Cover & Spine Design',
      designConcept:
        'Unites luminous twilight narrative artwork with monumental golden Devanagari lettering and a coordinated maroon spine for a dignified devotional book presentation.',
      visualElements:
        'Front cover illustration of Lord Ram, Sita, Lakshman, and Hanuman with glowing sunrise and Ayodhya temple backdrop, bold golden "रामायण" display title, and maroon spine with golden bow-and-arrow and temple motifs.',
      availableDetails: [
        { label: 'Design Category', value: 'Book Work · Book Cover & Spine' },
        { label: 'Format', value: 'Full-Wrap Illustrated Cover & Spine' },
        { label: 'Script & Language', value: 'Hindi (Devanagari)' },
        { label: 'Color Palette', value: 'Deep Maroon, Saffron, Sunset Gold & Indigo' },
      ],
      serviceId: 'book-work',
    },
    {
      id: 'book-bhagavad-gita-cover',
      title: 'Shrimad Bhagavad Gita Yatharoop Illustrated Book Cover',
      category: 'books',
      categoryLabel: 'Book Work',
      image:
        'https://het.assistwebstudio.in/wp-content/uploads/2026/11/श्रीमद्भगवद्गीता_-कृष्ण-और-अर्जुन.png',
      description:
        'Royal-blue devotional book cover and spine design depicting Lord Krishna and Arjuna on the golden chariot, crowned with ornate golden Hindi typography.',
      designType: 'Book Cover & Spine Design',
      designConcept:
        'Contrasts deep midnight-blue serenity with radiant golden chariot artwork and classical ornamental rules, tying the front cover and spine into one cohesive spiritual edition.',
      visualElements:
        'Golden Devanagari title "श्रीमद् भगवद् गीता — यथारूप", chariot illustration with Lord Krishna, Arjuna, and white horses, Sanskrit verse at the base, and matching blue spine with lotus and peacock-feather motifs.',
      availableDetails: [
        { label: 'Design Category', value: 'Book Work · Book Cover & Spine' },
        { label: 'Format', value: 'Full-Wrap Illustrated Cover & Spine' },
        { label: 'Script & Language', value: 'Hindi & Sanskrit (Devanagari)' },
        { label: 'Color Palette', value: 'Royal Midnight Blue, Radiant Gold & Saffron' },
      ],
      serviceId: 'book-work',
    },
  ];

  const filterTabs: { id: 'all' | PortfolioCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Projects', count: portfolioItems.length },
    {
      id: 'stationery',
      label: 'Stationery',
      count: portfolioItems.filter(item => item.category === 'stationery').length,
    },
    {
      id: 'wedding-cards',
      label: 'Wedding Cards',
      count: portfolioItems.filter(item => item.category === 'wedding-cards').length,
    },
    {
      id: 'pharma',
      label: 'Pharmaceutical',
      count: portfolioItems.filter(item => item.category === 'pharma').length,
    },
    {
      id: 'books',
      label: 'Book Work',
      count: portfolioItems.filter(item => item.category === 'books').length,
    },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="bg-white dark:bg-[#09090e] text-neutral-900 dark:text-neutral-100 min-h-screen pt-20 lg:pt-24 pb-16 sm:pb-20 relative selection:bg-[#FF0000] selection:text-white transition-colors duration-300">
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#FF0000]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C99A50]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* 1. Header with Gallery Title */}
      <section className="border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#0c0c12]/95 backdrop-blur-md py-12 sm:py-14 lg:py-16 relative z-10 transition-colors duration-300">
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
                OUR WORK
              </span>
            </Reveal>
            <MaskedTextReveal immediate delay={0.08}>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-neutral-950 dark:text-white uppercase tracking-tight leading-tight">
                EVERY DESIGN TELLS A <span className="text-[#FF0000]">STORY</span>
              </h1>
            </MaskedTextReveal>
            <Reveal immediate delay={0.18} distance={14}>
              <p className="mt-3 sm:mt-3.5 text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                A showcase of our creative work, combining thoughtful design, visual appeal and precision across different design categories.
              </p>
            </Reveal>
          </div>

          {/* Category Filter Controls */}
          <Reveal immediate delay={0.24} distance={12}>
            <div
              role="tablist"
              aria-label="Filter portfolio projects by category"
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800"
            >
              {filterTabs.map(tab => {
                const isActive = activeCategory === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: EASE_STUDIO }}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`relative px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-250 cursor-pointer whitespace-nowrap shrink-0 inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF0000] ${
                      isActive
                        ? 'text-white'
                        : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/80 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="portfolio-active-filter"
                        transition={{ duration: 0.34, ease: EASE_STUDIO }}
                        className="absolute inset-0 rounded-full bg-[#FF0000] shadow-md shadow-red-600/25"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                    <span
                      className={`relative z-10 tabular-nums text-[10px] ${
                        isActive ? 'text-white/90' : 'text-neutral-500 dark:text-neutral-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Portfolio Gallery Grid */}
      <section className="py-14 sm:py-18 lg:py-20 bg-[#fafafa] dark:bg-[#09090e] relative z-10 border-b border-neutral-200/80 dark:border-neutral-800 transition-colors duration-300">
        <h2 className="sr-only">Portfolio Projects</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: EASE_STUDIO }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch"
            >
              {filteredItems.map((item, idx) => (
                <motion.article
                  key={item.id}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedItem(item);
                    }
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{
                    duration: 0.62,
                    delay: (idx % 3) * 0.08,
                    ease: EASE_STUDIO,
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.28, ease: EASE_STUDIO } }}
                  onClick={() => setSelectedItem(item)}
                  className="group cursor-pointer rounded-2xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#14141e] hover:border-[#C99A50]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF0000] transition-[border-color,box-shadow,background-color] duration-350 flex flex-col justify-between hover:shadow-[0_20px_44px_-16px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_20px_44px_-16px_rgba(0,0,0,0.55)] shadow-xs h-full"
                >
                  <div className="flex flex-col flex-1">
                    {/* Original Project Image Container (Uncropped) */}
                    <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-[#11111a] relative border-b border-neutral-100 dark:border-neutral-800 shrink-0">
                      <PortfolioImage
                        src={item.image}
                        alt={item.title}
                        title={item.title}
                        categoryLabel={item.categoryLabel}
                        variant="card"
                        index={idx}
                      />

                      {/* Hover Inspect Indicator */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-350 ease-out flex items-center justify-center p-4">
                        <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF0000] text-white text-xs font-mono font-bold shadow-lg whitespace-nowrap transform translate-y-2.5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Specs</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-[11px] font-mono text-[#C99A50] uppercase font-bold tracking-wider block mb-1.5 truncate">
                        {item.categoryLabel}
                      </span>
                      <h3 className="text-base font-bold text-neutral-950 dark:text-white group-hover:text-[#FF0000] transition-colors duration-250 line-clamp-2 leading-snug min-h-[2.75rem]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 font-sans mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer with Design Type & Inspect Specs Button */}
                  <div className="px-5 py-3.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2 shrink-0">
                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 truncate">
                      {item.designType}
                    </span>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedItem(item);
                      }}
                      className="group/spec text-[11px] font-mono text-[#FF0000] hover:text-[#D60000] font-bold inline-flex items-center gap-1 shrink-0 whitespace-nowrap transition-colors duration-250 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF0000]"
                    >
                      <span className="link-underline-glide">Inspect Specs</span>
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </motion.button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Lightbox Spec Inspection Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="portfolio-lightbox-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_STUDIO }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, scale: 0.97, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.32, ease: EASE_STUDIO }}
              className="bg-white dark:bg-[#14141e] border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-neutral-900 dark:text-neutral-100"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white/95 dark:bg-[#14141e]/95 backdrop-blur-md p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider">
                    <span className="text-[#FF0000]">{selectedItem.categoryLabel}</span>
                    <span className="text-neutral-300 dark:text-neutral-600" aria-hidden="true">·</span>
                    <span className="text-[#C99A50] truncate">{selectedItem.designType}</span>
                  </div>
                  <h3
                    id="portfolio-modal-title"
                    className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white mt-0.5 leading-snug"
                  >
                    {selectedItem.title}
                  </h3>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2, ease: EASE_STUDIO }}
                  onClick={() => setSelectedItem(null)}
                  className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF0000]"
                  aria-label="Close project details"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Large Original Project Image (Full Uncropped Aspect Ratio) */}
              <div className="w-full bg-[#0A0A0A] flex items-center justify-center p-4 sm:p-6 min-h-[260px] sm:min-h-[340px] relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.42, ease: EASE_STUDIO }}
                  className="flex items-center justify-center w-full"
                >
                  <PortfolioImage
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    title={selectedItem.title}
                    categoryLabel={selectedItem.categoryLabel}
                    variant="modal"
                  />
                </motion.div>
              </div>

              {/* Design Description & Available Details */}
              <div className="p-5 sm:p-6 space-y-5">
                <div className="space-y-2.5">
                  <p className="text-sm text-neutral-800 dark:text-neutral-200 font-sans leading-relaxed">
                    {selectedItem.description}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                    <span className="font-semibold text-neutral-950 dark:text-white">Design Approach: </span>
                    {selectedItem.designConcept}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                    <span className="font-semibold text-neutral-950 dark:text-white">Key Visual Elements: </span>
                    {selectedItem.visualElements}
                  </p>
                </div>

                {/* Available Design Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {selectedItem.availableDetails.map((detail, index) => (
                    <motion.div
                      key={detail.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.06 + index * 0.04, ease: EASE_STUDIO }}
                      className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#1b1b28] border border-neutral-200 dark:border-neutral-700"
                    >
                      <span className="text-[11px] font-mono text-[#C99A50] font-bold uppercase tracking-wider block mb-1">
                        {detail.label}
                      </span>
                      <span className="text-neutral-900 dark:text-neutral-100 font-sans text-xs sm:text-[13px]">
                        {detail.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
                    Category:{' '}
                    <strong className="text-neutral-950 dark:text-white">{selectedItem.categoryLabel}</strong>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href={`https://wa.me/${BRAND.contact.whatsapp}?text=${encodeURIComponent(
                        `Hello Manisha Graphix, I would like to inquire about a project similar to "${selectedItem.title}" (${selectedItem.categoryLabel}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-full bg-[#C99A50] hover:bg-[#B0833D] text-white text-xs font-mono font-bold uppercase transition-colors duration-300 flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <motion.button
                      type="button"
                      whileHover={{ y: -1.5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.24, ease: EASE_STUDIO }}
                      onClick={() => {
                        setSelectedItem(null);
                        onSelectServiceForQuote(selectedItem.serviceId);
                      }}
                      className="group px-6 py-2.5 rounded-full bg-[#FF0000] hover:bg-[#D60000] text-white text-xs font-mono font-bold uppercase transition-[background-color,box-shadow] duration-300 shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/35 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <span>Request Similar Project</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Bottom Quote Banner */}
      <section className="py-14 bg-[#000000] text-white border-t border-neutral-200 dark:border-neutral-800 relative z-10 shadow-lg">
        <Reveal
          direction="up"
          distance={20}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h2 className="text-xl font-bold uppercase">Have a unique sample you want replicated?</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Bring your physical sample to our Vadodara studio for exact paper and ink matching.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              type="button"
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.24, ease: EASE_STUDIO }}
              onClick={onOpenQuoteModal}
              className="px-6 py-2.5 rounded-full bg-[#FF0000] hover:bg-[#D60000] text-white text-xs font-mono font-bold uppercase transition-[background-color,box-shadow] duration-300 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 cursor-pointer whitespace-nowrap"
            >
              Get Instant Estimate
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.24, ease: EASE_STUDIO }}
              onClick={() => navigate('contact')}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase transition-colors duration-300 cursor-pointer whitespace-nowrap"
            >
              Locate Studio
            </motion.button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
