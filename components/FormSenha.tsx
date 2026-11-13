"use client";

import { useActionState, useState } from "react";
import { ArrowRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import type { EstadoAcesso } from "@/lib/propostaAcoes";

export default function FormSenha({
  acao,
}: {
  acao: (anterior: EstadoAcesso, dados: FormData) => Promise<EstadoAcesso>;
}) {
  const [estado, enviar, enviando] = useActionState(acao, { erro: null });
  const [visivel, setVisivel] = useState(false);

  return (
    <form action={enviar} className="senha-form" noValidate>
      <label htmlFor="senha" className="senha-label">
        Senha
      </label>
      <div className="senha-campo">
        <input
          id="senha"
          name="senha"
          type={visivel ? "text" : "password"}
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={estado.erro ? true : undefined}
          aria-describedby={estado.erro ? "senha-erro" : undefined}
        />
        <button
          type="button"
          className="senha-ver"
          onClick={() => setVisivel((v) => !v)}
          aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visivel}
        >
          {visivel ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      </div>
      <p id="senha-erro" className="senha-erro" role="alert">
        {estado.erro}
      </p>
      <button type="submit" className="btn btn-primary senha-enviar" disabled={enviando}>
        {enviando ? "Verificando..." : "Acessar proposta"}
        {enviando ? (
          <LoaderCircle className="btn-icon senha-girando" size={18} aria-hidden="true" />
        ) : (
          <ArrowRight className="btn-icon icon-right" size={18} aria-hidden="true" />
        )}
      </button>
    </form>
  );
}
