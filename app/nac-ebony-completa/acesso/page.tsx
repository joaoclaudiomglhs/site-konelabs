import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import FormSenha from "@/components/FormSenha";
import { propostaNacEbonyCompleta as proposta, tokenValido } from "@/lib/proposta";
import { entrarNaProposta } from "./actions";

// Imagem de compartilhamento propria da proposta: logo da Konelabs com o nome do cliente abaixo.
// Quem abre o link da proposta sem acesso chega nesta pagina, entao e aqui que os apps leem a previa.
// Para gerar a imagem de outra proposta: scripts/gerar-og-proposta.mjs.
const cliente = "NAC Digital e Ebony Logistics";
const descricao = `Proposta comercial completa da Konelabs para ${cliente}.`;
const imagem = { url: "/og/proposta-nac-ebony.png", width: 1200, height: 630, alt: `Konelabs, proposta para ${cliente}` };

export const metadata: Metadata = {
  title: "Página protegida por senha",
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: proposta.caminho,
    siteName: "Konelabs",
    title: `Proposta Konelabs para ${cliente}`,
    description: descricao,
    images: [imagem],
  },
  twitter: {
    card: "summary_large_image",
    title: `Proposta Konelabs para ${cliente}`,
    description: descricao,
    images: [imagem.url],
  },
};

const email = "joao.magalhaes@konelabs.com.br";

export default async function AcessoProposta() {
  // Quem ja tem acesso vai direto para a proposta.
  const loja = await cookies();
  if (tokenValido(loja.get(proposta.cookie)?.value, proposta)) redirect(proposta.caminho);

  return (
    <section className="container senha-pagina" aria-labelledby="senha-titulo">
      <div className="senha-card card-raised">
        <span className="senha-icone" aria-hidden="true">
          <LockKeyhole size={22} />
        </span>
        <h1 className="h2 senha-titulo" id="senha-titulo">
          Página protegida por senha
        </h1>
        <FormSenha acao={entrarNaProposta} />
        <p className="senha-ajuda">
          Para ter acesso, solicite pelo e-mail <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
    </section>
  );
}
