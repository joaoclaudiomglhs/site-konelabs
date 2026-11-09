"use client";

import { useEffect, useRef, useState } from "react";

// Logo do cliente. Enquanto o arquivo nao existir em public/clientes, mostra o nome em texto.
export default function ClientLogo({ nome, logo }: { nome: string; logo: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <span>{nome}</span>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={logo} alt={nome} loading="lazy" onError={() => setFailed(true)} />;
}
