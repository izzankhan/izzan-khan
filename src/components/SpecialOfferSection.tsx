import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, CheckCircle, ShieldCheck, ArrowRight, Gift, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface SpecialOfferSectionProps {
  onClaimOffer?: () => void;
}

export const SpecialOfferSection: React.FC<SpecialOfferSectionProps> = ({ onClaimOffer }) => {
  // Live countdown timer for appointment allocation window
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
    trackEvent('cta_click', { section: 'Special Offer', offer: 'Free Dental Consultation' });
    if (onClaimOffer) {
      onClaimOffer();
    }
  };

  const handleCallClaim = () => {
    trackEvent('call_click', { section: 'Special Offer' });
  };

  return (
    <section id="special-offer" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-[#070709]">
      {/* Background Gold Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#D4AF37]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-[#121216] border border-[#D4AF37]/35 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden text-white">
          
          {/* Top Banner Tag */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>Complimentary Patient Offer</span>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D1D5DB] bg-[#1A1A24] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/25">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse shrink-0" />
              <span>Limited Weekly Slots Available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Offer Details */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D4AF37] block">
                New Patient Consultation Special
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight font-['Outfit']">
                FREE DENTAL CONSULTATION & 3D SCAN
              </h2>

              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                Take the first step with complete peace of mind and zero financial obligation. Our comprehensive assessment gives you crystal-clear clarity regarding your dental health and aesthetic possibilities.
              </p>

              {/* What is included */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#1A1A22] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">Full Digital Examination & Scan</span>
                    <span className="text-[11px] sm:text-xs text-[#9CA3AF]">Detailed digital assessment of teeth, gums, and bite alignment.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#1A1A22] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">One-on-One Surgeon Consultation</span>
                    <span className="text-[11px] sm:text-xs text-[#9CA3AF]">Direct review with lead doctor to address your aesthetic & comfort goals.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#1A1A22] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">Transparent Treatment Roadmap</span>
                    <span className="text-[11px] sm:text-xs text-[#9CA3AF]">Clear treatment steps, timelines, and flexible pricing without hidden fees.</span>
                  </div>
                </div>
              </div>

              <div className="pt-1 text-[11px] text-[#9CA3AF] flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>100% No Obligation • Official Clinic Form</span>
              </div>
            </div>

            {/* Countdown Box & CTA */}
            <div className="lg:col-span-5 bg-[#181820] rounded-2xl p-5 sm:p-6 border border-[#D4AF37]/35 text-center flex flex-col items-center justify-center shadow-lg">
              
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2.5">
                Promotion Reservation Window
              </span>

              {/* Countdown Numbers */}
              <div className="grid grid-cols-3 gap-2 w-full mb-5">
                <div className="bg-[#121216] p-2.5 rounded-xl border border-[#D4AF37]/25">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-[#9CA3AF] uppercase font-semibold mt-0.5">Hours</div>
                </div>

                <div className="bg-[#121216] p-2.5 rounded-xl border border-[#D4AF37]/25">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-[#9CA3AF] uppercase font-semibold mt-0.5">Mins</div>
                </div>

                <div className="bg-[#121216] p-2.5 rounded-xl border border-[#D4AF37]/25">
                  <div className="text-xl sm:text-2xl font-black text-[#D4AF37] font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-[#9CA3AF] uppercase font-semibold mt-0.5">Secs</div>
                </div>
              </div>

              {/* Action Buttons: Book Form + Direct Call */}
              <div className="space-y-2.5 w-full">
                <button
                  type="button"
                  onClick={handleClaim}
                  id="special-offer-claim-cta"
                  className="w-full py-4 px-4 rounded-xl theme-btn-primary font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-[#D4AF37]/20 transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-black shrink-0" />
                  <span>CLAIM FREE CONSULTATION</span>
                  <ArrowRight className="w-4 h-4 text-black shrink-0" />
                </button>

                <a
                  href={CLINIC_INFO.phoneHref}
                  onClick={handleCallClaim}
                  id="special-offer-call-cta"
                  className="w-full py-3 px-4 rounded-xl bg-[#121216] hover:bg-[#1A1A22] text-white font-bold text-xs sm:text-sm border border-[#D4AF37]/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Call to Reserve: {CLINIC_INFO.phoneDisplay}</span>
                </a>
              </div>

              <p className="text-[11px] text-[#9CA3AF] mt-3">
                Instant confirmation • No credit card required
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
