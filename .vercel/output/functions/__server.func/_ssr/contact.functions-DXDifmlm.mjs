import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-0l9P83hY.mjs";
import process from "node:process";
import { R as Resend } from "../_libs/resend.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, l as literalType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/postal-mime.mjs";
import "../_libs/standardwebhooks.mjs";
import "../_libs/stablelib__base64.mjs";
import "../_libs/fast-sha256.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
async function pushToMiniCrm(payload) {
  const systemId = process.env.MINICRM_SYSTEM_ID;
  const apiKey = process.env.MINICRM_API_KEY;
  const categoryId = process.env.MINICRM_CATEGORY_ID;
  if (!systemId || !apiKey || !categoryId) {
    console.warn("[MiniCRM] Missing env vars — skipping CRM push.");
    return;
  }
  const auth = Buffer.from(`${systemId}@${apiKey}`).toString("base64");
  const headers = {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json"
  };
  const base = "https://api.minicrm.hu/1";
  const parts = payload.name.trim().split(/\s+/);
  const lastName = parts[0] ?? payload.name;
  const firstName = parts.slice(1).join(" ") || "";
  const contactRes = await fetch(`${base}/Contact/0`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      LastName: lastName,
      FirstName: firstName,
      Phone: payload.phone,
      ...payload.email ? { Email: payload.email } : {},
      Type: "Contact"
    })
  });
  if (!contactRes.ok) {
    console.error("[MiniCRM] Contact PUT failed:", await contactRes.text());
    return;
  }
  const { Id: contactId } = await contactRes.json();
  const projectRes = await fetch(`${base}/Project/0`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      CategoryId: Number(categoryId),
      Name: `Weboldal megkeresés — ${payload.name}`,
      ContactId: contactId,
      ...payload.description ? { Description: payload.description } : {},
      ...payload.partType ? { AlkatreszTipus: payload.partType } : {}
    })
  });
  if (!projectRes.ok) {
    console.error("[MiniCRM] Project PUT failed:", await projectRes.text());
  }
}
async function sendConfirmationEmail(payload) {
  if (!payload.email) return;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL ?? "noreply@hidraulikajavitas.com";
  if (!apiKey || apiKey === "re_REPLACE_ME") {
    console.warn("[Resend] Missing API key — skipping confirmation email.");
    return;
  }
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: `Hidraulika Service TEAM Kft. <${from}>`,
    to: [payload.email],
    subject: "Köszönjük megkeresését — Hidraulika Service TEAM Kft.",
    html: confirmationHtml(payload)
  });
}
function confirmationHtml(p) {
  return `<!DOCTYPE html>
<html lang="hu">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a1f14;font-family:system-ui,sans-serif;color:#e8e0d0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:40px auto;">
    <tr><td>
      <!-- Header -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#06170e;border-radius:16px 16px 0 0;border-bottom:1px solid rgba(255,255,255,0.07);">
        <tr><td style="padding:24px 32px;">
          <span style="font-size:18px;font-weight:900;color:#e8e0d0;">
            hidraulika<span style="color:#FDB927;">javítás.hu</span>
          </span>
        </td></tr>
      </table>
      <!-- Body -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d201a;border-radius:0 0 16px 16px;border:1px solid rgba(255,255,255,0.06);border-top:none;">
        <tr><td style="padding:32px;">
          <p style="margin:0 0 8px;font-size:22px;font-weight:900;color:#e8e0d0;">Köszönjük, ${p.name}!</p>
          <p style="margin:0 0 24px;font-size:14px;color:#7a9e8a;line-height:1.6;">
            Megkaptuk az üzenetét. Kollégáink hamarosan felvesszük Önnel a kapcsolatot a megadott
            telefonszámon${p.email ? " vagy e-mail-en" : ""}.
          </p>
          <!-- Summary box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;margin-bottom:24px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#FDB927;">Az Ön megkeresése</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                ${row("Név", p.name)}
                ${row("Telefonszám", p.phone)}
                ${p.email ? row("E-mail", p.email) : ""}
                ${p.partType ? row("Alkatrész", p.partType) : ""}
                ${p.description ? row("Leírás", p.description) : ""}
              </table>
            </td></tr>
          </table>
          <p style="margin:0 0 20px;font-size:13px;color:#7a9e8a;line-height:1.6;">
            Ha sürgős, hívjon minket közvetlenül:
          </p>
          <a href="tel:+36309111474"
            style="display:inline-block;background:#FDB927;color:#0a1f14;font-weight:700;font-size:14px;padding:12px 28px;border-radius:99px;text-decoration:none;">
            +36 30 911 1474
          </a>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;font-size:11px;color:#3d5c4a;">
            Hidraulika Service TEAM Kft. · 1095 Budapest, Soroksári út 48. ·
            <a href="https://www.hidraulikajavitas.com" style="color:#3d5c4a;">hidraulikajavitas.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
function row(label, value) {
  return `<tr>
    <td style="padding:4px 0;font-size:12px;color:#3d5c4a;width:110px;vertical-align:top;">${label}</td>
    <td style="padding:4px 0;font-size:12px;color:#c8bfaf;">${value}</td>
  </tr>`;
}
const schema = objectType({
  name: stringType().min(1),
  phone: stringType().min(1),
  email: stringType().email().optional().or(literalType("")),
  partType: stringType().optional(),
  description: stringType().optional()
});
const submitContact_createServerFn_handler = createServerRpc({
  id: "f89a2e5e681e9af767c0434e24c12a718b0b01fca0227036608f98c4b9390f88",
  name: "submitContact",
  filename: "src/lib/api/contact.functions.ts"
}, (opts) => submitContact.__executeServer(opts));
const submitContact = createServerFn({
  method: "POST"
}).inputValidator(schema).handler(submitContact_createServerFn_handler, async ({
  data
}) => {
  const payload = {
    name: data.name,
    phone: data.phone,
    email: data.email || void 0,
    partType: data.partType || void 0,
    description: data.description || void 0
  };
  const results = await Promise.allSettled([pushToMiniCrm(payload), sendConfirmationEmail(payload)]);
  for (const r of results) {
    if (r.status === "rejected") {
      console.error("[submitContact] partial failure:", r.reason);
    }
  }
  return {
    ok: true
  };
});
export {
  submitContact_createServerFn_handler
};
