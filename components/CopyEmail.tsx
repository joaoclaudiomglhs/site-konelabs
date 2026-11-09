"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    window.setTimeout(() => setStatus("idle"), 2400);
  }

  return (
    <>
      <button type="button" className="copy-btn" data-copied={status === "copied"} onClick={copy}>
        {status === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        {status === "copied" ? "E-mail copiado" : status === "error" ? "Não foi possível copiar" : "Copiar e-mail"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {status === "copied" ? "E-mail copiado" : status === "error" ? "Não foi possível copiar. Selecione o endereço e copie manualmente." : ""}
      </span>
    </>
  );
}
