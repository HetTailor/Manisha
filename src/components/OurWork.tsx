import React, { useState } from 'react';
import { Eye, Filter, Sparkles, Upload, X, Check, Copy } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/content';
import { PortfolioItem } from '../types';

interface OurWorkProps {
  onOpenPhotoGuide: () => void;
  onSelectProjectForQuote: (category: string) => void;
}

export const OurWork: React.FC<OurWorkProps> = ({
  onOpenPhotoGuide,
  onSelectProjectForQuote,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'visiting-cards', label: 'Visiting Cards' },
    { id: 'wedding-cards', label: 'Wedding Cards' },
    { id: 'pharma', label: 'Pharmaceutical Packaging' },
    { id: 'books', label: 'Books' },
    { id: 'brochures', label: 'Brochures' },
    { id: 'stationery', label: 'Letterheads & Bill Books' },
    { id: 'custom', label: 'Custom Printing' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const handleUploadPhoto = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCustomPhotos((prev) => ({ ...prev, [id]: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = (keyword: string) => {
    navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  return (
    <section id="our-work" className="py-20 md:py-28 bg-paper-texture border-b border-neutral-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 mb-2 font-semibold">
              <span>Client Showcase</span>
              <span aria-hidden="true">/</span>
              <span>Actual Production Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              From Design to Final Print
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              A curated gallery of actual completed Mistry Graphix work. Real photographs of our finished stationery, invitations, pharmaceutical cartons, and hardbound books.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={onOpenPhotoGuide}
              className="text-xs font-mono text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded bg-white border border-slate-200 shadow-2xs"
            >
              Real Photo Suggestions Guide
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((project) => {
            const hasCustomPhoto = !!customPhotos[project.id];

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                {/* Visual Area */}
                <div className="relative aspect-4/3 bg-slate-900 overflow-hidden">
                  {hasCustomPhoto ? (
                    <img
                      src={customPhotos[project.id]}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-radial from-slate-800 to-slate-950 p-4 flex flex-col justify-between">
                      {/* Top Registration info */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span className="text-amber-400">{project.categoryLabel}</span>
                        <span>MISTRY GRAPHIX</span>
                      </div>

                      {/* Center preview text */}
                      <div className="text-center px-2">
                        <div className="w-10 h-10 mx-auto rounded-lg bg-white/10 flex items-center justify-center text-amber-400 mb-2">
                          <Eye className="w-5 h-5" />
                        </div>
                        <p className="text-white text-xs font-medium line-clamp-2">
                          {project.title}
                        </p>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          Click to inspect specs
                        </span>
                      </div>

                      {/* Bottom keyword hint */}
                      <div className="text-[10px] font-mono text-slate-400 truncate bg-black/40 px-2 py-0.5 rounded">
                        Search: "{project.searchKeyword}"
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                    <span className="text-xs font-semibold text-white bg-amber-600 px-3 py-1.5 rounded shadow">
                      Inspect Specs & Proof
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block uppercase">
                      {project.client}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug group-hover:text-amber-700 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                    <div className="truncate font-medium text-slate-800">
                      {project.specs}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      Finish: {project.finishing}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Project Inspection & Owner Photo Upload */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-700 uppercase font-semibold">
                    <span>{selectedProject.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>Client: {selectedProject.client}</span>
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Image slot in modal */}
                <div className="relative aspect-16/9 rounded-xl bg-slate-900 overflow-hidden border border-slate-200">
                  {customPhotos[selectedProject.id] ? (
                    <img
                      src={customPhotos[selectedProject.id]}
                      alt={selectedProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-radial from-slate-800 to-slate-950 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                        <span>PRINT JOB SPECIFICATION</span>
                        <span className="text-emerald-400">INSPECTED</span>
                      </div>
                      <div className="text-center">
                        <p className="text-white text-sm font-semibold">{selectedProject.title}</p>
                        <p className="text-slate-300 text-xs mt-1 max-w-md mx-auto">
                          Suggested Real Photo: {selectedProject.suggestedImage}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 bg-black/50 p-2 rounded">
                        <span>Exact Search: "{selectedProject.searchKeyword}"</span>
                        <button
                          onClick={() => handleCopy(selectedProject.searchKeyword)}
                          className="text-amber-400 hover:text-amber-300 flex items-center gap-1"
                        >
                          {copiedKeyword === selectedProject.searchKeyword ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Technical Specifications Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 font-mono uppercase text-[10px] block">Paper Stock & Weight</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{selectedProject.paperStock}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 font-mono uppercase text-[10px] block">Finishing & Embellishment</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{selectedProject.finishing}</span>
                  </div>
                </div>

                {/* Owner Photo Upload Affordance */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-amber-900 block">Owner / Client Real Photo Preview:</span>
                    <span className="text-amber-800 text-[11px]">
                      Upload your shop's actual finished photograph for this project to preview it live.
                    </span>
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-700 hover:bg-amber-800 text-white font-medium whitespace-nowrap">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Real Work</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadPhoto(selectedProject.id, e)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      const cat = selectedProject.category;
                      setSelectedProject(null);
                      onSelectProjectForQuote(cat);
                    }}
                    className="flex-1 py-3 px-4 bg-slate-900 hover:bg-amber-600 text-white font-semibold text-xs rounded-lg transition-colors text-center"
                  >
                    Request Similar Print Run
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded-lg transition-colors text-center"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
