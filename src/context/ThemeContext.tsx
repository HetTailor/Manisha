import React, { createContext, useContext, useState, useEffect } from 'react';

export type ColorMode = 'dark' | 'light' | 'hybrid';
export type AccentPalette = 'crimson' | 'violet' | 'cyan' | 'gold' | 'emerald';
export type TypeTheme = 'outfit' | 'jakarta' | 'syne' | 'playfair';

export interface ThemePreset {
  id: AccentPalette;
  name: string;
  tagline: string;
  hex: string;
  secondaryHex: string;
  glow: string;
  gradient: string;
}

export interface TypePreset {
  id: TypeTheme;
  name: string;
  displayFont: string;
  tagline: string;
  description: string;
  fontClass: string;
}

export interface ThemeProperties {
  colorMode: ColorMode;
  accent: AccentPalette;
  accentName: string;
  accentHex: string;
  accentSecondaryHex: string;
  glowRgba: string;
  // Dynamic tailwind style helpers
  bgCanvas: string;
  bgSurface: string;
  bgSurfaceSubtle: string;
  bgCardHover: string;
  borderSubtle: string;
  borderAccent: string;
  textHeading: string;
  textBody: string;
  textMuted: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  primaryBtn: string;
  secondaryBtn: string;
  cardBg: string;
  cardBorder: string;
}

export const THEME_PRESETS: Record<AccentPalette, ThemePreset> = {
  crimson: {
    id: 'crimson',
    name: 'Logo Red & Golden',
    tagline: 'Brand Red & Stamped Golden',
    hex: '#FF0000',
    secondaryHex: '#C99A50',
    glow: 'rgba(255, 0, 0, 0.35)',
    gradient: 'linear-gradient(135deg, #FF0000 0%, #D60000 50%, #C99A50 100%)',
  },
  violet: {
    id: 'violet',
    name: 'Royal Violet',
    tagline: 'Deep Charcoal & Electric Violet',
    hex: '#8b5cf6',
    secondaryHex: '#7c3aed',
    glow: 'rgba(139, 92, 246, 0.32)',
    gradient: 'linear-gradient(135deg, #c084fc 0%, #8b5cf6 50%, #6d28d9 100%)',
  },
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan',
    tagline: 'Pitch Black & Neon Cyan',
    hex: '#06b6d4',
    secondaryHex: '#0284c7',
    glow: 'rgba(6, 182, 212, 0.32)',
    gradient: 'linear-gradient(135deg, #67e8f9 0%, #06b6d4 50%, #0369a1 100%)',
  },
  gold: {
    id: 'gold',
    name: 'Logo Golden',
    tagline: 'Brand Golden & Stamped Foil',
    hex: '#C99A50',
    secondaryHex: '#9e7534',
    glow: 'rgba(201, 154, 80, 0.35)',
    gradient: 'linear-gradient(135deg, #f2d8a7 0%, #C99A50 50%, #9e7534 100%)',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Mint',
    tagline: 'Deep Forest & Bright Emerald',
    hex: '#10b981',
    secondaryHex: '#059669',
    glow: 'rgba(16, 185, 129, 0.32)',
    gradient: 'linear-gradient(135deg, #6ee7b7 0%, #10b981 50%, #047857 100%)',
  },
};

export const TYPE_THEMES: Record<TypeTheme, TypePreset> = {
  outfit: {
    id: 'outfit',
    name: 'Outfit & Jakarta',
    displayFont: 'Outfit',
    tagline: 'Modern Geometric Tech',
    description: 'Clean geometric curves optimized for high-end digital & offset print brands.',
    fontClass: 'font-display',
  },
  jakarta: {
    id: 'jakarta',
    name: 'Plus Jakarta Sans',
    displayFont: 'Plus Jakarta',
    tagline: 'High-Legibility Modernist',
    description: 'Sharp humanist sans-serif with excellent micro-typographic clarity.',
    fontClass: 'font-sans',
  },
  syne: {
    id: 'syne',
    name: 'Syne Avant-Garde',
    displayFont: 'Syne',
    tagline: 'Bold Expressive Editorial',
    description: 'Striking headline letterforms for creative studio impressions.',
    fontClass: 'font-display',
  },
  playfair: {
    id: 'playfair',
    name: 'Playfair Heritage',
    displayFont: 'Playfair Display',
    tagline: 'Luxury Editorial Serif',
    description: 'Classic high-contrast serifs reminiscent of fine Italian letterpress.',
    fontClass: 'font-serif',
  },
};

