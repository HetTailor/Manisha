import React from 'react';
import { ArrowRight, FileText, Heart, Plus, BookOpen } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ServicesProps {
  onSelectServiceForQuote: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForQuote }) => {
  const { colorMode } = useTheme();
  const isLight = colorMode === 'light';

  const services = [
    {
      id: 'stationery-printing',
      title: 'STATIONERY & PRINTING',
      description: 'Professional printing solutions for businesses and personal requirements.',
      imageSrc: 'https://het.assistwebstudio.in/wp-content/uploads/2026/11/4b3741cc531e22908bb5572077d57799.jpg',
      icon: FileText,
      items: [
        'Visiting Cards',
        'Letterheads',
        'Envelopes',
        'Brochures',
        'Flyers',
        'Bill Books',
        'Business Stationery',
      ],
    },
    {
      id: 'wedding-cards',
      title: 'WEDDING CARDS',
      description: 'Beautiful invitation designs created to make your special moments memorable.',
      imageSrc: 'https://het.assistwebstudio.in/wp-content/uploads/2026/11/a984285e57d4a2c8c4563ac52ee5b7a1.jpg',
      icon: Heart,
      items: [
        'Wedding Invitations',
        'Engagement Cards',
        'Reception Cards',
        'Custom Designs',
        'Premium Finishing',
      ],
    },
    {
      id: 'pharmaceutical-printing',
      title: 'PHARMACEUTICAL',
      description: 'Professional printing solutions for pharmaceutical and medical businesses.',
      imageSrc: 'https://het.assistwebstudio.in/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-21-at-4.43.24-PM.jpeg',
      icon: Plus,
      items: [
        'Medicine Boxes',
        'Labels',
        'Product Inserts',
        'Pharmaceutical Brochures',
        'Prescription Pads',
        'Product Information',
      ],
    },
    {
      id: 'book-work',
      title: 'BOOK WORK',
      description: 'Complete printing solutions for books, publications and educational materials.',
      imageSrc: 'https://het.assistwebstudio.in/wp-content/uploads/2026/11/c600663b76e9b1e5d854e40adb471489.jpg',
      icon: BookOpen,
      items: [
        'Book Printing',
        'Book Covers',
        'Project Reports',
        'Catalogues',
        'Manuals',
        'Binding & Finishing',
      ],
    },
  ];

  return (
    <section id="services" className={`py-20 ${isLight ? 'bg-[#f8f9fa]' : 'bg-[#09090f]'} border-b ${isLight ? 'border-neutral-200' : 'border-neutral-800'} relative overflow-hidden transition-colors duration-500`}>
      {/* Background Halftone Dotted Graphics in corners */}
      <div 
        className="absolute top-0 left-0 w-80 h-80 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#FF0000 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#FF0000 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12 space-y-2">
          <div className="text-xs font-mono font-bold tracking-widest text-[#FF0000] uppercase">
            OUR SERVICES
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase ${isLight ? 'text-slate-950' : 'text-white'}`}>
            WHAT WE <span className="text-[#FF0000]">DO</span>
          </h2>

          <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-neutral-400'} font-sans`}>
            Creative solutions for every printing requirement.
          </p>
        </div>

        {/* 4 Service Cards Grid matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`group rounded-3xl ${
                  isLight 
                    ? 'bg-white border-neutral-200 shadow-sm hover:shadow-xl' 
                    : 'bg-[#121218] border-neutral-800 shadow-lg hover:border-neutral-700'
                } border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5`}
              >
                {/* Card Top: Photo with overlapping circular badge */}
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-neutral-100">
                    <img
                      src={service.imageSrc}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Circular Floating Badge with Golden/Red Gradient */}
                    <div className="absolute -bottom-5 left-6 w-11 h-11 rounded-full bg-gradient-to-tr from-[#FF0000] to-[#C99A50] border-4 border-white shadow-md flex items-center justify-center text-white z-10">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 pt-9 space-y-3.5 text-left">
                    <h3 className={`text-base font-display font-extrabold tracking-tight uppercase ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {service.title}
                    </h3>

                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-neutral-400'} leading-relaxed font-sans`}>
                      {service.description}
                    </p>

                    {/* Bullet List with Red Dots */}
                    <ul className="space-y-1.5 pt-2">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] shrink-0" />
                          <span className={`${isLight ? 'text-slate-700' : 'text-neutral-300'} font-sans`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action: Vivid Red Circle Button with Arrow */}
                <div className="p-6 pt-0 flex justify-end">
                  <button
                    onClick={() => onSelectServiceForQuote(service.id)}
                    aria-label={`Get quote for ${service.title}`}
                    className="w-9 h-9 rounded-full bg-[#FF0000] hover:bg-[#D60000] text-white flex items-center justify-center shadow-md shadow-red-600/30 transition-all group-hover:scale-110 active:scale-95"
                  >
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
