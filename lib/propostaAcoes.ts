"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  caminhoProposta,
  cookieProposta,
  propostaCookieDias,
  propostas,
  senhaConfere,
  tokenAcesso,
  type SlugProposta,
} from "@/lib/proposta";

export type EstadoAcesso = { erro: string | null };

// A tela de senha liga o slug com bind; aqui ele e conferido contra a lista de propostas.
export async function entrarNaProposta(
  slug: SlugProposta,
  _anterior: EstadoAcesso,
  dados: FormData,
): Promise<EstadoAcesso> {
  if (!Object.hasOwn(propostas, slug)) return { erro: "Proposta não encontrada." };

  const senha = String(dados.get("senha") ?? "");
  const token = tokenAcesso(slug);

  if (!token) {
    return { erro: "O acesso a esta proposta está indisponível no momento. Fale com a Konelabs pelo e-mail abaixo." };
  }

  if (!senha || !senhaConfere(slug, senha)) {
    // Pausa curta para deixar tentativas automaticas em sequencia mais lentas.
    await new Promise((r) => setTimeout(r, 700));
    return { erro: "Senha incorreta. Confira e tente de novo." };
  }

  const loja = await cookies();
  loja.set(cookieProposta(slug), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: caminhoProposta(slug),
    maxAge: 60 * 60 * 24 * propostaCookieDias,
  });

  redirect(caminhoProposta(slug));
}
