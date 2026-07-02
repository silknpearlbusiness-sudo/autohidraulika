import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";

const BG = "hsl(158 62% 7%)";
const ORANGE = "#FDB927";
const MID = "hsl(158 10% 65%)";
const DIM = "hsl(158 16% 38%)";

const PHONE_HREF = "tel:+36309111474";
const PHONE_DISPLAY = "+36 30 911 1474";

export const Route = createFileRoute(
  "/hidraulika-szivattyu-hidromotor-munkahenger"
)({
  head: () => ({
    meta: [
      {
        title:
          "Hidraulika Szivattyú, Hidromotor, Hidraulikus Munkahenger | hidraulikajavitas.com",
      },
      {
        name: "description",
        content:
          "Minden, amit a hidraulika szivattyúkról, hidromotorokról és hidraulikus munkahengerekről tudni érdemes. Típusok, alkalmazások, karbantartás és szakszerű javítás.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.hidraulikajavitas.com/hidraulika-szivattyu-hidromotor-munkahenger",
      },
    ],
  }),
  component: HidraulikaSzivattyu,
});

const PUMP_TYPES = [
  {
    name: "Radiál dugattyús szivattyú",
    img: "/images/Hidraulika_Radialdugattyus_szivattyu.png",
    desc: "Nagy nyomású alkalmazásokhoz tervezett, robusztus kialakítású szivattyú. Nehézipari gépekben és építőipari berendezésekben a legelterjedtebb.",
  },
  {
    name: "Axiál dugattyús szivattyú",
    img: "/images/Hidraulika_axialdugattyus.jpg",
    desc: "Változtatható lökettérfogatú, magas hatásfokú szivattyú. Széles fordulatszám-tartományban stabil teljesítményt nyújt.",
  },
  {
    name: "Lapátos szivattyú",
    img: "/images/Hidraulika_lapatos.jpg",
    desc: "A lapátos betétek kopnak el leggyakrabban. Komplett felújító készleteket, patronokat és házakat szállítunk a legtöbb típushoz — az egység gyári új állapotba hozható.",
  },
  {
    name: "Fogaskerék szivattyú",
    img: "/images/Hidraulika_fogaskerek.jpg",
    desc: "Egyszerű kialakítás, nagy megbízhatóság. Fogaskerekes szivattyúkat akár 1–3 napon belül tudunk szállítani, versenyképes árakon.",
  },
  {
    name: "Orbit",
    img: "/images/Hidraulika_ORBIT.jpg",
    desc: "Komolyabb kopás, törés esetén nem gazdaságos az alkatrészcsere — új komplett egység vásárlása javasolt. Elérhető alkatrészek: tömítések, szimeringek, csapágyak, csavarok.",
  },
];

const MOTOR_TYPES = [
  {
    name: "Fogaskerék hidromotor",
    img: "/images/Hidraulika_fogaskerek.jpg",
    desc: "Egyszerű felépítés, robusztus kivitel. Kiválóan alkalmas alacsony és közepes nyomású alkalmazásokhoz.",
  },
  {
    name: "Orbit rendszerű hidromotor",
    img: "/images/Hidraulika_hidromotor1.jpg",
    desc: "Kompakt, nagy nyomatékú megoldás lassú fordulatszámú alkalmazásokhoz. Mezőgazdasági és erdészeti gépekben széles körben elterjedt.",
  },
  {
    name: "Dugattyús rendszerű hidromotor",
    img: "/images/Hidraulika_axialdugattyus.jpg",
    desc: "Magas nyomású és nagy teljesítményű alkalmazásokhoz. Nehézipari gépekben, kotrókban és darukban alkalmazzák elsősorban.",
  },
];

