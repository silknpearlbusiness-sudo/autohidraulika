import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";

import { checkLogin, requireAdmin } from "../admin-auth.server";
import { deleteLead, listLeads, updateLead } from "../leads.server";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    // Keyed per-IP so one attacker guessing wrong passwords can only lock
    // themselves out, not the real admin (a shared/global key would let
    // anyone trigger a lockout for everyone).
    const ip = getRequestIP({ xForwardedFor: true }) || "unknown";
    const result = checkLogin(data.password, `admin-login:${ip}`);
    if (!result.ok) return { ok: false as const, error: result.error };
    return { ok: true as const, token: result.token };
  });

export const listLeadsFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    if (!requireAdmin(data.token)) throw new Error("Unauthorized");
    return await listLeads();
  });

export const deleteLeadFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string(), id: z.string() }))
  .handler(async ({ data }) => {
    if (!requireAdmin(data.token)) throw new Error("Unauthorized");
    await deleteLead(data.id);
    return { ok: true };
  });

export const updateLeadFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string(),
      id: z.string(),
      notes: z.string().optional(),
      status: z.enum(["new", "in_progress", "done"]).optional(),
    }),
  )
  .handler(async ({ data }) => {
    if (!requireAdmin(data.token)) throw new Error("Unauthorized");
    await updateLead(data.id, { notes: data.notes, status: data.status });
    return { ok: true };
  });
