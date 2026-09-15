import React from 'react';
import { X, CheckCircle2, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { TreatmentItem } from '../types';
import { trackEvent } from '../utils/analytics';

interface TreatmentDetailModalProps {
  treatment: TreatmentItem | null;
  onClose: () => void;
  onBookTreatment: (treatmentName: string) => void;
}

export const TreatmentDetailModal: React.FC<TreatmentDetailModalProps> = ({
  treatment,
  onClose,
  onBookTreatment,
}) => {
  if (!treatment) return null;

  const handleBook = () => {
    trackEvent('cta_click', {
      ctaName: `Book Treatment Modal: ${treatment.name}`,
      treatment: treatment.name,
    });
    onBookTreatment(treatment.name);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image banner with overlay */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
          <img
            src={treatment.image}
            alt={treatment.name}
            className="w-full h-full object-cover opacity-85"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
              {treatment.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-1 tracking-tight">
              {treatment.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
              {treatment.tagline}
            </p>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-7 space-y-5 max-h-[65vh] overflow-y-auto">
          {/* Key Quick Facts */}
          <div className="flex flex-wrap gap-4 p-3.5 rounded-xl bg-sky-50/80 border border-sky-100 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1.5 text-sky-800">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Duration: {treatment.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Bio-Compatible Materials</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Clinical Overview
            </h4>
            <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
              {treatment.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Key Patient Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {treatment.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500">
            <span className="font-bold text-slate-700">Recommended for:</span> {treatment.suitableFor}
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-end border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50"
            >
              Close
            </button>
            <button
              onClick={handleBook}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 hover:shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Claim Free Consultation for {treatment.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
