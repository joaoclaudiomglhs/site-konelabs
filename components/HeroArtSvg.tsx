"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useAnimationFrame, useInView, useReducedMotion } from "motion/react";
import { Caixa, FaceEsquerda, P, TONS, Topo } from "@/components/ServiceArt";

// Ilustracao 3D do hero: o simbolo da Konelabs (o cone) em 3D, girando devagar,
// com os elementos do que a Konelabs faz flutuando em orbita ao redor dele.
// Linhas pontilhadas animadas marcam as orbitas, com pontos verdes que as percorrem, como na proposta comercial.
// Interacao: a cena inclina levemente seguindo o ponteiro (paralaxe por profundidade).
// Fora da tela a animacao pausa; com prefers-reduced-motion a cena fica parada e continua legivel.

const VOLTA_CONE = 24; // segundos por volta do simbolo
const VOLTA_ORBITA = 60; // segundos por volta dos elementos

// Simbolo: mesma geometria do icone da marca (Logo Konelabs/Konelabs icon 200.svg), em 3D.
// No icone: apice em y 47.8, laterais retas ate y 126.3 (raio 36.2) e base arredondada,
// uma elipse de raio 37.2 por 20.4 centrada em y 131.2. Aqui tudo em escala 2.2, origem no centro da base.
const ESCALA = 2.2;
const APICE = (47.8 - 131.2) * ESCALA;
const Y_ANEL = (126.35 - 131.2) * ESCALA;
const R_ANEL = 36.2 * ESCALA;
const BASE_RX = 37.2 * ESCALA;
const BASE_RY = 20.4 * ESCALA;
const INCLINACAO = 0.08; // camera quase no nivel, como no desenho da logo
const FATIAS = 40;
const FAIXAS = 8;

// Cores exatas da logo: o corpo vai de #0FDF5C (lado iluminado) a #21AF56 (lado na sombra)
// e a base vai de #00FF5F a #0DD357, como as duas metades do icone.
const CORPO = { luz: [0x0f, 0xdf, 0x5c], sombra: [0x21, 0xaf, 0x56] };
const BASE = { luz: [0x00, 0xff, 0x5f], sombra: [0x0d, 0xd3, 0x57] };
const mistura = (c: { luz: number[]; sombra: number[] }, t: number) => {
  const k = Math.min(1, Math.max(0, t));
  const v = c.sombra.map((s, i) => Math.round(s + (c.luz[i] - s) * k));
  return `rgb(${v[0]},${v[1]},${v[2]})`;
};
// Luz vindo da esquerda, como a divisao clara e escura do icone.
const luzDe = (a: number) => 0.5 - 0.62 * Math.sin(a);

function Cone({ giro }: { giro: number }) {
  const faces: ReactNode[] = [];
  const passo = (Math.PI * 2) / FATIAS;
  const pAnel = (a: number) => `${(R_ANEL * Math.sin(a)).toFixed(2)},${(Y_ANEL + INCLINACAO * R_ANEL * Math.cos(a)).toFixed(2)}`;
  // Ponto da base arredondada (elipsoide achatado) na latitude b e longitude a.
  const pBase = (a: number, b: number) =>
    `${(BASE_RX * Math.cos(b) * Math.sin(a)).toFixed(2)},${(-BASE_RY * Math.sin(b) + INCLINACAO * BASE_RX * Math.cos(b) * Math.cos(a)).toFixed(2)}`;

  // Corpo do cone primeiro; a base arredondada fica por cima, como no icone.
  for (let i = 0; i < FATIAS; i++) {
    const a0 = giro + i * passo;
    const a1 = a0 + passo;
    const meio = a0 + passo / 2;
    if (Math.cos(meio) < -0.05) continue;
    const cor = mistura(CORPO, luzDe(meio));
    faces.push(<polygon key={`c${i}`} points={`0,${APICE.toFixed(2)} ${pAnel(a0)} ${pAnel(a1)}`} fill={cor} stroke={cor} strokeWidth={0.7} />);
  }
  for (let i = 0; i < FATIAS; i++) {
    const a0 = giro + i * passo;
    const a1 = a0 + passo;
    const meio = a0 + passo / 2;
    if (Math.cos(meio) < -0.05) continue;
    for (let k = 0; k < FAIXAS; k++) {
      const b0 = Math.PI / 2 - (k * Math.PI) / FAIXAS;
      const b1 = b0 - Math.PI / FAIXAS;
      // A parte de baixo da base escurece um pouco, para dar volume sem sair da paleta da logo.
      const t = luzDe(meio) - Math.max(0, -(b0 + b1) / 2) * 0.35;
      const cor = mistura(BASE, t);
      faces.push(
        <polygon key={`b${i}-${k}`} points={`${pBase(a0, b0)} ${pBase(a1, b0)} ${pBase(a1, b1)} ${pBase(a0, b1)}`} fill={cor} stroke={cor} strokeWidth={0.7} />,
      );
    }
  }
  return <g>{faces}</g>;
}

