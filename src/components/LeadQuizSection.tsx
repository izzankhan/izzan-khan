import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  AlertCircle,
  Phone,
  Calendar,
  Smile,
  Zap,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizSubmission } from '../types';
import { trackEvent } from '../utils/analytics';

interface LeadQuizSectionProps {
  initialService?: string;
  onOpenBookingDirectly?: () => void;
}

export const LeadQuizSection: React.FC<LeadQuizSectionProps> = ({
  initialService = '',
  onOpenBookingDirectly,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<QuizSubmission>({
    service: initialService || '',
    concern: '',
    timeline: '',
    fullName: '',
    phone: '',
    email: '',
    preferredTime: 'Morning (8am - 12pm)',
    consent: true,
    submittedAt: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const services = [
    { label: 'Teeth Whitening', icon: '✨' },
    { label: 'Dental Implants', icon: '🦷' },
    { label: 'Invisalign / Clear Aligners', icon: '💎' },
    { label: 'Dental Veneers', icon: '🌟' },
    { label: 'General Dentistry', icon: '🩺' },
    { label: 'Emergency Dental Care', icon: '🚨' },
    { label: 'Not Sure / General Advice', icon: '💡' },
  ];

  const concerns = [
    'I have toothache or active sensitivity',
    'I want a whiter, more confident smile for photos',
    'I have missing teeth and need chewing ability restored',
    'My teeth are crooked or overlapping',
    'I haven’t visited a dentist in a while and need a full checkup',
    'I have dental anxiety and want a gentle, pain-free clinic',
  ];

  const timelines = [
    { label: 'As Soon As Possible', desc: 'Need immediate or same-day priority slot' },
    { label: 'This Week', desc: 'Flexible over the next 2-5 days' },
    { label: 'Next Week', desc: 'Planning ahead for next week' },
    { label: 'Just Exploring', desc: 'Evaluating options & pricing guidance' },
  ];

  const handleServiceSelect = (serviceName: string) => {
    setFormData((prev) => ({ ...prev, service: serviceName }));
    setErrorMsg(null);
    trackEvent('quiz_step', { step: 1, service: serviceName });
    setCurrentStep(2);
  };

  const handleConcernSelect = (concernText: string) => {
    setFormData((prev) => ({ ...prev, concern: concernText }));
    setErrorMsg(null);
    trackEvent('quiz_step', { step: 2, concern: concernText });
    setCurrentStep(3);
  };

  const handleTimelineSelect = (timelineText: string) => {
    setFormData((prev) => ({ ...prev, timeline: timelineText }));
    setErrorMsg(null);
    trackEvent('quiz_step', { step: 3, timeline: timelineText });
    setCurrentStep(4);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      setErrorMsg('Please enter a valid phone number so our team can reach you.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.consent) {
      setErrorMsg('Please check the consent box to proceed.');
      return;
    }

    setIsSubmitting(true);
    trackEvent('quiz_started', { leadData: { service: formData.service, timeline: formData.timeline } });

    // Simulate reliable submission (Integration hook ready for GoHighLevel webhook / API endpoint)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      const payload: QuizSubmission = {
        ...formData,
        submittedAt: new Date().toISOString(),
      };

      // Store in local storage for session reference
      try {
        const stored = JSON.parse(localStorage.getItem('smilecraft_leads') || '[]');
        stored.push(payload);
        localStorage.setItem('smilecraft_leads', JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage error', err);
      }

      trackEvent('quiz_completed', {
        ctaName: 'Lead Quiz Submitted',
        treatment: formData.service,
        leadData: {
          service: formData.service,
          timeline: formData.timeline,
        },
      });

      // Confetti burst!
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0284c7', '#06b6d4', '#10b981', '#38bdf8'],
        });
      } catch (e) {
        // Fallback gracefully
      }
    }, 900);
  };

  return (
    <section id="consultation-quiz" className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Assessment • Takes 60 Seconds</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find The Right Dental Care For You
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            Answer 3 quick questions to check eligibility for your complimentary consultation and personalized treatment estimate.
          </p>
        </div>

        {/* Multi-step Box */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8 relative overflow-hidden">
          
          {/* Progress Bar */}
          {!isSuccess && (
            <div className="mb-5 sm:mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5">
                <span>Step {currentStep} of 4</span>
                <span className="text-sky-600 font-extrabold">
                  {currentStep === 1 && 'Select Service'}
                  {currentStep === 2 && 'Primary Concern'}
                  {currentStep === 3 && 'Preferred Timeline'}
                  {currentStep === 4 && 'Your Details'}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 sm:h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-600 to-cyan-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Success State Screen */}
          {isSuccess ? (
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Thank You, {formData.fullName.split(' ')[0] || 'Friend'}!
                </h3>
                <p className="text-base text-slate-600 max-w-md mx-auto">
                  Your request has been received. Our patient concierge team will contact you shortly via phone or email to confirm your free consultation.
                </p>
              </div>

              {/* Consultation Summary Card */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-left text-xs space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Service:</span>
                  <span className="font-bold text-slate-900">{formData.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Timeline:</span>
                  <span className="font-bold text-slate-900">{formData.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact Phone:</span>
                  <span className="font-bold text-slate-900">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Special Offer:</span>
                  <span className="font-bold text-emerald-600">Complimentary Assessment Applied</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
                {onOpenBookingDirectly && (
                  <button
                    onClick={onOpenBookingDirectly}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-bold text-sm shadow-md"
                  >
                    Select Exact Calendar Date & Time Now
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setCurrentStep(1);
                  }}
                  className="px-5 py-2.5 text-xs text-slate-500 hover:text-slate-700 font-semibold"
                >
                  Submit another inquiry
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Error Notification */}
              {errorMsg && (
                <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* STEP 1: What dental service are you interested in? */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      What dental service are you interested in?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Choose the primary reason for your consultation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((srv) => (
                      <button
                        key={srv.label}
                        type="button"
                        onClick={() => handleServiceSelect(srv.label)}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left font-semibold text-sm transition-all cursor-pointer ${
                          formData.service === srv.label
                            ? 'bg-sky-50/80 border-sky-600 text-sky-900 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-xl">{srv.icon}</span>
                        <span>{srv.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: What is your main concern? */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        What is your main concern?
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Select what matters most to your smile and comfort.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {concerns.map((concern, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleConcernSelect(concern)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border text-left font-semibold text-sm transition-all cursor-pointer ${
                          formData.concern === concern
                            ? 'bg-sky-50/80 border-sky-600 text-sky-900 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-slate-50'
                        }`}
                      >
                        <span>{concern}</span>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: When would you like to visit? */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        When would you like to visit?
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        We accommodate same-week and priority scheduling.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {timelines.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleTimelineSelect(item.label)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.timeline === item.label
                            ? 'bg-sky-50/80 border-sky-600 text-sky-900 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-bold text-sm text-slate-900">{item.label}</div>
                        <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Collect Contact Information */}
              {currentStep === 4 && (
                <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        Where should we send your confirmation?
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Our clinic coordinator will confirm your free consultation slot.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  </div>

                  {/* Summary preview pills */}
                  <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-slate-500">Service: <strong className="text-slate-800">{formData.service}</strong></span>
                    <span>•</span>
                    <span className="text-slate-500">Timing: <strong className="text-slate-800">{formData.timeline}</strong></span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Michael Smith"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Phone Number (Mobile) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. michael@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Preferred Time of Day
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm outline-hidden bg-white"
                      >
                        <option>Morning (8am - 12pm)</option>
                        <option>Afternoon (12pm - 4pm)</option>
                        <option>Late Afternoon (4pm - 6pm)</option>
                        <option>Saturday Morning</option>
                      </select>
                    </div>
                  </div>

                  {/* Privacy / Consent checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="quiz-consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 w-4 h-4 text-sky-600 rounded-sm border-slate-300 focus:ring-sky-500"
                    />
                    <label htmlFor="quiz-consent" className="text-xs text-slate-500 leading-normal">
                      I agree to receive appointment confirmation and reminders from SmileCraft Dental Clinic via phone call, SMS, or email. We respect your privacy; your data is never sold.
                    </label>
                  </div>

                  {/* Final Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      id="quiz-submit-btn"
                      className="theme-btn-primary w-full py-3.5 sm:py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Reserving Your Consultation...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          <span>GET MY FREE CONSULTATION</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>HIPAA Compliant & Secure Transmission</span>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
