import { Clientes, Contato, Faq, Hero, Projetos, Servicos, Sobre } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Servicos />
      <Projetos />
      <Clientes />
      <Sobre />
      <Faq />
      <Contato />
    </>
  );
}
