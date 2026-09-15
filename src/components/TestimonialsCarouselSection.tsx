import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
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
    <section id="testimonials" className="py-8 sm:py-12 lg:py-16 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <span>Patient Stories</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Patients Say
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            Real feedback from patients who entrusted their smiles and dental health to SmileCraft.
          </p>
        </div>

        {/* Carousel Card Container */}
        <div className="max-w-3xl mx-auto relative">
          
          <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-8 lg:p-10 shadow-lg">
            
            {/* Top row: stars + quotation icon */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Review Comment */}
            <blockquote className="text-sm sm:text-lg lg:text-xl text-slate-800 font-medium leading-relaxed mb-6 min-h-[60px] sm:min-h-[80px]">
              “{current.comment}”
            </blockquote>

            {/* Patient Footer info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 sm:pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-500 text-white font-bold flex items-center justify-center text-sm sm:text-base shadow-xs shrink-0">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                    <span>{current.name}</span>
                    {current.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    {current.treatment} • {current.date}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50 text-slate-600 hover:text-sky-700 transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50 text-slate-600 hover:text-sky-700 transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-4 sm:mt-6">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-6 sm:w-8 bg-sky-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
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
