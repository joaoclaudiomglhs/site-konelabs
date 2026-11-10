"use client";

import { useEffect, useState } from "react";
import { cssCarregamento, marcaCarregamento } from "@/lib/carregamento";

// Tela de carregamento da home (ver lib/carregamento.ts). Aparece so na primeira carga da pagina:
// ao voltar para a home pela navegacao do site, ela nao aparece de novo.
let jaCarregou = false;

export default function PageLoader() {
  const [estado, setEstado] = useState<"visivel" | "saindo" | "fora">(() =>
    typeof window !== "undefined" && jaCarregou ? "fora" : "visivel",
  );

  useEffect(() => {
    if (estado !== "visivel") return;
    const sair = () => {
      jaCarregou = true;
      setEstado("saindo");
    };
    if (document.readyState === "complete") sair();
    else window.addEventListener("load", sair, { once: true });
    return () => window.removeEventListener("load", sair);
  }, [estado]);

  // Depois do fade (0,4 s), a tela sai do DOM.
  useEffect(() => {
    if (estado !== "saindo") return;
    const saida = setTimeout(() => setEstado("fora"), 450);
    return () => clearTimeout(saida);
  }, [estado]);

  if (estado === "fora") return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssCarregamento }} />
      <noscript>
        <style>{".kl-carregando{display:none}"}</style>
      </noscript>
      <div
        className={estado === "saindo" ? "kl-carregando kl-saindo" : "kl-carregando"}
        role="status"
        dangerouslySetInnerHTML={{ __html: marcaCarregamento }}
      />
    </>
  );
}
