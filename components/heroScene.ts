// Cena 3D do hero, em three.js puro. Carregada sob demanda pelo componente HeroArt, so no navegador.
//
// O simbolo da Konelabs e uma superficie de revolucao gerada a partir do contorno exato do icone
// (Logo Konelabs/Konelabs icon 200.svg): visto de frente, a silhueta e a mesma da logo.
// Ao redor, os elementos do que a Konelabs faz orbitam em tres alturas, com linhas pontilhadas
// e pontos de luz que percorrem as orbitas.
//
// Boas praticas aplicadas: pixel ratio limitado a 2, loop pausado fora da tela e com a aba oculta,
// tempo baseado em delta (mesma velocidade em qualquer tela), amortecimento exponencial nas interacoes,
// entrada escalonada com easing e descarte de todos os recursos ao desmontar.

import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type Cena = { destruir: () => void };

const COR = {
  fundo: 0x0f0f0f,
  g1: 0x1b1b1b,
  g2: 0x2b2b2b,
  g3: 0x3a3a3a,
  g4: 0x6b6b6b,
  papel: 0xededed,
  verde: 0x02ff55,
  // Cores do icone da logo
  corpo: 0x0fdf5c,
  base: 0x00ff5f,
};

// ---------- Contorno do icone ----------
// Metade direita do contorno, em unidades do SVG do icone (x a partir do eixo, y para baixo).
function contornoDoIcone(): THREE.Vector2[] {
  const pts: THREE.Vector2[] = [];
  const bezier = (p0: number[], p1: number[], p2: number[], p3: number[], n: number, pular = true) => {
    for (let i = pular ? 1 : 0; i <= n; i++) {
      const t = i / n;
      const u = 1 - t;
      const x = u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0];
      const y = u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1];
      pts.push(new THREE.Vector2(x, y));
    }
  };
  // Ponta arredondada: (100.067, 47.839) ate (103.174, 49.878)
  pts.push(new THREE.Vector2(0, 47.839));
  bezier([0, 47.839], [1.362, 47.839], [2.582, 48.666], [3.107, 49.878], 8);
  // Lateral reta ate o inicio da base
  pts.push(new THREE.Vector2(36.197, 126.348));
  // Base arredondada: dois trechos de curva do contorno original
  bezier([36.197, 126.348], [36.866, 127.887], [37.242, 129.565], [37.242, 131.287], 10);
  bezier([37.242, 131.287], [37.242, 145.843], [14.597, 151.585], [0, 151.585], 28);
  // Converte para y para cima, com a origem no centro da base arredondada (y 131.2 no icone).
  return pts.map((p) => new THREE.Vector2(Math.max(p.x, 0.0001), 131.2 - p.y));
}

