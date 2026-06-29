import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import type { LegalSection } from "@/lib/legal";

export const Route = createFileRoute("/impresszum")({
  head: () => ({
    meta: [
      { title: "Impresszum | Hidraulika Service TEAM Kft." },
      { name: "description", content: "A hidraulikajavitas.com weboldal üzemeltetőjének és tárhelyszolgáltatójának adatai." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.hidraulikajavitas.com/impresszum" }],
  }),
  component: ImpressumPage,
});

const sections: LegalSection[] = [
  {
    heading: "A weboldal üzemeltetője",
    paragraphs: [
      "Hidraulika Service Team Kft.",
      "Székhely: 1095 Budapest, Soroksári út 48.",
      "Cégjegyzékszám: 01-09-376445 (Fővárosi Törvényszék, mint cégbíróság)",
      "Adószám: 32267509-2-43",
      "E-mail: info@hidraulikajavitas.com",
    ],
  },
  {
    heading: "A tárhelyet biztosító szolgáltató",
    paragraphs: [
      "Cweb Hosting Kft",
      "1173 Budapest, Borsó utca 12-32",
      "Tel: +36-70-282-7206",
      "Cégjegyzékszám: Cg.01-09-405273",
      "Adószám: 32069473-1-42",
      "Közösségi adószám: HU32069473",
    ],
  },
];

function ImpressumPage() {
  return (
    <LegalPage
      title="Impresszum"
      sections={sections}
    />
  );
}
