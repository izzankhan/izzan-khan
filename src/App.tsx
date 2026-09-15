import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustSocialProofSection } from './components/TrustSocialProofSection';
import { PainPointsSection } from './components/PainPointsSection';
import { TreatmentsSection } from './components/TreatmentsSection';
import { SpecialOfferSection } from './components/SpecialOfferSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DentistProfileSection } from './components/DentistProfileSection';
import { TestimonialsCarouselSection } from './components/TestimonialsCarouselSection';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { FaqSection } from './components/FaqSection';
import { LeadQuizSection } from './components/LeadQuizSection';
import { BookingSection } from './components/BookingSection';
import { FinalCtaAndFooter } from './components/FinalCtaAndFooter';
import { StickyMobileBar } from './components/StickyMobileBar';
import { ExitIntentModal } from './components/ExitIntentModal';
import { trackEvent } from './utils/analytics';

export default function App() {
  const [selectedTreatmentForBooking, setSelectedTreatmentForBooking] = useState<string>(
    'Free Comprehensive Consultation & Scan'
  );

  // Smooth scroll helpers
  const scrollToBooking = (treatmentName?: string) => {
    if (treatmentName) {
      setSelectedTreatmentForBooking(treatmentName);
    }
    const element = document.getElementById('booking-section');
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToQuiz = (serviceName?: string) => {
    if (serviceName) {
      setSelectedTreatmentForBooking(serviceName);
    }
    const element = document.getElementById('consultation-quiz');
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-cyan-100 selection:text-cyan-900">
      
      {/* Sticky Top Navigation */}
      <Navbar
        onOpenBooking={() => scrollToBooking()}
        onOpenQuiz={() => scrollToQuiz()}
      />

      {/* Main 15-Section Conversion Funnel */}
      <main className="flex-grow">
        
        {/* SECTION 1 — HERO / ABOVE THE FOLD */}
        <HeroSection
          onOpenBooking={() => scrollToBooking()}
          onOpenQuiz={() => scrollToQuiz()}
        />

        {/* SECTION 2 — TRUST & SOCIAL PROOF */}
        <TrustSocialProofSection />

        {/* SECTION 3 — PROBLEMS / PAIN POINTS */}
        <PainPointsSection
          onSelectPainPoint={(title) => scrollToQuiz(title)}
          onOpenQuiz={() => scrollToQuiz()}
        />

        {/* SECTION 4 — SERVICES / TREATMENTS */}
        <TreatmentsSection
          onSelectTreatmentForBooking={(treatmentName) => scrollToBooking(treatmentName)}
        />

        {/* SECTION 5 — SPECIAL OFFER */}
        <SpecialOfferSection
          onClaimOffer={() => scrollToQuiz('Free Dental Consultation')}
        />

        {/* SECTION 6 — WHY CHOOSE US */}
        <WhyChooseUsSection />

        {/* SECTION 7 — BEFORE & AFTER / RESULTS */}
        <BeforeAfterSection
          onBookConsultation={() => scrollToBooking()}
        />

        {/* SECTION 8 — HOW IT WORKS */}
        <HowItWorksSection
          onStartJourney={() => scrollToBooking()}
        />

        {/* SECTION 9 — DENTIST / TEAM TRUST SECTION */}
        <DentistProfileSection
          onBookWithDoctor={() => scrollToBooking('Consultation with Dr. Sarah Khan')}
        />

        {/* SECTION 10 — PATIENT TESTIMONIALS */}
        <TestimonialsCarouselSection />

        {/* SECTION 11 — GOOGLE REVIEW STYLE SOCIAL PROOF */}
        <GoogleReviewsSection />

        {/* SECTION 12 — FAQ */}
        <FaqSection
          onOpenBooking={() => scrollToBooking()}
        />

        {/* SECTION 13 — LEAD CAPTURE / QUIZ */}
        <LeadQuizSection
          initialService={selectedTreatmentForBooking}
          onOpenBookingDirectly={() => scrollToBooking()}
        />

        {/* SECTION 14 — BOOKING SECTION */}
        <BookingSection
          preselectedTreatment={selectedTreatmentForBooking}
        />

      </main>

      {/* SECTION 15 — FINAL CTA + FOOTER */}
      <FinalCtaAndFooter
        onOpenBooking={() => scrollToBooking()}
      />

      {/* Sticky Mobile Action Bar */}
      <StickyMobileBar
        onOpenBooking={() => scrollToBooking()}
      />

      {/* Exit Intent Conversion Voucher */}
      <ExitIntentModal
        onClaimOffer={() => scrollToQuiz('Exit Intent Free Consultation Voucher')}
      />

    </div>
  );
}
