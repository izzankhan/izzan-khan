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
    <section id="doctor-profile" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-sky-50 via-slate-50 to-cyan-50/50 rounded-3xl border border-sky-100 p-8 sm:p-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Image & Doctor Visual */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm">
                
                {/* Doctor Photo Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
                    alt="Dr. Sarah Khan - Lead Dentist"
                    className="w-full h-full object-cover object-top filter brightness-98"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  {/* Doctor badge at bottom of photo */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xl font-bold">{CLINIC_INFO.doctorName}</div>
                    <div className="text-xs text-cyan-300 font-medium">{CLINIC_INFO.doctorRole}</div>
                  </div>
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute -bottom-4 -right-2 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">10+ Years</div>
                    <div className="text-[11px] text-slate-500 font-medium">Clinical Practice</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Doctor Bio & Credentials */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Meet Your Lead Clinician</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {CLINIC_INFO.doctorName}
                </h2>
                
                <p className="text-base font-semibold text-sky-700">
                  {CLINIC_INFO.doctorRole}
                </p>
              </div>

              {/* Patient-first Philosophy */}
              <blockquote className="p-4 rounded-2xl bg-white/80 border-l-4 border-sky-600 text-sm sm:text-base text-slate-700 italic leading-relaxed">
                “Every patient deserves to be heard without judgment. My goal is to make every visit completely anxiety-free, combining cutting-edge dental technology with honest, compassionate treatment advice.”
              </blockquote>

              {/* Credentials & Expertise */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-sky-600" />
                    <span>Areas of Clinical Focus</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Cosmetic Smile Design & Veneers</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Precision Guided Dental Implants</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Invisalign Clear Aligner Therapy</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-600" />
                    <span>Professional Credentials</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>Doctor of Dental Surgery (DDS)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>Active Member, American Dental Association</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>Continuing Fellowship in Aesthetic Dentistry</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handleMeet}
                  id="doctor-meet-cta-btn"
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-rose-200" />
                  <span>MEET OUR TEAM & BOOK WITH DR. KHAN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
