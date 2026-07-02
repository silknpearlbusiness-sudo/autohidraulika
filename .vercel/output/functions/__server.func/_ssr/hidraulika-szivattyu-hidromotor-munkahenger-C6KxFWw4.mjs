import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as Phone } from "../_libs/lucide-react.mjs";
const BG = "hsl(158 62% 7%)";
const ORANGE = "#FDB927";
const MID = "hsl(158 10% 65%)";
const DIM = "hsl(158 16% 38%)";
const PHONE_HREF = "tel:+36309111474";
const PHONE_DISPLAY = "+36 30 911 1474";
const PUMP_TYPES = [{
  name: "Radiál dugattyús szivattyú",
  img: "/images/Hidraulika_Radialdugattyus_szivattyu.png",
  desc: "Nagy nyomású alkalmazásokhoz tervezett, robusztus kialakítású szivattyú. Nehézipari gépekben és építőipari berendezésekben a legelterjedtebb."
}, {
  name: "Axiál dugattyús szivattyú",
  img: "/images/Hidraulika_axialdugattyus.jpg",
  desc: "Változtatható lökettérfogatú, magas hatásfokú szivattyú. Széles fordulatszám-tartományban stabil teljesítményt nyújt."
}, {
  name: "Lapátos szivattyú",
  img: "/images/Hidraulika_lapatos.jpg",
  desc: "A lapátos betétek kopnak el leggyakrabban. Komplett felújító készleteket, patronokat és házakat szállítunk a legtöbb típushoz — az egység gyári új állapotba hozható."
}, {
  name: "Fogaskerék szivattyú",
  img: "/images/Hidraulika_fogaskerek.jpg",
  desc: "Egyszerű kialakítás, nagy megbízhatóság. Fogaskerekes szivattyúkat akár 1–3 napon belül tudunk szállítani, versenyképes árakon."
}, {
  name: "Orbit",
  img: "/images/Hidraulika_ORBIT.jpg",
  desc: "Komolyabb kopás, törés esetén nem gazdaságos az alkatrészcsere — új komplett egység vásárlása javasolt. Elérhető alkatrészek: tömítések, szimeringek, csapágyak, csavarok."
}];
const MOTOR_TYPES = [{
  name: "Fogaskerék hidromotor",
  img: "/images/Hidraulika_fogaskerek.jpg",
  desc: "Egyszerű felépítés, robusztus kivitel. Kiválóan alkalmas alacsony és közepes nyomású alkalmazásokhoz."
}, {
  name: "Orbit rendszerű hidromotor",
  img: "/images/Hidraulika_hidromotor1.jpg",
  desc: "Kompakt, nagy nyomatékú megoldás lassú fordulatszámú alkalmazásokhoz. Mezőgazdasági és erdészeti gépekben széles körben elterjedt."
}, {
  name: "Dugattyús rendszerű hidromotor",
  img: "/images/Hidraulika_axialdugattyus.jpg",
  desc: "Magas nyomású és nagy teljesítményű alkalmazásokhoz. Nehézipari gépekben, kotrókban és darukban alkalmazzák elsősorban."
}];
const CYLINDER_TYPES = [{
  name: "Egyszeres működésű munkahenger",
  desc: "Csak egy irányba mozgat; visszatérés külső erő vagy rugó hatására történik."
}, {
  name: "Kettős működésű munkahenger",
  desc: "Mindkét irányba képes mozgatni a dugattyút — rugalmas, széles körben alkalmazható megoldás."
}, {
  name: "Teleszkópos munkahenger",
  desc: "Több szakaszból áll, hosszabb löketet biztosít kompakt kialakítás mellett. Dömperek és emelők jellemző alkatrésze."
}];
const MACHINES = ["Rakodógép", "Targonca", "Kotrógép", "Dózer", "Kompaktor", "Gréder", "Úthenger", "Traktor", "Kombájn", "Erőgép", "Anyagmozgató gép", "Erdészeti gép", "Aszfaltmaró gép"];
const BRANDS = ["Komatsu", "Caterpillar", "Bosch Rexroth", "Parker", "Kawasaki", "ZF", "Liebherr", "Linde", "Sauer-Danfoss", "Vickers", "Eaton", "Hydromatik", "Poclain", "Hitachi", "Kobelco", "KYB Kayaba", "Nachi", "Char-Lynn", "JCB", "Dana", "Spicer", "Carraro", "Allison", "Casse", "Leslie Hidraulika", "Ponar Wadowice"];
function NavBar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sticky top-0 z-50 border-b", style: {
    background: "rgba(4,20,14,0.96)",
    backdropFilter: "blur(24px) saturate(2)",
    borderColor: "rgba(255,255,255,0.06)"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "flex items-center no-underline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/logo-dark.png", alt: "Hidraulikajavítás.com", className: "h-7 w-auto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: PHONE_HREF, className: "inline-flex items-center gap-2 font-bold text-xs no-underline rounded-xl transition-all", style: {
      background: `linear-gradient(135deg, ${ORANGE}, hsl(38 90% 60%))`,
      color: "#0a1f14",
      padding: "0.5rem 1.25rem",
      boxShadow: "0 4px 20px rgba(253,185,39,0.3)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14 }),
      PHONE_DISPLAY
    ] })
  ] }) });
}
function SectionTitle({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-black mb-2", style: {
    color: "hsl(40 20% 95%)"
  }, children });
}
function Label({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest mb-3", style: {
    color: ORANGE
  }, children });
}
function TypeCard({
  name,
  desc,
  img
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border overflow-hidden", style: {
    background: "rgba(255,255,255,0.025)",
    borderColor: "rgba(255,255,255,0.07)"
  }, children: [
    img && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 overflow-hidden bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: name, className: "w-full h-full object-contain p-3" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold mb-1", style: {
        color: "hsl(40 20% 90%)"
      }, children: name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", style: {
        color: MID
      }, children: desc })
    ] })
  ] });
}
function Divider() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px my-14", style: {
    background: "rgba(255,255,255,0.06)"
  } });
}
function HidraulikaSzivattyu() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: {
    background: BG,
    color: "hsl(40 20% 97%)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "max-w-4xl mx-auto px-6 pt-14 pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest mb-3", style: {
          color: ORANGE
        }, children: "Minden, ami hidraulika" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5", children: [
          "Hidraulika szivattyú,",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            color: ORANGE
          }, children: "hidromotor" }),
          " és hidraulikus munkahenger"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed max-w-2xl", style: {
          color: MID
        }, children: "A modern ipari és mezőgazdasági gépek alapvető elemei. Javítás, felújítás és csere esetén keresse szakértő csapatunkat — gyors határidővel, versenyképes áron." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl p-7 mb-14 border", style: {
        background: "rgba(253,185,39,0.05)",
        borderColor: "rgba(253,185,39,0.18)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Hidraulika tesztpad" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Minden javítás után tesztpadon próbáljuk" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm leading-relaxed mt-3", style: {
          color: MID
        }, children: [
          "A hidromotorokat és szivattyúkat minden esetben a javítások befejezése után, hidraulika tesztpadunkon lepróbáljuk. Üzemi körülményeket biztosítunk és úgy terheljük az alkatrészeket — teljes körűen mérjük és beállítjuk a javított egységeket. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: {
            color: "hsl(40 20% 90%)"
          }, children: "Fél év garanciát biztosítunk teljes körű felújítások esetén." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Hidraulika szivattyú típusok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Milyen hidraulikák léteznek?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed mb-8 max-w-2xl", style: {
          color: MID
        }, children: "A hidraulika szivattyú mechanikus energiát alakít hidraulikus energiává. A szivattyú által mozgatott folyadék nagy erőket képes kifejteni és precíz mozgásokat végezni — nélkülözhetetlen az ipar, az építőipar és a mezőgazdaság területén." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 mb-4", children: PUMP_TYPES.slice(0, 3).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TypeCard, { ...t }, t.name)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 mb-8 max-w-[66%] mx-auto", children: PUMP_TYPES.slice(3).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TypeCard, { ...t }, t.name)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Hidromotor típusok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Hidromotorok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed mb-8 max-w-2xl", style: {
          color: MID
        }, children: "A hidromotor hidraulikus energiát alakít mechanikus forgómozgássá. A kifejtett nyomaték és fordulatszám a rendszerben áramló folyadék mennyiségétől és nyomásától függ." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-4 mb-8", children: MOTOR_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TypeCard, { ...t }, t.name)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl p-5 border", style: {
            background: "rgba(255,255,255,0.025)",
            borderColor: "rgba(255,255,255,0.07)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Előnyök" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: ["Nagy nyomaték alacsony sebességnél", "Széles fordulatszám-tartomány", "Megbízható, hosszú élettartam"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm flex gap-2", style: {
              color: MID
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: ORANGE
              }, children: "+" }),
              " ",
              item
            ] }, item)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl p-5 border", style: {
            background: "rgba(255,255,255,0.025)",
            borderColor: "rgba(255,255,255,0.07)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Mire figyeljen" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: ["Olajszivárgás károsítja a rendszert", "Javításuk szakértelmet igényel", "Rendszeres ellenőrzés megelőzi a hibákat"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm flex gap-2", style: {
              color: MID
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: "hsl(0 60% 55%)"
              }, children: "!" }),
              " ",
              item
            ] }, item)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Vezérlőtömb" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Hidraulikus vezérlőtömb javítás" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid sm:grid-cols-2 gap-6 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", style: {
            color: MID
          }, children: "A vezérlőtömb irányítja a hidraulikus folyadék áramlását a rendszerben. Meghibásodás esetén a gép teljes hidraulikus rendszere leállhat. Szakszerű diagnosztika és javítás elengedhetetlen — cégünk e téren is teljes körű megoldást kínál." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden border bg-white", style: {
            borderColor: "rgba(255,255,255,0.1)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/Hidraulika_vezerlotomb.jpg", alt: "Hidraulikus vezérlőtömb", className: "w-full h-48 object-contain p-3" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Hidraulikus munkahenger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Munkahengerek típusai" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed mb-8 max-w-2xl", style: {
          color: MID
        }, children: "A hidraulikus munkahenger a folyadék nyomását lineáris mozgássá alakítja. Nagy erőket képes kifejteni pontosan irányítva — nélkülözhetetlen az építőipartól a mezőgazdaságig." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-6 mb-6 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: CYLINDER_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TypeCard, { ...t }, t.name)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden border bg-white", style: {
            borderColor: "rgba(255,255,255,0.1)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/Hidraulika_munkahenger.jpg", alt: "Hidraulikus munkahenger", className: "w-full h-64 object-contain p-3" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", style: {
          color: MID
        }, children: "Komolyabb meghibásodás esetén — alkatrészek kopása, törése — a megoldás egy új vásárlása lehet. A pontos azonosításhoz és ajánlathoz szükséges a termék gyári cikkszáma vagy az adattáblán található adatok. Ha az adattábla nem található, felépítéséből, csatlakozásaiból és méreteiből meghatározzuk az eredeti típust." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Milyen gépeket javítunk" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Márkafüggetlen javítás minden gépre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed mb-6 max-w-2xl", style: {
          color: MID
        }, children: "Cégünk a földmunkagépek és mezőgazdasági gépek hidraulikus egységeinek javításában nagy múlttal rendelkezik. Magas szakértelem mellett versenyképes árakat kínálunk, a lehető legrövidebb határidőn belül." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-8", children: MACHINES.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1.5 rounded-full text-xs font-semibold border", style: {
          background: "rgba(255,255,255,0.03)",
          borderColor: "rgba(255,255,255,0.1)",
          color: MID
        }, children: m }, m)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Márkák" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Az alábbi márkákhoz nyújtunk segítséget" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-6", children: BRANDS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border", style: {
          background: "rgba(253,185,39,0.06)",
          borderColor: "rgba(253,185,39,0.16)",
          color: "hsl(43 98% 68%)"
        }, children: b }, b)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-black mb-3", children: "Szüksége van javításra?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-8 max-w-md mx-auto leading-relaxed", style: {
          color: "hsl(158 16% 55%)"
        }, children: "Szivattyú, hidromotor, vezérlőtömb vagy munkahenger — gyors hibafeltárás, pontos árajánlat, rövid határidő. Hívjon minket bizalommal!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: PHONE_HREF, className: "inline-flex items-center gap-2.5 font-bold no-underline rounded-xl transition-all", style: {
          background: `linear-gradient(135deg, ${ORANGE}, hsl(38 90% 60%))`,
          color: "#0a1f14",
          padding: "0.875rem 2rem",
          fontSize: "1rem",
          boxShadow: "0 4px 24px rgba(253,185,39,0.35)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18 }),
          " ",
          PHONE_DISPLAY
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-1 text-sm", style: {
          color: DIM
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:info@hidraulikajavitas.com", className: "no-underline", style: {
            color: "hsl(158 16% 50%)"
          }, children: "info@hidraulikajavitas.com" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "1095 Budapest, Soroksári út 48. — 8-as épület FSZ." })
        ] })
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
  HidraulikaSzivattyu as component
};
