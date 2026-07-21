import { useState, type CSSProperties, type ReactNode } from "react";
import { CheckCircle, ChevronDown, Loader2, Phone, Send } from "lucide-react";
import { submitContact } from "@/lib/api/contact.functions";

const ORANGE = "#FDB927";

const inputStyle: CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.045)",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "0.75rem",
  padding: "1rem 1.1rem",
  // 16px+ so iOS Safari never auto-zooms; a bit larger for older eyes
  fontSize: "1.05rem",
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
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
  e.currentTarget.style.background = "rgba(255,255,255,0.045)";
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span className="flex items-baseline gap-2 mb-2">
        <span className="text-[0.95rem] font-bold" style={{ color: "hsl(40 20% 92%)" }}>
          {label}
        </span>
        {hint && (
          <span className="text-sm whitespace-nowrap" style={{ color: "hsl(158 16% 50%)" }}>
            {hint}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // Honeypot: real visitors never see or fill this field
    if (fd.get("website")) {
      setSubmitted(true);
      return;
    }

    setSending(true);
    setFailed(false);
    try {
      const res = await submitContact({
        data: {
          name: String(fd.get("name") ?? "").trim(),
          phone: String(fd.get("phone") ?? "").trim(),
          email: String(fd.get("email") ?? "").trim(),
          partType: String(fd.get("partType") ?? ""),
          description: String(fd.get("message") ?? "").trim(),
          website: String(fd.get("website") ?? ""),
        },
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-3xl p-6 sm:p-8 text-center"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(253,185,39,0.16)" }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(253,185,39,0.12)", border: "1.5px solid rgba(253,185,39,0.3)" }}
        >
          <CheckCircle size={32} style={{ color: ORANGE }} />
        </div>
        <h3 className="text-2xl font-black mb-3" style={{ color: "hsl(40 20% 96%)" }}>
          Köszönjük megkeresését!
        </h3>
        <p className="text-[0.95rem] leading-relaxed mb-2" style={{ color: "hsl(158 14% 60%)" }}>
          Kollégánk hamarosan felkeresi Önt az elérhetőségei valamelyikén.
          Ha sürgős a kérdés, hívjon minket közvetlenül!
        </p>
        <a
          href="tel:+36309111474"
          className="btn-hover mt-6 inline-flex items-center justify-center gap-2.5 font-bold no-underline rounded-full"
          style={{ background: ORANGE, color: "#04140d", height: "3.25rem", padding: "0 2rem", fontSize: "1rem" }}
        >
          <Phone size={16} /> +36 30 911 1474
        </a>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-6 sm:p-8"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(253,185,39,0.16)" }}
    >
      <h3 className="text-2xl font-black mb-2" style={{ color: "hsl(40 20% 96%)" }}>
        Kérjen ingyenes visszahívást
      </h3>
      <p className="text-[0.95rem] leading-relaxed mb-7" style={{ color: "hsl(158 14% 60%)" }}>
        Csak a nevét és a telefonszámát kérjük — kollégánk munkaidőben visszahívja.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot — hidden from real visitors */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />

        <Field label="Az Ön neve">
          <input name="name" required autoComplete="name" placeholder="Kovács Péter"
            style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
        </Field>

        <Field label="Telefonszám">
          <input name="phone" type="tel" required autoComplete="tel" placeholder="+36 30 123 4567"
            style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
        </Field>

        <Field label="E-mail cím" hint="nem kötelező">
          <input name="email" type="email" autoComplete="email" placeholder="nev@pelda.hu"
            style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
        </Field>

        <Field label="Milyen alkatrészről van szó?">
          <span className="relative block">
            <select
              name="partType"
              required
              defaultValue=""
              className="pr-12"
              style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
              onFocus={focusIn}
              onBlur={focusOut}
            >
              <option value="" disabled style={{ color: "#333" }}>
                Kérjük, válasszon…
              </option>
              {[
                "Hidraulikus szivattyú",
                "Hidromotor / orbit motor",
                "Munkahenger",
                "Vezérlőblokk / vezérlőtömb",
                "Egyéb / nem tudom",
              ].map((o) => (
                <option key={o} value={o} style={{ color: "#333" }}>
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown
              size={20}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
              style={{ color: ORANGE }}
            />
          </span>
        </Field>

        <Field label="Mi a probléma?" hint="nem kötelező">
          <textarea
            name="message"
            rows={3}
            placeholder="Pl.: a kotrógép gémje nem tartja a terhet…"
            style={{ ...inputStyle, resize: "vertical", minHeight: "5.5rem" }}
            onFocus={focusIn}
            onBlur={focusOut}
          />
        </Field>

        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            name="gdpr"
            required
            className="mt-1 shrink-0 cursor-pointer"
            style={{ width: 20, height: 20, accentColor: ORANGE }}
          />
          <span className="text-sm leading-relaxed" style={{ color: "hsl(158 14% 58%)" }}>
            Hozzájárulok, hogy a Hidraulika Service TEAM Kft. az adataimat a visszahívás céljából
            kezelje az{" "}
            <a href="/adatkezeles" target="_blank" rel="noopener" style={{ color: ORANGE, textDecoration: "underline" }}>
              Adatkezelési tájékoztató
            </a>{" "}
            szerint.
          </span>
        </label>

        {failed && (
          <div
            className="rounded-xl px-4 py-3.5 text-[0.95rem] leading-relaxed"
            style={{ background: "rgba(220,60,60,0.12)", border: "1px solid rgba(220,60,60,0.35)", color: "hsl(0 70% 82%)" }}
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
          className="btn-hover w-full flex items-center justify-center gap-2.5 font-black rounded-full cursor-pointer"
          style={{
            background: ORANGE,
            color: "#04140d",
            border: "none",
            height: "3.75rem",
            fontSize: "1.05rem",
            letterSpacing: "0.01em",
            opacity: sending ? 0.7 : 1,
            boxShadow: "0 6px 22px rgba(253,185,39,0.25)",
          }}
        >
          {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={17} />}
          {sending ? "Küldés folyamatban…" : "Visszahívást kérek"}
        </button>

        <p className="text-center text-[0.95rem] leading-relaxed" style={{ color: "hsl(158 14% 55%)" }}>
          Ha egyszerűbb, hívjon minket most:{" "}
          <a
            href="tel:+36309111474"
            className="inline-flex items-center gap-1.5 font-bold no-underline whitespace-nowrap"
            style={{ color: ORANGE }}
          >
            <Phone size={14} /> +36 30 911 1474
          </a>
          <br />
          <span className="text-sm" style={{ color: "hsl(158 16% 45%)" }}>
            Hétfő–péntek, 8:00–15:30
          </span>
        </p>
      </form>
    </div>
  );
}