// Elementos em orbita, desenhados em isometrico. "centro" e o ponto 3D que fica sobre a orbita.
type Elemento = { id: string; centro: [number, number, number]; desenho: ReactNode };

const ELEMENTOS: Elemento[] = [
  {
    id: "janela",
    centro: [25, 2, 16],
    desenho: (
      <>
        <Caixa x={0} y={0} z={0} w={50} d={4} h={34} tom={TONS.medio} />
        <FaceEsquerda y0={4}>
          <rect x={0} y={28} width={50} height={6} fill="#3a3a3a" />
          <circle cx={4} cy={31} r={1.2} fill="#6b6b6b" />
          <circle cx={8} cy={31} r={1.2} fill="#6b6b6b" />
          <rect x={5} y={20} width={28} height={3.4} rx={1.7} fill="#ededed" />
          <rect x={5} y={14} width={34} height={2} rx={1} fill="#4a4a4a" />
          <rect x={5} y={5} width={14} height={5} rx={2.5} fill="#02ff55" />
        </FaceEsquerda>
      </>
    ),
  },
  {
    id: "codigo",
    centro: [16, 2, 12],
    desenho: (
      <>
        <Caixa x={0} y={0} z={0} w={32} d={3} h={24} tom={TONS.papel} />
        <FaceEsquerda y0={3}>
          <path d="M8 16 L5 13 L8 10" fill="none" stroke="#029a36" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 17 L10 9" fill="none" stroke="#6b6b6b" strokeWidth={1.6} strokeLinecap="round" />
          <path d="M14 16 L17 13 L14 10" fill="none" stroke="#029a36" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          <rect x={5} y={4} width={20} height={2} rx={1} fill="#6b6b6b" />
          <rect className="art-blink" x={21} y={9} width={1.4} height={4} fill="#029a36" />
        </FaceEsquerda>
      </>
    ),
  },
  {
    id: "camadas",
    centro: [11, 11, 14],
    desenho: (
      <>
        <Caixa x={0} y={0} z={0} w={22} d={22} h={2.5} tom={TONS.medio} />
        <Caixa x={2} y={2} z={12} w={18} d={18} h={2.5} tom={TONS.claro} />
        <Caixa x={4} y={4} z={24} w={14} d={14} h={2.5} tom={TONS.papel} />
        <Topo z0={26.5}>
          <rect x={6} y={6} width={5} height={5} rx={1} fill="#c9c9c9" />
          <circle cx={14} cy={14} r={1.6} fill="#02ff55" />
        </Topo>
      </>
    ),
  },
  {
    id: "grafico",
    centro: [11, 5, 12],
    desenho: (
      <>
        <Caixa x={0} y={0} z={0} w={24} d={10} h={2} tom={TONS.base} />
        <Caixa x={1} y={0} z={2} w={6} d={10} h={8} tom={TONS.medio} />
        <Caixa x={9} y={0} z={2} w={6} d={10} h={16} tom={TONS.claro} />
        <Caixa x={17} y={0} z={2} w={6} d={10} h={26} tom={TONS.papel} />
      </>
    ),
  },
  {
    id: "celular",
    centro: [7, 2, 13],
    desenho: (
      <>
        <Caixa x={0} y={0} z={0} w={14} d={3} h={26} tom={TONS.papel} />
        <FaceEsquerda y0={3}>
          <rect x={2} y={18} width={10} height={2} rx={1} fill="#6b6b6b" />
          <rect x={2} y={8} width={10} height={7} rx={1.5} fill="#c9c9c9" />
          <rect x={2} y={4} width={6} height={2} rx={1} fill="#02ff55" />
        </FaceEsquerda>
      </>
    ),
  },
  {
    id: "ia",
    centro: [7, 7, 8],
    desenho: (
      <>
        <Caixa x={0} y={0} z={0} w={14} d={14} h={5} tom={TONS.claro} />
        <Topo z0={5}>
          <rect x={3} y={3} width={8} height={8} rx={1} fill="#4a4a4a" />
        </Topo>
      </>
    ),
  },
];

