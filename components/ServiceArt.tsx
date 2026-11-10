import type { ReactNode } from "react";
import type { Servico } from "@/content/site";

// Ilustracoes isometricas (3D) dos servicos, desenhadas em SVG puro, sem dependencia.
// Paleta fechada do sistema (cinzas da marca) e verde #02FF55 so em um ou dois detalhes por cena.
// Movimento so com transform e opacity (classes .art-*), desligado com prefers-reduced-motion.

const K = 0.866;
const OX = 80;
const OY = 52;

// Projecao isometrica: x e y no chao, z para cima.
const P = (x: number, y: number, z: number): [number, number] => [OX + (x - y) * K, OY + (x + y) * 0.5 - z];
const pts = (...p: [number, number][]) => p.map(([a, b]) => `${a.toFixed(2)},${b.toFixed(2)}`).join(" ");

type Tom = { top: string; left: string; right: string };

const TONS = {
  chao: { top: "#1b1b1b", left: "#151515", right: "#111111" },
  base: { top: "#2b2b2b", left: "#212121", right: "#1b1b1b" },
  medio: { top: "#3a3a3a", left: "#2b2b2b", right: "#212121" },
  claro: { top: "#6b6b6b", left: "#4a4a4a", right: "#3a3a3a" },
  papel: { top: "#ededed", left: "#c9c9c9", right: "#a3a3a3" },
  verde: { top: "#02ff55", left: "#02c444", right: "#029a36" },
} satisfies Record<string, Tom>;

// Caixa com as tres faces visiveis: topo, face frontal esquerda (y maximo) e face frontal direita (x maximo).
function Caixa({ x, y, z, w, d, h, tom }: { x: number; y: number; z: number; w: number; d: number; h: number; tom: Tom }) {
  const t = z + h;
  return (
    <g>
      <polygon points={pts(P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, t), P(x, y + d, t))} fill={tom.left} />
      <polygon points={pts(P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, t), P(x + w, y, t))} fill={tom.right} />
      <polygon points={pts(P(x, y, t), P(x + w, y, t), P(x + w, y + d, t), P(x, y + d, t))} fill={tom.top} />
    </g>
  );
}

// Conteudo desenhado sobre um plano. Coordenadas locais (u, v), com v para cima.
// Face frontal esquerda: plano y = y0, u ao longo de x.
function FaceEsquerda({ y0, children }: { y0: number; children: ReactNode }) {
  const [e, f] = P(0, y0, 0);
  return <g transform={`matrix(${K} 0.5 0 -1 ${e.toFixed(2)} ${f.toFixed(2)})`}>{children}</g>;
}

// Topo: plano z = z0, u ao longo de x e w ao longo de y.
function Topo({ z0, children }: { z0: number; children: ReactNode }) {
  const [e, f] = P(0, 0, z0);
  return <g transform={`matrix(${K} 0.5 ${-K} 0.5 ${e.toFixed(2)} ${f.toFixed(2)})`}>{children}</g>;
}

// Linha de chao comum a todas as cenas.
function Chao() {
  return <ellipse cx={OX} cy={OY + 66} rx={66} ry={14} fill="#161616" />;
}

// Web design e desenvolvimento: janela de navegador sobre a base e um celular que flutua a frente.
function Web() {
  return (
    <>
      <Chao />
      <Caixa x={0} y={0} z={0} w={64} d={64} h={5} tom={TONS.base} />
      <Caixa x={6} y={30} z={5} w={46} d={4} h={40} tom={TONS.medio} />
      <FaceEsquerda y0={34}>
        <rect x={6} y={39} width={46} height={6} fill="#3a3a3a" />
        <circle cx={10} cy={42} r={1.2} fill="#6b6b6b" />
        <circle cx={14} cy={42} r={1.2} fill="#6b6b6b" />
        <circle cx={18} cy={42} r={1.2} fill="#6b6b6b" />
        <rect x={11} y={30} width={26} height={3} rx={1.5} fill="#6b6b6b" />
        <rect x={11} y={24} width={34} height={2} rx={1} fill="#4a4a4a" />
        <rect x={11} y={20} width={30} height={2} rx={1} fill="#4a4a4a" />
        <rect className="art-pulse" x={11} y={11} width={14} height={5} rx={2.5} fill="#02ff55" />
      </FaceEsquerda>
      <g className="art-bob art-delay-1">
        <Caixa x={44} y={44} z={10} w={14} d={3} h={26} tom={TONS.papel} />
        <FaceEsquerda y0={47}>
          <rect x={46} y={30} width={10} height={2} rx={1} fill="#6b6b6b" />
          <rect x={46} y={26} width={7} height={2} rx={1} fill="#a3a3a3" />
          <rect x={46} y={14} width={10} height={8} rx={1.5} fill="#c9c9c9" />
        </FaceEsquerda>
      </g>
    </>
  );
}

// Estrategia e estrutura de produto: blocos organizados em degraus e um marcador verde no ponto mais alto.
function Estrategia() {
  return (
    <>
      <Chao />
      <Caixa x={0} y={0} z={0} w={64} d={64} h={5} tom={TONS.base} />
      {/* Caminho tracejado no chao, atras dos blocos */}
      <Topo z0={5.2}>
        <path d="M14 30 L32 30 L32 14 L50 14" fill="none" stroke="#6b6b6b" strokeWidth={1.4} strokeDasharray="2.5 3.5" className="art-flow" />
      </Topo>
      <g className="art-bob art-delay-2">
        <Caixa x={6} y={38} z={5} w={16} d={16} h={10} tom={TONS.medio} />
      </g>
      <g className="art-bob art-delay-1">
        <Caixa x={24} y={22} z={5} w={16} d={16} h={20} tom={TONS.claro} />
      </g>
      <g className="art-bob">
        <Caixa x={42} y={6} z={5} w={16} d={16} h={32} tom={TONS.papel} />
        <g className="art-pulse">
          <Caixa x={48} y={12} z={37} w={4} d={4} h={10} tom={TONS.verde} />
        </g>
      </g>
    </>
  );
}

