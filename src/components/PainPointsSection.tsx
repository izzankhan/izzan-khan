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
    <section id="pain-points" className="py-20 bg-slate-50/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <span>Don't Let Dental Discomfort Wait</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Is Your Smile Holding You Back?
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            Dental problems affect more than just teeth — they disrupt your sleep, nutrition, and personal confidence. We provide gentle, lasting solutions engineered for permanent comfort.
          </p>
        </div>

        {/* 6 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {PAIN_POINTS.map((item) => {
            const isHovered = hoveredCardId === item.id;
            return (
              <div
                key={item.id}
                id={`pain-card-${item.id}`}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => handleCardClick(item.title)}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-white transition-all">
                      {getIcon(item.id)}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
                      Gentle Relief
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Solution Box & Treatment match */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-xs font-semibold text-slate-700">
                    <span className="text-sky-700 font-bold">Recommended:</span> {item.recommendedTreatment}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-sky-800 transition-colors pt-1">
                    <span>Explore Treatment Plan</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Conversion CTA */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-3 sm:p-2 rounded-2xl bg-white shadow-md border border-slate-200">
            <span className="text-sm font-semibold text-slate-700 px-3">
              Unsure which procedure fits your situation best?
            </span>
            <button
              onClick={handleCtaClick}
              id="pain-points-cta-btn"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Find The Right Treatment For Me</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
