import { responderPdf } from "@/lib/propostaRotas";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return responderPdf("nac-ebony-completa", request);
}
