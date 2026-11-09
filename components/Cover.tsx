"use client";

import { useEffect, useRef, useState } from "react";
import { m, type Variants } from "motion/react";

// Capa do projeto. Se a imagem ainda nao foi baixada (scripts/baixar-imagens.sh), mostra o nome do projeto.
// "variants" permite que o card pai anime a imagem (zoom no hover). Sem ela, a imagem fica estatica.
export default function Cover({
  src,
  alt,
  label,
  variants,
}: {
  src: string;
  alt: string;
  label: string;
  variants?: Variants;
}) {
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
        <m.img ref={ref} src={src} alt={alt} loading="lazy" variants={variants} onError={() => setFailed(true)} />
      )}
    </div>
  );
}
