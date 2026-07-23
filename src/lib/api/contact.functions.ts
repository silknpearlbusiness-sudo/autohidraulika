import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";

import { sendLeadNotification, sendConfirmationEmail } from "../contact.server";
import { isDisposableEmail, isPlausiblePhone } from "../contact-validation.server";
import { appendLead } from "../leads.server";
import { checkRateLimit } from "../rate-limit.server";
import { isTurnstileConfigured, verifyTurnstileToken } from "../turnstile.server";

const CONTACT_MAX_PER_HOUR = 5;
const CONTACT_WINDOW_MS = 60 * 60 * 1000;

const schema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  partType: z.string().optional(),
  description: z.string().optional(),
  website: z.string().optional(), // honeypot — must stay empty
  turnstileToken: z.string().optional().default(""),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator(schema)
  .handler(async ({ data }) => {
    // Honeypot: bots that skip the browser and POST straight to this
    // endpoint often fill every field they find, including hidden ones.
    // Pretend success so they don't learn to avoid the field.
    if (data.website) {
      return { ok: true };
    }

    if (!isPlausiblePhone(data.phone)) {
      return { ok: false as const, error: "Kérjük, adjon meg egy érvényes telefonszámot." };
    }
    if (data.email && isDisposableEmail(data.email)) {
      return {
        ok: false as const,
        error: "Kérjük, adjon meg egy valós e-mail címet, vagy hagyja üresen a mezőt.",
      };
    }

    // Per-IP so a script hammering this endpoint can't flood the inbox or
    // fill Redis with junk leads; a real visitor never needs more than a
    // couple of submissions per hour.
    const ip = getRequestIP({ xForwardedFor: true }) || "unknown";
    if (!checkRateLimit(`contact:${ip}`, CONTACT_MAX_PER_HOUR, CONTACT_WINDOW_MS)) {
      return {
        ok: false as const,
        error: "Túl sok próbálkozás történt. Kérjük, próbálja újra később, vagy hívjon minket közvetlenül.",
      };
    }

    // Real bot-blocking layer — the honeypot only catches unsophisticated
    // scripts. No-ops if TURNSTILE_SECRET_KEY isn't configured yet.
    if (isTurnstileConfigured() && !(await verifyTurnstileToken(data.turnstileToken, ip))) {
      return {
        ok: false as const,
        error: "A robot-ellenőrzés sikertelen volt. Kérjük, próbálja újra.",
      };
    }

    const payload = {
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      partType: data.partType || undefined,
      description: data.description || undefined,
    };

    // Fire all in parallel. The lead notification to the business inbox is
    // what actually matters — if it fails, report failure so the visitor is
    // told to call instead. The confirmation email and admin-panel persistence
    // are best-effort.
    const [lead, email, stored] = await Promise.allSettled([
      sendLeadNotification(payload),
      sendConfirmationEmail(payload),
      appendLead(payload),
    ]);

    if (email.status === "rejected") {
      console.error("[submitContact] confirmation email failed:", email.reason);
    }
    if (stored.status === "rejected") {
      console.error("[submitContact] lead persistence failed:", stored.reason);
    }
    if (lead.status === "rejected") {
      console.error("[submitContact] lead notification failed:", lead.reason);
      return {
        ok: false as const,
        error: "Az üzenet küldése sajnos nem sikerült. Kérjük, hívjon minket közvetlenül.",
      };
    }

    return { ok: true };
  });
