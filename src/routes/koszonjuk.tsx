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
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: BG, color: "hsl(40 20% 97%)" }}
    >
      <div className="max-w-md w-full text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{
            background: "rgba(253,185,39,0.12)",
            border: "1.5px solid rgba(253,185,39,0.3)",
          }}
        >
          <CheckCircle size={32} style={{ color: ORANGE }} />
        </div>

        <h1 className="text-2xl md:text-3xl font-black mb-3">
          Köszönjük megkeresését!
        </h1>
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "hsl(158 16% 55%)" }}
        >
          Kollégánk hamarosan felkeresi Önt az elérhetőségei valamelyikén.
          Ha sürgős a kérdés, hívjon minket közvetlenül!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+36309111474"
            className="inline-flex items-center justify-center gap-2 font-bold no-underline rounded-xl transition-all"
            style={{
              background: `linear-gradient(135deg, ${ORANGE}, hsl(38 90% 60%))`,
              color: "#0a1f14",
              padding: "0.75rem 1.75rem",
              fontSize: "0.9rem",
              boxShadow: "0 4px 20px rgba(253,185,39,0.3)",
            }}
          >
            <Phone size={16} />
            +36 30 911 1474
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 font-bold no-underline rounded-xl transition-all text-sm"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "hsl(40 20% 85%)",
              padding: "0.75rem 1.75rem",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Vissza a főoldalra
          </a>
        </div>
      </div>
    </div>
  );
}
