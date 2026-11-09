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
