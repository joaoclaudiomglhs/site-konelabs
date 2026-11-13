import { responderProposta } from "@/lib/propostaRotas";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return responderProposta("nac-ebony", request);
}
