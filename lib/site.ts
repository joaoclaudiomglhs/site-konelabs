// Endereco publico do site, usado em URLs absolutas (canonical, Open Graph, sitemap e robots).
// Ordem: variavel definida manualmente, dominio de producao informado pela Vercel no build, dominio oficial.
// Assim os links de compartilhamento funcionam mesmo antes de konelabs.com.br apontar para a Vercel.
const vercelProducao = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelProducao ? `https://${vercelProducao}` : "https://konelabs.com.br")
).replace(/\/$/, "");

export const siteNome = "Konelabs";
export const siteTitulo = "Konelabs | Sites e produtos digitais estratégicos";
export const ogImagem = { url: "/og-image.png", width: 1200, height: 630, alt: "Konelabs" };

// Metadados padrao de uma pagina interna: titulo, descricao, canonical, Open Graph e Twitter.
// O Open Graph da pagina substitui o do layout por inteiro, por isso todos os campos sao repetidos.
export function metadadosPagina({ titulo, descricao, caminho }: { titulo: string; descricao: string; caminho: string }) {
  const tituloCompleto = `${titulo} | Konelabs`;
  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: caminho },
    openGraph: {
      type: "website" as const,
      locale: "pt_BR",
      siteName: siteNome,
      url: caminho,
      title: tituloCompleto,
      description: descricao,
      images: [ogImagem],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: tituloCompleto,
      description: descricao,
      images: [ogImagem.url],
    },
  };
}
