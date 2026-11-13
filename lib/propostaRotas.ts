import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  acessoProposta,
  cabecalhosPrivados,
  caminhoProposta,
  cookieProposta,
  lerArquivoProposta,
  tokenValido,
  type SlugProposta,
} from "@/lib/proposta";
import { comCarregamento } from "@/lib/carregamento";

// Respostas das rotas de proposta, compartilhadas entre as propostas em app/propostas/<slug>.

async function semAcesso(slug: SlugProposta, request: Request) {
  const loja = await cookies();
  if (tokenValido(slug, loja.get(cookieProposta(slug))?.value)) return null;
  return NextResponse.redirect(new URL(acessoProposta(slug), request.url), { status: 303, headers: cabecalhosPrivados });
}

// Entrega a proposta em HTML so com o cookie de acesso; sem ele, leva para a tela de senha.
export async function responderProposta(slug: SlugProposta, request: Request) {
  const bloqueio = await semAcesso(slug, request);
  if (bloqueio) return bloqueio;

  // O HTML aponta para o PDF com caminho relativo (o nome muda entre versoes); aqui ele passa a apontar para a rota protegida.
  // A proposta e um HTML grande: a tela de carregamento cobre a pagina ate ela terminar de carregar.
  const html = comCarregamento(
    (await lerArquivoProposta(slug, "index.html"))
      .toString("utf8")
      .replace(/href="[^"/:#]+\.pdf"/g, `href="${caminhoProposta(slug)}/proposta-slides.pdf"`),
  );

  return new NextResponse(html, {
    headers: { ...cabecalhosPrivados, "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function responderPdf(slug: SlugProposta, request: Request) {
  const bloqueio = await semAcesso(slug, request);
  if (bloqueio) return bloqueio;

  const pdf = await lerArquivoProposta(slug, "proposta-slides.pdf");
  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      ...cabecalhosPrivados,
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="proposta-slides.pdf"',
    },
  });
}
