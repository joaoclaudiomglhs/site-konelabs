"use client";

import { useEffect, useRef, useState } from "react";
import Cover from "@/components/Cover";

// Midia principal do case. Video toca mudo e em loop; com movimento reduzido, fica pausado com controles.
export default function CaseMedia({ nome, capa, video }: { nome: string; capa: string; video?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (!mq.matches) ref.current?.play().catch(() => {});
  }, []);

  if (!video) return <Cover src={capa} alt={`Telas do projeto ${nome}`} label={nome} />;

  return (
    <div className="work-cover">
      <video
        ref={ref}
        src={video}
        poster={capa}
        muted
        loop
        playsInline
        controls={reduced}
        preload="metadata"
        aria-label={`Vídeo do projeto ${nome}`}
      />
    </div>
  );
}
