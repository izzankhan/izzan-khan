import React from 'react';
import { Phone, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenBooking }) => {
  const handleCall = () => {
    trackEvent('call_click', { section: 'Mobile Sticky Bar' });
  };

  const handleBooking = () => {
    trackEvent('cta_click', { section: 'Mobile Sticky Bar', action: 'Open Booking Form' });
    onOpenBooking();
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0E]/95 backdrop-blur-xl border-t border-[#D4AF37]/30 p-2.5 shadow-2xl safe-area-pb">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* Direct Call Button */}
        <a
          href={CLINIC_INFO.phoneHref}
          onClick={handleCall}
          id="mobile-bar-call-btn"
          className="flex-1 h-12 rounded-xl bg-[#141418] hover:bg-[#1C1C24] text-white font-bold text-xs flex items-center justify-center gap-2 border border-[#D4AF37]/35 transition-all active:scale-98"
          aria-label="Call 0323 1034955"
        >
          <Phone className="w-4 h-4 text-[#D4AF37]" />
          <span>Call: 0323 1034955</span>
        </a>

        {/* Book Consultation Button (Routes directly to GoHighLevel form) */}
        <button
          onClick={handleBooking}
          id="mobile-bar-book-btn"
          className="flex-1 h-12 rounded-xl theme-btn-primary font-black text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all active:scale-98 cursor-pointer"
          aria-label="Book Consultation"
        >
          <Sparkles className="w-4 h-4 text-black" />
          <span>Book Appointment</span>
        </button>

      </div>
    </div>
  );
};
