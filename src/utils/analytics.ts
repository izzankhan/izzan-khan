/**
 * Analytics and Conversion Tracking Module
 * Ready for Meta Pixel (fbq), Google Analytics 4 (gtag), Google Ads, and GTM dataLayer.
 * Includes console debugging for testing funnel traffic during development.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}

export type TrackingEventType =
  | 'page_view'
  | 'cta_click'
  | 'call_click'
  | 'whatsapp_click'
  | 'quiz_started'
  | 'quiz_step'
  | 'quiz_completed'
  | 'booking_started'
  | 'booking_date_selected'
  | 'booking_completed'
  | 'exit_intent_claimed'
  | 'special_offer_claimed';

export interface TrackingPayload {
  ctaName?: string;
  section?: string;
  treatment?: string;
  step?: number | string;
  leadData?: {
    service?: string;
    timeline?: string;
  };
  value?: number;
  [key: string]: any;
}

export function trackEvent(eventName: TrackingEventType, payload: TrackingPayload = {}) {
  const timestamp = new Date().toISOString();
  
  // 1. Console Log for development & verification
  console.log(`[SmileCraft Analytics] 🎯 Event: ${eventName}`, {
    ...payload,
    timestamp,
  });

  // 2. Google Tag Manager / GA4 DataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...payload,
      timestamp,
    });
  }

  // 3. Google Analytics 4 gtag helper
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }

  // 4. Meta Pixel (Facebook & Instagram Ads)
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    switch (eventName) {
      case 'quiz_completed':
      case 'booking_completed':
        window.fbq('track', 'Lead', {
          content_name: payload.treatment || payload.ctaName || 'Dental Consultation',
          status: 'qualified',
        });
        break;
      case 'call_click':
      case 'whatsapp_click':
        window.fbq('track', 'Contact', {
          channel: eventName === 'call_click' ? 'Phone' : 'WhatsApp',
        });
        break;
      case 'cta_click':
        window.fbq('trackCustom', 'CtaClick', payload);
        break;
      default:
        window.fbq('trackCustom', eventName, payload);
        break;
    }
  }
}
