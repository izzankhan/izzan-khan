import React, { useState, useEffect } from 'react';
import { X, Sparkles, Gift, CheckCircle2, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface ExitIntentModalProps {
  onClaimOffer?: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ onClaimOffer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Only on desktop viewport
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    // Check session storage to show at most once
    const alreadyShown = sessionStorage.getItem('smilecraft_exit_shown');
    if (alreadyShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when cursor leaves through the top of the browser viewport
      if (e.clientY <= 10 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('smilecraft_exit_shown', 'true');
        trackEvent('page_view', { section: 'Exit Intent Triggered' });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggered]);

  const handleClaim = () => {
    trackEvent('exit_intent_claimed', { offer: 'Free 3D Scan & Consultation Voucher' });
    setIsOpen(false);
    if (onClaimOffer) {
      onClaimOffer();
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={handleDismiss}
    >
      <div
        className="relative w-full max-w-lg bg-[#121216] rounded-3xl shadow-2xl border border-[#D4AF37]/35 p-7 sm:p-9 text-center overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Graphic */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#1A1A22] text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
          aria-label="Close offer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge */}
        <div className="w-14 h-14 rounded-2xl bg-[#1A1A22] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#D4AF37]/10">
          <Gift className="w-7 h-7 text-[#D4AF37]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181822] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Before You Leave</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
          Lock In Your Free 3D Smile Consultation Pass
        </h3>

        <p className="text-sm text-[#9CA3AF] mt-2 leading-relaxed">
          Don’t put off your dental health. Reserve your slot now with our quick online form for your <strong className="text-white">Free Comprehensive 3D Digital Assessment</strong> with Dr. Sarah Khan.
        </p>

        {/* Bullet checklist */}
        <div className="mt-5 text-left bg-[#181820] p-4 rounded-2xl border border-[#D4AF37]/20 space-y-2 text-xs text-[#D1D5DB]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Zero obligation or deposit required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>High-resolution intraoral 3D scan included</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Official GoHighLevel patient schedule intake</span>
          </div>
        </div>

        {/* Claim buttons: Form + Call */}
        <div className="mt-6 space-y-2.5">
          <button
            type="button"
            onClick={handleClaim}
            id="exit-intent-claim-btn"
            className="w-full py-4 px-6 rounded-xl theme-btn-primary font-black text-sm tracking-wide shadow-lg shadow-[#D4AF37]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-black shrink-0" />
            <span>CLAIM FREE CONSULTATION VOUCHER</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

          <a
            href={CLINIC_INFO.phoneHref}
            id="exit-intent-call-btn"
            className="w-full py-3 px-6 rounded-xl bg-[#181820] hover:bg-[#20202A] text-white font-bold text-xs sm:text-sm border border-[#D4AF37]/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Or Call Front Desk: {CLINIC_INFO.phoneDisplay}</span>
          </a>

          <button
            onClick={handleDismiss}
            className="text-xs text-[#9CA3AF] hover:text-white py-1 cursor-pointer block mx-auto transition-colors"
          >
            No thanks, I'll return later
          </button>
        </div>

      </div>
    </div>
  );
};