// ---------- Texturas desenhadas em canvas ----------
function textura(w: number, h: number, desenhar: (c: CanvasRenderingContext2D, w: number, h: number) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  desenhar(ctx, w, h);
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

const hex = (n: number) => "#" + n.toString(16).padStart(6, "0");
function retangulo(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, cor: number | string) {
  c.fillStyle = typeof cor === "number" ? hex(cor) : cor;
  c.beginPath();
  c.roundRect(x, y, w, h, r);
  c.fill();
}

// Icones da Lucide (mesmos desenhos do site), em grade de 24 unidades, tracados no canvas.
type NoIcone = ["path", string] | ["circle", number, number, number] | ["rect", number, number, number, number, number];
const ICONES: Record<"pessoas" | "robos" | "metricas" | "web", NoIcone[]> = {
  // users
  pessoas: [
    ["path", "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"],
    ["path", "M16 3.128a4 4 0 0 1 0 7.744"],
    ["path", "M22 21v-2a4 4 0 0 0-3-3.87"],
    ["circle", 9, 7, 4],
  ],
  // bot
  robos: [
    ["path", "M12 8V4H8"],
    ["rect", 4, 8, 16, 12, 2],
    ["path", "M2 14h2"],
    ["path", "M20 14h2"],
    ["path", "M15 13v2"],
    ["path", "M9 13v2"],
  ],
  // chart-column
  metricas: [
    ["path", "M3 3v16a2 2 0 0 0 2 2h16"],
    ["path", "M18 17V9"],
    ["path", "M13 17V5"],
    ["path", "M8 17v-3"],
  ],
  // globe
  web: [
    ["circle", 12, 12, 10],
    ["path", "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"],
    ["path", "M2 12h20"],
  ],
};

function faceIcone(icone: NoIcone[], fundo: number, traco: number) {
  return (c: CanvasRenderingContext2D, w: number, h: number) => {
    retangulo(c, 0, 0, w, h, w * 0.16, fundo);
    const lado = w * 0.56;
    c.save();
    c.translate((w - lado) / 2, (h - lado) / 2);
    c.scale(lado / 24, lado / 24);
    c.strokeStyle = hex(traco);
    c.lineWidth = 2;
    c.lineCap = "round";
    c.lineJoin = "round";
    icone.forEach((no) => {
      if (no[0] === "path") c.stroke(new Path2D(no[1]));
      else if (no[0] === "circle") {
        c.beginPath();
        c.arc(no[1], no[2], no[3], 0, Math.PI * 2);
        c.stroke();
      } else {
        c.beginPath();
        c.roundRect(no[1], no[2], no[3], no[4], no[5]);
        c.stroke();
      }
    });
    c.restore();
  };
}

const FACES = {
  pessoas: faceIcone(ICONES.pessoas, COR.papel, COR.g1),
  robos: faceIcone(ICONES.robos, COR.g3, COR.verde),
  metricas: faceIcone(ICONES.metricas, COR.g2, COR.verde),
  web: faceIcone(ICONES.web, COR.papel, COR.g1),
  janela: (c: CanvasRenderingContext2D, w: number, h: number) => {
    retangulo(c, 0, 0, w, h, 36, COR.g2);
    retangulo(c, 0, 0, w, 70, 0, COR.g3);
    c.clearRect(0, 0, 1, 1);
    [0, 1, 2].forEach((i) => retangulo(c, 32 + i * 30, 26, 18, 18, 9, COR.g4));
    retangulo(c, 48, 120, w * 0.62, 34, 17, COR.papel);
    retangulo(c, 48, 172, w * 0.44, 34, 17, 0xa3a3a3);
    retangulo(c, 48, 236, w * 0.7, 16, 8, 0x4a4a4a);
    retangulo(c, 48, 266, w * 0.56, 16, 8, 0x4a4a4a);
    retangulo(c, 48, 318, 170, 52, 26, COR.verde);
    c.strokeStyle = hex(COR.g4);
    c.lineWidth = 4;
    c.beginPath();
    c.roundRect(236, 320, 140, 48, 24);
    c.stroke();
  },
  codigo: (c: CanvasRenderingContext2D, w: number, h: number) => {
    retangulo(c, 0, 0, w, h, 36, COR.papel);
    c.lineCap = "round";
    c.lineJoin = "round";
    c.lineWidth = 16;
    c.strokeStyle = "#029a36";
    c.beginPath();
    c.moveTo(110, 70); c.lineTo(66, 114); c.lineTo(110, 158);
    c.moveTo(200, 70); c.lineTo(244, 114); c.lineTo(200, 158);
    c.stroke();
    c.strokeStyle = hex(COR.g4);
    c.beginPath(); c.moveTo(170, 60); c.lineTo(140, 168); c.stroke();
    retangulo(c, 66, 206, w * 0.58, 18, 9, COR.g4);
    retangulo(c, 66, 242, w * 0.36, 18, 9, 0xa3a3a3);
    retangulo(c, 66 + w * 0.36 + 16, 236, 8, 30, 4, "#029a36");
  },
  celular: (c: CanvasRenderingContext2D, w: number, h: number) => {
    retangulo(c, 0, 0, w, h, 44, COR.papel);
    retangulo(c, w / 2 - 34, 22, 68, 14, 7, 0xc9c9c9);
    retangulo(c, 28, 70, w - 56, 150, 18, 0xc9c9c9);
    retangulo(c, 28, 246, w - 90, 18, 9, COR.g4);
    retangulo(c, 28, 280, w - 130, 18, 9, 0xa3a3a3);
    retangulo(c, 28, h - 92, w - 56, 48, 24, COR.verde);
  },
  grafico: (c: CanvasRenderingContext2D, w: number, h: number) => {
    retangulo(c, 0, 0, w, h, 36, COR.g2);
    const alturas = [0.28, 0.46, 0.62, 0.84];
    alturas.forEach((a, i) => {
      const bw = 52;
      const x = 52 + i * (bw + 30);
      const bh = (h - 110) * a;
      retangulo(c, x, h - 56 - bh, bw, bh, 10, i === alturas.length - 1 ? COR.verde : i === 2 ? 0xa3a3a3 : COR.g4);
    });
    retangulo(c, 40, h - 46, w - 80, 4, 2, COR.g3);
  },
  camada: (c: CanvasRenderingContext2D, w: number, h: number) => {
    retangulo(c, 0, 0, w, h, 36, COR.papel);
    retangulo(c, 40, 40, 120, 120, 16, 0xc9c9c9);
    retangulo(c, 180, 40, 120, 120, 16, 0xc9c9c9);
    retangulo(c, 40, 190, w - 80, 22, 11, 0xa3a3a3);
    c.fillStyle = hex(COR.verde);
    c.beginPath(); c.arc(w - 70, h - 70, 22, 0, Math.PI * 2); c.fill();
  },
  ia: (c: CanvasRenderingContext2D, w: number, h: number) => {
    retangulo(c, 0, 0, w, h, 40, COR.g3);
    // Faisca de quatro pontas
    const cx = w / 2, cy = h / 2, R = w * 0.3, r = w * 0.08;
    c.fillStyle = hex(COR.verde);
    c.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4 - Math.PI / 2;
      const raio = i % 2 === 0 ? R : r;
      c.lineTo(cx + Math.cos(a) * raio, cy + Math.sin(a) * raio);
    }
    c.closePath();
    c.fill();
  },
};

