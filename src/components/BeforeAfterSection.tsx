import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldAlert, SlidersHorizontal, Eye } from 'lucide-react';
import { BEFORE_AFTER_CASES } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface BeforeAfterSectionProps {
  onBookConsultation: () => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ onBookConsultation }) => {
  const [activeCategory, setActiveCategory] = useState<'whitening' | 'veneers' | 'aligners' | 'makeover'>('whitening');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const activeCase = BEFORE_AFTER_CASES.find((c) => c.category === activeCategory) || BEFORE_AFTER_CASES[0];

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, rect);
  };

  const handleCta = () => {
    trackEvent('cta_click', { ctaName: 'BOOK MY SMILE CONSULTATION (Before/After)', section: 'Before & After' });
    onBookConsultation();
  };

  return (
    <section id="before-after" className="py-8 sm:py-12 lg:py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <span>Visual Evidence & Precision</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Real Transformations, Real Smiles
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Slide horizontally to explore clinical treatment outcomes across our cosmetic and restorative disciplines.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1 flex-nowrap sm:flex-wrap no-scrollbar justify-start sm:justify-center px-1">
          {[
            { id: 'whitening', label: 'Teeth Whitening' },
            { id: 'veneers', label: 'Porcelain Veneers' },
            { id: 'aligners', label: 'Clear Aligners' },
            { id: 'makeover', label: 'Smile Makeover' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id as any);
                setSliderPosition(50);
              }}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                activeCategory === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Card */}
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-6 lg:p-8 shadow-md">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
            
            {/* Interactive Image Slider */}
            <div className="lg:col-span-7 flex flex-col items-center">
              
              <div
                className="relative w-full h-56 sm:h-72 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-sm border border-slate-300 touch-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchMove={handleTouchMove}
              >
                {/* After Image (Full background) */}
                <img
                  src={activeCase.afterImg}
                  alt={`${activeCase.title} After`}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                />

                {/* Before Image (Clipped by slider percentage) */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={activeCase.beforeImg}
                    alt={`${activeCase.title} Before`}
                    className="absolute inset-0 w-full h-full object-cover filter contrast-90 brightness-95"
                    style={{
                      width: '100%',
                      minWidth: '320px',
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Vertical Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Circular Draggable Handle */}
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-xl border-2 border-sky-600 flex items-center justify-center text-sky-700">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Badges on images */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-sm pointer-events-none">
                  BEFORE
                </div>
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-sky-600/90 text-white text-[10px] font-bold backdrop-blur-sm pointer-events-none">
                  AFTER
                </div>

                {/* Drag Hint on bottom */}
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-medium backdrop-blur-md pointer-events-none flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>Drag left or right</span>
                </div>
              </div>

            </div>

            {/* Case Details & Narrative */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4 text-left">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-2.5 py-0.5 rounded-full">
                {activeCase.timeframe}
              </span>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {activeCase.title}
              </h3>

              <div className="text-xs font-semibold text-slate-500">
                <span className="text-slate-700 font-bold">Procedure:</span> {activeCase.treatmentType}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeCase.description}
              </p>

              <div className="pt-1">
                <button
                  onClick={handleCta}
                  id="before-after-cta-btn"
                  className="theme-btn-primary w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all transform active:scale-98 sm:hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>BOOK MY SMILE CONSULTATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Required Medical Disclaimer */}
              <div className="flex items-start gap-1.5 pt-1 text-[10px] sm:text-[11px] text-slate-500 leading-normal">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Clinical Notice:</strong> Results vary by patient and treatment suitability. Individual outcomes depend on bone health, enamel condition, and dental guidance.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
