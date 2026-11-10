import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { Contato, Servicos, servicosCabecalho } from "@/components/Sections";
import { servicos } from "@/content/site";
import { metadadosPagina, siteUrl } from "@/lib/site";

const descricao =
  "Web design e desenvolvimento, estratégia de produto, criação de produtos digitais, front-end e consultoria para times. Conheça os serviços da Konelabs.";

export const metadata: Metadata = metadadosPagina({ titulo: "Serviços", descricao, caminho: "/servicos" });

// Cada servico como Service ligado a organizacao, com os mesmos textos da pagina.
const dados = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Serviços da Konelabs",
  itemListElement: servicos.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.titulo,
      description: s.texto,
      serviceType: s.aplicacoes.join(", "),
      areaServed: "BR",
      provider: { "@id": `${siteUrl}/#organizacao` },
    },
  })),
};

export default function ServicosPage() {
  return (
    <>
      <JsonLd data={dados} />
      <PageHero pagina="Serviços" caminho="/servicos" titulo={servicosCabecalho.titulo} apoio={servicosCabecalho.apoio} />
      <Servicos cabecalho={false} />
      <Contato />
    </>
  );
}
