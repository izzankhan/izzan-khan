import React from 'react';
import { Calendar, Stethoscope, FileHeart, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface HowItWorksSectionProps {
  onStartJourney: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStartJourney }) => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Book Your Consultation',
      description: 'Fill out our seamless 60-second online intake form or call our front desk to pick a time that fits your day.',
      icon: <Calendar className="w-6 h-6 text-[#D4AF37]" />,
      detail: 'Free New Patient Special includes digital scans',
    },
    {
      stepNumber: '02',
      title: 'Meet Your Dental Expert',
      description: 'Dr. Sarah Khan performs a gentle, high-resolution 3D examination in our relaxed, modern clinical setting.',
      icon: <Stethoscope className="w-6 h-6 text-[#D4AF37]" />,
      detail: 'Discuss exact smile goals with zero rush',
    },
    {
      stepNumber: '03',
      title: 'Get Your Personalized Plan',
      description: 'Receive an upfront, transparent treatment roadmap with clear pricing, payment options, and realistic timelines.',
      icon: <FileHeart className="w-6 h-6 text-[#D4AF37]" />,
      detail: 'Tailored to your aesthetic goals & budget',
    },
  ];

  const handleCta = () => {
    trackEvent('cta_click', { ctaName: 'Start Your Smile Journey', section: 'How It Works' });
    onStartJourney();
  };

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Seamless & Transparent Care</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Your Journey To A <span className="text-[#D4AF37]">Healthier Smile</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9CA3AF]">
            Getting premium dental care should be effortless. We’ve refined our onboarding into three simple, patient-centered steps.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-[#D4AF37]/30 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative bg-[#121216] rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Step Number Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#181822] border border-[#D4AF37]/30 flex items-center justify-center shadow-sm group-hover:border-[#D4AF37] transition-all">
                      {step.icon}
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors font-mono">
                      {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-['Outfit']">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#D4AF37]/15 flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{step.detail}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Action Button */}
        <div className="mt-8 sm:mt-12 text-center">
          <button
            onClick={handleCta}
            className="theme-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-black text-xs sm:text-sm shadow-lg shadow-[#D4AF37]/20 transition-all transform active:scale-98 cursor-pointer"
          >
            <span>Start Step 1: Book Online Consultation</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

      </div>
    </section>
  );
};
