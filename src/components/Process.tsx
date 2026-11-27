import React from 'react';
import { MessageSquare, Monitor, CheckCircle, Printer, Truck, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Process: React.FC = () => {
  const { colorMode } = useTheme();
  const isLight = colorMode === 'light';

  const steps = [
    {
      number: '01',
      title: 'DISCUSS',
      desc: "Understand the client's requirement.",
      icon: MessageSquare,
    },
    {
      number: '02',
      title: 'DESIGN',
      desc: 'Create the design according to the project.',
      icon: Monitor,
    },
    {
      number: '03',
      title: 'REVIEW',
      desc: 'Client reviews and approves the design.',
      icon: CheckCircle,
    },
    {
      number: '04',
      title: 'PRINT',
      desc: 'Approved artwork goes into production.',
      icon: Printer,
    },
    {
      number: '05',
      title: 'DELIVER',
      desc: 'Final products are prepared and delivered.',
      icon: Truck,
    },
  ];

  return (
    <section 
      id="process" 
      className={`py-20 ${isLight ? 'bg-white' : 'bg-[#0a0a10]'} border-b ${isLight ? 'border-neutral-200' : 'border-neutral-800'} relative overflow-hidden transition-colors duration-500`}
    >
      {/* Background Halftone Graphic on right side matching reference */}
      <div 
        className="absolute top-0 right-0 w-96 h-full pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#FF0000 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16 space-y-2">
          <div className="text-xs font-mono font-bold tracking-widest text-[#FF0000] uppercase">
            OUR PROCESS
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase ${isLight ? 'text-slate-950' : 'text-white'}`}>
            A SIMPLE <span className="text-[#FF0000]">5-STEP PROCESS</span>
          </h2>
          <p className={`text-xs sm:text-sm font-sans max-w-xl leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            From understanding your needs to delivering the final result, our simple five-step process keeps every project organized, smooth, and hassle-free.
          </p>
        </div>

        {/* 5 Connected Stages in Horizontal Flow matching reference image */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative items-start">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === steps.length - 1;

              return (
                <div key={step.number} className="relative flex flex-col items-center md:items-start text-center md:text-left group">
                  
                  {/* Top: Icon in Red Circle with Connecting Arrow to next step */}
                  <div className="flex items-center w-full justify-center md:justify-start relative mb-4">
                    {/* Vivid Red Circle with White Icon */}
                    <div className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-md shadow-red-600/30 shrink-0 z-10 transition-transform group-hover:scale-110">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    {/* Connecting Line with Arrowhead */}
                    {!isLast && (
                      <div className="hidden md:flex items-center flex-1 ml-3 pr-2">
                        <div className="h-0.5 bg-neutral-300 w-full relative">
                          <ArrowRight className="w-3.5 h-3.5 text-[#FF0000] absolute right-0 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step Number + Title */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 justify-center md:justify-start">
                      <span className="text-sm font-mono font-bold text-neutral-400">
                        {step.number}
                      </span>
                      <h3 className={`text-sm font-display font-extrabold tracking-wider uppercase ${isLight ? 'text-slate-950' : 'text-white'}`}>
                        {step.title}
                      </h3>
                    </div>

                    {/* Step Description matching reference exactly */}
                    <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-neutral-400'} font-sans leading-relaxed max-w-[180px]`}>
                      {step.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
