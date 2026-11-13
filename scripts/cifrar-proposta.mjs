// Cifra os arquivos de uma proposta para o repositorio (que e publico).
// Uso: PROPOSTA_NAC_EBONY_SENHA='...' node scripts/cifrar-proposta.mjs <pasta com index.html e proposta-slides.pdf> [slug]
// O slug padrao e nac-ebony; os arquivos vao para conteudo-privado/<slug>/ (ex.: nac-ebony-completa).
// Rode de novo sempre que a proposta mudar ou a senha for trocada (e atualize a variavel na Vercel).
import { createCipheriv, randomBytes, scryptSync } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const senha = process.env.PROPOSTA_NAC_EBONY_SENHA;
const origem = process.argv[2];
const slug = process.argv[3] ?? "nac-ebony";
if (!senha || !origem) {
  console.error("Uso: PROPOSTA_NAC_EBONY_SENHA='...' node scripts/cifrar-proposta.mjs <pasta-da-proposta> [slug]");
  process.exit(1);
}

const destino = path.join(process.cwd(), "conteudo-privado", slug);
mkdirSync(destino, { recursive: true });

for (const nome of ["index.html", "proposta-slides.pdf"]) {
  const conteudo = readFileSync(path.join(origem, nome));
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const chave = scryptSync(senha, salt, 32);
  const cifra = createCipheriv("aes-256-gcm", chave, iv);
  const corpo = Buffer.concat([cifra.update(conteudo), cifra.final()]);
  writeFileSync(path.join(destino, `${nome}.enc`), Buffer.concat([salt, iv, cifra.getAuthTag(), corpo]));
  console.log(`${nome}: ${conteudo.length} bytes cifrados`);
}
