export interface ConsentChoice {
  functional: boolean; // Google Térkép
  analytics: boolean;  // Google Analytics (GA4)
  marketing: boolean;  // Google Ads
}

const STORAGE_KEY = "cookie_consent";
const EVENT_NAME = "cookie-consent-change";

// Returns null if the visitor hasn't decided yet (or an old pre-category
// "accepted"/"declined" string from before this was per-category — treated
// as undecided so the banner reappears and they can pick categories fresh).
export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof parsed.functional === "boolean" &&
      typeof parsed.analytics === "boolean" &&
      typeof parsed.marketing === "boolean"
    ) {
      return parsed as ConsentChoice;
    }
  } catch {
    // not JSON — old format, fall through to null
  }
  return null;
}

export function setConsent(choice: ConsentChoice) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: choice }));
}

// GDPR: withdrawing consent must be as easy as giving it. Clearing the stored
// choice and reloading is the only way to actually unload already-running
// third-party scripts (Google Maps); the banner reappears on the fresh page load.
export function resetConsent() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

export function onConsentChange(cb: (choice: ConsentChoice) => void) {
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<ConsentChoice>).detail;
    if (detail) cb(detail);
  };
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
