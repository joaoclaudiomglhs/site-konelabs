import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <section className="container not-found">
      <h1 className="h2">Página não encontrada</h1>
      <p className="lead">Este endereço não existe ou mudou. Confira o link ou volte para a página inicial.</p>
      <Link href="/" className="btn" style={{ width: "fit-content" }}>
        <ArrowLeft className="btn-icon icon-left" size={18} aria-hidden="true" />
        Voltar para o início
      </Link>
    </section>
  );
}
