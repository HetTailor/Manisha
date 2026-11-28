import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, CheckCircle2, ChevronDown, AlertCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ManishaLogo } from '../components/ManishaLogo';
import { BRAND } from '../data/content';
import {
  Reveal,
  MaskedTextReveal,
  StaggerContainer,
  StaggerItem,
  EASE_STUDIO,
} from '../components/MotionPrimitives';

const INITIAL_FORM = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: 'Stationery & Corporate Printing',
  quantity: '1000 – 2500 (Offset Economy)',
  artworkStatus: 'Print-Ready PDF with Outlines',
  message: '',
};

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [formError, setFormError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const updateField = <K extends keyof typeof INITIAL_FORM>(key: K, value: (typeof INITIAL_FORM)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (formError) setFormError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (form.name.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }

    const cleanedPhone = form.phone.replace(/[\s\-\(\)]/g, '').replace(/^(\+91|91|0)/, '');
    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      setFormError('Please enter a valid 10-digit Indian mobile number (e.g. 98765 43210).');
      return;
    }

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setFormError('Please enter a valid email address or leave the email field blank.');
      return;
    }

    setIsSubmitted(true);
  };

  const whatsappInquiryUrl = `https://wa.me/${BRAND.contact.whatsapp}?text=${encodeURIComponent(
    `*New Inquiry from Manisha Graphix Website*\n\n` +
      `*Name:* ${form.name.trim()}\n` +
      (form.company.trim() ? `*Company:* ${form.company.trim()}\n` : '') +
      `*Phone:* ${form.phone.trim()}\n` +
      (form.email.trim() ? `*Email:* ${form.email.trim()}\n` : '') +
      `*Service:* ${form.service}\n` +
      `*Estimated Quantity:* ${form.quantity}\n` +
      `*Artwork Status:* ${form.artworkStatus}\n` +
      (form.message.trim() ? `*Notes:* ${form.message.trim()}` : '')
  )}`;

  const faqs = [
    {
      q: 'What file specifications are required for offset plate printing?',
      a: 'We accept high-resolution PDF/X-1a, Adobe Illustrator (.AI), and CorelDRAW (.CDR) files. All fonts must be converted to curves/outlines, images should be at least 300 DPI in CMYK color mode, and all artwork must include a minimum 3mm bleed with trim crop marks.',
    },
    {
      q: 'Can I see a physical hard-copy proof before the full press run?',
      a: 'Absolutely. For corporate stationery, wedding invitation suites, and publication book work, we produce a calibrated digital proof or hardbound mockup for your tactile and visual sign-off prior to offset plate imaging.',
    },
    {
      q: 'What are your standard production and delivery turnaround times?',
      a: 'Digital short runs (visiting cards, flyers) are typically dispatched in 24 to 48 hours. High-volume 5-color offset jobs (medicine cartons, brochures, books) require 3 to 7 business days depending on post-press finishes like foil stamping, embossing, or die-cutting.',
    },
    {
      q: 'Do you deliver orders outside Vadodara?',
      a: 'Yes. We provide scheduled door delivery across Vadodara and expedited courier dispatch to Ahmedabad, Surat, Rajkot, Mumbai, and pan-India with secure moisture-proof packing.',
    },
  ];

  return (
    <div className="bg-[#f8f9fb] dark:bg-[#09090e] text-neutral-900 dark:text-neutral-100 min-h-screen pt-20 lg:pt-24 pb-16 sm:pb-20 transition-colors duration-300">
      
      {/* 1. Header */}
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
                STUDIO DIRECT CONCIERGE
              </span>
            </Reveal>
            <MaskedTextReveal immediate delay={0.08}>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-neutral-900 dark:text-white uppercase tracking-tight leading-tight">
                CONNECT WITH OUR <span className="text-[#FF0000]">PREPRESS TEAM</span>
              </h1>
            </MaskedTextReveal>
            <Reveal immediate delay={0.18} distance={14}>
              <p className="mt-3 sm:mt-3.5 text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                Have a custom print specification, require physical paper swatches, or wish to consult with Harshil Mistry directly? Visit our Vadodara press floor or send us your artwork details below.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Main 2-Column Hub: Direct Channels vs Interactive Inquiry Form */}
      <section className="py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Studio Details & Channels */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="sr-only">Studio Contact Details</h2>
              
              {/* Studio Card */}
              <Reveal direction="right" distance={24} className="p-8 rounded-3xl bg-[#000000] text-white border border-neutral-800 shadow-xl space-y-6">
                <div>
                  <ManishaLogo variant="dark" size="md" showTagline={true} showText={true} />
                  <p className="text-xs text-neutral-400 font-sans mt-3 leading-relaxed">
                    Integrated Graphic Design Studio & 5-Color Offset Print Production Line.
                  </p>
                </div>

                <div className="space-y-4 pt-2 border-t border-neutral-800">
                  {/* Owner Direct */}
                  <div className="group flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#FF0000] text-white flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110">
                      <span className="font-bold text-xs font-mono">HM</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Lead Print Craftsman</span>
                      <span className="text-sm font-bold text-white block">Harshil Mistry</span>
                      <span className="text-xs text-neutral-300">Studio Owner & Director</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110">
                      <Phone className="w-4 h-4 text-[#C99A50]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Phone / Mobile</span>
                      <a href="tel:+919726803078" className="text-sm font-bold text-white hover:text-[#FF0000] transition-colors font-mono">
                        +91 97268 03078
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110">
                      <Mail className="w-4 h-4 text-[#C99A50]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Direct Email</span>
                      <a href="mailto:manishagraphix@gmail.com" className="text-xs font-mono text-neutral-300 hover:text-white transition-colors break-all">
                        manishagraphix@gmail.com
                      </a>
                    </div>
                  </div>


                  {/* Business Hours */}
                  <div className="group flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110">
                      <Clock className="w-4 h-4 text-[#C99A50]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Press Floor Hours</span>
                      <p className="text-xs text-neutral-300 font-mono">
                        Monday – Saturday: 9:30 AM – 8:30 PM<br />
                        Sunday: By Appointment
                      </p>
                    </div>
                  </div>

                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <motion.a
                    whileHover={{ y: -1.5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.24, ease: EASE_STUDIO }}
                    href="tel:+919726803078"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#FF0000] hover:bg-[#D60000] text-white text-xs font-mono font-bold uppercase text-center transition-[background-color,box-shadow] duration-300 shadow-md shadow-red-600/25 hover:shadow-red-600/40"
                  >
                    Call Now
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -1.5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.24, ease: EASE_STUDIO }}
                    href="https://wa.me/919726803078?text=Hello%20Manisha%20Graphix%2C%20I%20would%20like%20to%20inquire%20about%20a%20print%20job"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase text-center transition-colors duration-300"
                  >
                    WhatsApp Chat
                  </motion.a>
                </div>

              </Reveal>

              {/* In-Person Studio Visit Card */}
              <Reveal direction="up" delay={0.12} distance={20} className="p-6 rounded-2xl bg-white dark:bg-[#14141e] border border-neutral-200 dark:border-neutral-800 shadow-xs transition-colors duration-300">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2">Visiting Our Prepress Floor</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                  We encourage clients to review paper stocks in person. Inspect our physical swatch library of over 120+ paper types, foils, and binding samples. Parking available on site.
                </p>
              </Reveal>

            </div>

            {/* Right Column: Project Inquiry Form */}
            <Reveal direction="left" distance={24} className="lg:col-span-7 bg-white dark:bg-[#14141e] p-8 sm:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-300">
              <div className="mb-8">
                <span className="text-xs font-mono font-bold text-[#FF0000] tracking-widest uppercase block mb-1">
                  PROJECT SPECIFICATION FORM
                </span>
                <h2 className="text-2xl font-display font-black text-neutral-900 dark:text-white uppercase">
                  SUBMIT YOUR PRINT REQUIREMENTS
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans mt-1">
                  Our estimators respond within 2 hours during studio business hours.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="contact-submitted"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, scale: 0.97, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -10 }}
                    transition={{ duration: 0.36, ease: EASE_STUDIO }}
                    className="p-8 rounded-2xl bg-white dark:bg-[#101018] border-2 border-[#C99A50] text-center space-y-4 shadow-md"
                  >
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.08, ease: EASE_STUDIO }}
                      className="w-14 h-14 rounded-full bg-[#FF0000] text-white flex items-center justify-center mx-auto shadow-lg shadow-red-600/30"
                    >
                      <CheckCircle2 className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Inquiry Received Successfully!</h3>
                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="font-bold">{form.name}</span>. Harshil Mistry and our prepress estimation team have received your specifications for <span className="font-bold">{form.service}</span>. We will contact you at <span className="font-bold">{form.phone}</span> shortly.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <a
                        href={whatsappInquiryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C99A50] hover:bg-[#B0833D] text-white text-xs font-mono font-bold uppercase transition-colors duration-300"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send via WhatsApp</span>
                      </a>
                      <motion.button
                        type="button"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.22, ease: EASE_STUDIO }}
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormError('');
                          setForm(INITIAL_FORM);
                        }}
                        className="inline-block px-6 py-2.5 rounded-full bg-[#000000] dark:bg-white text-white dark:text-neutral-950 text-xs font-mono font-bold uppercase transition-colors duration-300 hover:bg-[#FF0000] dark:hover:bg-[#FF0000] dark:hover:text-white cursor-pointer"
                      >
                        Submit Another Inquiry
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-4"
                  >
                  <AnimatePresence>
                    {formError && (
                      <motion.div
                        role="alert"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22, ease: EASE_STUDIO }}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-[#D60000] dark:text-red-300 font-sans"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#FF0000]" />
                        <span>{formError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase mb-1">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={e => updateField('name', e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] bg-neutral-50/50 dark:bg-[#0f0f18]"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-company" className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase mb-1">
                        Company / Brand (Optional)
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={e => updateField('company', e.target.value)}
                        placeholder="e.g. Apex Biotech"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] bg-neutral-50/50 dark:bg-[#0f0f18]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase mb-1">
                        Mobile Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        value={form.phone}
                        onChange={e => updateField('phone', e.target.value)}
                        placeholder="+91 98765 00000"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] bg-neutral-50/50 dark:bg-[#0f0f18] font-mono"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={e => updateField('email', e.target.value)}
                        placeholder="rajesh@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] bg-neutral-50/50 dark:bg-[#0f0f18]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-service" className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase mb-1">
                        Required Service Line
                      </label>
                      <select
                        id="contact-service"
                        value={form.service}
                        onChange={e => updateField('service', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF0000] bg-neutral-50/50 dark:bg-[#0f0f18] font-medium"
                      >
                        <option value="Stationery & Corporate Printing">Stationery & Corporate Identity</option>
                        <option value="Luxury Wedding Cards">Luxury Wedding Cards & Suites</option>
                        <option value="Pharmaceutical Packaging">Pharmaceutical Medicine Cartons</option>
                        <option value="Book Work & Monographs">Book Work & Catalog Printing</option>
                        <option value="Custom Finishing (Foil / Emboss)">Custom Foil Stamping / Embossing</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-quantity" className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase mb-1">
                        Estimated Run Quantity
                      </label>
                      <select
                        id="contact-quantity"
                        value={form.quantity}
                        onChange={e => updateField('quantity', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF0000] bg-neutral-50/50 dark:bg-[#0f0f18] font-mono"
                      >
                        <option value="100 – 500 (Digital Short Run)">100 – 500 Units (Digital Run)</option>
                        <option value="1000 – 2500 (Offset Economy)">1,000 – 2,500 Units (Offset Run)</option>
                        <option value="5000 – 10000 (Commercial Batch)">5,000 – 10,000 Units (Commercial)</option>
                        <option value="25000+ (High-Volume Industrial)">25,000+ Units (Industrial)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-artwork" className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase mb-1">
                      Artwork & File Readiness
                    </label>
                    <select
                      id="contact-artwork"
                      value={form.artworkStatus}
                      onChange={e => updateField('artworkStatus', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF0000] bg-neutral-50/50 dark:bg-[#0f0f18] font-medium"
                    >
                      <option value="Print-Ready PDF with Outlines">I have print-ready PDF/AI files with bleed</option>
                      <option value="Need Prepress Graphic Design Support">I need graphic design & typesetting created</option>
                      <option value="Physical Sample Re-Run">I have an existing physical printed sample to match</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase mb-1">
                      Project Details, Paper Specs & Notes
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={form.message}
                      onChange={e => updateField('message', e.target.value)}
                      placeholder="Specify sizes (e.g. 3.5x2 inches, A4), paper preference (Matte, Gloss, Textured, Velvet), foil colors, or deadline..."
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#FF0000] bg-neutral-50/50 dark:bg-[#0f0f18]"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ y: -1.5 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.24, ease: EASE_STUDIO }}
                    className="group w-full py-3.5 px-6 rounded-xl bg-[#FF0000] hover:bg-[#D60000] text-white text-xs font-mono font-bold uppercase tracking-wider transition-[background-color,box-shadow] duration-300 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Transmit Specifications for Quotation</span>
                    <Send className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                  </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

            </Reveal>

          </div>
        </div>
      </section>

      {/* 3. FAQ Section */}
      <section className="py-14 sm:py-18 lg:py-20 bg-white dark:bg-[#0c0c12] border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-14">
            <Reveal distance={14} duration={0.55}>
              <span className="text-xs font-mono font-bold text-[#FF0000] tracking-widest uppercase block mb-2.5 sm:mb-3">
                PREPRESS ADVISORY
              </span>
            </Reveal>
            <MaskedTextReveal delay={0.08}>
              <h2 className="text-3xl font-display font-black text-neutral-900 dark:text-white uppercase">
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </MaskedTextReveal>
          </div>

          <StaggerContainer staggerDelay={0.07} className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <StaggerItem
                  key={idx}
                  yOffset={16}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50/50 dark:bg-[#14141e] transition-colors hover:border-[#C99A50]/50"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-neutral-900 dark:text-white cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: EASE_STUDIO }}
                      className="shrink-0"
                    >
                      <ChevronDown className="w-4 h-4 text-[#C99A50]" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`faq-content-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: EASE_STUDIO }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

    </div>
  );
};
