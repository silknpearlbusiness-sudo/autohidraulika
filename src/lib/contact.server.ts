import process from "node:process";
import nodemailer from "nodemailer";

export interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  partType?: string;
  description?: string;
}

// ── Shared transporter (Rackhost mailbox) ───────────────────────────────────────

const MAIL_FROM = "web@hidraulikajavitas.com";
const LEAD_TO = "info@hidraulikajavitas.com";

function getTransporter() {
  const pass = process.env.RACKHOST_EMAIL_PASSWORD;
  if (!pass) return null;
  return nodemailer.createTransport({
    host: "smtp.rackhost.hu",
    port: 465,
    secure: true,
    auth: { user: MAIL_FROM, pass },
  });
}

// ── Lead notification (to the business inbox) ───────────────────────────────────

export async function sendLeadNotification(payload: ContactPayload): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) {
    // Lead capture is the whole point of the form — fail loudly so the UI can
    // show the phone-number fallback instead of pretending the send worked.
    throw new Error("[Mail] Missing RACKHOST_EMAIL_PASSWORD — cannot notify of new lead.");
  }

  await transporter.sendMail({
    from: `Weboldal űrlap <${MAIL_FROM}>`,
    to: LEAD_TO,
    replyTo: payload.email,
    subject: `Új megkeresés — ${payload.name}`,
    html: leadNotificationHtml(payload),
  });
}

function leadNotificationHtml(p: ContactPayload): string {
  const row = (label: string, value: string | undefined) =>
    value ? `<tr><td style="padding:14px 0;border-top:1px solid #ececec;width:100px;vertical-align:top;font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#8a8a8a;">${label}</td><td style="padding:14px 0;border-top:1px solid #ececec;vertical-align:top;font-size:15px;color:#161616;line-height:1.5;">${value}</td></tr>` : "";
  const now = new Date().toLocaleString("hu-HU", { dateStyle: "medium", timeStyle: "short" });

  return `<!DOCTYPE html>
<html lang="hu">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eef1ef;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;">
    <tr><td style="padding:32px 16px;">

      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr><td style="background:#06170e;padding:18px 26px;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="font-size:13px;font-weight:800;color:#f5f1e8;">hidraulika<span style="color:#FDB927;">javitas.com</span></td>
            <td style="text-align:right;font-size:11px;color:#8fb3a0;">${now}</td>
          </tr></table>
        </td></tr>
        <tr><td style="height:3px;font-size:0;line-height:0;background:#FDB927;">&nbsp;</td></tr>

        <!-- Body -->
        <tr><td style="padding:26px 28px 8px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#e07a1f;">Új megkeresés</p>
          <p style="margin:0 0 20px;font-size:19px;font-weight:800;color:#161616;">${p.name}</p>

          <table width="100%" cellpadding="0" cellspacing="0">
            ${row("Telefon", `<a href="tel:${p.phone.replace(/\s+/g, "")}" style="color:#0a1f14;font-weight:700;text-decoration:none;">${p.phone}</a>`)}
            ${row("E-mail", p.email ? `<a href="mailto:${p.email}" style="color:#161616;text-decoration:none;">${p.email}</a>` : undefined)}
            ${row("Alkatrész", p.partType)}
            ${row("Leírás", p.description)}
          </table>
        </td></tr>

        ${p.email ? `<!-- Footer note -->
        <tr><td style="padding:20px 28px 26px;">
          <p style="margin:0;font-size:12.5px;color:#8a8a8a;line-height:1.6;">
            A Válasz gombra kattintva közvetlenül <strong style="color:#555;">${p.email}</strong> címre írhat.
          </p>
        </td></tr>` : `<tr><td style="height:6px;font-size:0;line-height:0;">&nbsp;</td></tr>`}

      </table>

    </td></tr>
  </table>
</body>
</html>`;
}

// ── Confirmation e-mail (to the customer) ────────────────────────────────────────

export async function sendConfirmationEmail(
  payload: ContactPayload,
): Promise<void> {
  if (!payload.email) return;

  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[Mail] Missing RACKHOST_EMAIL_PASSWORD — skipping confirmation email.");
    return;
  }

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
