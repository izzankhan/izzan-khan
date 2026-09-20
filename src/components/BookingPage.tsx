import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Star,
  MapPin,
  Lock
} from 'lucide-react';
import { CLINIC_INFO } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface BookingPageProps {
  onBackToHome: () => void;
  selectedTreatment?: string;
}

export const BookingPage: React.FC<BookingPageProps> = ({ 
  onBackToHome, 
  selectedTreatment 
}) => {
  // Load the GoHighLevel form_embed.js script dynamically for responsive auto-resizing
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('page_view', { page: 'Booking Page (GoHighLevel Form)' });

    const existingScript = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleCall = () => {
    trackEvent('call_click', { section: 'Booking Page Header' });
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col font-sans relative selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      {/* Ambient background gold glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4AF37]/12 via-[#B88E28]/5 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/6 blur-[160px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/6 blur-[160px] rounded-full" />
      </div>

      {/* Top Black & Gold Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0A0D]/90 backdrop-blur-xl border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Back button + Brand */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={onBackToHome}
              id="booking-page-back-btn"
              className="group flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#141418] hover:bg-[#1C1C22] text-[#E5E7EB] hover:text-[#D4AF37] border border-[#D4AF37]/30 transition-all active:scale-95 cursor-pointer text-xs sm:text-sm font-semibold shadow-sm"
              aria-label="Return to landing page"
            >
              <ArrowLeft className="w-4 h-4 text-[#D4AF37] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>

            <div className="hidden sm:block h-6 w-px bg-[#D4AF37]/20" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E6C265] to-[#B88E28] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <div className="text-left">
                <span className="block font-black text-sm tracking-tight text-white font-['Outfit']">
                  SMILECRAFT
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Dental Clinic
                </span>
              </div>
            </div>
          </div>

          {/* Direct Phone Call Contact */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={CLINIC_INFO.phoneHref}
              onClick={handleCall}
              id="booking-page-phone-link"
              className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B88E28] hover:from-[#e5c055] hover:to-[#cfa336] text-black font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all active:scale-95"
            >
              <Phone className="w-4 h-4 text-black" />
              <span>Call: {CLINIC_INFO.phoneDisplay}</span>
            </a>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Title & VIP Badge */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8 sm:mb-12">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16161B] border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B88E28] bg-clip-text text-transparent">
                VIP Priority Dental Reservation
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-['Outfit']">
              Reserve Your Consultation
            </h1>

            <p className="text-sm sm:text-base text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
              Please complete the official inquiry form below. Our patient concierge team will review your submission and contact you promptly to confirm your appointment time.
            </p>

            {/* Selected Treatment Note (if user came from a specific treatment card) */}
            {selectedTreatment && (
              <div className="inline-block mt-2 px-4 py-1.5 rounded-xl bg-[#1A1A20] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-semibold">
                Interested in: <span className="text-white font-bold">{selectedTreatment}</span>
              </div>
            )}

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs text-[#D1D5DB]">
              <div className="flex items-center gap-1.5 bg-[#121216] px-3 py-1.5 rounded-lg border border-[#D4AF37]/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Zero Obligation</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#121216] px-3 py-1.5 rounded-lg border border-[#D4AF37]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Free 3D Digital Scan</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#121216] px-3 py-1.5 rounded-lg border border-[#D4AF37]/20">
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Strictly Confidential</span>
              </div>
            </div>

          </div>

          {/* Form Container & Side Concierge Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column / Main GHL Form Embed */}
            <div className="lg:col-span-8 bg-[#121216] rounded-2xl sm:rounded-3xl border border-[#D4AF37]/35 shadow-[0_0_50px_rgba(212,175,55,0.12)] p-3 sm:p-6 lg:p-8 relative overflow-hidden">
              
              {/* Gold Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

              {/* Form Heading Inside Card */}
              <div className="mb-4 pb-3 border-b border-[#D4AF37]/20 flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Patient Intake Form</span>
                  </h2>
                  <p className="text-xs text-[#9CA3AF]">
                    Secure, encrypted transmission directly to our clinic desk.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#D4AF37] font-semibold bg-[#1A1A22] px-2.5 py-1 rounded-full border border-[#D4AF37]/25">
                  <span>Average Reply: &lt; 3 mins</span>
                </div>
              </div>

              {/* EXACT GoHighLevel LeadConnector Form Embed (UNMODIFIED AS REQUESTED) */}
              <div className="w-full relative min-h-[750px] sm:min-h-[850px] lg:min-h-[920px] rounded-xl overflow-hidden bg-[#18181D]">
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/OpDUPzI9ci0f1V7UctKc"
                  style={{ width: '100%', height: '100%', minHeight: '760px', border: 'none', borderRadius: '5px' }}
                  id="inline-OpDUPzI9ci0f1V7UctKc"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Dental Consultation Lead Form"
                  data-height="760"
                  data-layout-iframe-id="inline-OpDUPzI9ci0f1V7UctKc"
                  data-form-id="OpDUPzI9ci0f1V7UctKc"
                  data-cookie-consent="true"
                  data-cookie-consent-provider="auto"
                  title="Dental Consultation Lead Form"
                />
              </div>

              <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 text-center text-[11px] text-[#9CA3AF] flex items-center justify-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>256-Bit SSL Encrypted • Zero Spam Guarantee • Your privacy is our priority</span>
              </div>

            </div>

            {/* Right Column / Concierge & Fast Assistance */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Need Immediate Help Card */}
              <div className="bg-[#121216] rounded-2xl sm:rounded-3xl border border-[#D4AF37]/25 p-5 sm:p-6 shadow-lg space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1A1A22] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center font-bold">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Immediate Assistance?
                    </h3>
                    <p className="text-xs text-[#9CA3AF]">
                      Direct front desk phone line
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#D1D5DB] leading-relaxed">
                  If you require emergency dental relief or prefer scheduling verbally over the phone, connect directly with our front desk:
                </p>

                {/* Direct Call Button */}
                <a
                  href={CLINIC_INFO.phoneHref}
                  onClick={handleCall}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B88E28] hover:from-[#e5c055] hover:to-[#cfa336] text-black font-extrabold text-sm shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Phone className="w-4 h-4 text-black" />
                  <span>Call 0323 1034955</span>
                </a>

                <div className="pt-2 text-[11px] text-[#9CA3AF] flex items-center gap-1.5 justify-center">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
                </div>
              </div>

              {/* Lead Doctor Card */}
              <div className="bg-[#121216] rounded-2xl sm:rounded-3xl border border-[#D4AF37]/25 p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80"
                    alt="Dr. Sarah Khan"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D4AF37]/50 shadow-md"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {CLINIC_INFO.doctorName}
                    </h4>
                    <span className="text-xs text-[#D4AF37] font-medium block">
                      Lead Dental Surgeon
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                      ))}
                      <span className="text-[10px] text-[#9CA3AF] ml-1">4.9 / 5.0 Rating</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#18181F] border border-[#D4AF37]/15 text-xs text-[#D1D5DB] italic leading-relaxed">
                  “We have designed our clinic to ensure your consultation is warm, gentle, and transparent. We look forward to meeting you.”
                </div>

                <ul className="space-y-1.5 text-xs text-[#9CA3AF]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>State-of-the-art 3D Digital Imaging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>Gentle, anxiety-free approach</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>Custom transparent financial breakdown</span>
                  </li>
                </ul>
              </div>

              {/* Clinic Location */}
              <div className="bg-[#121216] rounded-2xl sm:rounded-3xl border border-[#D4AF37]/25 p-4 text-xs text-[#9CA3AF] space-y-2">
                <div className="flex items-start gap-2 text-white font-semibold">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{CLINIC_INFO.address}</span>
                </div>
                <p className="text-[11px] text-[#9CA3AF] pl-6">
                  Valet and patient parking available on site.
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Footer on Booking Page */}
      <footer className="border-t border-[#D4AF37]/20 bg-[#070709] py-6 text-center text-xs text-[#9CA3AF]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} SmileCraft Dental Clinic. All Rights Reserved.</p>
          <button
            onClick={onBackToHome}
            className="text-[#D4AF37] hover:underline cursor-pointer font-semibold"
          >
            ← Return to Clinic Overview
          </button>
        </div>
      </footer>

    </div>
  );
};
