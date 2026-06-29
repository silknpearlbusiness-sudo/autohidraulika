import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as CircleCheckBig, P as Phone } from "../_libs/lucide-react.mjs";
const BG = "hsl(158 62% 7%)";
const ORANGE = "#FDB927";
function KoszonjukPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex flex-col items-center justify-center px-6", style: {
    background: BG,
    color: "hsl(40 20% 97%)"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6", style: {
      background: "rgba(253,185,39,0.12)",
      border: "1.5px solid rgba(253,185,39,0.3)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 32, style: {
      color: ORANGE
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-black mb-3", children: "Köszönjük megkeresését!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed mb-8", style: {
      color: "hsl(158 16% 55%)"
    }, children: "Kollégánk hamarosan felkeresi Önt az elérhetőségei valamelyikén. Ha sürgős a kérdés, hívjon minket közvetlenül!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+36309111474", className: "inline-flex items-center justify-center gap-2 font-bold no-underline rounded-xl transition-all", style: {
        background: `linear-gradient(135deg, ${ORANGE}, hsl(38 90% 60%))`,
        color: "#0a1f14",
        padding: "0.75rem 1.75rem",
        fontSize: "0.9rem",
        boxShadow: "0 4px 20px rgba(253,185,39,0.3)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }),
        "+36 30 911 1474"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "inline-flex items-center justify-center gap-2 font-bold no-underline rounded-xl transition-all text-sm", style: {
        background: "rgba(255,255,255,0.06)",
        color: "hsl(40 20% 85%)",
        padding: "0.75rem 1.75rem",
        border: "1px solid rgba(255,255,255,0.1)"
      }, children: "Vissza a főoldalra" })
    ] })
  ] }) });
}
export {
  KoszonjukPage as component
};
