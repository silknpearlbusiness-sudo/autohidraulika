import { useState, type CSSProperties, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Send } from "lucide-react";
import { submitContact } from "@/lib/api/contact.functions";

const ORANGE = "#FDB927";

const inputStyle: CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.045)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "0.75rem",
  padding: "0.85rem 1rem",
  // 16px minimum — anything smaller makes iOS Safari auto-zoom into the field
  fontSize: "1rem",
  color: "hsl(40 20% 95%)",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
  fontFamily: '"DM Sans", system-ui, sans-serif',
};

function focusIn(e: React.FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = "rgba(253,185,39,0.55)";
  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
}
function focusOut(e: React.FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
  e.currentTarget.style.background = "rgba(255,255,255,0.045)";
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span
        className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em]"
        style={{ color: "hsl(158 16% 55%)" }}
      >
        {label} {required && <span style={{ color: ORANGE }}>*</span>}
      </span>
      {children}
    </label>
  );
}

export function ContactForm() {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: real visitors never see or fill this field
    if (fd.get("website")) {
      navigate({ to: "/koszonjuk" });
      return;
    }

    const company = String(fd.get("company") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    setSending(true);
    setFailed(false);
    try {
      const res = await submitContact({
        data: {
          name: String(fd.get("name") ?? "").trim(),
          phone: String(fd.get("phone") ?? "").trim(),
          email: String(fd.get("email") ?? "").trim(),
          partType: String(fd.get("partType") ?? ""),
          description: [company ? `Cégnév: ${company}` : "", message].filter(Boolean).join("\n"),
        },
      });
      if (res.ok) {
        navigate({ to: "/koszonjuk" });
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className="rounded-3xl p-6 sm:p-8"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(253,185,39,0.16)" }}
    >
      <h3 className="text-xl sm:text-2xl font-black mb-1" style={{ color: "hsl(40 20% 96%)" }}>
        Kérjen ingyenes visszahívást
      </h3>
      <p className="text-sm mb-6" style={{ color: "hsl(158 16% 55%)" }}>
        Töltse ki az űrlapot, kollégánk hamarosan visszahívja.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot — hidden from real visitors */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Név" required>
            <input name="name" required autoComplete="name" placeholder="Kovács Péter"
              style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
          </Field>
          <Field label="Telefonszám" required>
            <input name="phone" type="tel" required autoComplete="tel" placeholder="+36 30 123 4567"
              style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="E-mail">
            <input name="email" type="email" autoComplete="email" placeholder="pelda@email.hu"
              style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
          </Field>
          <Field label="Cégnév">
            <input name="company" autoComplete="organization" placeholder="Opcionális"
              style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
          </Field>
        </div>

        <Field label="Alkatrész típusa">
          <select name="partType" defaultValue="" style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
            onFocus={focusIn} onBlur={focusOut}>
            <option value="" style={{ color: "#333" }}>Válasszon…</option>
            {["Hidraulikus szivattyú", "Hidromotor / orbit motor", "Munkahenger", "Vezérlőblokk / vezérlőtömb", "Egyéb"].map((o) => (
              <option key={o} value={o} style={{ color: "#333" }}>{o}</option>
            ))}
          </select>
        </Field>

        <Field label="Üzenet">
          <textarea name="message" rows={4} placeholder="Írja le röviden a hibát vagy a kérdését…"
            style={{ ...inputStyle, resize: "vertical", minHeight: "6rem" }} onFocus={focusIn} onBlur={focusOut} />
        </Field>

        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            name="gdpr"
            required
            className="mt-0.5 shrink-0 cursor-pointer"
            style={{ width: 16, height: 16, accentColor: ORANGE }}
          />
          <span className="text-xs leading-relaxed" style={{ color: "hsl(158 16% 55%)" }}>
            Hozzájárulok, hogy a Hidraulika Service TEAM Kft. a megadott adataimat a megkeresésem
            megválaszolása céljából kezelje az{" "}
            <a href="/adatkezeles" target="_blank" rel="noopener" style={{ color: ORANGE, textDecoration: "underline" }}>
              Adatkezelési tájékoztató
            </a>{" "}
            szerint. <span style={{ color: ORANGE }}>*</span>
          </span>
        </label>

        {failed && (
          <div
            className="rounded-xl px-4 py-3 text-sm"
            style={{ background: "rgba(220,60,60,0.12)", border: "1px solid rgba(220,60,60,0.35)", color: "hsl(0 70% 80%)" }}
          >
            Az üzenet küldése sajnos nem sikerült. Kérjük, hívjon minket közvetlenül:{" "}
            <a href="tel:+36309111474" style={{ color: ORANGE, fontWeight: 700, whiteSpace: "nowrap" }}>
              +36 30 911 1474
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={sending}
          className="btn-hover w-full flex items-center justify-center gap-2 font-bold uppercase tracking-wide rounded-full cursor-pointer"
          style={{
            background: ORANGE,
            color: "#04140d",
            border: "none",
            height: "3.25rem",
            fontSize: "0.85rem",
            opacity: sending ? 0.7 : 1,
            boxShadow: "0 6px 22px rgba(253,185,39,0.25)",
          }}
        >
          {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
          {sending ? "Küldés…" : "Visszahívást kérek"}
        </button>
      </form>
    </div>
  );
}
