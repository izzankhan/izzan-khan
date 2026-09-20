import React, { useState, useEffect } from 'react';
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
import { ContactSection } from './components/ContactSection';
import { FinalCtaAndFooter } from './components/FinalCtaAndFooter';
import { StickyMobileBar } from './components/StickyMobileBar';
import { ExitIntentModal } from './components/ExitIntentModal';
import { BookingPage } from './components/BookingPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'booking'>('home');
  const [selectedTreatmentForBooking, setSelectedTreatmentForBooking] = useState<string>(
    'Free Comprehensive Consultation & Scan'
  );

  // Sync with browser URL hash (#book / #home)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#book' || window.location.hash === '#booking') {
        setCurrentPage('booking');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Primary routing function: whenever any booking button is clicked, navigate to the Booking Form Page
  const openBookingPage = (treatmentName?: string) => {
    if (treatmentName) {
      setSelectedTreatmentForBooking(treatmentName);
    }
    setCurrentPage('booking');
    window.location.hash = '#book';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToHome = () => {
    setCurrentPage('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user is on the dedicated Booking Form Page
  if (currentPage === 'booking') {
    return (
      <BookingPage 
        onBackToHome={backToHome}
        selectedTreatment={selectedTreatmentForBooking}
      />
    );
  }

  // Otherwise, render the main Landing Page with dark black & gold aesthetic
  return (
    <div
      className="min-h-screen bg-[#070709] text-white flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]"
    >
      {/* Sticky Top Navigation */}
      <Navbar
        onOpenBooking={() => openBookingPage()}
        onOpenQuiz={() => openBookingPage('Custom Dental Smile Assessment')}
      />

      {/* Main Conversion Funnel */}
      <main className="flex-grow">
        
        {/* SECTION 1 — HERO / ABOVE THE FOLD */}
        <HeroSection
          onOpenBooking={() => openBookingPage()}
          onOpenQuiz={() => openBookingPage('Custom Dental Assessment')}
        />

        {/* SECTION 2 — TRUST & SOCIAL PROOF */}
        <TrustSocialProofSection />

        {/* SECTION 3 — PROBLEMS / PAIN POINTS */}
        <PainPointsSection
          onSelectPainPoint={(title) => openBookingPage(title)}
          onOpenQuiz={() => openBookingPage('Pain Assessment Consultation')}
        />

        {/* SECTION 4 — SERVICES / TREATMENTS */}
        <TreatmentsSection
          onSelectTreatmentForBooking={(treatmentName) => openBookingPage(treatmentName)}
        />

        {/* SECTION 5 — SPECIAL OFFER */}
        <SpecialOfferSection
          onClaimOffer={() => openBookingPage('Free Comprehensive Consultation & 3D Scan')}
        />

        {/* SECTION 6 — WHY CHOOSE US */}
        <WhyChooseUsSection />

        {/* SECTION 7 — BEFORE & AFTER / RESULTS */}
        <BeforeAfterSection
          onBookConsultation={() => openBookingPage('Smile Makeover Transformation')}
        />

        {/* SECTION 8 — HOW IT WORKS */}
        <HowItWorksSection
          onStartJourney={() => openBookingPage('Initial Comprehensive Consultation')}
        />

        {/* SECTION 9 — DENTIST / TEAM TRUST SECTION */}
        <DentistProfileSection
          onBookWithDoctor={() => openBookingPage('Doctor Consultation with Dr. Sarah Khan')}
        />

        {/* SECTION 10 — PATIENT TESTIMONIALS */}
        <TestimonialsCarouselSection />

        {/* SECTION 11 — GOOGLE REVIEW STYLE SOCIAL PROOF */}
        <GoogleReviewsSection />

        {/* SECTION 12 — FAQ */}
        <FaqSection
          onOpenBooking={() => openBookingPage()}
        />

        {/* SECTION 13 — DIRECT CONTACT & FORM ENTRY */}
        <ContactSection
          preselectedTreatment={selectedTreatmentForBooking}
          onOpenBookingForm={() => openBookingPage(selectedTreatmentForBooking)}
        />

      </main>

      {/* SECTION 14 — FINAL CTA + FOOTER */}
      <FinalCtaAndFooter
        onOpenBooking={() => openBookingPage()}
      />

      {/* Sticky Mobile Action Bar */}
      <StickyMobileBar
        onOpenBooking={() => openBookingPage()}
      />

      {/* Exit Intent Conversion Voucher */}
      <ExitIntentModal
        onClaimOffer={() => openBookingPage('Exit Intent Free Consultation Voucher')}
      />

    </div>
  );
}
