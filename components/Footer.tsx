import { contato, rodape } from "@/content/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          {rodape.assinatura} · {rodape.lema}
        </p>
        <a href={contato.site} target="_blank" rel="noreferrer">
          {contato.pessoa}
        </a>
      </div>
    </footer>
  );
}
