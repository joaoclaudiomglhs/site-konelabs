import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Arquivos cifrados das propostas, lidos pelas rotas em app/propostas no servidor.
  outputFileTracingIncludes: {
    "/propostas/**": ["./conteudo-privado/**"],
  },
  // Propostas nunca entram em buscadores.
  async headers() {
    return [
      {
        source: "/propostas/:caminho*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;
