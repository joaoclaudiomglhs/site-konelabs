import Link from "next/link";
import { contato, navRodape, rodape } from "@/content/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-marca">
          <p>
            {rodape.assinatura} · {rodape.lema}
          </p>
          <p className="footer-cnpj">CNPJ {rodape.cnpj}</p>
        </div>
        <nav aria-label="Rodapé">
          <ul className="footer-nav">
            {navRodape.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <a href={contato.site} target="_blank" rel="noreferrer">
          {contato.pessoa}
        </a>
      </div>
    </footer>
  );
}
