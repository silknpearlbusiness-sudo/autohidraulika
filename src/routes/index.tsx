import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Phone,
  Truck,
  PhoneCall,
  ClipboardCheck,
  Wrench,
  PackageCheck,
  Star,
  Mail,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  HelpCircle,
  Gauge,
  Zap,
  ChevronRight,
  Menu,
  X,
  Search,
  ArrowUp,
  Settings,
  Cog,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useClickSound } from "@/lib/useClickSound";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hidraulika Javítás Budapest | Szivattyú, Motor, Henger Felújítás — 6 Hónap Garancia" },
      {
        name: "description",
        content:
          "Hidraulika javítás Budapesten és országosan: hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok szakszerű felújítása. Márkafüggetlen szerviz, 24–48 órás átfutás, 6 hónap garancia, ingyenes országos futárszolgálat. Hívjon: +36 30 911 1474",
      },
      {
        name: "keywords",
        content:
          "hidraulika javítás, hidraulika javítás Budapest, hidraulikus szivattyú javítás, hidraulikus motor javítás, hidraulikus henger javítás, hidraulika henger felújítás, orbit motor javítás, vezérlőblokk javítás, hidraulika szerviz, hidraulika felújítás, munkagép hidraulika javítás, kotrógép hidraulika, dugattyús szivattyú javítás, fogaskerék szivattyú, axiális motor, márkafüggetlen hidraulika szerviz, Bosch Rexroth javítás, Komatsu hidraulika, Caterpillar hidraulika, Parker szivattyú",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "author", content: "Hidraulika Service TEAM Kft." },
      { name: "language", content: "Hungarian" },
      { name: "geo.region", content: "HU-BU" },
      { name: "geo.placename", content: "Budapest" },
      { name: "geo.position", content: "47.4669;19.0744" },
      { name: "ICBM", content: "47.4669, 19.0744" },

      { property: "og:title", content: "Hidraulika Javítás Budapest | Hidraulika Service TEAM Kft." },
      { property: "og:description", content: "Hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok márkafüggetlen javítása. 24–48 órás átfutás, 6 hónap garancia, ingyenes országos futárszolgálat." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.hidraulikajavitas.com/" },
      { property: "og:site_name", content: "Hidraulika Service TEAM Kft." },
      { property: "og:locale", content: "hu_HU" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Hidraulika Javítás Budapest | Hidraulika Service TEAM Kft." },
      { name: "twitter:description", content: "Márkafüggetlen hidraulika szerviz — szivattyú, motor, henger, vezérlőblokk. 6 hónap garancia, országos futár." },
    ],
    links: [
      { rel: "canonical", href: "https://www.hidraulikajavitas.com/" },
    ],
  }),
  component: Home,
});

