import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import CaseMedia from "@/components/CaseMedia";
import Pending from "@/components/Pending";
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

function CaseSection({ id, tag, titulo, children }: { id: string; tag: string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="case-section" aria-labelledby={id}>
      <RevealGroup className="case-row">
        <RevealItem className="case-head">
          <p className="tag">{tag}</p>
          <h2 className="case-h2" id={id}>
            {titulo}
          </h2>
        </RevealItem>
        <RevealItem className="case-body">{children}</RevealItem>
      </RevealGroup>
    </section>
  );
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
        <div className="container">
          <RevealGroup>
            <RevealItem className="project-back">
              <Link href="/#projetos" className="link-arrow">
                <ArrowLeft className="btn-icon icon-left" size={18} aria-hidden="true" />
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
                  <ArrowUpRight className="btn-icon icon-up-right" size={18} aria-hidden="true" />
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
                  <dt>Setor</dt>
                  <dd>{p.setor}</dd>
                </div>
                <div>
                  <dt>Ferramentas</dt>
                  <dd>{p.ferramentas.join(", ")}</dd>
                </div>
              </dl>
            </RevealItem>
            <RevealItem className="project-cover">
              <CaseMedia nome={p.nome} capa={p.capa} video={p.video} />
            </RevealItem>
          </RevealGroup>

          <div className="case-sections">
            <CaseSection id="desafio" tag="Contexto" titulo="O desafio">
              {p.desafio ? (
                <p className="case-text">{p.desafio}</p>
              ) : (
                <Pending campo="Desafio" dica="Qual era o problema do cliente antes do projeto e por que ele procurou a Konelabs." />
              )}
            </CaseSection>

            <CaseSection id="solucao" tag="Solução" titulo="O que fizemos">
              {p.solucao ? (
                <p className="case-text">{p.solucao}</p>
              ) : (
                <Pending campo="Solução" dica="Como o projeto foi conduzido: decisões de estrutura, conteúdo, design e tecnologia." />
              )}
              <p className="case-label">Entregas</p>
              <ul className="case-deliverables">
                {p.entregas.map((e) => (
                  <li key={e}>
                    <Check size={20} aria-hidden="true" color="var(--accent)" />
                    {e}
                  </li>
                ))}
              </ul>
            </CaseSection>

            <CaseSection id="resultados" tag="Impacto" titulo="Resultados">
              {p.resultados && p.resultados.length > 0 ? (
                <ul className="case-results">
                  {p.resultados.map((r) => (
                    <li key={r.rotulo} className="stat card-raised">
                      <p className="stat-value">{r.valor}</p>
                      <p className="stat-label">{r.rotulo}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <Pending campo="Resultados" dica="Números ou mudanças observadas depois da entrega, com métrica e período." />
              )}
            </CaseSection>

            {p.depoimento && (
              <CaseSection id="depoimento" tag="Depoimento" titulo="O que o cliente diz">
                <figure className="case-quote card-raised">
                  <blockquote>{p.depoimento.texto}</blockquote>
                  <figcaption>
                    {p.depoimento.autor}, {p.depoimento.cargo}
                  </figcaption>
                </figure>
              </CaseSection>
            )}
          </div>

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
        </div>
      </article>
      <Contato />
    </>
  );
}
