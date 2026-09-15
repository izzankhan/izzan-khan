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
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-slate-50/50"
    >
      {/* Background Decorative Soft Gradients & Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden opacity-60">
        <div className="absolute -top-24 right-10 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-cyan-200/35 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-100/40 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Conversion Copy & Action Buttons */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Urgency / Social Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/80 border border-sky-200/80 text-sky-800 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
              <span>Limited Time: Complimentary Comprehensive Smile Consultations</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-headline"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]"
            >
              Your Healthiest Smile{' '}
              <span className="bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-700 bg-clip-text text-transparent">
                Starts Here.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Premium dental care from experienced professionals — with personalized treatment plans designed around your smile, comfort and confidence.
            </p>

            {/* Two Primary CTAs + Call Option */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={handleBooking}
                id="hero-primary-book-btn"
                className="group flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-700 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-bold text-base shadow-lg shadow-sky-600/25 hover:shadow-xl hover:shadow-sky-600/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>BOOK YOUR APPOINTMENT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleConsultation}
                id="hero-consultation-quiz-btn"
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white hover:bg-sky-50 text-sky-700 font-bold text-base border-2 border-sky-300/90 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-cyan-600" />
                <span>GET A FREE CONSULTATION</span>
              </button>
            </div>

            {/* Secondary Call Now Option */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-1 text-sm text-slate-600 font-medium">
              <span>Prefer speaking right now?</span>
              <a
                href={CLINIC_INFO.phoneHref}
                onClick={handleCall}
                id="hero-call-now-link"
                className="inline-flex items-center gap-2 text-sky-700 hover:text-sky-800 font-bold hover:underline"
              >
                <Phone className="w-4 h-4 text-cyan-600 animate-pulse" />
                <span>📞 Call Now: {CLINIC_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Trust Indicators Near CTA */}
            <div className="pt-4 border-t border-slate-200/80">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {/* Trust Item 1 */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-slate-200/60 shadow-xs">
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
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-slate-200/60 shadow-xs">
                  <div className="p-2 rounded-lg bg-sky-100 text-sky-700 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      Experienced Dental Professionals
                    </div>
                    <div className="text-[11px] text-slate-500">Gentle & Board-Certified</div>
                  </div>
                </div>

                {/* Trust Item 3 */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-slate-200/60 shadow-xs">
                  <div className="p-2 rounded-lg bg-cyan-100 text-cyan-700 shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      Modern Dental Technology
                    </div>
                    <div className="text-[11px] text-slate-500">3D Digital Scanners & Low-Radiation</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium 3D Animated Dental Visual */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Glassmorphic backdrop container for 3D visual */}
            <div className="relative w-full max-w-md mx-auto p-4 sm:p-6 rounded-3xl bg-white/75 backdrop-blur-xl border border-sky-100 shadow-xl shadow-sky-900/5">
              
              {/* Header inside 3D viewer card */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Bio-Mimetic Enamel Technology
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md">
                  Interactive 3D
                </span>
              </div>

              {/* The 3D Canvas Tooth Model */}
              <ThreeToothScene
                badgeText="Click & drag to inspect 3D tooth"
                autoRotateSpeed={0.007}
              />

              {/* Quick Feature Checklist below 3D */}
              <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
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
                className="w-full mt-4 py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-sky-200"
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
