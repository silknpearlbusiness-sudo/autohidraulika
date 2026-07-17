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

export function onConsentChange(cb: (value: ConsentValue) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<ConsentValue>).detail ?? getConsent());
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}

const MINICRM_SRC = "https://r3.minicrm.hu/api/loader.js?70313-10nuqr2j9y1p9ebcfm181w3gk3as7d";

export function loadMiniCRM() {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[src="${MINICRM_SRC}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = MINICRM_SRC;
  document.body.appendChild(script);
}
