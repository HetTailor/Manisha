import React, { useState } from 'react';
import { Copy, Check, Info, Upload, Sparkles } from 'lucide-react';

interface SectionImageSlotProps {
  id: string;
  title: string;
  suggestedText: string;
  searchKeyword: string;
  aspectRatioClass?: string;
  themeType?: 'press' | 'designer' | 'stationery' | 'wedding' | 'pharma' | 'books' | 'finishing' | 'workspace';
  onOpenGuide?: () => void;
  userCustomImage?: string;
  onUploadImage?: (dataUrl: string) => void;
}

export const SectionImageSlot: React.FC<SectionImageSlotProps> = ({
  title,
  suggestedText,
  searchKeyword,
  aspectRatioClass = 'aspect-4/3',
  themeType = 'press',
  onOpenGuide,
  userCustomImage,
  onUploadImage,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPromptDetails, setShowPromptDetails] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(searchKeyword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadImage) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUploadImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`relative group overflow-hidden rounded-xl border border-neutral-200/90 bg-slate-900 shadow-sm ${aspectRatioClass} flex flex-col justify-between`}>
      {/* Background: User uploaded custom photo OR styled graphic container */}
      {userCustomImage ? (
        <img
          src={userCustomImage}
          alt={title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
        />
      ) : (
        <div className="absolute inset-0 overflow-hidden bg-radial from-slate-800 via-slate-900 to-slate-950 flex flex-col justify-between p-6">
          {/* Subtle CMYK dot grid pattern */}
          <div className="absolute inset-0 opacity-15 bg-print-grid pointer-events-none" />

          {/* Theme-specific visual composition */}
          <div className="relative z-10 flex items-center justify-between">
            {/* CMYK Registration Mark */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 border border-white/10 text-[11px] font-mono text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#C99A50] inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
              <span className="tracking-wide ml-1">REG. 0.05mm</span>
            </div>

            {/* Quick upload real photo trigger */}
            {onUploadImage && (
              <label className="cursor-pointer flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors">
                <Upload className="w-3 h-3" />
                <span>Upload Real Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Center Graphic Motif based on theme */}
          <div className="relative z-10 my-auto text-center px-4 py-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/5 border border-white/15 mb-3 text-amber-400 backdrop-blur-xs">
              {themeType === 'press' && (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 6h16M4 10h16M4 14h16M4 18h16" strokeLinecap="round" />
                  <rect x="2" y="3" width="20" height="18" rx="2" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
              {themeType === 'designer' && (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              )}
              {themeType === 'stationery' && (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <line x1="7" y1="15" x2="11" y2="15" />
                </svg>
              )}
              {themeType === 'wedding' && (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              )}
              {themeType === 'pharma' && (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                  <path d="m8.5 8.5 7 7" />
                </svg>
              )}
              {themeType === 'books' && (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                  <path d="M6 6h10M6 10h10" />
                </svg>
              )}
              {themeType === 'finishing' && (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="m14 7 3-3m-3 3 5 5M7 14l-3 3m3-3 5 5m0-10 2 2m-2-2L6 17" />
                </svg>
              )}
              {themeType === 'workspace' && (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              )}
            </div>

            <p className="text-white font-medium text-sm sm:text-base leading-snug">
              {title}
            </p>
            <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto line-clamp-2">
              {suggestedText}
            </p>
          </div>

          {/* Bottom Stock Search keyword strip */}
          <div className="relative z-10 bg-black/60 backdrop-blur-md rounded-lg p-2.5 border border-white/10 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 block font-semibold">
                Suggested Real Stock Search
              </span>
              <p className="text-xs font-mono text-slate-200 truncate select-all">
                "{searchKeyword}"
              </p>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded bg-white/15 hover:bg-white/25 text-white transition-colors shrink-0"
              title="Copy exact search keyword to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-[11px] text-emerald-300">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span className="text-[11px]">Copy Search</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Floating subtle recommendation button in corner */}
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={() => setShowPromptDetails(!showPromptDetails)}
          className="p-1.5 rounded-full bg-black/70 hover:bg-black text-slate-300 hover:text-white border border-white/20 transition-colors shadow-xs"
          title="Section Real Photo Recommendation Details"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Expanded details overlay when user clicks info icon */}
      {showPromptDetails && (
        <div className="absolute inset-0 z-30 bg-slate-950/95 p-5 flex flex-col justify-between text-left text-xs backdrop-blur-md overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Photo Recommendation
              </span>
              <button
                onClick={() => setShowPromptDetails(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="mt-3 space-y-2 text-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Suggested Subject:</span>
                <p className="text-white mt-0.5">{suggestedText}</p>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Real Google/Stock Search Keyword:</span>
                <p className="font-mono text-amber-300 bg-slate-900 px-2 py-1 rounded mt-0.5">
                  {searchKeyword}
                </p>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                * MANISHA GRAPHIX specifies authentic real-life photography of commercial machinery, crafted invitations, and cartons instead of AI slop.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded font-medium text-center"
            >
              {copied ? 'Copied Keyword!' : 'Copy Exact Search Keyword'}
            </button>
            {onOpenGuide && (
              <button
                onClick={onOpenGuide}
                className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-medium"
              >
                Open Guide
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
