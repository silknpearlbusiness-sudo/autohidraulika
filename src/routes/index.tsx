import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Phone,
  Truck,
  ClipboardCheck,
  Wrench,
  PackageCheck,
  Mail,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
  Menu,
  X,
  ArrowUp,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { submitContact } from "@/lib/api/contact.functions";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hidraulika Javítás Budapest | Szivattyú, Motor, Henger Felújítás — 6 Hónap Garancia" },
      {
        name: "description",
        content:
          "Hidraulika javítás Budapesten és országosan: hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok szakszerű felújítása. Márkafüggetlen szerviz, 6 hónap garancia, országos futárszolgálat. Hívjon: +36 30 911 1474",
      },
      {
        name: "keywords",
        content:
          "hidraulika javítás, hidraulika javítás Budapest, hidraulikus szivattyú javítás, hidraulikus motor javítás, hidraulikus henger javítás, hidraulika henger felújítás, orbit motor javítás, vezérlőtömb javítás, hidraulika szerviz, hidraulika felújítás, munkagép hidraulika javítás, kotrógép hidraulika, dugattyús szivattyú javítás, fogaskerék szivattyú, axiális motor, márkafüggetlen hidraulika szerviz, Bosch Rexroth javítás, Komatsu hidraulika, Caterpillar hidraulika, Parker szivattyú",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "author", content: "Hidraulika Service TEAM Kft." },
      { name: "language", content: "Hungarian" },
      { name: "geo.region", content: "HU-BU" },
      { name: "geo.placename", content: "Budapest" },
      { name: "geo.position", content: "47.4669;19.0744" },
      { name: "ICBM", content: "47.4669, 19.0744" },

      { property: "og:title", content: "Hidraulika Javítás Budapest | Hidraulika Service TEAM Kft." },
      { property: "og:description", content: "Hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok márkafüggetlen javítása. 6 hónap garancia,országos futárszolgálat." },
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

// ── Images — real business photos ────────────────────────
const IMGS = {
  workshop1:  "/images/ZW550-6-768x690.webp",
  workshop2:  "/images/workshop-2.jpg",
  timberjack: "/images/3737280468_219458a037_b.jpg",
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

function OrangeDot() {
  return (
    <span className="w-1.5 h-1.5 rounded-full inline-block"
      style={{ background: "hsl(43 98% 54%)", animation: "pulse-glow 2s ease-in-out infinite" }} />
  );
}

// ── Data ────────────────────────────────────────────────
const navLinks = [
  { href: "#kapcsolat", label: "Kapcsolat" },
  { href: "#szolgaltatasok", label: "Szolgáltatások" },
  { href: "#folyamat", label: "Folyamat" },
  { href: "#gyik", label: "GYIK" },
];

const marqueeItems = [
  "HIDRAULIKA JAVÍTÁS", "Hidraulika szivattyú", "Hidromotor",
  "Orbit", "Vezérlőtömb", "Munkahenger",
];

// What we repair — real part photos shown in the szolgáltatások preview panel
const repairItems = [
  { num: "01", name: "Axiál dugattyús szivattyú",  short: "Nagy nyomású, dugattyús — kotrógépek és nehézgépek elengedhetetlen alkatrésze.",              img: "/images/Hidraulika_axialdugattyus.jpg" },
  { num: "02", name: "Radiál dugattyús szivattyú", short: "Radiális dugattyús, robusztus kialakítás nehézipari alkalmazásokhoz.",                        img: "/images/radialszivattyu.gif" },
  { num: "03", name: "Lapátos szivattyú",          short: "Lamellás betétek, patronok és házak — komplett felújítás.",                                   img: "/images/Hidraulika_lapatos.jpg" },
  { num: "04", name: "Fogaskerekes szivattyú",     short: "Egyszerű, megbízható — gyors csere, versenyképes ár.",                                        img: "/images/Hidraulika_fogaskerek.jpg" },
  { num: "05", name: "Hidromotor",                 short: "Hidraulikus energiát forgómozgássá alakít — nagy nyomaték, precíz vezérlés.",                 img: "/images/Hidraulika_ORBIT.jpg" },
  { num: "06", name: "Vezérlőtömb",                short: "Szelepek, blokkok javítása — a rendszer agyát is megjavítjuk.",                               img: "/images/Hidraulika_vezerlotomb.jpg" },
  { num: "07", name: "Munkahenger",                short: "Tömítéscsere, krómozás, henger felújítás — minden méretben, minden nyomástartományban.",      img: "/images/Hidraulika_munkahenger.jpg" },
  { num: "08", name: "Orbit motor",                short: "Kompakt, nagy nyomatékú — mezőgazdasági és erdészeti gépekben mindennapos.",                  img: "/images/orbitmotor.webp" },
];

const services = [
  {
    icon: Wrench,
    num: "01",
    title: "Hidraulika Javítás",
    desc: "Hidraulikus alkatrészek teljes körű diagnózisa, javítása és felújítása — minden típushoz, minden gyártóhoz, gyári minőségű alkatrészekkel. 24–48 órás átfutás, 6 hónap garancia.",
    tags: ["Axial", "Radial", "Lapátos", "Fogaskerekes", "Hidromotor", "Vezérlőtömb", "Munkahenger", "Orbit"],
  },
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
    desc: "Sok olyan jellegű hiba van, amelyekre nem lehet előre pontos árat mondani, csak a bevizsgálást követően. Részletes, árajánlatot adunk — munkához csak az Ön jóváhagyása után fogunk.",
  },
  {
    icon: Wrench, num: "03", title: "Ön elfogadja – mi megjavítjuk.",
    desc: "Gyári vagy gyári minőségű alkatrészekkel és tömítésekkel végezzük el a javítást. Minden munkafázist dokumentálunk, a javítást tesztelés követi.",
  },
  {
    icon: PackageCheck, num: "04", title: "Visszaszállítjuk a felújított egységet.",
    desc: "A kész, tesztelt alkatrészt visszaszállítjuk az Ön által megadott helyszínre. 6 hónap garancia minden elvégzett javításra.",
    detail: "6 hónap garancia",
  },
];

