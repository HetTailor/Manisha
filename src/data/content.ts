import { ServiceItem, PortfolioItem, ImageSuggestionGuide } from '../types';

export const BRAND = {
  name: 'MANISHA GRAPHIX',
  owner: 'Harshil Mistry',
  role: 'Owner & Creative Director',
  tagline: 'Creative Design. Professional Printing. Quality Results.',
  heroDescription:
    'Professional printing solutions for businesses, special occasions, pharmaceutical companies, and publications.',
  aboutTitle: 'Bringing Ideas to Print',
  aboutDescription:
    'Manisha Graphix provides professional graphic and printing solutions with a focus on quality, creativity, and precision. From business stationery and elegant wedding invitations to pharmaceutical materials and complete book printing, we handle every project with attention to detail.',
  servicesHighlight: [
    'Stationery & Printing',
    'Wedding Cards',
    'Pharmaceutical Printing',
    'Book Work',
  ],
  contact: {
    phone: '+91 97268 03078',
    whatsapp: '919726803078',
    email: 'info@manishagraphix.com',
    hours: 'Mon – Sat: 9:30 AM – 8:00 PM',
    address: 'Commercial Press Complex, Industrial Estate, Gujarat, India',
  },
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'stationery-printing',
    title: 'Stationery & Printing',
    tagline: 'Corporate Identity & Brand Presence',
    description: 'Professional printing for business and personal requirements.',
    suggestedImageText:
      'Visiting cards, letterheads, envelopes, brochures and other stationery arranged on a desk.',
    searchKeyword: 'business stationery printing',
    aspectRatio: '4:3',
    sampleItems: [
      'Visiting Cards (Matte, Gloss, Velvet, Gold Foil)',
      'Executive Letterheads & Envelopes',
      'Corporate Tri-fold & Bi-fold Brochures',
      'Custom Bill Books, Invoices & Receipt Vouchers',
      'Presentation Folders & Corporate Kits',
      'Employee ID Cards & Lanyards',
    ],
    specs: {
      paperOptions: '90 GSM Bond to 450 GSM Velvet Touch Board',
      commonSizes: 'Standard 3.5×2 in, A4, A5, Custom Die-cut',
      finishes: 'Spot UV, Gold/Silver Hot Foil, Embossing, Thermal Lamination',
      idealFor: 'Enterprises, Startups, Retailers & Professionals',
    },
  },
  {
    id: 'wedding-cards',
    title: 'Wedding Cards',
    tagline: 'Bespoke Celebrations & Regal Keepsakes',
    description:
      'Beautiful and personalized invitation cards for your special moments.',
    suggestedImageText:
      'Premium Indian wedding invitation cards with elegant designs and envelopes.',
    searchKeyword: 'luxury Indian wedding invitation cards',
    aspectRatio: '4:3',
    sampleItems: [
      'Traditional & Contemporary Indian Wedding Suites',
      'Metallic Gold & Copper Foil Stamped Cards',
      'Laser-Cut Gatefold & Floral Filigree Enclosures',
      'Rigid Luxury Box Invitations with Sweet Favor Inserts',
      'Sangeet, Haldi & Reception Function Inserts',
      'Custom Monograms, Wax Seals & Wax Stamp Accents',
    ],
    specs: {
      paperOptions: 'Handmade Cotton Rag, Metallic Shimmer, Velvet Board 600 GSM',
      commonSizes: '7×5 in, 8×6 in, Square 7×7 in, Custom Box Formats',
      finishes: 'Micro-embossing, Gold/Copper Foiling, Velvet Lamination',
      idealFor: 'Weddings, Engagements, Anniversaries & Royal Gala Invitations',
    },
  },
  {
    id: 'pharmaceutical-printing',
    title: 'Pharmaceutical Printing',
    tagline: 'Compliance, Precision & Tamper-Evident Packaging',
    description:
      'Professional printing solutions for pharmaceutical and medical businesses.',
    suggestedImageText:
      'Pharmaceutical packaging, medicine boxes, labels and product leaflets.',
    searchKeyword: 'pharmaceutical packaging printing',
    aspectRatio: '4:3',
    sampleItems: [
      'Medicine Folding Cartons & Outer Boxes',
      'Product Information Leaflets (Lightweight Bible Paper)',
      'Self-Adhesive Vial & Bottle Labels',
      'Tamper-Evident Security Seals & Holographic Tapes',
      'Braille Embossed Medical Cartons (EU/FDA Compliant)',
      'Batch, Expiry & QR Verification Print Windows',
    ],
    specs: {
      paperOptions: 'SBS Board 280–350 GSM, 40–50 GSM Pharma Bible Paper',
      commonSizes: 'Custom Mono-Cartons, Multi-fold Inserts (up to 16 folds)',
      finishes: 'Aqueous Coating, UV Varnishing, Braille Punching, Window Lamination',
      idealFor: 'Pharma Manufacturers, Ayurvedic Labs, Biotech & Diagnostic Labs',
    },
  },
  {
    id: 'book-work',
    title: 'Book Work',
    tagline: 'Publications, Textbooks & Fine Hardcover Binding',
    description:
      'Complete printing and finishing solutions for books and publications.',
    suggestedImageText:
      'Stack of professionally printed books with an open book showing quality pages.',
    searchKeyword: 'professional book printing',
    aspectRatio: '4:3',
    sampleItems: [
      'Perfect Bound Softcover Books & Novels',
      'Deluxe Hardbound Books with Ribbon Markers & Dust Jackets',
      'Saddle-Stitched School Textbooks & Exercise Notebooks',
      'Corporate Annual Reports & Product Catalogs',
      'Souvenir Magazines, Coffee Table Books & Portfolios',
      'Academic Journals & Research Papers',
    ],
    specs: {
      paperOptions: '70–120 GSM Maplitho / Book Paper, 130–170 GSM Art Paper',
      commonSizes: 'Crown Quarto, Demy Octavo, Royal, A4, A5, Square Formats',
      finishes: 'PUR Perfect Binding, Section Sewing, Hard Case Binding, Spot UV Covers',
      idealFor: 'Publishers, Educational Institutions, Corporates & Independent Authors',
    },
  },
];

