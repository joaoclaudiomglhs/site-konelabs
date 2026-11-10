import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { cabecalhosPrivados, lerArquivoProposta, propostaAcesso, propostaCookie, tokenValido } from "@/lib/proposta";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const loja = await cookies();
  if (!tokenValido(loja.get(propostaCookie)?.value)) {
    return NextResponse.redirect(new URL(propostaAcesso, request.url), { status: 303, headers: cabecalhosPrivados });
  }

  const pdf = await lerArquivoProposta("proposta-slides.pdf");
  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      ...cabecalhosPrivados,
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="proposta-slides.pdf"',
    },
  });
}
