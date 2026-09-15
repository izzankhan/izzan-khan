import React from 'react';
import { Calendar, Sparkles, Phone, Star, ShieldCheck, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ThreeToothScene } from './ThreeToothScene';
import { CLINIC_INFO } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onOpenQuiz }) => {
  const handleBooking = () => {
    trackEvent('cta_click', { ctaName: 'Hero BOOK YOUR APPOINTMENT', section: 'Hero' });
    onOpenBooking();
  };

  const handleConsultation = () => {
    trackEvent('cta_click', { ctaName: 'Hero GET A FREE CONSULTATION', section: 'Hero' });
    onOpenQuiz();
  };

  const handleCall = () => {
    trackEvent('call_click', { section: 'Hero' });
  };

  return (
    <section
      id="hero"
      className="relative pt-20 pb-8 sm:pt-28 sm:pb-12 md:pt-36 md:pb-16 overflow-hidden bg-gradient-to-b from-sky-50/40 via-white to-slate-50/50"
    >
      {/* Background Decorative Soft Gradients & Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden opacity-50">
        <div className="absolute -top-24 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 sm:w-80 h-60 sm:h-80 bg-cyan-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Conversion Copy & Action Buttons */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            {/* Urgency / Social Pill */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full theme-badge text-xs sm:text-sm font-semibold shadow-xs max-w-full">
              <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping shrink-0" />
              <span className="truncate sm:whitespace-normal">Limited Time: Complimentary Comprehensive Consultations</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-headline"
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            >
              Your Healthiest Smile{' '}
              <span className="theme-text-gradient bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-700 bg-clip-text text-transparent">
                Starts Here.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Premium dental care from experienced professionals — with personalized treatment plans designed around your smile, comfort and confidence.
            </p>

            {/* Two Primary CTAs + Call Option */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1 sm:pt-2">
              <button
                onClick={handleBooking}
                id="hero-primary-book-btn"
                className="theme-btn-primary group flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl font-bold text-sm sm:text-base shadow-lg shadow-sky-600/25 transition-all transform active:scale-98 sm:hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-5 h-5 shrink-0" />
                <span>BOOK YOUR APPOINTMENT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              <button
                onClick={handleConsultation}
                id="hero-consultation-quiz-btn"
                className="flex items-center justify-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border-2 border-slate-200 shadow-xs hover:shadow-md transition-all transform active:scale-98 sm:hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-cyan-600 shrink-0" />
                <span>GET A FREE CONSULTATION</span>
              </button>
            </div>

            {/* Secondary Call Now Option */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 font-medium">
              <span>Prefer speaking right now?</span>
              <a
                href={CLINIC_INFO.phoneHref}
                onClick={handleCall}
                id="hero-call-now-link"
                className="inline-flex items-center gap-1.5 text-sky-700 hover:text-sky-800 font-bold hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
                <span>Call: {CLINIC_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Trust Indicators Near CTA */}
            <div className="pt-3 sm:pt-4 border-t border-slate-200/80">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-left">
                {/* Trust Item 1 */}
                <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/80 border border-slate-200/60 shadow-xs">
                  <div className="flex flex-col">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-800 mt-0.5">
                      5-Star Patient Experience
                    </span>
                    <span className="text-[11px] text-slate-500">340+ Verified Reviews</span>
                  </div>
                </div>

                {/* Trust Item 2 */}
                <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/80 border border-slate-200/60 shadow-xs">
                  <div className="p-1.5 rounded-lg bg-sky-100 text-sky-700 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      Experienced Dental Team
                    </div>
                    <div className="text-[11px] text-slate-500">Gentle & Board-Certified</div>
                  </div>
                </div>

                {/* Trust Item 3 */}
                <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/80 border border-slate-200/60 shadow-xs">
                  <div className="p-1.5 rounded-lg bg-cyan-100 text-cyan-700 shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      Modern 3D Dental Tech
                    </div>
                    <div className="text-[11px] text-slate-500">Low Radiation Scanners</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium 3D Animated Dental Visual */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Glassmorphic backdrop container for 3D visual */}
            <div className="relative w-full max-w-md mx-auto p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-xl border border-sky-100/80 shadow-lg sm:shadow-xl">
              
              {/* Header inside 3D viewer card */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Bio-Mimetic Enamel Tech
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md">
                  Interactive 3D
                </span>
              </div>

              {/* The 3D Canvas Tooth Model */}
              <ThreeToothScene
                badgeText="Touch & drag 3D tooth"
                autoRotateSpeed={0.007}
              />

              {/* Quick Feature Checklist below 3D */}
              <div className="mt-2.5 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Enamel-preserving</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Virtually pain-free</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Natural translucency</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Custom shade matching</span>
                </div>
              </div>

              {/* Quick direct button inside the 3D card */}
              <button
                onClick={handleConsultation}
                className="w-full mt-3 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer"
              >
                <span>Check If You Qualify For Free Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
