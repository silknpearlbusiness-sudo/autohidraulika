import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as Phone } from "../_libs/lucide-react.mjs";
const BG = "hsl(158 62% 7%)";
const ORANGE = "#FDB927";
const MID = "hsl(158 10% 65%)";
const DIM = "hsl(158 16% 38%)";
const PHONE_HREF = "tel:+36309111474";
const PHONE_DISPLAY = "+36 30 911 1474";
const FAULTS = [{
  title: "Hidraulika-szivattyú hiba",
  subtitle: "a rendszer szívének problémái",
  symptoms: ["Erőteljes zaj, vibráció", "Lassú vagy akadozó működés", "Csökkenő nyomás", "Túlmelegedő hidraulikaolaj"],
  causes: ["Elhasználódott alkatrészek", "Szennyezett vagy nem megfelelő viszkozitású olaj", "Szívóágon légbeszívás", "Rosszul beállított nyomásértékek"],
  solution: "A hidraulika szivattyú javítás során teljes körű átvizsgálást végzünk, szükség esetén cseréljük vagy felújítjuk az érintett egységet."
}, {
  title: "Hidromotor hiba",
  subtitle: "a mozgás ereje csökken",
  symptoms: ["Egyenetlen vagy akadozó forgás", "Jelentős nyomatékvesztés", "Külső vagy belső olajszivárgás", "Szokatlan zajterhelés"],
  causes: ["Kopott belső alkatrészek", "Rossz illesztés vagy tömítés", "Szennyeződés, levegő vagy víz a rendszerben"],
  solution: "Szükség szerint hidromotor javítást vagy cserét végzünk. Műhelyünkben lehetőség van típusazonos pótlásra vagy precíz felújításra is."
}, {
  title: "Hidraulikus munkahenger hiba",
  subtitle: "ha nem emel, nem tart",
  symptoms: ["Mozgás közbeni rángás", "Dugattyúrúd körüli szivárgás", "Nyomásvesztés, pozícióvesztés", "Teljes leállás vagy beragadás"],
  causes: ["Sérült vagy elöregedett tömítések", "Belső kopás vagy dugattyúkárosodás", "Szennyeződés, mikrorészecskék a rendszerben"],
  solution: "A munkahenger javítás során cégünk elvégzi a tömítéscserét, felújítást vagy a munkahenger teljes újragyártását – típustól függően."
}];
const WHY_US = ["Több mint 15 év tapasztalat", "Rövid határidős javítás országosan", "Gyors hibafeltárás és árajánlat", "Korszerű szerviz és minőségi alkatrészek", "Minden típusú hidraulikus berendezés javítása"];
function NavBar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sticky top-0 z-50 border-b", style: {
    background: "rgba(4,20,14,0.96)",
    backdropFilter: "blur(24px) saturate(2)",
    borderColor: "rgba(255,255,255,0.06)"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "flex items-center no-underline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/logo-dark.png", alt: "Hidraulikajavítás.com", className: "h-7 w-auto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CallBtn, {})
  ] }) });
}
function CallBtn({
  large = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: PHONE_HREF, className: "inline-flex items-center gap-2 font-bold transition-all no-underline", style: {
    background: `linear-gradient(135deg, ${ORANGE}, hsl(38 90% 60%))`,
    color: "#0a1f14",
    padding: large ? "0.75rem 1.75rem" : "0.5rem 1.25rem",
    borderRadius: "0.75rem",
    fontSize: large ? "1rem" : "0.8125rem",
    boxShadow: "0 4px 20px rgba(253,185,39,0.3)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: large ? 18 : 14 }),
    PHONE_DISPLAY
  ] });
}
function HidraulikaHibaPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: {
    background: BG,
    color: "hsl(40 20% 97%)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-5xl mx-auto px-6 pt-14 pb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest mb-3", style: {
        color: ORANGE
      }, children: "Hidraulika szakszerviz · Budapest" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5 max-w-2xl", children: [
        "Hidraulika szivattyú hiba,",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          color: ORANGE
        }, children: "hidromotor" }),
        " és munkahenger hiba"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed mb-8 max-w-xl", style: {
        color: "hsl(158 16% 55%)"
      }, children: "A hidraulikus rendszerek egyetlen meghibásodott alkatrésze az egész gép leállását okozhatja. Ismerje fel a jeleket időben — több mint 15 éve diagnosztizáljuk és javítjuk ezeket a hibákat, gyorsan, országosan." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CallBtn, { large: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-5xl mx-auto px-6 pb-16 space-y-5", children: FAULTS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border overflow-hidden", style: {
      background: "rgba(255,255,255,0.025)",
      borderColor: "rgba(255,255,255,0.07)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 md:px-8 py-5 border-b", style: {
        borderColor: "rgba(255,255,255,0.06)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg md:text-xl font-black", style: {
          color: "hsl(40 20% 95%)"
        }, children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5", style: {
          color: DIM
        }, children: f.subtitle })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6 px-6 md:px-8 py-6", children: [
        [{
          label: "Jellemző tünetek",
          items: f.symptoms
        }, {
          label: "Tipikus okok",
          items: f.causes
        }].map(({
          label,
          items
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest mb-3", style: {
            color: ORANGE
          }, children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm flex gap-2 items-start", style: {
            color: MID
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 mt-0.5", style: {
              color: ORANGE
            }, children: "·" }),
            item
          ] }, item)) })
        ] }, label)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest mb-3", style: {
            color: ORANGE
          }, children: "Megoldás" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", style: {
            color: MID
          }, children: f.solution })
        ] })
      ] })
    ] }, f.title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y", style: {
      borderColor: "rgba(255,255,255,0.06)",
      background: "rgba(253,185,39,0.03)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-black mb-6", style: {
        color: "hsl(40 20% 95%)"
      }, children: [
        "Miért a",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          color: ORANGE
        }, children: "Hidraulikajavitas.com" }),
        "?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: WHY_US.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold shrink-0", style: {
          color: ORANGE
        }, children: "✓" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", style: {
          color: MID
        }, children: item })
      ] }, item)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-5xl mx-auto px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-black mb-3", children: "Ne várja meg a teljes leállást!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-8 max-w-md mx-auto leading-relaxed", style: {
        color: "hsl(158 16% 55%)"
      }, children: "Ha bármilyen szokatlan működést tapasztal hidraulikus berendezésein, keresse fel szakértő csapatunkat." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CallBtn, { large: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-1 text-sm", style: {
        color: DIM
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:info@hidraulikajavitas.com", className: "no-underline", style: {
          color: "hsl(158 16% 50%)"
        }, children: "info@hidraulikajavitas.com" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "1095 Budapest, Soroksári út 48. — 8-as épület" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t py-8", style: {
      borderColor: "rgba(255,255,255,0.06)",
      background: "rgba(0,0,0,0.18)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-x-6 gap-y-2 text-xs", style: {
        color: DIM
      }, children: [{
        href: "/",
        label: "Főoldal"
      }, {
        href: "/impresszum",
        label: "Impresszum"
      }, {
        href: "/adatkezeles",
        label: "Adatkezelési tájékoztató"
      }, {
        href: "/aszf",
        label: "ÁSZF"
      }, {
        href: "/suti-szabalyzat",
        label: "Süti kezelési szabályzat"
      }].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, className: "no-underline", onMouseEnter: (e) => e.currentTarget.style.color = "hsl(158 16% 60%)", onMouseLeave: (e) => e.currentTarget.style.color = DIM, children: l.label }, l.href)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-xs", style: {
        color: "hsl(158 16% 28%)"
      }, children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Hidraulika Service TEAM Kft. · 1095 Budapest, Soroksári út 48."
      ] })
    ] }) })
  ] });
}
export {
  HidraulikaHibaPage as component
};
