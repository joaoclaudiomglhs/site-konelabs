import type { Transition } from "motion/react";

// Molas compartilhadas por todo o site, para que o movimento seja consistente.
// Entrada de conteudo: suave e sem quique.
export const springReveal: Transition = { type: "spring", stiffness: 140, damping: 22, mass: 0.8 };

// Interacoes de hover e foco: resposta mais lenta e amortecida, sem oscilar.
export const springHover: Transition = { type: "spring", stiffness: 120, damping: 20, mass: 0.6 };

// Abrir e fechar elementos de interface, como o menu mobile.
export const springUi: Transition = { type: "spring", stiffness: 380, damping: 34 };

// Intervalo entre itens relacionados na entrada escalonada.
export const staggerStep = 0.07;