// Orbitas em tres alturas: acima do apice, na altura do corpo e abaixo da base.
type Orbita = { rx: number; ry: number; cy: number };
const ORBITAS: Orbita[] = [
  { rx: 150, ry: 32, cy: -175 },
  { rx: 215, ry: 52, cy: -60 },
  { rx: 170, ry: 36, cy: 85 },
];
// Cada elemento fica em uma orbita, com um angulo inicial proprio.
const POSICOES = [
  { orbita: 1, inicio: 0 },
  { orbita: 0, inicio: 1.3 },
  { orbita: 2, inicio: 2.2 },
  { orbita: 1, inicio: 3.4 },
  { orbita: 2, inicio: 4.9 },
  { orbita: 0, inicio: 4.4 },
];

const elipse = (o: Orbita, frente: boolean) =>
  // Metade de tras (de cima) ou da frente (de baixo) da elipse, para o simbolo ficar entre elas.
  frente
    ? `M${-o.rx} ${o.cy} A${o.rx} ${o.ry} 0 0 0 ${o.rx} ${o.cy}`
    : `M${-o.rx} ${o.cy} A${o.rx} ${o.ry} 0 0 1 ${o.rx} ${o.cy}`;

function Orbitas({ frente, pontos }: { frente: boolean; pontos: { x: number; y: number; frente: boolean }[] }) {
  return (
    <g>
      {ORBITAS.map((o, i) => (
        <path key={i} d={elipse(o, frente)} fill="none" stroke="#3a3a3a" strokeWidth={1.1} strokeDasharray="2.5 3.5" className={`art-flow art-delay-${i % 3}`} />
      ))}
      {pontos
        .filter((p) => p.frente === frente)
        .map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={2.6} fill="#02ff55" />
        ))}
    </g>
  );
}

