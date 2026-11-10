"use client";

import { useEffect, useRef, useState } from "react";
import HeroArtSvg from "@/components/HeroArtSvg";

// Ilustracao 3D do hero: o simbolo da Konelabs com os elementos em orbita (ver heroScene.ts).
// O three.js so e carregado no navegador, depois que o hero monta, para nao pesar o primeiro carregamento.
// Sem WebGL, cai para a versao em SVG.
export default function HeroArt() {
  const host = useRef<HTMLDivElement>(null);
  const [semWebgl, setSemWebgl] = useState(false);

  useEffect(() => {
    let ativo = true;
    let destruir: (() => void) | undefined;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    import("@/components/heroScene")
      .then(({ criarCena }) => {
        if (!ativo || !host.current) return;
        destruir = criarCena(host.current, { reduzir }).destruir;
        host.current.dataset.pronto = "true";
      })
      .catch(() => ativo && setSemWebgl(true));
    return () => {
      ativo = false;
      destruir?.();
    };
  }, []);

  if (semWebgl) return <HeroArtSvg />;

  return (
    <div
      ref={host}
      className="hero-scene"
      role="img"
      aria-label="Símbolo da Konelabs em 3D, com janela de site, bloco de código, gráfico, celular, camadas de produto e um chip de IA em órbita ao redor"
    />
  );
}
