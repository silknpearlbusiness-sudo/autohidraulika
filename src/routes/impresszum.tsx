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
      "Vercel Inc.",
      "440 N Barranca Ave #4133, Covina, CA 91723, Amerikai Egyesült Államok",
      "Web: https://vercel.com",
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
