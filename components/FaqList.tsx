"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Plus } from "lucide-react";
import { springUi } from "@/lib/motion";
import { RevealGroup, RevealItem } from "@/components/Reveal";

type Item = { p: string; r: string };

// Abertura suave: a resposta cresce em altura com opacidade, e o icone gira com mola.
// Usa botao com aria-expanded e aria-controls; com reduced motion o MotionConfig remove o movimento.
const abrir = {
  height: { type: "spring", stiffness: 260, damping: 32, mass: 0.9 },
  opacity: { duration: 0.25, delay: 0.05 },
} as const;
const fechar = {
  height: { type: "spring", stiffness: 320, damping: 36 },
  opacity: { duration: 0.15 },
} as const;

function FaqItem({ item }: { item: Item }) {
  const [aberto, setAberto] = useState(false);
  const id = useId();
  const painel = `${id}-resposta`;
  const botao = `${id}-pergunta`;

  return (
    <div className="faq-item" data-open={aberto}>
      <h3 className="faq-q">
        <button
          type="button"
          id={botao}
          className="faq-summary"
          aria-expanded={aberto}
          aria-controls={painel}
          onClick={() => setAberto((v) => !v)}
        >
          {item.p}
          <span className="faq-icon" aria-hidden="true">
            {/* So o sinal gira; a moldura do icone fica parada */}
            <m.span className="faq-icon-glyph" animate={{ rotate: aberto ? 45 : 0 }} transition={springUi}>
              <Plus size={20} />
            </m.span>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {aberto && (
          <m.div
            id={painel}
            role="region"
            aria-labelledby={botao}
            className="faq-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: abrir }}
            exit={{ height: 0, opacity: 0, transition: fechar }}
          >
            <p className="faq-answer">{item.r}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqList({ itens }: { itens: Item[] }) {
  return (
    <RevealGroup className="faq-list">
      {itens.map((f) => (
        <RevealItem key={f.p}>
          <FaqItem item={f} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
