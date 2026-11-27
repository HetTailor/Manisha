import React, { useState } from 'react';
import { Palette, Sun, Moon, Sparkles, Check, X, Type, Layers } from 'lucide-react';
import { useTheme, AccentPalette, TypeTheme, THEME_PRESETS, TYPE_THEMES } from '../context/ThemeContext';

export const ThemeStudio: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'design' | 'typography'>('design');
  const { theme, colorMode, toggleColorMode, accent, setAccent, typeTheme, setTypeTheme } = useTheme();
  const isLight = colorMode === 'light';

  const designPresets = Object.values(THEME_PRESETS);
  const typePresets = Object.values(TYPE_THEMES);

  return (
    <>
      {/* Floating Theme Launcher Trigger Pill */}
      <aside aria-label="Theme Studio" className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-stone-900/90 hover:bg-stone-850 text-white border border-white/15 backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95"
          title="Open Theme & Type Studio"
        >
          <div
            style={{ backgroundColor: theme.accentHex, boxShadow: `0 0 10px ${theme.accentHex}` }}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors animate-pulse"
          />
          <span className="text-[11px] sm:text-xs font-mono font-medium tracking-wider uppercase text-stone-200 group-hover:text-white flex items-center gap-1.5 sm:gap-2">
            <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: theme.accentHex }} />
            <span>Theme: {theme.accentName}</span>
          </span>
          <span className="hidden xs:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-stone-300 border border-white/10">
            {TYPE_THEMES[typeTheme]?.displayFont}
          </span>
        </button>
      </aside>

      {/* Expanded Theme Customizer Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Theme & Typography Customizer"
          className="fixed bottom-20 left-6 z-50 w-96 max-w-[calc(100vw-3rem)] rounded-2xl bg-stone-950/95 border border-white/15 p-5 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div
                style={{ backgroundColor: theme.accentHex }}
                className="w-3 h-3 rounded-full"
              />
              <h3 className="text-sm font-display font-bold text-white tracking-wide uppercase">
                Theme & Type Studio
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close theme studio"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs: Design Theme vs Typography Theme */}
          <div className="grid grid-cols-2 gap-1 p-1 mt-3 rounded-xl bg-stone-900 border border-white/10">
            <button
              onClick={() => setActiveTab('design')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'design'
                  ? 'bg-stone-800 text-white font-bold shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Theme Design</span>
            </button>
            <button
              onClick={() => setActiveTab('typography')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'typography'
                  ? 'bg-stone-800 text-white font-bold shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Type Theme</span>
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {/* Dark / Light Canvas Mode Switch */}
            <div>
              <label className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-2">
                Paper & Canvas Finish
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-stone-900 border border-white/10">
                <button
                  onClick={() => colorMode !== 'dark' && toggleColorMode()}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                    !isLight
                      ? 'bg-stone-800 text-white shadow-xs font-bold'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Obsidian Noir</span>
                </button>
                <button
                  onClick={() => colorMode !== 'light' && toggleColorMode()}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                    isLight
                      ? 'bg-stone-800 text-white shadow-xs font-bold'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Fine-Art Rag</span>
                </button>
              </div>
            </div>

            {/* TAB 1: DESIGN THEME PRESETS */}
            {activeTab === 'design' && (
              <div>
                <label className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-2">
                  Atelier Print & Foil Palettes
                </label>
                <div className="space-y-2">
                  {designPresets.map((p) => {
                    const isSelected = accent === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setAccent(p.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                          isSelected
                            ? 'bg-white/[0.08] border-white/30 text-white shadow-sm ring-1 ring-white/20'
                            : 'bg-stone-900/70 border-white/5 text-stone-300 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            style={{
                              background: p.gradient,
                              boxShadow: isSelected ? `0 0 14px ${p.hex}` : 'none',
                            }}
                            className="w-5 h-5 rounded-full border border-white/30 shrink-0"
                          />
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-2">
                              <span>{p.name}</span>
                              {p.id === 'crimson' && (
                                <span className="text-[9px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                              {p.tagline}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <Check className="w-4 h-4 shrink-0" style={{ color: p.hex }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: TYPE THEME (TYPOGRAPHY SYSTEMS) */}
            {activeTab === 'typography' && (
              <div>
                <label className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-2">
                  Typography & Font Pairings
                </label>
                <div className="space-y-2">
                  {typePresets.map((t) => {
                    const isSelected = typeTheme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTypeTheme(t.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                          isSelected
                            ? 'bg-white/[0.08] border-white/30 text-white shadow-sm ring-1 ring-white/20'
                            : 'bg-stone-900/70 border-white/5 text-stone-300 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">
                              {t.name}
                            </span>
                            <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                              {t.displayFont}
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-400 font-mono">
                            {t.tagline}
                          </div>
                          <div className="text-[10px] text-stone-500 leading-tight">
                            {t.description}
                          </div>
                        </div>

                        {isSelected && (
                          <Check className="w-4 h-4 shrink-0" style={{ color: theme.accentHex }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Current Specimen Preview Footnote */}
            <div className="p-3 rounded-xl bg-stone-900/80 border border-white/10 text-[11px] text-stone-400 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-medium">
                <Sparkles className="w-3.5 h-3.5" style={{ color: theme.accentHex }} />
                <span>Live Studio Feedback</span>
              </div>
              <p className="text-[10px] leading-relaxed text-stone-400">
                Active Theme: <span className="text-stone-200 font-mono">{theme.accentName}</span> &middot; Type: <span className="text-stone-200 font-mono">{TYPE_THEMES[typeTheme]?.name}</span> ({TYPE_THEMES[typeTheme]?.displayFont}). Letterpress depth, finish inspection, and foil hot stamping sync instantaneously.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
