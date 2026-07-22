// Google Ads conversion tracking — inert until VITE_GOOGLE_ADS_CONVERSION_ID
// is set (in .env.local for dev, or the Vercel project's env vars for prod).
//
// Set it to the full "send_to" value Google Ads gives you for the conversion
// action, e.g. "AW-123456789/AbC-D_efgHIJ12-34". Nothing else needs to
// change — the cookie banner/policy text and the tag loader both key off
// this one value.

const CONVERSION_ID = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID as string | undefined;

export function isGoogleAdsConfigured(): boolean {
  return !!CONVERSION_ID;
}

function baseTagId(): string | undefined {
  return CONVERSION_ID?.split("/")[0];
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let tagLoaded = false;

// Only call this once consent has actually been given — this module doesn't
// check consent itself, callers (the root layout) own that decision.
export function loadGoogleAdsTag() {
  if (tagLoaded || !CONVERSION_ID || typeof document === "undefined") return;
  tagLoaded = true;

  const id = baseTagId();
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);
}

// Safe to call unconditionally — no-ops if not configured or the tag never
// loaded (e.g. the visitor hadn't accepted cookies yet).
export function fireGoogleAdsConversion() {
  if (!CONVERSION_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: CONVERSION_ID });
}
