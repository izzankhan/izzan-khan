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
        // easeOutQuart
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
      className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/90 p-6 sm:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          
          {/* Metric 1: 4.9/5 Patient Rating + Google style indicator */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4 pt-4 sm:pt-0">
            <div className="flex items-center gap-1.5 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {CLINIC_INFO.stats.rating}
              </span>
              <span className="text-sm font-semibold text-slate-500">Rating</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1 flex items-center gap-1">
              <span className="font-bold text-sky-700">Google Reviews</span> • 348+ Verified
            </p>
          </div>

          {/* Metric 2: 2,500+ Happy Patients */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4 pt-4 sm:pt-0">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-2">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {happyPatients.toLocaleString()}
              </span>
              <span className="text-2xl font-bold text-sky-600">+</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
              Happy, Confident Patients
            </p>
          </div>

          {/* Metric 3: 10+ Years Experience */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4 pt-4 sm:pt-0">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-2">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {yearsExp}
              </span>
              <span className="text-2xl font-bold text-cyan-600">+</span>
              <span className="text-base font-semibold text-slate-600 ml-1">Years</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
              Clinical Dental Experience
            </p>
          </div>

          {/* Metric 4: Modern Dental Technology / 12,000+ Treatments */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4 pt-4 sm:pt-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {treatmentsDone.toLocaleString()}
              </span>
              <span className="text-2xl font-bold text-emerald-600">+</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
              Modern Dental Treatments
            </p>
          </div>

        </div>

        {/* Google Reviews Style Live Strip */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-xs">
              <span className="font-bold text-[#4285F4]">G</span>
            </div>
            <span className="font-semibold text-slate-800">Verified Patient Trust Guarantee:</span>
            <span className="hidden sm:inline text-slate-500">Zero pressure, transparent estimates & gentle patient-first care.</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-sky-700">
            <span className="flex items-center gap-1">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              100% Confidential
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              Sterilization Grade A+
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
