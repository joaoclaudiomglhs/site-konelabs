"use client";

import type { PointerEvent } from "react";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { Caixa, FaceEsquerda, P, TONS, Topo } from "@/components/ServiceArt";

// Ilustracao 3D interativa do hero: o que a Konelabs faz em uma cena so.
// Estrategia (grafico em degraus), design (janela de site), produto (camadas) e tecnologia (bloco de codigo).
// Interacao: as pecas seguem o ponteiro em profundidades diferentes (paralaxe) e as camadas se afastam no hover.
// Sem ponteiro, ou com prefers-reduced-motion, a cena fica parada e continua legivel.

const mola = { stiffness: 90, damping: 18, mass: 0.6 };

function useCamada(mx: MotionValue<number>, my: MotionValue<number>, profundidade: number) {
  const x = useTransform(mx, (v) => v * profundidade * 7);
  const y = useTransform(my, (v) => v * profundidade * 5);
  return { x, y };
}

export default function HeroArt() {
  const reduzir = useReducedMotion();
  const alvoX = useMotionValue(0);
  const alvoY = useMotionValue(0);
  const alvoAbre = useMotionValue(0);
  const mx = useSpring(alvoX, mola);
  const my = useSpring(alvoY, mola);
  const abre = useSpring(alvoAbre, mola);

  const fundo = useCamada(mx, my, 0.4);
  const janela = useCamada(mx, my, 0.7);
  const degraus = useCamada(mx, my, 1);
  const codigo = useCamada(mx, my, 1.5);

  // As tres camadas de produto sobem em alturas diferentes quando o ponteiro esta sobre a cena.
  const camada1 = useTransform(abre, (v) => -v * 4);
  const camada2 = useTransform(abre, (v) => -v * 9);
  const camada3 = useTransform(abre, (v) => -v * 14);

  const mover = (e: PointerEvent<HTMLDivElement>) => {
    if (reduzir || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    alvoX.set(((e.clientX - r.left) / r.width) * 2 - 1);
    alvoY.set(((e.clientY - r.top) / r.height) * 2 - 1);
    alvoAbre.set(1);
  };
  const sair = () => {
    alvoX.set(0);
    alvoY.set(0);
    alvoAbre.set(0);
  };

  const [gx, gy] = P(21.5, 69, 40);

  return (
    <div className="hero-art" onPointerMove={mover} onPointerLeave={sair}>
      <svg
        viewBox="-10 4 180 148"
        role="img"
        aria-label="Ilustração 3D: janela de site, camadas de produto, bloco de código e gráfico em degraus sobre uma base"
      >
        <ellipse cx={80} cy={136} rx={84} ry={12} fill="#141414" />

        <m.g style={fundo}>
          <Caixa x={0} y={0} z={0} w={80} d={80} h={6} tom={TONS.base} />
          <Topo z0={6.2}>
            <path d="M8 8 H72 M8 24 H72 M8 40 H72 M8 56 H72 M8 72 H72 M8 8 V72 M24 8 V72 M40 8 V72 M56 8 V72 M72 8 V72" stroke="#333" strokeWidth={0.5} fill="none" />
          </Topo>
        </m.g>

        {/* Produto: camadas de interface empilhadas no fundo, a direita */}
        <m.g style={fundo}>
          <g className="art-bob art-delay-2">
            <m.g style={{ y: camada1 }}>
              <Caixa x={54} y={4} z={12} w={22} d={22} h={2.5} tom={TONS.medio} />
            </m.g>
            <m.g style={{ y: camada2 }}>
              <Caixa x={56} y={6} z={24} w={18} d={18} h={2.5} tom={TONS.claro} />
            </m.g>
            <m.g style={{ y: camada3 }}>
              <Caixa x={58} y={8} z={36} w={14} d={14} h={2.5} tom={TONS.papel} />
              <Topo z0={38.5}>
                <rect x={60} y={10} width={5} height={5} rx={1} fill="#c9c9c9" />
                <rect x={66} y={10} width={4} height={5} rx={1} fill="#c9c9c9" />
                <circle cx={68} cy={18.5} r={1.6} fill="#02ff55" className="art-pulse" />
              </Topo>
            </m.g>
          </g>
        </m.g>

        {/* Design: janela de site */}
        <m.g style={janela}>
          <Caixa x={8} y={32} z={6} w={50} d={4} h={50} tom={TONS.medio} />
          <FaceEsquerda y0={36}>
            <rect x={8} y={49} width={50} height={7} fill="#3a3a3a" />
            <circle cx={12} cy={52.5} r={1.3} fill="#6b6b6b" />
            <circle cx={16} cy={52.5} r={1.3} fill="#6b6b6b" />
            <circle cx={20} cy={52.5} r={1.3} fill="#6b6b6b" />
            <rect x={13} y={40} width={30} height={3.4} rx={1.7} fill="#ededed" />
            <rect x={13} y={35} width={22} height={3.4} rx={1.7} fill="#a3a3a3" />
            <rect x={13} y={29} width={34} height={2} rx={1} fill="#4a4a4a" />
            <rect x={13} y={25} width={28} height={2} rx={1} fill="#4a4a4a" />
            <rect className="art-pulse" x={13} y={16} width={15} height={5.5} rx={2.75} fill="#02ff55" />
            <rect x={31} y={16} width={12} height={5.5} rx={2.75} fill="none" stroke="#6b6b6b" strokeWidth={0.8} />
          </FaceEsquerda>
        </m.g>

        {/* Estrategia: grafico em degraus que cresce, com marcador verde no topo */}
        <m.g style={degraus}>
          <Caixa x={2} y={64} z={6} w={7} d={10} h={10} tom={TONS.medio} />
          <Caixa x={10} y={64} z={6} w={7} d={10} h={18} tom={TONS.claro} />
          <Caixa x={18} y={64} z={6} w={7} d={10} h={28} tom={TONS.papel} />
          <g className="art-bob">
            <circle cx={gx} cy={gy} r={3.4} fill="#02ff55" className="art-pulse" />
          </g>
        </m.g>

        {/* Tecnologia: bloco de codigo flutuando a frente */}
        <m.g style={codigo}>
          <g className="art-bob art-delay-1">
            <Caixa x={46} y={52} z={16} w={28} d={3} h={24} tom={TONS.papel} />
            <FaceEsquerda y0={55}>
              <path d="M53 34 L50 31 L53 28" fill="none" stroke="#029a36" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M57 35 L55 27" fill="none" stroke="#6b6b6b" strokeWidth={1.6} strokeLinecap="round" />
              <path d="M59 34 L62 31 L59 28" fill="none" stroke="#029a36" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
              <g className="art-slide">
                <rect x={50} y={22} width={18} height={2} rx={1} fill="#6b6b6b" />
              </g>
              <g className="art-slide art-delay-1">
                <rect x={50} y={18} width={12} height={2} rx={1} fill="#a3a3a3" />
              </g>
              <rect className="art-blink" x={64} y={17} width={1.4} height={4} fill="#029a36" />
            </FaceEsquerda>
          </g>
        </m.g>
      </svg>
    </div>
  );
}
