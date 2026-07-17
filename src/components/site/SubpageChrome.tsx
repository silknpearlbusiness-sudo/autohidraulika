import { Phone } from "lucide-react";
import { resetConsent } from "@/lib/consent";

const ORANGE = "#FDB927";
const DIM = "hsl(158 16% 38%)";

export const PHONE_HREF = "tel:+36309111474";
export const PHONE_DISPLAY = "+36 30 911 1474";

export function CallButton({ large = false }: { large?: boolean }) {
  return (
    <a
      href={PHONE_HREF}
      className="btn-hover inline-flex items-center gap-2 font-bold no-underline rounded-xl"
      style={{
        background: `linear-gradient(135deg, ${ORANGE}, hsl(38 90% 60%))`,
        color: "#0a1f14",
        padding: large ? "0.9rem 2rem" : "0.55rem 1.25rem",
        fontSize: large ? "1.05rem" : "0.875rem",
        boxShadow: "0 4px 20px rgba(253,185,39,0.3)",
        whiteSpace: "nowrap",
      }}
    >
      <Phone size={large ? 19 : 15} />
      {PHONE_DISPLAY}
    </a>
  );
}

export function SubNav() {
  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(4,20,14,0.96)",
        backdropFilter: "blur(24px) saturate(2)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-3">
        <a href="/" className="flex items-center no-underline shrink-0">
          <img src="/images/logo-dark.png" alt="Hidraulikajavítás.com" className="h-7 w-auto" />
        </a>
        <CallButton />
      </div>
    </nav>
  );
}

/* Fixed call bar on phones — the number stays under the thumb the whole time. */
export function MobileCallBar() {
  return (
    <a
      href={PHONE_HREF}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2.5 font-black no-underline"
      style={{
        background: `linear-gradient(135deg, ${ORANGE}, hsl(38 90% 58%))`,
        color: "#0a1f14",
        fontSize: "1.1rem",
        padding: "0.95rem 1rem",
        paddingBottom: "calc(0.95rem + env(safe-area-inset-bottom))",
        boxShadow: "0 -6px 24px rgba(0,0,0,0.45)",
        letterSpacing: "0.01em",
      }}
    >
      <Phone size={20} />
      Hívjon most: {PHONE_DISPLAY}
    </a>
  );
}

export function SubFooter() {
  return (
    <footer
      className="border-t py-8 pb-24 md:pb-8"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.18)" }}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm" style={{ color: DIM }}>
          {[
            { href: "/", label: "Főoldal" },
            { href: "/impresszum", label: "Impresszum" },
            { href: "/adatkezeles", label: "Adatkezelési tájékoztató" },
            { href: "/aszf", label: "ÁSZF" },
            { href: "/suti-szabalyzat", label: "Süti kezelési szabályzat" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="no-underline"
              onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(158 16% 60%)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = DIM)}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={resetConsent}
            className="cursor-pointer"
            style={{ background: "none", border: "none", padding: 0, font: "inherit", color: DIM }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(158 16% 60%)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = DIM)}
          >
            Süti beállítások
          </button>
        </div>
        <p className="mt-4 text-xs" style={{ color: "hsl(158 16% 28%)" }}>
          © {new Date().getFullYear()} Hidraulika Service TEAM Kft. · 1095 Budapest, Soroksári út 48.
        </p>
      </div>
    </footer>
  );
}
