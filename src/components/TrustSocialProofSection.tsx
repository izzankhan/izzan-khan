import React, { useEffect, useState, useRef } from 'react';
import { Star, Users, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { CLINIC_INFO } from '../data/funnelData';

export const TrustSocialProofSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animated Counter hook
  const useAnimatedCounter = (end: number, duration: number = 1800) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;
      let startTime: number | null = null;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOut * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, end, duration]);

    return count;
  };

  const happyPatients = useAnimatedCounter(2500);
  const yearsExp = useAnimatedCounter(10);
  const treatmentsDone = useAnimatedCounter(12000);

  return (
    <section
      id="trust-metrics"
      ref={sectionRef}
      className="relative -mt-6 sm:-mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-[#121216] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#D4AF37]/35 p-5 sm:p-7 lg:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#D4AF37]/20">
          
          {/* Metric 1: 4.9/5 Patient Rating */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4 pt-3 sm:pt-0">
            <div className="flex items-center gap-1 text-[#D4AF37] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
                {CLINIC_INFO.stats.rating}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#9CA3AF]">Rating</span>
            </div>
            <p className="text-[11px] sm:text-xs font-medium text-[#9CA3AF] mt-1">
              <span className="font-bold text-white">Google Reviews</span> • 348+ Verified
            </p>
          </div>

          {/* Metric 2: 2,500+ Happy Patients */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4 pt-3 sm:pt-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#181822] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center mb-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
                {happyPatients.toLocaleString()}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#D4AF37]">+</span>
            </div>
            <p className="text-[11px] sm:text-xs font-medium text-[#9CA3AF] mt-1">
              Happy, Confident Patients
            </p>
          </div>

          {/* Metric 3: 10+ Years Experience */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4 pt-3 sm:pt-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#181822] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center mb-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
                {yearsExp}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#D4AF37]">+</span>
              <span className="text-xs sm:text-sm font-semibold text-[#9CA3AF] ml-1">Years</span>
            </div>
            <p className="text-[11px] sm:text-xs font-medium text-[#9CA3AF] mt-1">
              Clinical Dental Experience
            </p>
          </div>

          {/* Metric 4: Modern Dental Technology / 12,000+ Treatments */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4 pt-3 sm:pt-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#181822] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center mb-2">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
                {treatmentsDone.toLocaleString()}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#D4AF37]">+</span>
            </div>
            <p className="text-[11px] sm:text-xs font-medium text-[#9CA3AF] mt-1">
              Modern Dental Treatments
            </p>
          </div>

        </div>

        {/* Google Reviews Style Live Strip */}
        <div className="mt-5 pt-4 border-t border-[#D4AF37]/15 flex flex-wrap items-center justify-between gap-3 text-xs text-[#9CA3AF]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#181822] border border-[#D4AF37]/30 flex items-center justify-center shadow-xs">
              <span className="font-bold text-[#D4AF37] text-xs">G</span>
            </div>
            <span className="font-bold text-white text-[11px] sm:text-xs">Verified Patient Trust Guarantee:</span>
            <span className="hidden sm:inline text-[#9CA3AF] text-[11px]">Zero pressure, upfront transparent estimates & gentle patient-first care.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs font-semibold text-[#D4AF37]">
            <span className="flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-[#D4AF37]" />
              100% Confidential
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              Sterilization Grade A+
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
