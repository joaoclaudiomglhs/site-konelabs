import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { Clientes, Contato, Projetos } from "@/components/Sections";
import { projetos } from "@/content/site";
import { metadadosPagina, siteUrl } from "@/lib/site";

const apoio = "Sites e produtos digitais criados pela Konelabs entre 2024 e 2026, para marcas de telecomunicações, saúde, segurança, sustentabilidade e do setor automotivo.";
const descricao = `Projetos da Konelabs: ${projetos.map((p) => p.nome).join(", ")}. Sites e produtos digitais criados entre 2024 e 2026.`;

export const metadata: Metadata = metadadosPagina({ titulo: "Projetos", descricao, caminho: "/projetos" });

const dados = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projetos da Konelabs",
  url: `${siteUrl}/projetos`,
  description: descricao,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projetos.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/projetos/${p.slug}`,
      name: p.nome,
    })),
  },
};

export default function ProjetosPage() {
  return (
    <>
      <JsonLd data={dados} />
      <PageHero pagina="Projetos" caminho="/projetos" titulo="Trabalhos selecionados" apoio={apoio} />
      <Projetos cabecalho={false} />
      <Clientes />
      <Contato />
    </>
  );
}
