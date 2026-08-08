/* ============================================================
   analytics.ts  --  Wadi Al Awir Car Accessories (Next.js)
   Google Analytics 4 measurement id + client-side event helper
   ============================================================ */

export const GA_MEASUREMENT_ID = 'G-P2VSYNSK2W';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/* ----------------------------------------------------------
   trackEvent
   Sends a GA4 event. No-ops safely when gtag has not loaded
   (ad blockers, offline, server render).
   ---------------------------------------------------------- */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

/* ----------------------------------------------------------
   trackWhatsAppClick
   The site's primary conversion — every order goes through
   WhatsApp, so this is the event that matters most.
   ---------------------------------------------------------- */
export function trackWhatsAppClick(label: string): void {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: label,
    transport_type: 'beacon',
  });
}
