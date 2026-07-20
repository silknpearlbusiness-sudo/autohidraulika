import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { pushToMiniCrm, sendConfirmationEmail } from "../contact.server";

const schema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  partType: z.string().optional(),
  description: z.string().optional(),
  website: z.string().optional(), // honeypot — must stay empty
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

    const payload = {
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      partType: data.partType || undefined,
      description: data.description || undefined,
    };

    // Fire both in parallel. The CRM push is the lead capture — if it fails,
    // report failure so the visitor is told to call instead. The confirmation
    // email is best-effort.
    const [crm, email] = await Promise.allSettled([
      pushToMiniCrm(payload),
      sendConfirmationEmail(payload),
    ]);

    if (email.status === "rejected") {
      console.error("[submitContact] confirmation email failed:", email.reason);
    }
    if (crm.status === "rejected") {
      console.error("[submitContact] CRM push failed:", crm.reason);
      return { ok: false };
    }

    return { ok: true };
  });