export const WHY_CHOOSE_US = [
  {
    id: 'creative-designs',
    title: 'Creative Designs',
    description:
      'Original, distinctive graphic concepts crafted specifically for your industry — from minimalist corporate identities to ornate wedding typography.',
    badge: 'Artisanal Conception',
  },
  {
    id: 'premium-printing',
    title: 'Premium Printing Quality',
    description:
      'State-of-the-art multi-color offset and calibrated digital presses ensure razor-sharp text, vivid Pantone accuracy, and rich solid inks.',
    badge: 'CMYK Color Calibrated',
  },
  {
    id: 'customized-solutions',
    title: 'Customized Solutions',
    description:
      'No rigid templates. We tailor paper weights, custom dies, bespoke box sizes, and unique folding configurations to match your exact vision.',
    badge: 'Tailored to Fit',
  },
  {
    id: 'professional-finishing',
    title: 'Professional Finishing',
    description:
      'Complete in-house post-press operations: precision die-cutting, spot UV gloss, hot metallic foil stamping, embossing, and rigid bindery.',
    badge: 'Flawless Touch',
  },
  {
    id: 'attention-to-detail',
    title: 'Attention to Detail',
    description:
      'Every print batch is rigorously inspected for registration accuracy, color consistency, and clean edge trimming before dispatch.',
    badge: 'Zero-Defect Standard',
  },
  {
    id: 'reliable-service',
    title: 'Reliable Service',
    description:
      'Committed delivery deadlines, transparent communication, and dependable service you can trust on every run.',
    badge: 'On-Time Dispatch',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'vc-01',
    title: 'Executive Matte Black Visiting Cards',
    category: 'visiting-cards',
    categoryLabel: 'Visiting Cards',
    client: 'Apex Capital Partners',
    specs: '450 GSM Velvet Board • Gold Hot Foil Stamping',
    paperStock: 'Imported Velvet Touch Cardstock',
    finishing: 'Matte Lamination + Edge Gilding',
    suggestedImage: 'Close-up of premium business card with gold foil stamped logo on velvet matte cardstock',
    searchKeyword: 'business stationery printing',
    description: 'Bespoke business cards featuring 450 GSM triple-layer cardstock with crisp metallic gold typography and velvety smooth tactile lamination.',
  },
  {
    id: 'wc-01',
    title: 'Royal Heritage Indian Wedding Suite',
    category: 'wedding-cards',
    categoryLabel: 'Wedding Cards',
    client: 'Shah & Patel Celebration',
    specs: '600 GSM Handmade Board • Antique Copper Foil',
    paperStock: 'Handmade Textured Cotton Rag',
    finishing: 'Blind Embossing + Silk Ribbon Closure',
    suggestedImage: 'Traditional Indian wedding invitation with intricate gold foil and ornate mandala motif',
    searchKeyword: 'luxury Indian wedding invitation cards',
    description: 'Grand 3-tiered wedding invitation with ornate mandala artwork, laser-cut gatefold enclosure, and wax-sealed handcrafted envelopes.',
  },
  {
    id: 'ph-01',
    title: 'Prescription Medicine Outer Cartons',
    category: 'pharma',
    categoryLabel: 'Pharmaceutical Packaging',
    client: 'Zenith BioPharm Laboratories',
    specs: '300 GSM SBS Board • Braille Embossing • Batch Window',
    paperStock: 'Food & Drug Grade SBS Carton Board',
    finishing: 'Water-based Barrier Coating + Tamper Seal',
    suggestedImage: 'Pharmaceutical medicine boxes with clean medical typography and Braille dots',
    searchKeyword: 'pharmaceutical packaging printing',
    description: 'Precision medicine folding boxes engineered with international standard Braille embossing, high-contrast barcode printing, and safety seals.',
  },
  {
    id: 'bk-01',
    title: 'Architectural Monograph Hardbound Book',
    category: 'books',
    categoryLabel: 'Books',
    client: 'Studio Vastu Publishers',
    specs: '170 GSM Matte Art Paper • Hard Case Binding • Cloth Spine',
    paperStock: 'Acid-Free Archival Art Paper',
    finishing: 'Thread Sewn + Spot UV Embossed Dust Jacket',
    suggestedImage: 'Hardcover coffee table book opened to showcase high resolution photographic print quality',
    searchKeyword: 'professional book printing',
    description: 'Deluxe hardcover edition featuring section-sewn binding for lay-flat reading and vivid 4-color offset reproduction of architectural photography.',
  },
  {
    id: 'br-01',
    title: 'Prestige Corporate Tri-fold Brochure',
    category: 'brochures',
    categoryLabel: 'Brochures',
    client: 'Global Engineering Corp',
    specs: '250 GSM Gloss Art Card • Precision Crease & Fold',
    paperStock: 'Double-Coated Gloss Art Paper',
    finishing: 'Matte Thermal Coating + Spot Gloss Highlights',
    suggestedImage: 'Tri-fold marketing brochures displayed in a neat arrangement showing crisp folds',
    searchKeyword: 'printed brochures business cards stationery',
    description: 'Tri-fold corporate brochures designed with strict grid discipline, vibrant product color fidelity, and scuff-resistant matte coating.',
  },
  {
    id: 'st-01',
    title: 'Corporate Identity Stationery Suite',
    category: 'stationery',
    categoryLabel: 'Letterheads & Bill Books',
    client: 'Veritas Legal Chambers',
    specs: '100 GSM Executive Watermarked Bond • Carbonless Bill Books',
    paperStock: 'Sunshine Watermarked Executive Bond',
    finishing: 'Thermography Raised Printing + Perforated Binding',
    suggestedImage: 'Letterhead, envelopes, and bound invoice books neatly laid out on dark executive surface',
    searchKeyword: 'printing company workspace',
    description: 'Complete corporate stationery suite including watermarked letterheads, self-seal security envelopes, and multi-part carbonless bill books.',
  },
  {
    id: 'ph-02',
    title: 'Clinical Leaflets & Micro-Folded Inserts',
    category: 'pharma',
    categoryLabel: 'Pharmaceutical Packaging',
    client: 'Aura Lifesciences',
    specs: '45 GSM Imported Lightweight Bible Paper • 14-Panel Fold',
    paperStock: 'Opaque Medical Leaflet Paper',
    finishing: 'Precision Pre-folded Miniature Format',
    suggestedImage: 'Pharmaceutical product leaflets neatly folded into compact packaging format',
    searchKeyword: 'pharmaceutical packaging printing',
    description: 'High-speed miniature folded prescription medication leaflets printed with sharp 6pt legibility and zero ink ghosting on lightweight paper.',
  },
  {
    id: 'cu-01',
    title: 'Custom Foil-Stamped Rigid Gift Boxes',
    category: 'custom',
    categoryLabel: 'Custom Printing',
    client: 'Kalyan Confectioneries',
    specs: '1200 GSM Kappa Board • Magnetic Catch • Velvet Lining',
    paperStock: 'Heavyweight Rigid Board wrapped in Fine Paper',
    finishing: 'Metallic Gold Hot Foil + Custom Laser Die-Cut Foam',
    suggestedImage: 'Luxury rigid paper gift box with foil stamped emblem and magnetic flap',
    searchKeyword: 'commercial printing finishing',
    description: 'Custom handcrafted rigid packaging boxes designed for luxury festive gifting, corporate welcome kits, and premium product presentation.',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    name: 'Discuss',
    title: 'Requirement & Consultation',
    summary:
      'We understand your exact print requirements — format, quantity, timeline, paper GSM, and budget parameters.',
    details:
      'Harshil Mistry personally reviews your project brief. We guide you on optimal paper stocks, cost-effective sheet utilization, and suitable finishes.',
  },
  {
    step: '02',
    name: 'Design',
    title: 'Creative Layout & Prepress',
    summary:
      'Our studio develops bespoke artwork or thoroughly prepares your client files with correct bleeds and CMYK profiles.',
    details:
      'We verify high-resolution vector assets, apply Pantone color swatches, calibrate image sharpness, and verify die-lines before plate setting.',
  },
  {
    step: '03',
    name: 'Review',
    title: 'Digital & Physical Proofing',
    summary:
      'You receive a high-resolution digital proof or a calibrated physical sample for 100% approval before press run.',
    details:
      'We check spelling, layout alignment, trim margins, and color accuracy so there are zero surprises when thousands of copies roll off the press.',
  },
  {
    step: '04',
    name: 'Print',
    title: 'Press Run & Specialty Finishing',
    summary:
      'Your job moves to our modern commercial presses, followed by in-house foiling, UV, die-cutting, or bindery.',
    details:
      'Ink density is monitored continuously during the run. Specialty post-press finishes like thermal lamination, spot UV, or PUR binding are applied with care.',
  },
  {
    step: '05',
    name: 'Deliver',
    title: 'Quality Check & Safe Delivery',
    summary:
      'Every finished piece is trimmed cleanly, bundled securely in moisture-proof packaging, and dispatched on time.',
    details:
      'Our quality control team inspects sheet counts and finishing perfection. Packages are securely boxed and delivered directly to your doorstep or warehouse.',
  },
];

