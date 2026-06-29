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
import { submitContact } from "@/lib/api/contact.functions";
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
  // real business photos (downloaded from wp)
  workshop1:  "/images/ZW550-6-768x690.webp",
  workshop2:  "/images/workshop-2.jpg",
  timberjack: "/images/3737280468_219458a037_b.jpg",
  courier:    "/images/courier.jpg",
  // hydraulic / industrial (stock fallbacks)
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
      const dur = 1400, start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0, rootMargin: "0px 0px -20px 0px" });
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

function ServiceCard({ num, name, short, img, contain }: { num: string; name: string; short: string; img?: string; contain?: boolean }) {
  const ORANGE = "#FDB927";
  return (
    <a href="#kapcsolat" className="group relative rounded-3xl overflow-hidden flex flex-col no-underline w-full h-full block"
      style={{ background: "hsl(158 55% 8%)", border: "1px solid rgba(255,255,255,0.08)", transition: "border-color 0.25s ease, box-shadow 0.25s ease" }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(253,185,39,0.55)"; el.style.boxShadow = "0 0 60px rgba(253,185,39,0.18), inset 0 0 0 1px rgba(253,185,39,0.55)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.boxShadow = "none"; }}>

      {/* Image area */}
      <div className="relative flex-1 overflow-hidden" style={{ background: "hsl(158 40% 11%)" }}>
        {img ? (
          <>
            <img src={img} alt={name} loading="lazy"
              className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${contain ? "object-contain p-6" : "object-cover"}`}
              style={{ filter: contain ? "drop-shadow(0 8px 24px rgba(0,0,0,0.5))" : "saturate(0.8) contrast(1.1) brightness(0.85)" }} />
            {!contain && (
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(158 55% 8%) 20%, transparent 70%)" }} />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center select-none"
            style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(253,185,39,0.05), transparent 70%)" }}>
            <span className="font-black" style={{ fontSize: "9rem", color: ORANGE, opacity: 0.07, lineHeight: 1 }}>{num}</span>
          </div>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: "rgba(253,185,39,0.07)" }} />
      </div>

      {/* Text area */}
      <div className="p-5 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-start justify-between mb-1.5">
          <span className="text-[11px] font-black tracking-widest" style={{ color: ORANGE }}>{num}</span>
          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: ORANGE }} />
        </div>
        <h3 className="font-black text-[1.15rem] leading-tight mb-1 transition-colors duration-200 group-hover:text-[hsl(43_98%_68%)]">{name}</h3>
        <p className="text-xs leading-relaxed" style={{ color: "hsl(158 16% 46%)" }}>{short}</p>
      </div>
    </a>
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
  "HIDRAULIKA JAVÍTÁS", "Hidraulika szivattyú", "Hidromotor",
  "Orbit", "Vezérlőtömb", "Munkahenger",
];

const services = [
  {
    icon: Wrench,
    num: "01",
    title: "Hidraulika Javítás",
    desc: "Hidraulikus alkatrészek teljes körű diagnózisa, javítása és felújítása — minden típushoz, minden gyártóhoz, gyári minőségű alkatrészekkel. 24–48 órás átfutás, 6 hónap garancia.",
    img: IMGS.pump,
    tags: ["Axial", "Radial", "Lapátos", "Fogaskerekes", "Hidromotor", "Vezérlőtömb", "Munkahenger", "Orbit"],
  },
];

const whyUs = [
  { icon: Zap,          t: "24–48 óra — nem napok",         d: "Amíg a konkurencia heteket vár, mi 24–48 óra alatt visszaadjuk a javított alkatrészt. Minden állásban töltött nap pénzbe kerül Önnek — mi ezt értjük." },
  { icon: CheckCircle2, t: "Minden gyártó, minden típus",    d: "Komatsu, Caterpillar, Bosch Rexroth, Parker, ZF, Liebherr, Kawasaki és minden más gyártó. Nem küldjük el azzal, hogy 'ezt nem vállaljuk'." },
  { icon: PackageCheck, t: "Csak gyári minőségű alkatrész",  d: "Kizárólag gyári vagy gyári minőségű tömítéseket és alkatrészeket használunk. Olcsó utángyártott helyett tartós minőség — hogy ne kelljen hamar visszahozni." },
  { icon: ShieldCheck,  t: "6 hónap írásos garancia",        d: "Minden javításra 6 hónapos teljes körű, írásos garanciát vállalunk. Ha bármi probléma adódna a javított alkatrészen, ingyen és azonnal megoldjuk." },
  { icon: Truck,        t: "Ingyenes oda-vissza futár",      d: "Egy telefonhívás — és a futárunk megy Önhöz. Nem kell leállítani a munkát, nem kell személyesen leadni. Mi jövünk, mi visszük, mi visszahozzuk." },
];

const brands = [
  "Komatsu", "Caterpillar", "Bosch", "Rexroth", "Poclain",
  "Sauer-Danfoss", "Liebherr", "Vickers", "Eaton", "Parker",
  "Hitachi", "Kobelco", "Linde", "Kawasaki", "KYB Kayaba",
  "Nachi", "Char-Lynn", "Case", "JCB", "KYB",
  "Dana", "Spicer", "Carraro", "Allison", "ZF", "Hydromatik",
];

const processSteps = [
  {
    icon: Truck, num: "01", title: "Futárunk elhozza Öntől a meghibásodott alkatrészt.",
    desc: "Ön kiszereli az alkatrészt, becsomagolja — futárunk átveszi és beszállítja szakműhelyünkbe.",
    detail: "Hétfő–Péntek 08:00–15:30",
  },
  {
    icon: ClipboardCheck, num: "02", title: "Adunk egy pontos árajánlatot a hidraulika javításról és a javítási határidőről!",
    desc: "Sok olyan jellegű hiba van, amelyekre nem lehet előre pontos árat mondani, csak a bevizsgálást követően. Részletes, írásos árajánlatot küldünk — munkához csak az Ön jóváhagyása után fogunk.",
    detail: "Írásos árajánlat 24 órán belül",
  },
  {
    icon: Wrench, num: "03", title: "Ön elfogadja – mi megjavítjuk.",
    desc: "Gyári vagy gyári minőségű alkatrészekkel és tömítésekkel végezzük el a javítást. Minden munkafázist dokumentálunk, a javítást tesztelés követi.",
    detail: "Átlag 24–48 óra átfutás",
  },
  {
    icon: PackageCheck, num: "04", title: "Visszaszállítjuk a felújított egységet.",
    desc: "A kész, tesztelt alkatrészt visszaszállítjuk az Ön által megadott helyszínre. 6 hónap írásos garancia minden elvégzett javításra.",
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
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const countyInfoRef = useRef<HTMLDivElement>(null);
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
      setShowMobileCTA(y > 300);
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

      {/* JSON-LD — @graph: WebSite + LocalBusiness + FAQPage */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": "https://www.hidraulikajavitas.com/#website",
            "url": "https://www.hidraulikajavitas.com",
            "name": "Hidraulika Javítás — Hidraulika Service TEAM Kft.",
            "description": "Hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok márkafüggetlen javítása. 24–48 órás átfutás, 6 hónap garancia, ingyenes országos futárszolgálat.",
            "inLanguage": "hu-HU",
            "publisher": { "@id": "https://www.hidraulikajavitas.com/#business" },
          },
          {
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
              "height": 800,
            },
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.hidraulikajavitas.com/images/workshop-1.jpg",
              "width": 512,
              "height": 512,
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Soroksári út 48, Malom Udvar, 8. épület, földszint",
              "addressLocality": "Budapest",
              "postalCode": "1095",
              "addressRegion": "Budapest",
              "addressCountry": "HU",
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 47.4669,
              "longitude": 19.0744,
            },
            "hasMap": "https://maps.google.com/maps?q=Soroks%C3%A1ri+%C3%BAt+48+Budapest+1095",
            "openingHoursSpecification": [{
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
              "opens": "08:00",
              "closes": "17:00",
            }],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+36309111474",
              "contactType": "customer service",
              "availableLanguage": { "@type": "Language", "name": "Hungarian" },
              "areaServed": "HU",
              "hoursAvailable": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                "opens": "08:00",
                "closes": "17:00",
              },
            },
            "employee": [
              {
                "@type": "Person",
                "@id": "https://www.hidraulikajavitas.com/#person-pos-gabor",
                "name": "Poós Gábor",
                "jobTitle": "Alapító & Műszaki Vezető",
              },
              {
                "@type": "Person",
                "@id": "https://www.hidraulikajavitas.com/#person-andreka-ferenc",
                "name": "Andréka Ferenc",
                "jobTitle": "Vezető Hidraulika Szerelő",
              },
            ],
            "founder": [{ "@id": "https://www.hidraulikajavitas.com/#person-pos-gabor" }],
            "numberOfEmployees": { "@type": "QuantitativeValue", "value": 2 },
            "areaServed": [
              { "@type": "Country", "name": "Magyarország" },
              ...counties.map(c => ({ "@type": "AdministrativeArea", "name": c })),
            ],
            "description": "Hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok márkafüggetlen javítása. 24–48 órás átfutás, 6 hónap garancia, ingyenes országos futárszolgálat.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "ratingCount": String(testimonials.length),
              "reviewCount": String(testimonials.length),
              "bestRating": "5",
              "worstRating": "1",
            },
            "review": testimonials.map(t => ({
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1",
              },
              "author": { "@type": "Person", "name": t.name },
              "reviewBody": t.text,
              "inLanguage": "hu-HU",
              "publisher": { "@id": "https://www.hidraulikajavitas.com/#business" },
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
                  "provider": { "@id": "https://www.hidraulikajavitas.com/#business" },
                  "areaServed": { "@type": "Country", "name": "Magyarország" },
                  "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": "https://www.hidraulikajavitas.com",
                    "servicePhone": "+36309111474",
                    "availableLanguage": { "@type": "Language", "name": "Hungarian" },
                  },
                },
              })),
            },
          },
          {
            "@type": "FAQPage",
            "@id": "https://www.hidraulikajavitas.com/#faq",
            "mainEntity": faq.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a,
                "inLanguage": "hu-HU",
              },
            })),
          },
        ],
      })}} />

      {/* ══════════════════════════════════════════════════
          NAVIGATION
      ══════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <div className="w-full max-w-5xl" style={{ animation: "fade-in 0.65s cubic-bezier(0.22,1,0.36,1) both" }}>
          <div ref={navInnerRef} className="flex items-center justify-between px-3 pr-3" style={{
            height: 58,
            background: scrolled ? "rgba(4,20,14,0.97)" : "rgba(4,20,14,0.85)",
            backdropFilter: "blur(20px) saturate(1.8)",
            WebkitBackdropFilter: "blur(20px) saturate(1.8)",
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
              <img src="/images/logo.svg" alt="Hidraulikajavítás.hu" className="h-9 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105" />
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
              {/* Mobile-only compact call button */}
              <a href="tel:+36309111474" aria-label="Hívjon most"
                className="sm:hidden w-10 h-10 rounded-full flex items-center justify-center no-underline"
                style={{ background: "rgba(253,185,39,0.15)", border: "1px solid rgba(253,185,39,0.4)", color: ORANGE }}>
                <Phone size={15} />
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
            background: "rgba(4,20,14,0.97)", backdropFilter: "blur(16px) saturate(1.6)",
            border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            maxHeight: menuOpen ? 520 : 0, opacity: menuOpen ? 1 : 0,
            marginTop: menuOpen ? "0.5rem" : 0, pointerEvents: menuOpen ? "auto" : "none",
            transition: "max-height 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease, margin-top 0.35s ease",
          }}>
            <div className="p-4 flex flex-col gap-1">
              {/* Logo centered at top of drawer */}
              <div className="flex flex-col items-center gap-1.5 py-3 mb-1">
                <img src="/images/logo.svg" alt="Hidraulikajavítás.hu" className="h-10 w-auto" />
              </div>
              <div className="mb-1" style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
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

        {/* Film grain — SVG feTurbulence at very low opacity for tactile texture */}
        <div className="absolute inset-0 pointer-events-none z-0 select-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.028,
          mixBlendMode: "overlay",
        }} />

        <div className="grid lg:grid-cols-[1fr_0.9fr] min-h-screen relative z-10">

          {/* LEFT — text */}
          <div className="flex flex-col justify-center pt-32 pb-16 px-6 md:px-10 lg:px-16 xl:px-20">

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
                <span className="block mt-2" style={{ fontSize: "clamp(1.1rem,3vw,2.2rem)", color: "rgba(250,244,230,0.55)", fontWeight: 800, letterSpacing: "0.06em" }}>
                  <span style={{ fontSize: "1.5em", fontWeight: 900, lineHeight: 0.85, background: `linear-gradient(135deg, ${ORANGE}, #fff176)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>H</span>idraulika{" "}
                  <span style={{ fontSize: "1.5em", fontWeight: 900, lineHeight: 0.85, background: `linear-gradient(135deg, ${ORANGE}, #fff176)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>S</span>ervice{" "}
                  <span style={{ fontSize: "1.5em", fontWeight: 900, lineHeight: 0.85, background: `linear-gradient(135deg, ${ORANGE}, #fff176)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>T</span>eam
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <div className="mb-10 h-0.5 w-14 rounded-full" style={{ background: "linear-gradient(90deg, hsl(43 98% 54%), transparent)" }} />
            </Reveal>

            <Reveal delay={180}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+36309111474"
                  className="group glint cta-pulse relative inline-flex items-center justify-center gap-3 rounded-full font-black text-white no-underline w-full sm:w-auto"
                  style={{ background: ORANGE, height: "4.5rem", paddingLeft: "2.5rem", paddingRight: "2.5rem", fontSize: "1.25rem", boxShadow: "0 0 60px rgba(253,185,39,0.55), 0 8px 32px rgba(253,185,39,0.35)" }}>
                  <Phone size={22} /> Hívjon most!
                </a>
                <a href="#kapcsolat"
                  className="btn-hover inline-flex items-center justify-center gap-3 rounded-full font-bold no-underline w-full sm:w-auto"
                  style={{ height: "4.5rem", paddingLeft: "2.5rem", paddingRight: "2.5rem", fontSize: "1.1rem", color: "hsl(40 20% 97%)", border: "2px solid rgba(253,185,39,0.45)", background: "rgba(253,185,39,0.07)" }}>
                  Kérek visszahívást
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — image mosaic */}
          <div className="hidden lg:flex flex-col justify-center gap-4 p-8 pr-12 pt-28 pb-28">
            <Reveal delay={100}>
              <div className="relative rounded-3xl overflow-hidden" style={{ height: 280, border: "1px solid rgba(255,255,255,0.07)" }}>
                <img src={IMGS.workshop1} alt="Hidraulika javítás műhely" className="w-full h-full object-cover"
                  style={{ filter: "saturate(0.75) contrast(1.1) brightness(0.85)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,20,14,0.5), transparent)" }} />
                {/* Floating stat */}
                <div className="glass absolute bottom-4 left-4 rounded-2xl px-4 py-3 animate-float">
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: "hsl(158 16% 50%)" }}>Garancia</p>
                  <p className="text-lg font-black">6 hónap</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="relative rounded-3xl overflow-hidden" style={{ height: 180, border: "1px solid rgba(255,255,255,0.07)" }}>
                <img src={IMGS.timberjack} alt="Erdészeti munkagép hidraulika" className="w-full h-full object-cover"
                  style={{ filter: "saturate(0.7) contrast(1.15) brightness(0.8)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,20,14,0.6), transparent)" }} />
                <div className="glass absolute bottom-3 left-3 rounded-xl px-3 py-2 animate-float" style={{ animationDelay: "-3s" }}>
                  <p className="text-[9px] uppercase tracking-widest" style={{ color: "hsl(158 16% 50%)" }}>Javítás</p>
                  <p className="text-sm font-black">5000+</p>
                </div>
              </div>
            </Reveal>
          </div>
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
          COVERAGE
      ══════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(253,185,39,0.04), transparent 70%)" }} />
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <Chip>Lefedettség</Chip>
              <h2 className="text-4xl md:text-5xl mt-5 mb-5 font-black" style={{ lineHeight: 0.95 }}>
                Bárhová megyünk<br />az országban.
              </h2>
              <div className="mb-6 h-0.5 w-12 rounded-full" style={{ background: `linear-gradient(90deg, ${ORANGE}, transparent)` }} />
              <p className="leading-relaxed text-[15px] max-w-sm mb-8" style={{ color: "hsl(158 16% 55%)" }}>
                Nem számít, hol van a gépe — futárunk elmegy Önhöz, átveszi az alkatrészt, és visszahozza megjavítva. Egész Magyarország területét lefedjük.
              </p>
              <a href="tel:+36309111474"
                className="btn-hover glint inline-flex items-center gap-2.5 h-12 px-8 rounded-full text-base font-black no-underline"
                style={{ background: ORANGE, color: "#04111f", boxShadow: "0 0 40px rgba(253,185,39,0.35)" }}>
                <Phone size={16} /> Hívjon most — ingyenes
              </a>
            </Reveal>

            <Reveal delay={80}>
              <div className="relative rounded-3xl p-6 overflow-hidden"
                style={{ background: "hsl(158 58% 9%)", border: "1px solid rgba(253,185,39,0.12)" }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[60px] opacity-10 pointer-events-none"
                  style={{ background: ORANGE }} />
                <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-4" style={{ color: "hsl(158 16% 40%)" }}>
                  Mind a 20 megye — teljes lefedettség
                </p>
                <div className="flex flex-wrap gap-2">
                  {counties.map((c, i) => (
                    <span key={c}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        background: countyMeta[c]?.tier === "kiemelt" ? "rgba(253,185,39,0.15)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${countyMeta[c]?.tier === "kiemelt" ? "rgba(253,185,39,0.35)" : "rgba(255,255,255,0.08)"}`,
                        color: countyMeta[c]?.tier === "kiemelt" ? "hsl(43 98% 68%)" : "hsl(158 16% 65%)",
                        animationDelay: `${i * 60}ms`,
                      }}>
                      <span style={{ color: countyMeta[c]?.tier === "kiemelt" ? ORANGE : "hsl(158 40% 45%)", fontSize: "0.6rem" }}>✓</span>
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-5 pt-4 flex items-center gap-5 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "hsl(158 16% 40%)" }}>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: ORANGE, boxShadow: `0 0 6px ${ORANGE}` }} />
                    Kiemelt hálózat
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "rgba(255,255,255,0.2)" }} />
                    Aktív lefedettség
                  </span>
                  <span className="ml-auto font-semibold" style={{ color: "hsl(43 98% 58%)" }}>20 / 20 megye ✓</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICES — bento image grid
      ══════════════════════════════════════════════════ */}
      <section id="szolgaltatasok" className="py-28 relative overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none blur-[120px] opacity-[0.07]"
          style={{ background: `radial-gradient(ellipse, ${ORANGE}, transparent 70%)` }} />

        <div className="container mx-auto px-6">

          {/* Header */}
          <Reveal>
            <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <Chip>Javítási területek</Chip>
                <h2 className="mt-4 font-black leading-[0.9]" style={{ fontSize: "clamp(3.2rem,8vw,6.5rem)", letterSpacing: "-0.03em" }}>
                  MIT<br /><span style={{ color: ORANGE }}>JAVÍTUNK?</span>
                </h2>
              </div>
              <p className="max-w-sm text-base leading-relaxed lg:text-right" style={{ color: "hsl(158 16% 50%)" }}>
                Minden hidraulikus alkatrész — szivattyúktól az orbit motorig. Márkafüggetlenül, gyári minőségű alkatrészekkel, 6 hónap garanciával.
              </p>
            </div>
          </Reveal>

          {/* Bento grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[260px] gap-4">

            {/* 01 — Axial (wide) */}
            <Reveal delay={60} className="md:col-span-2">
              <ServiceCard num="01" name="Axiál dugattyús szivattyú" short="Nagy nyomású, dugattyús — kotrógépek és nehézgépek elengedhetetlen alkatrésze." img="/images/Hidraulika_axialdugattyus.jpg" />
            </Reveal>

            {/* 02 — Radial */}
            <Reveal delay={100}>
              <ServiceCard num="02" name="Radiál dugattyús szivattyú" short="Radiális dugattyús, robusztus kialakítás nehézipari alkalmazásokhoz." img="/images/Hidraulika_Radialdugattyus_szivattyu.png" contain />
            </Reveal>

            {/* 03 — Lapátos */}
            <Reveal delay={130}>
              <ServiceCard num="03" name="Lapátos szivattyú" short="Lamellás betétek, patronok és házak — komplett felújítás." img="/images/Hidraulika_lapatos.jpg" contain />
            </Reveal>

            {/* 04 — Fogaskerekes */}
            <Reveal delay={160}>
              <ServiceCard num="04" name="Fogaskerekes szivattyú" short="Egyszerű, megbízható — gyors csere, versenyképes ár." img="/images/Hidraulika_fogaskerek.jpg" contain />
            </Reveal>

            {/* 05 — Hidromotor */}
            <Reveal delay={190}>
              <ServiceCard num="05" name="Hidromotor" short="Hidraulikus energiát forgómozgássá alakít — nagy nyomaték, precíz vezérlés." img="/images/Hidraulika_ORBIT.jpg" contain />
            </Reveal>

            {/* 06 — Vezérlőtömb (wide) */}
            <Reveal delay={220} className="md:col-span-2">
              <ServiceCard num="06" name="Vezérlőtömb" short="Szelepek, blokkok javítása — a rendszer agyát is megjavítjuk." img="/images/Hidraulika_vezerlotomb.jpg" contain />
            </Reveal>

            {/* 07 — Munkahenger (wide) */}
            <Reveal delay={250} className="md:col-span-2">
              <ServiceCard num="07" name="Munkahenger" short="Tömítéscsere, krómozás, henger felújítás — minden méretben, minden nyomástartományban." img="/images/Hidraulika_munkahenger.jpg" contain />
            </Reveal>

            {/* 08 — Orbit (wide) */}
            <Reveal delay={280} className="md:col-span-2">
              <ServiceCard num="08" name="Orbit motor" short="Kompakt, nagy nyomatékú — mezőgazdasági és erdészeti gépekben mindennapos." />
            </Reveal>

          </div>

          {/* Bottom CTA */}
          <Reveal delay={340}>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-5 rounded-3xl p-7"
              style={{ background: "linear-gradient(135deg, rgba(253,185,39,0.08), rgba(16,185,129,0.06))", border: "1px solid rgba(253,185,39,0.2)" }}>
              <div className="flex-1">
                <p className="font-black text-xl">Nem tudja pontosan mi a hiba?</p>
                <p className="text-sm mt-1" style={{ color: "hsl(158 16% 52%)" }}>Hívjon — ingyenesen megmondjuk mi a probléma és mennyibe kerül a javítás.</p>
              </div>
              <a href="tel:+36309111474"
                className="glint cta-pulse shrink-0 inline-flex items-center gap-2.5 rounded-full font-black no-underline"
                style={{ background: ORANGE, color: "#04111f", height: "3.5rem", paddingLeft: "2.25rem", paddingRight: "2.25rem", fontSize: "1.05rem", boxShadow: "0 0 50px rgba(253,185,39,0.4)" }}>
                <Phone size={17} /> +36 30 911 1474
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY US — conversion-focused
      ══════════════════════════════════════════════════ */}
      {false && <section className="py-28 relative overflow-hidden" style={{ background: BG2 }}>
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
                  Hétfő–Péntek 08:00–15:30
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
      </section>}

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
                    { icon: ShieldCheck, t: "Garancia",                d: "6 hónap garancia javításra és 12 hónap garancia új értékesítés esetén." },
                    { icon: Truck,       t: "Országos futárszolgálat", d: "Egész országra kiterjedő, kedvező oda-visszaszállítás, tanácsadás." },
                    { icon: CheckCircle2,t: "100% minőség",            d: "A hidraulika felújítás után az Ön hidraulikus egysége gyakorlatilag úgy működik, mint az új!" },
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
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setFormState("loading");
                        const fd = new FormData(e.currentTarget);
                        try {
                          await submitContact({
                            data: {
                              name: fd.get("name") as string,
                              phone: fd.get("phone") as string,
                              email: (fd.get("email") as string) || "",
                              partType: (fd.get("partType") as string) || "",
                              description: (fd.get("description") as string) || "",
                            },
                          });
                          setFormState("success");
                        } catch (err) {
                          console.error("[contact form]", err);
                          setFormState("idle");
                        }
                      }}>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          { label: "Név",         type: "text", name: "name",  placeholder: "Adja meg nevét",     required: true },
                          { label: "Telefonszám", type: "tel",  name: "phone", placeholder: "+36 30 000 0000",    required: true },
                        ].map(({ label, type, name, placeholder, required }) => (
                          <div key={label}>
                            <label className="text-[10px] font-semibold uppercase tracking-widest mb-2 block" style={{ color: "hsl(158 16% 48%)" }}>{label}</label>
                            <input type={type} name={name} placeholder={placeholder} required={required}
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
                        <input type="email" name="email" placeholder="pelda@email.hu"
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-[border-color,background-color] duration-200 ease-out"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "hsl(40 20% 97%)" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(253,185,39,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-widest mb-2 block" style={{ color: "hsl(158 16% 48%)" }}>Alkatrész típusa</label>
                        <select name="partType" defaultValue=""
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
                        <textarea name="description" rows={4} placeholder="Röviden írja le a hibát és a gép típusát..."
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
                  26 vezető gyártó.<br />
                  <span style={{ color: ORANGE }}>Egy megbízható szerviz.</span>
                </h2>
              </div>
              <div className="max-w-sm">
                <p className="text-base leading-relaxed" style={{ color: "hsl(158 16% 55%)" }}>
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
            {(() => { const mb = brands.filter(b => b !== "Leslie Hidraulika" && b !== "Ponar"); return [...mb,...mb,...mb,...mb]; })().map((b, i) => (
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
            {(() => { const mb = brands.filter(b => b !== "Leslie Hidraulika" && b !== "Ponar"); return [...mb,...mb,...mb,...mb]; })().map((b, i) => (
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

          {/* Strategic partners */}
          <div className="mt-14 pt-10" style={{ borderTop: "1px solid rgba(253,185,39,0.12)" }}>
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.24em] mb-8" style={{ color: "hsl(158 16% 42%)" }}>
              Hidraulika elemekben stratégiai partnerünk
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {[
                { src: "/images/brand-leslie.jpg", alt: "Leslie Hidraulika" },
                { src: "/images/brand-ponar.jpg",  alt: "Ponar Wadowice" },
              ].map(({ src, alt }) => (
                <a key={alt} href="https://hidraulikaelem.hu/" target="_blank" rel="noopener noreferrer"
                  className="rounded-2xl overflow-hidden flex items-center justify-center px-6 py-4 no-underline"
                  style={{ background: "rgba(255,255,255,0.92)", boxShadow: "0 0 0 1px rgba(253,185,39,0.2), 0 8px 32px rgba(0,0,0,0.35)" }}>
                  <img src={src} alt={alt} className="h-12 w-auto object-contain" />
                </a>
              ))}
            </div>
          </div>
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
                A javítás<br /><span style={{ color: ORANGE }}>folyamata.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed" style={{ color: "hsl(158 16% 55%)" }}>
                Sok olyan jellegű hiba van, amelyekre nem lehet előre pontos árat mondani, csak a bevizsgálást követően.
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
        <button onClick={() => {
            // Override CSS scroll-behavior:smooth which can make this take 5+ seconds on long pages
            document.documentElement.style.scrollBehavior = "auto";
            document.body.style.scrollBehavior = "auto";
            window.scrollTo(0, 0);
            requestAnimationFrame(() => {
              document.documentElement.style.scrollBehavior = "";
              document.body.style.scrollBehavior = "";
            });
          }} aria-label="Vissza a tetejére"
          className="fixed right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer btn-hover"
          style={{ bottom: showMobileCTA ? 88 : 24, transition: "bottom 0.3s cubic-bezier(0.22,1,0.36,1)", background: ORANGE, boxShadow: "0 4px 28px rgba(253,185,39,0.45)", border: "none", color: "white", animation: "card-in 0.3s cubic-bezier(0.22,1,0.36,1) both" }}>
          <ArrowUp size={20} />
        </button>
      )}

      {/* ── Mobile bottom CTA bar ─── */}
      {showMobileCTA && (
        <div className="md:hidden fixed left-0 right-0 z-40"
          style={{
            bottom: 0,
            transition: "bottom 0.3s cubic-bezier(0.22,1,0.36,1)",
            animation: "slide-up 0.35s cubic-bezier(0.22,1,0.36,1) both",
            background: "rgba(3,16,11,0.97)",
            backdropFilter: "blur(12px) saturate(1.5)",
            WebkitBackdropFilter: "blur(12px) saturate(1.5)",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 -8px 30px rgba(0,0,0,0.4)",
          }}>
          <div className="flex gap-3 p-3" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
            <a href="tel:+36309111474"
              className="btn-hover flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl text-sm font-bold no-underline"
              style={{ background: ORANGE, color: "#04111f" }}>
              <Phone size={15} /> Hívjon most
            </a>
            <a href="#kapcsolat"
              className="btn-hover flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl text-sm font-semibold text-white no-underline"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
              Árajánlatot kérek
            </a>
          </div>
        </div>
      )}


      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer className="py-16 relative" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "hsl(158 65% 3%)", paddingBottom: showMobileCTA ? "88px" : undefined }}>
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

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(158 16% 36%)" }}>Navigáció</p>
              <div className="flex flex-col gap-2">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} className="text-sm no-underline transition-colors"
                    style={{ color: "hsl(158 16% 48%)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(40 20% 97%)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(158 16% 48%)")}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(158 16% 36%)" }}>Szolgáltatásaink</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Hidraulika hiba",             href: "/hidraulika-hiba" },
                  { label: "Hidraulika javítás",          href: "/#szolgaltatasok" },
                  { label: "Hidraulika szivattyú",        href: "/hidraulika-szivattyu-hidromotor-munkahenger" },
                  { label: "Hidromotor",                  href: "/hidraulika-szivattyu-hidromotor-munkahenger" },
                  { label: "Hidraulikus munkahenger",     href: "/hidraulika-szivattyu-hidromotor-munkahenger" },
                  { label: "Ingyenes tanácsadás",         href: "/#kapcsolat" },
                  { label: "Országos futárszolgálat",     href: "/#folyamat" },
                ].map((l) => (
                  <a key={l.label} href={l.href} className="text-sm no-underline transition-colors"
                    style={{ color: "hsl(158 16% 48%)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(40 20% 97%)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(158 16% 48%)")}>
                    {l.label}
                  </a>
                ))}
              </div>
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
              {[
                { label: "Adatvédelmi tájékoztató", href: "/adatkezeles" },
                { label: "ÁSZF",                    href: "/aszf" },
                { label: "Impresszum",              href: "/impresszum" },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="no-underline transition-colors" style={{ color: "rgba(255,255,255,0.2)" }}
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
