import { Clientes, Contato, Faq, Hero, Projetos, Servicos, Sobre } from "@/components/Sections";
import JsonLd from "@/components/JsonLd";
import { contato, faq, hero, servicos } from "@/content/site";
import { siteNome, siteUrl } from "@/lib/site";

// Organizacao, site e perguntas frequentes, com os mesmos dados que aparecem na pagina.
const dados = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organizacao`,
      name: siteNome,
      url: `${siteUrl}/`,
      logo: `${siteUrl}/apple-icon.png`,
      description: hero.apoio,
      foundingDate: "2018",
      email: contato.email,
      telephone: contato.telefone,
      areaServed: "BR",
      knowsAbout: servicos.map((s) => s.titulo),
      founder: { "@type": "Person", name: contato.pessoa, url: contato.site },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#site`,
      url: `${siteUrl}/`,
      name: siteNome,
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteUrl}/#organizacao` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.itens.map((f) => ({
        "@type": "Question",
        name: f.p,
        acceptedAnswer: { "@type": "Answer", text: f.r },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={dados} />
      <Hero />
      <Servicos />
      <Projetos />
      <Clientes />
      <Sobre />
      <Faq />
      <Contato />
    </>
  );
}