// Criacao e evolucao de produtos digitais: camadas de interface empilhadas que respiram.
function Produtos() {
  return (
    <>
      <Chao />
      <Caixa x={4} y={4} z={0} w={56} d={56} h={4} tom={TONS.base} />
      <g className="art-bob art-delay-2">
        <Caixa x={8} y={8} z={14} w={48} d={48} h={3} tom={TONS.medio} />
      </g>
      <g className="art-bob art-delay-1">
        <Caixa x={12} y={12} z={28} w={40} d={40} h={3} tom={TONS.claro} />
      </g>
      <g className="art-bob">
        <Caixa x={16} y={16} z={42} w={32} d={32} h={3} tom={TONS.papel} />
        <Topo z0={45}>
          <rect x={20} y={20} width={11} height={11} rx={1.5} fill="#c9c9c9" />
          <rect x={33} y={20} width={11} height={11} rx={1.5} fill="#c9c9c9" />
          <rect x={20} y={33} width={24} height={3} rx={1.5} fill="#a3a3a3" />
          <rect x={20} y={39} width={16} height={3} rx={1.5} fill="#a3a3a3" />
          <circle className="art-pulse" cx={40} cy={40.5} r={2.6} fill="#02ff55" />
        </Topo>
      </g>
    </>
  );
}

// Desenvolvimento front-end: bloco de codigo com linhas que se ajustam e cursor verde piscando.
function FrontEnd() {
  return (
    <>
      <Chao />
      <Caixa x={0} y={0} z={0} w={64} d={64} h={5} tom={TONS.base} />
      <Caixa x={8} y={26} z={5} w={50} d={10} h={36} tom={TONS.medio} />
      <FaceEsquerda y0={36}>
        <path d="M16 31 L12 27 L16 23" fill="none" stroke="#02ff55" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 33 L19 21" fill="none" stroke="#6b6b6b" strokeWidth={1.8} strokeLinecap="round" />
        <path d="M25 31 L29 27 L25 23" fill="none" stroke="#02ff55" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        <g className="art-slide">
          <rect x={33} y={30} width={18} height={2} rx={1} fill="#6b6b6b" />
        </g>
        <g className="art-slide art-delay-1">
          <rect x={33} y={25} width={12} height={2} rx={1} fill="#4a4a4a" />
        </g>
        <rect x={12} y={15} width={30} height={2} rx={1} fill="#4a4a4a" />
        <rect x={12} y={10} width={20} height={2} rx={1} fill="#4a4a4a" />
        <rect className="art-blink" x={34} y={9} width={1.6} height={5} fill="#02ff55" />
      </FaceEsquerda>
      <g className="art-bob art-delay-1">
        <Caixa x={46} y={46} z={9} w={10} d={10} h={10} tom={TONS.papel} />
      </g>
    </>
  );
}

// Pessoa simples: corpo em bloco e cabeca em circulo, nos cinzas do sistema.
function Pessoa({ x, y, tom, cabeca }: { x: number; y: number; tom: Tom; cabeca: string }) {
  const [cx, cy] = P(x + 4, y + 4, 26);
  return (
    <g>
      <Caixa x={x} y={y} z={5} w={8} d={8} h={16} tom={tom} />
      <circle cx={cx} cy={cy} r={5} fill={cabeca} />
    </g>
  );
}

// Consultoria e evolucao de times: tres pessoas em volta de uma mesa, com uma ideia verde no centro.
function Times() {
  return (
    <>
      <Chao />
      <Caixa x={0} y={0} z={0} w={64} d={64} h={5} tom={TONS.base} />
      <g className="art-bob art-delay-2">
        <Pessoa x={8} y={8} tom={TONS.medio} cabeca="#6b6b6b" />
      </g>
      <g className="art-bob">
        <Pessoa x={44} y={10} tom={TONS.claro} cabeca="#a3a3a3" />
      </g>
      <Caixa x={22} y={24} z={5} w={20} d={20} h={9} tom={TONS.medio} />
      <g className="art-pulse">
        <Caixa x={30} y={32} z={20} w={4} d={4} h={4} tom={TONS.verde} />
      </g>
      <g className="art-bob art-delay-1">
        <Pessoa x={14} y={48} tom={TONS.papel} cabeca="#ededed" />
      </g>
    </>
  );
}

const CENAS: Record<Servico["icone"], { desenho: () => ReactNode; rotulo: string }> = {
  "monitor-smartphone": { desenho: Web, rotulo: "Janela de navegador e celular em 3D" },
  compass: { desenho: Estrategia, rotulo: "Blocos em degraus com marcador no topo" },
  layers: { desenho: Produtos, rotulo: "Camadas de interface empilhadas" },
  code: { desenho: FrontEnd, rotulo: "Bloco de código com cursor piscando" },
  users: { desenho: Times, rotulo: "Três pessoas em volta de uma mesa" },
};

export default function ServiceArt({ tipo }: { tipo: Servico["icone"] }) {
  const cena = CENAS[tipo];
  const Desenho = cena.desenho;
  return (
    <svg className="service-art" viewBox="0 0 160 140" role="img" aria-label={cena.rotulo}>
      <Desenho />
    </svg>
  );
}
