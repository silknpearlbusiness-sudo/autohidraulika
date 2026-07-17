import { ArrowLeft } from "lucide-react";
import type { LegalSection } from "@/lib/legal";
import { resetConsent } from "@/lib/consent";

const BG = "hsl(158 62% 7%)";
const ORANGE = "#FDB927";

const legalLinks = [
  { href: "/impresszum", label: "Impresszum" },
  { href: "/adatkezeles", label: "Adatkezelési tájékoztató" },
  { href: "/aszf", label: "ÁSZF" },
  { href: "/suti-szabalyzat", label: "Süti kezelési szabályzat" },
];

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <div className="min-h-screen" style={{ background: BG, color: "hsl(40 20% 97%)" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(4,20,14,0.96)",
          backdropFilter: "blur(24px) saturate(2)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center no-underline">
            <img src="/images/logo-dark.png" alt="Hidraulikajavítás.com" className="h-7 w-auto" />
          </a>
          <a
            href="/"
            className="flex items-center gap-1.5 text-sm no-underline transition-colors"
            style={{ color: "hsl(158 16% 55%)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(40 20% 97%)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(158 16% 55%)")}
          >
            <ArrowLeft size={14} />
            Főoldal
          </a>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 pb-28">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black mb-3">{title}</h1>
          {intro && (
            <p className="text-sm" style={{ color: "hsl(158 16% 45%)" }}>
              {intro}
            </p>
          )}
          <div className="mt-6 h-px w-12 rounded-full" style={{ background: `linear-gradient(90deg, ${ORANGE}, transparent)` }} />
        </div>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <section key={i}>
              {s.heading && (
                <h2
                  className="text-sm font-bold mb-3 uppercase tracking-widest"
                  style={{ color: ORANGE }}
                >
                  {s.heading}
                </h2>
              )}
              <div className="space-y-3">
                {s.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="text-sm leading-relaxed"
                    style={{ color: "hsl(158 10% 67%)" }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="border-t py-8"
        style={{
          borderColor: "rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.18)",
        }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs" style={{ color: "hsl(158 16% 38%)" }}>
            {legalLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="no-underline"
                onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(158 16% 60%)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(158 16% 38%)")}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={resetConsent}
              className="cursor-pointer"
              style={{ background: "none", border: "none", padding: 0, font: "inherit", color: "hsl(158 16% 38%)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(158 16% 60%)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(158 16% 38%)")}
            >
              Süti beállítások
            </button>
            <span style={{ color: "rgba(255,255,255,0.07)" }}>·</span>
            <a
              href="tel:+36309111474"
              className="no-underline"
              style={{ color: ORANGE }}
            >
              +36 30 911 1474
            </a>
          </div>
          <p className="mt-4 text-xs" style={{ color: "hsl(158 16% 28%)" }}>
            © {new Date().getFullYear()} Hidraulika Service TEAM Kft. · 1095 Budapest, Soroksári út 48.
          </p>
        </div>
      </footer>
    </div>
  );
}
