import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import FormSenha from "@/components/FormSenha";
import { propostaCaminho, propostaCookie, tokenValido } from "@/lib/proposta";
import { entrarNaProposta } from "./actions";

export const metadata: Metadata = {
  title: "Página protegida por senha",
  robots: { index: false, follow: false, nocache: true },
};

const email = "joao.magalhaes@konelabs.com.br";

export default async function AcessoProposta() {
  // Quem ja tem acesso vai direto para a proposta.
  const loja = await cookies();
  if (tokenValido(loja.get(propostaCookie)?.value)) redirect(propostaCaminho);

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