const faq = [
  { q: "Milyen hidraulikus alkatrészeket javítanak?", a: "Hidraulika szivattyúk (dugattyús, lapátos, fogaskerék), hidromotorokat, munkahengereket, orbit motorokat és vezérlőtömböket. Márkafüggetlenül." },
  { q: "Mennyi idő alatt készül el a hidraulika javítás?", a: "A hidraulikus egyság beárkezésétol szamítva lehető legröbvidebb időn belül árajanlatot adunk. Összetettebb hibáknál ez hosszabb lehet — erről minden esetben előre tájékoztatjuk." },
  { q: "Milyen garanciát vállalnak a javításokra?", a: "Minden elvégzett javításra 6 hónap teljes körű, garanciát biztosítunk. Új alkatrészek értékesítésénél 12 hónap garancia érvényes." },
  { q: "Hogyan működik az országos futárszolgálat?", a: "Hívja telefonszámunkat, és futárunk az ország bármely pontjára kimegy a kiszerelt alkatrészért. A javítás után visszaszállítjuk az Ön által megadott helyre — természetesen személyesen is behozhatja az ügyfél." },
  { q: "Mennyibe kerül egy átlagos hidraulika javítás?", a: "A javítás ára az alkatrész típusától, a hiba jellegétől és a szükséges anyagoktól függ. Bevizsgálás után pontos, árajánlatot adunk — csak elfogadás után kezdünk." },
  { q: "El kell vinnem személyesen az alkatrészt?", a: "Természetesen elhozhatja, de futárszolgálatunk az ország bármely pontjáról begyűjti a hibás egységet, mi elvégezzük a javítást, majd visszaszállítjuk." },
];

const counties = [
  "Budapest","Pest","Győr-Moson-Sopron","Vas","Zala",
  "Somogy","Baranya","Tolna","Fejér","Komárom-Esztergom",
  "Veszprém","Bács-Kiskun","Csongrád-Csanád","Békés","Hajdú-Bihar",
  "Szabolcs-Sz-B","Jász-NK-Sz","Heves","Nógrád","Borsod-A-Z",
];