export const IMAGE_SEARCH_GUIDE: ImageSuggestionGuide[] = [
  {
    sectionId: 'hero',
    sectionName: '1. Hero Section',
    description: 'Modern commercial printing machine with printed sheets coming out.',
    suggestedSubject: 'Modern commercial offset or digital production press in operation, with printed paper feeding through conveyor rollers.',
    exactSearchKeyword: 'commercial printing press professional',
    aspectRatio: '16:9',
    recommendedResolution: '1920 × 1080 px or higher',
    placementLocation: 'Hero visual card / right column backdrop',
  },
  {
    sectionId: 'about',
    sectionName: '2. About Us',
    description: 'Designer working on a computer beside a professional printing machine.',
    suggestedSubject: 'Prepress designer reviewing artwork proofs on a color-calibrated screen in a modern printing workshop.',
    exactSearchKeyword: 'graphic designer printing company',
    aspectRatio: '4:3',
    recommendedResolution: '1200 × 900 px',
    placementLocation: 'About Us owner & workshop spotlight',
  },
  {
    sectionId: 'service-stationery',
    sectionName: '3. Stationery & Printing',
    description: 'Visiting cards, letterheads, envelopes, brochures and other stationery arranged on a desk.',
    suggestedSubject: 'Overhead flatlay photograph of corporate branding items with clean shadows and elegant paper textures.',
    exactSearchKeyword: 'business stationery printing',
    aspectRatio: '4:3',
    recommendedResolution: '1000 × 750 px',
    placementLocation: 'Service Card #1',
  },
  {
    sectionId: 'service-wedding',
    sectionName: '3. Wedding Cards',
    description: 'Premium Indian wedding invitation cards with elegant designs and envelopes.',
    suggestedSubject: 'Luxury wedding cards with gold foil stamping, deep jewel-tone envelopes, and traditional Indian motifs.',
    exactSearchKeyword: 'luxury Indian wedding invitation cards',
    aspectRatio: '4:3',
    recommendedResolution: '1000 × 750 px',
    placementLocation: 'Service Card #2',
  },
  {
    sectionId: 'service-pharma',
    sectionName: '3. Pharmaceutical Printing',
    description: 'Pharmaceutical packaging, medicine boxes, labels and product leaflets.',
    suggestedSubject: 'Clean studio photograph of clinical medicine folding cartons, blister pack leaflets, and medicine labels.',
    exactSearchKeyword: 'pharmaceutical packaging printing',
    aspectRatio: '4:3',
    recommendedResolution: '1000 × 750 px',
    placementLocation: 'Service Card #3',
  },
  {
    sectionId: 'service-book',
    sectionName: '3. Book Work',
    description: 'Stack of professionally printed books with an open book showing quality pages.',
    suggestedSubject: 'Stack of hardbound and paperback books with one open to show typography, binding spine, and paper tone.',
    exactSearchKeyword: 'professional book printing',
    aspectRatio: '4:3',
    recommendedResolution: '1000 × 750 px',
    placementLocation: 'Service Card #4',
  },
  {
    sectionId: 'why-choose-us',
    sectionName: '4. Why Choose Us?',
    description: 'Close-up photograph of high-quality printed materials and finishing/printing details.',
    suggestedSubject: 'Macro photograph showing embossed foil texture, clean paper edges, spot UV gloss, or CMYK loupe alignment.',
    exactSearchKeyword: 'printing machine close up',
    aspectRatio: '16:9 or 4:3',
    recommendedResolution: '1200 × 800 px',
    placementLocation: 'Why Choose Us visual anchor',
  },
  {
    sectionId: 'our-work',
    sectionName: '5. Our Work (Gallery)',
    description: 'Use real photographs of completed work rather than generic graphics.',
    suggestedSubject: 'Real photos of completed client projects: visiting cards, wedding invites, pharma boxes, brochures, bill books.',
    exactSearchKeyword: 'printed brochures business cards stationery',
    aspectRatio: '4:3',
    recommendedResolution: '800 × 600 px (per item)',
    placementLocation: 'Portfolio Gallery items',
  },
  {
    sectionId: 'process',
    sectionName: '6. Our Process',
    description: 'A professional printing workflow showing design → print → finishing → delivery.',
    suggestedSubject: 'Documentary sequence showing industrial guillotine paper cutter, folding machine, or binding in action.',
    exactSearchKeyword: 'commercial printing finishing',
    aspectRatio: '16:9',
    recommendedResolution: '1440 × 810 px',
    placementLocation: 'Process Section workflow showcase',
  },
  {
    sectionId: 'final-cta',
    sectionName: '7. Final CTA',
    description: 'Premium photo of finished printed products arranged together.',
    suggestedSubject: 'Composite showcase of finished premium products: wedding cards, catalogues, boxes, and business cards.',
    exactSearchKeyword: 'printing company workspace',
    aspectRatio: '16:9',
    recommendedResolution: '1600 × 900 px',
    placementLocation: 'Final CTA banner background / card',
  },
];
