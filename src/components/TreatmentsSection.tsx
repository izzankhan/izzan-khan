import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Flame 
} from 'lucide-react';
import { TREATMENTS } from '../data/funnelData';
import { TreatmentItem } from '../types';
import { TreatmentDetailModal } from './TreatmentDetailModal';
import { trackEvent } from '../utils/analytics';

interface TreatmentsSectionProps {
  onSelectTreatmentForBooking: (treatmentName: string) => void;
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({
  onSelectTreatmentForBooking,
}) => {
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Treatments' },
    { id: 'Cosmetic Dentistry', label: 'Cosmetic' },
    { id: 'Restorative Care', label: 'Restorative & Implants' },
    { id: 'Orthodontics', label: 'Aligners / Invisalign' },
    { id: 'Urgent Care', label: 'Emergency & Pain Relief' },
  ];

  const filteredTreatments = activeCategory === 'all'
    ? TREATMENTS
    : TREATMENTS.filter(t => t.category === activeCategory);

  const handleLearnMore = (treatment: TreatmentItem) => {
    trackEvent('cta_click', {
      ctaName: `Learn More: ${treatment.name}`,
      treatment: treatment.name,
      section: 'Treatments',
    });
    setSelectedTreatment(treatment);
  };

  const handleDirectBook = (treatmentName: string) => {
    trackEvent('cta_click', {
      ctaName: `Direct Book Card: ${treatmentName}`,
      treatment: treatmentName,
      section: 'Treatments',
    });
    onSelectTreatmentForBooking(treatmentName);
  };

  return (
    <section id="treatments" className="py-12 sm:py-16 lg:py-20 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Specialized Clinical Excellence</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Complete Dental Care <span className="text-[#D4AF37]">Under One Roof</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9CA3AF]">
            From single-visit cosmetic brightening to full restorative rehabilitation, our team combines gentle technique with 3D digital precision.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 mb-8 sm:mb-10 overflow-x-auto pb-1 flex-nowrap sm:flex-wrap justify-start sm:justify-center no-scrollbar px-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B88E28] text-black shadow-md shadow-[#D4AF37]/20 font-black'
                  : 'bg-[#141418] text-[#9CA3AF] hover:text-white hover:bg-[#1A1A22] border border-[#D4AF37]/25'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 8 Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              id={`treatment-card-${treatment.id}`}
              className="group relative bg-[#121216] rounded-2xl border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden transform hover:-translate-y-1"
            >
              {/* Image Container with 3D visual aspect */}
              <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-[#181820]">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/40 to-transparent" />
                
                {/* Tag / Category */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-[#D4AF37]/35">
                    {treatment.category}
                  </span>
                </div>

                {treatment.popular && (
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[10px] font-black text-black bg-[#D4AF37] backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-sm">
                    <Flame className="w-3 h-3 text-black" />
                    <span>Popular</span>
                  </div>
                )}

                {/* Duration Indicator */}
                <div className="absolute bottom-2 left-2.5 flex items-center gap-1 text-[#D4AF37] text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{treatment.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors font-['Outfit']">
                    {treatment.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#D4AF37] mt-0.5 line-clamp-1">
                    {treatment.tagline}
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-2 line-clamp-2 leading-relaxed">
                    {treatment.description}
                  </p>

                  {/* Bullet Benefits */}
                  <ul className="mt-3.5 space-y-1.5 text-xs text-[#D1D5DB]">
                    {treatment.benefits.slice(0, 2).map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-3.5 border-t border-[#D4AF37]/15 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleLearnMore(treatment)}
                    className="text-xs font-bold text-[#9CA3AF] hover:text-white flex items-center gap-1 transition-colors py-1 cursor-pointer"
                  >
                    <span>Details</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </button>

                  <button
                    onClick={() => handleDirectBook(treatment.name)}
                    className="theme-btn-primary px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      <TreatmentDetailModal
        treatment={selectedTreatment}
        onClose={() => setSelectedTreatment(null)}
        onBookTreatment={onSelectTreatmentForBooking}
      />
    </section>
  );
};
