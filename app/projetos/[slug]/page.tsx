import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import CaseMedia from "@/components/CaseMedia";
import Pending from "@/components/Pending";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Contato } from "@/components/Sections";
import JsonLd from "@/components/JsonLd";
import { projetos, type Projeto } from "@/content/site";
import { siteNome, siteUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

// Apenas os projetos cadastrados existem. Qualquer outro endereco cai na pagina 404.
export const dynamicParams = false;

// Enquanto a descricao estiver pendente, o resumo para buscadores usa so dados ja confirmados do projeto.
const minuscula = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

function resumo(p: Projeto) {
  if (!p.descricao.toLowerCase().includes("pendente")) return p.descricao;
  return `${p.nome}: projeto da Konelabs no setor ${p.setor.toLowerCase()}, ${minuscula(p.categoria)}, ${p.ano}.`;
}

export function generateStaticParams() {
  return projetos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projetos.find((x) => x.slug === slug);
  if (!p) return {};
  const titulo = `${p.nome}, ${minuscula(p.categoria)}`;
  const caminho = `/projetos/${p.slug}`;
  const imagem = { url: p.capa, alt: `Capa do projeto ${p.nome}` };
  return {
    title: titulo,
    description: resumo(p),
    alternates: { canonical: caminho },
    // O Open Graph da pagina substitui o do layout por inteiro, entao todos os campos sao repetidos aqui.
    openGraph: {
      type: "article",
      locale: "pt_BR",
      siteName: siteNome,
      url: caminho,
      title: `${titulo} | Konelabs`,
      description: resumo(p),
      images: [imagem],
    },
    twitter: {
      card: "summary_large_image",
      title: `${titulo} | Konelabs`,
      description: resumo(p),
      images: [p.capa],
    },
  };
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

  const dados = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: p.nome,
        description: resumo(p),
        url: `${siteUrl}/projetos/${p.slug}`,
        image: `${siteUrl}${p.capa}`,
        dateCreated: String(p.ano),
        genre: p.categoria,
        about: p.setor,
        creator: { "@id": `${siteUrl}/#organizacao`, "@type": "Organization", name: siteNome },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Projetos", item: `${siteUrl}/#projetos` },
          { "@type": "ListItem", position: 3, name: p.nome, item: `${siteUrl}/projetos/${p.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={dados} />
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
