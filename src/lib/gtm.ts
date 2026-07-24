// Google Tag Manager — the container script itself loads unconditionally on
// every page (see the inline <head> scripts in __root.tsx), exactly as
// Google's own install instructions specify. What stays consent-gated is
// whether the tags configured inside it (GA4, Google Ads) are allowed to
// actually set cookies or send identifiable data — that's Google Consent
// Mode's job, driven by updateConsent() below.
//
// The default consent state (denied until "Elfogadom") is set in the inline
// head script, which must run BEFORE the gtm.js script tag so GTM picks it
// up on initialization. Keep GTM_CONTAINER_ID as the single source of truth
// for that snippet and for the cookie policy disclosure.

export const GTM_CONTAINER_ID = "GTM-55PJJJPT";

// Must match STORAGE_KEY in consent.ts — duplicated here because the inline
// head script (see __root.tsx) runs before any app module is loaded and
// can't import it.
export const CONSENT_STORAGE_KEY = "cookie_consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Called when the visitor saves their cookie category choices. Maps the
// banner's Analitikai/Marketing categories onto Consent Mode's signals so
// GTM's GA4/Ads tags start (or stop) actually writing cookies — no-ops if
// gtag hasn't been defined yet for some reason.
export function updateConsent(choice: { analytics: boolean; marketing: boolean }) {
  if (typeof window === "undefined" || !window.gtag) return;
  const analyticsState = choice.analytics ? "granted" : "denied";
  const marketingState = choice.marketing ? "granted" : "denied";
  window.gtag("consent", "update", {
    analytics_storage: analyticsState,
    ad_storage: marketingState,
    ad_user_data: marketingState,
    ad_personalization: marketingState,
  });
}
