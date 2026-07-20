import process from "node:process";
import nodemailer from "nodemailer";

export interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  partType?: string;
  description?: string;
}

// ── MiniCRM ────────────────────────────────────────────────────────────────────

export async function pushToMiniCrm(payload: ContactPayload): Promise<void> {
  const systemId = process.env.MINICRM_SYSTEM_ID;
  const apiKey = process.env.MINICRM_API_KEY;
  const categoryId = process.env.MINICRM_CATEGORY_ID;

  if (!systemId || !apiKey || !categoryId) {
    // Lead capture is the whole point of the form — fail loudly so the UI can
    // show the phone-number fallback instead of pretending the send worked.
    throw new Error("[MiniCRM] Missing env vars (MINICRM_SYSTEM_ID / MINICRM_API_KEY / MINICRM_CATEGORY_ID).");
  }

  const auth = Buffer.from(`${systemId}@${apiKey}`).toString("base64");
  const headers: HeadersInit = {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
  };
  const base = "https://api.minicrm.hu/1";

  // Split name into first/last (MiniCRM wants them separate)
  const parts = payload.name.trim().split(/\s+/);
  const lastName = parts[0] ?? payload.name;
  const firstName = parts.slice(1).join(" ") || "";

  // 1. Create / update contact
  const contactRes = await fetch(`${base}/Contact/0`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      LastName: lastName,
      FirstName: firstName,
      Phone: payload.phone,
      ...(payload.email ? { Email: payload.email } : {}),
      Type: "Contact",
    }),
  });

  if (!contactRes.ok) {
    throw new Error(`[MiniCRM] Contact PUT failed: ${await contactRes.text()}`);
  }

  const { Id: contactId } = (await contactRes.json()) as { Id: number };

  // 2. Create project (lead) linked to the contact
  const projectRes = await fetch(`${base}/Project/0`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      CategoryId: Number(categoryId),
      Name: `Weboldal megkeresés — ${payload.name}`,
      ContactId: contactId,
      ...(payload.description ? { Description: payload.description } : {}),
      ...(payload.partType ? { AlkatreszTipus: payload.partType } : {}),
    }),
  });

  if (!projectRes.ok) {
    throw new Error(`[MiniCRM] Project PUT failed: ${await projectRes.text()}`);
  }
}

// ── Confirmation e-mail (via Rackhost mailbox) ──────────────────────────────────

const MAIL_FROM = "web@hidraulikajavitas.com";

export async function sendConfirmationEmail(
  payload: ContactPayload,
): Promise<void> {
  if (!payload.email) return;

  const pass = process.env.RACKHOST_EMAIL_PASSWORD;

  if (!pass) {
    console.warn("[Mail] Missing RACKHOST_EMAIL_PASSWORD — skipping confirmation email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.rackhost.hu",
    port: 465,
    secure: true,
    auth: { user: MAIL_FROM, pass },
  });

  await transporter.sendMail({
    from: `Hidraulika Service TEAM Kft. <${MAIL_FROM}>`,
    to: payload.email,
    subject: "Köszönjük megkeresését — Hidraulika Service TEAM Kft.",
    html: confirmationHtml(payload),
  });
}

function confirmationHtml(p: ContactPayload): string {
  return `<!DOCTYPE html>
<html lang="hu">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050f0b;font-family:system-ui,-apple-system,sans-serif;color:#e8e0d0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr><td style="padding:48px 16px;">

      <!-- Card -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d201a;border:1px solid rgba(255,255,255,0.08);border-radius:20px;">

        <!-- Logo -->
        <tr><td align="center" style="padding:40px 32px 8px;">
          <img src="https://www.hidraulikajavitas.com/images/logo-dark.png" width="180" alt="Hidraulikajavítás.com" style="display:block;width:180px;max-width:55%;height:auto;">
        </td></tr>

        <!-- Headline -->
        <tr><td align="center" style="padding:28px 40px 0;">
          <p style="margin:0 0 12px;font-size:26px;font-weight:900;color:#f5f1e8;text-align:center;letter-spacing:-.01em;">Köszönjük, ${p.name}!</p>
          <p style="margin:0 0 8px;font-size:15px;color:#94b8a6;line-height:1.7;text-align:center;max-width:380px;">
            Megkaptuk az üzenetét. Kollégáink hamarosan felvesszük Önnel a kapcsolatot a megadott
            telefonszámon${p.email ? " vagy e-mail-en" : ""}.
          </p>
        </td></tr>

        <!-- Summary -->
        <tr><td style="padding:32px 40px 8px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border-radius:14px;">
            <tr><td style="padding:28px 32px;">
              ${row("Név", p.name)}
              ${row("Telefonszám", p.phone)}
              ${row("E-mail", p.email)}
              ${row("Alkatrész", p.partType)}
              ${row("Leírás", p.description)}
            </td></tr>
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td align="center" style="padding:28px 40px 40px;">
          <p style="margin:0 0 16px;font-size:13.5px;color:#94b8a6;line-height:1.6;text-align:center;">
            Ha sürgős, hívjon minket közvetlenül:
          </p>
          <a href="tel:+36309111474"
            style="display:inline-block;background:#FDB927;color:#0a1f14;font-weight:800;font-size:15px;padding:14px 38px;border-radius:99px;text-decoration:none;">
            📞 +36 30 911 1474
          </a>
        </td></tr>

      </table>

      <!-- Footer -->
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td align="center" style="padding:28px 20px 0;">
          <p style="margin:0;font-size:11.5px;color:#4a6d5a;text-align:center;line-height:1.8;">
            Hidraulika Service TEAM Kft. · 1095 Budapest, Soroksári út 48.<br>
            <a href="https://www.hidraulikajavitas.com" style="color:#6b9280;">hidraulikajavitas.com</a>
          </p>
        </td></tr>
      </table>

    </td></tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string | undefined): string {
  if (!value) return "";
  return `<table width="100%" cellpadding="0" cellspacing="0"><tr>
    <td width="106" style="vertical-align:top;padding:12px 0;font-size:12px;font-weight:600;color:#5c8570;border-top:1px solid rgba(255,255,255,0.06);">${label}</td>
    <td style="vertical-align:top;padding:12px 0;font-size:14.5px;color:#eae3d4;line-height:1.55;border-top:1px solid rgba(255,255,255,0.06);">${value}</td>
  </tr></table>`;
}
