import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/funnelData';

export const TestimonialsCarouselSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const total = TESTIMONIALS.length;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, total]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-20 bg-[#070709] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Patient Stories</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            What Our Patients <span className="text-[#D4AF37]">Say</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9CA3AF]">
            Real feedback from patients who entrusted their smiles and dental health to SmileCraft.
          </p>
        </div>

        {/* Carousel Card Container */}
        <div className="max-w-3xl mx-auto relative">
          
          <div className="relative bg-[#121216] rounded-2xl sm:rounded-3xl border border-[#D4AF37]/30 p-6 sm:p-8 lg:p-10 shadow-2xl">
            
            {/* Top row: stars + quotation icon */}
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <div className="flex items-center gap-1 text-[#D4AF37]">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#181822] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center">
                <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Review Comment */}
            <blockquote className="text-base sm:text-lg lg:text-xl text-[#E5E7EB] font-medium leading-relaxed mb-6 min-h-[60px] sm:min-h-[80px]">
              “{current.comment}”
            </blockquote>

            {/* Patient Footer info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-5 sm:pt-6 border-t border-[#D4AF37]/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B88E28] text-black font-black flex items-center justify-center text-sm sm:text-base shadow-sm shrink-0">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5 font-['Outfit']">
                    <span>{current.name}</span>
                    {current.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#D4AF37] bg-[#181822] px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                        <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#9CA3AF] font-medium">
                    {current.treatment} • {current.date}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#181822] text-[#D4AF37] transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#181822] text-[#D4AF37] transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-5 sm:mt-7">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-[#1E1E28] hover:bg-[#D4AF37]/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
