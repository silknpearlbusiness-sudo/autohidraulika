import { createFileRoute } from "@tanstack/react-router";
import { SubNav, SubFooter, MobileCallBar, CallButton } from "@/components/site/SubpageChrome";

const BG = "hsl(158 62% 7%)";
const ORANGE = "#FDB927";
const MID = "hsl(158 10% 67%)";
const DIM = "hsl(158 16% 45%)";

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
    img: "/images/radialszivattyu.gif",
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
    desc: "A lapátos betétek kopnak el leggyakrabban. Komplett felújító készleteket, patronokat és házakat szállítunk a legtöbb típushoz.",
  },
  {
    name: "Fogaskerék szivattyú",
    img: "/images/Hidraulika_fogaskerek.jpg",
    desc: "Egyszerű kialakítás, nagy megbízhatóság. Fogaskerekes szivattyúkat akár 1–3 napon belül tudunk szállítani, versenyképes árakon.",
  },
  {
    name: "Orbit",
    img: "/images/Hidraulika_ORBIT.jpg",
    desc: "Komolyabb kopás esetén új komplett egység vásárlása javasolt. Elérhető alkatrészek: tömítések, szimeringek, csapágyak, csavarok.",
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
    desc: "Kompakt, nagy nyomatékú megoldás lassú fordulatszámú alkalmazásokhoz. Mezőgazdasági és erdészeti gépekben elterjedt.",
  },
  {
    name: "Dugattyús rendszerű hidromotor",
    img: "/images/Hidraulika_axialdugattyus.jpg",
    desc: "Magas nyomású, nagy teljesítményű alkalmazásokhoz. Kotrókban, darukban, nehézipari gépekben alkalmazzák.",
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-black mb-2" style={{ color: "hsl(40 20% 95%)" }}>
      {children}
    </h2>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
      {children}
    </p>
  );
}

function TypeCard({ name, desc, img }: { name: string; desc: string; img?: string }) {
  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.07)" }}
    >
      {img && (
        <div className="h-32 sm:h-40 overflow-hidden bg-white">
          <img src={img} alt={name} className="w-full h-full object-contain p-3" loading="lazy" />
        </div>
      )}
      <div className="p-4 sm:p-5">
        <p className="text-[0.95rem] font-bold mb-1.5" style={{ color: "hsl(40 20% 90%)" }}>
          {name}
        </p>
        <p className="text-[0.95rem] leading-relaxed" style={{ color: MID }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-px my-10 md:my-12" style={{ background: "rgba(255,255,255,0.06)" }} />;
}

