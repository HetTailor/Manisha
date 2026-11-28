import React from 'react';

interface ManishaLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showText?: boolean;
  priority?: boolean;
  className?: string;
}

export const ManishaLogo: React.FC<ManishaLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = false,
  showText = false,
  priority = true,
  className = '',
}) => {
  const isLight = variant === 'light';

  // Responsive heights matching the 1527x652 (~2.34:1 horizontal) transparent logo
  const logoHeight = {
    sm: 'h-9 sm:h-10',
    md: 'h-12 sm:h-14 lg:h-[60px]',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
  }[size];

  return (
    <div className={`flex flex-col items-start gap-2 select-none ${className}`}>
      {/* Official MANISHA GRAPHIX Transparent Horizontal Logo */}
      <div
        className={`relative inline-flex items-center justify-center shrink-0 transition-[background-color,box-shadow] duration-300 ${
          !isLight ? 'bg-white/95 px-2.5 py-1 rounded-xl shadow-sm ring-1 ring-white/15' : 'bg-transparent'
        }`}
      >
        <picture>
          <source srcSet="/assets/manisha-graphix-header-logo.webp" type="image/webp" />
          <img
            src="/assets/manisha-graphix-header-logo.png"
            alt="MANISHA GRAPHIX — Graphic Design & Printing Studio"
            width={1527}
            height={652}
            className={`${logoHeight} w-auto max-w-full object-contain block`}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
          />
        </picture>
      </div>

      {showText && showTagline && (
        <span
          className={`text-[9px] font-mono tracking-wider uppercase ${
            isLight ? 'text-slate-500' : 'text-neutral-400'
          }`}
        >
          Graphic Design · Print · Create
        </span>
      )}
    </div>
  );
};
