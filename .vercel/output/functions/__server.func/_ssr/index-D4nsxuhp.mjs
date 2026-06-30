import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-CCw8z2Ih.mjs";
import "../_libs/seroval.mjs";
import { W as Wrench, P as Phone, X, M as Menu, a as ChevronRight, b as Mail, c as MapPin, S as ShieldCheck, T as Truck, d as CircleCheck, e as ClipboardCheck, f as PackageCheck, g as Clock, h as CircleQuestionMark, i as ArrowRight, j as ArrowUp, k as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, l as literalType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function Reveal({
  children,
  className = "",
  delay = 0
}) {
  const ref = reactExports.useRef(null);
  const [phase, setPhase] = reactExports.useState("visible");
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let initial = true;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (initial) {
          initial = false;
          if (e.isIntersecting) {
            obs.disconnect();
          } else {
            setPhase("hidden");
          }
          return;
        }
        if (e.isIntersecting) {
          obs.disconnect();
          if (delay > 0) {
            setTimeout(() => setPhase("animating"), delay);
          } else {
            setPhase("animating");
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -20px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  reactExports.useEffect(() => {
    if (phase !== "animating") return;
    const t = setTimeout(() => setPhase("visible"), 700);
    return () => clearTimeout(t);
  }, [phase]);
  let style;
  if (phase === "hidden") {
    style = { opacity: 0, transform: "translateY(14px)", willChange: "opacity, transform" };
  } else if (phase === "animating") {
    style = {
      opacity: 1,
      transform: "translateY(0)",
      transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
      willChange: "opacity, transform"
    };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className, style, children });
}
const SRC = "/sounds/click.mp3";
function useClickSound(volume = 0.35) {
  const baseRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const a = new Audio(SRC);
    a.preload = "none";
    a.volume = volume;
    baseRef.current = a;
    const warm = () => {
      a.preload = "auto";
      a.load();
      document.removeEventListener("touchstart", warm, { capture: true });
      document.removeEventListener("mousedown", warm, { capture: true });
    };
    document.addEventListener("touchstart", warm, { capture: true, once: true, passive: true });
    document.addEventListener("mousedown", warm, { capture: true, once: true });
    return () => {
      document.removeEventListener("touchstart", warm, { capture: true });
      document.removeEventListener("mousedown", warm, { capture: true });
    };
  }, [volume]);
  return reactExports.useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const base = baseRef.current;
    if (!base) return;
    const a = base.cloneNode();
    a.volume = volume;
    a.currentTime = 0;
    a.play().catch(() => {
    });
  }, [volume]);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const schema = objectType({
  name: stringType().min(1),
  phone: stringType().min(1),
  email: stringType().email().optional().or(literalType("")),
  partType: stringType().optional(),
  description: stringType().optional()
});
const submitContact = createServerFn({
  method: "POST"
}).inputValidator(schema).handler(createSsrRpc("f89a2e5e681e9af767c0434e24c12a718b0b01fca0227036608f98c4b9390f88"));
const PX = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop`;
const IMGS = {
  // real business photos (downloaded from wp)
  workshop1: "/images/ZW550-6-768x690.webp",
  timberjack: "/images/3737280468_219458a037_b.jpg",
  // hydraulic / industrial (stock fallbacks)
  pump: PX("3807319")
};
function Chip({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.16em]", style: {
    background: "rgba(253,185,39,0.1)",
    border: "1px solid rgba(253,185,39,0.22)",
    color: "hsl(43 98% 65%)"
  }, children });
}
function ServiceCard({
  num,
  name,
  short
}) {
  const ORANGE = "#FDB927";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#kapcsolat", className: "group flex items-center gap-5 py-5 no-underline", style: {
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    transition: "padding-left 0.2s ease"
  }, onMouseEnter: (e) => {
    e.currentTarget.style.paddingLeft = "0.75rem";
  }, onMouseLeave: (e) => {
    e.currentTarget.style.paddingLeft = "0";
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-black tabular-nums w-10 text-right transition-colors duration-200", style: {
      fontSize: "0.75rem",
      color: "hsl(158 16% 28%)",
      letterSpacing: "0.05em"
    }, children: num }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-lg leading-tight transition-colors duration-200 group-hover:text-[hsl(43,98%,68%)]", children: name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5 leading-relaxed", style: {
        color: "hsl(158 16% 46%)"
      }, children: short })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 18, className: "shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0", style: {
      color: ORANGE
    } })
  ] });
}
function OrangeDot() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full inline-block", style: {
    background: "hsl(43 98% 54%)",
    animation: "pulse-glow 2s ease-in-out infinite"
  } });
}
const navLinks = [{
  href: "#szolgaltatasok",
  label: "Szolgáltatások"
}, {
  href: "#folyamat",
  label: "Folyamat"
}, {
  href: "#velemenyek",
  label: "Vélemények"
}, {
  href: "#gyik",
  label: "GYIK"
}, {
  href: "#kapcsolat",
  label: "Kapcsolat"
}];
const marqueeItems = ["HIDRAULIKA JAVÍTÁS", "Hidraulika szivattyú", "Hidromotor", "Orbit", "Vezérlőtömb", "Munkahenger"];
const services = [{
  icon: Wrench,
  num: "01",
  title: "Hidraulika Javítás",
  desc: "Hidraulikus alkatrészek teljes körű diagnózisa, javítása és felújítása — minden típushoz, minden gyártóhoz, gyári minőségű alkatrészekkel. 24–48 órás átfutás, 6 hónap garancia.",
  img: IMGS.pump,
  tags: ["Axial", "Radial", "Lapátos", "Fogaskerekes", "Hidromotor", "Vezérlőtömb", "Munkahenger", "Orbit"]
}];
const brands = ["Komatsu", "Caterpillar", "Bosch", "Rexroth", "Poclain", "Sauer-Danfoss", "Liebherr", "Vickers", "Eaton", "Parker", "Hitachi", "Kobelco", "Linde", "Kawasaki", "KYB Kayaba", "Nachi", "Char-Lynn", "Case", "JCB", "KYB", "Dana", "Spicer", "Carraro", "Allison", "ZF", "Hydromatik"];
const processSteps = [{
  icon: Truck,
  num: "01",
  title: "Futárunk elhozza Öntől a meghibásodott alkatrészt.",
  desc: "Ön kiszereli az alkatrészt, becsomagolja — futárunk átveszi és beszállítja szakműhelyünkbe.",
  detail: "Hétfő–Péntek 08:00–15:30"
}, {
  icon: ClipboardCheck,
  num: "02",
  title: "Adunk egy pontos árajánlatot a hidraulika javításról és a javítási határidőről!",
  desc: "Sok olyan jellegű hiba van, amelyekre nem lehet előre pontos árat mondani, csak a bevizsgálást követően. Részletes, írásos árajánlatot küldünk — munkához csak az Ön jóváhagyása után fogunk.",
  detail: "Írásos árajánlat 24 órán belül"
}, {
  icon: Wrench,
  num: "03",
  title: "Ön elfogadja – mi megjavítjuk.",
  desc: "Gyári vagy gyári minőségű alkatrészekkel és tömítésekkel végezzük el a javítást. Minden munkafázist dokumentálunk, a javítást tesztelés követi.",
  detail: "Átlag 24–48 óra átfutás"
}, {
  icon: PackageCheck,
  num: "04",
  title: "Visszaszállítjuk a felújított egységet.",
  desc: "A kész, tesztelt alkatrészt visszaszállítjuk az Ön által megadott helyszínre. 6 hónap írásos garancia minden elvégzett javításra.",
  detail: "6 hónap írásos garancia"
}];
const testimonials = [{
  name: "K. Péter",
  role: "Debrecen",
  text: "Gyors, precíz munka. A hidraulikus szivattyút 48 óra alatt megjavították és visszaszállították. Kiváló szolgáltatás, melegen ajánlom mindenkinek!"
}, {
  name: "N. László",
  role: "Budapest",
  text: "Korrekt kommunikáció, pontos árajánlat, határidőre elkészülő munka. A hidraulikus hengerünket tökéletesen megjavították. Köszönöm a csapatnak!"
}, {
  name: "F. Gábor",
  role: "Eger",
  text: "Megbízható szakszerviz. Már másodszor bízzuk rájuk a munkagépünk hidraulikus rendszerének javítását. Mindig elégedett vagyunk."
}, {
  name: "T. Imre",
  role: "Győr",
  text: "A vezérlőblokkot pontosan diagnosztizálták és sikeresen megjavították. Profi csapat, kiváló minőség. Legközelebb is csak ide jövünk."
}];
const faq = [{
  q: "Milyen hidraulikus alkatrészeket javítanak?",
  a: "Hidraulikus szivattyúkat (dugattyús, lamellás, fogaskerék), motorokat, hengereket, orbit motorokat és vezérlőblokkokat. Márkafüggetlenül: Komatsu, Caterpillar, Bosch Rexroth, Parker, Kawasaki, ZF, Liebherr és más gyártók termékeit is javítjuk."
}, {
  q: "Mennyi idő alatt készül el a hidraulika javítás?",
  a: "Az alkatrész beérkezésétől számítva átlagosan 24-48 órán belül elvégezzük a javítást. Összetettebb hibáknál ez hosszabb lehet — erről minden esetben előre tájékoztatjuk."
}, {
  q: "Milyen garanciát vállalnak a javításokra?",
  a: "Minden elvégzett javításra 6 hónap teljes körű, írásos garanciát biztosítunk az anyagra és a munkadíjra egyaránt. Új alkatrészek értékesítésénél 12 hónap garancia érvényes."
}, {
  q: "Hogyan működik az országos futárszolgálat?",
  a: "Hívja telefonszámunkat, és futárunk az ország bármely pontjára kimegy a kiszerelt alkatrészért. A javítás után visszaszállítjuk az Ön által megadott helyre — személyes megjelenés nélkül."
}, {
  q: "Mennyibe kerül egy átlagos hidraulika javítás?",
  a: "A javítás ára az alkatrész típusától, a hiba jellegétől és a szükséges anyagoktól függ. Bevizsgálás után pontos, írásos árajánlatot adunk — csak elfogadás után kezdünk."
}];
const counties = ["Budapest", "Pest", "Győr-Moson-Sopron", "Vas", "Zala", "Somogy", "Baranya", "Tolna", "Fejér", "Komárom-Esztergom", "Veszprém", "Bács-Kiskun", "Csongrád-Csanád", "Békés", "Hajdú-Bihar", "Szabolcs-Sz-B", "Jász-NK-Sz", "Heves", "Nógrád", "Borsod-A-Z"];
function Home() {
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [showScrollTop, setShowScrollTop] = reactExports.useState(false);
  const [showMobileCTA, setShowMobileCTA] = reactExports.useState(false);
  const scrollTimerRef = reactExports.useRef(null);
  const navInnerRef = reactExports.useRef(null);
  reactExports.useRef(null);
  const [selectedCounty, setSelectedCounty] = reactExports.useState(null);
  const [countySearch, setCountySearch] = reactExports.useState("");
  const [hoveredCounty, setHoveredCounty] = reactExports.useState(null);
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  const [formState, setFormState] = reactExports.useState("idle");
  const playClick = useClickSound();
  reactExports.useEffect(() => {
    const handler = (e) => {
      const el = e.target?.closest("a, button, [role='button'], input[type='submit'], select, summary, label");
      if (el) playClick();
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [playClick]);
  reactExports.useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      setShowScrollTop(y > 500);
      setShowMobileCTA(y > 300);
      const el = navInnerRef.current;
      if (el) {
        el.style.transform = "scale(0.94)";
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = setTimeout(() => {
          if (navInnerRef.current) navInnerRef.current.style.transform = "scale(1)";
        }, 200);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);
  const BG = "hsl(158 62% 7%)";
  const BG2 = "hsl(158 62% 6%)";
  const ORANGE = "#FDB927";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "top", className: "min-h-screen overflow-x-hidden", style: {
    background: BG,
    color: "hsl(40 20% 97%)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [{
          "@type": "WebSite",
          "@id": "https://www.hidraulikajavitas.com/#website",
          "url": "https://www.hidraulikajavitas.com",
          "name": "Hidraulika Javítás — Hidraulika Service TEAM Kft.",
          "description": "Hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok márkafüggetlen javítása. 24–48 órás átfutás, 6 hónap garancia, ingyenes országos futárszolgálat.",
          "inLanguage": "hu-HU",
          "publisher": {
            "@id": "https://www.hidraulikajavitas.com/#business"
          }
        }, {
          "@type": ["LocalBusiness", "AutoRepair"],
          "@id": "https://www.hidraulikajavitas.com/#business",
          "name": "Hidraulika Service TEAM Kft.",
          "legalName": "Hidraulika Service TEAM Korlátolt Felelősségű Társaság",
          "alternateName": ["Hidraulika Javítás", "Hidraulika Service TEAM"],
          "url": "https://www.hidraulikajavitas.com",
          "telephone": "+36309111474",
          "email": "info@hidraulikajavitas.com",
          "vatID": "32267509-2-43",
          "taxID": "32267509-2-43",
          "priceRange": "$$",
          "currenciesAccepted": "HUF",
          "paymentAccepted": "Készpénz, Banki átutalás",
          "image": {
            "@type": "ImageObject",
            "url": "https://www.hidraulikajavitas.com/images/workshop-1.jpg",
            "width": 1200,
            "height": 800
          },
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.hidraulikajavitas.com/images/workshop-1.jpg",
            "width": 512,
            "height": 512
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Soroksári út 48, Malom Udvar, 8. épület, földszint",
            "addressLocality": "Budapest",
            "postalCode": "1095",
            "addressRegion": "Budapest",
            "addressCountry": "HU"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 47.4669,
            "longitude": 19.0744
          },
          "hasMap": "https://maps.google.com/maps?q=Soroks%C3%A1ri+%C3%BAt+48+Budapest+1095",
          "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "17:00"
          }],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+36309111474",
            "contactType": "customer service",
            "availableLanguage": {
              "@type": "Language",
              "name": "Hungarian"
            },
            "areaServed": "HU",
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "17:00"
            }
          },
          "employee": [{
            "@type": "Person",
            "@id": "https://www.hidraulikajavitas.com/#person-pos-gabor",
            "name": "Poós Gábor",
            "jobTitle": "Alapító & Műszaki Vezető"
          }, {
            "@type": "Person",
            "@id": "https://www.hidraulikajavitas.com/#person-andreka-ferenc",
            "name": "Andréka Ferenc",
            "jobTitle": "Vezető Hidraulika Szerelő"
          }],
          "founder": [{
            "@id": "https://www.hidraulikajavitas.com/#person-pos-gabor"
          }],
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": 2
          },
          "areaServed": [{
            "@type": "Country",
            "name": "Magyarország"
          }, ...counties.map((c) => ({
            "@type": "AdministrativeArea",
            "name": c
          }))],
          "description": "Hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok márkafüggetlen javítása. 24–48 órás átfutás, 6 hónap garancia, ingyenes országos futárszolgálat.",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "ratingCount": String(testimonials.length),
            "reviewCount": String(testimonials.length),
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": testimonials.map((t) => ({
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5",
              "worstRating": "1"
            },
            "author": {
              "@type": "Person",
              "name": t.name
            },
            "reviewBody": t.text,
            "inLanguage": "hu-HU",
            "publisher": {
              "@id": "https://www.hidraulikajavitas.com/#business"
            }
          })),
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Hidraulika javítási szolgáltatások",
            "itemListElement": services.map((s, idx) => ({
              "@type": "Offer",
              "position": idx + 1,
              "itemOffered": {
                "@type": "Service",
                "@id": `https://www.hidraulikajavitas.com/#service-${idx + 1}`,
                "name": s.title,
                "description": s.desc,
                "provider": {
                  "@id": "https://www.hidraulikajavitas.com/#business"
                },
                "areaServed": {
                  "@type": "Country",
                  "name": "Magyarország"
                },
                "availableChannel": {
                  "@type": "ServiceChannel",
                  "serviceUrl": "https://www.hidraulikajavitas.com",
                  "servicePhone": "+36309111474",
                  "availableLanguage": {
                    "@type": "Language",
                    "name": "Hungarian"
                  }
                }
              }
            }))
          }
        }, {
          "@type": "FAQPage",
          "@id": "https://www.hidraulikajavitas.com/#faq",
          "mainEntity": faq.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a,
              "inLanguage": "hu-HU"
            }
          }))
        }]
      })
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-5xl", style: {
      animation: "fade-in 0.65s cubic-bezier(0.22,1,0.36,1) both"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: navInnerRef, className: "flex items-center justify-between px-3 pr-3", style: {
        height: 58,
        background: scrolled ? "rgba(4,20,14,0.97)" : "rgba(4,20,14,0.85)",
        backdropFilter: "blur(20px) saturate(1.8)",
        WebkitBackdropFilter: "blur(20px) saturate(1.8)",
        border: "1px solid rgba(255,255,255,0.075)",
        borderRadius: 999,
        boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)" : "0 6px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        transform: "scale(1)",
        transformOrigin: "top center",
        willChange: "transform",
        transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, box-shadow 0.4s ease"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#top", className: "flex items-center gap-2.5 group pl-1 no-underline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/logo.svg", alt: "Hidraulikajavítás.hu", className: "h-9 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex items-center gap-6", children: navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, className: "nav-link text-sm font-medium no-underline", style: {
          color: "hsl(158 16% 60%)"
        }, onMouseEnter: (e) => e.currentTarget.style.color = "hsl(40 20% 97%)", onMouseLeave: (e) => e.currentTarget.style.color = "hsl(158 16% 60%)", children: l.label }, l.href)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+36309111474", className: "btn-hover phone-pulse hidden sm:flex items-center gap-2 h-10 px-5 rounded-full text-sm font-semibold no-underline", style: {
            background: "rgba(253,185,39,0.15)",
            border: "1px solid rgba(253,185,39,0.4)",
            color: "white"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 13 }),
            " +36 30 911 1474"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+36309111474", "aria-label": "Hívjon most", className: "sm:hidden w-10 h-10 rounded-full flex items-center justify-center no-underline", style: {
            background: "rgba(253,185,39,0.15)",
            border: "1px solid rgba(253,185,39,0.4)",
            color: ORANGE
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 15 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMenuOpen(!menuOpen), "aria-label": "Menü", className: "md:hidden w-10 h-10 rounded-full flex items-center justify-center cursor-pointer", style: {
            background: "rgba(255,255,255,0.06)",
            color: "hsl(158 16% 60%)",
            border: "none"
          }, children: menuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 18 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl overflow-hidden", style: {
        background: "rgba(4,20,14,0.97)",
        backdropFilter: "blur(16px) saturate(1.6)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        maxHeight: menuOpen ? 520 : 0,
        opacity: menuOpen ? 1 : 0,
        marginTop: menuOpen ? "0.5rem" : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "max-height 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease, margin-top 0.35s ease"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center gap-1.5 py-3 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/logo.svg", alt: "Hidraulikajavítás.hu", className: "h-10 w-auto" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1", style: {
          height: 1,
          background: "rgba(255,255,255,0.06)"
        } }),
        navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, onClick: () => setMenuOpen(false), className: "text-left px-4 py-3 rounded-xl text-sm font-medium no-underline block", style: {
          color: "hsl(158 16% 60%)"
        }, onMouseEnter: (e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          e.currentTarget.style.color = "hsl(40 20% 97%)";
        }, onMouseLeave: (e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "hsl(158 16% 60%)";
        }, children: l.label }, l.href)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+36309111474", className: "mt-2 flex items-center justify-center gap-2 h-11 rounded-full text-sm font-semibold text-white no-underline", style: {
          background: ORANGE,
          boxShadow: "0 0 30px rgba(253,185,39,0.3)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 13 }),
          " +36 30 911 1474"
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-screen overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none z-0", style: {
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "36px 36px"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 -left-32 rounded-full pointer-events-none animate-blob", style: {
        width: 700,
        height: 700,
        background: "radial-gradient(circle, rgba(253,185,39,0.14), transparent 70%)",
        filter: "blur(90px)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 rounded-full pointer-events-none", style: {
        width: 500,
        height: 500,
        background: "radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)",
        filter: "blur(100px)",
        animation: "blob 20s ease-in-out infinite reverse"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none z-0 select-none", style: {
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.028,
        mixBlendMode: "overlay"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1fr_0.9fr] min-h-screen relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center pt-32 pb-16 px-6 md:px-10 lg:px-16 xl:px-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em]", style: {
            background: "rgba(253,185,39,0.1)",
            border: "1px solid rgba(253,185,39,0.25)",
            color: "hsl(43 98% 68%)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(OrangeDot, {}),
            " Márkafüggetlen szakszerviz · Budapest"
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 70, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mb-6", style: {
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.025em"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block hero-gradient-text", style: {
              fontSize: "clamp(3rem,9vw,7.5rem)"
            }, children: "HIDRAULIKA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block hero-gradient-text", style: {
              fontSize: "clamp(2rem,6vw,5rem)"
            }, children: "JAVÍTÁS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block mt-2", style: {
              fontSize: "clamp(1.1rem,3vw,2.2rem)",
              color: "rgba(250,244,230,0.55)",
              fontWeight: 800,
              letterSpacing: "0.06em"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                fontSize: "1.5em",
                fontWeight: 900,
                lineHeight: 0.85,
                background: `linear-gradient(135deg, ${ORANGE}, #fff176)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }, children: "H" }),
              "idraulika",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                fontSize: "1.5em",
                fontWeight: 900,
                lineHeight: 0.85,
                background: `linear-gradient(135deg, ${ORANGE}, #fff176)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }, children: "S" }),
              "ervice",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                fontSize: "1.5em",
                fontWeight: 900,
                lineHeight: 0.85,
                background: `linear-gradient(135deg, ${ORANGE}, #fff176)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }, children: "T" }),
              "eam"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 140, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10 h-0.5 w-14 rounded-full", style: {
            background: "linear-gradient(90deg, hsl(43 98% 54%), transparent)"
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+36309111474", className: "group glint cta-pulse relative inline-flex items-center justify-center gap-3 rounded-full font-black text-white no-underline w-full sm:w-auto", style: {
              background: ORANGE,
              height: "4.5rem",
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
              fontSize: "1.25rem",
              boxShadow: "0 0 60px rgba(253,185,39,0.55), 0 8px 32px rgba(253,185,39,0.35)"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 22 }),
              " Hívjon most!"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#kapcsolat", className: "btn-hover inline-flex items-center justify-center gap-3 rounded-full font-bold no-underline w-full sm:w-auto", style: {
              height: "4.5rem",
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
              fontSize: "1.1rem",
              color: "hsl(40 20% 97%)",
              border: "2px solid rgba(253,185,39,0.45)",
              background: "rgba(253,185,39,0.07)"
            }, children: [
              "Kérek visszahívást",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18, className: "transition-transform group-hover:translate-x-1" })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex flex-col justify-center gap-4 p-8 pr-12 pt-28 pb-28", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden", style: {
            height: 280,
            border: "1px solid rgba(255,255,255,0.07)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: IMGS.workshop1, alt: "Hidraulika javítás műhely", className: "w-full h-full object-cover", style: {
              filter: "saturate(0.75) contrast(1.1) brightness(0.85)"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
              background: "linear-gradient(to top, rgba(4,20,14,0.5), transparent)"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass absolute bottom-4 left-4 rounded-2xl px-4 py-3 animate-float", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest", style: {
                color: "hsl(158 16% 50%)"
              }, children: "Garancia" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black", children: "6 hónap" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden", style: {
            height: 180,
            border: "1px solid rgba(255,255,255,0.07)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: IMGS.timberjack, alt: "Erdészeti munkagép hidraulika", className: "w-full h-full object-cover", style: {
              filter: "saturate(0.7) contrast(1.15) brightness(0.8)"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
              background: "linear-gradient(to top, rgba(4,20,14,0.6), transparent)"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass absolute bottom-3 left-3 rounded-xl px-3 py-2 animate-float", style: {
              animationDelay: "-3s"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-widest", style: {
                color: "hsl(158 16% 50%)"
              }, children: "Javítás" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-black", children: "5000+" })
            ] })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", style: {
      background: ORANGE,
      borderTop: "1px solid rgba(0,0,0,0.1)",
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marquee-track py-3.5", children: [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-5 font-bold tracking-[0.12em] uppercase text-[13px] px-5 text-white", children: [
      item,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
        color: "rgba(255,255,255,0.3)",
        fontSize: "8px"
      }, children: "◆" })
    ] }, i)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-28 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
        background: "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(253,185,39,0.04), transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "Lefedettség" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl mt-5 mb-5 font-black", style: {
            lineHeight: 0.95
          }, children: [
            "Bárhová megyünk",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "az országban."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 h-0.5 w-12 rounded-full", style: {
            background: `linear-gradient(90deg, ${ORANGE}, transparent)`
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed text-[15px] max-w-sm mb-8", style: {
            color: "hsl(158 16% 55%)"
          }, children: "Nem számít, hol van a gépe — futárunk elmegy Önhöz, átveszi az alkatrészt, és visszahozza megjavítva. Egész Magyarország területét lefedjük." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+36309111474", className: "btn-hover glint inline-flex items-center gap-2.5 h-12 px-8 rounded-full text-base font-black no-underline", style: {
            background: ORANGE,
            color: "#04111f",
            boxShadow: "0 0 40px rgba(253,185,39,0.35)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }),
            " Hívjon most — ingyenes"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.16em]", style: {
              color: "hsl(158 16% 38%)"
            }, children: "Mind a 20 megye — teljes lefedettség" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold transition-all duration-200", style: {
              color: hoveredCounty ? ["bp", "pest", "tolna", "hb"].includes(hoveredCounty) ? ORANGE : "hsl(158 60% 55%)" : "transparent",
              minWidth: "8rem",
              textAlign: "right"
            }, children: hoveredCounty ? [{
              id: "gms",
              name: "Győr-Moson-Sopron"
            }, {
              id: "vas",
              name: "Vas"
            }, {
              id: "zala",
              name: "Zala"
            }, {
              id: "ke",
              name: "Komárom-Esztergom"
            }, {
              id: "nograd",
              name: "Nógrád"
            }, {
              id: "veszp",
              name: "Veszprém"
            }, {
              id: "fejer",
              name: "Fejér"
            }, {
              id: "tolna",
              name: "Tolna"
            }, {
              id: "somogy",
              name: "Somogy"
            }, {
              id: "baranya",
              name: "Baranya"
            }, {
              id: "pest",
              name: "Pest"
            }, {
              id: "bp",
              name: "Budapest"
            }, {
              id: "heves",
              name: "Heves"
            }, {
              id: "jnsz",
              name: "Jász-NK-Sz"
            }, {
              id: "bk",
              name: "Bács-Kiskun"
            }, {
              id: "ccs",
              name: "Csongrád-Csanád"
            }, {
              id: "baz",
              name: "Borsod-A-Z"
            }, {
              id: "ssz",
              name: "Szabolcs-Sz-B"
            }, {
              id: "hb",
              name: "Hajdú-Bihar"
            }, {
              id: "bekes",
              name: "Békés"
            }].find((c) => c.id === hoveredCounty)?.name ?? "" : "" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 760 400", className: "w-full rounded-2xl overflow-visible", xmlns: "http://www.w3.org/2000/svg", style: {
            background: "hsl(158 58% 6%)",
            border: "1px solid rgba(16,185,129,0.1)",
            borderRadius: "1rem"
          }, children: [{
            id: "gms",
            name: "Győr-Moson-Sopron",
            k: false,
            cx: 144,
            cy: 124,
            d: "M10,137 10,96 55,68 111,82 155,90 189,117 180,152 144,165 89,178 44,165Z"
          }, {
            id: "vas",
            name: "Vas",
            k: false,
            cx: 74,
            cy: 212,
            d: "M44,165 89,178 144,165 111,220 111,247 78,288 10,288 10,137Z"
          }, {
            id: "zala",
            name: "Zala",
            k: false,
            cx: 78,
            cy: 308,
            d: "M10,288 78,288 111,247 144,274 144,315 111,357 55,371 10,371Z"
          }, {
            id: "ke",
            name: "Komárom-Esztergom",
            k: false,
            cx: 246,
            cy: 136,
            d: "M189,117 222,96 278,82 306,82 306,117 323,137 300,165 222,165 180,152Z"
          }, {
            id: "nograd",
            name: "Nógrád",
            k: false,
            cx: 367,
            cy: 88,
            d: "M306,82 306,55 389,55 411,82 411,117 389,137 323,137 306,117Z"
          }, {
            id: "veszp",
            name: "Veszprém",
            k: false,
            cx: 193,
            cy: 206,
            d: "M144,165 180,152 222,165 300,165 278,220 222,233 189,247 144,247 111,220Z"
          }, {
            id: "fejer",
            name: "Fejér",
            k: false,
            cx: 298,
            cy: 206,
            d: "M300,165 323,137 334,165 334,220 300,247 278,247 278,220Z"
          }, {
            id: "tolna",
            name: "Tolna",
            k: true,
            cx: 262,
            cy: 292,
            d: "M222,233 278,220 300,247 278,274 278,329 222,329 222,274Z"
          }, {
            id: "somogy",
            name: "Somogy",
            k: false,
            cx: 165,
            cy: 307,
            d: "M10,371 55,371 111,357 144,315 144,274 222,274 222,329 188,371 155,399 10,399Z"
          }, {
            id: "baranya",
            name: "Baranya",
            k: false,
            cx: 224,
            cy: 367,
            d: "M155,399 188,371 222,329 278,329 278,357 222,399Z"
          }, {
            id: "pest",
            name: "Pest",
            k: true,
            cx: 370,
            cy: 146,
            d: "M306,117 389,137 411,117 411,165 389,165 356,185 356,220 334,220 334,165 323,137Z"
          }, {
            id: "bp",
            name: "Budapest",
            k: true,
            cx: 341,
            cy: 175,
            d: "M334,165 356,165 356,185 334,185Z"
          }, {
            id: "heves",
            name: "Heves",
            k: false,
            cx: 441,
            cy: 137,
            d: "M389,137 411,117 500,117 500,165 456,192 411,165Z"
          }, {
            id: "jnsz",
            name: "Jász-NK-Sz",
            k: false,
            cx: 440,
            cy: 218,
            d: "M356,185 389,165 411,165 456,192 500,165 500,247 445,274 389,247 356,220Z"
          }, {
            id: "bk",
            name: "Bács-Kiskun",
            k: false,
            cx: 382,
            cy: 313,
            d: "M278,274 334,220 356,220 389,247 445,274 445,329 389,371 333,371 278,329Z"
          }, {
            id: "ccs",
            name: "Csongrád-Csanád",
            k: false,
            cx: 452,
            cy: 350,
            d: "M445,274 500,247 500,399 445,399 389,371Z"
          }, {
            id: "baz",
            name: "Borsod-A-Z",
            k: false,
            cx: 548,
            cy: 107,
            d: "M411,82 500,55 556,27 611,27 667,55 667,117 611,165 556,165 500,165 500,117Z"
          }, {
            id: "ssz",
            name: "Szabolcs-Sz-B",
            k: false,
            cx: 683,
            cy: 119,
            d: "M611,27 667,27 722,55 755,82 755,192 722,192 667,165 611,165 667,117 667,55Z"
          }, {
            id: "hb",
            name: "Hajdú-Bihar",
            k: true,
            cx: 611,
            cy: 217,
            d: "M556,165 611,165 667,165 722,192 722,274 667,315 611,274 556,247 500,247 500,165Z"
          }, {
            id: "bekes",
            name: "Békés",
            k: false,
            cx: 575,
            cy: 300,
            d: "M500,247 556,247 611,274 667,315 667,357 611,371 556,357 500,329Z"
          }].map((c) => {
            const hov = hoveredCounty === c.id;
            const fillBase = c.k ? "rgba(253,185,39,0.13)" : "rgba(16,185,129,0.09)";
            const fillHov = c.k ? "rgba(253,185,39,0.32)" : "rgba(16,185,129,0.28)";
            const strokeBase = c.k ? "rgba(253,185,39,0.22)" : "rgba(16,185,129,0.18)";
            const strokeHov = c.k ? "rgba(253,185,39,0.7)" : "rgba(16,185,129,0.6)";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { style: {
              transform: hov ? "translate(0,-5px)" : "translate(0,0)",
              transition: "transform 0.18s ease, filter 0.18s ease",
              filter: hov ? `drop-shadow(0 6px 18px ${c.k ? "rgba(253,185,39,0.45)" : "rgba(16,185,129,0.38)"})` : "none",
              cursor: "default"
            }, onMouseEnter: () => setHoveredCounty(c.id), onMouseLeave: () => setHoveredCounty(null), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: c.d, fill: hov ? fillHov : fillBase, stroke: hov ? strokeHov : strokeBase, strokeWidth: hov ? "1.8" : "1", strokeLinejoin: "round", style: {
                transition: "fill 0.18s ease, stroke 0.18s ease, stroke-width 0.18s ease"
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: c.cx, y: c.cy, textAnchor: "middle", dominantBaseline: "middle", fontSize: c.id === "bp" ? "6" : "8", fontWeight: c.k ? "700" : "500", fill: hov ? c.k ? "rgba(253,185,39,1)" : "rgba(255,255,255,0.85)" : c.k ? "rgba(253,185,39,0.7)" : "rgba(255,255,255,0.3)", fontFamily: "system-ui, sans-serif", style: {
                transition: "fill 0.18s ease",
                pointerEvents: "none",
                userSelect: "none"
              }, children: c.id === "bp" ? "BP" : c.id === "gms" ? "Győr-M-S" : c.id === "ssz" ? "Szabolcs" : c.id === "baz" ? "Borsod" : c.id === "jnsz" ? "Jász-NK-Sz" : c.id === "ccs" ? "Csongrád" : c.id === "nograd" ? "Nógrád" : c.id === "bekes" ? "Békés" : c.name })
            ] }, c.id);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs", style: {
            color: "hsl(158 16% 38%)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-sm shrink-0", style: {
                background: "rgba(253,185,39,0.4)",
                border: "1px solid rgba(253,185,39,0.6)"
              } }),
              "Kiemelt hálózat"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-sm shrink-0", style: {
                background: "rgba(16,185,129,0.25)",
                border: "1px solid rgba(16,185,129,0.4)"
              } }),
              "Aktív lefedettség"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-bold", style: {
              color: "hsl(43 98% 58%)"
            }, children: "20 / 20 megye ✓" })
          ] })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "szolgaltatasok", className: "py-28 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none blur-[120px] opacity-[0.07]", style: {
        background: `radial-gradient(ellipse, ${ORANGE}, transparent 70%)`
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "Javítási területek" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 font-black leading-[0.9]", style: {
              fontSize: "clamp(3.2rem,8vw,6.5rem)",
              letterSpacing: "-0.03em"
            }, children: [
              "MIT",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: ORANGE
              }, children: "JAVÍTUNK?" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-base leading-relaxed lg:text-right", style: {
            color: "hsl(158 16% 50%)"
          }, children: "Minden hidraulikus alkatrész — szivattyúktól az orbit motorig. Márkafüggetlenül, gyári minőségű alkatrészekkel, 6 hónap garanciával." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-x-16", children: [{
          num: "01",
          name: "Axiál dugattyús szivattyú",
          short: "Nagy nyomású, dugattyús — kotrógépek és nehézgépek elengedhetetlen alkatrésze."
        }, {
          num: "02",
          name: "Radiál dugattyús szivattyú",
          short: "Radiális dugattyús, robusztus kialakítás nehézipari alkalmazásokhoz."
        }, {
          num: "03",
          name: "Lapátos szivattyú",
          short: "Lamellás betétek, patronok és házak — komplett felújítás."
        }, {
          num: "04",
          name: "Fogaskerekes szivattyú",
          short: "Egyszerű, megbízható — gyors csere, versenyképes ár."
        }, {
          num: "05",
          name: "Hidromotor",
          short: "Hidraulikus energiát forgómozgássá alakít — nagy nyomaték, precíz vezérlés."
        }, {
          num: "06",
          name: "Vezérlőtömb",
          short: "Szelepek, blokkok javítása — a rendszer agyát is megjavítjuk."
        }, {
          num: "07",
          name: "Munkahenger",
          short: "Tömítéscsere, krómozás, henger felújítás — minden méretben, minden nyomástartományban."
        }, {
          num: "08",
          name: "Orbit motor",
          short: "Kompakt, nagy nyomatékú — mezőgazdasági és erdészeti gépekben mindennapos."
        }].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 50, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceCard, { ...s }) }, s.num)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 340, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col sm:flex-row items-center gap-5 rounded-3xl p-7", style: {
          background: "linear-gradient(135deg, rgba(253,185,39,0.08), rgba(16,185,129,0.06))",
          border: "1px solid rgba(253,185,39,0.2)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-xl", children: "Nem tudja pontosan mi a hiba?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", style: {
              color: "hsl(158 16% 52%)"
            }, children: "Hívjon — ingyenesen megmondjuk mi a probléma és mennyibe kerül a javítás." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+36309111474", className: "glint cta-pulse shrink-0 inline-flex items-center gap-2.5 rounded-full font-black no-underline", style: {
            background: ORANGE,
            color: "#04111f",
            height: "3.5rem",
            paddingLeft: "2.25rem",
            paddingRight: "2.25rem",
            fontSize: "1.05rem",
            boxShadow: "0 0 50px rgba(253,185,39,0.4)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 17 }),
            " +36 30 911 1474"
          ] })
        ] }) })
      ] })
    ] }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "kapcsolat", className: "py-28 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-96 h-96 opacity-[0.05] blur-[120px] pointer-events-none", style: {
        background: `radial-gradient(circle, ${ORANGE}, transparent 60%)`
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "Kapcsolat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-5xl md:text-6xl mt-4 mb-10 font-black", children: [
            "Rendelje meg",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "a javítást!"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4", children: [{
            icon: Phone,
            label: "+36 (30) 9111-474",
            sub: "Telefonszám",
            href: "tel:+36309111474"
          }, {
            icon: Mail,
            label: "info@hidraulikajavitas.com",
            sub: "Email",
            href: "mailto:info@hidraulikajavitas.com"
          }, {
            icon: MapPin,
            label: "1095 Budapest, Soroksári út 48",
            sub: "Telephely",
            href: "#"
          }].map(({
            icon: Icon,
            label,
            sub,
            href
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href, className: "group flex items-center gap-4 px-6 py-4 rounded-2xl no-underline btn-hover", style: {
            background: "hsl(158 58% 11%)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "inherit"
          }, onMouseEnter: (e) => {
            e.currentTarget.style.borderColor = "rgba(253,185,39,0.3)";
          }, onMouseLeave: (e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0", style: {
              background: "rgba(253,185,39,0.1)",
              border: "1px solid rgba(253,185,39,0.2)",
              color: ORANGE
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 17, strokeWidth: 1.5 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest font-semibold mb-0.5", style: {
                color: "hsl(158 16% 45%)"
              }, children: sub }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: label })
            ] })
          ] }, sub)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1fr_1.2fr] gap-14 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-6", children: "Miért válasszon minket?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 mb-10", children: [{
              icon: ShieldCheck,
              t: "Garancia",
              d: "6 hónap garancia javításra és 12 hónap garancia új értékesítés esetén."
            }, {
              icon: Truck,
              t: "Országos futárszolgálat",
              d: "Egész országra kiterjedő, kedvező oda-visszaszállítás, tanácsadás."
            }, {
              icon: CircleCheck,
              t: "100% minőség",
              d: "A hidraulika felújítás után az Ön hidraulikus egysége gyakorlatilag úgy működik, mint az új!"
            }].map(({
              icon: Icon,
              t,
              d
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5", style: {
                background: "rgba(253,185,39,0.1)",
                border: "1px solid rgba(253,185,39,0.18)",
                color: ORANGE
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15, strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: t }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-0.5", style: {
                  color: "hsl(158 16% 52%)"
                }, children: d })
              ] })
            ] }, t)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-5 text-xs space-y-1.5", style: {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm mb-3", style: {
                color: "hsl(40 20% 90%)"
              }, children: "Hidraulika Service TEAM Kft." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
                color: "hsl(158 16% 45%)"
              }, children: "Adószám: 32267509-2-43" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
                color: "hsl(158 16% 45%)"
              }, children: "Cégjegyzékszám: 01-09-376445" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
                color: "hsl(158 16% 45%)"
              }, children: "1095 Budapest, Soroksári út 48, Malom Udvar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
                color: "hsl(158 16% 45%)"
              }, children: "8. épület, földszint" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-strong rounded-3xl p-8 md:p-10", style: {
            boxShadow: "0 40px 80px -24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)"
          }, children: formState === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", style: {
            animation: "card-in 0.4s ease both"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center mb-6", style: {
              background: "rgba(253,185,39,0.1)",
              border: "1px solid rgba(253,185,39,0.3)"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 30, style: {
              color: ORANGE
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: "Köszönjük!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm max-w-xs", style: {
              color: "hsl(158 16% 55%)"
            }, children: "Hamarosan felvesszük Önnel a kapcsolatot — általában 24 órán belül." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFormState("idle"), className: "mt-8 text-xs cursor-pointer underline", style: {
              background: "none",
              border: "none",
              color: "hsl(158 16% 50%)"
            }, children: "Új üzenet küldése" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-1", children: "Kérjen ingyenes visszahívást" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-7", style: {
              color: "hsl(158 16% 55%)"
            }, children: "24 órán belül felvesszük Önnel a kapcsolatot." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-4", onSubmit: async (e) => {
              e.preventDefault();
              setFormState("loading");
              const fd = new FormData(e.currentTarget);
              try {
                await submitContact({
                  data: {
                    name: fd.get("name"),
                    phone: fd.get("phone"),
                    email: fd.get("email") || "",
                    partType: fd.get("partType") || "",
                    description: fd.get("description") || ""
                  }
                });
                setFormState("success");
              } catch (err) {
                console.error("[contact form]", err);
                setFormState("idle");
              }
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: [{
                label: "Név",
                type: "text",
                name: "name",
                placeholder: "Adja meg nevét",
                required: true
              }, {
                label: "Telefonszám",
                type: "tel",
                name: "phone",
                placeholder: "+36 30 000 0000",
                required: true
              }].map(({
                label,
                type,
                name,
                placeholder,
                required
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-semibold uppercase tracking-widest mb-2 block", style: {
                  color: "hsl(158 16% 48%)"
                }, children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, name, placeholder, required, className: "w-full rounded-xl px-4 py-3 text-sm outline-none transition-[border-color,background-color] duration-200 ease-out", style: {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "hsl(40 20% 97%)"
                }, onFocus: (e) => {
                  e.currentTarget.style.borderColor = "rgba(253,185,39,0.5)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }, onBlur: (e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                } })
              ] }, label)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-semibold uppercase tracking-widest mb-2 block", style: {
                  color: "hsl(158 16% 48%)"
                }, children: "Email (opcionális)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", name: "email", placeholder: "pelda@email.hu", className: "w-full rounded-xl px-4 py-3 text-sm outline-none transition-[border-color,background-color] duration-200 ease-out", style: {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "hsl(40 20% 97%)"
                }, onFocus: (e) => {
                  e.currentTarget.style.borderColor = "rgba(253,185,39,0.5)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }, onBlur: (e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                } })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-semibold uppercase tracking-widest mb-2 block", style: {
                  color: "hsl(158 16% 48%)"
                }, children: "Alkatrész típusa" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "partType", defaultValue: "", className: "w-full rounded-xl px-4 py-3 text-sm outline-none transition-[border-color,background-color] duration-200 ease-out", style: {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "hsl(40 20% 97%)",
                  appearance: "none"
                }, onFocus: (e) => {
                  e.currentTarget.style.borderColor = "rgba(253,185,39,0.5)";
                }, onBlur: (e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, style: {
                    background: "hsl(158 52% 13%)"
                  }, children: "Válasszon típust..." }),
                  ["Hidraulikus szivattyú", "Hidraulikus motor", "Hidraulikus henger", "Orbit motor", "Vezérlőblokk", "Egyéb"].map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.toLowerCase(), style: {
                    background: "hsl(158 52% 13%)"
                  }, children: o }, o))
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-semibold uppercase tracking-widest mb-2 block", style: {
                  color: "hsl(158 16% 48%)"
                }, children: "Hiba leírása" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "description", rows: 4, placeholder: "Röviden írja le a hibát és a gép típusát...", className: "w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-[border-color,background-color] duration-200 ease-out", style: {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "hsl(40 20% 97%)"
                }, onFocus: (e) => {
                  e.currentTarget.style.borderColor = "rgba(253,185,39,0.5)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }, onBlur: (e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                } })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: formState === "loading", className: "btn-hover w-full rounded-full text-base font-semibold text-white py-4 cursor-pointer", style: {
                background: ORANGE,
                boxShadow: "0 0 40px rgba(253,185,39,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                border: "none",
                opacity: formState === "loading" ? 0.7 : 1,
                transition: "opacity 0.2s ease"
              }, children: formState === "loading" ? "Küldés..." : "Kérek visszahívást" })
            ] })
          ] }) }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 relative overflow-hidden", style: {
      background: "hsl(158 65% 5%)",
      borderTop: "1px solid rgba(253,185,39,0.12)",
      borderBottom: "1px solid rgba(253,185,39,0.12)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
        background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(16,185,129,0.22), transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 relative z-10 mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "Márkafüggetlen szerviz" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 font-black leading-none", style: {
            fontSize: "clamp(2.4rem,5.5vw,4rem)"
          }, children: [
            "26 vezető gyártó.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: ORANGE
            }, children: "Egy megbízható szerviz." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed", style: {
            color: "hsl(158 16% 55%)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+36309111474", className: "btn-hover mt-5 inline-flex items-center gap-2 h-11 px-6 rounded-full text-sm font-bold no-underline", style: {
            background: ORANGE,
            color: "#04111f"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14 }),
            " Kérdezzen ingyenesen"
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marquee-track", style: {
        animationDuration: "22s"
      }, children: (() => {
        const mb = brands.filter((b) => b !== "Leslie Hidraulika" && b !== "Ponar");
        return [...mb, ...mb, ...mb, ...mb];
      })().map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-4 px-6", style: {
        fontSize: "clamp(1.5rem,3.5vw,2.4rem)",
        fontWeight: 900,
        color: i % 2 === 0 ? ORANGE : "rgba(255,255,255,0.07)",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        whiteSpace: "nowrap"
      }, children: [
        b,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          color: "rgba(253,185,39,0.2)",
          fontSize: "0.5em"
        }, children: "◆" })
      ] }, i)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marquee-track", style: {
        animationDuration: "28s",
        animationDirection: "reverse"
      }, children: (() => {
        const mb = brands.filter((b) => b !== "Leslie Hidraulika" && b !== "Ponar");
        return [...mb, ...mb, ...mb, ...mb];
      })().map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-4 px-6", style: {
        fontSize: "clamp(1.5rem,3.5vw,2.4rem)",
        fontWeight: 900,
        color: i % 2 === 0 ? "rgba(255,255,255,0.06)" : ORANGE,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        whiteSpace: "nowrap"
      }, children: [
        b,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          color: "rgba(253,185,39,0.2)",
          fontSize: "0.5em"
        }, children: "◆" })
      ] }, i)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 relative z-10 mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3", children: brands.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest", style: {
          background: "rgba(253,185,39,0.07)",
          border: "1px solid rgba(253,185,39,0.18)",
          color: "hsl(43 98% 72%)"
        }, children: b }, b)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center mt-6 text-xs font-semibold uppercase tracking-widest", style: {
          color: "hsl(158 16% 38%)"
        }, children: "+ Minden egyéb gyártó hidraulikus rendszerei" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 pt-10", style: {
          borderTop: "1px solid rgba(253,185,39,0.12)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[10px] font-bold uppercase tracking-[0.24em] mb-8", style: {
            color: "hsl(158 16% 42%)"
          }, children: "Hidraulika elemekben stratégiai partnerünk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center items-center gap-6", children: [{
            src: "/images/brand-leslie.jpg",
            alt: "Leslie Hidraulika"
          }, {
            src: "/images/brand-ponar.jpg",
            alt: "Ponar Wadowice"
          }].map(({
            src,
            alt
          }) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://hidraulikaelem.hu/", target: "_blank", rel: "noopener noreferrer", className: "rounded-2xl overflow-hidden flex items-center justify-center px-6 py-4 no-underline", style: {
            background: "rgba(255,255,255,0.92)",
            boxShadow: "0 0 0 1px rgba(253,185,39,0.2), 0 8px 32px rgba(0,0,0,0.35)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt, className: "h-12 w-auto object-contain" }) }, alt)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "folyamat", className: "py-28 relative overflow-hidden", style: {
      background: BG2
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-full h-full pointer-events-none", style: {
        background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(16,185,129,0.12), transparent 65%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 text-center max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "A folyamat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-5 font-black leading-none", style: {
            fontSize: "clamp(2.6rem,6vw,4.5rem)"
          }, children: [
            "A javítás",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: ORANGE
            }, children: "folyamata." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base leading-relaxed", style: {
            color: "hsl(158 16% 55%)"
          }, children: "Sok olyan jellegű hiba van, amelyekre nem lehet előre pontos árat mondani, csak a bevizsgálást követően." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3 mt-7", children: [{
            label: "1 perc",
            sub: "Hívás"
          }, {
            label: "Másnap",
            sub: "Futár indul"
          }, {
            label: "24–48 óra",
            sub: "Javítás"
          }, {
            label: "Azután",
            sub: "Visszaszállítás"
          }].map((pill) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-2.5 rounded-2xl text-center", style: {
            background: "rgba(253,185,39,0.07)",
            border: "1px solid rgba(253,185,39,0.18)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black", style: {
              color: ORANGE
            }, children: pill.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider mt-0.5", style: {
              color: "hsl(158 16% 48%)"
            }, children: pill.sub })
          ] }, pill.label)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: processSteps.map((p, i) => {
          const isLast = i === processSteps.length - 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 90, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 md:gap-10 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center shrink-0", style: {
              width: 64
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl flex items-center justify-center z-10 relative", style: {
                background: "linear-gradient(135deg, #FDB927, #10b981)",
                color: "white",
                boxShadow: "0 0 28px rgba(253,185,39,0.3)"
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { size: 22, strokeWidth: 1.8 }) }),
              !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-px mt-3 mb-3", style: {
                background: "linear-gradient(to bottom, rgba(253,185,39,0.4), rgba(16,185,129,0.25))",
                minHeight: 32
              } })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group flex-1 rounded-3xl p-6 md:p-8 project-card-hover ${isLast ? "mb-0" : "mb-4"}`, style: {
              background: "hsl(158 58% 10%)",
              border: "1px solid rgba(255,255,255,0.07)"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-black uppercase tracking-[0.2em]", style: {
                    color: ORANGE
                  }, children: [
                    p.num,
                    " lépés"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-extrabold mt-1 transition-colors group-hover:text-[hsl(43_98%_65%)]", children: p.title })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-black leading-none select-none hidden md:block", style: {
                  fontSize: "3.5rem",
                  color: "rgba(253,185,39,0.06)",
                  lineHeight: 1
                }, children: p.num })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] leading-relaxed mb-4", style: {
                color: "hsl(158 16% 58%)"
              }, children: p.desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold", style: {
                background: "rgba(253,185,39,0.07)",
                border: "1px solid rgba(253,185,39,0.15)",
                color: "hsl(43 98% 70%)"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
                " ",
                p.detail
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full", style: {
                background: `linear-gradient(90deg, ${ORANGE}, #10b981, transparent)`
              } })
            ] })
          ] }) }, p.num);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 550, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base mb-6", style: {
            color: "hsl(158 16% 55%)"
          }, children: [
            "Az első lépés ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: {
              color: "hsl(40 20% 97%)"
            }, children: "ingyenes" }),
            " és ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: {
              color: "hsl(40 20% 97%)"
            }, children: "kötelezettségmentes" }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+36309111474", className: "btn-hover glint cta-pulse inline-flex items-center justify-center gap-2.5 h-14 px-10 rounded-full text-base font-black no-underline", style: {
              background: ORANGE,
              color: "#04111f",
              boxShadow: "0 0 50px rgba(253,185,39,0.35)"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 17 }),
              " Hívjon most: +36 30 911 1474"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#kapcsolat", className: "btn-hover inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full text-sm font-semibold glass no-underline", style: {
              color: "hsl(40 20% 97%)"
            }, children: [
              "Inkább üzenetet küldök ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
            ] })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-20", style: {
      background: "linear-gradient(135deg, hsl(43 98% 52%), hsl(158 65% 38%))"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 21px)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-xs font-semibold uppercase tracking-[0.22em] mb-4", children: "Ingyenes tanácsadás · Gyors átfutás · 6 hónap garancia" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-black text-white", style: {
            lineHeight: 0.95
          }, children: [
            "Hibás a hidraulika?",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Mi megoldjuk."
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#kapcsolat", className: "btn-hover inline-flex items-center justify-center gap-2.5 h-14 px-10 rounded-full text-base font-bold no-underline", style: {
            background: "white",
            color: "hsl(158 80% 18%)",
            boxShadow: "0 14px 40px rgba(0,0,0,0.22)"
          }, children: [
            "Árajánlatot kérek ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+36309111474", className: "inline-flex items-center justify-center gap-2.5 h-14 px-10 rounded-full text-base font-bold text-white no-underline", style: {
            border: "2px solid rgba(255,255,255,0.38)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }),
            " +36 30 911 1474"
          ] })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "gyik", className: "py-28 relative", style: {
      background: BG2
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "Gyakori kérdések" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-5xl md:text-6xl mt-4 font-black", children: "Amit Önök kérdeznek." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4 max-w-5xl mx-auto", children: faq.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 50, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl overflow-hidden h-fit", style: {
        background: "hsl(158 58% 11%)",
        border: `1px solid ${openFaq === i ? "rgba(253,185,39,0.22)" : "rgba(255,255,255,0.06)"}`,
        transition: "border-color 0.25s ease"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full flex items-start justify-between gap-3 px-5 py-4 text-left cursor-pointer", style: {
          background: "none",
          border: "none",
          color: "inherit"
        }, onClick: () => setOpenFaq(openFaq === i ? null : i), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-start gap-3 text-sm font-semibold leading-snug pt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { size: 17, style: {
              color: ORANGE,
              flexShrink: 0,
              marginTop: 1
            } }),
            f.q
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 15, style: {
            color: openFaq === i ? ORANGE : "hsl(158 16% 45%)",
            flexShrink: 0,
            marginTop: 2,
            transform: openFaq === i ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease, color 0.2s ease"
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          maxHeight: openFaq === i ? 200 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.22,1,0.36,1)"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-5 pb-5 pl-10 text-sm leading-relaxed", style: {
          color: "hsl(158 16% 55%)"
        }, children: f.a }) })
      ] }) }, f.q)) })
    ] }) }),
    showScrollTop && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = "";
        document.body.style.scrollBehavior = "";
      });
    }, "aria-label": "Vissza a tetejére", className: "fixed right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer btn-hover", style: {
      bottom: showMobileCTA ? 88 : 24,
      transition: "bottom 0.3s cubic-bezier(0.22,1,0.36,1)",
      background: ORANGE,
      boxShadow: "0 4px 28px rgba(253,185,39,0.45)",
      border: "none",
      color: "white",
      animation: "card-in 0.3s cubic-bezier(0.22,1,0.36,1) both"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { size: 20 }) }),
    showMobileCTA && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden fixed left-0 right-0 z-40", style: {
      bottom: 0,
      transition: "bottom 0.3s cubic-bezier(0.22,1,0.36,1)",
      animation: "slide-up 0.35s cubic-bezier(0.22,1,0.36,1) both",
      background: "rgba(3,16,11,0.97)",
      backdropFilter: "blur(12px) saturate(1.5)",
      WebkitBackdropFilter: "blur(12px) saturate(1.5)",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "0 -8px 30px rgba(0,0,0,0.4)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 p-3", style: {
      paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+36309111474", className: "btn-hover flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl text-sm font-bold no-underline", style: {
        background: ORANGE,
        color: "#04111f"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 15 }),
        " Hívjon most"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#kapcsolat", className: "btn-hover flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl text-sm font-semibold text-white no-underline", style: {
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)"
      }, children: "Árajánlatot kérek" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "py-16 relative", style: {
      borderTop: "1px solid rgba(255,255,255,0.05)",
      background: "hsl(158 65% 3%)",
      paddingBottom: showMobileCTA ? "88px" : void 0
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start gap-12 mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full flex items-center justify-center", style: {
              background: "linear-gradient(135deg, hsl(43 98% 54%), #10b981)",
              boxShadow: "0 0 20px rgba(253,185,39,0.3)"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: "white",
              fontWeight: 900,
              fontSize: "1rem",
              lineHeight: 1
            }, children: "H" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold tracking-widest", children: [
              "hidraulika",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: ORANGE
              }, children: "javítás.hu" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed mb-4", style: {
            color: "hsl(158 16% 48%)"
          }, children: "Hidraulikus szivattyúk, motorok, hengerek és vezérlőblokkok javítása. Márkafüggetlen szakszerviz, országos futárszolgálattal." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-xs", style: {
            color: "hsl(158 16% 38%)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Hidraulika Service TEAM Kft." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Adószám: 32267509-2-43" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "1095 Budapest, Soroksári út 48" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.2em] mb-4", style: {
            color: "hsl(158 16% 36%)"
          }, children: "Navigáció" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, className: "text-sm no-underline transition-colors", style: {
            color: "hsl(158 16% 48%)"
          }, onMouseEnter: (e) => e.currentTarget.style.color = "hsl(40 20% 97%)", onMouseLeave: (e) => e.currentTarget.style.color = "hsl(158 16% 48%)", children: l.label }, l.href)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.2em] mb-4", style: {
            color: "hsl(158 16% 36%)"
          }, children: "Szolgáltatásaink" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: [{
            label: "Hidraulika hiba",
            href: "/hidraulika-hiba"
          }, {
            label: "Hidraulika javítás",
            href: "/#szolgaltatasok"
          }, {
            label: "Hidraulika szivattyú",
            href: "/hidraulika-szivattyu-hidromotor-munkahenger"
          }, {
            label: "Hidromotor",
            href: "/hidraulika-szivattyu-hidromotor-munkahenger"
          }, {
            label: "Hidraulikus munkahenger",
            href: "/hidraulika-szivattyu-hidromotor-munkahenger"
          }, {
            label: "Ingyenes tanácsadás",
            href: "/#kapcsolat"
          }, {
            label: "Országos futárszolgálat",
            href: "/#folyamat"
          }].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, className: "text-sm no-underline transition-colors", style: {
            color: "hsl(158 16% 48%)"
          }, onMouseEnter: (e) => e.currentTarget.style.color = "hsl(40 20% 97%)", onMouseLeave: (e) => e.currentTarget.style.color = "hsl(158 16% 48%)", children: l.label }, l.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [{
          icon: Phone,
          val: "+36 (30) 9111-474",
          href: "tel:+36309111474"
        }, {
          icon: Mail,
          val: "info@hidraulikajavitas.com",
          href: "mailto:info@hidraulikajavitas.com"
        }, {
          icon: MapPin,
          val: "1095 Budapest, Soroksári út 48",
          href: "#kapcsolat"
        }].map(({
          icon: Icon,
          val,
          href
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href, className: "flex items-center gap-3 text-sm no-underline", style: {
          color: "hsl(158 16% 48%)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 13, style: {
            color: ORANGE,
            flexShrink: 0
          } }),
          val
        ] }, val)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        height: 1,
        background: "rgba(255,255,255,0.05)",
        marginBottom: "2rem"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4 text-xs", style: {
        color: "rgba(255,255,255,0.2)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Hidraulika Service TEAM Kft. — hidraulikajavitas.com"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-6", children: [{
          label: "Adatvédelmi tájékoztató",
          href: "/adatkezeles"
        }, {
          label: "ÁSZF",
          href: "/aszf"
        }, {
          label: "Impresszum",
          href: "/impresszum"
        }].map(({
          label,
          href
        }) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, className: "no-underline transition-colors", style: {
          color: "rgba(255,255,255,0.2)"
        }, onMouseEnter: (e) => e.currentTarget.style.color = ORANGE, onMouseLeave: (e) => e.currentTarget.style.color = "rgba(255,255,255,0.2)", children: label }, label)) })
      ] })
    ] }) })
  ] });
}
export {
  Home as component
};
