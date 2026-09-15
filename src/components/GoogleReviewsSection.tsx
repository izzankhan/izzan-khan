import React, { useState } from 'react';
import { Star, CheckCircle, ExternalLink, ChevronDown } from 'lucide-react';
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
    <section id="reviews" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <span>Verified Public Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved By Our Patients
          </h2>

          {/* Rating Summary Block */}
          <div className="flex flex-col items-center justify-center pt-2">
            <div className="flex items-center gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-900">4.9</span>
              <span className="text-2xl font-bold text-slate-400">/ 5</span>
            </div>

            <div className="flex items-center gap-1 text-amber-400 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-sm text-slate-500 font-medium mt-1">
              Based on verified patient reviews across major healthcare platforms
            </p>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header: Rating & Google icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-[#4285F4]">
                    G
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic">
                  “{review.comment}”
                </p>
              </div>

              {/* Review Author & Date */}
              <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {review.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {review.date}
                  </div>
                </div>

                <CheckCircle className="w-4 h-4 text-sky-600" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Reviews Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleViewAll}
            id="view-all-reviews-btn"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:border-sky-500 bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 font-bold text-sm shadow-xs transition-colors cursor-pointer"
          >
            <span>{showAll ? 'SHOW FEWER REVIEWS' : 'VIEW ALL REVIEWS'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </div>
    </section>
  );
};
