import { createDecipheriv, createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Proposta comercial da NAC Digital e Ebony Logistics, protegida por senha.
// O repositorio e publico, entao os arquivos ficam cifrados (AES-256-GCM) em conteudo-privado/.
// A senha vive so na variavel de ambiente PROPOSTA_NAC_EBONY_SENHA (Vercel), nunca no codigo.
// Para trocar a senha ou atualizar a proposta: scripts/cifrar-proposta.mjs.

export type Proposta = {
  caminho: string;
  acesso: string;
  cookie: string;
  cookieDias: number;
  pasta: string;
  rotulo: string;
};

function configurar(caminho: string, cookie: string, slug: string, rotulo: string): Proposta {
  return {
    caminho,
    acesso: `${caminho}/acesso`,
    cookie,
    cookieDias: 7,
    pasta: path.join(process.cwd(), "conteudo-privado", slug),
    rotulo,
  };
}

// Versao simplificada (rota original do repositorio).
export const propostaNacEbony = configurar("/propostas/nac-ebony", "proposta_nac_ebony", "nac-ebony", "nac-ebony");
// Versao completa, publicada em /nac-ebony-completa. Usa a mesma senha (PROPOSTA_NAC_EBONY_SENHA).
export const propostaNacEbonyCompleta = configurar(
  "/nac-ebony-completa",
  "proposta_nac_ebony_completa",
  "nac-ebony-completa",
  "nac-ebony-completa",
);

export const propostaCaminho = propostaNacEbony.caminho;
export const propostaAcesso = propostaNacEbony.acesso;
export const propostaCookie = propostaNacEbony.cookie;
export const propostaCookieDias = propostaNacEbony.cookieDias;

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
export function tokenAcesso(proposta: Proposta = propostaNacEbony) {
  const senha = senhaConfigurada();
  if (!senha) return null;
  return createHmac("sha256", senha).update(`acesso:${proposta.rotulo}:v1`).digest("base64url");
}

export function tokenValido(valor: string | undefined, proposta: Proposta = propostaNacEbony) {
  const esperado = tokenAcesso(proposta);
  if (!valor || !esperado) return false;
  return iguais(Buffer.from(valor), Buffer.from(esperado));
}

// Formato do arquivo cifrado: salt (16) | iv (12) | tag (16) | conteudo.
export async function lerArquivoProposta(
  nome: "index.html" | "proposta-slides.pdf",
  proposta: Proposta = propostaNacEbony,
) {
  const senha = senhaConfigurada();
  if (!senha) throw new Error("PROPOSTA_NAC_EBONY_SENHA nao configurada");
  const dados = await readFile(path.join(proposta.pasta, `${nome}.enc`));
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
