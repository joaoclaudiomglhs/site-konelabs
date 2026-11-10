"use client";

import Link from "next/link";
import { m, useReducedMotion, type Variants } from "motion/react";
import Cover from "@/components/Cover";
import { springHover } from "@/lib/motion";
import type { Projeto } from "@/content/site";

const MotionLink = m.create(Link);

// Zoom suave so na imagem, dentro da moldura da capa. O card em si nao muda de tamanho.
const coverZoom: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: springHover },
};

export default function WorkCard({ projeto: p }: { projeto: Projeto }) {
  // Com prefers-reduced-motion, o MotionConfig aplicaria o zoom de uma vez, sem animar.
  // Aqui o zoom e removido por completo nesse caso.
  const reduce = useReducedMotion();
  return (
    <MotionLink
      href={`/projetos/${p.slug}`}
      className="work-card"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
    >
      <Cover src={p.capa} alt={`Capa do projeto ${p.nome}`} label={p.nome} variants={reduce ? undefined : coverZoom} />
      <div className="work-info">
        <h3>{p.nome}</h3>
        <p className="work-meta">
          {p.categoria} · {p.ano}
        </p>
      </div>
    </MotionLink>
  );
}
