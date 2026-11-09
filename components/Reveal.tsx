"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

// Entrada escalonada: deslocamento sutil no eixo Y com opacidade, em sequencia.
const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 22, mass: 0.8 },
  },
};

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "section";
};

export function RevealGroup({ children, className, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: Omit<Props, "as"> & { as?: "div" | "li" }) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