export const getThemeProperties = (colorMode: ColorMode, accent: AccentPalette): ThemeProperties => {
  const preset = THEME_PRESETS[accent] || THEME_PRESETS.crimson;
  const isLight = colorMode === 'light';

  return {
    colorMode,
    accent,
    accentName: preset.name,
    accentHex: preset.hex,
    accentSecondaryHex: preset.secondaryHex,
    glowRgba: preset.glow,
    // Backgrounds
    bgCanvas: isLight ? 'bg-white' : 'bg-[#0c0c12]',
    bgSurface: isLight ? 'bg-white' : 'bg-[#14141c]',
    bgSurfaceSubtle: isLight ? 'bg-[#fafafa]' : 'bg-[#1b1b26]',
    bgCardHover: isLight ? 'hover:bg-neutral-50' : 'hover:bg-[#20202e]',
    cardBg: isLight ? 'bg-white' : 'bg-[#14141e]',
    cardBorder: isLight ? 'border-neutral-200' : 'border-white/10',
    // Borders
    borderSubtle: isLight ? 'border-neutral-200' : 'border-white/10',
    borderAccent: isLight ? 'border-[#C99A50]' : 'border-[#C99A50]/60',
    // Typography
    textHeading: isLight ? 'text-slate-950' : 'text-white',
    textBody: isLight ? 'text-slate-700' : 'text-neutral-300',
    textMuted: isLight ? 'text-slate-500' : 'text-neutral-500',
    // Badges (Golden accents, Red text)
    badgeBg: isLight ? 'bg-[#C99A50]/10' : 'bg-[#C99A50]/20',
    badgeBorder: isLight ? 'border-[#C99A50]/35' : 'border-[#C99A50]/40',
    badgeText: 'text-[#FF0000]',
    // Buttons (Vivid Red primary with high contrast)
    primaryBtn: 'bg-[#FF0000] hover:bg-[#D60000] text-white shadow-lg shadow-red-600/25 font-bold transition-all',
    secondaryBtn: isLight
      ? 'bg-white hover:bg-neutral-100 text-slate-800 border-neutral-300'
      : 'bg-white/[0.07] hover:bg-white/[0.12] text-neutral-100 border-white/20',
  };
};

interface ThemeContextType {
  theme: ThemeProperties;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  accent: AccentPalette;
  setAccent: (accent: AccentPalette) => void;
  typeTheme: TypeTheme;
  setTypeTheme: (type: TypeTheme) => void;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: getThemeProperties('light', 'crimson'),
  colorMode: 'light',
  setColorMode: () => {},
  accent: 'crimson',
  setAccent: () => {},
  typeTheme: 'outfit',
  setTypeTheme: () => {},
  toggleColorMode: () => {},
});

const COLOR_MODE_STORAGE_KEY = 'manisha-graphix-color-mode';

function getInitialColorMode(): ColorMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch {
    // Ignore storage access errors in restricted environments
  }
  const attr = document.documentElement.getAttribute('data-color-mode');
  if (attr === 'dark' || attr === 'light') {
    return attr;
  }
  return 'light';
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Crisp White & Vivid Red, persisted via localStorage
  const [colorMode, setColorMode] = useState<ColorMode>(getInitialColorMode);
  const [accent, setAccent] = useState<AccentPalette>('crimson');
  const [typeTheme, setTypeTheme] = useState<TypeTheme>('outfit');

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', colorMode);
    document.documentElement.setAttribute('data-accent', accent);
    document.documentElement.setAttribute('data-type-theme', typeTheme);

    try {
      window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, colorMode);
    } catch {
      // Ignore storage access errors in restricted environments
    }
    
    // Set CSS custom properties
    const preset = THEME_PRESETS[accent] || THEME_PRESETS.crimson;
    document.documentElement.style.setProperty('--theme-accent', preset.hex);
    document.documentElement.style.setProperty('--theme-accent-secondary', preset.secondaryHex);
    document.documentElement.style.setProperty('--theme-glow', preset.glow);

    if (colorMode === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', colorMode === 'dark' ? '#09090e' : '#ffffff');
    }
  }, [colorMode, accent, typeTheme]);

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const theme = getThemeProperties(colorMode, accent);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorMode,
        setColorMode,
        accent,
        setAccent,
        typeTheme,
        setTypeTheme,
        toggleColorMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
