import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/sora";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import MotionProvider from "@/components/MotionProvider";
import { hero } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://konelabs.com.br"),
  title: {
    default: "Konelabs | Sites e produtos digitais estratégicos",
    template: "%s | Konelabs",
  },
  description: hero.apoio,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Konelabs",
    images: ["/og-image.png"],
  },
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
