import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-IypDjlhI.mjs";
import "../_libs/seroval.mjs";
import { S as Settings, a as Cog, G as Gauge, W as Wrench, P as Phone, X, M as Menu, b as ChevronRight, c as ShieldCheck, T as Truck, d as CircleCheck, e as ArrowUpRight, Z as Zap, f as PackageCheck, g as PhoneCall, h as Mail, i as MapPin, j as Clock, k as ClipboardCheck, l as ArrowRight, m as Star, n as Search, o as CircleQuestionMark, p as ArrowUp } from "../_libs/lucide-react.mjs";
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
  workshop1: "/images/workshop-1.jpg",
  workshop2: "/images/workshop-2.jpg",
  // hydraulic / industrial (stock fallbacks)
  pump: PX("3807319"),
  motor: PX("10733800"),
  cylinder: PX("5964745"),
  control: PX("4494653"),
  // heavy equipment / excavators
  excavator: PX("5125783"),
  excavator2: PX("5125782"),
  machines: PX("10421754"),
  loader: PX("28663727"),
  heavy: PX("30751525"),
  terrain: PX("33122153"),
  yellow: PX("10451774")
};
function Counter({
  to,
  suffix = ""
}) {
  const ref = reactExports.useRef(null);
  const [val, setVal] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      const dur = 1400, start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, {
      threshold: 0,
      rootMargin: "0px 0px -20px 0px"
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, children: [
    val,
    suffix
  ] });
}
function Chip({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.16em]", style: {
    background: "rgba(253,185,39,0.1)",
    border: "1px solid rgba(253,185,39,0.22)",
    color: "hsl(43 98% 65%)"
  }, children });
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
const marqueeItems = ["Hidraulika Javítás", "Szivattyú Felújítás", "Motor Javítás", "Henger Szerviz", "6 Hónap Garancia", "Ingyenes Tanácsadás", "Futárszolgálat", "Márkafüggetlen Szerviz", "Budapest · Országos"];
const services = [{
  icon: Settings,
  num: "01",
  title: "Szivattyú Javítás",
  desc: "Dugattyús, lamellás és fogaskerék hidraulikus szivattyúk teljes körű diagnózisa, javítása és felújítása. Minden gyártó termékéhez, gyári minőségű alkatrészekkel.",
  img: IMGS.pump,
  tags: ["Dugattyús", "Lamellás", "Fogaskerék"]
}, {
  icon: Cog,
  num: "02",
  title: "Motor Felújítás",
  desc: "Hidraulikus motorok szakszerű bevizsgálása, javítása és felújítása modern műhelyen. Gyors átfutás, írásos garancia, minden típushoz értjük.",
  img: IMGS.motor,
  tags: ["Radiális", "Axiális", "Orbitmotor"]
}, {
  icon: Gauge,
  num: "03",
  title: "Henger & Orbit",
  desc: "Hidraulikus hengerek tömítése, javítása és orbit motorok teljes körű felújítása. Minden méretben, minden nyomástartományban, prémium tömítésekkel.",
  img: IMGS.cylinder,
  tags: ["Tömítés csere", "Krómozás", "Felújítás"]
}, {
  icon: Wrench,
  num: "04",
  title: "Vezérlőblokk",
  desc: "Vezérlőblokkok és szelepek javítása, karbantartása és felülvizsgálata. Pontos bevizsgálás, írásos árajánlat és 6 hónap garancia minden elvégzett munkára.",
  img: IMGS.control,
  tags: ["Szelepek", "Blokkok", "Karbantartás"]
}];
const whyUs = [{
  icon: Zap,
  t: "24–48 óra — nem napok",
  d: "Amíg a konkurencia heteket vár, mi 24–48 óra alatt visszaadjuk a javított alkatrészt. Minden állásban töltött nap pénzbe kerül Önnek — mi ezt értjük."
}, {
  icon: CircleCheck,
  t: "Minden gyártó, minden típus",
  d: "Komatsu, Caterpillar, Bosch Rexroth, Parker, ZF, Liebherr, Kawasaki és minden más gyártó. Nem küldjük el azzal, hogy 'ezt nem vállaljuk'."
}, {
  icon: PackageCheck,
  t: "Csak gyári minőségű alkatrész",
  d: "Kizárólag gyári vagy gyári minőségű tömítéseket és alkatrészeket használunk. Olcsó utángyártott helyett tartós minőség — hogy ne kelljen hamar visszahozni."
}, {
  icon: ShieldCheck,
  t: "6 hónap írásos garancia",
  d: "Minden javításra 6 hónapos teljes körű, írásos garanciát vállalunk. Ha bármi probléma adódna a javított alkatrészen, ingyen és azonnal megoldjuk."
}, {
  icon: Truck,
  t: "Ingyenes oda-vissza futár",
  d: "Egy telefonhívás — és a futárunk megy Önhöz. Nem kell leállítani a munkát, nem kell személyesen leadni. Mi jövünk, mi visszük, mi visszahozzuk."
}, {
  icon: PhoneCall,
  t: "Azonnali, ingyenes tanácsadás",
  d: "Hívjon most! Műszaki tanácsadóink azonnal veszik a telefont és ingyenesen megmondják, mit kell tenni. Nem e-mail, nem várakozás — azonnali segítség."
}];
const brands = ["Komatsu", "Caterpillar", "Bosch Rexroth", "Parker", "Kawasaki", "ZF", "Liebherr", "Linde", "Sauer-Danfoss", "Vickers", "Eaton", "Hydromatik", "Leslie Hidraulika", "Ponar"];
const processSteps = [{
  icon: PhoneCall,
  num: "01",
  title: "Felhív minket",
  desc: "Telefonáljon a +36 30 911 1474-es számon! Műszaki tanácsadóink ingyenesen és kötelezettség nélkül segítenek azonosítani a hibát. Mondja el a gép típusát és a tünetet — megmondjuk, hogy tudunk-e segíteni, mennyi ideig tart és kb. mennyibe kerül.",
  detail: "Hétfő–Péntek 08:00–17:00"
}, {
  icon: Truck,
  num: "02",
  title: "Ingyenes futárt küldünk",
  desc: "Megegyezés után azonnal megszervezzük a szállítást. Futárunk kimegy az Ön telephelyére, átveszi a kiszerelt, hibás alkatrészt és gondoskodik a biztonságos csomagolásról. Az oda- és visszaszállítás díja nulla — ezt mi álljuk.",
  detail: "Általában másnap reggel"
}, {
  icon: ClipboardCheck,
  num: "03",
  title: "Ingyenes bevizsgálás",
  desc: "Műhelyünkbe érkezés után szakembereink alapos műszaki diagnózist végeznek. Feltárjuk a hiba pontos okát és mértékét, meghatározzuk a szükséges alkatrészeket. Ezután részletes, írásos árajánlatot küldünk — munkához csak az Ön jóváhagyása után fogunk.",
  detail: "Írásos árajánlat 24 órán belül"
}, {
  icon: Wrench,
  num: "04",
  title: "Szakszerű javítás",
  desc: "Modern CNC-vezérelt berendezéseinkkel, kizárólag gyári vagy gyári minőségű alkatrészekkel és tömítésekkel végezzük el a javítást. Minden munkafázist dokumentálunk, a javítást tesztelés követi. Átlagos átfutási idő: 24–48 óra az alkatrész beérkezésétől.",
  detail: "Átlag 24–48 óra átfutás"
}, {
  icon: PackageCheck,
  num: "05",
  title: "Visszaszállítás & garancia",
  desc: "A kész, szakszerűen tesztelt alkatrészt futárunk visszaszállítja az Ön által megadott helyszínre — akár közvetlenül a munkagéphez. A javításhoz 6 hónapos teljes körű, írásos garanciát biztosítunk. Ha bármi gond adódna, ingyen, azonnal megoldjuk.",
  detail: "6 hónap írásos garancia"
}];
const equipment = [{
  t: "Kotrógépek",
  img: IMGS.excavator
}, {
  t: "Traktorok & Kombájnok",
  img: IMGS.machines
}, {
  t: "Rakodók & Buldózerek",
  img: IMGS.loader
}, {
  t: "Dömperek & Grédek",
  img: IMGS.heavy
}, {
  t: "Erdészeti Gépek",
  img: IMGS.terrain
}, {
  t: "Aszfalt Marók & Tömörítők",
  img: IMGS.yellow
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
const countyMeta = {
  "Budapest": {
    tier: "kiemelt",
    eta: "2–4 óra",
    partners: 5
  },
  "Pest": {
    tier: "aktiv",
    eta: "3–6 óra",
    partners: 3
  },
  "Győr-Moson-Sopron": {
    tier: "aktiv",
    eta: "4–8 óra",
    partners: 2
  },
  "Vas": {
    tier: "aktiv",
    eta: "6–10 óra",
    partners: 1
  },
  "Zala": {
    tier: "aktiv",
    eta: "6–10 óra",
    partners: 1
  },
  "Somogy": {
    tier: "aktiv",
    eta: "5–9 óra",
    partners: 1
  },
  "Baranya": {
    tier: "aktiv",
    eta: "6–10 óra",
    partners: 2
  },
  "Tolna": {
    tier: "kiemelt",
    eta: "4–7 óra",
    partners: 2
  },
  "Fejér": {
    tier: "aktiv",
    eta: "4–7 óra",
    partners: 2
  },
  "Komárom-Esztergom": {
    tier: "aktiv",
    eta: "4–7 óra",
    partners: 2
  },
  "Veszprém": {
    tier: "aktiv",
    eta: "4–8 óra",
    partners: 1
  },
  "Bács-Kiskun": {
    tier: "aktiv",
    eta: "5–9 óra",
    partners: 2
  },
  "Csongrád-Csanád": {
    tier: "aktiv",
    eta: "6–10 óra",
    partners: 2
  },
  "Békés": {
    tier: "aktiv",
    eta: "7–12 óra",
    partners: 1
  },
  "Hajdú-Bihar": {
    tier: "kiemelt",
    eta: "5–9 óra",
    partners: 3
  },
  "Szabolcs-Sz-B": {
    tier: "aktiv",
    eta: "7–12 óra",
    partners: 1
  },
  "Jász-NK-Sz": {
    tier: "aktiv",
    eta: "5–9 óra",
    partners: 2
  },
  "Heves": {
    tier: "aktiv",
    eta: "5–9 óra",
    partners: 1
  },
  "Nógrád": {
    tier: "aktiv",
    eta: "5–9 óra",
    partners: 1
  },
  "Borsod-A-Z": {
    tier: "aktiv",
    eta: "6–11 óra",
    partners: 2
  }
};
function Home() {
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [showScrollTop, setShowScrollTop] = reactExports.useState(false);
  const [showMobileCTA, setShowMobileCTA] = reactExports.useState(false);
  const scrollTimerRef = reactExports.useRef(null);
  const navInnerRef = reactExports.useRef(null);
  const countyInfoRef = reactExports.useRef(null);
  const [selectedCounty, setSelectedCounty] = reactExports.useState(null);
  const [countySearch, setCountySearch] = reactExports.useState("");
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#top", className: "flex items-center gap-2.5 group pl-1 no-underline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105", style: {
            background: "linear-gradient(135deg, hsl(43 98% 54%), #10b981)",
            boxShadow: "0 0 22px rgba(253,185,39,0.45)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            color: "white",
            fontWeight: 900,
            fontSize: "1rem",
            lineHeight: 1
          }, children: "H" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[0.95rem] sm:text-[1.05rem] font-bold tracking-wider", style: {
            color: "hsl(40 20% 97%)"
          }, children: [
            "hidraulika",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: ORANGE
            }, children: "javítás.hu" })
          ] })
        ] }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 py-3 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full flex items-center justify-center", style: {
            background: "linear-gradient(135deg, hsl(43 98% 54%), #10b981)",
            boxShadow: "0 0 22px rgba(253,185,39,0.45)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            color: "white",
            fontWeight: 900,
            fontSize: "1.1rem",
            lineHeight: 1
          }, children: "H" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold tracking-wider", style: {
            color: "hsl(40 20% 97%)"
          }, children: [
            "hidraulika",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: ORANGE
            }, children: "javítás.hu" })
          ] })
        ] }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center pt-32 pb-40 px-6 md:px-10 lg:px-16 xl:px-20", children: [
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block mt-2", style: {
              fontSize: "clamp(1.1rem,3vw,2.2rem)",
              color: "rgba(250,244,230,0.28)",
              fontWeight: 800
            }, children: "AHOL A MINŐSÉG" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", style: {
              fontSize: "clamp(1.1rem,3vw,2.2rem)",
              color: "rgba(250,244,230,0.28)",
              fontWeight: 800
            }, children: "NEM ALKUKÉRDÉS." })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 140, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 h-0.5 w-14 rounded-full", style: {
            background: "linear-gradient(90deg, hsl(43 98% 54%), transparent)"
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-10 max-w-md text-base font-light leading-relaxed", style: {
            color: "hsl(158 16% 56%)"
          }, children: "Hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok teljes körű javítása — 6 hónap garanciával, országos futárszolgálattal." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#kapcsolat", className: "group glint cta-pulse relative inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full text-base font-semibold text-white no-underline w-full sm:w-auto", style: {
              background: ORANGE
            }, children: [
              "Kérek árajánlatot",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "transition-transform group-hover:translate-x-1" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+36309111474", className: "btn-hover inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full text-base font-semibold glass no-underline w-full sm:w-auto", style: {
              color: "hsl(40 20% 97%)"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }),
              " +36 30 911 1474"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: [{
            icon: ShieldCheck,
            label: "6 hónap garancia"
          }, {
            icon: Truck,
            label: "Ingyenes futár"
          }, {
            icon: CircleCheck,
            label: "100% minőség"
          }].map(({
            icon: Icon,
            label
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold", style: {
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "hsl(158 16% 65%)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 12, style: {
              color: ORANGE
            } }),
            " ",
            label
          ] }, label)) }) })
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden", style: {
              height: 180,
              border: "1px solid rgba(255,255,255,0.07)"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: IMGS.workshop2, alt: "Hidraulikus alkatrészek javítása", className: "w-full h-full object-cover", style: {
                filter: "saturate(0.7) contrast(1.15) brightness(0.8)"
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
                background: "linear-gradient(to top, rgba(4,20,14,0.6), transparent)"
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-3 text-xs font-bold uppercase tracking-wider", style: {
                color: "hsl(43 98% 64%)"
              }, children: "Szivattyú" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden", style: {
              height: 180,
              border: "1px solid rgba(255,255,255,0.07)"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: IMGS.excavator2, alt: "Hidraulikus munkagép", className: "w-full h-full object-cover", style: {
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 z-20 grid grid-cols-3", style: {
        background: "rgba(3,16,11,0.97)",
        backdropFilter: "blur(24px) saturate(1.8)",
        borderTop: "1px solid rgba(255,255,255,0.06)"
      }, children: [{
        to: 20,
        suffix: "+",
        label: "Év tapasztalat"
      }, {
        to: 5e3,
        suffix: "+",
        label: "Sikeres javítás"
      }, {
        to: 100,
        suffix: "%",
        label: "100% minőség"
      }].map(({
        to,
        suffix,
        label
      }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-4 sm:py-6 px-2 sm:px-4", style: {
        borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl sm:text-3xl md:text-4xl font-black stat-glow", style: {
          color: ORANGE,
          fontWeight: 900
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { to, suffix }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] sm:text-[10px] uppercase tracking-wide sm:tracking-widest mt-1 text-center", style: {
          color: "hsl(158 16% 50%)"
        }, children: label })
      ] }, label)) })
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "szolgaltatasok", className: "py-24 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.04] blur-[100px] pointer-events-none", style: {
        background: `radial-gradient(circle, ${ORANGE}, transparent 60%)`
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "Amit csinálunk" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-5xl md:text-6xl mt-4 font-black", children: "Szolgáltatásaink" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed max-w-xs md:text-right", style: {
            color: "hsl(158 16% 55%)"
          }, children: "Minden, ami hidraulika — egy helyen." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: services.map((s, i) => {
          const isEven = i % 2 === 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 60, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col lg:block rounded-3xl overflow-hidden", style: {
            background: "hsl(158 58% 9%)",
            border: "1px solid rgba(255,255,255,0.06)",
            minHeight: 320
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative overflow-hidden lg:absolute lg:inset-y-0 lg:w-5/12 ${isEven ? "lg:right-0" : "lg:left-0"}`, style: {
              minHeight: 260
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.img, alt: s.title, loading: "lazy", className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105", style: {
                filter: "saturate(0.72) contrast(1.12) brightness(0.85)"
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
                background: isEven ? "linear-gradient(to right, transparent, hsl(158 58% 9%) 95%)" : "linear-gradient(to left, transparent, hsl(158 58% 9%) 95%)"
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-5 left-5 font-black leading-none select-none", style: {
                fontSize: "5rem",
                color: "rgba(255,255,255,0.08)",
                fontWeight: 900
              }, children: s.num })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative z-10 flex flex-col justify-center p-8 lg:p-12 ${isEven ? "lg:w-7/12" : "lg:w-7/12 lg:ml-[41.667%]"}`, style: {
              minHeight: 320
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl flex items-center justify-center shrink-0", style: {
                  background: "rgba(253,185,39,0.12)",
                  border: "1px solid rgba(253,185,39,0.25)",
                  color: ORANGE
                }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { size: 20, strokeWidth: 1.5 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-[0.18em]", style: {
                  color: ORANGE
                }, children: s.num })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black mb-3 tracking-tight", children: s.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] leading-relaxed mb-6", style: {
                color: "hsl(158 16% 57%)"
              }, children: s.desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-7", children: s.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider", style: {
                background: "rgba(253,185,39,0.08)",
                border: "1px solid rgba(253,185,39,0.18)",
                color: "hsl(43 98% 65%)"
              }, children: tag }, tag)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#kapcsolat", className: "group inline-flex items-center gap-2 text-sm font-semibold no-underline w-fit", style: {
                color: ORANGE
              }, children: [
                "Árajánlatot kérek",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 15, className: "transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
              ] })
            ] })
          ] }) }, s.title);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-28 relative overflow-hidden", style: {
      background: BG2
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.18), transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "Előnyeink" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-5 font-black leading-none", style: {
              fontSize: "clamp(2.6rem,6vw,4.5rem)"
            }, children: [
              "Leállt a hidraulika?",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: ORANGE
              }, children: "Ma megoldjuk." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base leading-relaxed max-w-xl", style: {
              color: "hsl(158 16% 60%)"
            }, children: "Nem kell napokat várni, nem kell furikázni a városban. Egy telefonhívás — és az Ön gépje ismét dolgozik. 20 éves tapasztalat, 5000+ sikeres javítás, írásos garancia." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 rounded-3xl p-6 text-center min-w-60", style: {
            background: "linear-gradient(135deg, rgba(16,185,129,0.35), rgba(16,185,129,0.12))",
            border: "1px solid rgba(253,185,39,0.3)",
            boxShadow: "0 0 60px rgba(16,185,129,0.25)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] mb-3", style: {
              color: "hsl(158 16% 55%)"
            }, children: "Hívjon most — ingyen!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+36309111474", className: "glint cta-pulse block rounded-2xl py-4 px-6 text-center no-underline mb-3", style: {
              background: ORANGE,
              color: "#04111f"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18, className: "inline mr-2 mb-0.5", style: {
                color: "#04111f"
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-black", children: "+36 30 911 1474" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-xs", style: {
              color: "hsl(158 16% 50%)"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full inline-block", style: {
                background: "#4ade80",
                animation: "pulse-glow 2s ease-in-out infinite"
              } }),
              "Hétfő–Péntek 08:00–17:00"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10", children: whyUs.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 55, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative rounded-3xl p-7 h-full flex flex-col project-card-hover cursor-default", style: {
          background: "hsl(158 58% 10%)",
          border: "1px solid rgba(255,255,255,0.07)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110", style: {
              background: "linear-gradient(135deg, rgba(253,185,39,0.18), rgba(16,185,129,0.18))",
              border: "1px solid rgba(253,185,39,0.25)",
              color: ORANGE
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { size: 22, strokeWidth: 1.4 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 15, className: "mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300", style: {
              color: ORANGE
            } })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[1.05rem] font-extrabold mb-2 transition-colors duration-200 group-hover:text-[hsl(43_98%_65%)]", children: f.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed flex-1", style: {
            color: "hsl(158 16% 58%)"
          }, children: f.d }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full", style: {
            background: `linear-gradient(90deg, ${ORANGE}, #10b981, transparent)`
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none", style: {
            boxShadow: "inset 0 0 0 1px rgba(253,185,39,0.18)"
          } })
        ] }) }, f.t)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden", style: {
          background: "linear-gradient(135deg, #10b981, hsl(158 65% 8%))",
          border: "1px solid rgba(253,185,39,0.22)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
            backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 18px,rgba(0,0,0,0.06) 18px,rgba(0,0,0,0.06) 19px)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-[0.22em] mb-2", style: {
              color: "rgba(253,185,39,0.7)"
            }, children: "Ne várjon tovább!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl md:text-2xl font-black text-white", children: "Kérjen ingyenes telefonos tanácsadást — most, azonnal." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 shrink-0 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+36309111474", className: "btn-hover glint inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-full text-base font-black no-underline", style: {
              background: ORANGE,
              color: "#04111f",
              boxShadow: "0 0 40px rgba(253,185,39,0.4)"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }),
              " +36 30 911 1474"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#kapcsolat", className: "btn-hover inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-sm font-semibold text-white no-underline", style: {
              border: "1.5px solid rgba(253,185,39,0.4)"
            }, children: [
              "Árajánlatot kérek ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
            ] })
          ] })
        ] }) })
      ] })
    ] }),
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
              icon: Clock,
              t: "24–48 órás átfutás",
              d: "Az alkatrész beérkezésétől a kész javításig."
            }, {
              icon: ShieldCheck,
              t: "6 hónap garancia",
              d: "Minden elvégzett munkára, írásban."
            }, {
              icon: Truck,
              t: "Oda-vissza futár",
              d: "Az egész országból, a mi szervezésünkben."
            }, {
              icon: PhoneCall,
              t: "Ingyenes tanácsadás",
              d: "Hívjon most, első lépés kötelezettségmentes."
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
            "12 vezető gyártó.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: ORANGE
            }, children: "Egy megbízható szerviz." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed", style: {
            color: "hsl(158 16% 55%)"
          }, children: "Nem érdekli, melyik gyártó névtábláját viseli a gép — ha hidraulika, mi megjavítjuk. Komatsu, Caterpillar, Bosch Rexroth vagy bármi más." }),
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
      }, children: [...brands, ...brands, ...brands, ...brands].map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-4 px-6", style: {
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
      }, children: [...brands, ...brands, ...brands, ...brands].map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-4 px-6", style: {
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
          }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden flex items-center justify-center px-6 py-4", style: {
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
            "Egyszerű. Gyors.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: ORANGE
            }, children: "Kényelmes." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base leading-relaxed", style: {
            color: "hsl(158 16% 55%)"
          }, children: "A hiba felmerülésétől a megjavított alkatrész visszaszereléséig komplett megoldást nyújtunk — mindössze egyetlen telefonhívással elindítja az egész folyamatot." }),
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-28 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "Megmunkált gépek" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-5xl md:text-6xl mt-4 font-black", children: [
            "Hidraulika",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "minden géphez."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#kapcsolat", className: "btn-hover inline-flex items-center gap-2 h-10 px-6 rounded-full text-sm font-medium glass no-underline shrink-0", style: {
          color: "hsl(40 20% 97%)"
        }, children: [
          "Árajánlatot kérek ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4", children: [{
        ...equipment[0],
        colSpan: "md:col-span-2",
        h: 300
      }, {
        ...equipment[1],
        colSpan: "md:col-span-1",
        h: 300
      }, {
        ...equipment[2],
        colSpan: "md:col-span-1",
        h: 300
      }, {
        ...equipment[3],
        colSpan: "md:col-span-1",
        h: 300
      }, {
        ...equipment[4],
        colSpan: "md:col-span-1",
        h: 300
      }, {
        ...equipment[5],
        colSpan: "md:col-span-2",
        h: 300
      }].map((eq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 55, className: eq.colSpan, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#kapcsolat", className: "group relative rounded-3xl overflow-hidden cursor-pointer project-card-hover no-underline block", style: {
        height: eq.h,
        border: "1px solid rgba(255,255,255,0.06)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: eq.img, alt: eq.t, loading: "lazy", className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]", style: {
          filter: "saturate(0.75) contrast(1.08) brightness(0.82)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 25%, transparent 65%)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider", style: {
          background: "#FDB927",
          color: "#04111f",
          backdropFilter: "blur(8px)"
        }, children: "Hidraulika szerviz" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-5 bottom-5 flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white", children: eq.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glass w-9 h-9 rounded-full grid place-items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none", style: {
          boxShadow: "inset 0 0 0 1.5px rgba(253,185,39,0.4)"
        } })
      ] }) }, eq.t)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "velemenyek", className: "py-28 relative", style: {
      background: BG2
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-96 h-96 rounded-full opacity-[0.04] blur-[100px] pointer-events-none", style: {
        background: `radial-gradient(circle, ${ORANGE}, transparent 60%)`
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "Ügyfeleink mondják" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-5xl md:text-6xl mt-4 font-black", children: "Amit rólunk mondanak." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", style: {
            color: "hsl(158 16% 50%)"
          }, children: [
            Array.from({
              length: 5
            }).map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16, fill: "hsl(43 98% 54%)", color: "hsl(43 98% 54%)" }, k)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-sm font-semibold", children: "5.0" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 relative rounded-3xl p-8 md:p-12 overflow-hidden", style: {
          background: "hsl(158 58% 11%)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderTop: "2px solid rgba(253,185,39,0.4)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-8 right-8 font-black leading-none select-none", style: {
            fontSize: "12rem",
            color: "rgba(253,185,39,0.05)",
            fontWeight: 900
          }, "aria-hidden": true, children: '"' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-6", children: Array.from({
            length: 5
          }).map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16, fill: "hsl(43 98% 54%)", color: "hsl(43 98% 54%)" }, k)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl md:text-2xl font-medium leading-relaxed mb-8 max-w-3xl", style: {
            color: "rgba(250,244,230,0.88)"
          }, children: [
            '"',
            testimonials[0].text,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white", style: {
              background: "linear-gradient(135deg, hsl(43 98% 54%), #065f46)"
            }, children: testimonials[0].name.split(" ").map((n) => n[0]).join("") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: testimonials[0].name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest font-medium", style: {
                color: "hsl(43 98% 58%)"
              }, children: testimonials[0].role })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-4", children: testimonials.slice(1).map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-review rounded-2xl p-6 flex flex-col relative overflow-hidden", style: {
          borderTop: "2px solid rgba(253,185,39,0.22)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-4", children: Array.from({
            length: 5
          }).map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 12, fill: "hsl(43 98% 54%)", color: "hsl(43 98% 54%)" }, k)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm leading-relaxed flex-1 mb-5", style: {
            color: "rgba(250,244,230,0.75)"
          }, children: [
            '"',
            t.text,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-4", style: {
            borderTop: "1px solid rgba(255,255,255,0.06)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0", style: {
              background: "linear-gradient(135deg, hsl(43 98% 54%), #065f46)"
            }, children: t.name.split(" ").map((n) => n[0]).join("") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: t.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest font-medium", style: {
                color: "hsl(43 98% 58%)"
              }, children: t.role })
            ] })
          ] })
        ] }) }, t.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "csapat", className: "py-28 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-full h-full pointer-events-none", style: {
        background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(16,185,129,0.12), transparent 65%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.05] blur-[110px] pointer-events-none", style: {
        background: `radial-gradient(circle, ${ORANGE}, transparent 60%)`
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "A csapat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 font-black leading-none", style: {
              fontSize: "clamp(2.6rem,6vw,4.5rem)"
            }, children: [
              "A szakemberek,",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: ORANGE
              }, children: "akik megoldják." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-xs text-base leading-relaxed", style: {
            color: "hsl(158 16% 55%)"
          }, children: "20 év tapasztalat és 5000+ sikeres javítás — és minden mögött egy személyes felelősségvállalás áll." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1.1fr_1fr] gap-5 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl flex flex-col p-7 md:p-8", style: {
            minHeight: 440,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "hsl(158 58% 9%)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none rounded-3xl", style: {
              background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(253,185,39,0.06), transparent 70%)"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest", style: {
              background: "rgba(253,185,39,0.13)",
              border: "1px solid rgba(253,185,39,0.32)",
              color: ORANGE
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(OrangeDot, {}),
              " Hidraulika Service TEAM Kft."
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/logo.svg", alt: "Hidraulika Service TEAM", className: "w-full max-w-[260px] opacity-95" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl font-black mb-2 tracking-tight", children: "Poós Gábor & Andréka Ferenc" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed mb-6 max-w-sm", style: {
                color: "hsl(158 16% 62%)"
              }, children: "Két évtized alatt felépítettük Magyarország egyik legmegbízhatóbb hidraulika szervizét. Minden javítás mögött személyes felelősségvállalás áll — ez nem marketing szöveg, ez a garancia." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-6", children: [{
                val: "20+",
                label: "év tapasztalat"
              }, {
                val: "5000+",
                label: "sikeres javítás"
              }, {
                val: "6 hó",
                label: "garancia"
              }].map(({
                val,
                label
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-black", style: {
                  color: ORANGE
                }, children: val }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider mt-0.5", style: {
                  color: "hsl(158 16% 44%)"
                }, children: label })
              ] }, label)) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: [{
            name: "Poós Gábor",
            role: "Alapító & Műszaki Vezető",
            photo: "/images/poos-gabor.png",
            years: "20+",
            bio: "A vállalkozás megalapítója és műszaki irányítója. Karrierje kezdetétől fogva hidraulikus rendszerekkel foglalkozik — szivattyúktól a komplex vezérlőblokkokig mindent kézbe vett már. A legbonyolultabb esetekben is személyesen avatkozik be.",
            tags: ["Szivattyú diagnosztika", "Vezérlőblokk", "Projekttervezés"]
          }, {
            name: "Andréka Ferenc",
            role: "Vezető Hidraulika Szerelő",
            photo: "/images/andreka-ferenc.png",
            years: "15+",
            bio: "A műhely lelke — napi szinten foglalkozik hidraulikus alkatrészek szétszedésével, javításával és összerakásával. Pontossága és tapasztalata garantálja, hogy az átvett alkatrész hibátlanul kerüljön vissza a gépre.",
            tags: ["Motor felújítás", "Henger tömítés", "Minőségellenőrzés"]
          }].map((person, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 100, className: "flex-1 flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative rounded-3xl p-7 flex flex-col project-card-hover overflow-hidden h-full", style: {
            background: "hsl(158 58% 9%)",
            border: "1px solid rgba(255,255,255,0.07)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-2 -top-2 font-black leading-none select-none pointer-events-none", style: {
              fontSize: "7rem",
              color: "rgba(253,185,39,0.03)",
              fontWeight: 900
            }, children: String(i + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-5 relative z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full shrink-0 overflow-hidden", style: {
                boxShadow: "0 0 24px rgba(253,185,39,0.35)",
                border: "2.5px solid rgba(253,185,39,0.45)"
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: person.photo, alt: person.name, className: "w-full h-full object-cover" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[1.1rem] font-extrabold tracking-tight mb-1 transition-colors duration-200 group-hover:text-[hsl(43_98%_65%)]", children: person.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.16em]", style: {
                  color: ORANGE
                }, children: person.role })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-center px-3 py-2 rounded-xl", style: {
                background: "rgba(253,185,39,0.07)",
                border: "1px solid rgba(253,185,39,0.16)"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-black leading-none", style: {
                  color: ORANGE
                }, children: person.years }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest mt-0.5", style: {
                  color: "hsl(158 16% 43%)"
                }, children: "év" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed mb-5 flex-1 relative z-10", style: {
              color: "hsl(158 16% 57%)"
            }, children: person.bio }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 relative z-10", children: person.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider", style: {
              background: "rgba(253,185,39,0.07)",
              border: "1px solid rgba(253,185,39,0.14)",
              color: "hsl(43 98% 62%)"
            }, children: tag }, tag)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out", style: {
              background: `linear-gradient(90deg, ${ORANGE}, #10b981, transparent)`
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none", style: {
              boxShadow: "inset 0 0 0 1px rgba(253,185,39,0.16)"
            } })
          ] }) }, person.name)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden p-8 md:p-12", style: {
          background: "hsl(158 58% 9%)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderTop: "2px solid rgba(253,185,39,0.35)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-8 right-8 font-black leading-none select-none pointer-events-none", style: {
            fontSize: "12rem",
            color: "rgba(253,185,39,0.04)",
            fontWeight: 900
          }, "aria-hidden": true, children: '"' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none opacity-[0.015]", style: {
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 18px, white 18px, white 19px)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.24em] mb-4", style: {
                color: ORANGE
              }, children: "A filozófiánk" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl md:text-2xl font-bold leading-relaxed", style: {
                color: "rgba(250,244,230,0.9)"
              }, children: '"Nem adjuk ki addig a kezünkből a munkát, amíg nem vagyunk biztosak abban, hogy az alkatrész hibátlanul működik — és ezt 6 hónap garanciával is vállaljuk."' }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white", style: {
                  background: "linear-gradient(135deg, hsl(43 98% 54%), #10b981)"
                }, children: "PG" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", style: {
                  color: "hsl(158 16% 52%)"
                }, children: "Poós Gábor, alapító" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+36309111474", className: "btn-hover glint inline-flex items-center justify-center gap-2.5 rounded-full text-sm font-bold no-underline", style: {
                background: ORANGE,
                color: "#04111f",
                boxShadow: "0 0 40px rgba(253,185,39,0.3)",
                height: "3.25rem",
                paddingLeft: "2rem",
                paddingRight: "2rem"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 15 }),
                " Hívjon minket"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#kapcsolat", className: "btn-hover inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold text-white no-underline", style: {
                border: "1.5px solid rgba(253,185,39,0.3)",
                height: "3.25rem",
                paddingLeft: "2rem",
                paddingRight: "2rem"
              }, children: [
                "Árajánlatot kérek ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
              ] })
            ] })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-28 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:sticky lg:top-28", children: [
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
        }, children: "Futárszolgálatunkkal Magyarország minden pontjáról átvesszük a javítandó hidraulikus alkatrészt és visszaszállítjuk a kész munkát." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [{
          icon: Clock,
          t: "Gyors kiszállás",
          d: "Bárhol az országban"
        }, {
          icon: Truck,
          t: "Saját futár",
          d: "Oda- és visszaszállítás"
        }, {
          icon: MapPin,
          t: "20 megye",
          d: "Teljes lefedettség"
        }, {
          icon: Phone,
          t: "Ingyenes tanácsadás",
          d: "Telefonon, azonnal"
        }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-4", style: {
          background: "rgba(253,185,39,0.06)",
          border: "1px solid rgba(253,185,39,0.12)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { size: 15, style: {
            color: ORANGE,
            marginBottom: 6
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: b.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] mt-0.5", style: {
            color: "hsl(158 16% 50%)"
          }, children: b.d })
        ] }, b.t)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-10 rounded-full opacity-[0.1] blur-[80px] pointer-events-none", style: {
          background: `radial-gradient(circle, ${ORANGE}, transparent 60%)`
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] mb-4", style: {
          color: "hsl(158 16% 40%)"
        }, children: "Lefedett megyék — mind a 20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 13, className: "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none", style: {
            color: "hsl(158 16% 40%)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Keresse meg a megyéjét...", value: countySearch, onChange: (e) => {
            setCountySearch(e.target.value);
            setSelectedCounty(null);
          }, className: "w-full rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none transition-[border-color] duration-200 ease-out", style: {
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "hsl(40 20% 97%)"
          }, onFocus: (e) => {
            e.currentTarget.style.borderColor = "rgba(253,185,39,0.4)";
          }, onBlur: (e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-2", children: counties.map((c) => {
          const meta = countyMeta[c];
          const isSelected = selectedCounty === c;
          const isKiemelt = meta?.tier === "kiemelt";
          const isFiltered = countySearch && !c.toLowerCase().includes(countySearch.toLowerCase());
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            const next = isSelected ? null : c;
            setSelectedCounty(next);
            if (next) {
              setTimeout(() => {
                countyInfoRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest"
                });
              }, 60);
            }
          }, className: "rounded-xl px-3 py-2.5 text-center text-xs font-medium transition-[background-color,border-color,color,transform,box-shadow,opacity] duration-200 ease-out cursor-pointer", style: {
            background: isSelected ? "rgba(253,185,39,0.22)" : isKiemelt ? "rgba(253,185,39,0.1)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${isSelected ? "rgba(253,185,39,0.55)" : isKiemelt ? "rgba(253,185,39,0.28)" : "rgba(255,255,255,0.06)"}`,
            color: isSelected ? "hsl(43 98% 72%)" : isKiemelt ? "hsl(43 98% 62%)" : "hsl(158 16% 60%)",
            opacity: isFiltered ? 0.15 : 1,
            transform: isSelected ? "scale(1.04)" : "scale(1)",
            boxShadow: isSelected ? "0 0 18px rgba(253,185,39,0.22)" : "none"
          }, children: c }, c);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: countyInfoRef, className: "overflow-hidden transition-[max-height,opacity] duration-300 ease-out", style: {
          maxHeight: selectedCounty ? 220 : 0,
          opacity: selectedCounty ? 1 : 0
        }, children: selectedCounty && countyMeta[selectedCounty] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3", style: {
          background: "rgba(253,185,39,0.08)",
          border: "1px solid rgba(253,185,39,0.2)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 17, style: {
            color: ORANGE,
            flexShrink: 0
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold truncate", children: selectedCounty }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mt-0.5", style: {
              color: "hsl(158 16% 60%)"
            }, children: [
              "Becsült kiszállás: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: "hsl(43 98% 62%)"
              }, children: countyMeta[selectedCounty].eta }),
              " · ",
              countyMeta[selectedCounty].partners,
              " helyi partner  · ",
              countyMeta[selectedCounty].tier === "kiemelt" ? "Kiemelt hálózat" : "Aktív lefedettség"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#kapcsolat", className: "shrink-0 inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-xs font-semibold text-white no-underline", style: {
            background: ORANGE,
            boxShadow: "0 0 20px rgba(253,185,39,0.28)"
          }, children: [
            "Ajánlatot kérek ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs", style: {
          color: "hsl(158 16% 40%)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-sm inline-block", style: {
              background: "rgba(253,185,39,0.5)",
              border: "1px solid rgba(253,185,39,0.5)"
            } }),
            "Kiemelt hálózat"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-sm inline-block", style: {
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)"
            } }),
            "Aktív lefedettség"
          ] })
        ] })
      ] }) })
    ] }) }) }),
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
