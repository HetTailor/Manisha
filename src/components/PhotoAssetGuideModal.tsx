import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Image as ImageIcon, Sparkles, HelpCircle } from 'lucide-react';
import { IMAGE_SEARCH_GUIDE } from '../data/content';

interface PhotoAssetGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoAssetGuideModal: React.FC<PhotoAssetGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (keyword: string, id: string) => {
    navigator.clipboard.writeText(keyword);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Close guide modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold mb-1">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Curator & Production Guide</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Real Photography Suggestions & Stock Keywords
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            As requested, here is the complete reference table for sourcing <strong>authentic commercial printing photographs</strong> rather than generic AI graphics. Use these exact Google/stock search queries to source high-resolution imagery for Harshil Mistry’s website.
          </p>
        </div>

        {/* Guide Items List */}
        <div className="space-y-4">
          {IMAGE_SEARCH_GUIDE.map((guide, idx) => {
            const isCopied = copiedId === guide.sectionId;

            return (
              <div
                key={guide.sectionId}
                className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-amber-50/20 hover:border-amber-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Information */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      {guide.sectionName}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {guide.aspectRatio} · {guide.recommendedResolution}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900">
                    {guide.description}
                  </p>
                  <p className="text-xs text-slate-600">
                    {guide.suggestedSubject}
                  </p>

                  <div className="pt-1 flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-slate-400">Search Keyword:</span>
                    <code className="text-xs font-mono bg-white border border-slate-200 px-2 py-0.5 rounded text-amber-950 font-bold select-all">
                      {guide.exactSearchKeyword}
                    </code>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                  <button
                    onClick={() => handleCopy(guide.exactSearchKeyword, guide.sectionId)}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-amber-600 text-white transition-colors"
                    title="Copy keyword"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Keyword</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(guide.exactSearchKeyword)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Search on Google Images"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <span>* Tip: You can also click "Upload Real Photo" on any section of the live site to preview your files immediately.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-sans font-semibold shrink-0"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
