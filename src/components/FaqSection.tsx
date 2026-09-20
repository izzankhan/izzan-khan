import React, { useState } from 'react';
import { ChevronDown, Sparkles, Phone, ArrowRight } from 'lucide-react';
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
    <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Frequently Asked <span className="text-[#D4AF37]">Questions</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9CA3AF]">
            Everything you need to know about your consultation, appointment scheduling, 3D scanning, and clinical procedures.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                id={`faq-item-${index}`}
                className="bg-[#121216] rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 shadow-sm transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-[#181820] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-white pr-3 font-['Outfit']">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#D4AF37] text-black rotate-180 font-bold' : 'bg-[#1A1A24] text-[#D4AF37]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-xs sm:text-sm text-[#9CA3AF] leading-relaxed border-t border-[#D4AF37]/15 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-8 sm:mt-10 max-w-2xl mx-auto p-5 sm:p-6 rounded-2xl bg-[#121216] border border-[#D4AF37]/30 text-center shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-white text-sm sm:text-base font-['Outfit']">
              Ready to schedule or have specific queries?
            </h4>
            <p className="text-xs text-[#9CA3AF] mt-0.5">
              Submit your details through our online consultation form or call front desk.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenBooking}
              className="theme-btn-primary flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Book Online</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>

            <a
              href={CLINIC_INFO.phoneHref}
              onClick={handleNeedHelp}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1A1A24] hover:bg-[#22222E] text-white text-xs font-bold border border-[#D4AF37]/35 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Call Desk</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
