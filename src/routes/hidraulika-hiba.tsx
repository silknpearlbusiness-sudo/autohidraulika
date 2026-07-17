import { createFileRoute } from "@tanstack/react-router";
import { SubNav, SubFooter, MobileCallBar, CallButton } from "@/components/site/SubpageChrome";

const BG = "hsl(158 62% 7%)";
const ORANGE = "#FDB927";
const MID = "hsl(158 10% 67%)";
const DIM = "hsl(158 16% 45%)";

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
    subtitle: "A rendszer szívének problémái",
    img: "/images/Hidraulika_axialdugattyus.jpg",
    alt: "Axiál dugattyús hidraulika szivattyú",
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
    subtitle: "A mozgás ereje csökken",
    img: "/images/Hidraulika_ORBIT.jpg",
    alt: "Orbit hidromotor",
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
    subtitle: "Ha nem emel, nem tart",
    img: "/images/Hidraulika_munkahenger.jpg",
    alt: "Hidraulikus munkahenger",
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
  "6 hónap garancia teljes felújításra",
];

function HidraulikaHibaPage() {
  return (
    <div className="min-h-screen" style={{ background: BG, color: "hsl(40 20% 97%)" }}>
      <SubNav />

      {/* Hero — text + real machine photo */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 pt-10 md:pt-14 pb-10 md:pb-14">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-10 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
              Hidraulika szakszerviz · Budapest
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 md:mb-5">
              Hidraulika szivattyú hiba,{" "}
              <span style={{ color: ORANGE }}>hidromotor</span> és munkahenger hiba
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-7 max-w-xl" style={{ color: MID }}>
              Egyetlen meghibásodott alkatrész az egész gép leállását okozhatja. Ismerje fel a
              jeleket időben — több mint 15 éve javítjuk ezeket a hibákat, országosan.
            </p>
            <CallButton large />
          </div>
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "rgba(255,255,255,0.08)", boxShadow: "0 24px 60px rgba(0,0,0,0.45)" }}
          >
            <img
              src="/images/workshop-2.jpg"
              alt="Kotrógépek munka közben — hidraulikus rendszerek javítása"
              className="w-full h-52 md:h-72 object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Fault cards */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 pb-14 space-y-5">
        {FAULTS.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border overflow-hidden"
            style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.07)" }}
          >
            <div
              className="px-5 md:px-8 py-4 md:py-5 border-b flex items-center gap-4"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="shrink-0 rounded-xl overflow-hidden bg-white"
                style={{ width: 76, height: 58 }}
              >
                <img src={f.img} alt={f.alt} className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-black" style={{ color: "hsl(40 20% 95%)" }}>
                  {f.title}
                </h2>
                <p className="text-sm mt-0.5" style={{ color: DIM }}>
                  {f.subtitle}
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 px-5 md:px-8 py-6">
              {[
                { label: "Jellemző tünetek", items: f.symptoms },
                { label: "Tipikus okok", items: f.causes },
              ].map(({ label, items }) => (
                <div key={label}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
                    {label}
                  </p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="text-[0.95rem] flex gap-2.5 items-start" style={{ color: MID }}>
                        <span className="shrink-0 mt-0.5 font-bold" style={{ color: ORANGE }}>
                          ·
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
                  Megoldás
                </p>
                <p className="text-[0.95rem] leading-relaxed" style={{ color: MID }}>
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
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(253,185,39,0.03)" }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-10 md:py-12 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-black mb-5" style={{ color: "hsl(40 20% 95%)" }}>
              Miért a <span style={{ color: ORANGE }}>Hidraulikajavitas.com</span>?
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {WHY_US.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="font-bold shrink-0" style={{ color: ORANGE }}>
                    ✓
                  </span>
                  <span className="text-[0.95rem]" style={{ color: MID }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <img
            src="/images/logo-dark.png"
            alt=""
            aria-hidden="true"
            className="hidden md:block h-12 w-auto opacity-60"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 py-12 md:py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-black mb-3">Ne várja meg a teljes leállást!</h2>
        <p className="text-[0.95rem] mb-8 max-w-md mx-auto leading-relaxed" style={{ color: DIM }}>
          Ha bármilyen szokatlan működést tapasztal hidraulikus berendezésein, hívjon minket —
          telefonon azonnal tudunk segíteni a hiba behatárolásában.
        </p>
        <CallButton large />
        <div className="mt-6 space-y-1.5 text-[0.95rem]" style={{ color: DIM }}>
          <p>
            <a
              href="mailto:info@hidraulikajavitas.com"
              className="no-underline"
              style={{ color: "hsl(158 16% 55%)" }}
            >
              info@hidraulikajavitas.com
            </a>
          </p>
          <p>1095 Budapest, Soroksári út 48. — 8-as épület</p>
        </div>
      </section>

      <SubFooter />
      <MobileCallBar />
    </div>
  );
}