export default function HeroArtSvg() {
  const reduzir = useReducedMotion() ?? false;
  const area = useRef<HTMLDivElement>(null);
  const visivel = useInView(area);
  const [t, setT] = useState(0);
  const alvo = useRef({ x: 0, y: 0 });
  const [ponteiro, setPonteiro] = useState({ x: 0, y: 0 });

  useAnimationFrame((_, delta) => {
    if (reduzir || !visivel) return;
    setT((v) => v + delta / 1000);
    // Aproxima o ponteiro suavemente, sem saltos.
    setPonteiro((p) => ({ x: p.x + (alvo.current.x - p.x) * 0.06, y: p.y + (alvo.current.y - p.y) * 0.06 }));
  });

  const mover = (e: PointerEvent<HTMLDivElement>) => {
    if (reduzir || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    alvo.current = { x: ((e.clientX - r.left) / r.width) * 2 - 1, y: ((e.clientY - r.top) / r.height) * 2 - 1 };
  };
  const sair = () => {
    alvo.current = { x: 0, y: 0 };
  };

  const giro = (t / VOLTA_CONE) * Math.PI * 2;
  const orbita = (t / VOLTA_ORBITA) * Math.PI * 2;

  // Posicao de cada elemento na orbita; os da frente ficam maiores e sobre o simbolo.
  const itens = ELEMENTOS.map((el, i) => {
    const pos = POSICOES[i];
    const o = ORBITAS[pos.orbita];
    // A orbita do meio gira no sentido contrario, para os elementos se cruzarem acima e abaixo do simbolo.
    const a = (pos.orbita === 1 ? -orbita : orbita) + pos.inicio;
    const profundidade = Math.sin(a); // 1 na frente, -1 atras
    const escala = 1.35 + 0.55 * ((profundidade + 1) / 2);
    const x = o.rx * Math.cos(a) + ponteiro.x * (6 + 8 * profundidade);
    const y = o.cy + o.ry * profundidade + ponteiro.y * (4 + 5 * profundidade) + Math.sin(t * 0.9 + i * 1.7) * 5;
    const [cx, cy] = P(...el.centro);
    return { el, profundidade, escala, x, y, cx, cy, opacidade: 0.55 + 0.45 * ((profundidade + 1) / 2) };
  });

  // Pontos verdes percorrendo as orbitas, no sentido contrario aos elementos.
  const pontos = [
    { o: ORBITAS[0], a: orbita * 3 + 1 },
    { o: ORBITAS[1], a: -orbita * 2.2 },
    { o: ORBITAS[1], a: -orbita * 2.2 + Math.PI },
    { o: ORBITAS[2], a: orbita * 2.6 + 2 },
  ].map(({ o, a }) => ({ x: o.rx * Math.cos(a), y: o.cy + o.ry * Math.sin(a), frente: Math.sin(a) > 0 }));

  const desenhar = (frente: boolean) =>
    itens
      .filter((i) => (i.profundidade > 0) === frente)
      .sort((a, b) => a.profundidade - b.profundidade)
      .map((i) => (
        <g key={i.el.id} opacity={i.opacidade} transform={`translate(${i.x.toFixed(2)} ${i.y.toFixed(2)}) scale(${i.escala.toFixed(3)}) translate(${-i.cx} ${-i.cy})`}>
          {i.el.desenho}
        </g>
      ));

  const coneX = ponteiro.x * 4;
  const coneY = ponteiro.y * 3;

  return (
    <div ref={area} className="hero-art" onPointerMove={mover} onPointerLeave={sair}>
      <svg
        viewBox="-270 -250 540 400"
        role="img"
        aria-label="Símbolo da Konelabs em 3D girando devagar, com janela de site, bloco de código, camadas de produto, gráfico, celular e chip de IA em órbita ao redor"
      >
        <defs>
          <radialGradient id="hero-brilho">
            <stop offset="0%" stopColor="#02ff55" stopOpacity={0.14} />
            <stop offset="100%" stopColor="#02ff55" stopOpacity={0} />
          </radialGradient>
        </defs>
        <ellipse cx={0} cy={-60} rx={170} ry={170} fill="url(#hero-brilho)" />
        <ellipse cx={coneX} cy={64} rx={80} ry={10} fill="#0a0a0a" opacity={0.7} />

        <Orbitas frente={false} pontos={pontos} />
        {desenhar(false)}

        <g transform={`translate(${coneX.toFixed(2)} ${(coneY + Math.sin(t * 0.8) * 3).toFixed(2)})`}>
          <Cone giro={giro} />
        </g>

        <Orbitas frente pontos={pontos} />
        {desenhar(true)}
      </svg>
    </div>
  );
}
