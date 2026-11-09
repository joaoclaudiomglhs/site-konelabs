import Link from "next/link";
import {
  ArrowUpRight,
  Code,
  Compass,
  Layers,
  Mail,
  MapPin,
  MonitorSmartphone,
  Phone,
  Plus,
  Users,
  CalendarClock,
} from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import Cover from "@/components/Cover";
import CopyEmail from "@/components/CopyEmail";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import {
  chamadaContato,
  clientes,
  contato,
  faq,
  hero,
  projetos,
  servicos,
  sobre,
  type Servico,
} from "@/content/site";

const icones: Record<Servico["icone"], typeof Code> = {
  "monitor-smartphone": MonitorSmartphone,
  compass: Compass,
  layers: Layers,
  code: Code,
  users: Users,
};

function SectionHead({ tag, id, titulo, apoio }: { tag: string; id: string; titulo: string; apoio?: string }) {
  return (
    <RevealGroup className="section-head">
      <RevealItem>
        <p className="tag">{tag}</p>
      </RevealItem>
      <RevealItem>
        <h2 className="h2" id={id}>
          {titulo}
        </h2>
      </RevealItem>
      {apoio && (
        <RevealItem>
          <p className="lead">{apoio}</p>
        </RevealItem>
      )}
    </RevealGroup>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <RevealGroup className="container">
        <RevealItem>
          <h1 className="hero-title" id="hero-title">
            {hero.titulo
              .split(new RegExp(`(${hero.destaques.join("|")})`))
              .map((parte, i) => (hero.destaques.includes(parte) ? <em key={i}>{parte}</em> : <span key={i}>{parte}</span>))}
          </h1>
        </RevealItem>
        <RevealItem className="hero-bottom">
          <div>
            <p className="lead">{hero.apoio}</p>
            <p className="hero-meta">
              <span>
                <MapPin size={16} aria-hidden="true" color="var(--accent)" />
                {hero.origem}
              </span>
              <span>
                <CalendarClock size={16} aria-hidden="true" color="var(--accent)" />
                {hero.desde}
              </span>
            </p>
          </div>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}

export function Servicos() {
  return (
    <section className="section" id="servicos" aria-labelledby="servicos-title">
      <div className="container">
        <SectionHead
          tag="Serviços"
          id="servicos-title"
          titulo="Do primeiro esboço ao produto em evolução"
          apoio="Atuamos onde o seu negócio precisa de clareza: no site, no produto, no código ou no time."
        />
        <RevealGroup as="ul" className="services-list">
          {servicos.map((s) => {
            const Icon = icones[s.icone];
            return (
              <RevealItem as="li" key={s.id}>
                <article className="service">
                  <span className="service-num">{s.id}</span>
                  <span className="service-icon" aria-hidden="true">
                    <Icon size={30} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3>{s.titulo}</h3>
                    <p>{s.texto}</p>
                  </div>
                  <div className="service-apps-wrap">
                    <p className="service-apps-label">Aplicações</p>
                    <ul className="service-apps">
                      {s.aplicacoes.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

export function Projetos() {
  return (
    <section className="section" id="projetos" aria-labelledby="projetos-title">
      <div className="container">
        <SectionHead tag="Projetos 2024 a 2026" id="projetos-title" titulo="Trabalhos selecionados" />
        <RevealGroup as="ul" className="works-grid">
          {projetos.map((p) => (
            <RevealItem as="li" key={p.slug}>
              <Link href={`/projetos/${p.slug}`} className="work-card">
                <Cover src={p.capa} alt={`Capa do projeto ${p.nome}`} label={p.nome} />
                <div className="work-info">
                  <div>
                    <h3>{p.nome}</h3>
                    <p className="work-meta">
                      {p.categoria} · {p.ano}
                    </p>
                  </div>
                  <span className="work-arrow" aria-hidden="true">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function Clientes() {
  return (
    <section className="section" id="clientes" aria-labelledby="clientes-title">
      <div className="container">
        <SectionHead tag="Clientes" id="clientes-title" titulo="Marcas que confiam no nosso trabalho" />
        <RevealGroup as="ul" className="clients-grid">
          {clientes.map((c) => (
            <RevealItem as="li" key={c.nome} className="client">
              {c.url ? (
                <a href={c.url} target="_blank" rel="noreferrer" aria-label={`${c.nome}, abre o site em nova aba`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.logo} alt="" loading="lazy" />
                </a>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.logo} alt={c.nome} loading="lazy" />
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function Sobre() {
  return (
    <section className="section" id="sobre" aria-labelledby="sobre-title">
      <div className="container about-grid">
        <div>
          <SectionHead tag="Sobre" id="sobre-title" titulo={sobre.titulo} apoio={sobre.texto} />
          <RevealGroup className="stats">
            {sobre.numeros.map((n) => (
              <RevealItem key={n.rotulo} className="stat card-raised">
                <p className="stat-value">{n.valor}</p>
                <p className="stat-label">{n.rotulo}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <div>
          <p className="sectors-label">Setores que atendemos</p>
          <RevealGroup as="ul" className="sectors">
            {sobre.setores.map((s, i) => (
              <RevealItem as="li" key={s}>
                <span>{s}</span>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <SectionHead tag="FAQ" id="faq-title" titulo={faq.titulo} apoio={faq.apoio} />
        <RevealGroup>
          {faq.itens.map((f) => (
            <RevealItem key={f.p}>
              <details className="faq-item">
                <summary>
                  {f.p}
                  <span className="faq-icon" aria-hidden="true">
                    <Plus size={20} />
                  </span>
                </summary>
                <p className="faq-answer">{f.r}</p>
              </details>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function Contato() {
  return (
    <section className="section" id="contato" aria-labelledby="contato-title">
      <div className="container">
        <RevealGroup className="section-head">
          <RevealItem>
            <p className="tag">Contato</p>
          </RevealItem>
          <RevealItem>
            <h2 className="contact-title" id="contato-title">
              {chamadaContato.titulo}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="lead">{chamadaContato.texto}</p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="contact-grid">
          <RevealItem className="contact-item card-raised">
            <WhatsAppIcon className="contact-icon" size={30} />
            <p className="contact-label">WhatsApp</p>
            <a className="btn btn-primary" href={contato.whatsapp} target="_blank" rel="noreferrer" style={{ width: "fit-content" }}>
              <WhatsAppIcon size={18} />
              Iniciar conversa
            </a>
          </RevealItem>
          <RevealItem className="contact-item">
            <Mail className="contact-icon" size={32} strokeWidth={1.5} aria-hidden="true" />
            <p className="contact-label">E-mail</p>
            <a className="contact-value" href={`mailto:${contato.email}`}>
              {contato.email}
            </a>
            <CopyEmail email={contato.email} />
          </RevealItem>
          <RevealItem className="contact-item">
            <Phone className="contact-icon" size={32} strokeWidth={1.5} aria-hidden="true" />
            <p className="contact-label">Telefone</p>
            <a className="contact-value" href={`tel:${contato.telefone.replace(/[^+\d]/g, "")}`}>
              {contato.telefone}
            </a>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
