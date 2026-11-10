import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { Contato, Faq } from "@/components/Sections";
import { chamadaContato, contato } from "@/content/site";
import { metadadosPagina, siteNome, siteUrl } from "@/lib/site";

const descricao = "Fale com a Konelabs pelo WhatsApp, e-mail ou telefone e conte qual é o seu próximo projeto. Atendemos clientes em todo o Brasil.";

export const metadata: Metadata = metadadosPagina({ titulo: "Contato", descricao, caminho: "/contato" });

const dados = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contato da Konelabs",
  url: `${siteUrl}/contato`,
  description: descricao,
  mainEntity: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organizacao`,
    name: siteNome,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: contato.email,
      telephone: contato.telefone,
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
  },
};

export default function ContatoPage() {
  return (
    <>
      <JsonLd data={dados} />
      <PageHero pagina="Contato" caminho="/contato" titulo={chamadaContato.titulo} apoio={chamadaContato.texto} />
      <Contato cabecalho={false} />
      <Faq />
    </>
  );
}
