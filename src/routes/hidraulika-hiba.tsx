import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";

const BG = "hsl(158 62% 7%)";
const ORANGE = "#FDB927";
const MID = "hsl(158 10% 65%)";
const DIM = "hsl(158 16% 38%)";

const PHONE_HREF = "tel:+36309111474";
const PHONE_DISPLAY = "+36 30 911 1474";

export const Route = createFileRoute("/hidraulika-hiba")({
  head: () => ({
    meta: [
      {
        title:
          "Hidraulika Szivattyú Hiba, Hidromotor Hiba, Munkahenger Hiba | Hidraulika Service TEAM Kft.",
      },
      {
        name: "description",
        content:
          "Felismerte a hidraulika hibáit? Hidraulika szivattyú hiba, hidromotor hiba vagy hidraulikus munkahenger hiba esetén hívja szakértő csapatunkat! ☎ +36 30 911 1474",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.hidraulikajavitas.com/hidraulika-hiba",
      },
    ],
  }),
  component: HidraulikaHibaPage,
});

const FAULTS = [
  {
    title: "Hidraulika-szivattyú hiba",
    subtitle: "a rendszer szívének problémái",
    symptoms: [
      "Erőteljes zaj, vibráció",
      "Lassú vagy akadozó működés",
      "Csökkenő nyomás",
      "Túlmelegedő hidraulikaolaj",
    ],
    causes: [
      "Elhasználódott alkatrészek",
      "Szennyezett vagy nem megfelelő viszkozitású olaj",
      "Szívóágon légbeszívás",
      "Rosszul beállított nyomásértékek",
    ],
    solution:
      "A hidraulika szivattyú javítás során teljes körű átvizsgálást végzünk, szükség esetén cseréljük vagy felújítjuk az érintett egységet.",
  },
  {
    title: "Hidromotor hiba",
    subtitle: "a mozgás ereje csökken",
    symptoms: [
      "Egyenetlen vagy akadozó forgás",
      "Jelentős nyomatékvesztés",
      "Külső vagy belső olajszivárgás",
      "Szokatlan zajterhelés",
    ],
    causes: [
      "Kopott belső alkatrészek",
      "Rossz illesztés vagy tömítés",
      "Szennyeződés, levegő vagy víz a rendszerben",
    ],
    solution:
      "Szükség szerint hidromotor javítást vagy cserét végzünk. Műhelyünkben lehetőség van típusazonos pótlásra vagy precíz felújításra is.",
  },
  {
    title: "Hidraulikus munkahenger hiba",
    subtitle: "ha nem emel, nem tart",
    symptoms: [
      "Mozgás közbeni rángás",
      "Dugattyúrúd körüli szivárgás",
      "Nyomásvesztés, pozícióvesztés",
      "Teljes leállás vagy beragadás",
    ],
    causes: [
      "Sérült vagy elöregedett tömítések",
      "Belső kopás vagy dugattyúkárosodás",
      "Szennyeződés, mikrorészecskék a rendszerben",
    ],
    solution:
      "A munkahenger javítás során cégünk elvégzi a tömítéscserét, felújítást vagy a munkahenger teljes újragyártását – típustól függően.",
  },
];

const WHY_US = [
  "Több mint 15 év tapasztalat",
  "Rövid határidős javítás országosan",
  "Gyors hibafeltárás és árajánlat",
  "Korszerű szerviz és minőségi alkatrészek",
  "Minden típusú hidraulikus berendezés javítása",
];

function NavBar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(4,20,14,0.96)",
        backdropFilter: "blur(24px) saturate(2)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center no-underline">
          <img src="/images/logo-dark.png" alt="Hidraulikajavítás.com" className="h-7 w-auto" />
        </a>
        <CallBtn />
      </div>
    </nav>
  );
}

function CallBtn({ large = false }: { large?: boolean }) {
  return (
    <a
      href={PHONE_HREF}
      className="inline-flex items-center gap-2 font-bold transition-all no-underline"
      style={{
        background: `linear-gradient(135deg, ${ORANGE}, hsl(38 90% 60%))`,
        color: "#0a1f14",
        padding: large ? "0.75rem 1.75rem" : "0.5rem 1.25rem",
        borderRadius: "0.75rem",
        fontSize: large ? "1rem" : "0.8125rem",
        boxShadow: "0 4px 20px rgba(253,185,39,0.3)",
      }}
    >
      <Phone size={large ? 18 : 14} />
      {PHONE_DISPLAY}
    </a>
  );
}

function HidraulikaHibaPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: BG, color: "hsl(40 20% 97%)" }}
    >
      <NavBar />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-14 pb-12">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: ORANGE }}
        >
          Hidraulika szakszerviz · Budapest
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5 max-w-2xl">
          Hidraulika szivattyú hiba,{" "}
          <span style={{ color: ORANGE }}>hidromotor</span> és munkahenger hiba
        </h1>
        <p
          className="text-base leading-relaxed mb-8 max-w-xl"
          style={{ color: "hsl(158 16% 55%)" }}
        >
          A hidraulikus rendszerek egyetlen meghibásodott alkatrésze az egész
          gép leállását okozhatja. Ismerje fel a jeleket időben — több mint 15
          éve diagnosztizáljuk és javítjuk ezeket a hibákat, gyorsan, országosan.
        </p>
        <CallBtn large />
      </section>

      {/* Fault cards */}
      <section className="max-w-5xl mx-auto px-6 pb-16 space-y-5">
        {FAULTS.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.025)",
              borderColor: "rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="px-6 md:px-8 py-5 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <h2
                className="text-lg md:text-xl font-black"
                style={{ color: "hsl(40 20% 95%)" }}
              >
                {f.title}
              </h2>
              <p className="text-sm mt-0.5" style={{ color: DIM }}>
                {f.subtitle}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 px-6 md:px-8 py-6">
              {[
                { label: "Jellemző tünetek", items: f.symptoms },
                { label: "Tipikus okok", items: f.causes },
              ].map(({ label, items }) => (
                <div key={label}>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: ORANGE }}
                  >
                    {label}
                  </p>
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="text-sm flex gap-2 items-start"
                        style={{ color: MID }}
                      >
                        <span
                          className="shrink-0 mt-0.5"
                          style={{ color: ORANGE }}
                        >
                          ·
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: ORANGE }}
                >
                  Megoldás
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: MID }}
                >
                  {f.solution}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Why us */}
      <section
        className="border-y"
        style={{
          borderColor: "rgba(255,255,255,0.06)",
          background: "rgba(253,185,39,0.03)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2
            className="text-xl font-black mb-6"
            style={{ color: "hsl(40 20% 95%)" }}
          >
            Miért a{" "}
            <span style={{ color: ORANGE }}>Hidraulikajavitas.com</span>?
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {WHY_US.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span
                  className="text-sm font-bold shrink-0"
                  style={{ color: ORANGE }}
                >
                  ✓
                </span>
                <span className="text-sm" style={{ color: MID }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-black mb-3">
          Ne várja meg a teljes leállást!
        </h2>
        <p
          className="text-sm mb-8 max-w-md mx-auto leading-relaxed"
          style={{ color: "hsl(158 16% 55%)" }}
        >
          Ha bármilyen szokatlan működést tapasztal hidraulikus berendezésein,
          keresse fel szakértő csapatunkat.
        </p>
        <CallBtn large />
        <div className="mt-6 space-y-1 text-sm" style={{ color: DIM }}>
          <p>
            <a
              href="mailto:info@hidraulikajavitas.com"
              className="no-underline"
              style={{ color: "hsl(158 16% 50%)" }}
            >
              info@hidraulikajavitas.com
            </a>
          </p>
          <p>1095 Budapest, Soroksári út 48. — 8-as épület</p>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t py-8"
        style={{
          borderColor: "rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.18)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="flex flex-wrap gap-x-6 gap-y-2 text-xs"
            style={{ color: DIM }}
          >
            {[
              { href: "/", label: "Főoldal" },
              { href: "/impresszum", label: "Impresszum" },
              { href: "/adatkezeles", label: "Adatkezelési tájékoztató" },
              { href: "/aszf", label: "ÁSZF" },
              { href: "/suti-szabalyzat", label: "Süti kezelési szabályzat" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="no-underline"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "hsl(158 16% 60%)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = DIM)}
              >
                {l.label}
              </a>
            ))}
          </div>
          <p
            className="mt-4 text-xs"
            style={{ color: "hsl(158 16% 28%)" }}
          >
            © {new Date().getFullYear()} Hidraulika Service TEAM Kft. · 1095
            Budapest, Soroksári út 48.
          </p>
        </div>
      </footer>
    </div>
  );
}