const gradienteRadial = (cor: string, opacidade: number) =>
  textura(256, 256, (c, w, h) => {
    const g = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, cor.replace("A", String(opacidade)));
    g.addColorStop(1, cor.replace("A", "0"));
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
  });

// ---------- Material de cristal ----------
// A logo usa quatro cores chapadas: corpo #0FDF5C (lado da luz) e #21AF56 (lado da sombra),
// base #00FF5F (luz) e #0DD357 (sombra). Aqui cada faceta recebe uma dessas cores, sem gradiente:
// se a faceta aponta para a esquerda da camera, fica com a cor clara; para a direita, com a escura.
// Cada faceta ainda ganha um leve degrau de tom conforme o angulo, chapado na face inteira: assim as
// arestas entre facetas ficam visiveis, sem virar luz suave.
const FACETAS = 12;
const CRISTAL = {
  corpo: { luz: 0x0fdf5c, sombra: 0x21af56 },
  base: { luz: 0x00ff5f, sombra: 0x0dd357 },
};

function materialCristal(cores: { luz: number; sombra: number }) {
  const luz = new THREE.Color(cores.luz);
  const sombra = new THREE.Color(cores.sombra);
  return new THREE.ShaderMaterial({
    uniforms: { luz: { value: luz }, sombra: { value: sombra } },
    vertexShader: /* glsl */ `
      varying vec3 vPos;
      void main() {
        vec4 p = modelViewMatrix * vec4(position, 1.0);
        vPos = p.xyz;
        gl_Position = projectionMatrix * p;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 luz;
      uniform vec3 sombra;
      varying vec3 vPos;
      void main() {
        // Normal da faceta, constante em cada face (sombreamento chapado).
        vec3 n = normalize(cross(dFdx(vPos), dFdy(vPos)));
        vec3 cor = n.x < 0.0 ? luz : sombra;
        // Degrau de tom por faceta: mais claro de frente para a camera, mais escuro perto do contorno.
        cor *= 0.8 + 0.2 * abs(n.z);
        gl_FragColor = vec4(cor, 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
}

// ---------- Cena ----------
export function criarCena(host: HTMLElement, opcoes: { reduzir: boolean }): Cena {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping; // cores da marca sem distorcao
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const cena = new THREE.Scene();
  cena.fog = new THREE.Fog(COR.fundo, 14, 21.5); // o que esta atras perde contraste, como profundidade de campo
  const pmrem = new THREE.PMREMGenerator(renderer);
  const ambiente = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  cena.environment = ambiente;
  cena.environmentIntensity = 0.35;

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
  camera.position.set(0, 0.55, 16.5);
  camera.lookAt(0, 0, 0);

  // Luz principal do alto a esquerda, como o lado claro do icone; preenchimento frio a direita; contraluz para o contorno.
  cena.add(new THREE.HemisphereLight(0xffffff, COR.g1, 0.9));
  const principal = new THREE.DirectionalLight(0xffffff, 2.8);
  principal.position.set(-5, 6, 6);
  cena.add(principal);
  const preenchimento = new THREE.DirectionalLight(0xbfffd6, 0.35);
  preenchimento.position.set(6, -1, 4);
  cena.add(preenchimento);
  const contraluz = new THREE.DirectionalLight(0xffffff, 1.4);
  contraluz.position.set(3, 4, -6);
  cena.add(contraluz);

  const raiz = new THREE.Group(); // inclina com o ponteiro
  cena.add(raiz);

  // ---------- Simbolo ----------
  const contorno = contornoDoIcone();
  const escala = 3.6 / 104; // o icone tem 104 unidades de altura; aqui o simbolo mede 3.6
  const simbolo = new THREE.Group();
  // Corpo e base sao duas pecas do mesmo contorno, com as duas cores principais do icone.
  const corte = contorno.findIndex((p) => p.y <= 131.2 - 126.348 + 0.001);
  // A LatheGeometry espera o perfil de baixo para cima; na ordem inversa as normais apontam para dentro.
  // Poucas faces ao redor: cada face e um plano chapado, como as facetas de um cristal.
  const corpoGeo = new THREE.LatheGeometry(contorno.slice(0, corte + 1).reverse(), FACETAS);
  const baseGeo = new THREE.LatheGeometry(contorno.slice(corte).reverse(), FACETAS);
  const matCorpo = materialCristal(CRISTAL.corpo);
  const matBase = materialCristal(CRISTAL.base);
  const corpo = new THREE.Mesh(corpoGeo, matCorpo);
  const base = new THREE.Mesh(baseGeo, matBase);
  simbolo.add(corpo, base);
  simbolo.scale.setScalar(escala);
  simbolo.position.y = -0.55;
  // O simbolo fica parado, fora da raiz: nao gira, nao flutua e nao inclina com o ponteiro.
  // So os elementos em volta se movem.
  cena.add(simbolo);

  // Brilho verde atras do simbolo e sombra de contato abaixo dele
  const brilho = new THREE.Sprite(new THREE.SpriteMaterial({ map: gradienteRadial("rgba(2,255,85,A)", 0.22), depthWrite: false, transparent: true }));
  brilho.scale.set(7.5, 7.5, 1);
  brilho.position.set(0, 0.2, -2.5);
  raiz.add(brilho);
  const sombra = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 4),
    new THREE.MeshBasicMaterial({ map: gradienteRadial("rgba(0,0,0,A)", 0.75), transparent: true, depthWrite: false }),
  );
  sombra.rotation.x = -Math.PI / 2;
  sombra.position.y = -1.55;
  sombra.scale.set(0.9, 0.5, 1);
  raiz.add(sombra);

  // ---------- Orbitas ----------
  type Orbita = { raio: number; altura: number; inclinacao: number; giro: number; velocidade: number; grupo: THREE.Group };
  const orbitas: Orbita[] = [
    { raio: 2.5, altura: 1.65, inclinacao: 0.2, giro: 0.15, velocidade: 0.11 },
    { raio: 3.15, altura: 0.15, inclinacao: 0.28, giro: -0.1, velocidade: -0.075 },
    { raio: 2.7, altura: -1.35, inclinacao: 0.22, giro: 0.05, velocidade: 0.09 },
  ].map((o) => {
    const grupo = new THREE.Group();
    grupo.position.y = o.altura;
    grupo.rotation.set(o.inclinacao, 0, o.giro);
    raiz.add(grupo);
    return { ...o, grupo };
  });

  const descartaveis: { dispose: () => void }[] = [corpoGeo, baseGeo, matCorpo, matBase, ambiente, pmrem];

  // Linhas pontilhadas das orbitas: o anel gira devagar, entao os tracos parecem correr pela linha.
  const aneis = orbitas.map((o, i) => {
    const pts = new THREE.EllipseCurve(0, 0, o.raio, o.raio, 0, Math.PI * 2).getPoints(220).map((p) => new THREE.Vector3(p.x, 0, p.y));
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineDashedMaterial({ color: i === 1 ? 0x4a4a4a : COR.g3, dashSize: 0.07, gapSize: 0.09, transparent: true, opacity: 0.9 });
    const linha = new THREE.Line(geo, mat);
    linha.computeLineDistances();
    o.grupo.add(linha);
    descartaveis.push(geo, mat);
    return linha;
  });

  // Pontos de luz que percorrem as orbitas
  const texPonto = gradienteRadial("rgba(2,255,85,A)", 1);
  descartaveis.push(texPonto);
  const pontos = orbitas.flatMap((o, i) =>
    [0, Math.PI].slice(0, i === 1 ? 2 : 1).map((fase) => {
      const nucleo = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), new THREE.MeshBasicMaterial({ color: COR.verde }));
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: texPonto, transparent: true, depthWrite: false, opacity: 0.55 }));
      halo.scale.set(0.42, 0.42, 1);
      nucleo.add(halo);
      o.grupo.add(nucleo);
      descartaveis.push(nucleo.geometry, nucleo.material as THREE.Material, halo.material);
      return { nucleo, orbita: o, fase, velocidade: 0.42 * (i === 1 ? -1 : 1) };
    }),
  );

  // ---------- Elementos em orbita ----------
  type Peca = { objeto: THREE.Object3D; orbita: Orbita; fase: number; flutua: number; entrada: number };
  const pecas: Peca[] = [];

  function cartao(nome: keyof typeof FACES, w: number, h: number, profundidade: number, corCorpo: number, px = 512) {
    const g = new THREE.Group();
    const geo = new RoundedBoxGeometry(w, h, profundidade, 4, Math.min(w, h) * 0.08);
    const mat = new THREE.MeshStandardMaterial({ color: corCorpo, roughness: 0.55, metalness: 0 });
    g.add(new THREE.Mesh(geo, mat));
    const tex = textura(px, Math.round((px * h) / w), FACES[nome]);
    const faceGeo = new THREE.PlaneGeometry(w * 0.985, h * 0.985);
    const faceMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6, transparent: true });
    const face = new THREE.Mesh(faceGeo, faceMat);
    face.position.z = profundidade / 2 + 0.002;
    g.add(face);
    descartaveis.push(geo, mat, tex, faceGeo, faceMat);
    return g;
  }

  const janela = cartao("janela", 1.5, 1.05, 0.08, COR.g2);
  const codigo = cartao("codigo", 1.05, 0.78, 0.08, 0xd9d9d9);
  const celular = cartao("celular", 0.52, 1.0, 0.07, 0xd9d9d9, 256);
  const grafico = cartao("grafico", 0.98, 0.72, 0.08, COR.g2);
  const ia = cartao("ia", 0.5, 0.5, 0.22, COR.g3, 256);
  // Cards com icones: pessoas, robos, metricas e web
  const pessoas = cartao("pessoas", 0.56, 0.56, 0.14, 0xd9d9d9, 256);
  const robos = cartao("robos", 0.56, 0.56, 0.14, COR.g3, 256);
  const metricas = cartao("metricas", 0.56, 0.56, 0.14, COR.g2, 256);
  const web = cartao("web", 0.56, 0.56, 0.14, 0xd9d9d9, 256);

  // Camadas de produto: tres placas empilhadas que respiram
  const camadas = new THREE.Group();
  const placas = [COR.g2, COR.g3, COR.papel].map((cor, i) => {
    const p = i === 2 ? cartao("camada", 0.82, 0.82, 0.05, 0xd9d9d9, 384) : (() => {
      const geo = new RoundedBoxGeometry(0.82 + (2 - i) * 0.1, 0.82 + (2 - i) * 0.1, 0.05, 4, 0.06);
      const mat = new THREE.MeshStandardMaterial({ color: cor, roughness: 0.55 });
      descartaveis.push(geo, mat);
      return new THREE.Mesh(geo, mat);
    })();
    p.rotation.x = -Math.PI / 2 + 0.55;
    camadas.add(p);
    return p;
  });

  const distribuir: [THREE.Object3D, number, number][] = [
    [janela, 1, 0.2],
    [grafico, 0, 1.4],
    [codigo, 1, Math.PI + 0.35],
    [ia, 0, Math.PI + 1.5],
    [celular, 2, 0.9],
    [camadas, 2, Math.PI + 0.9],
    [pessoas, 1, 1.85],
    [robos, 0, 3.0],
    [metricas, 2, 2.5],
    [web, 1, 5.0],
  ];
  distribuir.forEach(([objeto, indice, fase], i) => {
    raiz.add(objeto);
    objeto.scale.setScalar(0.0001);
    pecas.push({ objeto, orbita: orbitas[indice], fase, flutua: i * 1.37, entrada: 0.35 + i * 0.12 });
  });

  // Particulas pequenas em volta, para dar profundidade
  const nParticulas = 46;
  const posParticulas = new Float32Array(nParticulas * 3);
  for (let i = 0; i < nParticulas; i++) {
    const r = 2.2 + Math.random() * 2.6;
    const a = Math.random() * Math.PI * 2;
    posParticulas.set([Math.cos(a) * r, (Math.random() - 0.5) * 4.2, Math.sin(a) * r], i * 3);
  }
  const geoParticulas = new THREE.BufferGeometry();
  geoParticulas.setAttribute("position", new THREE.BufferAttribute(posParticulas, 3));
  const matParticulas = new THREE.PointsMaterial({ color: 0x8a8a8a, size: 0.035, sizeAttenuation: true, transparent: true, opacity: 0.7 });
  const particulas = new THREE.Points(geoParticulas, matParticulas);
  raiz.add(particulas);
  descartaveis.push(geoParticulas, matParticulas);

  // ---------- Contorno de hover (guidelines, secao 15.2) ----------
  // Ao passar o mouse sobre o simbolo ou um card, aparece um contorno branco de cerca de 2 px em toda a
  // silhueta, com fade de 0,25 s. A silhueta e desenhada numa mascara (objeto em vermelho, objetos a frente
  // dele em verde), dilatada num passe de tela cheia (16 amostras em dois raios). So o anel fora da
  // silhueta e desenhado por cima da cena, e os objetos a frente cortam o contorno.
  // Linhas, pontos de luz, particulas, brilho e sombra do chao nao entram na mascara.
  const alvos: THREE.Object3D[] = [simbolo, ...pecas.map((p) => p.objeto)];
  const alvoDaMalha = new Map<THREE.Mesh, THREE.Object3D>();
  alvos.forEach((a) => a.traverse((o) => o instanceof THREE.Mesh && alvoDaMalha.set(o, a)));
  const malhasAlvo = [...alvoDaMalha.keys()];
  const desenhaveis: THREE.Object3D[] = [];
  cena.traverse((o) => {
    if (o instanceof THREE.Mesh || o instanceof THREE.Line || o instanceof THREE.Points || o instanceof THREE.Sprite) desenhaveis.push(o);
  });
  const matSilhueta = new THREE.MeshBasicMaterial({ color: 0xff0000, fog: false });
  const matFrente = new THREE.MeshBasicMaterial({ color: 0x00ff00, fog: false });
  const mascara = new THREE.WebGLRenderTarget(1, 1, { samples: 4 });
  const matAnel = new THREE.ShaderMaterial({
    uniforms: { mascara: { value: mascara.texture }, passo: { value: new THREE.Vector2(1, 1) }, opacidade: { value: 0 } },
    transparent: true,
    depthTest: false,
    depthWrite: false,
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D mascara;
      uniform vec2 passo;
      uniform float opacidade;
      varying vec2 vUv;
      void main() {
        vec4 aqui = texture2D(mascara, vUv);
        // Dentro da silhueta ou sobre um objeto a frente: sem contorno.
        if (aqui.r > 0.5 || aqui.g > 0.5) discard;
        float anel = 0.0;
        for (int i = 0; i < 8; i++) {
          float a = float(i) * 0.785398;
          vec2 d = vec2(cos(a), sin(a)) * passo;
          anel = max(anel, texture2D(mascara, vUv + d).r);
          anel = max(anel, texture2D(mascara, vUv + d * 0.5).r);
        }
        if (anel < 0.01) discard;
        gl_FragColor = vec4(1.0, 1.0, 1.0, anel * opacidade);
      }
    `,
  });
  const geoTela = new THREE.PlaneGeometry(2, 2);
  const telaAnel = new THREE.Mesh(geoTela, matAnel);
  telaAnel.frustumCulled = false;
  const cenaAnel = new THREE.Scene();
  cenaAnel.add(telaAnel);
  const cameraTela = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  descartaveis.push(matSilhueta, matFrente, mascara, matAnel, geoTela);

  const realce = { alvo: null as THREE.Object3D | null, opacidade: 0 };
  const raio = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let ponteiroDentro = false;
  const posAlvo = new THREE.Vector3();
  const posOutro = new THREE.Vector3();

  function procurarAlvo() {
    if (!ponteiroDentro) return null;
    raio.setFromCamera(ndc, camera);
    const toque = raio.intersectObjects(malhasAlvo, false)[0];
    return toque ? alvoDaMalha.get(toque.object as THREE.Mesh) ?? null : null;
  }

  function desenharMascara(alvo: THREE.Object3D) {
    alvo.getWorldPosition(posAlvo);
    const distAlvo = posAlvo.distanceTo(camera.position);
    const estado = desenhaveis.map((o) => ({ o, visivel: o.visible, material: (o as THREE.Mesh).material }));
    desenhaveis.forEach((o) => {
      const dono = o instanceof THREE.Mesh ? alvoDaMalha.get(o) : undefined;
      if (!dono) {
        o.visible = false;
        return;
      }
      if (dono === alvo) {
        (o as THREE.Mesh).material = matSilhueta;
        return;
      }
      dono.getWorldPosition(posOutro);
      if (posOutro.distanceTo(camera.position) < distAlvo) (o as THREE.Mesh).material = matFrente;
      else o.visible = false; // atras do objeto: o contorno passa por cima dele
    });
    const nevoa = cena.fog;
    cena.fog = null;
    renderer.setRenderTarget(mascara);
    renderer.clear();
    renderer.render(cena, camera);
    renderer.setRenderTarget(null);
    cena.fog = nevoa;
    estado.forEach(({ o, visivel, material }) => {
      o.visible = visivel;
      if (o instanceof THREE.Mesh) o.material = material as THREE.Material;
    });
  }

  // ---------- Interacao ----------
  const ponteiro = { x: 0, y: 0, alvoX: 0, alvoY: 0, perto: 0, alvoPerto: 0 };
  const mover = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    const r = host.getBoundingClientRect();
    ponteiro.alvoX = ((e.clientX - r.left) / r.width) * 2 - 1;
    ponteiro.alvoY = ((e.clientY - r.top) / r.height) * 2 - 1;
    ponteiro.alvoPerto = 1;
    ndc.set(ponteiro.alvoX, -ponteiro.alvoY);
    ponteiroDentro = true;
    if (opcoes.reduzir) desenhar(30, 0); // sem loop: redesenha so quando o ponteiro mexe
  };
  const sair = () => {
    ponteiro.alvoX = 0;
    ponteiro.alvoY = 0;
    ponteiro.alvoPerto = 0;
    ponteiroDentro = false;
    if (opcoes.reduzir) desenhar(30, 0);
  };
  host.addEventListener("pointermove", mover);
  host.addEventListener("pointerleave", sair);

  // ---------- Tamanho ----------
  const ajustar = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    const buffer = renderer.getDrawingBufferSize(new THREE.Vector2());
    mascara.setSize(buffer.x, buffer.y);
    // Anel de cerca de 2 px de CSS, em pixels reais da tela
    const px = 2 * renderer.getPixelRatio();
    matAnel.uniforms.passo.value.set(px / buffer.x, px / buffer.y);
    camera.aspect = width / height;
    // Em telas estreitas a camera recua para a cena caber inteira.
    camera.position.z = camera.aspect < 1 ? 16.5 / camera.aspect ** 0.55 : 16.5;
    camera.updateProjectionMatrix();
    if (opcoes.reduzir) desenhar(30, 30);
  };
  const observador = new ResizeObserver(ajustar);
  observador.observe(host);

  // ---------- Animacao ----------
  const suavizar = (atual: number, alvo: number, velocidade: number, dt: number) => atual + (alvo - atual) * (1 - Math.exp(-velocidade * dt));
  const saida = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3); // ease-out cubica
  const comMola = (t: number) => {
    // ease-out com leve ultrapassagem, so na entrada das pecas
    const x = Math.min(1, Math.max(0, t));
    const c = 1.4;
    return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
  };

  const vetor = new THREE.Vector3();
  function desenhar(t: number, dt: number) {
    ponteiro.x = suavizar(ponteiro.x, ponteiro.alvoX, 3, dt);
    ponteiro.y = suavizar(ponteiro.y, ponteiro.alvoY, 3, dt);
    ponteiro.perto = suavizar(ponteiro.perto, ponteiro.alvoPerto, 2.5, dt);

    // A cena toda inclina na direcao do ponteiro, com amortecimento.
    raiz.rotation.y = ponteiro.x * 0.32;
    raiz.rotation.x = ponteiro.y * 0.12;

    // O simbolo e estatico; so o brilho e a sombra aparecem na entrada.
    const e = saida(t / 1.4);
    (sombra.material as THREE.MeshBasicMaterial).opacity = e;
    (brilho.material as THREE.SpriteMaterial).opacity = e * (0.85 + Math.sin(t * 0.9) * 0.15);

    // Orbitas: os aneis giram para os tracos correrem; com o ponteiro perto, as orbitas se abrem um pouco.
    const abre = 1 + ponteiro.perto * 0.06;
    orbitas.forEach((o, i) => {
      o.grupo.scale.setScalar(abre * (0.9 + 0.1 * e));
      aneis[i].rotation.y = t * 0.05 * Math.sign(o.velocidade);
      (aneis[i].material as THREE.LineDashedMaterial).opacity = 0.9 * e;
    });
    pontos.forEach((p) => {
      const a = p.fase + t * p.velocidade;
      p.nucleo.position.set(Math.cos(a) * p.orbita.raio, 0, Math.sin(a) * p.orbita.raio);
    });

    pecas.forEach((p) => {
      const a = p.fase + t * p.orbita.velocidade;
      vetor.set(Math.cos(a) * p.orbita.raio, Math.sin(t * 0.8 + p.flutua) * 0.07, Math.sin(a) * p.orbita.raio);
      p.orbita.grupo.localToWorld(vetor);
      raiz.worldToLocal(vetor);
      p.objeto.position.copy(vetor);
      // Cada peca encara a camera com uma leve inclinacao propria, sem girar de costas.
      p.objeto.rotation.y = -raiz.rotation.y + Math.sin(t * 0.5 + p.flutua) * 0.18 - Math.cos(a) * 0.25;
      p.objeto.rotation.x = -raiz.rotation.x + Math.cos(t * 0.6 + p.flutua) * 0.06;
      p.objeto.rotation.z = Math.sin(t * 0.4 + p.flutua) * 0.04;
      p.objeto.scale.setScalar(Math.max(0.0001, comMola((t - p.entrada) / 0.9)));
    });

    // Placas de produto respiram
    placas.forEach((pl, i) => {
      pl.position.y = (i - 1) * (0.16 + 0.05 * (0.5 + 0.5 * Math.sin(t * 1.1)) + ponteiro.perto * 0.04);
    });

    particulas.rotation.y = t * 0.02;
    (particulas.material as THREE.PointsMaterial).opacity = 0.7 * e;

    renderer.render(cena, camera);

    // Contorno de hover: entra e sai com fade de 0,25 s (direto com movimento reduzido).
    const achado = procurarAlvo();
    if (achado) realce.alvo = achado;
    const alvoOpacidade = achado ? 1 : 0;
    realce.opacidade = opcoes.reduzir ? alvoOpacidade : suavizar(realce.opacidade, alvoOpacidade, 16, dt);
    if (realce.alvo && realce.opacidade > 0.01) {
      desenharMascara(realce.alvo);
      matAnel.uniforms.opacidade.value = realce.opacidade;
      renderer.autoClear = false;
      renderer.render(cenaAnel, cameraTela);
      renderer.autoClear = true;
    }
  }

  // ---------- Loop ----------
  let quadro = 0;
  let ultimo = 0;
  let tempo = 0;
  let visivel = true;
  const relogio = (agora: number) => {
    const dt = Math.min(0.05, (agora - ultimo) / 1000 || 0);
    ultimo = agora;
    tempo += dt;
    desenhar(tempo, dt);
    quadro = requestAnimationFrame(relogio);
  };
  const iniciar = () => {
    if (quadro || opcoes.reduzir || !visivel || document.hidden) return;
    ultimo = performance.now();
    quadro = requestAnimationFrame(relogio);
  };
  const parar = () => {
    cancelAnimationFrame(quadro);
    quadro = 0;
  };
  const vigia = new IntersectionObserver(([e]) => {
    visivel = e.isIntersecting;
    if (visivel) iniciar();
    else parar();
  });
  vigia.observe(host);
  const aba = () => (document.hidden ? parar() : iniciar());
  document.addEventListener("visibilitychange", aba);

  ajustar();
  if (opcoes.reduzir) desenhar(30, 30); // quadro final, parado
  else iniciar();

  return {
    destruir() {
      parar();
      vigia.disconnect();
      observador.disconnect();
      document.removeEventListener("visibilitychange", aba);
      host.removeEventListener("pointermove", mover);
      host.removeEventListener("pointerleave", sair);
      cena.traverse((o) => {
        if (o instanceof THREE.Sprite) o.material.map?.dispose();
      });
      (sombra.material as THREE.MeshBasicMaterial).map?.dispose();
      sombra.geometry.dispose();
      descartaveis.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
