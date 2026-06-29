import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as ArrowLeft } from "../_libs/lucide-react.mjs";
const BG = "hsl(158 62% 7%)";
const ORANGE = "#FDB927";
const legalLinks = [
  { href: "/impresszum", label: "Impresszum" },
  { href: "/adatkezeles", label: "Adatkezelési tájékoztató" },
  { href: "/aszf", label: "ÁSZF" },
  { href: "/suti-szabalyzat", label: "Süti kezelési szabályzat" }
];
function LegalPage({
  title,
  intro,
  sections
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: { background: BG, color: "hsl(40 20% 97%)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "nav",
      {
        className: "sticky top-0 z-50 border-b",
        style: {
          background: "rgba(4,20,14,0.96)",
          backdropFilter: "blur(24px) saturate(2)",
          borderColor: "rgba(255,255,255,0.06)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6 h-16 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/", className: "flex items-center gap-2.5 no-underline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                style: {
                  background: "linear-gradient(135deg, hsl(43 98% 54%), #10b981)",
                  boxShadow: "0 0 16px rgba(253,185,39,0.35)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "white", fontWeight: 900, fontSize: "0.9rem", lineHeight: 1 }, children: "H" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sm tracking-wide", style: { color: "hsl(40 20% 97%)" }, children: [
              "hidraulika",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ORANGE }, children: "javítás.hu" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "/",
              className: "flex items-center gap-1.5 text-sm no-underline transition-colors",
              style: { color: "hsl(158 16% 55%)" },
              onMouseEnter: (e) => e.currentTarget.style.color = "hsl(40 20% 97%)",
              onMouseLeave: (e) => e.currentTarget.style.color = "hsl(158 16% 55%)",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
                "Főoldal"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-3xl mx-auto px-6 py-16 pb-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-black mb-3", children: title }),
        intro && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "hsl(158 16% 45%)" }, children: intro }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 h-px w-12 rounded-full", style: { background: `linear-gradient(90deg, ${ORANGE}, transparent)` } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: sections.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        s.heading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "text-sm font-bold mb-3 uppercase tracking-widest",
            style: { color: ORANGE },
            children: s.heading
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: s.paragraphs.map((p, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm leading-relaxed",
            style: { color: "hsl(158 10% 67%)" },
            children: p
          },
          j
        )) })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "footer",
      {
        className: "border-t py-8",
        style: {
          borderColor: "rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.18)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-6 gap-y-2 text-xs", style: { color: "hsl(158 16% 38%)" }, children: [
            legalLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: l.href,
                className: "no-underline",
                onMouseEnter: (e) => e.currentTarget.style.color = "hsl(158 16% 60%)",
                onMouseLeave: (e) => e.currentTarget.style.color = "hsl(158 16% 38%)",
                children: l.label
              },
              l.href
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(255,255,255,0.07)" }, children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "tel:+36309111474",
                className: "no-underline",
                style: { color: ORANGE },
                children: "+36 30 911 1474"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-xs", style: { color: "hsl(158 16% 28%)" }, children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " Hidraulika Service TEAM Kft. · 1095 Budapest, Soroksári út 48."
          ] })
        ] })
      }
    )
  ] });
}
export {
  LegalPage as L
};
