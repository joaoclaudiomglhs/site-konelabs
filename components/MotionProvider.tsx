"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

// LazyMotion carrega so os recursos de animacao usados no site (entrada, hover, foco, presenca),
// reduzindo o JavaScript enviado. Com "strict", qualquer uso de <motion.*> no lugar de <m.*> gera erro.
// MotionConfig respeita prefers-reduced-motion: movimentos de transform sao desligados, opacidade continua.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
