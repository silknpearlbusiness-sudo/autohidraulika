export type ConsentValue = "accepted" | "declined" | null;

const STORAGE_KEY = "cookie_consent";
const EVENT_NAME = "cookie-consent-change";

export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

export function setConsent(value: "accepted" | "declined") {
  localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: value }));
}

// GDPR: withdrawing consent must be as easy as giving it. Clearing the stored
// choice and reloading is the only way to actually unload already-running
// third-party scripts (MiniCRM); the banner reappears on the fresh page load.
export function resetConsent() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

export function onConsentChange(cb: (value: ConsentValue) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<ConsentValue>).detail ?? getConsent());
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
