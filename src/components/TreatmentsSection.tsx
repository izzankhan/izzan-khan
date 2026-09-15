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
    <section id="treatments" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <span>Specialized Clinical Excellence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Complete Dental Care Under One Roof
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            From single-visit cosmetic brightening to full restorative rehabilitation, our team combines gentle technique with 3D digital precision.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 8 Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              id={`treatment-card-${treatment.id}`}
              className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden transform hover:-translate-y-1"
            >
              {/* Image Container with 3D visual aspect */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                
                {/* Tag / Category */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-slate-900/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    {treatment.category}
                  </span>
                </div>

                {treatment.popular && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold text-amber-900 bg-amber-300/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs">
                    <Flame className="w-3 h-3 text-amber-700" />
                    <span>Popular</span>
                  </div>
                )}

                {/* Duration Indicator */}
                <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-white/90 text-xs font-medium">
                  <Clock className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{treatment.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {treatment.name}
                  </h3>
                  <p className="text-xs font-semibold text-sky-600 mt-1 line-clamp-1">
                    {treatment.tagline}
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {treatment.description}
                  </p>

                  {/* Bullet Benefits */}
                  <ul className="mt-3.5 space-y-1.5 text-xs text-slate-600">
                    {treatment.benefits.slice(0, 2).map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleLearnMore(treatment)}
                    className="text-xs font-bold text-slate-600 hover:text-sky-600 flex items-center gap-1 transition-colors py-1 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDirectBook(treatment.name)}
                    className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white text-xs font-bold transition-all flex items-center gap-1 border border-sky-200 hover:border-sky-600 cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3 h-3" />
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