function HidraulikaSzivattyu() {
  return (
    <div className="min-h-screen" style={{ background: BG, color: "hsl(40 20% 97%)" }}>
      <SubNav />

      <article className="max-w-4xl mx-auto px-5 sm:px-6 pt-10 md:pt-14 pb-16">

        {/* Hero — text + real machine photo */}
        <header className="mb-10 md:mb-14 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
              Minden, ami hidraulika
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 md:mb-5">
              Hidraulika szivattyú,{" "}
              <span style={{ color: ORANGE }}>hidromotor</span> és hidraulikus munkahenger
            </h1>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-7" style={{ color: MID }}>
              A munkagépek alapvető elemei. Javítás, felújítás és csere esetén keresse szakértő
              csapatunkat — gyors határidővel, versenyképes áron.
            </p>
            <CallButton large />
          </div>
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "rgba(255,255,255,0.08)", boxShadow: "0 24px 60px rgba(0,0,0,0.45)" }}
          >
            <img
              src="/images/ZW550-6-768x690.webp"
              alt="Homlokrakodó munkagép — hidraulikus rendszerek javítása"
              className="w-full h-52 md:h-72 object-cover"
              loading="eager"
            />
          </div>
        </header>

        {/* Tesztpad */}
        <section
          className="rounded-2xl p-6 sm:p-7 mb-10 md:mb-14 border"
          style={{ background: "rgba(253,185,39,0.05)", borderColor: "rgba(253,185,39,0.18)" }}
        >
          <Label>Hidraulika tesztpad</Label>
          <SectionTitle>Minden javítás után tesztpadon próbáljuk</SectionTitle>
          <p className="text-[0.95rem] leading-relaxed mt-3" style={{ color: MID }}>
            A hidromotorokat és szivattyúkat a javítás után hidraulika tesztpadunkon, üzemi
            körülmények között, terhelés alatt próbáljuk le — teljes körűen mérjük és beállítjuk a
            javított egységeket.{" "}
            <strong style={{ color: "hsl(40 20% 90%)" }}>
              Fél év garanciát biztosítunk teljes körű felújítások esetén.
            </strong>
          </p>
        </section>

        {/* Pump types */}
        <section>
          <Label>Hidraulika szivattyú típusok</Label>
          <SectionTitle>Milyen hidraulikák léteznek?</SectionTitle>
          <p className="text-[0.95rem] leading-relaxed mb-8 max-w-2xl" style={{ color: MID }}>
            A hidraulika szivattyú mechanikus energiát alakít hidraulikus energiává. A szivattyú
            által mozgatott folyadék nagy erőket képes kifejteni és precíz mozgásokat végezni —
            nélkülözhetetlen az ipar, az építőipar és a mezőgazdaság területén.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PUMP_TYPES.map((t) => (
              <TypeCard key={t.name} {...t} />
            ))}
          </div>
        </section>

        <Divider />

        {/* Motor types */}
        <section>
          <Label>Hidromotor típusok</Label>
          <SectionTitle>Hidromotorok</SectionTitle>
          <p className="text-[0.95rem] leading-relaxed mb-8 max-w-2xl" style={{ color: MID }}>
            A hidromotor hidraulikus energiát alakít mechanikus forgómozgássá. A kifejtett nyomaték
            és fordulatszám a rendszerben áramló folyadék mennyiségétől és nyomásától függ.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {MOTOR_TYPES.map((t) => (
              <TypeCard key={t.name} {...t} />
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl p-5 border"
              style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.07)" }}
            >
              <Label>Előnyök</Label>
              <ul className="space-y-2">
                {[
                  "Nagy nyomaték alacsony sebességnél",
                  "Széles fordulatszám-tartomány",
                  "Megbízható, hosszú élettartam",
                ].map((item) => (
                  <li key={item} className="text-[0.95rem] flex gap-2.5" style={{ color: MID }}>
                    <span className="font-bold" style={{ color: ORANGE }}>+</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-xl p-5 border"
              style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.07)" }}
            >
              <Label>Mire figyeljen</Label>
              <ul className="space-y-2">
                {[
                  "Olajszivárgás károsítja a rendszert",
                  "Javításuk szakértelmet igényel",
                  "Rendszeres ellenőrzés megelőzi a hibákat",
                ].map((item) => (
                  <li key={item} className="text-[0.95rem] flex gap-2.5" style={{ color: MID }}>
                    <span className="font-bold" style={{ color: "hsl(0 60% 55%)" }}>!</span> {item}
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
          <div className="mt-4 grid sm:grid-cols-[1.4fr_1fr] gap-6 items-center">
            <p className="text-[0.95rem] leading-relaxed" style={{ color: MID }}>
              A vezérlőtömb irányítja a hidraulikus folyadék áramlását a rendszerben. Meghibásodás
              esetén a gép teljes hidraulikus rendszere leállhat. Szakszerű diagnosztika és javítás
              elengedhetetlen — cégünk e téren is teljes körű megoldást kínál.
            </p>
            <div
              className="rounded-xl overflow-hidden border bg-white"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <img
                src="/images/Hidraulika_vezerlotomb.jpg"
                alt="Hidraulikus vezérlőtömb"
                className="w-full h-40 object-contain p-3"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <Divider />

        {/* Cylinder types */}
        <section>
          <Label>Hidraulikus munkahenger</Label>
          <SectionTitle>Munkahengerek típusai</SectionTitle>
          <p className="text-[0.95rem] leading-relaxed mb-8 max-w-2xl" style={{ color: MID }}>
            A hidraulikus munkahenger a folyadék nyomását lineáris mozgássá alakítja. Nagy erőket
            képes kifejteni pontosan irányítva — nélkülözhetetlen az építőipartól a mezőgazdaságig.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-6 items-start">
            <div className="grid gap-4">
              {CYLINDER_TYPES.map((t) => (
                <TypeCard key={t.name} {...t} />
              ))}
            </div>
            <div
              className="rounded-xl overflow-hidden border bg-white"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <img
                src="/images/Hidraulika_munkahenger.jpg"
                alt="Hidraulikus munkahenger"
                className="w-full h-52 sm:h-64 object-contain p-3"
                loading="lazy"
              />
            </div>
          </div>
          <p className="text-[0.95rem] leading-relaxed" style={{ color: MID }}>
            Komolyabb meghibásodás esetén — alkatrészek kopása, törése — a megoldás egy új vásárlása
            lehet. A pontos azonosításhoz a gyári cikkszám vagy az adattábla adatai szükségesek. Ha
            az adattábla nem található, felépítéséből, csatlakozásaiból és méreteiből meghatározzuk
            az eredeti típust.
          </p>
        </section>

        <Divider />

        {/* Machines + brands merged visually to keep the page tight */}
        <section>
          <Label>Milyen gépeket javítunk</Label>
          <SectionTitle>Márkafüggetlen javítás minden gépre</SectionTitle>
          <p className="text-[0.95rem] leading-relaxed mb-6 max-w-2xl" style={{ color: MID }}>
            A földmunkagépek és mezőgazdasági gépek hidraulikus egységeinek javításában nagy múlttal
            rendelkezünk — versenyképes áron, a lehető legrövidebb határidővel.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {MACHINES.map((m) => (
              <span
                key={m}
                className="px-3.5 py-2 rounded-full text-sm font-semibold border"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.1)",
                  color: MID,
                }}
              >
                {m}
              </span>
            ))}
          </div>
          <Label>Az alábbi márkákhoz nyújtunk segítséget</Label>
          <div className="flex flex-wrap gap-2 mt-3">
            {BRANDS.map((b) => (
              <span
                key={b}
                className="px-3.5 py-2 rounded-full text-sm font-bold uppercase tracking-wide border"
                style={{
                  background: "rgba(253,185,39,0.06)",
                  borderColor: "rgba(253,185,39,0.16)",
                  color: "hsl(43 98% 68%)",
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </section>

        <Divider />

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-3">Szüksége van javításra?</h2>
          <p className="text-[0.95rem] mb-8 max-w-md mx-auto leading-relaxed" style={{ color: DIM }}>
            Szivattyú, hidromotor, vezérlőtömb vagy munkahenger — gyors hibafeltárás, pontos
            árajánlat, rövid határidő. Hívjon minket bizalommal!
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
            <p>1095 Budapest, Soroksári út 48. — 8-as épület FSZ.</p>
          </div>
        </section>
      </article>

      <SubFooter />
      <MobileCallBar />
    </div>
  );
}
