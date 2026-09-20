import React from 'react';
import { 
  Phone, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Mail,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { CLINIC_INFO } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface ContactSectionProps {
  preselectedTreatment?: string;
  onOpenBookingForm?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  onOpenBookingForm 
}) => {
  const handleCallClick = () => {
    trackEvent('call_click', { section: 'Contact Section' });
  };

  const handleBookingClick = () => {
    trackEvent('cta_click', { section: 'Contact Section', action: 'Open Booking Form' });
    if (onOpenBookingForm) {
      onOpenBookingForm();
    }
  };

  return (
    <section id="booking-section" className="py-14 sm:py-20 lg:py-24 bg-[#070709] relative scroll-mt-20">
      {/* Anchor alias */}
      <div id="contact-section" className="absolute -top-20" />
      <div id="consultation-quiz" className="absolute -top-20" />

      {/* Ambient background gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161B] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Clinic Contact & Appointments</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-['Outfit']">
            Get In Touch With <span className="bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B88E28] bg-clip-text text-transparent">SmileCraft</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
            Have questions or ready to schedule your consultation? Call our front desk directly or submit your booking details using our online consultation form.
          </p>
        </div>

        {/* Contact Grid & Main Action Card */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Clinic Details */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Phone Card */}
            <div className="bg-[#121216] p-6 rounded-2xl border border-[#D4AF37]/25 shadow-lg transition-all hover:border-[#D4AF37]/45 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A22] border border-[#D4AF37]/35 text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#D4AF37] block">
                    Direct Front Desk Line
                  </span>
                  <a 
                    href="tel:03231034955"
                    onClick={handleCallClick}
                    className="text-xl sm:text-2xl font-black text-white hover:text-[#D4AF37] transition-colors block font-['Outfit']"
                  >
                    0323 1034955
                  </a>
                  <p className="text-xs text-[#9CA3AF]">
                    Speak directly with our clinic receptionist for immediate booking and general inquiries.
                  </p>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-[#121216] p-6 rounded-2xl border border-[#D4AF37]/25 shadow-lg transition-all hover:border-[#D4AF37]/45 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A22] border border-[#D4AF37]/35 text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#D4AF37] block">
                    Clinic Address
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white leading-snug">
                    {CLINIC_INFO.address}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">
                    Convenient valet and secure parking available for all patients.
                  </p>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-[#121216] p-6 rounded-2xl border border-[#D4AF37]/25 shadow-lg transition-all hover:border-[#D4AF37]/45 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A22] border border-[#D4AF37]/35 text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="space-y-1 w-full">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#D4AF37] block">
                    Opening Hours
                  </span>
                  <div className="space-y-1 pt-1 text-xs sm:text-sm">
                    <div className="flex justify-between text-white font-medium">
                      <span>Monday – Saturday:</span>
                      <span className="text-[#D4AF37] font-bold">8:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between text-[#9CA3AF]">
                      <span>Sunday:</span>
                      <span className="text-[#EF4444] font-medium">Emergency On-Call Only</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Online Booking Action Card */}
          <div className="lg:col-span-6 bg-[#121216] rounded-3xl border border-[#D4AF37]/35 shadow-[0_0_50px_rgba(212,175,55,0.1)] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            
            {/* Top gold bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B88E28] via-[#F3E5AB] to-[#B88E28]" />

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181822] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Online Patient Form</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
                  Book Your Consultation Online
                </h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  Complete our official dental consultation form. Your details are securely processed, and our patient concierge will confirm your appointment instantly.
                </p>
              </div>

              {/* Guarantees */}
              <div className="p-4 rounded-2xl bg-[#181820] border border-[#D4AF37]/20 space-y-2.5 text-xs text-[#9CA3AF]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span><strong className="text-white">Free Consultation:</strong> 3D digital smile scan & treatment plan included</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span><strong className="text-white">Zero Obligation:</strong> Completely transparent financial and clinical discussion</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span><strong className="text-white">Quick Confirmation:</strong> Average response time under 5 minutes</span>
                </div>
              </div>
            </div>

            {/* Actions: Direct GoHighLevel Form Button + Direct Phone Call Button */}
            <div className="space-y-3 pt-8">
              <button
                type="button"
                onClick={handleBookingClick}
                id="contact-section-open-form-btn"
                className="theme-btn-primary flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-black shrink-0" />
                <span className="font-black tracking-wide">BOOK CONSULTATION ONLINE</span>
                <ArrowRight className="w-5 h-5 ml-auto text-black shrink-0" />
              </button>

              <a
                href="tel:03231034955"
                onClick={handleCallClick}
                id="contact-section-call-btn"
                className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-2xl bg-[#1A1A22] hover:bg-[#22222E] border border-[#D4AF37]/35 text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Call Front Desk: 0323 1034955</span>
                <ArrowRight className="w-4 h-4 ml-auto text-[#D4AF37] shrink-0" />
              </a>

              <div className="text-center pt-2 text-[11px] text-[#9CA3AF] flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>100% Confidential • Official GoHighLevel Patient Intake</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
