import {
  CalendarClock,
  Cpu,
  Factory,
  HeartPulse,
  Landmark,
  LayoutGrid,
  Mail,
  MapPin,
  Phone,
  Ship,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import WorkCard from "@/components/WorkCard";
import ServiceArt from "@/components/ServiceArt";
import FaqList from "@/components/FaqList";
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
} from "@/content/site";


// Icones dos setores atendidos, um para cada setor.
const iconesSetores: Record<string, LucideIcon> = {
  "heart-pulse": HeartPulse,
  landmark: Landmark,
  ship: Ship,
  "shopping-bag": ShoppingBag,
  factory: Factory,
  cpu: Cpu,
};

// Icones dos numeros da secao Sobre, como nos cards de "Quem somos" da proposta comercial.
const iconesNumeros: Record<string, LucideIcon> = {
  "calendar-clock": CalendarClock,
  "map-pin": MapPin,
  "layout-grid": LayoutGrid,
};

// Nas paginas proprias (/servicos, /sobre, /projetos, /contato) o titulo vira H1 no PageHero,
// e a secao e renderizada com cabecalho={false} para nao repetir o titulo.
type SecaoProps = { cabecalho?: boolean };

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

export const servicosCabecalho = {
  titulo: "Do primeiro esboço ao produto em evolução",
  apoio: "Atuamos onde o seu negócio precisa de clareza: no site, no produto, no código ou no time.",
};

export function Servicos({ cabecalho = true }: SecaoProps) {
  return (
    <section className={cabecalho ? "section" : "section section-page"} id="servicos" aria-labelledby={cabecalho ? "servicos-title" : undefined} aria-label={cabecalho ? undefined : "Lista de serviços"}>
      <div className="container">
        {cabecalho && <SectionHead tag="Serviços" id="servicos-title" titulo={servicosCabecalho.titulo} apoio={servicosCabecalho.apoio} />}
        <RevealGroup as="ul" className="services-list">
          {servicos.map((s) => {
            return (
              <RevealItem as="li" key={s.id}>
                <article className="service">
                  <ServiceArt tipo={s.icone} />
                  <div>
                    <h3>{s.titulo}</h3>
                    <p>{s.texto}</p>
                  </div>
                  <div className="service-apps-wrap">
                    <p className="service-apps-label label">Aplicações</p>
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

export function Projetos({ cabecalho = true }: SecaoProps) {
  return (
    <section className={cabecalho ? "section" : "section section-page"} id="projetos" aria-labelledby={cabecalho ? "projetos-title" : undefined} aria-label={cabecalho ? undefined : "Lista de projetos"}>
      <div className="container">
        {cabecalho && <SectionHead tag="Projetos 2024 a 2026" id="projetos-title" titulo="Trabalhos selecionados" />}
        <RevealGroup as="ul" className="works-grid">
          {projetos.map((p) => (
            <RevealItem as="li" key={p.slug}>
              <WorkCard projeto={p} />
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

export function Sobre({ cabecalho = true }: SecaoProps) {
  return (
    <section className={cabecalho ? "section" : "section section-page"} id="sobre" aria-labelledby={cabecalho ? "sobre-title" : undefined} aria-label={cabecalho ? undefined : "Números e setores"}>
      <div className="container about-grid">
        <div>
          {cabecalho && <SectionHead tag="Sobre" id="sobre-title" titulo={sobre.titulo} apoio={sobre.texto} />}
          <RevealGroup className="stats">
            {sobre.numeros.map((n) => {
              const Icone = iconesNumeros[n.icone];
              return (
                <RevealItem key={n.rotulo} className="stat card-raised">
                  {Icone && <Icone className="stat-icon" size={32} strokeWidth={1.75} aria-hidden="true" />}
                  <p className="stat-value">{n.valor}</p>
                  <p className="stat-label">{n.rotulo}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
        <div>
          <p className="sectors-label label">Setores que atendemos</p>
          <RevealGroup as="ul" className="sectors">
            {sobre.setores.map((s) => {
              const Icone = iconesSetores[s.icone];
              return (
                <RevealItem as="li" key={s.nome}>
                  {Icone && <Icone className="sector-icon" size={24} strokeWidth={1.75} aria-hidden="true" />}
                  <span>{s.nome}</span>
                </RevealItem>
              );
            })}
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
        <FaqList itens={faq.itens} />
      </div>
    </section>
  );
}

export function Contato({ cabecalho = true }: SecaoProps) {
  return (
    <section className={cabecalho ? "section" : "section section-page"} id="contato" aria-labelledby={cabecalho ? "contato-title" : undefined} aria-label={cabecalho ? undefined : "Canais de contato"}>
      <div className="container">
        {cabecalho && (
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
        )}

        <RevealGroup className="contact-grid">
          <RevealItem className="contact-item card-raised">
            <WhatsAppIcon className="contact-icon" size={30} />
            <p className="contact-label">WhatsApp</p>
            <a className="btn btn-primary" href={contato.whatsapp} target="_blank" rel="noreferrer" style={{ width: "fit-content" }}>
              <WhatsAppIcon size={18} />
              Falar com João Cláudio
            </a>
          </RevealItem>
          <RevealItem className="contact-item">
            <Mail className="contact-icon" size={32} strokeWidth={1.75} aria-hidden="true" />
            <p className="contact-label">E-mail</p>
            <a className="contact-value" href={`mailto:${contato.email}`}>
              {contato.email}
            </a>
            <CopyEmail email={contato.email} />
          </RevealItem>
          <RevealItem className="contact-item">
            <Phone className="contact-icon" size={32} strokeWidth={1.75} aria-hidden="true" />
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