// ── Images — verified Pexels CDN (hotlinking allowed) ────
const PX = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop`;

const IMGS = {
  // hydraulic / industrial
  pump:      PX("3807319"),
  motor:     PX("10733800"),
  cylinder:  PX("5964745"),
  control:   PX("4494653"),
  // heavy equipment / excavators
  excavator: PX("5125783"),
  excavator2:PX("5125782"),
  excavator3:PX("4523602"),
  machines:  PX("10421754"),
  loader:    PX("28663727"),
  heavy:     PX("30751525"),
  terrain:   PX("33122153"),
  yellow:    PX("10451774"),
};

// ── Shared components ────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      const dur = 1800, start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.16em]"
      style={{ background: "rgba(253,185,39,0.1)", border: "1px solid rgba(253,185,39,0.22)", color: "hsl(43 98% 65%)" }}>
      {children}
    </span>
  );
}

function OrangeDot() {
  return (
    <span className="w-1.5 h-1.5 rounded-full inline-block"
      style={{ background: "hsl(43 98% 54%)", animation: "pulse-glow 2s ease-in-out infinite" }} />
  );
}

// ── Data ────────────────────────────────────────────────
const navLinks = [
  { href: "#szolgaltatasok", label: "Szolgáltatások" },
  { href: "#folyamat", label: "Folyamat" },
  { href: "#velemenyek", label: "Vélemények" },
  { href: "#gyik", label: "GYIK" },
  { href: "#kapcsolat", label: "Kapcsolat" },
];

const marqueeItems = [
  "Hidraulika Javítás", "Szivattyú Felújítás", "Motor Javítás",
  "Henger Szerviz", "6 Hónap Garancia", "Ingyenes Tanácsadás",
  "Futárszolgálat", "Márkafüggetlen Szerviz", "Budapest · Országos",
];

const services = [
  {
    icon: Settings,
    num: "01",
    title: "Szivattyú Javítás",
    desc: "Dugattyús, lamellás és fogaskerék hidraulikus szivattyúk teljes körű diagnózisa, javítása és felújítása. Minden gyártó termékéhez, gyári minőségű alkatrészekkel.",
    img: IMGS.pump,
    tags: ["Dugattyús", "Lamellás", "Fogaskerék"],
  },
  {
    icon: Cog,
    num: "02",
    title: "Motor Felújítás",
    desc: "Hidraulikus motorok szakszerű bevizsgálása, javítása és felújítása modern műhelyen. Gyors átfutás, írásos garancia, minden típushoz értjük.",
    img: IMGS.motor,
    tags: ["Radiális", "Axiális", "Orbitmotor"],
  },
  {
    icon: Gauge,
    num: "03",
    title: "Henger & Orbit",
    desc: "Hidraulikus hengerek tömítése, javítása és orbit motorok teljes körű felújítása. Minden méretben, minden nyomástartományban, prémium tömítésekkel.",
    img: IMGS.cylinder,
    tags: ["Tömítés csere", "Krómozás", "Felújítás"],
  },
  {
    icon: Wrench,
    num: "04",
    title: "Vezérlőblokk",
    desc: "Vezérlőblokkok és szelepek javítása, karbantartása és felülvizsgálata. Pontos bevizsgálás, írásos árajánlat és 6 hónap garancia minden elvégzett munkára.",
    img: IMGS.control,
    tags: ["Szelepek", "Blokkok", "Karbantartás"],
  },
];

const whyUs = [
  { icon: Zap,          t: "24–48 óra — nem napok",         d: "Amíg a konkurencia heteket vár, mi 24–48 óra alatt visszaadjuk a javított alkatrészt. Minden állásban töltött nap pénzbe kerül Önnek — mi ezt értjük." },
  { icon: CheckCircle2, t: "Minden gyártó, minden típus",    d: "Komatsu, Caterpillar, Bosch Rexroth, Parker, ZF, Liebherr, Kawasaki és minden más gyártó. Nem küldjük el azzal, hogy 'ezt nem vállaljuk'." },
  { icon: PackageCheck, t: "Csak gyári minőségű alkatrész",  d: "Kizárólag gyári vagy gyári minőségű tömítéseket és alkatrészeket használunk. Olcsó utángyártott helyett tartós minőség — hogy ne kelljen hamar visszahozni." },
  { icon: ShieldCheck,  t: "6 hónap írásos garancia",        d: "Minden javításra 6 hónapos teljes körű, írásos garanciát vállalunk. Ha bármi probléma adódna a javított alkatrészen, ingyen és azonnal megoldjuk." },
  { icon: Truck,        t: "Ingyenes oda-vissza futár",      d: "Egy telefonhívás — és a futárunk megy Önhöz. Nem kell leállítani a munkát, nem kell személyesen leadni. Mi jövünk, mi visszük, mi visszahozzuk." },
  { icon: PhoneCall,    t: "Azonnali, ingyenes tanácsadás",  d: "Hívjon most! Műszaki tanácsadóink azonnal veszik a telefont és ingyenesen megmondják, mit kell tenni. Nem e-mail, nem várakozás — azonnali segítség." },
];

const brands = [
  "Komatsu", "Caterpillar", "Bosch Rexroth", "Parker", "Kawasaki",
  "ZF", "Liebherr", "Linde", "Sauer-Danfoss", "Vickers", "Eaton", "Hydromatik",
];

const processSteps = [
  {
    icon: PhoneCall, num: "01", title: "Felhív minket",
    desc: "Telefonáljon a +36 30 911 1474-es számon! Műszaki tanácsadóink ingyenesen és kötelezettség nélkül segítenek azonosítani a hibát. Mondja el a gép típusát és a tünetet — megmondjuk, hogy tudunk-e segíteni, mennyi ideig tart és kb. mennyibe kerül.",
    detail: "Hétfő–Péntek 08:00–17:00",
  },
  {
    icon: Truck, num: "02", title: "Ingyenes futárt küldünk",
    desc: "Megegyezés után azonnal megszervezzük a szállítást. Futárunk kimegy az Ön telephelyére, átveszi a kiszerelt, hibás alkatrészt és gondoskodik a biztonságos csomagolásról. Az oda- és visszaszállítás díja nulla — ezt mi álljuk.",
    detail: "Általában másnap reggel",
  },
  {
    icon: ClipboardCheck, num: "03", title: "Ingyenes bevizsgálás",
    desc: "Műhelyünkbe érkezés után szakembereink alapos műszaki diagnózist végeznek. Feltárjuk a hiba pontos okát és mértékét, meghatározzuk a szükséges alkatrészeket. Ezután részletes, írásos árajánlatot küldünk — munkához csak az Ön jóváhagyása után fogunk.",
    detail: "Írásos árajánlat 24 órán belül",
  },
  {
    icon: Wrench, num: "04", title: "Szakszerű javítás",
    desc: "Modern CNC-vezérelt berendezéseinkkel, kizárólag gyári vagy gyári minőségű alkatrészekkel és tömítésekkel végezzük el a javítást. Minden munkafázist dokumentálunk, a javítást tesztelés követi. Átlagos átfutási idő: 24–48 óra az alkatrész beérkezésétől.",
    detail: "Átlag 24–48 óra átfutás",
  },
  {
    icon: PackageCheck, num: "05", title: "Visszaszállítás & garancia",
    desc: "A kész, szakszerűen tesztelt alkatrészt futárunk visszaszállítja az Ön által megadott helyszínre — akár közvetlenül a munkagéphez. A javításhoz 6 hónapos teljes körű, írásos garanciát biztosítunk. Ha bármi gond adódna, ingyen, azonnal megoldjuk.",
    detail: "6 hónap írásos garancia",
  },
];

const equipment = [
  { t: "Kotrógépek",                img: IMGS.excavator  },
  { t: "Traktorok & Kombájnok",     img: IMGS.machines   },
  { t: "Rakodók & Buldózerek",      img: IMGS.loader     },
  { t: "Dömperek & Grédek",         img: IMGS.heavy      },
  { t: "Erdészeti Gépek",           img: IMGS.terrain    },
  { t: "Aszfalt Marók & Tömörítők", img: IMGS.yellow     },
];

const testimonials = [
  { name: "K. Péter",   role: "Debrecen",  text: "Gyors, precíz munka. A hidraulikus szivattyút 48 óra alatt megjavították és visszaszállították. Kiváló szolgáltatás, melegen ajánlom mindenkinek!" },
  { name: "N. László",  role: "Budapest",  text: "Korrekt kommunikáció, pontos árajánlat, határidőre elkészülő munka. A hidraulikus hengerünket tökéletesen megjavították. Köszönöm a csapatnak!" },
  { name: "F. Gábor",   role: "Eger",      text: "Megbízható szakszerviz. Már másodszor bízzuk rájuk a munkagépünk hidraulikus rendszerének javítását. Mindig elégedett vagyunk." },
  { name: "T. Imre",    role: "Győr",      text: "A vezérlőblokkot pontosan diagnosztizálták és sikeresen megjavították. Profi csapat, kiváló minőség. Legközelebb is csak ide jövünk." },
];

const faq = [
  { q: "Milyen hidraulikus alkatrészeket javítanak?", a: "Hidraulikus szivattyúkat (dugattyús, lamellás, fogaskerék), motorokat, hengereket, orbit motorokat és vezérlőblokkokat. Márkafüggetlenül: Komatsu, Caterpillar, Bosch Rexroth, Parker, Kawasaki, ZF, Liebherr és más gyártók termékeit is javítjuk." },
  { q: "Mennyi idő alatt készül el a hidraulika javítás?", a: "Az alkatrész beérkezésétől számítva átlagosan 24-48 órán belül elvégezzük a javítást. Összetettebb hibáknál ez hosszabb lehet — erről minden esetben előre tájékoztatjuk." },
  { q: "Milyen garanciát vállalnak a javításokra?", a: "Minden elvégzett javításra 6 hónap teljes körű, írásos garanciát biztosítunk az anyagra és a munkadíjra egyaránt. Új alkatrészek értékesítésénél 12 hónap garancia érvényes." },
  { q: "Hogyan működik az országos futárszolgálat?", a: "Hívja telefonszámunkat, és futárunk az ország bármely pontjára kimegy a kiszerelt alkatrészért. A javítás után visszaszállítjuk az Ön által megadott helyre — személyes megjelenés nélkül." },
  { q: "Mennyibe kerül egy átlagos hidraulika javítás?", a: "A javítás ára az alkatrész típusától, a hiba jellegétől és a szükséges anyagoktól függ. Bevizsgálás után pontos, írásos árajánlatot adunk — csak elfogadás után kezdünk." },
];

const counties = [
  "Budapest","Pest","Győr-Moson-Sopron","Vas","Zala",
  "Somogy","Baranya","Tolna","Fejér","Komárom-Esztergom",
  "Veszprém","Bács-Kiskun","Csongrád-Csanád","Békés","Hajdú-Bihar",
  "Szabolcs-Sz-B","Jász-NK-Sz","Heves","Nógrád","Borsod-A-Z",
];

const countyMeta: Record<string, { tier: "kiemelt"|"aktiv"; eta: string; partners: number }> = {
  "Budapest":{ tier:"kiemelt",eta:"2–4 óra",partners:5 }, "Pest":{ tier:"aktiv",eta:"3–6 óra",partners:3 },
  "Győr-Moson-Sopron":{ tier:"aktiv",eta:"4–8 óra",partners:2 }, "Vas":{ tier:"aktiv",eta:"6–10 óra",partners:1 },
  "Zala":{ tier:"aktiv",eta:"6–10 óra",partners:1 }, "Somogy":{ tier:"aktiv",eta:"5–9 óra",partners:1 },
  "Baranya":{ tier:"aktiv",eta:"6–10 óra",partners:2 }, "Tolna":{ tier:"kiemelt",eta:"4–7 óra",partners:2 },
  "Fejér":{ tier:"aktiv",eta:"4–7 óra",partners:2 }, "Komárom-Esztergom":{ tier:"aktiv",eta:"4–7 óra",partners:2 },
  "Veszprém":{ tier:"aktiv",eta:"4–8 óra",partners:1 }, "Bács-Kiskun":{ tier:"aktiv",eta:"5–9 óra",partners:2 },
  "Csongrád-Csanád":{ tier:"aktiv",eta:"6–10 óra",partners:2 }, "Békés":{ tier:"aktiv",eta:"7–12 óra",partners:1 },
  "Hajdú-Bihar":{ tier:"kiemelt",eta:"5–9 óra",partners:3 }, "Szabolcs-Sz-B":{ tier:"aktiv",eta:"7–12 óra",partners:1 },
  "Jász-NK-Sz":{ tier:"aktiv",eta:"5–9 óra",partners:2 }, "Heves":{ tier:"aktiv",eta:"5–9 óra",partners:1 },
  "Nógrád":{ tier:"aktiv",eta:"5–9 óra",partners:1 }, "Borsod-A-Z":{ tier:"aktiv",eta:"6–11 óra",partners:2 },
};

// ── Page ─────────────────────────────────────────────────
function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const [selectedCounty, setSelectedCounty] = useState<string|null>(null);
  const [countySearch, setCountySearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [formState, setFormState] = useState<"idle"|"loading"|"success">("idle");
  const playClick = useClickSound();

  // Global click SFX — fires on any interactive element across the page
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest(
        "a, button, [role='button'], input[type='submit'], select, summary, label"
      );
      if (el) playClick();
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [playClick]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      // setState bails out when the boolean is unchanged → these flip once, not per frame.
      setScrolled(y > 12);
      setShowScrollTop(y > 500);
      // The nav "squish" is driven straight on the DOM so scrolling never re-renders the page.
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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  const BG = "hsl(158 62% 7%)";
  const BG2 = "hsl(158 62% 6%)";
  const ORANGE = "#FDB927";

  return (
    <div id="top" className="min-h-screen overflow-x-hidden" style={{ background: BG, color: "hsl(40 20% 97%)" }}>

      {/* JSON-LD — LocalBusiness */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":["LocalBusiness","AutoRepair"],
        "@id":"https://www.hidraulikajavitas.com/#business",
        "name":"Hidraulika Service TEAM Kft.",
        "alternateName":"Hidraulika Javítás",
        "url":"https://www.hidraulikajavitas.com",
        "telephone":"+36309111474","email":"info@hidraulikajavitas.com","vatID":"32267509-2-43",
        "priceRange":"$$","currenciesAccepted":"HUF","paymentAccepted":"Készpénz, Banki átutalás",
        "image":"https://www.hidraulikajavitas.com/og-image.jpg",
        "logo":"https://www.hidraulikajavitas.com/logo.png",
        "address":{"@type":"PostalAddress","streetAddress":"Soroksári út 48, Malom Udvar, 8. épület, földszint","addressLocality":"Budapest","postalCode":"1095","addressRegion":"Budapest","addressCountry":"HU"},
        "geo":{"@type":"GeoCoordinates","latitude":47.4669,"longitude":19.0744},
        "areaServed":[{"@type":"Country","name":"Magyarország"}, ...counties.map(c => ({"@type":"AdministrativeArea","name":c}))],
        "description":"Hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok márkafüggetlen javítása. 24–48 órás átfutás, 6 hónap garancia, ingyenes országos futárszolgálat.",
        "openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"08:00","closes":"17:00"}],
        "aggregateRating":{"@type":"AggregateRating","ratingValue":"5.0","reviewCount":String(testimonials.length),"bestRating":"5","worstRating":"1"},
        "review":testimonials.map(t => ({"@type":"Review","reviewRating":{"@type":"Rating","ratingValue":"5","bestRating":"5"},"author":{"@type":"Person","name":t.name},"reviewBody":t.text})),
        "makesOffer":services.map(s => ({"@type":"Offer","itemOffered":{"@type":"Service","name":s.title,"description":s.desc}})),
        "hasOfferCatalog":{"@type":"OfferCatalog","name":"Hidraulika javítási szolgáltatások","itemListElement":services.map(s => ({"@type":"OfferCatalog","name":s.title}))},
      })}} />

      {/* JSON-LD — FAQPage (rich result eligible) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":"FAQPage",
        "mainEntity":faq.map(f => ({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}})),
      })}} />

      {/* ══════════════════════════════════════════════════
          NAVIGATION
      ══════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <div className="w-full max-w-5xl" style={{ animation: "fade-in 0.65s cubic-bezier(0.22,1,0.36,1) both" }}>
          <div ref={navInnerRef} className="flex items-center justify-between px-3 pr-3" style={{
            height: 58,
            background: scrolled ? "rgba(4,20,14,0.97)" : "rgba(4,20,14,0.85)",
            backdropFilter: "blur(48px) saturate(2.2)",
            WebkitBackdropFilter: "blur(48px) saturate(2.2)",
            border: "1px solid rgba(255,255,255,0.075)",
            borderRadius: 999,
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 6px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
            transform: "scale(1)",
            transformOrigin: "top center",
            willChange: "transform",
            transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, box-shadow 0.4s ease",
          }}>
            <a href="#top" className="flex items-center gap-2.5 group pl-1 no-underline">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{ background: "linear-gradient(135deg, hsl(43 98% 54%), #10b981)", boxShadow: "0 0 22px rgba(253,185,39,0.45)" }}>
                <span style={{ color: "white", fontWeight: 900, fontSize: "1rem", lineHeight: 1 }}>H</span>
              </div>
              <span className="hidden sm:block text-[1.05rem] font-bold tracking-wider" style={{ color: "hsl(40 20% 97%)" }}>
                hidraulika<span style={{ color: ORANGE }}>javítás.hu</span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="nav-link text-sm font-medium no-underline"
                  style={{ color: "hsl(158 16% 60%)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(40 20% 97%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(158 16% 60%)")}>
                  {l.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a href="tel:+36309111474"
                className="btn-hover phone-pulse hidden sm:flex items-center gap-2 h-10 px-5 rounded-full text-sm font-semibold no-underline"
                style={{
                  background: "rgba(253,185,39,0.15)",
                  border: "1px solid rgba(253,185,39,0.4)",
                  color: "white",
                }}>
                <Phone size={13} /> +36 30 911 1474
              </a>
              <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menü"
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: "rgba(255,255,255,0.06)", color: "hsl(158 16% 60%)", border: "none" }}>
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          <div className="rounded-3xl overflow-hidden" style={{
            background: "rgba(4,20,14,0.97)", backdropFilter: "blur(48px) saturate(2)",
            border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            maxHeight: menuOpen ? 400 : 0, opacity: menuOpen ? 1 : 0,
            marginTop: menuOpen ? "0.5rem" : 0, pointerEvents: menuOpen ? "auto" : "none",
            transition: "max-height 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease, margin-top 0.35s ease",
          }}>
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  className="text-left px-4 py-3 rounded-xl text-sm font-medium no-underline block"
                  style={{ color: "hsl(158 16% 60%)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "hsl(40 20% 97%)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(158 16% 60%)"; }}>
                  {l.label}
                </a>
              ))}
              <a href="tel:+36309111474"
                className="mt-2 flex items-center justify-center gap-2 h-11 rounded-full text-sm font-semibold text-white no-underline"
                style={{ background: ORANGE, boxShadow: "0 0 30px rgba(253,185,39,0.3)" }}>
                <Phone size={13} /> +36 30 911 1474
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════
          HERO — image mosaic right, text left
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden">
        {/* bg dot grid */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        {/* ambient blobs */}
        <div className="absolute -top-40 -left-32 rounded-full pointer-events-none animate-blob"
          style={{ width: 700, height: 700, background: "radial-gradient(circle, rgba(253,185,39,0.14), transparent 70%)", filter: "blur(90px)" }} />
        <div className="absolute top-0 right-0 rounded-full pointer-events-none"
          style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)", filter: "blur(100px)", animation: "blob 20s ease-in-out infinite reverse" }} />

        <div className="grid lg:grid-cols-[1fr_0.9fr] min-h-screen relative z-10">

          {/* LEFT — text */}
          <div className="flex flex-col justify-center pt-32 pb-40 px-6 md:px-10 lg:px-16 xl:px-20">

            <Reveal>
              <div className="mb-7">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ background: "rgba(253,185,39,0.1)", border: "1px solid rgba(253,185,39,0.25)", color: "hsl(43 98% 68%)" }}>
                  <OrangeDot /> Márkafüggetlen szakszerviz · Budapest
                </span>
              </div>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="mb-6" style={{ fontWeight: 900, lineHeight: 1, letterSpacing: "-0.025em" }}>
                <span className="block hero-gradient-text" style={{ fontSize: "clamp(3rem,9vw,7.5rem)" }}>HIDRAULIKA</span>
                <span className="block hero-gradient-text" style={{ fontSize: "clamp(2rem,6vw,5rem)" }}>JAVÍTÁS</span>
                <span className="block mt-2" style={{ fontSize: "clamp(1.1rem,3vw,2.2rem)", color: "rgba(250,244,230,0.28)", fontWeight: 800 }}>
                  AHOL A MINŐSÉG
                </span>
                <span className="block" style={{ fontSize: "clamp(1.1rem,3vw,2.2rem)", color: "rgba(250,244,230,0.28)", fontWeight: 800 }}>
                  NEM ALKUKÉRDÉS.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <div className="mb-8 h-0.5 w-14 rounded-full" style={{ background: "linear-gradient(90deg, hsl(43 98% 54%), transparent)" }} />
            </Reveal>

            <Reveal delay={180}>
              <p className="mb-10 max-w-md text-base font-light leading-relaxed" style={{ color: "hsl(158 16% 56%)" }}>
                Hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok teljes körű javítása — 6 hónap garanciával, országos futárszolgálattal.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a href="#kapcsolat"
                  className="group glint cta-pulse relative inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full text-base font-semibold text-white no-underline"
                  style={{ background: ORANGE }}>
                  Kérek árajánlatot
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a href="tel:+36309111474"
                  className="btn-hover inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full text-base font-semibold glass no-underline"
                  style={{ color: "hsl(40 20% 97%)" }}>
                  <Phone size={16} /> +36 30 911 1474
                </a>
              </div>
            </Reveal>

            {/* Trust pills row */}
            <Reveal delay={280}>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: ShieldCheck, label: "6 hónap garancia" },
                  { icon: Truck, label: "Ingyenes futár" },
                  { icon: CheckCircle2, label: "100% minőség" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "hsl(158 16% 65%)" }}>
                    <Icon size={12} style={{ color: ORANGE }} /> {label}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT — image mosaic */}
          <div className="hidden lg:flex flex-col justify-center gap-4 p-8 pr-12 pt-28 pb-28">
            <Reveal delay={100}>
              <div className="relative rounded-3xl overflow-hidden" style={{ height: 280, border: "1px solid rgba(255,255,255,0.07)" }}>
                <img src={IMGS.excavator} alt="Kotrógép hidraulika" className="w-full h-full object-cover"
                  style={{ filter: "saturate(0.75) contrast(1.1) brightness(0.85)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,20,14,0.5), transparent)" }} />
                {/* Floating stat */}
                <div className="glass absolute bottom-4 left-4 rounded-2xl px-4 py-3 animate-float">
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: "hsl(158 16% 50%)" }}>Garancia</p>
                  <p className="text-lg font-black">6 hónap</p>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              <Reveal delay={160}>
                <div className="relative rounded-3xl overflow-hidden" style={{ height: 180, border: "1px solid rgba(255,255,255,0.07)" }}>
                  <img src={IMGS.pump} alt="Hidraulikus szivattyú" className="w-full h-full object-cover"
                    style={{ filter: "saturate(0.7) contrast(1.15) brightness(0.8)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,20,14,0.6), transparent)" }} />
                  <div className="absolute bottom-3 left-3 text-xs font-bold uppercase tracking-wider"
                    style={{ color: "hsl(43 98% 64%)" }}>Szivattyú</div>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="relative rounded-3xl overflow-hidden" style={{ height: 180, border: "1px solid rgba(255,255,255,0.07)" }}>
                  <img src={IMGS.excavator2} alt="Hidraulikus munkagép" className="w-full h-full object-cover"
                    style={{ filter: "saturate(0.7) contrast(1.15) brightness(0.8)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,20,14,0.6), transparent)" }} />
                  {/* Floating stat */}
                  <div className="glass absolute bottom-3 left-3 rounded-xl px-3 py-2 animate-float" style={{ animationDelay: "-3s" }}>
                    <p className="text-[9px] uppercase tracking-widest" style={{ color: "hsl(158 16% 50%)" }}>Javítás</p>
                    <p className="text-sm font-black">5000+</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Stats band */}
        <div className="absolute bottom-0 left-0 right-0 z-20 grid grid-cols-3"
          style={{ background: "rgba(3,16,11,0.97)", backdropFilter: "blur(24px) saturate(1.8)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { to: 20,   suffix: "+",  label: "Év tapasztalat" },
            { to: 5000, suffix: "+",  label: "Sikeres javítás" },
            { to: 100,  suffix: "%",  label: "Minőség garancia" },
          ].map(({ to, suffix, label }, i) => (
            <div key={label} className="flex flex-col items-center py-6 px-4"
              style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <span className="text-3xl md:text-4xl font-black stat-glow" style={{ color: ORANGE, fontWeight: 900 }}>
                <Counter to={to} suffix={suffix} />
              </span>
              <span className="text-[10px] uppercase tracking-widest mt-1 text-center" style={{ color: "hsl(158 16% 50%)" }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════════════════ */}
      <div className="overflow-hidden" style={{ background: ORANGE, borderTop: "1px solid rgba(0,0,0,0.1)", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
        <div className="marquee-track py-3.5">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-5 font-bold tracking-[0.12em] uppercase text-[13px] px-5 text-white">
              {item}
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "8px" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          SERVICES — alternating image / text rows
      ══════════════════════════════════════════════════ */}
      <section id="szolgaltatasok" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${ORANGE}, transparent 60%)` }} />

        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Chip>Amit csinálunk</Chip>
                <h2 className="text-5xl md:text-6xl mt-4 font-black">Szolgáltatásaink</h2>
              </div>
              <p className="text-base leading-relaxed max-w-xs md:text-right" style={{ color: "hsl(158 16% 55%)" }}>
                Minden, ami hidraulika — egy helyen.
              </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            {services.map((s, i) => {
              const isEven = i % 2 === 0;
              return (
                <Reveal key={s.title} delay={i * 60}>
                  <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} rounded-3xl overflow-hidden`}
                    style={{ background: "hsl(158 58% 9%)", border: "1px solid rgba(255,255,255,0.06)", minHeight: 320 }}>

                    {/* Image */}
                    <div className="relative lg:w-5/12 shrink-0 overflow-hidden" style={{ minHeight: 260 }}>
                      <img src={s.img} alt={s.title} loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        style={{ filter: "saturate(0.72) contrast(1.12) brightness(0.85)" }} />
                      <div className="absolute inset-0" style={{
                        background: isEven
                          ? "linear-gradient(to right, transparent, hsl(158 58% 9%) 95%)"
                          : "linear-gradient(to left, transparent, hsl(158 58% 9%) 95%)",
                      }} />
                      {/* Number watermark */}
                      <div className="absolute top-5 left-5 font-black leading-none select-none"
                        style={{ fontSize: "5rem", color: "rgba(255,255,255,0.08)", fontWeight: 900 }}>
                        {s.num}
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex flex-col justify-center p-8 lg:p-12 lg:w-7/12">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: "rgba(253,185,39,0.12)", border: "1px solid rgba(253,185,39,0.25)", color: ORANGE }}>
                          <s.icon size={20} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: ORANGE }}>{s.num}</span>
                      </div>
                      <h3 className="text-2xl font-black mb-3 tracking-tight">{s.title}</h3>
                      <p className="text-[15px] leading-relaxed mb-6" style={{ color: "hsl(158 16% 57%)" }}>{s.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-7">
                        {s.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider"
                            style={{ background: "rgba(253,185,39,0.08)", border: "1px solid rgba(253,185,39,0.18)", color: "hsl(43 98% 65%)" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a href="#kapcsolat"
                        className="group inline-flex items-center gap-2 text-sm font-semibold no-underline w-fit"
                        style={{ color: ORANGE }}>
                        Árajánlatot kérek
                        <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY US — conversion-focused
      ══════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden" style={{ background: BG2 }}>
        {/* purple glow bg */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.18), transparent 70%)" }} />

        <div className="container mx-auto px-6 relative z-10">

          {/* Top: headline + urgent phone CTA */}
          <Reveal>
            <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <Chip>Előnyeink</Chip>
                <h2 className="mt-5 font-black leading-none" style={{ fontSize: "clamp(2.6rem,6vw,4.5rem)" }}>
                  Leállt a hidraulika?<br />
                  <span style={{ color: ORANGE }}>Ma megoldjuk.</span>
                </h2>
                <p className="mt-5 text-base leading-relaxed max-w-xl" style={{ color: "hsl(158 16% 60%)" }}>
                  Nem kell napokat várni, nem kell furikázni a városban. Egy telefonhívás — és az Ön gépje ismét dolgozik. 20 éves tapasztalat, 5000+ sikeres javítás, írásos garancia.
                </p>
              </div>

              {/* Phone CTA block */}
              <div className="shrink-0 rounded-3xl p-6 text-center min-w-60"
                style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.35), rgba(16,185,129,0.12))", border: "1px solid rgba(253,185,39,0.3)", boxShadow: "0 0 60px rgba(16,185,129,0.25)" }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "hsl(158 16% 55%)" }}>
                  Hívjon most — ingyen!
                </p>
                <a href="tel:+36309111474"
                  className="glint cta-pulse block rounded-2xl py-4 px-6 text-center no-underline mb-3"
                  style={{ background: ORANGE, color: "#04111f" }}>
                  <Phone size={18} className="inline mr-2 mb-0.5" style={{ color: "#04111f" }} />
                  <span className="text-xl font-black">+36 30 911 1474</span>
                </a>
                <div className="flex items-center justify-center gap-2 text-xs" style={{ color: "hsl(158 16% 50%)" }}>
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#4ade80", animation: "pulse-glow 2s ease-in-out infinite" }} />
                  Hétfő–Péntek 08:00–17:00
                </div>
              </div>
            </div>
          </Reveal>

          {/* Feature cards — 3×2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {whyUs.map((f, i) => (
              <Reveal key={f.t} delay={i * 55}>
                <div className="group relative rounded-3xl p-7 h-full flex flex-col project-card-hover cursor-default"
                  style={{ background: "hsl(158 58% 10%)", border: "1px solid rgba(255,255,255,0.07)" }}>

                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110"
                      style={{ background: "linear-gradient(135deg, rgba(253,185,39,0.18), rgba(16,185,129,0.18))", border: "1px solid rgba(253,185,39,0.25)", color: ORANGE }}>
                      <f.icon size={22} strokeWidth={1.4} />
                    </div>
                    <CheckCircle2 size={15} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: ORANGE }} />
                  </div>

                  <h3 className="text-[1.05rem] font-extrabold mb-2 transition-colors duration-200 group-hover:text-[hsl(43_98%_65%)]">{f.t}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "hsl(158 16% 58%)" }}>{f.d}</p>

                  <div className="mt-5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full"
                    style={{ background: `linear-gradient(90deg, ${ORANGE}, #10b981, transparent)` }} />

                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(253,185,39,0.18)" }} />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Bottom CTA banner */}
          <Reveal delay={300}>
            <div className="rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #10b981, hsl(158 65% 8%))", border: "1px solid rgba(253,185,39,0.22)" }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 18px,rgba(0,0,0,0.06) 18px,rgba(0,0,0,0.06) 19px)" }} />
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.22em] mb-2" style={{ color: "rgba(253,185,39,0.7)" }}>Ne várjon tovább!</p>
                <p className="text-xl md:text-2xl font-black text-white">Kérjen ingyenes telefonos tanácsadást — most, azonnal.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10">
                <a href="tel:+36309111474"
                  className="btn-hover glint inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-full text-base font-black no-underline"
                  style={{ background: ORANGE, color: "#04111f", boxShadow: "0 0 40px rgba(253,185,39,0.4)" }}>
                  <Phone size={16} /> +36 30 911 1474
                </a>
                <a href="#kapcsolat"
                  className="btn-hover inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-sm font-semibold text-white no-underline"
                  style={{ border: "1.5px solid rgba(253,185,39,0.4)" }}>
                  Árajánlatot kérek <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CONTACT — top pills + 2-col below
      ══════════════════════════════════════════════════ */}
      <section id="kapcsolat" className="py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.05] blur-[120px] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${ORANGE}, transparent 60%)` }} />

        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="mb-16">
              <Chip>Kapcsolat</Chip>
              <h2 className="text-5xl md:text-6xl mt-4 mb-10 font-black">Rendelje meg<br />a javítást!</h2>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Phone,  label: "+36 (30) 9111-474",              sub: "Telefonszám", href: "tel:+36309111474" },
                  { icon: Mail,   label: "info@hidraulikajavitas.com",      sub: "Email",       href: "mailto:info@hidraulikajavitas.com" },
                  { icon: MapPin, label: "1095 Budapest, Soroksári út 48",  sub: "Telephely",   href: "#" },
                ].map(({ icon: Icon, label, sub, href }) => (
                  <a key={sub} href={href}
                    className="group flex items-center gap-4 px-6 py-4 rounded-2xl no-underline btn-hover"
                    style={{ background: "hsl(158 58% 11%)", border: "1px solid rgba(255,255,255,0.07)", color: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(253,185,39,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(253,185,39,0.1)", border: "1px solid rgba(253,185,39,0.2)", color: ORANGE }}>
                      <Icon size={17} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: "hsl(158 16% 45%)" }}>{sub}</p>
                      <p className="text-sm font-semibold">{label}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
            <Reveal>
              <div>
                <h3 className="text-xl font-bold mb-6">Miért válasszon minket?</h3>
                <div className="space-y-4 mb-10">
                  {[
                    { icon: Clock,       t: "24–48 órás átfutás",    d: "Az alkatrész beérkezésétől a kész javításig." },
                    { icon: ShieldCheck, t: "6 hónap garancia",       d: "Minden elvégzett munkára, írásban." },
                    { icon: Truck,       t: "Oda-vissza futár",       d: "Az egész országból, a mi szervezésünkben." },
                    { icon: PhoneCall,   t: "Ingyenes tanácsadás",    d: "Hívjon most, első lépés kötelezettségmentes." },
                  ].map(({ icon: Icon, t, d }) => (
                    <div key={t} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "rgba(253,185,39,0.1)", border: "1px solid rgba(253,185,39,0.18)", color: ORANGE }}>
                        <Icon size={15} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{t}</p>
                        <p className="text-xs mt-0.5" style={{ color: "hsl(158 16% 52%)" }}>{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl p-5 text-xs space-y-1.5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="font-bold text-sm mb-3" style={{ color: "hsl(40 20% 90%)" }}>Hidraulika Service TEAM Kft.</p>
                  <p style={{ color: "hsl(158 16% 45%)" }}>Adószám: 32267509-2-43</p>
                  <p style={{ color: "hsl(158 16% 45%)" }}>Cégjegyzékszám: 01-09-376445</p>
                  <p style={{ color: "hsl(158 16% 45%)" }}>1095 Budapest, Soroksári út 48, Malom Udvar</p>
                  <p style={{ color: "hsl(158 16% 45%)" }}>8. épület, földszint</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="glass-strong rounded-3xl p-8 md:p-10"
                style={{ boxShadow: "0 40px 80px -24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                {formState === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center" style={{ animation: "card-in 0.4s ease both" }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                      style={{ background: "rgba(253,185,39,0.1)", border: "1px solid rgba(253,185,39,0.3)" }}>
                      <CheckCircle2 size={30} style={{ color: ORANGE }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Köszönjük!</h3>
                    <p className="text-sm max-w-xs" style={{ color: "hsl(158 16% 55%)" }}>
                      Hamarosan felvesszük Önnel a kapcsolatot — általában 24 órán belül.
                    </p>
                    <button onClick={() => setFormState("idle")}
                      className="mt-8 text-xs cursor-pointer underline"
                      style={{ background: "none", border: "none", color: "hsl(158 16% 50%)" }}>
                      Új üzenet küldése
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold mb-1">Kérjen ingyenes visszahívást</h3>
                    <p className="text-sm mb-7" style={{ color: "hsl(158 16% 55%)" }}>24 órán belül felvesszük Önnel a kapcsolatot.</p>
                    <form className="space-y-4"
                      onSubmit={(e) => { e.preventDefault(); setFormState("loading"); setTimeout(() => setFormState("success"), 1600); }}>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          { label: "Név",         type: "text", placeholder: "Adja meg nevét",     required: true },
                          { label: "Telefonszám", type: "tel",  placeholder: "+36 30 000 0000",    required: true },
                        ].map(({ label, type, placeholder, required }) => (
                          <div key={label}>
                            <label className="text-[10px] font-semibold uppercase tracking-widest mb-2 block" style={{ color: "hsl(158 16% 48%)" }}>{label}</label>
                            <input type={type} placeholder={placeholder} required={required}
                              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-[border-color,background-color] duration-200 ease-out"
                              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "hsl(40 20% 97%)" }}
                              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(253,185,39,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-widest mb-2 block" style={{ color: "hsl(158 16% 48%)" }}>Email (opcionális)</label>
                        <input type="email" placeholder="pelda@email.hu"
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-[border-color,background-color] duration-200 ease-out"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "hsl(40 20% 97%)" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(253,185,39,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-widest mb-2 block" style={{ color: "hsl(158 16% 48%)" }}>Alkatrész típusa</label>
                        <select defaultValue=""
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-[border-color,background-color] duration-200 ease-out"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "hsl(40 20% 97%)", appearance: "none" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(253,185,39,0.5)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}>
                          <option value="" disabled style={{ background: "hsl(158 52% 13%)" }}>Válasszon típust...</option>
                          {["Hidraulikus szivattyú","Hidraulikus motor","Hidraulikus henger","Orbit motor","Vezérlőblokk","Egyéb"].map(o => (
                            <option key={o} value={o.toLowerCase()} style={{ background: "hsl(158 52% 13%)" }}>{o}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-widest mb-2 block" style={{ color: "hsl(158 16% 48%)" }}>Hiba leírása</label>
                        <textarea rows={4} placeholder="Röviden írja le a hibát és a gép típusát..."
                          className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-[border-color,background-color] duration-200 ease-out"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "hsl(40 20% 97%)" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(253,185,39,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                        />
                      </div>
                      <button type="submit" disabled={formState === "loading"}
                        className="btn-hover w-full rounded-full text-base font-semibold text-white py-4 cursor-pointer"
                        style={{
                          background: ORANGE,
                          boxShadow: "0 0 40px rgba(253,185,39,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                          border: "none",
                          opacity: formState === "loading" ? 0.7 : 1,
                          transition: "opacity 0.2s ease",
                        }}>
                        {formState === "loading" ? "Küldés..." : "Kérek visszahívást"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BRANDS — full statement section
      ══════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "hsl(158 65% 5%)", borderTop: "1px solid rgba(253,185,39,0.12)", borderBottom: "1px solid rgba(253,185,39,0.12)" }}>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(16,185,129,0.22), transparent 70%)" }} />

        <div className="container mx-auto px-6 relative z-10 mb-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Chip>Márkafüggetlen szerviz</Chip>
                <h2 className="mt-4 font-black leading-none" style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)" }}>
                  12 vezető gyártó.<br />
                  <span style={{ color: ORANGE }}>Egy megbízható szerviz.</span>
                </h2>
              </div>
              <div className="max-w-sm">
                <p className="text-base leading-relaxed" style={{ color: "hsl(158 16% 55%)" }}>
                  Nem érdekli, melyik gyártó névtábláját viseli a gép — ha hidraulika, mi megjavítjuk. Komatsu, Caterpillar, Bosch Rexroth vagy bármi más.
                </p>
                <a href="tel:+36309111474"
                  className="btn-hover mt-5 inline-flex items-center gap-2 h-11 px-6 rounded-full text-sm font-bold no-underline"
                  style={{ background: ORANGE, color: "#04111f" }}>
                  <Phone size={14} /> Kérdezzen ingyenesen
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Marquee row 1 — left */}
        <div className="overflow-hidden mb-3">
          <div className="marquee-track" style={{ animationDuration: "22s" }}>
            {[...brands, ...brands, ...brands, ...brands].map((b, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-6"
                style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)", fontWeight: 900, color: i % 2 === 0 ? ORANGE : "rgba(255,255,255,0.07)", letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                {b}
                <span style={{ color: "rgba(253,185,39,0.2)", fontSize: "0.5em" }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* Marquee row 2 — right (reverse direction) */}
        <div className="overflow-hidden">
          <div className="marquee-track" style={{ animationDuration: "28s", animationDirection: "reverse" }}>
            {[...brands, ...brands, ...brands, ...brands].map((b, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-6"
                style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)", fontWeight: 900, color: i % 2 === 0 ? "rgba(255,255,255,0.06)" : ORANGE, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                {b}
                <span style={{ color: "rgba(253,185,39,0.2)", fontSize: "0.5em" }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* Brand badge grid */}
        <div className="container mx-auto px-6 relative z-10 mt-12">
          <div className="flex flex-wrap justify-center gap-3">
            {brands.map((b) => (
              <span key={b} className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ background: "rgba(253,185,39,0.07)", border: "1px solid rgba(253,185,39,0.18)", color: "hsl(43 98% 72%)" }}>
                {b}
              </span>
            ))}
          </div>
          <p className="text-center mt-6 text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(158 16% 38%)" }}>
            + Minden egyéb gyártó hidraulikus rendszerei
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROCESS — vertical timeline
      ══════════════════════════════════════════════════ */}
      <section id="folyamat" className="py-28 relative overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(16,185,129,0.12), transparent 65%)" }} />

        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <Chip>A folyamat</Chip>
              <h2 className="mt-5 font-black leading-none" style={{ fontSize: "clamp(2.6rem,6vw,4.5rem)" }}>
                Egyszerű. Gyors.<br /><span style={{ color: ORANGE }}>Kényelmes.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed" style={{ color: "hsl(158 16% 55%)" }}>
                A hiba felmerülésétől a megjavított alkatrész visszaszereléséig komplett megoldást nyújtunk —
                mindössze egyetlen telefonhívással elindítja az egész folyamatot.
              </p>
              {/* Time summary pills */}
              <div className="flex flex-wrap justify-center gap-3 mt-7">
                {[
                  { label: "1 perc", sub: "Hívás" },
                  { label: "Másnap", sub: "Futár indul" },
                  { label: "24–48 óra", sub: "Javítás" },
                  { label: "Azután", sub: "Visszaszállítás" },
                ].map((pill) => (
                  <div key={pill.label} className="px-5 py-2.5 rounded-2xl text-center"
                    style={{ background: "rgba(253,185,39,0.07)", border: "1px solid rgba(253,185,39,0.18)" }}>
                    <div className="text-sm font-black" style={{ color: ORANGE }}>{pill.label}</div>
                    <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "hsl(158 16% 48%)" }}>{pill.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {processSteps.map((p, i) => {
              const isLast = i === processSteps.length - 1;
              return (
                <Reveal key={p.num} delay={i * 90}>
                  <div className="flex gap-6 md:gap-10 relative">

                    {/* Left: number + line */}
                    <div className="flex flex-col items-center shrink-0" style={{ width: 64 }}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center z-10 relative"
                        style={{ background: "linear-gradient(135deg, #FDB927, #10b981)", color: "white", boxShadow: "0 0 28px rgba(253,185,39,0.3)" }}>
                        <p.icon size={22} strokeWidth={1.8} />
                      </div>
                      {!isLast && (
                        <div className="flex-1 w-px mt-3 mb-3"
                          style={{ background: "linear-gradient(to bottom, rgba(253,185,39,0.4), rgba(16,185,129,0.25))", minHeight: 32 }} />
                      )}
                    </div>

                    {/* Right: content card */}
                    <div className={`group flex-1 rounded-3xl p-6 md:p-8 project-card-hover ${isLast ? "mb-0" : "mb-4"}`}
                      style={{ background: "hsl(158 58% 10%)", border: "1px solid rgba(255,255,255,0.07)" }}>

                      {/* Step header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: ORANGE }}>
                            {p.num} lépés
                          </span>
                          <h3 className="text-xl font-extrabold mt-1 transition-colors group-hover:text-[hsl(43_98%_65%)]">{p.title}</h3>
                        </div>
                        <span className="shrink-0 font-black leading-none select-none hidden md:block"
                          style={{ fontSize: "3.5rem", color: "rgba(253,185,39,0.06)", lineHeight: 1 }}>
                          {p.num}
                        </span>
                      </div>

                      <p className="text-[15px] leading-relaxed mb-4" style={{ color: "hsl(158 16% 58%)" }}>{p.desc}</p>

                      {/* Detail pill */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(253,185,39,0.07)", border: "1px solid rgba(253,185,39,0.15)", color: "hsl(43 98% 70%)" }}>
                        <Clock size={11} /> {p.detail}
                      </div>

                      <div className="mt-4 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full"
                        style={{ background: `linear-gradient(90deg, ${ORANGE}, #10b981, transparent)` }} />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <Reveal delay={550}>
            <div className="mt-14 text-center">
              <p className="text-base mb-6" style={{ color: "hsl(158 16% 55%)" }}>
                Az első lépés <strong style={{ color: "hsl(40 20% 97%)" }}>ingyenes</strong> és <strong style={{ color: "hsl(40 20% 97%)" }}>kötelezettségmentes</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+36309111474"
                  className="btn-hover glint cta-pulse inline-flex items-center justify-center gap-2.5 h-14 px-10 rounded-full text-base font-black no-underline"
                  style={{ background: ORANGE, color: "#04111f", boxShadow: "0 0 50px rgba(253,185,39,0.35)" }}>
                  <Phone size={17} /> Hívjon most: +36 30 911 1474
                </a>
                <a href="#kapcsolat"
                  className="btn-hover inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full text-sm font-semibold glass no-underline"
                  style={{ color: "hsl(40 20% 97%)" }}>
                  Inkább üzenetet küldök <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          EQUIPMENT — staggered masonry grid
      ══════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Chip>Megmunkált gépek</Chip>
                <h2 className="text-5xl md:text-6xl mt-4 font-black">Hidraulika<br />minden géphez.</h2>
              </div>
              <a href="#kapcsolat" className="btn-hover inline-flex items-center gap-2 h-10 px-6 rounded-full text-sm font-medium glass no-underline shrink-0"
                style={{ color: "hsl(40 20% 97%)" }}>
                Árajánlatot kérek <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>

          {/* 4-col bento: row1 = wide+small+small, row2 = small+small+wide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { ...equipment[0], colSpan: "md:col-span-2", h: 300 },
              { ...equipment[1], colSpan: "md:col-span-1", h: 300 },
              { ...equipment[2], colSpan: "md:col-span-1", h: 300 },
              { ...equipment[3], colSpan: "md:col-span-1", h: 300 },
              { ...equipment[4], colSpan: "md:col-span-1", h: 300 },
              { ...equipment[5], colSpan: "md:col-span-2", h: 300 },
            ].map((eq, i) => (
              <Reveal key={eq.t} delay={i * 55} className={eq.colSpan}>
                <a href="#kapcsolat"
                  className="group relative rounded-3xl overflow-hidden cursor-pointer project-card-hover no-underline block"
                  style={{ height: eq.h, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <img src={eq.img} alt={eq.t} loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    style={{ filter: "saturate(0.75) contrast(1.08) brightness(0.82)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 25%, transparent 65%)" }} />

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                    style={{ background: "#FDB927", color: "#04111f", backdropFilter: "blur(8px)" }}>
                    Hidraulika szerviz
                  </div>

                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                    <h3 className="text-lg font-bold text-white">{eq.t}</h3>
                    <span className="glass w-9 h-9 rounded-full grid place-items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight size={14} />
                    </span>
                  </div>

                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 0 1.5px rgba(253,185,39,0.4)" }} />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS — featured + 3 smaller
      ══════════════════════════════════════════════════ */}
      <section id="velemenyek" className="py-28 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${ORANGE}, transparent 60%)` }} />

        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Chip>Ügyfeleink mondják</Chip>
                <h2 className="text-5xl md:text-6xl mt-4 font-black">Amit rólunk mondanak.</h2>
              </div>
              <div className="flex items-center gap-1.5" style={{ color: "hsl(158 16% 50%)" }}>
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={16} fill="hsl(43 98% 54%)" color="hsl(43 98% 54%)" />
                ))}
                <span className="ml-2 text-sm font-semibold">5.0</span>
              </div>
            </div>
          </Reveal>

          {/* Featured large testimonial */}
          <Reveal>
            <div className="mb-5 relative rounded-3xl p-8 md:p-12 overflow-hidden"
              style={{ background: "hsl(158 58% 11%)", border: "1px solid rgba(255,255,255,0.07)", borderTop: "2px solid rgba(253,185,39,0.4)" }}>
              <div className="absolute -top-8 right-8 font-black leading-none select-none"
                style={{ fontSize: "12rem", color: "rgba(253,185,39,0.05)", fontWeight: 900 }} aria-hidden>"</div>
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={16} fill="hsl(43 98% 54%)" color="hsl(43 98% 54%)" />)}
              </div>
              <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 max-w-3xl" style={{ color: "rgba(250,244,230,0.88)" }}>
                "{testimonials[0].text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, hsl(43 98% 54%), #065f46)" }}>
                  {testimonials[0].name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold">{testimonials[0].name}</div>
                  <div className="text-xs uppercase tracking-widest font-medium" style={{ color: "hsl(43 98% 58%)" }}>{testimonials[0].role}</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Three smaller cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.slice(1).map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="glass-review rounded-2xl p-6 flex flex-col relative overflow-hidden"
                  style={{ borderTop: "2px solid rgba(253,185,39,0.22)" }}>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={12} fill="hsl(43 98% 54%)" color="hsl(43 98% 54%)" />)}
                  </div>
                  <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "rgba(250,244,230,0.75)" }}>"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                      style={{ background: "linear-gradient(135deg, hsl(43 98% 54%), #065f46)" }}>
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "hsl(43 98% 58%)" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          COVERAGE MAP
      ══════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <Chip>Lefedettség</Chip>
                <h2 className="text-4xl md:text-5xl mt-5 mb-5 font-black" style={{ lineHeight: 0.95 }}>
                  Bárhová megyünk<br />az országban.
                </h2>
                <div className="mb-6 h-0.5 w-12 rounded-full" style={{ background: `linear-gradient(90deg, ${ORANGE}, transparent)` }} />
                <p className="leading-relaxed text-[15px] max-w-sm mb-8" style={{ color: "hsl(158 16% 55%)" }}>
                  Futárszolgálatunkkal Magyarország minden pontjáról átvesszük a javítandó hidraulikus alkatrészt és visszaszállítjuk a kész munkát.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Clock,      t: "Gyors kiszállás",     d: "Bárhol az országban" },
                    { icon: Truck,      t: "Saját futár",         d: "Oda- és visszaszállítás" },
                    { icon: MapPin,     t: "20 megye",            d: "Teljes lefedettség" },
                    { icon: Phone,      t: "Ingyenes tanácsadás", d: "Telefonon, azonnal" },
                  ].map((b) => (
                    <div key={b.t} className="rounded-2xl p-4" style={{ background: "rgba(253,185,39,0.06)", border: "1px solid rgba(253,185,39,0.12)" }}>
                      <b.icon size={15} style={{ color: ORANGE, marginBottom: 6 }} />
                      <p className="text-sm font-semibold">{b.t}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: "hsl(158 16% 50%)" }}>{b.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative">
                <div className="absolute -inset-10 rounded-full opacity-[0.1] blur-[80px] pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${ORANGE}, transparent 60%)` }} />

                <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "hsl(158 16% 40%)" }}>
                  Lefedett megyék — mind a 20
                </p>

                <div className="relative mb-4">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "hsl(158 16% 40%)" }} />
                  <input type="text" placeholder="Keresse meg a megyéjét..."
                    value={countySearch}
                    onChange={(e) => { setCountySearch(e.target.value); setSelectedCounty(null); }}
                    className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none transition-[border-color] duration-200 ease-out"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "hsl(40 20% 97%)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(253,185,39,0.4)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                  />
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {counties.map((c) => {
                    const meta = countyMeta[c];
                    const isSelected = selectedCounty === c;
                    const isKiemelt = meta?.tier === "kiemelt";
                    const isFiltered = countySearch && !c.toLowerCase().includes(countySearch.toLowerCase());
                    return (
                      <button key={c} onClick={() => setSelectedCounty(isSelected ? null : c)}
                        className="rounded-xl px-3 py-2.5 text-center text-xs font-medium transition-[background-color,border-color,color,transform,box-shadow,opacity] duration-200 ease-out cursor-pointer"
                        style={{
                          background: isSelected ? "rgba(253,185,39,0.22)" : isKiemelt ? "rgba(253,185,39,0.1)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${isSelected ? "rgba(253,185,39,0.55)" : isKiemelt ? "rgba(253,185,39,0.28)" : "rgba(255,255,255,0.06)"}`,
                          color: isSelected ? "hsl(43 98% 72%)" : isKiemelt ? "hsl(43 98% 62%)" : "hsl(158 16% 60%)",
                          opacity: isFiltered ? 0.15 : 1,
                          transform: isSelected ? "scale(1.04)" : "scale(1)",
                          boxShadow: isSelected ? "0 0 18px rgba(253,185,39,0.22)" : "none",
                        }}>
                        {c}
                      </button>
                    );
                  })}
                </div>

                <div className="overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
                  style={{ maxHeight: selectedCounty ? 120 : 0, opacity: selectedCounty ? 1 : 0 }}>
                  {selectedCounty && countyMeta[selectedCounty] && (
                    <div className="mt-4 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                      style={{ background: "rgba(253,185,39,0.08)", border: "1px solid rgba(253,185,39,0.2)" }}>
                      <MapPin size={17} style={{ color: ORANGE, flexShrink: 0 }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{selectedCounty}</p>
                        <p className="text-xs mt-0.5" style={{ color: "hsl(158 16% 60%)" }}>
                          Becsült kiszállás:&nbsp;
                          <span style={{ color: "hsl(43 98% 62%)" }}>{countyMeta[selectedCounty].eta}</span>
                          &nbsp;·&nbsp;{countyMeta[selectedCounty].partners} helyi partner
                          &nbsp;·&nbsp;{countyMeta[selectedCounty].tier === "kiemelt" ? "Kiemelt hálózat" : "Aktív lefedettség"}
                        </p>
                      </div>
                      <a href="#kapcsolat"
                        className="shrink-0 inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-xs font-semibold text-white no-underline"
                        style={{ background: ORANGE, boxShadow: "0 0 20px rgba(253,185,39,0.28)" }}>
                        Ajánlatot kérek <ChevronRight size={12} />
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs" style={{ color: "hsl(158 16% 40%)" }}>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "rgba(253,185,39,0.5)", border: "1px solid rgba(253,185,39,0.5)" }} />
                    Kiemelt hálózat
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }} />
                    Aktív lefedettség
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20"
        style={{ background: "linear-gradient(135deg, hsl(43 98% 52%), hsl(158 65% 38%))" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 21px)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <Reveal>
              <div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.22em] mb-4">
                  Ingyenes tanácsadás · Gyors átfutás · 6 hónap garancia
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-white" style={{ lineHeight: 0.95 }}>
                  Hibás a hidraulika?<br />Mi megoldjuk.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <a href="#kapcsolat"
                  className="btn-hover inline-flex items-center justify-center gap-2.5 h-14 px-10 rounded-full text-base font-bold no-underline"
                  style={{ background: "white", color: "hsl(158 80% 18%)", boxShadow: "0 14px 40px rgba(0,0,0,0.22)" }}>
                  Árajánlatot kérek <ChevronRight size={16} />
                </a>
                <a href="tel:+36309111474"
                  className="inline-flex items-center justify-center gap-2.5 h-14 px-10 rounded-full text-base font-bold text-white no-underline"
                  style={{ border: "2px solid rgba(255,255,255,0.38)" }}>
                  <Phone size={16} /> +36 30 911 1474
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FAQ — 2-column on desktop
      ══════════════════════════════════════════════════ */}
      <section id="gyik" className="py-28 relative" style={{ background: BG2 }}>
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <Chip>Gyakori kérdések</Chip>
              <h2 className="text-5xl md:text-6xl mt-4 font-black">Amit Önök kérdeznek.</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <div className="rounded-3xl overflow-hidden h-fit"
                  style={{
                    background: "hsl(158 58% 11%)",
                    border: `1px solid ${openFaq === i ? "rgba(253,185,39,0.22)" : "rgba(255,255,255,0.06)"}`,
                    transition: "border-color 0.25s ease",
                  }}>
                  <button className="w-full flex items-start justify-between gap-3 px-5 py-4 text-left cursor-pointer"
                    style={{ background: "none", border: "none", color: "inherit" }}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="flex items-start gap-3 text-sm font-semibold leading-snug pt-0.5">
                      <HelpCircle size={17} style={{ color: ORANGE, flexShrink: 0, marginTop: 1 }} />
                      {f.q}
                    </span>
                    <ArrowRight size={15} style={{
                      color: openFaq === i ? ORANGE : "hsl(158 16% 45%)",
                      flexShrink: 0, marginTop: 2,
                      transform: openFaq === i ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease, color 0.2s ease",
                    }} />
                  </button>
                  <div style={{ maxHeight: openFaq === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.22,1,0.36,1)" }}>
                    <p className="px-5 pb-5 pl-10 text-sm leading-relaxed" style={{ color: "hsl(158 16% 55%)" }}>{f.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scroll to top ─── */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Vissza a tetejére"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer btn-hover"
          style={{ background: ORANGE, boxShadow: "0 4px 28px rgba(253,185,39,0.45)", border: "none", color: "white", animation: "card-in 0.3s cubic-bezier(0.22,1,0.36,1) both" }}>
          <ArrowUp size={20} />
        </button>
      )}

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer className="py-16 relative" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "hsl(158 65% 3%)" }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-14">

            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, hsl(43 98% 54%), #10b981)", boxShadow: "0 0 20px rgba(253,185,39,0.3)" }}>
                  <span style={{ color: "white", fontWeight: 900, fontSize: "1rem", lineHeight: 1 }}>H</span>
                </div>
                <span className="text-lg font-bold tracking-widest">hidraulika<span style={{ color: ORANGE }}>javítás.hu</span></span>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(158 16% 48%)" }}>
                Hidraulikus szivattyúk, motorok, hengerek és vezérlőblokkok javítása. Márkafüggetlen szakszerviz, országos futárszolgálattal.
              </p>
              <div className="space-y-1 text-xs" style={{ color: "hsl(158 16% 38%)" }}>
                <p>Hidraulika Service TEAM Kft.</p>
                <p>Adószám: 32267509-2-43</p>
                <p>1095 Budapest, Soroksári út 48</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-14 gap-y-3">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="text-sm no-underline transition-colors"
                  style={{ color: "hsl(158 16% 48%)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(40 20% 97%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(158 16% 48%)")}>
                  {l.label}
                </a>
              ))}
            </div>

            <div className="space-y-3">
              {[
                { icon: Phone, val: "+36 (30) 9111-474", href: "tel:+36309111474" },
                { icon: Mail,  val: "info@hidraulikajavitas.com", href: "mailto:info@hidraulikajavitas.com" },
                { icon: MapPin,val: "1095 Budapest, Soroksári út 48", href: "#kapcsolat" },
              ].map(({ icon: Icon, val, href }) => (
                <a key={val} href={href} className="flex items-center gap-3 text-sm no-underline" style={{ color: "hsl(158 16% 48%)" }}>
                  <Icon size={13} style={{ color: ORANGE, flexShrink: 0 }} />
                  {val}
                </a>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: "2rem" }} />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            <div>© {new Date().getFullYear()} Hidraulika Service TEAM Kft. — hidraulikajavitas.com</div>
            <div className="flex gap-6">
              {["Adatvédelmi tájékoztató", "ÁSZF"].map((label) => (
                <a key={label} href="#" className="no-underline transition-colors" style={{ color: "rgba(255,255,255,0.2)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = ORANGE)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
