// Cloudflare Turnstile widget loader — inert until VITE_TURNSTILE_SITE_KEY is
// set. Pairs with TURNSTILE_SECRET_KEY on the server (src/lib/turnstile.server.ts).

export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

export function isTurnstileEnabled(): boolean {
  return !!TURNSTILE_SITE_KEY;
}

let scriptLoaded = false;

// Safe to call unconditionally / repeatedly — no-ops if not configured or
// already loaded. Uses Turnstile's implicit render mode: it scans the DOM
// for `.cf-turnstile` elements once the script loads (and watches for ones
// added later), so the widget div can already be mounted when this runs.
export function loadTurnstileScript() {
  if (scriptLoaded || !TURNSTILE_SITE_KEY || typeof document === "undefined") return;
  scriptLoaded = true;

  const script = document.createElement("script");
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}
