import process from "node:process";

// Cloudflare Turnstile verification — inert until TURNSTILE_SECRET_KEY is set
// (in .env.local for dev, or the Vercel project's env vars for prod). Pairs
// with VITE_TURNSTILE_SITE_KEY, which controls whether the widget renders
// client-side (see src/lib/turnstile.ts).

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function isTurnstileConfigured(): boolean {
  return !!process.env.TURNSTILE_SECRET_KEY;
}

export async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured — don't block submissions

  if (!token) return false;

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success: boolean };
    return !!data.success;
  } catch (err) {
    // Cloudflare unreachable — don't let an outage block every real lead;
    // the honeypot + rate limit still provide a baseline defense.
    console.error("[turnstile] verification request failed:", err);
    return true;
  }
}