// ── Page ─────────────────────────────────────────────────
function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [formState, setFormState] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [activeService, setActiveService] = useState(0);

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
                "jobTitle": " Alapito tulajdonos",
              },
            ],
            "founder": [{ "@id": "https://www.hidraulikajavitas.com/#person-pos-gabor" }],
            "numberOfEmployees": { "@type": "QuantitativeValue", "value": 2 },
            "areaServed": [
              { "@type": "Country", "name": "Magyarország" },
              ...counties.map(c => ({ "@type": "AdministrativeArea", "name": c })),
            ],
            "description": "Hidraulikus szivattyúk, motorok, hengerek, orbit motorok és vezérlőblokkok márkafüggetlen javítása. 24–48 órás átfutás, 6 hónap garancia, ingyenes országos futárszolgálat.",
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
              <img src="/images/logo-dark.png" alt="Hidraulikajavítás.com" className="h-8 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{ filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.4))" }} />
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
                <img src="/images/logo-dark.png" alt="Hidraulikajavítás.com" className="h-9 w-auto" />
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
                className="mt-2 flex items-center justify-center gap-2 h-11 rounded-full text-sm font-bold uppercase tracking-wide no-underline"
                style={{ background: ORANGE, color: "#04140d", boxShadow: "0 6px 20px rgba(253,185,39,0.25)" }}>
                <Phone size={13} /> +36 30 911 1474
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════
          HERO — full-bleed photo bg, text left, photos right
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Full-bleed background photo */}
        <div className="absolute inset-0 z-0">
          <img src="/images/Hidraulika_javitas-scaled.jpg" alt="" aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.85) brightness(0.6)", objectPosition: "50% 40%" }} />
          {/* Bottom-heavy dark wash — text lives at the bottom, photo visible at the top */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, hsla(158,62%,5%,0.98) 0%, hsla(158,62%,5%,0.82) 45%, hsla(158,62%,5%,0.4) 100%)",
          }} />
          <div className="absolute inset-x-0 bottom-0 h-48" style={{
            background: "linear-gradient(to top, hsl(158 62% 7%), transparent)",
          }} />
        </div>

        <div className="mx-auto w-full max-w-[1760px] px-6 md:px-10 xl:px-14 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 xl:gap-16 min-h-[100svh]">

            {/* LEFT — text, bottom-anchored */}
            <div className="flex flex-col justify-end pt-32 pb-14 lg:pb-20 min-w-0">

              <Reveal>
                <div className="hazard mb-4" style={{ width: 72, height: 6 }} />
                <p className="mb-5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.22em]" style={{ color: "hsl(43 98% 60%)" }}>
                  Márkafüggetlen szakszerviz — Budapest
                </p>
              </Reveal>

              <Reveal delay={60}>
                <h1 style={{ fontFamily: '"Syne", system-ui, sans-serif', lineHeight: 0.98, margin: 0 }}>
                  <span className="block text-[clamp(2.6rem,13vw,4.5rem)] lg:text-[clamp(3.5rem,6.5vw,7rem)]" style={{ color: "hsl(40 20% 97%)" }}>HIDRAULIKA</span>
                  <span className="block text-[clamp(2.6rem,13vw,4.5rem)] lg:text-[clamp(3.5rem,6.5vw,7rem)]" style={{ color: ORANGE }}>JAVÍTÁS</span>
                </h1>
              </Reveal>

              <Reveal delay={130}>
                <div className="mt-7 max-w-md">
                  <p className="mb-3 text-sm md:text-base font-bold uppercase tracking-[0.18em]" style={{ color: "hsl(40 20% 95%)" }}>
                    Hidraulika Service Team Kft.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed" style={{ color: "hsl(158 14% 65%)" }}>
                    Szivattyúk, hidromotorok, munkahengerek és vezérlőtömbök javítása minden gyártóhoz.
                    Futárunk elhozza az alkatrészt — megjavítjuk, és visszük is vissza.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
                  <a href="tel:+36309111474"
                    className="glint relative inline-flex items-center justify-center gap-3 font-bold uppercase tracking-wide no-underline"
                    style={{ background: ORANGE, color: "#04140d", height: "3.75rem", paddingLeft: "2.25rem", paddingRight: "2.25rem", fontSize: "0.95rem", borderRadius: "10px", boxShadow: "0 6px 22px rgba(253,185,39,0.28)", transition: "transform 0.15s ease, box-shadow 0.15s ease", whiteSpace: "nowrap" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 36px rgba(253,185,39,0.4)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 22px rgba(253,185,39,0.28)"; }}>
                    <Phone size={18} /> Hívjon most!
                  </a>
                  <a href="#kapcsolat" className="inline-flex items-center justify-center sm:justify-start gap-2 py-2 sm:py-0 no-underline font-semibold"
                    style={{ fontSize: "0.95rem", color: "hsl(40 20% 68%)", whiteSpace: "nowrap" }}>
                    Visszahívást kérek <ArrowUpRight size={15} style={{ color: ORANGE }} />
                  </a>
                </div>
              </Reveal>

              {/* Stats — spec-plate badges: icon + big number, industrial data-plate feel */}
              <Reveal delay={240}>
                <div className="mt-10 grid grid-cols-2 gap-3 max-w-md">
                  {[
                    { icon: Wrench,      to: 5000, suffix: "+", label: "Elvégzett munka" },
                    { icon: ShieldCheck, to: 6,    suffix: " hónap", label: "Garancia" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(253,185,39,0.16)" }}>
                      <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(253,185,39,0.1)", border: "1px solid rgba(253,185,39,0.25)" }}>
                        <s.icon size={19} strokeWidth={1.8} style={{ color: ORANGE }} />
                      </div>
                      <div className="min-w-0">
                        <p style={{ fontFamily: '"Syne", system-ui, sans-serif', fontSize: "clamp(1.15rem,2.2vw,1.6rem)", fontWeight: 800, lineHeight: 1, color: "hsl(40 20% 96%)" }}>
                          <Counter to={s.to} suffix={s.suffix} />
                        </p>
                        <p style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: "hsl(158 14% 48%)", marginTop: "0.3rem", textTransform: "uppercase", fontWeight: 700 }}>{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

            </div>

            {/* RIGHT — photo stack */}
            <div className="hidden lg:flex flex-col justify-center gap-4 pt-28 pb-12">
              <Reveal delay={120}>
                <div className="relative rounded-2xl overflow-hidden w-full aspect-[16/8]" style={{ maxHeight: "38vh", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 64px rgba(0,0,0,0.45)" }}>
                  <img src={IMGS.workshop1} alt="Hitachi ZW550 rakodógép hidraulika javítás" className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: "saturate(0.85) contrast(1.05) brightness(0.9)", objectPosition: "50% 42%" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,20,14,0.6), transparent 50%)" }} />
                </div>
              </Reveal>
              <Reveal delay={220}>
                <div className="relative rounded-2xl overflow-hidden w-full aspect-[16/9]" style={{ maxHeight: "36vh", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 64px rgba(0,0,0,0.45)" }}>
                  <img src={IMGS.timberjack} alt="Mezőgazdasági munkagép hidraulika" className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: "saturate(0.8) contrast(1.05) brightness(0.85)", objectPosition: "50% 82%" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,20,14,0.6), transparent 50%)" }} />
                </div>
              </Reveal>
            </div>

          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════
          CONTACT — top pills + 2-col below
      ══════════════════════════════════════════════════ */}
      <section id="kapcsolat" className="py-16 md:py-28 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl mt-4 mb-10 font-black">Rendelje meg<br />a javítást!</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: Phone,  label: "+36 (30) 9111-474",              sub: "Telefonszám", href: "tel:+36309111474" },
                  { icon: Mail,   label: "info@hidraulikajavitas.com",      sub: "Email",       href: "mailto:info@hidraulikajavitas.com" },
                  { icon: MapPin, label: "1095 Budapest, Soroksári út 48",  sub: "Telephely",   href: "#" },
                ].map(({ icon: Icon, label, sub, href }) => (
                  <a key={sub} href={href}
                    className="group flex w-full sm:w-auto items-center gap-4 px-5 sm:px-6 py-4 rounded-2xl no-underline btn-hover text-left"
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
                {/* Workshop location map */}
                <div className="rounded-2xl overflow-hidden mb-5" style={{ border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 48px rgba(0,0,0,0.4)" }}>
                  <iframe
                    title="Hidraulika Service TEAM Kft. — 1095 Budapest, Soroksári út 48"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d331.7077152391974!2d19.07320720044053!3d47.47230352293517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dda277dad9ff%3A0x9d1de55d7f09d840!2sHidraulika%20Service%20Team%20Kft!5e1!3m2!1sen!2shu!4v1783344342140!5m2!1sen!2shu"
                    width="100%" height="300" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"
                    style={{ border: 0, display: "block", filter: "saturate(0.85) contrast(1.02)" }} />
                </div>
                <div className="rounded-2xl p-6 sm:p-7"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(253,185,39,0.16)" }}>
                  <p className="font-black text-xl sm:text-2xl mb-5" style={{ fontFamily: '"Anton", "Arial Narrow", sans-serif', letterSpacing: "0.01em", color: "hsl(40 20% 96%)" }}>
                    HIDRAULIKA SERVICE TEAM KFT.
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    {[
                      { label: "Adószám", value: "32267509-2-43" },
                      { label: "Cégjegyzékszám", value: "01-09-376445" },
                    ].map((row) => (
                      <div key={row.label}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: ORANGE }}>{row.label}</p>
                        <p className="text-sm font-semibold mt-1 tabular-nums" style={{ color: "hsl(40 15% 88%)" }}>{row.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: ORANGE }}>Székhely</p>
                    <p className="text-sm font-semibold mt-1 leading-relaxed" style={{ color: "hsl(40 15% 88%)" }}>
                      1095 Budapest, Soroksári út 48, Malom Udvar<br />8. épület, földszint
                    </p>
                  </div>
                  <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: ORANGE }}>Nyitvatartás</p>
                    <p className="text-sm font-semibold mt-1" style={{ color: "hsl(40 15% 88%)" }}>Hétfő–Péntek: 08:00–15:30</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="glass-strong rounded-3xl p-5 sm:p-8 md:p-10"
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
                          setFormState("error");
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
                      {formState === "error" && (
                        <p className="text-xs font-semibold rounded-xl px-4 py-3"
                          style={{ color: "#fca5a5", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", animation: "reveal-in 0.3s ease both" }}>
                          Hiba történt a küldés során. Kérjük próbálja újra, vagy hívjon minket: +36 30 911 1474
                        </p>
                      )}
                      <button type="submit" disabled={formState === "loading"}
                        className="btn-hover w-full rounded-full text-sm font-bold uppercase tracking-wide py-4 cursor-pointer"
                        style={{
                          background: ORANGE,
                          color: "#04140d",
                          boxShadow: "0 8px 24px rgba(253,185,39,0.2)",
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
          SERVICES — bento image grid
      ══════════════════════════════════════════════════ */}
      <section id="szolgaltatasok" className="py-16 md:py-28 relative overflow-hidden">
        <div className="container mx-auto px-6">

          {/* Header */}
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="font-black leading-[0.9]" style={{ fontSize: "clamp(2.25rem,8.5vw,6rem)", letterSpacing: "0.015em" }}>
                MIT <span style={{ color: ORANGE }}>JAVÍTUNK?</span>
              </h2>
              <p className="max-w-xl mx-auto mt-6 text-base leading-relaxed" style={{ color: "hsl(158 16% 50%)" }}>
                Minden hidraulikus alkatrész — szivattyúktól az orbit motorig. Márkafüggetlenül, gyári minőségű alkatrészekkel, 6 hónap garanciával.
              </p>
            </div>
          </Reveal>

          {/* Service list + live preview panel */}
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-start">
            <div>
              {repairItems.map((s, i) => (
                <Reveal key={s.num} delay={i * 40}>
                  <a href="#kapcsolat"
                    className="group service-row flex items-center gap-4 md:gap-5 py-4 no-underline"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                    onMouseEnter={() => setActiveService(i)}
                    onFocus={() => setActiveService(i)}>
                    {/* Mobile/tablet: thumbnail in the row (desktop uses the side panel) */}
                    <span className="lg:hidden shrink-0 w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.94)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <img src={s.img} alt={s.name} loading="lazy" decoding="async" className="w-full h-full object-contain p-1" />
                    </span>
                    <span className="service-shift hidden lg:block shrink-0 font-black tabular-nums w-10 text-right"
                      style={{ fontSize: "0.75rem", color: activeService === i ? ORANGE : "hsl(158 16% 28%)", letterSpacing: "0.05em", transition: "color 0.2s ease" }}>
                      {s.num}
                    </span>
                    <div className="service-shift flex-1 min-w-0">
                      <h3 className="font-black text-lg leading-tight"
                        style={{ color: activeService === i ? "hsl(43 98% 68%)" : undefined, transition: "color 0.2s ease" }}>
                        {s.name}
                      </h3>
                      <p className="text-sm mt-0.5 leading-relaxed" style={{ color: "hsl(158 16% 46%)" }}>{s.short}</p>
                    </div>
                    <ArrowUpRight size={18} className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" style={{ color: ORANGE }} />
                  </a>
                </Reveal>
              ))}
            </div>

            {/* Preview panel — crossfades as you move over the list */}
            <Reveal delay={120} className="hidden lg:block">
              <div className="sticky top-28">
                <div className="relative rounded-3xl overflow-hidden" style={{
                  background: "rgba(255,255,255,0.96)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(253,185,39,0.12)",
                  aspectRatio: "4 / 3.4",
                }}>
                  {repairItems.map((s, i) => (
                    <img key={s.num} src={s.img} alt={s.name} decoding="async"
                      className="absolute inset-0 w-full h-full object-contain"
                      style={{
                        padding: "2rem 2rem 4.5rem",
                        opacity: activeService === i ? 1 : 0,
                        transform: activeService === i ? "scale(1)" : "scale(0.95)",
                        transition: "opacity 0.3s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                      }} />
                  ))}
                  {/* Caption bar */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 py-4 flex items-center justify-between"
                    style={{ background: "linear-gradient(to top, rgba(4,20,14,0.95), rgba(4,20,14,0.8) 60%, transparent)" }}>
                    <p className="font-black text-base text-white">{repairItems[activeService].name}</p>
                    <span className="font-black text-sm tabular-nums" style={{ color: ORANGE }}>
                      {repairItems[activeService].num} / 08
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-center font-semibold uppercase tracking-widest" style={{ color: "hsl(158 16% 40%)" }}>
                  Mindegyiket javítjuk — 6 hónap garanciával
                </p>
              </div>
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
                style={{ background: ORANGE, color: "#04111f", height: "3.5rem", paddingLeft: "2.25rem", paddingRight: "2.25rem", fontSize: "1.05rem", boxShadow: "0 8px 24px rgba(253,185,39,0.25)" }}>
                <Phone size={17} /> +36 30 911 1474
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROCESS — vertical timeline
      ══════════════════════════════════════════════════ */}
      <section id="folyamat" className="py-16 md:py-28 relative overflow-hidden" style={{ background: BG2 }}>
        {/* Photo bleed — courier picking up a part, faded into the section color on the left */}
        <div className="hidden lg:block absolute top-0 right-0 h-full pointer-events-none" style={{ width: "38%" }}>
          <img src="/images/courier.jpg" alt="" aria-hidden="true" className="w-full h-full object-cover"
            style={{ filter: "saturate(0.55) contrast(1.05) brightness(0.6)" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${BG2} 0%, transparent 45%)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BG2}, transparent 35%)` }} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(16,185,129,0.12), transparent 65%)" }} />

        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="mt-5 font-black leading-none" style={{ fontSize: "clamp(2rem,8vw,4.5rem)" }}>
                A javítás<br /><span style={{ color: ORANGE }}>folyamata.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed" style={{ color: "hsl(158 16% 55%)" }}>
                Sok olyan jellegű hiba van, amelyekre nem lehet előre pontos árat mondani, csak a bevizsgálást követően.
              </p>
            </div>
          </Reveal>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {processSteps.map((p, i) => {
              const isLast = i === processSteps.length - 1;
              return (
                <Reveal key={p.num} delay={i * 90}>
                  <div className="flex gap-6 md:gap-10 relative">

                    {/* Left: number + line (desktop/tablet only — on mobile the icon lives inside the card) */}
                    <div className="hidden sm:flex flex-col items-center shrink-0" style={{ width: 64 }}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center z-10 relative"
                        style={{ background: "#FDB927", color: "#04140d", boxShadow: "0 0 28px rgba(253,185,39,0.3)" }}>
                        <p.icon size={22} strokeWidth={1.8} />
                      </div>
                      {!isLast && (
                        <div className="flex-1 w-px mt-3 mb-3"
                          style={{ background: "linear-gradient(to bottom, rgba(253,185,39,0.4), rgba(16,185,129,0.25))", minHeight: 32 }} />
                      )}
                    </div>

                    {/* Right: content card */}
                    <div className={`group flex-1 min-w-0 rounded-3xl p-5 sm:p-6 md:p-8 project-card-hover ${isLast ? "mb-0" : "mb-4"}`}
                      style={{ background: "hsl(158 58% 10%)", border: "1px solid rgba(255,255,255,0.07)" }}>

                      {/* Step header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3">
                            <div className="sm:hidden w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                              style={{ background: "#FDB927", color: "#04140d", boxShadow: "0 0 20px rgba(253,185,39,0.25)" }}>
                              <p.icon size={18} strokeWidth={1.8} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: ORANGE }}>
                              {p.num} lépés
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-extrabold mt-2 sm:mt-1 transition-colors group-hover:text-[hsl(43_98%_65%)]">{p.title}</h3>
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

        </div>
      </section>




      {/* ══════════════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-14 md:py-20"
        style={{ background: "hsl(158 65% 4.5%)", borderTop: "1px solid rgba(253,185,39,0.28)", borderBottom: "1px solid rgba(253,185,39,0.28)" }}>
        {/* Workshop photo backdrop, heavily dimmed so text stays the focus */}
        <div className="absolute inset-0 pointer-events-none">
          <img src={IMGS.workshop2} alt="" aria-hidden="true" className="w-full h-full object-cover"
            style={{ filter: "saturate(0.5) contrast(1.05) brightness(0.32)", objectPosition: "50% 25%" }} />
        </div>
        {/* Subtle industrial diagonal texture + gold ambient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 22px, rgba(253,185,39,0.035) 22px, rgba(253,185,39,0.035) 23px)" }} />
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(253,185,39,0.09), transparent 65%)", filter: "blur(60px)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <Reveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] mb-4" style={{ color: "rgba(253,185,39,0.65)" }}>
                  Ingyenes tanácsadás · Gyors átfutás · 6 hónap garancia
                </p>
                <h2 className="text-4xl md:text-5xl font-black" style={{ lineHeight: 0.95 }}>
                  Hibás a hidraulika?<br /><span style={{ color: ORANGE }}>Mi megoldjuk.</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <a href="tel:+36309111474"
                  className="btn-hover glint inline-flex items-center justify-center gap-2.5 h-14 px-10 rounded-full text-sm font-bold uppercase tracking-wide no-underline"
                  style={{ background: ORANGE, color: "#04140d", boxShadow: "0 10px 28px rgba(253,185,39,0.25)" }}>
                  <Phone size={16} /> +36 30 911 1474
                </a>
                <a href="#kapcsolat"
                  className="btn-hover inline-flex items-center justify-center gap-2.5 h-14 px-10 rounded-full text-sm font-bold uppercase tracking-wide no-underline"
                  style={{ color: "hsl(40 20% 97%)", border: "1.5px solid rgba(253,185,39,0.4)", background: "rgba(253,185,39,0.06)" }}>
                  Árajánlatot kérek <ChevronRight size={16} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          COVERAGE
      ══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(253,185,39,0.04), transparent 70%)" }} />
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl mt-5 mb-5 font-black" style={{ lineHeight: 0.95 }}>
                Bárhová megyünk<br />az országban.
              </h2>
              <div className="mb-6 h-0.5 w-12 rounded-full" style={{ background: `linear-gradient(90deg, ${ORANGE}, transparent)` }} />
              <p className="leading-relaxed text-[15px] max-w-sm mb-8" style={{ color: "hsl(158 16% 55%)" }}>
                Nem számít, hol van a gépe — futárunk elmegy Önhöz, átveszi az alkatrészt, és visszahozza megjavítva. Egész Magyarország területét lefedjük.
              </p>
              <a href="tel:+36309111474"
                className="btn-hover glint inline-flex items-center gap-2.5 h-12 px-8 rounded-full text-base font-black no-underline"
                style={{ background: ORANGE, color: "#04111f", boxShadow: "0 8px 24px rgba(253,185,39,0.25)" }}>
                <Phone size={16} /> Hívjon most — ingyenes
              </a>
            </Reveal>

            <Reveal delay={80}>
              {(() => {
                /* ── Hungary outer border (46-point accurate trace) ── */
                const HU = "M31,287 65,302 83,312 121,329 149,367 193,383 237,366 286,367 323,366 384,349 448,339 485,339 551,323 562,291 602,228 619,222 641,152 690,124 721,68 725,43 724,26 677,25 616,27 591,3 563,31 524,42 493,45 454,62 424,58 382,82 347,85 307,100 248,120 224,120 186,102 129,99 110,81 81,86 46,90 43,127 30,153 47,170 36,192 37,231 48,262 40,275Z";
                const BP = { x: 345, y: 172 };
                /* Courier destinations — dot, label, curved route from Budapest */
                const cities = [
                  { n: "Győr",         x: 150, y: 118, ly: -12, d: "M345,172 Q248,128 150,118" },
                  { n: "Szombathely",  x: 56,  y: 205, ly: 19,  d: "M345,172 Q195,168 56,205" },
                  { n: "Zalaegerszeg", x: 82,  y: 298, ly: 19,  d: "M345,172 Q205,250 82,298" },
                  { n: "Pécs",         x: 224, y: 358, ly: 19,  d: "M345,172 Q272,278 224,358" },
                  { n: "Szeged",       x: 462, y: 348, ly: 19,  d: "M345,172 Q412,268 462,348" },
                  { n: "Kecskemét",    x: 398, y: 268, ly: 19,  d: "M345,172 Q368,222 398,268" },
                  { n: "Békéscsaba",   x: 590, y: 316, ly: 19,  d: "M345,172 Q480,252 590,316" },
                  { n: "Debrecen",     x: 622, y: 210, ly: 19,  d: "M345,172 Q488,178 622,210" },
                  { n: "Nyíregyháza",  x: 676, y: 130, ly: -12, d: "M345,172 Q515,132 676,130" },
                  { n: "Miskolc",      x: 542, y: 92,  ly: -12, d: "M345,172 Q442,112 542,92" },
                ];
                return (
                  <div className="relative">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "hsl(158 16% 38%)" }}>
                      Futárszolgálat — az ország minden pontjára
                    </p>

                    <svg viewBox="0 0 760 400" className="w-full" xmlns="http://www.w3.org/2000/svg"
                      style={{ background: "hsl(158 58% 6%)", borderRadius: "1rem", border: "1px solid rgba(16,185,129,0.12)" }}>

                      {/* Country silhouette */}
                      <path d={HU} fill="hsl(158 50% 8.5%)"
                        stroke="rgba(16,185,129,0.4)" strokeWidth="1.6" strokeLinejoin="round" />

                      {/* Courier routes — dashed lines flowing outward from Budapest */}
                      {cities.map((c, i) => (
                        <path key={c.n + "r"} d={c.d} className="route-line" fill="none"
                          stroke="rgba(253,185,39,0.35)" strokeWidth="1.4" strokeLinecap="round"
                          style={{ animationDelay: `${i * -0.35}s` }} />
                      ))}

                      {/* Destination dots + labels */}
                      {cities.map((c, i) => (
                        <g key={c.n}>
                          <circle cx={c.x} cy={c.y} r="8" fill="none"
                            stroke="rgba(16,185,129,0.5)" strokeWidth="1" className="city-ping"
                            style={{ animationDelay: `${i * 0.28}s` }} />
                          <circle cx={c.x} cy={c.y} r="3.2" fill="#10b981"
                            style={{ filter: "drop-shadow(0 0 4px rgba(16,185,129,0.8))" }} />
                          <text x={c.x} y={c.y + c.ly} textAnchor="middle"
                            fontSize="10.5" fontWeight="600" fill="rgba(255,255,255,0.55)"
                            fontFamily="system-ui,sans-serif" style={{ userSelect: "none" }}>{c.n}</text>
                        </g>
                      ))}

                      {/* Budapest hub */}
                      <g>
                        <circle cx={BP.x} cy={BP.y} r="14" fill="none"
                          stroke="rgba(253,185,39,0.55)" strokeWidth="1.4" className="city-ping" />
                        <circle cx={BP.x} cy={BP.y} r="6" fill={ORANGE}
                          style={{ filter: "drop-shadow(0 0 8px rgba(253,185,39,0.9))" }} />
                        <text x={BP.x} y={BP.y - 20} textAnchor="middle"
                          fontSize="12" fontWeight="800" fill={ORANGE}
                          fontFamily="system-ui,sans-serif" style={{ userSelect: "none" }}>Budapest</text>
                      </g>
                    </svg>

                    <div className="mt-4 grid gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
                      {[
                        { icon: MapPin, t: "Központ: Budapest, IX. kerület" },
                        { icon: Truck,  t: "Oda-vissza futár" },
                        { icon: CheckCircle2, t: "Mind a 20 megyét lefedjük" },
                      ].map(({ icon: Icon, t }) => (
                        <span key={t} className="flex sm:inline-flex items-center gap-3 sm:gap-2 px-3 sm:px-3.5 py-2.5 sm:py-2 rounded-xl sm:rounded-full text-[13px] sm:text-xs font-semibold"
                          style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)", color: "hsl(158 25% 74%)" }}>
                          <span className="sm:hidden w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: "rgba(253,185,39,0.1)", border: "1px solid rgba(253,185,39,0.22)" }}>
                            <Icon size={14} style={{ color: ORANGE }} />
                          </span>
                          <Icon size={12} className="hidden sm:block" style={{ color: ORANGE }} />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BRANDS — full statement section
      ══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative overflow-hidden"
        style={{ background: "hsl(158 65% 5%)", borderTop: "1px solid rgba(253,185,39,0.12)", borderBottom: "1px solid rgba(253,185,39,0.12)" }}>

        {/* Faint workshop photo texture — barely-there, keeps the section from reading as flat color */}
        <div className="absolute inset-0 pointer-events-none">
          <img src="/images/backgroundphoto.jpg" alt="" aria-hidden="true" className="w-full h-full object-cover"
            style={{ filter: "saturate(0.45) contrast(1.1) brightness(0.16)", objectPosition: "50% 35%" }} />
        </div>
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(16,185,129,0.22), transparent 70%)" }} />

        <div className="container mx-auto px-6 relative z-10 mb-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
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
          <div className="marquee-track" style={{ animationDuration: "38s" }}>
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
          <div className="marquee-track" style={{ animationDuration: "48s", animationDirection: "reverse" }}>
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
                  <img src={src} alt={alt} loading="lazy" decoding="async" className="h-12 w-auto object-contain" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FAQ — 2-column on desktop
      ══════════════════════════════════════════════════ */}
      <section id="gyik" className="py-16 md:py-28 relative" style={{ background: BG2 }}>
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl mt-4 font-black">Amit Önök kérdeznek.</h2>
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
                  <div style={{
                    display: "grid",
                    gridTemplateRows: openFaq === i ? "1fr" : "0fr",
                    transition: `grid-template-rows ${openFaq === i ? "0.4s" : "0.28s"} cubic-bezier(0.16,1,0.3,1)`,
                  }}>
                    <div style={{ overflow: "hidden" }}>
                      <p className="px-5 pb-5 pl-10 text-sm leading-relaxed"
                        style={{ color: "hsl(158 16% 55%)", opacity: openFaq === i ? 1 : 0, transition: "opacity 0.3s ease" }}>{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scroll to top ─── */}
      <button onClick={() => {
          // Override CSS scroll-behavior:smooth which can make this take 5+ seconds on long pages
          document.documentElement.style.scrollBehavior = "auto";
          document.body.style.scrollBehavior = "auto";
          window.scrollTo(0, 0);
          requestAnimationFrame(() => {
            document.documentElement.style.scrollBehavior = "";
            document.body.style.scrollBehavior = "";
          });
        }} aria-label="Vissza a tetejére" tabIndex={showScrollTop ? 0 : -1}
        className="fixed right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          bottom: showMobileCTA ? 98 : 24,
          background: ORANGE, boxShadow: "0 4px 28px rgba(253,185,39,0.45)", border: "none", color: "white",
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? "translateY(0) scale(1)" : "translateY(10px) scale(0.9)",
          pointerEvents: showScrollTop ? "auto" : "none",
          transition: "bottom 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}>
        <ArrowUp size={20} />
      </button>

      {/* ── Mobile bottom CTA bar — floating dock ─── */}
      <div className="md:hidden fixed z-40"
        style={{
          left: 12, right: 12,
          bottom: "max(12px, env(safe-area-inset-bottom))",
          transform: showMobileCTA ? "translateY(0)" : "translateY(140%)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: showMobileCTA ? "auto" : "none",
          background: "rgba(3,16,11,0.94)",
          backdropFilter: "blur(16px) saturate(1.6)",
          WebkitBackdropFilter: "blur(16px) saturate(1.6)",
          border: "1px solid rgba(253,185,39,0.22)",
          borderRadius: 22,
          boxShadow: "0 12px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
          <div className="hazard" style={{ height: 5, borderTopLeftRadius: 3, borderTopRightRadius: 3 }} />
          <div className="flex gap-2 p-2">
            <a href="tel:+36309111474"
              className="btn-hover glint flex-[1.35] flex items-center justify-center gap-2.5 no-underline"
              style={{ background: ORANGE, color: "#04140d", height: 54, borderRadius: 3, boxShadow: "0 6px 18px rgba(253,185,39,0.3)" }}>
              <span className="w-8 h-8 flex items-center justify-center shrink-0" style={{ background: "rgba(4,20,13,0.14)", borderRadius: 3 }}>
                <Phone size={15} />
              </span>
              <span className="leading-tight text-left">
                <span className="block text-[12px] font-black uppercase tracking-wide">Hívjon most</span>
                <span className="block text-[10px] font-bold tabular-nums uppercase" style={{ opacity: 0.72 }}>+36 30 911 1474</span>
              </span>
            </a>
            <a href="#kapcsolat"
              className="btn-hover flex-1 flex items-center justify-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-white no-underline"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(253,185,39,0.35)", height: 54, borderRadius: 3 }}>
              Árajánlat <ArrowUpRight size={14} style={{ color: ORANGE }} />
            </a>
          </div>
        </div>


      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer className="py-16 relative" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "hsl(158 65% 3%)", paddingBottom: showMobileCTA ? "104px" : undefined }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-14">

            <div className="max-w-xs">
              <div className="mb-4">
                <img src="/images/logo-dark.png" alt="Hidraulikajavítás.com" loading="lazy" className="h-10 w-auto" />
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
