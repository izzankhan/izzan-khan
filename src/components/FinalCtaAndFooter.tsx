import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { CLINIC_INFO } from '../data/funnelData';
import { LegalModals, LegalModalType } from './LegalModals';

interface FinalCtaAndFooterProps {
  onOpenBooking: () => void;
}

export const FinalCtaAndFooter: React.FC<FinalCtaAndFooterProps> = () => {
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);

  return (
    <footer id="footer" className="relative bg-[#050507] text-[#9CA3AF] border-t border-[#D4AF37]/20 overflow-hidden">
      
      {/* Subtle Ambient Gold Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* FOOTER: Clinical Information, Opening Hours, Map & Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E6C265] to-[#B88E28] border border-[#F3E5AB]/40 flex items-center justify-center text-black shadow-md shadow-[#D4AF37]/20">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block leading-tight font-['Outfit']">
                  Smile<span className="text-[#D4AF37]">Craft</span>
                </span>
                <span className="text-[11px] text-[#D4AF37]/80 tracking-wider uppercase font-semibold block">
                  Dental Clinic
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
              Dedicated to delivering gentle, state-of-the-art restorative, cosmetic, and family dentistry in an anxiety-free, luxurious atmosphere.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-[#D1D5DB]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={CLINIC_INFO.phoneHref} className="hover:text-[#D4AF37] transition-colors font-bold">
                  {CLINIC_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-[#D4AF37] transition-colors">
                  {CLINIC_INFO.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-2.5">
              {[
                { name: 'Instagram', label: 'IG' },
                { name: 'Facebook', label: 'FB' },
                { name: 'YouTube', label: 'YT' },
                { name: 'LinkedIn', label: 'LI' },
              ].map((soc) => (
                <a
                  key={soc.name}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-lg bg-[#141418] hover:bg-[#D4AF37] text-[#9CA3AF] hover:text-black flex items-center justify-center text-xs font-bold transition-all border border-[#D4AF37]/20"
                  aria-label={soc.name}
                >
                  {soc.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Opening Hours */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>Clinic Hours</span>
            </h3>

            <div className="space-y-2.5 text-xs text-[#D1D5DB] bg-[#121216] p-4 rounded-2xl border border-[#D4AF37]/25">
              {CLINIC_INFO.workingHours.map((wh, idx) => (
                <div key={idx} className="flex justify-between items-center py-1 border-b border-[#D4AF37]/15 last:border-b-0">
                  <span className="text-[#9CA3AF] font-medium">{wh.days}</span>
                  <span className="font-semibold text-white">{wh.hours}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-[#181820] border border-[#D4AF37]/30 text-xs text-[#D1D5DB] leading-relaxed">
              ⚡ <strong className="text-white">Emergency Assistance:</strong> Please call front desk directly at <span className="text-[#D4AF37] font-bold">{CLINIC_INFO.phoneDisplay}</span> for urgent dental relief.
            </div>
          </div>

          {/* Col 3: Google Maps Card */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>Location & Directions</span>
            </h3>

            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-[#121216] h-44 group">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                alt="SmileCraft Dental Clinic Map Location"
                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent" />
              
              {/* Pin indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-[#121216] border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto shadow-lg">
                  <MapPin className="w-4 h-4 fill-[#D4AF37]" />
                </div>
                <span className="text-[10px] font-bold bg-[#181820] border border-[#D4AF37]/40 px-2 py-0.5 rounded text-white mt-1 inline-block">
                  DHA Phase 5, Lahore
                </span>
              </div>

              {/* Get Directions Button */}
              <div className="absolute bottom-3 left-3 right-3">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B88E28] hover:from-[#e5c055] hover:to-[#cfa336] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-black" />
                </a>
              </div>
            </div>

            <p className="text-[11px] text-[#9CA3AF]">
              Valet and dedicated patient parking available directly on site.
            </p>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-8 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
          <p>
            © {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-[#D4AF37] transition-colors underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-[#D4AF37] transition-colors underline cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setActiveLegalModal('disclaimer')}
              className="hover:text-[#D4AF37] transition-colors underline cursor-pointer"
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
