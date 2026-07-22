import crypto from "node:crypto";
import process from "node:process";

const TOKEN_TTL = 8 * 60 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

const authAttempts = new Map<string, { count: number; resetAt: number }>();

// No secret configured -> admin auth is disabled entirely (fail closed).
// Never fall back to a hardcoded value: that would let anyone forge tokens.
function jwtSecret(): string | null {
  return process.env.JWT_SECRET || process.env.ADMIN_PASSWORD || null;
}

export function signJwt(payload: Record<string, unknown>): string | null {
  const secret = jwtSecret();
  if (!secret) return null;
  const h = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const b = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(h + "." + b).digest("base64url");
  return h + "." + b + "." + sig;
}

export function verifyJwt(token: string): Record<string, unknown> | null {
  const secret = jwtSecret();
  if (!secret || !token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [h, b, sig] = parts;
    const expected = crypto.createHmac("sha256", secret).update(h + "." + b).digest("base64url");
    const sigBuf = Buffer.from(sig);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null;
    const payload = JSON.parse(Buffer.from(b, "base64url").toString());
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

// Keeps the in-memory attempt map bounded across the life of a serverless instance.
function bumpAttempts(key: string): { count: number; resetAt: number } {
  if (authAttempts.size > 5000) authAttempts.clear();
  const now = Date.now();
  let rec = authAttempts.get(key);
  if (!rec || now > rec.resetAt) {
    rec = { count: 0, resetAt: now + WINDOW_MS };
    authAttempts.set(key, rec);
  }
  return rec;
}

export function checkLogin(password: string, rateLimitKey: string): { ok: true; token: string } | { ok: false; error: string } {
  const ADMIN_PW = process.env.ADMIN_PASSWORD;
  if (!ADMIN_PW) return { ok: false, error: "Admin not configured." };

  const rec = bumpAttempts(rateLimitKey);
  if (rec.count >= MAX_ATTEMPTS) return { ok: false, error: "Too many attempts, try again later." };
  rec.count++;

  const a = Buffer.from(password || "");
  const b = Buffer.from(ADMIN_PW);
  const match = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!match) return { ok: false, error: "Invalid password." };

  authAttempts.delete(rateLimitKey);
  const now = Date.now();
  const token = signJwt({ admin: true, iat: now, exp: now + TOKEN_TTL });
  if (!token) return { ok: false, error: "Admin not configured." };
  return { ok: true, token };
}

export function requireAdmin(token: string | undefined): boolean {
  return !!token && !!verifyJwt(token);
}
