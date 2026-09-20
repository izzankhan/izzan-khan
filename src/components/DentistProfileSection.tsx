import React from 'react';
import { Award, GraduationCap, Heart, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/funnelData';
import { trackEvent } from '../utils/analytics';

interface DentistProfileSectionProps {
  onBookWithDoctor: () => void;
}

export const DentistProfileSection: React.FC<DentistProfileSectionProps> = ({ onBookWithDoctor }) => {
  const handleMeet = () => {
    trackEvent('cta_click', { ctaName: 'MEET OUR TEAM / Book with Dr. Khan', section: 'Dentist Profile' });
    onBookWithDoctor();
  };

  return (
    <section id="doctor-profile" className="py-12 sm:py-16 lg:py-20 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#121216] rounded-2xl sm:rounded-3xl border border-[#D4AF37]/30 p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            
            {/* Left Image & Doctor Visual */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-xs sm:max-w-sm">
                
                {/* Doctor Photo Card */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/40 bg-[#181822] aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
                    alt="Dr. Sarah Khan - Lead Dentist"
                    className="w-full h-full object-cover object-top filter brightness-95"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent" />
                  
                  {/* Doctor badge at bottom of photo */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xl sm:text-2xl font-bold font-['Outfit']">{CLINIC_INFO.doctorName}</div>
                    <div className="text-xs text-[#D4AF37] font-semibold">{CLINIC_INFO.doctorRole}</div>
                  </div>
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute -bottom-3 -right-2 bg-[#181822] rounded-2xl p-3 sm:p-4 shadow-xl border border-[#D4AF37]/35 flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B88E28] text-black flex items-center justify-center font-black">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-white">10+ Years</div>
                    <div className="text-[10px] sm:text-[11px] text-[#9CA3AF] font-medium">Clinical Practice</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Doctor Bio & Credentials */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Meet Your Lead Clinician</span>
                </div>
                
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
                  {CLINIC_INFO.doctorName}
                </h2>
                
                <p className="text-sm sm:text-base font-semibold text-[#D4AF37]">
                  {CLINIC_INFO.doctorRole}
                </p>
              </div>

              {/* Patient-first Philosophy */}
              <blockquote className="p-4 sm:p-5 rounded-2xl bg-[#181822] border-l-4 border-[#D4AF37] text-xs sm:text-sm lg:text-base text-[#D1D5DB] italic leading-relaxed">
                “Every patient deserves to be heard without judgment. My goal is to make every visit completely anxiety-free, combining cutting-edge 3D dental technology with honest, compassionate treatment advice.”
              </blockquote>

              {/* Credentials & Expertise */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                    <span>Areas of Clinical Focus</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#9CA3AF]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="text-[#D1D5DB]">Cosmetic Smile Design & Veneers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="text-[#D1D5DB]">Precision Guided Dental Implants</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="text-[#D1D5DB]">Invisalign Clear Aligner Therapy</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Professional Credentials</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#9CA3AF]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="text-[#D1D5DB]">Doctor of Dental Surgery (DDS)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="text-[#D1D5DB]">Active Member, American Dental Association</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="text-[#D1D5DB]">Continuing Fellowship in Aesthetic Dentistry</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={handleMeet}
                  id="doctor-meet-cta-btn"
                  className="theme-btn-primary flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all transform active:scale-98 cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-black" />
                  <span>BOOK CONSULTATION WITH DR. KHAN</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
