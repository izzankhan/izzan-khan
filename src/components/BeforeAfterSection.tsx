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
    <section id="before-after" className="py-12 sm:py-16 lg:py-20 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Visual Evidence & Clinical Precision</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Real Transformations, <span className="text-[#D4AF37]">Real Smiles</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9CA3AF]">
            Slide horizontally to explore actual treatment outcomes across our cosmetic and restorative disciplines.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-8 sm:mb-10 overflow-x-auto pb-1 flex-nowrap sm:flex-wrap no-scrollbar justify-start sm:justify-center px-1">
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
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                activeCategory === tab.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B88E28] text-black font-black shadow-md shadow-[#D4AF37]/20'
                  : 'bg-[#141418] text-[#9CA3AF] hover:text-white hover:bg-[#1A1A22] border border-[#D4AF37]/25'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Card */}
        <div className="max-w-4xl mx-auto bg-[#121216] rounded-2xl sm:rounded-3xl border border-[#D4AF37]/30 p-5 sm:p-7 lg:p-9 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Interactive Image Slider */}
            <div className="lg:col-span-7 flex flex-col items-center">
              
              <div
                className="relative w-full h-60 sm:h-72 lg:h-80 rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-lg border border-[#D4AF37]/30 touch-none bg-[#181822]"
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
                  className="absolute top-0 bottom-0 w-1 bg-[#D4AF37] shadow-lg pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Circular Draggable Handle */}
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#D4AF37] shadow-xl border-2 border-black flex items-center justify-center text-black font-bold">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Badges on images */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-bold backdrop-blur-sm border border-white/20 pointer-events-none">
                  BEFORE
                </div>
                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md bg-[#D4AF37] text-black text-[10px] font-black backdrop-blur-sm pointer-events-none">
                  AFTER
                </div>

                {/* Drag Hint on bottom */}
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/75 text-white text-[10px] font-semibold backdrop-blur-md pointer-events-none flex items-center gap-1.5 border border-[#D4AF37]/30">
                  <Eye className="w-3 h-3 text-[#D4AF37]" />
                  <span>Drag slider left or right</span>
                </div>
              </div>

            </div>

            {/* Case Details & Narrative */}
            <div className="lg:col-span-5 space-y-3.5 sm:space-y-4 text-left">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#D4AF37] bg-[#181824] px-3 py-1 rounded-full border border-[#D4AF37]/35">
                {activeCase.timeframe}
              </span>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Outfit']">
                {activeCase.title}
              </h3>

              <div className="text-xs font-semibold text-[#9CA3AF]">
                <span className="text-[#D4AF37] font-bold">Procedure:</span> {activeCase.treatmentType}
              </div>

              <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                {activeCase.description}
              </p>

              <div className="pt-2">
                <button
                  onClick={handleCta}
                  id="before-after-cta-btn"
                  className="theme-btn-primary w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all transform active:scale-98 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>BOOK MY SMILE CONSULTATION</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>

              {/* Required Medical Disclaimer */}
              <div className="flex items-start gap-1.5 pt-1 text-[10px] sm:text-[11px] text-[#9CA3AF] leading-normal">
                <ShieldAlert className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
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
