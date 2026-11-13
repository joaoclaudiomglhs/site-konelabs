import AcessoProposta, { metadadosAcesso } from "@/components/AcessoProposta";

export const metadata = metadadosAcesso("nac-ebony-completa", "/og/proposta-nac-ebony.png");

export default function Page() {
  return <AcessoProposta slug="nac-ebony-completa" />;
}
