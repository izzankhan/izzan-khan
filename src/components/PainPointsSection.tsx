import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  AlertOctagon, 
  Smile, 
  Crosshair, 
  HeartCrack, 
  ArrowRight,
  HelpCircle 
} from 'lucide-react';
import { PAIN_POINTS } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface PainPointsSectionProps {
  onSelectPainPoint: (painPointTitle: string) => void;
  onOpenQuiz: () => void;
}

export const PainPointsSection: React.FC<PainPointsSectionProps> = ({
  onSelectPainPoint,
  onOpenQuiz,
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case 'pain':
        return <Zap className="w-6 h-6 text-rose-500" />;
      case 'stains':
        return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'missing':
        return <AlertOctagon className="w-6 h-6 text-orange-500" />;
      case 'crooked':
        return <Smile className="w-6 h-6 text-sky-500" />;
      case 'cavities':
        return <Crosshair className="w-6 h-6 text-purple-500" />;
      case 'gums':
        return <HeartCrack className="w-6 h-6 text-emerald-500" />;
      default:
        return <HelpCircle className="w-6 h-6 text-sky-500" />;
    }
  };

  const handleCardClick = (title: string) => {
    trackEvent('cta_click', { ctaName: `Pain Point Card: ${title}`, section: 'Pain Points' });
    onSelectPainPoint(title);
  };

  const handleCtaClick = () => {
    trackEvent('cta_click', { ctaName: 'Find The Right Treatment For Me', section: 'Pain Points' });
    onOpenQuiz();
  };

  return (
    <section id="pain-points" className="py-8 sm:py-12 lg:py-16 bg-slate-50/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <span>Don't Let Dental Discomfort Wait</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Is Your Smile Holding You Back?
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Dental problems affect more than just teeth — they disrupt your sleep, nutrition, and personal confidence. We provide gentle, lasting solutions engineered for permanent comfort.
          </p>
        </div>

        {/* 6 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {PAIN_POINTS.map((item) => {
            const isHovered = hoveredCardId === item.id;
            return (
              <div
                key={item.id}
                id={`pain-card-${item.id}`}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => handleCardClick(item.title)}
                className="group relative bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 3D Highlight sheen */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/5 via-cyan-500/5 to-transparent pointer-events-none transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-white transition-all">
                      {getIcon(item.id)}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                      Gentle Relief
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Solution Box & Treatment match */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-1.5">
                  <div className="text-xs font-semibold text-slate-700">
                    <span className="text-sky-700 font-bold">Recommended:</span> {item.recommendedTreatment}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-sky-800 transition-colors pt-1">
                    <span>Explore Treatment Plan</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Conversion CTA */}
        <div className="mt-8 sm:mt-10 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-3 sm:p-2 rounded-2xl bg-white shadow-sm border border-slate-200">
            <span className="text-xs sm:text-sm font-semibold text-slate-700 px-3">
              Unsure which procedure fits your situation best?
            </span>
            <button
              onClick={handleCtaClick}
              id="pain-points-cta-btn"
              className="theme-btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all transform active:scale-98 sm:hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Find The Right Treatment For Me</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
