export interface TreatmentItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  benefits: string[];
  duration: string;
  suitableFor: string;
  image: string;
  popular?: boolean;
}

export interface PainPointItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  solution: string;
  recommendedTreatment: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatarUrl?: string;
}

export interface BeforeAfterCase {
  id: string;
  category: 'whitening' | 'veneers' | 'aligners' | 'makeover';
  title: string;
  timeframe: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  treatmentType: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'treatments' | 'pricing' | 'general';
}

export interface QuizSubmission {
  service: string;
  concern: string;
  timeline: string;
  fullName: string;
  phone: string;
  email: string;
  preferredTime: string;
  consent: boolean;
  submittedAt: string;
}

export interface BookingSubmission {
  appointmentType: string;
  date: string;
  timeSlot: string;
  fullName: string;
  phone: string;
  email: string;
  notes?: string;
  submittedAt: string;
}
