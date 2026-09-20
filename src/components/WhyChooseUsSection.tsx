import React from 'react';
import { 
  UserCheck, 
  Cpu, 
  FileSpreadsheet, 
  Coffee, 
  HelpCircle, 
  Heart,
  CheckCircle2,
  Sparkles 
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const benefits = [
    {
      icon: <UserCheck className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Experienced Dental Team',
      description: 'Led by Dr. Sarah Khan with over a decade of clinical experience in cosmetic transformations and complex restorative therapies.',
      highlight: '10+ Years Experience',
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Advanced Technology',
      description: 'Intraoral 3D scanners, ultra-low radiation digital panoramic imaging, and computer-guided implant planning for pinpoint accuracy.',
      highlight: '3D Precision Scans',
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Personalized Treatment Plans',
      description: 'No generic formulas. We customize every solution around your facial aesthetics, lifestyle, schedule, and personal budget.',
      highlight: '100% Customized',
    },
    {
      icon: <Coffee className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Comfortable Environment',
      description: 'Designed as a soothing wellness retreat. Enjoy heated treatment chairs, noise-canceling headphones, and gentle sedation options.',
      highlight: 'Anxiety-Free Care',
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Transparent Treatment Guidance',
      description: 'Clear explanations before we begin. You receive itemized fee breakdowns and pros/cons of each option with zero hidden surprises.',
      highlight: 'Upfront Pricing',
    },
    {
      icon: <Heart className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Patient-First Care',
      description: 'We treat people, not just teeth. We listen to your concerns, respect your time with minimal waiting, and prioritize your long-term comfort.',
      highlight: 'Empathetic Approach',
    },
  ];

  return (
    <section id="why-choose-us" className="py-12 sm:py-16 lg:py-20 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The SmileCraft Standard</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Why Patients Choose <span className="text-[#D4AF37]">SmileCraft</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9CA3AF]">
            We bridge the gap between world-class cosmetic dental artistry and warm, empathetic patient comfort.
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-[#121216] rounded-2xl p-6 border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.12)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Subtle top accent gradient */}
              <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-[#B88E28] rounded-full mb-5 group-hover:w-20 transition-all duration-300" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-[#181822] border border-[#D4AF37]/30 flex items-center justify-center mb-4 group-hover:border-[#D4AF37] transition-all shadow-sm">
                  {benefit.icon}
                </div>

                <div className="inline-block text-[11px] font-bold text-[#D4AF37] bg-[#181822] border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-md mb-2">
                  {benefit.highlight}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors font-['Outfit']">
                  {benefit.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#9CA3AF] mt-2 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[#D4AF37]/15 flex items-center gap-2 text-xs font-semibold text-[#D1D5DB]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Standard with every visit</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
