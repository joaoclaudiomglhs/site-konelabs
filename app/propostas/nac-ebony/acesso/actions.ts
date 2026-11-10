"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { propostaCaminho, propostaCookie, propostaCookieDias, senhaConfere, tokenAcesso } from "@/lib/proposta";

export type EstadoAcesso = { erro: string | null };

export async function entrarNaProposta(_anterior: EstadoAcesso, dados: FormData): Promise<EstadoAcesso> {
  const senha = String(dados.get("senha") ?? "");
  const token = tokenAcesso();

  if (!token) {
    return { erro: "O acesso a esta proposta está indisponível no momento. Fale com a Konelabs pelo e-mail abaixo." };
  }

  if (!senha || !senhaConfere(senha)) {
    // Pausa curta para deixar tentativas automaticas em sequencia mais lentas.
    await new Promise((r) => setTimeout(r, 700));
    return { erro: "Senha incorreta. Confira e tente de novo." };
  }

  const loja = await cookies();
  loja.set(propostaCookie, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: propostaCaminho,
    maxAge: 60 * 60 * 24 * propostaCookieDias,
  });

  redirect(propostaCaminho);
}
