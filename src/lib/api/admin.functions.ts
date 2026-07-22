import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { checkLogin, requireAdmin } from "../admin-auth.server";
import { deleteLead, listLeads } from "../leads.server";

// Single shared rate-limit bucket — this is a one-admin panel, so a global
// bucket is simpler than per-IP tracking and just as effective here.
const LOGIN_RATE_LIMIT_KEY = "admin-login";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    const result = checkLogin(data.password, LOGIN_RATE_LIMIT_KEY);
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
