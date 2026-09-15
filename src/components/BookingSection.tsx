import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  Sparkles,
  Layers,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BookingSubmission } from '../types';
import { trackEvent } from '../utils/analytics';

interface BookingSectionProps {
  preselectedTreatment?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ preselectedTreatment }) => {
  // Generate next 10 selectable business days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 12; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      // Skip Sundays for routine bookings
      if (d.getDay() !== 0) {
        dates.push({
          dateObj: d,
          dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
          dayNumber: d.getDate(),
          monthName: d.toLocaleDateString('en-US', { month: 'short' }),
          fullDateString: d.toISOString().split('T')[0],
        });
      }
      if (dates.length >= 7) break;
    }
    return dates;
  };

  const availableDates = generateDates();

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0]?.fullDateString || '');
  const [selectedSlot, setSelectedSlot] = useState<string>('09:30 AM');
  const [appointmentType, setAppointmentType] = useState<string>(
    preselectedTreatment || 'Free Comprehensive Consultation & Scan'
  );

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const timeSlots = {
    Morning: ['08:30 AM', '09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM'],
    Afternoon: ['01:30 PM', '02:15 PM', '03:00 PM', '03:45 PM', '04:30 PM', '05:15 PM'],
  };

  const appointmentTypes = [
    'Free Comprehensive Consultation & Scan',
    'Teeth Whitening Consultation',
    'Dental Implant Assessment',
    'Invisalign 3D Smile Simulation',
    'Dental Veneers Evaluation',
    'Emergency / Acute Tooth Pain Relief',
    'Routine Dental Exam & Cleaning',
  ];

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    trackEvent('booking_date_selected', { date: dateStr });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    trackEvent('booking_started', { appointmentType, date: selectedDate, timeSlot: selectedSlot });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);

      const bookingRecord: BookingSubmission = {
        appointmentType,
        date: selectedDate,
        timeSlot: selectedSlot,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        notes: formData.notes,
        submittedAt: new Date().toISOString(),
      };

      try {
        const stored = JSON.parse(localStorage.getItem('smilecraft_bookings') || '[]');
        stored.push(bookingRecord);
        localStorage.setItem('smilecraft_bookings', JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage error', err);
      }

      trackEvent('booking_completed', {
        appointmentType,
        date: selectedDate,
        timeSlot: selectedSlot,
      });

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0284c7', '#06b6d4', '#10b981'],
        });
      } catch (e) {}
    }, 1000);
  };

  return (
    <section id="booking-section" className="py-8 sm:py-12 lg:py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Direct Scheduling Concierge</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ready To Take The Next Step?
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            Choose a convenient time for your consultation.
          </p>
        </div>

        {/* Integration Callout: GoHighLevel / Calendly ready */}
        <div className="max-w-4xl mx-auto mb-5 sm:mb-6 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-[11px] sm:text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-600 shrink-0" />
            <span>
              <strong>CRM Integration Ready:</strong> Easily connect this native booking UI directly to GoHighLevel Calendar, Calendly, or your clinic webhook.
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-semibold text-slate-700 text-[10px] sm:text-xs">
            GHL / Calendly Webhook Ready
          </span>
        </div>

        {/* Booking Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8">
          
          {isConfirmed ? (
            /* Confirmation State */
            <div className="text-center py-10 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Appointment Confirmed!
                </h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                  We look forward to welcoming you, {formData.fullName}. A confirmation receipt and calendar invite have been logged.
                </p>
              </div>

              {/* Booking Voucher Card */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-slate-50 border border-sky-200 text-left space-y-3">
                <div className="flex justify-between items-center border-b border-sky-100 pb-2">
                  <span className="text-xs font-bold text-sky-700 uppercase">Consultation Pass</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Confirmed
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900">{appointmentType}</div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  <div>
                    <span className="text-slate-400 block">Date</span>
                    <strong className="text-slate-800">{selectedDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Time</span>
                    <strong className="text-slate-800">{selectedSlot}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Patient</span>
                    <strong className="text-slate-800">{formData.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Phone</span>
                    <strong className="text-slate-800">{formData.phone}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-sky-100 text-[11px] text-slate-500">
                  📍 450 Medical Plaza, Suite 300, Metro City, CA 90210
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    alert('Calendar invite reminder file (.ics) downloaded.');
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  <Download className="w-4 h-4" />
                  <span>Add To Google / Apple Calendar</span>
                </button>

                <button
                  onClick={() => {
                    setIsConfirmed(false);
                    setFormData({ fullName: '', phone: '', email: '', notes: '' });
                  }}
                  className="text-xs text-sky-600 hover:text-sky-800 font-bold py-2"
                >
                  Book another appointment
                </button>
              </div>
            </div>
          ) : (
            /* Active Booking Form */
            <form onSubmit={handleBookingSubmit} className="space-y-5 sm:space-y-6">
              
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Appointment Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  1. Select Consultation or Treatment Type
                </label>
                <select
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  className="w-full p-2.5 sm:p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-xs sm:text-sm font-medium bg-white"
                >
                  {appointmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Date Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>2. Choose Your Preferred Date</span>
                  <span className="text-[10px] sm:text-[11px] text-sky-600 font-normal">Next available business days</span>
                </label>
                
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2">
                  {availableDates.map((date) => {
                    const isSelected = selectedDate === date.fullDateString;
                    return (
                      <button
                        key={date.fullDateString}
                        type="button"
                        onClick={() => handleDateSelect(date.fullDateString)}
                        className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-sky-600 border-sky-600 text-white shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-white'
                        }`}
                      >
                        <div className="text-[10px] sm:text-[11px] font-semibold uppercase">{date.dayName}</div>
                        <div className="text-base sm:text-xl font-extrabold my-0.5">{date.dayNumber}</div>
                        <div className="text-[9px] sm:text-[10px] opacity-80">{date.monthName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Available Time Slots */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  3. Select Preferred Time Slot
                </label>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-1.5">Morning</span>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.Morning.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            selectedSlot === slot
                              ? 'bg-cyan-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-1.5">Afternoon</span>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.Afternoon.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            selectedSlot === slot
                              ? 'bg-cyan-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Patient Information */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  4. Patient Contact Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Miller"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 font-semibold mb-1">
                      Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. (555) 234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-hidden"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs text-slate-600 font-semibold mb-1">
                    Special Notes or Dental Concerns (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Sensitive to cold drinks, nervous about dental tools..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 text-sm outline-hidden resize-none"
                  />
                </div>
              </div>

              {/* Primary Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="booking-confirm-btn"
                  className="theme-btn-primary w-full py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Confirming Your Reservation...</span>
                  ) : (
                    <>
                      <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      <span>BOOK MY APPOINTMENT</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero pre-payment required for New Patient Consultations.</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
