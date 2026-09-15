import React, { useState } from 'react';
import { 
  Calendar, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Mail, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { CLINIC_INFO } from '../data/funnelData';
import { LegalModals, LegalModalType } from './LegalModals';
import { trackEvent } from '../utils/analytics';

interface FinalCtaAndFooterProps {
  onOpenBooking: () => void;
}

export const FinalCtaAndFooter: React.FC<FinalCtaAndFooterProps> = ({ onOpenBooking }) => {
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);

  const handleBookClick = () => {
    trackEvent('cta_click', { ctaName: 'Final Section BOOK MY APPOINTMENT', section: 'Final CTA' });
    onOpenBooking();
  };

  const handleCallClick = () => {
    trackEvent('call_click', { section: 'Final CTA' });
  };

  const handleWhatsappClick = () => {
    trackEvent('whatsapp_click', { section: 'Final CTA' });
  };

  return (
    <footer id="footer" className="relative bg-slate-950 text-white overflow-hidden">
      
      {/* SECTION 15: Final Conversion Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        
        {/* Subtle Background Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Take The First Step Today</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            A Better Smile Starts With One Simple Step.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Book your consultation today and discover the right dental care for your needs.
          </p>

          {/* CTA Buttons: Book + Call + WhatsApp */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-4">
            <button
              onClick={handleBookClick}
              id="final-book-cta-btn"
              className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-extrabold text-base shadow-xl shadow-sky-600/30 hover:shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              <span>BOOK MY APPOINTMENT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={CLINIC_INFO.phoneHref}
              onClick={handleCallClick}
              id="final-call-btn"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>CALL NOW</span>
            </a>

            <a
              href={CLINIC_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsappClick}
              id="final-whatsapp-btn"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 font-bold text-base border border-emerald-500/40 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Complimentary Assessment • No Credit Card Required • Same-Day Confirmation</span>
          </div>
        </div>
      </div>

      {/* FOOTER: Clinical Information, Opening Hours, Map & Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block leading-tight font-heading">
                  Smile<span className="text-sky-400">Craft</span>
                </span>
                <span className="text-[11px] text-slate-400 tracking-wider uppercase font-semibold block">
                  Dental Clinic
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Dedicated to delivering gentle, state-of-the-art restorative, cosmetic, and family dentistry in a relaxing, anxiety-free setting.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={CLINIC_INFO.phoneHref} className="hover:text-white underline">
                  {CLINIC_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white">
                  {CLINIC_INFO.email}
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-3 flex items-center gap-3">
              {[
                { name: 'Instagram', url: '#' },
                { name: 'Facebook', url: '#' },
                { name: 'YouTube', url: '#' },
                { name: 'LinkedIn', url: '#' },
              ].map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-sky-600 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold transition-colors border border-slate-800"
                  aria-label={soc.name}
                >
                  {soc.name.substring(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Opening Hours */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Opening Hours</span>
            </h3>

            <div className="space-y-2.5 text-xs text-slate-300 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              {CLINIC_INFO.workingHours.map((wh, idx) => (
                <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-800/60 last:border-b-0">
                  <span className="text-slate-400 font-medium">{wh.days}</span>
                  <span className="font-semibold text-white">{wh.hours}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-800/40 text-xs text-sky-200">
              ⚡ <strong>Emergency Walk-Ins:</strong> Please call ahead at {CLINIC_INFO.phoneDisplay} so our medical team can prepare immediate operatory care.
            </div>
          </div>

          {/* Col 3: Google Maps Placeholder Card */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Location & Directions</span>
            </h3>

            {/* Simulated Interactive Google Maps card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 h-44 group">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                alt="SmileCraft Dental Clinic Map Location"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Pin indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <MapPin className="w-5 h-5 fill-white" />
                </div>
                <span className="text-[10px] font-bold bg-black/80 px-2 py-0.5 rounded text-white mt-1 inline-block">
                  SmileCraft Plaza
                </span>
              </div>

              {/* Get Directions Button */}
              <div className="absolute bottom-3 left-3 right-3">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Convenient ground-level visitor parking & wheelchair accessibility available.
            </p>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setActiveLegalModal('disclaimer')}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              Medical Disclaimer
            </button>
          </div>
        </div>

      </div>

      {/* Legal Content Modal */}
      <LegalModals
        activeModal={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />
    </footer>
  );
};
