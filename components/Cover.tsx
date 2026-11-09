"use client";

import { useEffect, useRef, useState } from "react";

// Capa do projeto. Se a imagem ainda nao foi baixada (scripts/baixar-imagens.sh), mostra o nome do projeto.
export default function Cover({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div className="work-cover">
      {failed ? (
        <div className="cover-fallback" aria-hidden="true">
          {label}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img ref={ref} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      )}
    </div>
  );
}
