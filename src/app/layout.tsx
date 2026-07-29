import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SITE, siteUrl } from "@/config/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  alternates: { canonical: siteUrl() },
  openGraph: { title: SITE.title, description: SITE.description, url: siteUrl(), siteName: SITE.name, locale: "pt_BR", type: "website", images: [{ url: siteUrl("/og-image.png"), width: 1200, height: 630, alt: "Priscila, criadora de conteúdo UGC" }] },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description, images: [siteUrl("/og-image.png")] },
  keywords: ["portfólio UGC", "mídia kit", "criadora de conteúdo", "influenciadora digital"],
  icons: { icon: siteUrl("/icon.svg"), shortcut: siteUrl("/icon.svg") },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full">
        <a href="#conteudo-principal" className="skip-link">Pular para o conteúdo principal</a>
        <Header />
        <main id="conteudo-principal">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
