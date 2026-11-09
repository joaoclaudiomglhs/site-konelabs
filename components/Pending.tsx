// Bloco sinalizado para conteudo que ainda nao existe. Nao inventar texto: preencher em content/site.ts.
export default function Pending({ campo, dica }: { campo: string; dica: string }) {
  return (
    <div className="pending" role="note">
      <p className="pending-title">[{campo} pendente]</p>
      <p>{dica}</p>
    </div>
  );
}
