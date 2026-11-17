"use client";

import { useEffect, useRef } from "react";

// Fundo da proposta comercial: feixes de luz verticais em tons neutros, desenhados em baixa resolucao
// com dithering ordenado (Bayer 4x4) e ampliados sem suavizacao. O mouse inclina os feixes de leve e
// acende um brilho suave ao redor do cursor. Fica atras de tudo e nao recebe cliques.
// Com prefers-reduced-motion, desenha um quadro parado. Pausa com a aba oculta.
const PAL = [
  [15, 15, 15],
  [21, 21, 21],
  [28, 28, 28],
  [36, 36, 36],
  [46, 46, 46],
];
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const N = 9;
const FEIXES = Array.from({ length: N }, (_, i) => ({
  x: (i + 0.5) / N + (((i * 37) % 7) - 3) * 0.012,
  w: 0.011 + ((i * 13) % 5) * 0.004,
  ph: i * 1.7,
  sp: 0.25 + ((i * 7) % 5) * 0.07,
  a: 0.5 + ((i * 11) % 5) * 0.12,
  sl: 0.18 + ((i * 5) % 4) * 0.05,
}));

export default function BgBeams() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, cols = 0, rows = 0, img: ImageData | null = null;
    let mx = 0.5, my = 0.3, tx = 0.5, ty = 0.3, act = 0, last = 0, lastMove = 0, quadro = 0;

    const size = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const cell = W < 700 ? 4 : 3;
      cols = Math.ceil(W / cell);
      rows = Math.ceil(H / cell);
      cv.width = cols;
      cv.height = rows;
      img = ctx.createImageData(cols, rows);
    };

    const draw = (t: number) => {
      if (!img) return;
      const d = img.data;
      const aspect = W / H;
      for (let y = 0; y < rows; y++) {
        const v = y / rows;
        for (let x = 0; x < cols; x++) {
          const u = x / cols;
          let L = 0;
          for (let k = 0; k < N; k++) {
            const b = FEIXES[k];
            const bx = b.x + v * b.sl * (0.6 + (mx - 0.5) * 0.9) + (mx - 0.5) * 0.05 * (1 + (k % 3)) * (1 - v * 0.4); // o mouse inclina os feixes
            const dx = ((u - bx) * aspect) / (b.w * aspect * (1 + v * 1.6));
            if (dx > 3 || dx < -3) continue;
            L += Math.exp(-dx * dx) * Math.pow(1 - v, 0.95) * (0.55 + 0.45 * Math.sin(t * b.sp + b.ph)) * b.a;
          }
          const ddx = (u - mx) * aspect;
          const ddy = v - my;
          L += Math.exp(-(ddx * ddx + ddy * ddy) * 22) * 0.38 * act; // brilho suave ao redor do cursor
          L = L > 0.18 ? Math.min((L - 0.18) / 0.82, 1) : 0; // corta os tons baixos: a maior parte da tela fica escura
          const q = L * (PAL.length - 1);
          let c = Math.floor(q);
          if (q - c > B4[(y & 3) * 4 + (x & 3)]) c++;
          c = Math.min(c, PAL.length - 1);
          const idx = (y * cols + x) * 4;
          d[idx] = PAL[c][0];
          d[idx + 1] = PAL[c][1];
          d[idx + 2] = PAL[c][2];
          d[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    const frame = (ts: number) => {
      quadro = requestAnimationFrame(frame);
      if (ts - last < 48) return; // cerca de 20 quadros por segundo bastam para o movimento lento
      last = ts;
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      draw(ts / 1000);
    };

    size();
    draw(2);

    const mover = (e: PointerEvent) => {
      tx = e.clientX / W;
      ty = e.clientY / H;
      lastMove = performance.now();
      act += (1 - act) * 0.25;
    };
    const apagar = window.setInterval(() => {
      if (performance.now() - lastMove > 2500) act *= 0.85;
    }, 120);
    const aba = () => {
      cancelAnimationFrame(quadro);
      if (!document.hidden) quadro = requestAnimationFrame(frame);
    };
    let espera: ReturnType<typeof setTimeout>;
    const redimensionar = () => {
      clearTimeout(espera);
      espera = setTimeout(() => {
        size();
        draw(2);
      }, 150);
    };

    window.addEventListener("resize", redimensionar);
    if (!reduzir) {
      window.addEventListener("pointermove", mover, { passive: true });
      document.addEventListener("visibilitychange", aba);
      quadro = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(quadro);
      clearInterval(apagar);
      clearTimeout(espera);
      window.removeEventListener("resize", redimensionar);
      window.removeEventListener("pointermove", mover);
      document.removeEventListener("visibilitychange", aba);
    };
  }, []);

  return <canvas ref={ref} className="bg-beams" aria-hidden="true" />;
}
