import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { parseSections } from "@/lib/legal";

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

const RAW = `A Cookie (süti) tájékoztató hatálya Jelen szabályzat az Ön által most felkeresett és a Hidraulika Service TEAM Kft. (székhely: 1095 Budapest, Soroksári út 48.; cégjegyzékszáma: 01-09-376445; adószáma: 32267509-2-43; a továbbiakban: Üzemeltető) kezelésében álló honlapra terjed ki. Mik azok a cookie-k (vagy sütik)? A süti (cookie) egy kisméretű adatfájl, amelyet a meglátogatott weboldal helyez el a látogató eszközén. A sütikhez hasonló technológia a böngésző helyi tárolója (localStorage), amelyben a weboldal szintén kisméretű adatokat tárolhat a látogató eszközén; jelen tájékoztató erre a technológiára is kiterjed. Feltétlenül szükséges adattárolás A honlap működéséhez feltétlenül szükséges körben az alábbiakat alkalmazzuk: munkamenet sütik (session cookie), amelyek a honlap böngészéséhez és funkcióinak használatához szükségesek, és a böngésző bezárásával automatikusan törlődnek; valamint a „cookie_consent" nevű helyi tárolóbejegyzés (localStorage), amelyben kizárólag az Ön süti-hozzájárulási döntését („elfogadva" vagy „elutasítva") tároljuk, hogy a döntését a következő látogatásakor ne kelljen újra megadnia. Ez a bejegyzés személyes adatot nem tartalmaz, és addig marad az eszközén, amíg Ön nem törli, vagy a lábléc „Süti beállítások" linkjével nem módosítja döntését. A feltétlenül szükséges adattárolás jogalapja az Üzemeltető jogos érdeke, ehhez hozzájárulás nem szükséges. Hozzájáruláson alapuló, harmadik féltől származó sütik A süti sávon található „Elfogadom" gomb megnyomása esetén – és kizárólag ebben az esetben – az alábbi külső szolgáltatás töltődik be, amely saját sütiket helyezhet el az Ön eszközén: Google Térkép (szolgáltató: Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Írország; adatvédelmi tájékoztató: https://policies.google.com/privacy) – a műhelyünk elhelyezkedését mutató beágyazott térkép. Ha Ön a „Csak szükséges" gombot választja, ez a külső szolgáltatás egyáltalán nem töltődik be, és sütit sem helyez el; ebben az esetben a térkép helyett a műhely címét megjelenítő felület látható. A honlapon elérhető visszahívás-kérő űrlap saját fejlesztésű, külső szolgáltatást nem tölt be és sütit nem helyez el; az űrlapon megadott adatok kezeléséről az Adatkezelési tájékoztató rendelkezik. A honlapon használt betűtípusokat saját szerverünkről szolgáltatjuk, ezért betűtípus-letöltés céljából nem történik adattovábbítás a Google felé. Honlapunk látogatottságmérő, elemző vagy hirdetési (marketing) sütiket nem használ. A hozzájárulás visszavonása, a süti beállítások módosítása Ön a hozzájárulását bármikor, indokolás nélkül visszavonhatja a honlap láblécében található „Süti beállítások" linkre kattintva. Ekkor a tárolt döntése törlődik, az oldal újratöltődik, a külső szolgáltatások nem töltődnek be újra, és a süti sáv ismét megjelenik. A hozzájárulás visszavonása nem érinti a visszavonás előtti adatkezelés jogszerűségét. A korábban elhelyezett harmadik feles sütiket böngészőjében törölheti. Biztonság Lényeges, hogy az oldal Üzemeltetője a sütik engedélyezése esetén sem jegyez meg semmilyen azonosítót vagy jelszót. A látogató a sütik elfogadása esetén is teljes biztonságban használhatja az oldal Üzemeltetőjének elektronikus szolgáltatásait. A böngésző süti beállításainak ellenőrzése, a sütik letiltása A modern böngészők engedélyezik a süti beállítások módosítását. A böngészők egy része alapértelmezettként automatikusan elfogadja a sütiket, de ez a beállítás is megváltoztatható annak érdekében, hogy a jövőre nézve a felhasználó megakadályozza az automatikus elfogadást. Felhívjuk látogatóink figyelmét, hogy mivel a sütik célja a weboldal használhatóságának és folyamatainak támogatása, a sütik letiltása esetén nem tudjuk garantálni, hogy a látogató képes lesz a weboldal valamennyi funkciójának teljes körű használatára. A weboldal ebben az esetben a tervezettől eltérően működhet a böngészőben. Részletes, magyar nyelvű információk az egyes böngészők süti beállításairól: Chrome: https://support.google.com/accounts/answer/61416?hl=hu — Firefox: https://support.mozilla.org/hu/kb/sutik-informacio-amelyet-weboldalak-tarolnak-szami — Microsoft Edge: https://support.microsoft.com/hu-hu/windows/a-microsoft-edge-a-bongesesi-adatok-es-az-adatvedelem. Felhívjuk látogatóink figyelmét, hogy reklámblokkoló (ad-blocker) használata esetén a cookie nyilatkozatról szóló tájékoztatás nem minden esetben jelenik meg. Amennyiben szeretné megtekinteni, deaktiválja a reklámblokkoló alkalmazást!`;

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
