import React from 'react';
import { X, Shield, FileText, AlertTriangle } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'disclaimer' | null;

interface LegalModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#121216] rounded-3xl shadow-2xl border border-[#D4AF37]/35 p-6 sm:p-8 max-h-[85vh] overflow-y-auto text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#181822] text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {activeModal === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-[#D4AF37]">
              <Shield className="w-6 h-6 text-[#D4AF37]" />
              <h3 className="text-xl font-bold text-white font-['Outfit']">Privacy Policy</h3>
            </div>
            <p className="text-xs text-[#9CA3AF]">Last updated: September 2026</p>
            <div className="text-xs sm:text-sm text-[#D1D5DB] space-y-3 leading-relaxed">
              <p>
                At SmileCraft Dental Clinic, patient confidentiality and data security are fundamental tenets of our medical practice. We collect personal contact information (such as your name, email, and phone number) solely for appointment scheduling, consultation follow-ups, and dental care communications.
              </p>
              <p>
                <strong className="text-white">Information Usage:</strong> Your personal health and contact data will never be sold, leased, or distributed to non-affiliated third-party marketers. We maintain strict physical, electronic, and procedural safeguards conforming to modern healthcare confidentiality guidelines.
              </p>
              <p>
                <strong className="text-white">Digital Communications:</strong> By submitting your inquiry, you consent to receive SMS reminders and phone calls strictly concerning your requested consultations and clinic visits. You may opt out at any time by contacting our desk.
              </p>
            </div>
          </div>
        )}

        {activeModal === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-[#D4AF37]">
              <FileText className="w-6 h-6 text-[#D4AF37]" />
              <h3 className="text-xl font-bold text-white font-['Outfit']">Terms & Conditions</h3>
            </div>
            <p className="text-xs text-[#9CA3AF]">Last updated: September 2026</p>
            <div className="text-xs sm:text-sm text-[#D1D5DB] space-y-3 leading-relaxed">
              <p>
                Welcome to the SmileCraft Dental Clinic digital appointment portal. By accessing this website and scheduling consultations, you agree to comply with our patient service terms.
              </p>
              <p>
                <strong className="text-white">Consultation Reservations:</strong> Complimentary consultations include visual examination and treatment discussion. Any subsequent clinical procedures, restorative treatments, or laboratory work will be performed only following your explicit informed consent and itemized estimate approval.
              </p>
              <p>
                <strong className="text-white">Cancellation Policy:</strong> We value your time and allocate dedicated operatory space for you. If you need to reschedule, please notify us at least 24 hours in advance so we can assist other patients in need.
              </p>
            </div>
          </div>
        )}

        {activeModal === 'disclaimer' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-[#D4AF37]">
              <AlertTriangle className="w-6 h-6 text-[#D4AF37]" />
              <h3 className="text-xl font-bold text-white font-['Outfit']">Medical & Results Disclaimer</h3>
            </div>
            <p className="text-xs text-[#9CA3AF]">Official Clinical Statement</p>
            <div className="text-xs sm:text-sm text-[#D1D5DB] space-y-3 leading-relaxed">
              <p>
                The information provided on this website is for educational and appointment reservation purposes only. It is not intended to be a substitute for professional dental diagnosis or clinical evaluation.
              </p>
              <p>
                <strong className="text-white">Individual Outcomes:</strong> Results vary by patient and treatment suitability. Photographs and testimonials depict real patient experiences; however, biological anatomy, bone volume, gingival health, and compliance determine individual clinical outcomes.
              </p>
              <p>
                No medical guarantees are made regarding exact cosmetic results or shade retention without in-person clinical assessment by a licensed dental professional.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl theme-btn-primary text-black text-xs font-black transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
