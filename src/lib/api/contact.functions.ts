import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { pushToMiniCrm, sendConfirmationEmail } from "../contact.server";

const schema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  partType: z.string().optional(),
  description: z.string().optional(),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator(schema)
  .handler(async ({ data }) => {
    const payload = {
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      partType: data.partType || undefined,
      description: data.description || undefined,
    };

    // Fire both in parallel — a failure in one doesn't block the other
    const results = await Promise.allSettled([
      pushToMiniCrm(payload),
      sendConfirmationEmail(payload),
    ]);

    for (const r of results) {
      if (r.status === "rejected") {
        console.error("[submitContact] partial failure:", r.reason);
      }
    }

    return { ok: true };
  });
