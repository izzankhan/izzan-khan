import React, { useState, useEffect } from 'react';
import { X, Sparkles, Gift, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface ExitIntentModalProps {
  onClaimOffer: () => void;
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
    onClaimOffer();
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300"
      onClick={handleDismiss}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-sky-200 p-7 sm:p-9 text-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Graphic */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-cyan-100 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-sky-100 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
          aria-label="Close offer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-500/20">
          <Gift className="w-7 h-7" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Before You Leave</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Lock In Your Complimentary 3D Smile Consultation
        </h3>

        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Don’t put off your dental health. Reserve your slot today and receive a <strong>Free Comprehensive 3D Digital Assessment</strong> with Dr. Sarah Khan.
        </p>

        {/* Bullet checklist */}
        <div className="mt-5 text-left bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Zero obligation or deposit required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>High-resolution intraoral 3D scan included</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Flexible scheduling for this week or next</span>
          </div>
        </div>

        {/* Claim button */}
        <div className="mt-6 space-y-2">
          <button
            onClick={handleClaim}
            id="exit-intent-claim-btn"
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-black text-sm tracking-wide shadow-lg shadow-sky-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>CLAIM MY COMPLIMENTARY PASS</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleDismiss}
            className="text-xs text-slate-400 hover:text-slate-600 py-1"
          >
            No thanks, I'll pay standard consultation fees later
          </button>
        </div>

      </div>
    </div>
  );
};
