import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, CheckCircle, ShieldCheck, ArrowRight, Gift } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface SpecialOfferSectionProps {
  onClaimOffer: () => void;
}

export const SpecialOfferSection: React.FC<SpecialOfferSectionProps> = ({ onClaimOffer }) => {
  // Live animated countdown timer (simulating end-of-week / daily availability reservation)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaim = () => {
    trackEvent('cta_click', { ctaName: 'CLAIM MY FREE CONSULTATION (Special Offer)', section: 'Special Offer' });
    trackEvent('special_offer_claimed', { offerName: 'Free Dental Consultation' });
    onClaimOffer();
  };

  return (
    <section id="special-offer" className="py-8 sm:py-12 lg:py-16 relative overflow-hidden bg-gradient-to-br from-sky-900 via-slate-900 to-cyan-950 text-white">
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top Banner Tag */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5 shrink-0" />
              <span>Exclusive Promotion For Ad Visitors</span>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 bg-black/40 px-3 py-1 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse shrink-0" />
              <span>Limited slots this week</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Offer Details */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-400 block">
                New Patient Special
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                FREE DENTAL CONSULTATION
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Take the first step with zero financial obligation. Our comprehensive assessment gives you crystal-clear clarity regarding your dental health and aesthetic possibilities.
              </p>

              {/* What is included */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">Comprehensive Dental Assessment</span>
                    <span className="text-[11px] sm:text-xs text-slate-300">Detailed examination of teeth, bite dynamics, and oral tissue wellness.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">Personalized Treatment Discussion</span>
                    <span className="text-[11px] sm:text-xs text-slate-300">One-on-one session with Dr. Sarah Khan to address your exact smile goals.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">Professional Recommendations</span>
                    <span className="text-[11px] sm:text-xs text-slate-300">Upfront treatment plan with transparent itemized pricing & timeline.</span>
                  </div>
                </div>
              </div>

              <div className="pt-1 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>100% No Obligation • No Hidden Fees</span>
              </div>
            </div>

            {/* Countdown Box & CTA */}
            <div className="lg:col-span-5 bg-white/10 rounded-2xl p-4 sm:p-6 border border-white/20 text-center flex flex-col items-center justify-center">
              
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2.5">
                Offer Reservation Window
              </span>

              {/* Countdown Numbers */}
              <div className="grid grid-cols-3 gap-2 w-full mb-4 sm:mb-6">
                <div className="bg-slate-950/60 p-2 sm:p-2.5 rounded-xl border border-white/10">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold mt-0.5">Hours</div>
                </div>

                <div className="bg-slate-950/60 p-2 sm:p-2.5 rounded-xl border border-white/10">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold mt-0.5">Mins</div>
                </div>

                <div className="bg-slate-950/60 p-2 sm:p-2.5 rounded-xl border border-white/10">
                  <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold mt-0.5">Secs</div>
                </div>
              </div>

              {/* Primary Claim CTA */}
              <button
                onClick={handleClaim}
                id="special-offer-claim-cta"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all transform active:scale-98 sm:hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950 shrink-0" />
                <span>CLAIM MY FREE CONSULTATION</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <p className="text-[11px] text-slate-400 mt-2.5">
                Instant online confirmation • Takes less than 60 seconds
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
