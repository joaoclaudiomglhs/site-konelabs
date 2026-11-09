import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container not-found">
      <p className="tag">Erro 404</p>
      <h1 className="h2">Esta página não existe ou mudou de endereço</h1>
      <p className="lead">Confira o endereço digitado ou volte para a página inicial.</p>
      <Link href="/" className="btn" style={{ width: "fit-content" }}>
        <ArrowLeft size={18} aria-hidden="true" />
        Voltar para o início
      </Link>
    </section>
  );
}
