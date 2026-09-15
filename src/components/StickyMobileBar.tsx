import React from 'react';
import { Phone, Calendar, MessageSquare, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenBooking }) => {
  const handleCall = () => {
    trackEvent('call_click', { section: 'Mobile Sticky Bar' });
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { section: 'Mobile Sticky Bar' });
  };

  const handleBook = () => {
    trackEvent('cta_click', { ctaName: 'Mobile Sticky Bar Book', section: 'Mobile Sticky Bar' });
    onOpenBooking();
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 p-2.5 shadow-2xl safe-area-pb">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* Quick Call */}
        <a
          href={CLINIC_INFO.phoneHref}
          onClick={handleCall}
          className="flex flex-col items-center justify-center w-14 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
          aria-label="Call clinic"
        >
          <Phone className="w-4 h-4 text-sky-600" />
          <span className="text-[10px] font-bold mt-0.5">Call</span>
        </a>

        {/* Quick WhatsApp */}
        <a
          href={CLINIC_INFO.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center w-14 h-12 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors shrink-0 border border-emerald-200"
          aria-label="WhatsApp clinic"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-bold mt-0.5">Chat</span>
        </a>

        {/* Primary Book CTA */}
        <button
          onClick={handleBook}
          className="theme-btn-primary flex-1 h-12 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-98"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Book Free Consultation</span>
        </button>

      </div>
    </div>
  );
};
