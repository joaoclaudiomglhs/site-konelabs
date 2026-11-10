// Gera a imagem de compartilhamento (Open Graph, 1200 x 630) de uma proposta:
// logo da Konelabs no centro e o nome do cliente logo abaixo.
//
// Uso: node scripts/gerar-og-proposta.mjs <slug> "<nome do cliente>"
// Exemplo: node scripts/gerar-og-proposta.mjs nac-ebony "NAC Digital e Ebony Logistics"
// Saida: public/og/proposta-<slug>.png
//
// Usa o Playwright com Chromium, que nao e dependencia do projeto: rode onde ele estiver instalado.

import { chromium } from "playwright";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const [slug, cliente] = process.argv.slice(2);
if (!slug || !cliente) {
  console.error('Uso: node scripts/gerar-og-proposta.mjs <slug> "<nome do cliente>"');
  process.exit(1);
}

const raiz = process.cwd();
const logo = (await readFile(path.join(raiz, "public/logo-konelabs.svg"))).toString("base64");
const fonte = (await readFile(path.join(raiz, "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"))).toString("base64");
const ruido =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const escapar = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Inter; src: url(data:font/woff2;base64,${fonte}) format("woff2"); font-weight: 100 900; }
html, body { margin: 0; width: 1200px; height: 630px; }
body {
  background: ${ruido} 0 0 / 200px 200px, #0f0f0f;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 44px;
  font-family: Inter, sans-serif; color: #ededed;
}
img { width: 420px; height: auto; display: block; }
h1 { margin: 0; font-size: 52px; font-weight: 600; letter-spacing: -0.02em; text-align: center; max-width: 1000px; line-height: 1.15; text-wrap: balance; }
</style></head><body>
<img src="data:image/svg+xml;base64,${logo}" alt="">
<h1>${escapar(cliente)}</h1>
</body></html>`;

const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } });
await pagina.setContent(html, { waitUntil: "load" });
await pagina.evaluate(() => document.fonts.ready);
await mkdir(path.join(raiz, "public/og"), { recursive: true });
const saida = path.join(raiz, "public/og", `proposta-${slug}.png`);
await pagina.screenshot({ path: saida });
await navegador.close();
console.log(saida);
