import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  cabecalhosPrivados,
  lerArquivoProposta,
  propostaAcesso,
  propostaCaminho,
  propostaCookie,
  tokenValido,
} from "@/lib/proposta";

export const dynamic = "force-dynamic";

// Entrega a proposta em HTML so com o cookie de acesso; sem ele, leva para a tela de senha.
export async function GET(request: Request) {
  const loja = await cookies();
  if (!tokenValido(loja.get(propostaCookie)?.value)) {
    return NextResponse.redirect(new URL(propostaAcesso, request.url), { status: 303, headers: cabecalhosPrivados });
  }

  // O HTML aponta para o PDF com caminho relativo; aqui ele passa a apontar para a rota protegida.
  const html = (await lerArquivoProposta("index.html"))
    .toString("utf8")
    .replaceAll('href="proposta-slides.pdf"', `href="${propostaCaminho}/proposta-slides.pdf"`);

  return new NextResponse(html, {
    headers: { ...cabecalhosPrivados, "Content-Type": "text/html; charset=utf-8" },
  });
}
