import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { siteUrl } from "@/lib/site";

// Topo das paginas internas: trilha de navegacao (visual e em dados estruturados), H1 e texto de apoio.
export default function PageHero({
  titulo,
  apoio,
  pagina,
  caminho,
}: {
  titulo: string;
  apoio?: string;
  pagina: string;
  caminho: string;
}) {
  const trilha = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: pagina, item: `${siteUrl}${caminho}` },
    ],
  };

  return (
    <section className="page-hero" aria-labelledby="page-title">
      <JsonLd data={trilha} />
      <RevealGroup className="container">
        <RevealItem>
          <nav aria-label="Trilha de navegação" className="breadcrumb">
            <Link href="/">Início</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">{pagina}</span>
          </nav>
        </RevealItem>
        <RevealItem>
          <h1 className="page-title" id="page-title">
            {titulo}
          </h1>
        </RevealItem>
        {apoio && (
          <RevealItem>
            <p className="lead page-lead">{apoio}</p>
          </RevealItem>
        )}
      </RevealGroup>
    </section>
  );
}
