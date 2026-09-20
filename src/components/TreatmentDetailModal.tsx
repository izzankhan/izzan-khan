import React from 'react';
import { X, CheckCircle2, Clock, Sparkles, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { TreatmentItem } from '../types';
import { CLINIC_INFO } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface TreatmentDetailModalProps {
  treatment: TreatmentItem | null;
  onClose: () => void;
  onBookTreatment?: (treatmentName: string) => void;
}

export const TreatmentDetailModal: React.FC<TreatmentDetailModalProps> = ({
  treatment,
  onClose,
  onBookTreatment,
}) => {
  if (!treatment) return null;

  const handleBookingClick = () => {
    trackEvent('cta_click', {
      section: 'Treatment Detail Modal',
      treatment: treatment.name,
      action: 'Open Booking Form',
    });
    if (onBookTreatment) {
      onBookTreatment(treatment.name);
    }
    onClose();
  };

  const handleCallClick = () => {
    trackEvent('call_click', {
      section: 'Treatment Detail Modal',
      treatment: treatment.name,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#121216] rounded-3xl shadow-2xl border border-[#D4AF37]/35 overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image banner with overlay */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#0A0A0E]">
          <img
            src={treatment.image}
            alt={treatment.name}
            className="w-full h-full object-cover opacity-60"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/60 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white border border-[#D4AF37]/30 backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5 text-[#D4AF37]" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] bg-[#181822] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40">
              {treatment.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-1 tracking-tight font-['Outfit']">
              {treatment.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-0.5">
              {treatment.tagline}
            </p>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-7 space-y-5 max-h-[65vh] overflow-y-auto">
          {/* Key Quick Facts */}
          <div className="flex flex-wrap gap-4 p-3.5 rounded-xl bg-[#181822] border border-[#D4AF37]/25 text-xs font-semibold text-[#D1D5DB]">
            <div className="flex items-center gap-1.5 text-white">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>Duration: {treatment.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Bio-Compatible Certified Materials</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
              Clinical Overview
            </h4>
            <p className="text-sm text-[#D1D5DB] mt-1.5 leading-relaxed">
              {treatment.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-2.5">
              Key Patient Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {treatment.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs sm:text-sm text-[#D1D5DB] bg-[#181820] p-2.5 rounded-xl border border-[#D4AF37]/15"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#181820] border border-[#D4AF37]/20 text-xs text-[#9CA3AF]">
            <span className="font-bold text-white">Recommended for:</span> {treatment.suitableFor}
          </div>

          {/* Action CTAs: Book Online + Call */}
          <div className="pt-3 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-end border-t border-[#D4AF37]/20">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#D4AF37]/25 text-[#9CA3AF] text-xs sm:text-sm font-semibold hover:bg-[#1A1A22] transition-colors cursor-pointer"
            >
              Close
            </button>

            <a
              href={CLINIC_INFO.phoneHref}
              onClick={handleCallClick}
              className="px-4 py-2.5 rounded-xl border border-[#D4AF37]/35 text-white text-xs sm:text-sm font-bold hover:bg-[#1A1A22] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call 0323 1034955</span>
            </a>

            <button
              type="button"
              onClick={handleBookingClick}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl theme-btn-primary font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Book For This Treatment</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
