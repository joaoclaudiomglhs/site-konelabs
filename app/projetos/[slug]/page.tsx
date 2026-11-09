import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Cover from "@/components/Cover";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Contato } from "@/components/Sections";
import { projetos } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projetos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projetos.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.nome, description: p.descricao, openGraph: { images: [p.capa] } };
}

export default async function ProjetoPage({ params }: Params) {
  const { slug } = await params;
  const index = projetos.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();

  const p = projetos[index];
  const anterior = projetos[(index - 1 + projetos.length) % projetos.length];
  const proximo = projetos[(index + 1) % projetos.length];

  return (
    <>
      <article className="project-hero">
        <RevealGroup className="container">
          <RevealItem className="project-back">
            <Link href="/#projetos" className="link-arrow">
              <ArrowLeft size={18} aria-hidden="true" />
              Todos os projetos
            </Link>
          </RevealItem>
          <RevealItem>
            <h1 className="project-title">{p.nome}</h1>
          </RevealItem>
          <RevealItem className="project-grid">
            <div>
              <p className="lead">{p.descricao}</p>
              <a className="btn" href={p.url} target="_blank" rel="noreferrer" style={{ marginTop: 28 }}>
                Ver site no ar
                <ArrowUpRight className="btn-icon" size={18} aria-hidden="true" />
              </a>
            </div>
            <dl className="project-facts">
              <div>
                <dt>Cliente</dt>
                <dd>{p.nome}</dd>
              </div>
              <div>
                <dt>Ano</dt>
                <dd>{p.ano}</dd>
              </div>
              <div>
                <dt>Entrega</dt>
                <dd>{p.categoria}</dd>
              </div>
              <div>
                <dt>Setor</dt>
                <dd>{p.setor}</dd>
              </div>
            </dl>
          </RevealItem>
          <RevealItem className="project-cover">
            <Cover src={p.capa} alt={`Telas do projeto ${p.nome}`} label={p.nome} />
          </RevealItem>

          <nav className="project-nav" aria-label="Outros projetos">
            <Link href={`/projetos/${anterior.slug}`}>
              <span>Projeto anterior</span>
              <strong>{anterior.nome}</strong>
            </Link>
            <Link href={`/projetos/${proximo.slug}`}>
              <span>Próximo projeto</span>
              <strong>{proximo.nome}</strong>
            </Link>
          </nav>
        </RevealGroup>
      </article>
      <Contato />
    </>
  );
}
