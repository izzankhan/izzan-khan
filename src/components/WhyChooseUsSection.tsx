import React from 'react';
import { 
  UserCheck, 
  Cpu, 
  FileSpreadsheet, 
  Coffee, 
  HelpCircle, 
  Heart,
  CheckCircle2 
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const benefits = [
    {
      icon: <UserCheck className="w-7 h-7 text-sky-600" />,
      title: 'Experienced Dental Team',
      description: 'Led by Dr. Sarah Khan with over a decade of clinical experience in cosmetic transformations and complex restorative therapies.',
      highlight: '10+ Years Experience',
    },
    {
      icon: <Cpu className="w-7 h-7 text-cyan-600" />,
      title: 'Advanced Technology',
      description: 'Intraoral 3D scanners, ultra-low radiation digital panoramic imaging, and computer-guided implant planning for pinpoint accuracy.',
      highlight: '3D Precision Scans',
    },
    {
      icon: <FileSpreadsheet className="w-7 h-7 text-blue-600" />,
      title: 'Personalized Treatment Plans',
      description: 'No generic formulas. We customize every solution around your facial aesthetics, lifestyle, schedule, and personal budget.',
      highlight: '100% Customized',
    },
    {
      icon: <Coffee className="w-7 h-7 text-amber-600" />,
      title: 'Comfortable Environment',
      description: 'Designed as a soothing wellness retreat. Enjoy heated treatment chairs, noise-canceling headphones, and gentle sedation options.',
      highlight: 'Anxiety-Free Care',
    },
    {
      icon: <HelpCircle className="w-7 h-7 text-emerald-600" />,
      title: 'Transparent Treatment Guidance',
      description: 'Clear explanations before we begin. You receive itemized fee breakdowns and pros/cons of each option with zero hidden surprises.',
      highlight: 'Upfront Pricing',
    },
    {
      icon: <Heart className="w-7 h-7 text-rose-600" />,
      title: 'Patient-First Care',
      description: 'We treat people, not just teeth. We listen to your concerns, respect your time with minimal waiting, and prioritize your long-term comfort.',
      highlight: 'Empathetic Approach',
    },
  ];

  return (
    <section id="why-choose-us" className="py-8 sm:py-12 lg:py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <span>The SmileCraft Standard</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Patients Choose SmileCraft
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            We bridge the gap between world-class cosmetic dental artistry and warm, empathetic patient comfort.
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Subtle top accent gradient */}
              <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full mb-4 sm:mb-5 group-hover:w-20 transition-all duration-300" />

              <div>
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-sky-50/80 border border-sky-100 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-white transition-all shadow-xs">
                  {benefit.icon}
                </div>

                <div className="inline-block text-[10px] sm:text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md mb-1.5">
                  {benefit.highlight}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Standard with every visit</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
