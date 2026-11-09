"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { springReveal, staggerStep } from "@/lib/motion";

// Entrada escalonada: deslocamento sutil no eixo Y com opacidade, em sequencia.
const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: staggerStep, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: springReveal },
};

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "section";
};

const groupTags = { div: m.div, ul: m.ul, section: m.section };
const itemTags = { div: m.div, li: m.li };

export function RevealGroup({ children, className, as = "div" }: Props) {
  const Tag = groupTags[as];
  return (
    <Tag
      className={className}
      variants={group}
      initial="hidden"
      whileInView="show"
      // Anima uma unica vez, quando 15% do grupo entra na tela.
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: Omit<Props, "as"> & { as?: "div" | "li" }) {
  const Tag = itemTags[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
