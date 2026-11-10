"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { springUi } from "@/lib/motion";
import { nav } from "@/content/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Nas paginas de projeto, "Projetos" fica marcado como a localizacao atual.
  const isCurrent = (href: string) => href === "/#projetos" && pathname.startsWith("/projetos");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="header-logo" aria-label="Konelabs, página inicial">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-konelabs.svg" alt="Konelabs" width={120} height={28} />
        </Link>

        <nav className="header-nav" aria-label="Principal">
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} aria-current={isCurrent(n.href) ? "page" : undefined}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a className="btn" href="/#contato">
            Vamos conversar
            <ArrowRight className="btn-icon icon-right" size={18} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* O menu mobile entra e sai com opacidade e um leve deslocamento vertical. */}
      <AnimatePresence>
        {open && (
          <m.nav
            id="menu-mobile"
            className="mobile-nav container"
            aria-label="Menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={springUi}
          >
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} onClick={() => setOpen(false)}>
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/#contato" onClick={() => setOpen(false)}>
                  Vamos conversar
                </a>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
