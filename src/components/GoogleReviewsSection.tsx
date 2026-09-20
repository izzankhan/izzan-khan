import React, { useState } from 'react';
import { Star, CheckCircle, ExternalLink, ChevronDown, Sparkles } from 'lucide-react';
import { GOOGLE_REVIEWS, CLINIC_INFO } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

export const GoogleReviewsSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? GOOGLE_REVIEWS : GOOGLE_REVIEWS.slice(0, 3);

  const handleViewAll = () => {
    trackEvent('cta_click', { ctaName: 'VIEW ALL REVIEWS', section: 'Google Reviews' });
    setShowAll(!showAll);
  };

  return (
    <section id="reviews" className="py-12 sm:py-16 lg:py-20 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Verified Public Feedback</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Loved By Our <span className="text-[#D4AF37]">Patients</span>
          </h2>

          {/* Rating Summary Block */}
          <div className="flex flex-col items-center justify-center pt-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit']">4.9</span>
              <span className="text-xl sm:text-2xl font-bold text-[#9CA3AF]">/ 5.0</span>
            </div>

            <div className="flex items-center gap-1.5 text-[#D4AF37] mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>

            <p className="text-xs sm:text-sm text-[#9CA3AF] font-medium mt-2">
              Based on verified patient reviews across major healthcare platforms
            </p>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#121216] rounded-2xl p-6 border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Rating & Google icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>

                  <div className="w-6 h-6 rounded-full bg-[#181822] border border-[#D4AF37]/30 flex items-center justify-center text-xs font-black text-[#D4AF37]">
                    G
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed italic">
                  “{review.comment}”
                </p>
              </div>

              {/* Review Author & Date */}
              <div className="mt-5 pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white font-['Outfit']">
                    {review.name}
                  </div>
                  <div className="text-[11px] text-[#9CA3AF]">
                    {review.date}
                  </div>
                </div>

                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Reviews Button */}
        <div className="mt-8 sm:mt-10 text-center">
          <button
            onClick={handleViewAll}
            id="view-all-reviews-btn"
            className="theme-btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer"
          >
            <span>{showAll ? 'SHOW FEWER REVIEWS' : 'VIEW ALL VERIFIED REVIEWS'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </div>
    </section>
  );
};
