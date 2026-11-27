import React, { useState } from 'react';
import { Calculator, Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../data/content';
import { SectionImageSlot } from './SectionImageSlot';

interface ContactCTAProps {
  onOpenQuoteModal: () => void;
  onOpenPhotoGuide: () => void;
  customCtaImage?: string;
  onUploadCtaImage?: (dataUrl: string) => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({
  onOpenQuoteModal,
  onOpenPhotoGuide,
  customCtaImage,
  onUploadCtaImage,
}) => {
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Stationery & Printing',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmittedMessage(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white border-b border-neutral-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Hero Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl mb-16">
          {/* Subtle CMYK dot pattern */}
          <div className="absolute inset-0 opacity-10 bg-print-grid pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Heading & Call to action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                <span>Start Your Production</span>
                <span aria-hidden="true">·</span>
                <span>Owner: {BRAND.owner}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight text-balance">
                Have a Printing Project in Mind?
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Bring your ideas to <strong className="text-white font-semibold">Mistry Graphix</strong> and let us turn them into professional printed materials.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenQuoteModal}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm whitespace-nowrap"
                >
                  <Calculator className="w-4 h-4" />
                  <span>GET A QUOTE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${BRAND.contact.whatsapp}?text=Hello%20Harshil%20Bhai,%20I%20have%20a%20printing%20project%20in%20mind.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>CONTACT US</span>
                </a>
              </div>

              {/* Owner attribution line */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  HM
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Principal Contact</span>
                  <span className="text-sm font-bold text-slate-200">
                    {BRAND.owner} <span className="font-normal text-slate-400 text-xs">· Owner, Mistry Graphix</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Slot for Finished Printed Products */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800 p-2.5 rounded-2xl border border-slate-700">
                <SectionImageSlot
                  id="final-cta-showcase"
                  title="Finished Printed Products Suite"
                  suggestedText="Premium photo of finished printed products such as cards, stationery, books and brochures arranged together."
                  searchKeyword="printed brochures business cards stationery"
                  aspectRatioClass="aspect-4/3"
                  themeType="workspace"
                  onOpenGuide={onOpenPhotoGuide}
                  userCustomImage={customCtaImage}
                  onUploadImage={onUploadCtaImage}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Contact Details & Direct Inquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold">
                Direct Inquiries
              </span>
              <h3 className="text-2xl font-display font-bold text-slate-900 mt-1">
                Reach Harshil Mistry
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Whether you have complete print-ready PDF artwork or need prepress guidance from scratch, we are available to assist.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <a
                href={`tel:${BRAND.contact.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors"
              >
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-amber-700 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">Phone & WhatsApp</span>
                  <span className="font-bold text-slate-900 text-sm">{BRAND.contact.phone}</span>
                </div>
              </a>

              <a
                href={`mailto:${BRAND.contact.email}`}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors"
              >
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-amber-700 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">Email Inquiries</span>
                  <span className="font-bold text-slate-900 text-sm">{BRAND.contact.email}</span>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-amber-700 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">Working Hours</span>
                  <span className="font-medium text-slate-900">{BRAND.contact.hours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-amber-700 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">Press & Production Studio</span>
                  <span className="font-medium text-slate-900">{BRAND.contact.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
            {submittedMessage ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-display font-bold text-slate-900">
                  Message Sent Successfully
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you! Harshil Mistry will contact you shortly to review your printing project.
                </p>
                <button
                  onClick={() => setSubmittedMessage(false)}
                  className="text-xs font-semibold text-amber-700 underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h4 className="text-lg font-display font-bold text-slate-900">
                    Send a Message to Mistry Graphix
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Fill in your project requirements for a quick consultation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Shah"
                      className="w-full text-xs rounded-lg border border-slate-300 p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98250 XXXXX"
                      className="w-full text-xs rounded-lg border border-slate-300 p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. contact@business.com"
                      className="w-full text-xs rounded-lg border border-slate-300 p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full text-xs rounded-lg border border-slate-300 p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                    >
                      <option value="Stationery & Printing">Stationery & Printing</option>
                      <option value="Wedding Cards">Wedding Cards</option>
                      <option value="Pharmaceutical Printing">Pharmaceutical Printing</option>
                      <option value="Book Work">Book Work</option>
                      <option value="Other Custom Printing">Other Custom Printing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Describe Your Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mention quantity, required delivery date, or preferred paper finishing..."
                    className="w-full text-xs rounded-lg border border-slate-300 p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-amber-600 text-white font-semibold text-xs rounded-lg transition-colors text-center"
                >
                  Send Message to Harshil Mistry
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
