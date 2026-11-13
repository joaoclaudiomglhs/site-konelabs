import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { cabecalhosPrivados, lerArquivoProposta, propostaNacEbonyCompleta as proposta, tokenValido } from "@/lib/proposta";
import { comCarregamento } from "@/lib/carregamento";

export const dynamic = "force-dynamic";

// Entrega a proposta completa em HTML so com o cookie de acesso; sem ele, leva para a tela de senha.
export async function GET(request: Request) {
  const loja = await cookies();
  if (!tokenValido(loja.get(proposta.cookie)?.value, proposta)) {
    return NextResponse.redirect(new URL(proposta.acesso, request.url), { status: 303, headers: cabecalhosPrivados });
  }

  // O HTML aponta para o PDF com caminho relativo; aqui ele passa a apontar para a rota protegida.
  const html = comCarregamento(
    (await lerArquivoProposta("index.html", proposta))
      .toString("utf8")
      .replace(/href="[^"/:#]+\.pdf"/g, `href="${proposta.caminho}/proposta-slides.pdf"`),
  );

  return new NextResponse(html, {
    headers: { ...cabecalhosPrivados, "Content-Type": "text/html; charset=utf-8" },
  });
}
