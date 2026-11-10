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
  // A pagina atual (e as paginas de projeto, dentro de /projetos) fica marcada no menu.
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
                <Link href={n.href} aria-current={isCurrent(n.href) ? "page" : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <Link className="btn" href="/contato" aria-current={isCurrent("/contato") ? "page" : undefined}>
            Vamos conversar
            <ArrowRight className="btn-icon icon-right" size={18} aria-hidden="true" />
          </Link>
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
                  <Link href={n.href} aria-current={isCurrent(n.href) ? "page" : undefined} onClick={() => setOpen(false)}>
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contato" aria-current={isCurrent("/contato") ? "page" : undefined} onClick={() => setOpen(false)}>
                  Vamos conversar
                </Link>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
