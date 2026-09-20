import React, { useState, useEffect } from 'react';
import { Phone, Sparkles, Menu, X, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
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

  const handleCallClick = () => {
    trackEvent('call_click', { section: 'Navbar' });
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0E]/95 backdrop-blur-md shadow-lg border-b border-[#D4AF37]/25 py-2.5'
          : 'bg-[#0A0A0E]/85 backdrop-blur-sm border-b border-[#D4AF37]/15 py-3.5'
      }`}
    >
      {/* Top micro banner for high-intent traffic */}
      <div className="hidden lg:block bg-[#050507] text-[#D4AF37] text-xs py-1.5 px-4 text-center font-medium border-b border-[#D4AF37]/15">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-white">Accepting New Patients • <span className="text-[#D4AF37] font-semibold">Free Digital Consultations & 3D Scans Available</span></span>
          </div>
          <div className="flex items-center gap-6 text-[#9CA3AF]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Mon-Sat: 8am - 6pm
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Most PPO Dental Insurances Accepted
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E6C265] to-[#B88E28] flex items-center justify-center text-black shadow-md shadow-[#D4AF37]/20 border border-[#F3E5AB]/40 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block leading-tight font-['Outfit']">
                Smile<span className="text-[#D4AF37]">Craft</span>
              </span>
              <span className="text-[11px] text-[#D4AF37]/80 tracking-wider uppercase font-semibold block">
                Dental Clinic
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-[#9CA3AF]">
            <button
              onClick={() => scrollToSection('treatments')}
              className="hover:text-[#D4AF37] transition-colors py-1 cursor-pointer"
            >
              Treatments
            </button>
            <button
              onClick={() => scrollToSection('special-offer')}
              className="hover:text-[#D4AF37] transition-colors py-1 text-[#D4AF37] font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Special Offer
            </button>
            <button
              onClick={() => scrollToSection('before-after')}
              className="hover:text-[#D4AF37] transition-colors py-1 cursor-pointer"
            >
              Results
            </button>
            <button
              onClick={() => scrollToSection('doctor-profile')}
              className="hover:text-[#D4AF37] transition-colors py-1 cursor-pointer"
            >
              About Doctor
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="hover:text-[#D4AF37] transition-colors py-1 cursor-pointer"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-[#D4AF37] transition-colors py-1 cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Click to call */}
            <a
              href={CLINIC_INFO.phoneHref}
              onClick={handleCallClick}
              id="navbar-call-button"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-white hover:text-[#D4AF37] bg-[#141418] hover:bg-[#1A1A22] transition-all font-bold text-xs lg:text-sm border border-[#D4AF37]/30"
              title="Call SmileCraft Dental Clinic"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>{CLINIC_INFO.phoneDisplay}</span>
            </a>

            {/* Book Online Button */}
            <button
              onClick={onOpenBooking}
              id="navbar-book-button"
              className="theme-btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs lg:text-sm font-extrabold cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B88E28] text-black text-xs font-bold"
            >
              Book Now
            </button>
            <a
              href={CLINIC_INFO.phoneHref}
              onClick={handleCallClick}
              className="p-2 rounded-lg bg-[#141418] text-[#D4AF37] border border-[#D4AF37]/40"
              aria-label="Call clinic"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-[#1A1A22]"
              aria-label="Toggle navigation menu"
              id="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0D0D11] border-b border-[#D4AF37]/30 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2 text-base font-medium text-[#E5E7EB]">
            <button
              onClick={() => scrollToSection('treatments')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#16161D]"
            >
              Treatments & Services
            </button>
            <button
              onClick={() => scrollToSection('special-offer')}
              className="text-left py-2 px-3 rounded-lg bg-[#1A1A22] text-[#D4AF37] border border-[#D4AF37]/30 font-semibold flex items-center justify-between"
            >
              <span>New Patient Special</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#D4AF37] text-black font-bold">FREE</span>
            </button>
            <button
              onClick={() => scrollToSection('pain-points')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#16161D]"
            >
              Common Symptoms
            </button>
            <button
              onClick={() => scrollToSection('before-after')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#16161D]"
            >
              Before & After Results
            </button>
            <button
              onClick={() => scrollToSection('doctor-profile')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#16161D]"
            >
              Meet Dr. Sarah Khan
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#16161D]"
            >
              Frequently Asked Questions
            </button>
          </div>

          <div className="pt-2 border-t border-[#D4AF37]/20 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="theme-btn-primary w-full py-3.5 px-4 rounded-xl text-black font-extrabold text-center shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-black" />
              <span>Book Online (Lead Form)</span>
            </button>
            <a
              href={CLINIC_INFO.phoneHref}
              onClick={() => {
                setMobileMenuOpen(false);
                handleCallClick();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#141418] border border-[#D4AF37]/40 text-white font-bold text-center shadow-md flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call: 0323 1034955</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
