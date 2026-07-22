import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { parseSections } from "@/lib/legal";
import { isGoogleAdsConfigured } from "@/lib/google-ads";

export const Route = createFileRoute("/suti-szabalyzat")({
  head: () => ({
    meta: [
      { title: "Süti kezelési szabályzat | Hidraulika Service TEAM Kft." },
      { name: "description", content: "A hidraulikajavitas.com weboldalon alkalmazott sütik (cookie-k) kezelésére vonatkozó tájékoztató." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.hidraulikajavitas.com/suti-szabalyzat" }],
  }),
  component: SutiSzabalyzatPage,
});

const ADS_ON = isGoogleAdsConfigured();

// Kept in lockstep with VITE_GOOGLE_ADS_CONVERSION_ID (see src/lib/google-ads.ts)
// so this disclosure can never drift out of sync with what's actually loaded —
// setting/unsetting that one env var is the only thing that needs to happen.
const ADS_CLAUSE = ADS_ON
  ? ` Google Ads (szolgáltató: Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Írország; adatvédelmi tájékoztató: https://policies.google.com/privacy) – a hirdetéseink hatékonyságának méréséhez használt konverziókövető süti, amely kizárólag a visszahívás-kérő űrlap sikeres elküldése után, a „Köszönjük megkeresését" oldalon töltődik be.`
  : "";

const NO_ADS_CLAUSE = ADS_ON
  ? "Honlapunk a fent részletezett Google Ads konverziókövetésen kívül más látogatottságmérő, elemző vagy hirdetési sütit nem használ."
  : "Honlapunk látogatottságmérő, elemző vagy hirdetési (marketing) sütiket nem használ.";

const RAW = `A Cookie (süti) tájékoztató hatálya Jelen szabályzat az Ön által most felkeresett és a Hidraulika Service TEAM Kft. (székhely: 1095 Budapest, Soroksári út 48.; cégjegyzékszáma: 01-09-376445; adószáma: 32267509-2-43; a továbbiakban: Üzemeltető) kezelésében álló honlapra terjed ki. Mik azok a cookie-k (vagy sütik)? A süti (cookie) egy kisméretű adatfájl, amelyet a meglátogatott weboldal helyez el a látogató eszközén. A sütikhez hasonló technológia a böngésző helyi tárolója (localStorage), amelyben a weboldal szintén kisméretű adatokat tárolhat a látogató eszközén; jelen tájékoztató erre a technológiára is kiterjed. Feltétlenül szükséges adattárolás A honlap működéséhez feltétlenül szükséges körben az alábbiakat alkalmazzuk: munkamenet sütik (session cookie), amelyek a honlap böngészéséhez és funkcióinak használatához szükségesek, és a böngésző bezárásával automatikusan törlődnek; valamint a „cookie_consent" nevű helyi tárolóbejegyzés (localStorage), amelyben kizárólag az Ön süti-hozzájárulási döntését („elfogadva" vagy „elutasítva") tároljuk, hogy a döntését a következő látogatásakor ne kelljen újra megadnia. Ez a bejegyzés személyes adatot nem tartalmaz, és addig marad az eszközén, amíg Ön nem törli, vagy a lábléc „Süti beállítások" linkjével nem módosítja döntését. A feltétlenül szükséges adattárolás jogalapja az Üzemeltető jogos érdeke, ehhez hozzájárulás nem szükséges. Hozzájáruláson alapuló, harmadik féltől származó sütik A süti sávon található „Elfogadom" gomb megnyomása esetén – és kizárólag ebben az esetben – betöltődnek az alábbi, sütiket elhelyező külső szolgáltatások: Google Térkép (szolgáltató: Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Írország; adatvédelmi tájékoztató: https://policies.google.com/privacy) – a műhelyünk elhelyezkedését mutató beágyazott térkép.${ADS_CLAUSE} Ha Ön a „Csak szükséges" gombot választja, ezek a szolgáltatások nem töltődnek be, és sütit sem helyeznek el; ebben az esetben a térkép helyett a műhely címét megjelenítő felület látható. A honlapon elérhető visszahívás-kérő űrlap saját fejlesztésű, külső szolgáltatást nem tölt be és sütit nem helyez el; az űrlapon megadott adatok kezeléséről az Adatkezelési tájékoztató rendelkezik. A honlapon használt betűtípusokat saját szerverünkről szolgáltatjuk, ezért betűtípus-letöltés céljából nem történik adattovábbítás a Google felé. ${NO_ADS_CLAUSE} A hozzájárulás visszavonása, a süti beállítások módosítása Ön a hozzájárulását bármikor, indokolás nélkül visszavonhatja a honlap láblécében található „Süti beállítások" linkre kattintva. Ekkor a tárolt döntése törlődik, az oldal újratöltődik, a külső szolgáltatások nem töltődnek be újra, és a süti sáv ismét megjelenik. A hozzájárulás visszavonása nem érinti a visszavonás előtti adatkezelés jogszerűségét. A korábban elhelyezett harmadik feles sütiket böngészőjében törölheti. Biztonság Lényeges, hogy az oldal Üzemeltetője a sütik engedélyezése esetén sem jegyez meg semmilyen azonosítót vagy jelszót. A látogató a sütik elfogadása esetén is teljes biztonságban használhatja az oldal Üzemeltetőjének elektronikus szolgáltatásait. A böngésző süti beállításainak ellenőrzése, a sütik letiltása A modern böngészők engedélyezik a süti beállítások módosítását. A böngészők egy része alapértelmezettként automatikusan elfogadja a sütiket, de ez a beállítás is megváltoztatható annak érdekében, hogy a jövőre nézve a felhasználó megakadályozza az automatikus elfogadást. Felhívjuk látogatóink figyelmét, hogy mivel a sütik célja a weboldal használhatóságának és folyamatainak támogatása, a sütik letiltása esetén nem tudjuk garantálni, hogy a látogató képes lesz a weboldal valamennyi funkciójának teljes körű használatára. A weboldal ebben az esetben a tervezettől eltérően működhet a böngészőben. Részletes, magyar nyelvű információk az egyes böngészők süti beállításairól: Chrome: https://support.google.com/accounts/answer/61416?hl=hu — Firefox: https://support.mozilla.org/hu/kb/sutik-informacio-amelyet-weboldalak-tarolnak-szami — Microsoft Edge: https://support.microsoft.com/hu-hu/windows/a-microsoft-edge-a-bongesesi-adatok-es-az-adatvedelem. Felhívjuk látogatóink figyelmét, hogy reklámblokkoló (ad-blocker) használata esetén a cookie nyilatkozatról szóló tájékoztatás nem minden esetben jelenik meg. Amennyiben szeretné megtekinteni, deaktiválja a reklámblokkoló alkalmazást!`;

const HEADINGS = [
  "A Cookie (süti) tájékoztató hatálya",
  "Mik azok a cookie-k (vagy sütik)?",
  "Feltétlenül szükséges adattárolás",
  "Hozzájáruláson alapuló, harmadik féltől származó sütik",
  "A hozzájárulás visszavonása, a süti beállítások módosítása",
  "Biztonság",
  "A böngésző süti beállításainak ellenőrzése, a sütik letiltása",
];

const sections = parseSections(RAW, HEADINGS);

function SutiSzabalyzatPage() {
  return (
    <LegalPage
      title="Süti kezelési szabályzat"
      sections={sections}
    />
  );
}
