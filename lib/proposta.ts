import { createDecipheriv, createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Propostas comerciais protegidas por senha.
// O repositorio e publico, entao os arquivos ficam cifrados (AES-256-GCM) em conteudo-privado/<slug>/.
// A senha vive so na variavel de ambiente de cada proposta (Vercel), nunca no codigo.
// Para trocar a senha ou atualizar uma proposta: scripts/cifrar-proposta.mjs.

export const propostas = {
  "nac-ebony": { cliente: "NAC Digital e Ebony Logistics", senhaEnv: "PROPOSTA_NAC_EBONY_SENHA" },
  "nac-ebony-completa": { cliente: "NAC Digital e Ebony Logistics", senhaEnv: "PROPOSTA_NAC_EBONY_SENHA" },
} as const;

export type SlugProposta = keyof typeof propostas;
export type ArquivoProposta = "index.html" | "proposta-slides.pdf";

export const propostaCookieDias = 7;
export const caminhoProposta = (slug: SlugProposta) => `/propostas/${slug}`;
export const acessoProposta = (slug: SlugProposta) => `${caminhoProposta(slug)}/acesso`;
export const cookieProposta = (slug: SlugProposta) => `proposta_${slug.replaceAll("-", "_")}`;

function senhaConfigurada(slug: SlugProposta) {
  const senha = process.env[propostas[slug].senhaEnv];
  return senha && senha.length > 0 ? senha : null;
}

function iguais(a: Buffer, b: Buffer) {
  return a.length === b.length && timingSafeEqual(a, b);
}

// Compara a senha digitada com a configurada em tempo constante.
export function senhaConfere(slug: SlugProposta, tentativa: string) {
  const senha = senhaConfigurada(slug);
  if (!senha) return false;
  const h = (v: string) => createHmac("sha256", "comparacao").update(v).digest();
  return iguais(h(tentativa), h(senha));
}

// Valor do cookie de acesso: derivado da senha e da proposta, entao trocar a senha invalida todos os acessos.
export function tokenAcesso(slug: SlugProposta) {
  const senha = senhaConfigurada(slug);
  if (!senha) return null;
  return createHmac("sha256", senha).update(`acesso:${slug}:v1`).digest("base64url");
}

export function tokenValido(slug: SlugProposta, valor: string | undefined) {
  const esperado = tokenAcesso(slug);
  if (!valor || !esperado) return false;
  return iguais(Buffer.from(valor), Buffer.from(esperado));
}

// Formato do arquivo cifrado: salt (16) | iv (12) | tag (16) | conteudo.
export async function lerArquivoProposta(slug: SlugProposta, nome: ArquivoProposta) {
  const senha = senhaConfigurada(slug);
  if (!senha) throw new Error(`${propostas[slug].senhaEnv} nao configurada`);
  const dados = await readFile(path.join(process.cwd(), "conteudo-privado", slug, `${nome}.enc`));
  const salt = dados.subarray(0, 16);
  const iv = dados.subarray(16, 28);
  const tag = dados.subarray(28, 44);
  const chave = scryptSync(senha, salt, 32);
  const decifra = createDecipheriv("aes-256-gcm", chave, iv);
  decifra.setAuthTag(tag);
  return Buffer.concat([decifra.update(dados.subarray(44)), decifra.final()]);
}

export const cabecalhosPrivados = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};
