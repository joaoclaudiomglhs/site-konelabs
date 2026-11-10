import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { Clientes, Contato, Sobre } from "@/components/Sections";
import { sobre } from "@/content/site";
import { metadadosPagina, siteUrl } from "@/lib/site";

const descricao =
  "Konelabs, desde 2018: sites e produtos digitais para marcas que lideram o seu mercado, unindo design, tecnologia e IA, com clientes em todo o Brasil.";

export const metadata: Metadata = metadadosPagina({ titulo: "Sobre", descricao, caminho: "/sobre" });

const dados = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sobre a Konelabs",
  url: `${siteUrl}/sobre`,
  description: descricao,
  about: { "@id": `${siteUrl}/#organizacao` },
};

export default function SobrePage() {
  return (
    <>
      <JsonLd data={dados} />
      <PageHero pagina="Sobre" caminho="/sobre" titulo={sobre.titulo} apoio={sobre.texto} />
      <Sobre cabecalho={false} />
      <Clientes />
      <Contato />
    </>
  );
}