const CYLINDER_TYPES = [
  {
    name: "Egyszeres működésű munkahenger",
    desc: "Csak egy irányba mozgat; visszatérés külső erő vagy rugó hatására történik.",
  },
  {
    name: "Kettős működésű munkahenger",
    desc: "Mindkét irányba képes mozgatni a dugattyút — rugalmas, széles körben alkalmazható megoldás.",
  },
  {
    name: "Teleszkópos munkahenger",
    desc: "Több szakaszból áll, hosszabb löketet biztosít kompakt kialakítás mellett. Dömperek és emelők jellemző alkatrésze.",
  },
];

const MACHINES = [
  "Rakodógép", "Targonca", "Kotrógép", "Dózer", "Kompaktor",
  "Gréder", "Úthenger", "Traktor", "Kombájn", "Erőgép",
  "Anyagmozgató gép", "Erdészeti gép", "Aszfaltmaró gép",
];

const BRANDS = [
  "Komatsu", "Caterpillar", "Bosch Rexroth", "Parker", "Kawasaki",
  "ZF", "Liebherr", "Linde", "Sauer-Danfoss", "Vickers", "Eaton",
  "Hydromatik", "Poclain", "Hitachi", "Kobelco", "KYB Kayaba",
  "Nachi", "Char-Lynn", "JCB", "Dana", "Spicer", "Carraro",
  "Allison", "Casse", "Leslie Hidraulika", "Ponar Wadowice",
];

const APPLICATIONS = [
  { label: "Építőipar", desc: "Kotrógépek, markolók, daruk, nehézgépek" },
  { label: "Mezőgazdaság", desc: "Traktorok, kombájnok, mezőgazdasági gépek" },
  { label: "Autóipar", desc: "Szervokormány, fékrendszerek, sebességváltók" },
  { label: "Gyártás", desc: "Présgépek, szállítószalagok, automatizált rendszerek" },
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
        <a
          href={PHONE_HREF}
          className="inline-flex items-center gap-2 font-bold text-xs no-underline rounded-xl transition-all"
          style={{
            background: `linear-gradient(135deg, ${ORANGE}, hsl(38 90% 60%))`,
            color: "#0a1f14",
            padding: "0.5rem 1.25rem",
            boxShadow: "0 4px 20px rgba(253,185,39,0.3)",
          }}
        >
          <Phone size={14} />
          {PHONE_DISPLAY}
        </a>
      </div>
    </nav>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl md:text-3xl font-black mb-2"
      style={{ color: "hsl(40 20% 95%)" }}
    >
      {children}
    </h2>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-bold uppercase tracking-widest mb-3"
      style={{ color: ORANGE }}
    >
      {children}
    </p>
  );
}

function TypeCard({ name, desc, img }: { name: string; desc: string; img?: string }) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.07)" }}>
      {img && (
        <div className="h-40 overflow-hidden bg-white">
          <img src={img} alt={name} className="w-full h-full object-contain p-3" />
        </div>
      )}
      <div className="p-5">
        <p className="text-sm font-bold mb-1" style={{ color: "hsl(40 20% 90%)" }}>{name}</p>
        <p className="text-sm leading-relaxed" style={{ color: MID }}>{desc}</p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div
      className="h-px my-14"
      style={{ background: "rgba(255,255,255,0.06)" }}
    />
  );
}

