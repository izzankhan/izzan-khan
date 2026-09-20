import React from 'react';
import { Sparkles, Phone, Star, ShieldCheck, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ThreeToothScene } from './ThreeToothScene';
import { CLINIC_INFO } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onOpenQuiz }) => {
  const handleCall = () => {
    trackEvent('call_click', { section: 'Hero' });
  };

  return (
    <section
      id="hero"
      className="relative pt-20 pb-8 sm:pt-28 sm:pb-12 md:pt-36 md:pb-16 overflow-hidden bg-[#070709]"
    >
      {/* Background Decorative Soft Gold Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden opacity-60">
        <div className="absolute -top-24 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 sm:w-80 h-60 sm:h-80 bg-[#D4AF37]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Conversion Copy & Action Buttons */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            {/* Urgency / Social Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#16161B] text-[#D4AF37] border border-[#D4AF37]/40 text-xs sm:text-sm font-semibold shadow-xs max-w-full">
              <span className="flex h-2 w-2 rounded-full bg-[#D4AF37] animate-ping shrink-0" />
              <span className="truncate sm:whitespace-normal">Limited Time: Complimentary Comprehensive Consultations</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-headline"
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-['Outfit']"
            >
              Your Healthiest Smile{' '}
              <span className="bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B88E28] bg-clip-text text-transparent">
                Starts Here.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-lg lg:text-xl text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Premium dental care from experienced professionals — with personalized treatment plans designed around your smile, comfort and confidence.
            </p>

            {/* Primary CTAs: Book Online Form + Call 0323 1034955 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1 sm:pt-2">
              <button
                onClick={onOpenBooking}
                id="hero-primary-book-btn"
                className="theme-btn-primary flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-black text-sm sm:text-base cursor-pointer transform active:scale-98 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                <Sparkles className="w-5 h-5 text-black shrink-0" />
                <span>BOOK APPOINTMENT ONLINE</span>
                <ArrowRight className="w-4 h-4 text-black shrink-0" />
              </button>

              <a
                href={CLINIC_INFO.phoneHref}
                onClick={handleCall}
                id="hero-call-btn"
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold text-sm bg-[#16161B] hover:bg-[#1E1E26] text-white border border-[#D4AF37]/35 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Call: {CLINIC_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Secondary Call Note */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-[#9CA3AF] font-medium">
              <span>Front Desk Assistance:</span>
              <span className="inline-flex items-center gap-1.5 text-[#D4AF37] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span>Direct Line Available: {CLINIC_INFO.phoneDisplay}</span>
              </span>
            </div>

            {/* Trust Indicators Near CTA */}
            <div className="pt-3 sm:pt-4 border-t border-[#D4AF37]/20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-left">
                {/* Trust Item 1 */}
                <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-[#121216] border border-[#D4AF37]/25 shadow-xs">
                  <div className="flex flex-col">
                    <div className="flex items-center text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-white mt-0.5">
                      5-Star Patient Experience
                    </span>
                    <span className="text-[11px] text-[#9CA3AF]">340+ Verified Reviews</span>
                  </div>
                </div>

                {/* Trust Item 2 */}
                <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-[#121216] border border-[#D4AF37]/25 shadow-xs">
                  <div className="p-1.5 rounded-lg bg-[#181820] text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white leading-tight">
                      Experienced Dental Team
                    </div>
                    <div className="text-[11px] text-[#9CA3AF]">Gentle & Board-Certified</div>
                  </div>
                </div>

                {/* Trust Item 3 */}
                <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-[#121216] border border-[#D4AF37]/25 shadow-xs">
                  <div className="p-1.5 rounded-lg bg-[#181820] text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white leading-tight">
                      Modern 3D Dental Tech
                    </div>
                    <div className="text-[11px] text-[#9CA3AF]">Low Radiation Scanners</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium 3D Animated Dental Visual */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Glassmorphic backdrop container for 3D visual */}
            <div className="relative w-full max-w-md mx-auto p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#121216]/90 backdrop-blur-xl border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.12)]">
              
              {/* Header inside 3D viewer card */}
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2.5 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    Bio-Mimetic Enamel Tech
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-black bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] px-2 py-0.5 rounded-md shadow-xs">
                  Interactive 3D
                </span>
              </div>

              {/* The 3D Canvas Tooth Model */}
              <ThreeToothScene
                badgeText="Touch & drag 3D tooth"
                autoRotateSpeed={0.007}
              />

              {/* Quick Feature Checklist below 3D */}
              <div className="mt-2.5 pt-2.5 border-t border-[#D4AF37]/20 grid grid-cols-2 gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#D1D5DB] font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Enamel-preserving</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Virtually pain-free</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Natural translucency</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Custom shade matching</span>
                </div>
              </div>

              {/* Quick direct button inside the 3D card */}
              <button
                onClick={onOpenBooking}
                className="w-full mt-3 py-2.5 px-3 rounded-xl bg-[#181820] hover:bg-[#20202A] text-[#D4AF37] hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5 border border-[#D4AF37]/35 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Reserve Free 3D Consultation & Scan</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
