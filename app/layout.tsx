import type { Metadata, Viewport } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/sora";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import MotionProvider from "@/components/MotionProvider";
import { hero } from "@/content/site";
import { ogImagem, siteNome, siteTitulo, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitulo,
    template: "%s | Konelabs",
  },
  description: hero.apoio,
  applicationName: siteNome,
  alternates: { canonical: "/" },
  // Favicon e icone da Apple vem de app/favicon.ico, app/icon.svg e app/apple-icon.png (icone oficial da marca).
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteNome,
    title: siteTitulo,
    description: hero.apoio,
    // Mesma imagem de compartilhamento do site atual em Framer.
    images: [ogImagem],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitulo,
    description: hero.apoio,
    images: [ogImagem.url],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <SmoothScroll />
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
