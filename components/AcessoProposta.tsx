import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import FormSenha from "@/components/FormSenha";
import { caminhoProposta, cookieProposta, propostas, tokenValido, type SlugProposta } from "@/lib/proposta";
import { entrarNaProposta } from "@/lib/propostaAcoes";

const email = "joao.magalhaes@konelabs.com.br";

// Imagem de compartilhamento propria da proposta: logo da Konelabs com o nome do cliente abaixo.
// Quem abre o link da proposta sem acesso chega na tela de senha, entao e nela que os apps leem a previa.
// Para gerar a imagem de outra proposta: scripts/gerar-og-proposta.mjs (as versoes do mesmo cliente podem reaproveitar a imagem).
export function metadadosAcesso(slug: SlugProposta, imagemOg: string): Metadata {
  const { cliente } = propostas[slug];
  const titulo = `Proposta Konelabs para ${cliente}`;
  const descricao = `Proposta comercial da Konelabs para ${cliente}.`;
  const imagem = { url: imagemOg, width: 1200, height: 630, alt: `Konelabs, proposta para ${cliente}` };
  return {
    title: "Página protegida por senha",
    robots: { index: false, follow: false, nocache: true },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: caminhoProposta(slug),
      siteName: "Konelabs",
      title: titulo,
      description: descricao,
      images: [imagem],
    },
    twitter: { card: "summary_large_image", title: titulo, description: descricao, images: [imagem.url] },
  };
}

export default async function AcessoProposta({ slug }: { slug: SlugProposta }) {
  // Quem ja tem acesso vai direto para a proposta.
  const loja = await cookies();
  if (tokenValido(slug, loja.get(cookieProposta(slug))?.value)) redirect(caminhoProposta(slug));

  return (
    <section className="container senha-pagina" aria-labelledby="senha-titulo">
      <div className="senha-card card-raised">
        <span className="senha-icone" aria-hidden="true">
          <LockKeyhole size={22} />
        </span>
        <h1 className="h2 senha-titulo" id="senha-titulo">
          Página protegida por senha
        </h1>
        <FormSenha acao={entrarNaProposta.bind(null, slug)} />
        <p className="senha-ajuda">
          Para ter acesso, solicite pelo e-mail <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
    </section>
  );
}
