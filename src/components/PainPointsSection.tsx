import React, { useState } from 'react';
import { 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  Smile, 
  Zap, 
  ShieldX, 
  HeartCrack,
  Clock 
} from 'lucide-react';
import { PAIN_POINTS } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface PainPointsSectionProps {
  onSelectTreatment: (treatmentName: string) => void;
  onOpenQuiz: () => void;
}

export const PainPointsSection: React.FC<PainPointsSectionProps> = ({
  onSelectTreatment,
  onOpenQuiz,
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case 'pain-1':
        return <Zap className="w-5 h-5 text-[#D4AF37]" />;
      case 'pain-2':
        return <AlertCircle className="w-5 h-5 text-[#D4AF37]" />;
      case 'pain-3':
        return <ShieldX className="w-5 h-5 text-[#D4AF37]" />;
      case 'pain-4':
        return <Clock className="w-5 h-5 text-[#D4AF37]" />;
      case 'pain-5':
        return <Smile className="w-5 h-5 text-[#D4AF37]" />;
      case 'pain-6':
        return <HeartCrack className="w-5 h-5 text-[#D4AF37]" />;
      default:
        return <AlertCircle className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  const handleCardClick = (treatmentName: string) => {
    trackEvent('cta_click', {
      ctaName: `Pain Point Card: ${treatmentName}`,
      section: 'Pain Points',
    });
    onSelectTreatment(treatmentName);
  };

  const handleCtaClick = () => {
    trackEvent('cta_click', { ctaName: 'Find The Right Treatment For Me', section: 'Pain Points' });
    onOpenQuiz();
  };

  return (
    <section id="pain-points" className="py-12 sm:py-16 lg:py-20 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Don't Let Dental Discomfort Wait</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Is Your Smile <span className="text-[#D4AF37]">Holding You Back?</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9CA3AF]">
            Dental problems affect more than just teeth — they disrupt your sleep, nutrition, and personal confidence. We provide gentle, lasting solutions engineered for permanent comfort.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PAIN_POINTS.map((item) => {
            const isHovered = hoveredCardId === item.id;
            return (
              <div
                key={item.id}
                id={`pain-card-${item.id}`}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => handleCardClick(item.recommendedTreatment)}
                className="group relative bg-[#121216] rounded-2xl p-6 border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.12)] transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
              >
                {/* Highlight sheen */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#181822] border border-[#D4AF37]/30 flex items-center justify-center shadow-sm group-hover:border-[#D4AF37] transition-all">
                      {getIcon(item.id)}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#181822] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                      Gentle Relief
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors font-['Outfit']">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#D4AF37]/80 mt-0.5">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#9CA3AF] mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Solution Box & Treatment match */}
                <div className="mt-5 pt-4 border-t border-[#D4AF37]/15 space-y-2">
                  <div className="text-xs font-semibold text-[#9CA3AF]">
                    <span className="text-[#D4AF37] font-bold">Recommended:</span> {item.recommendedTreatment}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs font-black text-[#D4AF37] group-hover:text-white transition-colors pt-1">
                    <span>Schedule Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform text-[#D4AF37]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Conversion CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3.5 p-3 sm:p-2 rounded-2xl bg-[#121216] shadow-lg border border-[#D4AF37]/30">
            <span className="text-xs sm:text-sm font-semibold text-white px-3">
              Unsure which procedure fits your situation best?
            </span>
            <button
              onClick={handleCtaClick}
              id="pain-points-cta-btn"
              className="theme-btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all transform active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Find The Right Treatment For Me</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
