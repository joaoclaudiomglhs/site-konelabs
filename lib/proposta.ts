import { createDecipheriv, createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Proposta comercial da NAC Digital e Ebony Logistics, protegida por senha.
// O repositorio e publico, entao os arquivos ficam cifrados (AES-256-GCM) em conteudo-privado/.
// A senha vive so na variavel de ambiente PROPOSTA_NAC_EBONY_SENHA (Vercel), nunca no codigo.
// Para trocar a senha ou atualizar a proposta: scripts/cifrar-proposta.mjs.

export const propostaCaminho = "/propostas/nac-ebony";
export const propostaAcesso = `${propostaCaminho}/acesso`;
export const propostaCookie = "proposta_nac_ebony";
export const propostaCookieDias = 7;

const pasta = path.join(process.cwd(), "conteudo-privado", "nac-ebony");

function senhaConfigurada() {
  const senha = process.env.PROPOSTA_NAC_EBONY_SENHA;
  return senha && senha.length > 0 ? senha : null;
}

function iguais(a: Buffer, b: Buffer) {
  return a.length === b.length && timingSafeEqual(a, b);
}

// Compara a senha digitada com a configurada em tempo constante.
export function senhaConfere(tentativa: string) {
  const senha = senhaConfigurada();
  if (!senha) return false;
  const h = (v: string) => createHmac("sha256", "comparacao").update(v).digest();
  return iguais(h(tentativa), h(senha));
}

// Valor do cookie de acesso: derivado da senha, entao trocar a senha invalida todos os acessos.
export function tokenAcesso() {
  const senha = senhaConfigurada();
  if (!senha) return null;
  return createHmac("sha256", senha).update("acesso:nac-ebony:v1").digest("base64url");
}

export function tokenValido(valor: string | undefined) {
  const esperado = tokenAcesso();
  if (!valor || !esperado) return false;
  return iguais(Buffer.from(valor), Buffer.from(esperado));
}

// Formato do arquivo cifrado: salt (16) | iv (12) | tag (16) | conteudo.
export async function lerArquivoProposta(nome: "index.html" | "proposta-slides.pdf") {
  const senha = senhaConfigurada();
  if (!senha) throw new Error("PROPOSTA_NAC_EBONY_SENHA nao configurada");
  const dados = await readFile(path.join(pasta, `${nome}.enc`));
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
