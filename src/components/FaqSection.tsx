import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS, CLINIC_INFO } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface FaqSectionProps {
  onOpenBooking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleNeedHelp = () => {
    trackEvent('call_click', { section: 'FAQ' });
  };

  return (
    <section id="faq" className="py-8 sm:py-12 lg:py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            Everything you need to know about your first appointment, insurance coverage, payment options, and personalized consultations.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-2 sm:space-y-3">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                id={`faq-item-${index}`}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between p-3.5 sm:p-5 text-left hover:bg-slate-50/70 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 pr-3">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-sky-100 text-sky-700 rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-3.5 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-6 sm:mt-8 max-w-xl mx-auto p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 text-center shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              Have a specific question about your treatment?
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
              Our clinical concierge team is here to assist you.
            </p>
          </div>

          <a
            href={CLINIC_INFO.phoneHref}
            onClick={handleNeedHelp}
            className="shrink-0 flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call {CLINIC_INFO.phoneDisplay}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
