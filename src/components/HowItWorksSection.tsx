import React from 'react';
import { Calendar, Stethoscope, FileHeart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface HowItWorksSectionProps {
  onStartJourney: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStartJourney }) => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Book Your Consultation',
      description: 'Choose a date and time that fits your schedule via our 60-second booking calendar or call our concierge desk.',
      icon: <Calendar className="w-6 h-6 text-sky-600" />,
      detail: 'Free New Patient Special includes digital scans',
    },
    {
      stepNumber: '02',
      title: 'Meet Your Dental Expert',
      description: 'Dr. Sarah Khan performs a gentle, high-resolution 3D examination in a serene, relaxed clinical setting.',
      icon: <Stethoscope className="w-6 h-6 text-cyan-600" />,
      detail: 'Discuss exact goals with zero rush or pressure',
    },
    {
      stepNumber: '03',
      title: 'Get Your Personalized Plan',
      description: 'Receive an upfront, transparent treatment roadmap with clear pricing, financing options, and realistic timelines.',
      icon: <FileHeart className="w-6 h-6 text-emerald-600" />,
      detail: 'Tailored to your aesthetic goals & budget',
    },
  ];

  const handleCta = () => {
    trackEvent('cta_click', { ctaName: 'Start Your Smile Journey', section: 'How It Works' });
    onStartJourney();
  };

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/70 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <span>Seamless & Transparent Care</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Journey To A Healthier Smile
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            Getting premium dental care should be effortless. We’ve refined our onboarding into three simple, patient-centered steps.
          </p>
        </div>

        {/* Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 -translate-y-12 z-0 opacity-40" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Step Number Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-white transition-all">
                      {step.icon}
                    </div>
                    <span className="text-3xl font-black text-slate-200 group-hover:text-sky-200 transition-colors font-mono">
                      {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-sky-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>{step.detail}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Action Button */}
        <div className="mt-14 text-center">
          <button
            onClick={handleCta}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-bold text-base shadow-lg shadow-sky-600/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Start Step 1: Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
