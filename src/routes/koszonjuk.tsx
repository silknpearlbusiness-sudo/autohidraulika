import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle, Phone } from "lucide-react";

const BG = "hsl(158 62% 7%)";
const ORANGE = "#FDB927";

export const Route = createFileRoute("/koszonjuk")({
  head: () => ({
    meta: [
      { title: "Köszönjük megkeresését | Hidraulika Service TEAM Kft." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: KoszonjukPage,
});

function KoszonjukPage() {
  useEffect(() => {
    new Audio("/sounds/click.mp3").play().catch(() => {});
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: BG, color: "hsl(40 20% 97%)" }}
    >
      <style>{`
        @keyframes koszonjuk-card-in {
          0%   { opacity: 0; transform: scale(0.92) translateY(12px); }
          60%  { opacity: 1; transform: scale(1.02) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes badge-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes badge-ring {
          0%        { transform: scale(1);    opacity: 0.5; }
          70%,100%  { transform: scale(1.35); opacity: 0; }
        }
      `}</style>

      <div
        className="relative w-full max-w-sm rounded-3xl text-center"
        style={{
          background: "hsl(158 60% 8%)",
          border: "1px solid rgba(253,185,39,0.25)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
          padding: "2.5rem 2rem 2.25rem",
          animation: "koszonjuk-card-in 0.5s cubic-bezier(0.22,1.4,0.36,1) forwards",
        }}
      >
        <img
          src="/images/logo-dark.png"
          alt="Hidraulikajavítás.com"
          className="h-7 w-auto mx-auto mb-7"
        />

        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: "rgba(253,185,39,0.12)", border: "1.5px solid rgba(253,185,39,0.3)" }}
        >
          <CheckCircle size={32} style={{ color: ORANGE }} />
        </div>

        {/* id matches the GTM "koszonjuk_megkereseset_popup" Element Visibility
            trigger's configured Element ID — don't rename without updating that
            trigger too, or its Google Ads/GA4 conversion tags stop firing. */}
        <h1 id="Köszönjük megkeresését!" className="text-2xl font-black mb-2.5" style={{ color: "hsl(40 20% 96%)" }}>
          Köszönjük megkeresését!
        </h1>
        <p className="text-[0.95rem] leading-relaxed mb-7" style={{ color: "hsl(158 14% 60%)" }}>
          Kollégánk hamarosan felkeresi Önt az elérhetőségei valamelyikén.
        </p>

        <div className="relative inline-flex items-center justify-center mb-7">
          <span
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${ORANGE}`, animation: "badge-ring 1.8s ease-out infinite" }}
          />
          <div
            className="relative inline-block font-black rounded-full"
            style={{
              background: ORANGE,
              color: "#04140d",
              padding: "0.85rem 1.75rem",
              fontSize: "0.95rem",
              letterSpacing: "0.01em",
              boxShadow: "0 6px 22px rgba(253,185,39,0.35)",
              animation: "badge-pulse 1.8s ease-in-out infinite",
            }}
          >
            <span style={{ fontSize: "1.15rem", fontWeight: 900 }}>24</span> órán belül visszahívjuk
          </div>
        </div>

        <p className="text-sm mb-5" style={{ color: "hsl(158 14% 55%)" }}>
          Ha sürgős, hívjon minket közvetlenül:
        </p>

        <a
          href="tel:+36309111474"
          className="btn-hover flex items-center justify-center gap-2.5 font-bold no-underline rounded-full mb-4 w-full"
          style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(253,185,39,0.3)",
            color: "hsl(40 20% 92%)", height: "3rem", fontSize: "0.95rem",
          }}
        >
          <Phone size={15} style={{ color: ORANGE }} /> +36 30 911 1474
        </a>

        <a
          href="/"
          className="inline-flex items-center justify-center font-semibold no-underline text-sm"
          style={{ color: "hsl(158 16% 55%)" }}
        >
          Vissza a főoldalra
        </a>
      </div>
    </div>
  );
}