function HidraulikaSzivattyu() {
  return (
    <div
      className="min-h-screen"
      style={{ background: BG, color: "hsl(40 20% 97%)" }}
    >
      <NavBar />

      <article className="max-w-4xl mx-auto px-6 pt-14 pb-20">

        {/* Hero */}
        <header className="mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
            Minden, ami hidraulika
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5">
            Hidraulika szivattyú,{" "}
            <span style={{ color: ORANGE }}>hidromotor</span> és hidraulikus munkahenger
          </h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: MID }}>
            A modern ipari és mezőgazdasági gépek alapvető elemei. Javítás, felújítás és csere esetén keresse szakértő csapatunkat — gyors határidővel, versenyképes áron.
          </p>
        </header>

        {/* Tesztpad */}
        <section className="rounded-2xl p-7 mb-14 border" style={{ background: "rgba(253,185,39,0.05)", borderColor: "rgba(253,185,39,0.18)" }}>
          <Label>Hidraulika tesztpad</Label>
          <SectionTitle>Minden javítás után tesztpadon próbáljuk</SectionTitle>
          <p className="text-sm leading-relaxed mt-3" style={{ color: MID }}>
            A hidromotorokat és szivattyúkat minden esetben a javítások befejezése után, hidraulika tesztpadunkon lepróbáljuk. Üzemi körülményeket biztosítunk és úgy terheljük az alkatrészeket — teljes körűen mérjük és beállítjuk a javított egységeket. <strong style={{ color: "hsl(40 20% 90%)" }}>Fél év garanciát biztosítunk teljes körű felújítások esetén.</strong>
          </p>
        </section>

        {/* Pump types */}
        <section>
          <Label>Hidraulika szivattyú típusok</Label>
          <SectionTitle>Milyen hidraulikák léteznek?</SectionTitle>
          <p className="text-sm leading-relaxed mb-8 max-w-2xl" style={{ color: MID }}>
            A hidraulika szivattyú mechanikus energiát alakít hidraulikus energiává. A szivattyú által mozgatott folyadék nagy erőket képes kifejteni és precíz mozgásokat végezni — nélkülözhetetlen az ipar, az építőipar és a mezőgazdaság területén.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {PUMP_TYPES.slice(0, 3).map((t) => <TypeCard key={t.name} {...t} />)}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8 max-w-[66%] mx-auto">
            {PUMP_TYPES.slice(3).map((t) => <TypeCard key={t.name} {...t} />)}
          </div>
        </section>

        <Divider />

        {/* Motor types */}
        <section>
          <Label>Hidromotor típusok</Label>
          <SectionTitle>Hidromotorok</SectionTitle>
          <p className="text-sm leading-relaxed mb-8 max-w-2xl" style={{ color: MID }}>
            A hidromotor hidraulikus energiát alakít mechanikus forgómozgássá. A kifejtett nyomaték és fordulatszám a rendszerben áramló folyadék mennyiségétől és nyomásától függ.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {MOTOR_TYPES.map((t) => <TypeCard key={t.name} {...t} />)}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl p-5 border" style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.07)" }}>
              <Label>Előnyök</Label>
              <ul className="space-y-1.5">
                {["Nagy nyomaték alacsony sebességnél", "Széles fordulatszám-tartomány", "Megbízható, hosszú élettartam"].map((item) => (
                  <li key={item} className="text-sm flex gap-2" style={{ color: MID }}>
                    <span style={{ color: ORANGE }}>+</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-5 border" style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.07)" }}>
              <Label>Mire figyeljen</Label>
              <ul className="space-y-1.5">
                {["Olajszivárgás károsítja a rendszert", "Javításuk szakértelmet igényel", "Rendszeres ellenőrzés megelőzi a hibákat"].map((item) => (
                  <li key={item} className="text-sm flex gap-2" style={{ color: MID }}>
                    <span style={{ color: "hsl(0 60% 55%)" }}>!</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Divider />

        {/* Vezérlőtömb */}
        <section>
          <Label>Vezérlőtömb</Label>
          <SectionTitle>Hidraulikus vezérlőtömb javítás</SectionTitle>
          <div className="mt-4 grid sm:grid-cols-2 gap-6 items-start">
            <p className="text-sm leading-relaxed" style={{ color: MID }}>
              A vezérlőtömb irányítja a hidraulikus folyadék áramlását a rendszerben. Meghibásodás esetén a gép teljes hidraulikus rendszere leállhat. Szakszerű diagnosztika és javítás elengedhetetlen — cégünk e téren is teljes körű megoldást kínál.
            </p>
            <div className="rounded-xl overflow-hidden border bg-white" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <img src="/images/Hidraulika_vezerlotomb.jpg" alt="Hidraulikus vezérlőtömb" className="w-full h-48 object-contain p-3" />
            </div>
          </div>
        </section>

        <Divider />

        {/* Cylinder types */}
        <section>
          <Label>Hidraulikus munkahenger</Label>
          <SectionTitle>Munkahengerek típusai</SectionTitle>
          <p className="text-sm leading-relaxed mb-8 max-w-2xl" style={{ color: MID }}>
            A hidraulikus munkahenger a folyadék nyomását lineáris mozgássá alakítja. Nagy erőket képes kifejteni pontosan irányítva — nélkülözhetetlen az építőipartól a mezőgazdaságig.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-6 items-start">
            <div className="grid gap-4">
              {CYLINDER_TYPES.map((t) => <TypeCard key={t.name} {...t} />)}
            </div>
            <div className="rounded-xl overflow-hidden border bg-white" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <img src="/images/Hidraulika_munkahenger.jpg" alt="Hidraulikus munkahenger" className="w-full h-64 object-contain p-3" />
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: MID }}>
            Komolyabb meghibásodás esetén — alkatrészek kopása, törése — a megoldás egy új vásárlása lehet. A pontos azonosításhoz és ajánlathoz szükséges a termék gyári cikkszáma vagy az adattáblán található adatok. Ha az adattábla nem található, felépítéséből, csatlakozásaiból és méreteiből meghatározzuk az eredeti típust.
          </p>
        </section>

        <Divider />

        {/* Machines */}
        <section>
          <Label>Milyen gépeket javítunk</Label>
          <SectionTitle>Márkafüggetlen javítás minden gépre</SectionTitle>
          <p className="text-sm leading-relaxed mb-6 max-w-2xl" style={{ color: MID }}>
            Cégünk a földmunkagépek és mezőgazdasági gépek hidraulikus egységeinek javításában nagy múlttal rendelkezik. Magas szakértelem mellett versenyképes árakat kínálunk, a lehető legrövidebb határidőn belül.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {MACHINES.map((m) => (
              <span key={m} className="px-3 py-1.5 rounded-full text-xs font-semibold border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.1)", color: MID }}>
                {m}
              </span>
            ))}
          </div>
        </section>

        <Divider />

        {/* Brands */}
        <section>
          <Label>Márkák</Label>
          <SectionTitle>Az alábbi márkákhoz nyújtunk segítséget</SectionTitle>
          <div className="flex flex-wrap gap-2 mt-6">
            {BRANDS.map((b) => (
              <span key={b} className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border" style={{ background: "rgba(253,185,39,0.06)", borderColor: "rgba(253,185,39,0.16)", color: "hsl(43 98% 68%)" }}>
                {b}
              </span>
            ))}
          </div>
        </section>

        <Divider />

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-3">Szüksége van javításra?</h2>
          <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: "hsl(158 16% 55%)" }}>
            Szivattyú, hidromotor, vezérlőtömb vagy munkahenger — gyors hibafeltárás, pontos árajánlat, rövid határidő. Hívjon minket bizalommal!
          </p>
          <a href={PHONE_HREF} className="inline-flex items-center gap-2.5 font-bold no-underline rounded-xl transition-all"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, hsl(38 90% 60%))`, color: "#0a1f14", padding: "0.875rem 2rem", fontSize: "1rem", boxShadow: "0 4px 24px rgba(253,185,39,0.35)" }}>
            <Phone size={18} /> {PHONE_DISPLAY}
          </a>
          <div className="mt-6 space-y-1 text-sm" style={{ color: DIM }}>
            <p><a href="mailto:info@hidraulikajavitas.com" className="no-underline" style={{ color: "hsl(158 16% 50%)" }}>info@hidraulikajavitas.com</a></p>
            <p>1095 Budapest, Soroksári út 48. — 8-as épület FSZ.</p>
          </div>
        </section>
      </article>

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
