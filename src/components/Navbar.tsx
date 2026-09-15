import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Sparkles, Menu, X, Clock, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenQuiz }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleBookClick = () => {
    trackEvent('cta_click', { ctaName: 'Navbar Book Appointment', section: 'Navbar' });
    onOpenBooking();
  };

  const handleConsultationClick = () => {
    trackEvent('cta_click', { ctaName: 'Navbar Free Consultation', section: 'Navbar' });
    onOpenQuiz();
  };

  const handleCallClick = () => {
    trackEvent('call_click', { section: 'Navbar' });
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      {/* Top micro banner for paid ads / high-intent traffic */}
      <div className="hidden lg:block bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-700 text-white text-xs py-1 px-4 text-center font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Accepting New Patients • Free Digital Consultations Available This Week</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-sky-100">
              <Clock className="w-3.5 h-3.5" /> Mon-Sat: 8am - 6pm
            </span>
            <span className="flex items-center gap-1.5 text-sky-100">
              <ShieldCheck className="w-3.5 h-3.5" /> Most PPO Dental Insurances Accepted
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group"
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight font-heading">
                Smile<span className="text-sky-600">Craft</span>
              </span>
              <span className="text-[11px] text-slate-500 tracking-wider uppercase font-semibold block">
                Dental Clinic
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => scrollToSection('treatments')}
              className="hover:text-sky-600 transition-colors py-1 cursor-pointer"
            >
              Treatments
            </button>
            <button
              onClick={() => scrollToSection('special-offer')}
              className="hover:text-sky-600 transition-colors py-1 text-sky-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Special Offer
            </button>
            <button
              onClick={() => scrollToSection('before-after')}
              className="hover:text-sky-600 transition-colors py-1 cursor-pointer"
            >
              Results
            </button>
            <button
              onClick={() => scrollToSection('doctor-profile')}
              className="hover:text-sky-600 transition-colors py-1 cursor-pointer"
            >
              About Doctor
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="hover:text-sky-600 transition-colors py-1 cursor-pointer"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-sky-600 transition-colors py-1 cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Click to call */}
            <a
              href={CLINIC_INFO.phoneHref}
              onClick={handleCallClick}
              id="navbar-call-button"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-slate-700 hover:text-sky-700 hover:bg-sky-50 transition-all font-semibold text-sm border border-slate-200/80"
              title="Call SmileCraft Dental Clinic"
            >
              <Phone className="w-4 h-4 text-sky-600 animate-pulse" />
              <span className="hidden lg:inline">{CLINIC_INFO.phoneDisplay}</span>
              <span className="lg:hidden">Call</span>
            </a>

            {/* Book Appointment CTA */}
            <button
              onClick={handleBookClick}
              id="navbar-book-cta"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-semibold text-sm shadow-md shadow-sky-600/20 hover:shadow-lg hover:shadow-sky-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={CLINIC_INFO.phoneHref}
              onClick={handleCallClick}
              className="p-2 rounded-lg bg-sky-50 text-sky-700 border border-sky-200"
              aria-label="Call clinic"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
              id="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2 text-base font-medium text-slate-700">
            <button
              onClick={() => scrollToSection('treatments')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Treatments & Services
            </button>
            <button
              onClick={() => scrollToSection('special-offer')}
              className="text-left py-2 px-3 rounded-lg bg-sky-50 text-sky-700 font-semibold flex items-center justify-between"
            >
              <span>New Patient Special</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-sky-200 text-sky-800 font-bold">FREE</span>
            </button>
            <button
              onClick={() => scrollToSection('pain-points')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Common Symptoms
            </button>
            <button
              onClick={() => scrollToSection('before-after')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Before & After Results
            </button>
            <button
              onClick={() => scrollToSection('doctor-profile')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Meet Dr. Sarah Khan
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Frequently Asked Questions
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleConsultationClick();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-sky-300 text-sky-700 font-semibold text-center hover:bg-sky-50 transition"
            >
              Get Free Consultation Quiz
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleBookClick();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold text-center shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
