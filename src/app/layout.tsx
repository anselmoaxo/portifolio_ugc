import type { Metadata } from "next";
import { cmsEnabled } from "@/config/features";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SITE, siteUrl, siteIndexable } from "@/config/site";
import { seoDescription, seoTitle } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/content";
import { sanityEnv } from "@/sanity/env";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(SITE.url),
    robots: { index: siteIndexable, follow: siteIndexable },
  title: { default: seoTitle(settings.seoTitle, settings.name), template: `%s | ${settings.name}` },
  description: seoDescription(settings.seoDescription, settings.description),
  alternates: { canonical: siteUrl() },
  openGraph: { title: settings.seoTitle, description: settings.seoDescription, url: siteUrl(), siteName: settings.name, locale: "pt_BR", type: "website", images: [{ url: settings.ogImage, width: 1200, height: 630, alt: settings.name }] },
  twitter: { card: "summary_large_image", title: settings.seoTitle, description: settings.seoDescription, images: [settings.ogImage] },
  keywords: ["portfólio UGC", "mídia kit", "criadora de conteúdo", "influenciadora digital"],
  icons: { icon: siteUrl("/icon.svg"), shortcut: siteUrl("/icon.svg") },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ isEnabled }, settings] = await Promise.all([cmsEnabled ? draftMode() : Promise.resolve({ isEnabled: false }), getSiteSettings()]);
  return (
    <html data-scroll-behavior="smooth" lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full">
        <a href="#conteudo-principal" className="skip-link">Pular para o conteúdo principal</a>
        <Header settings={settings} />
        <main id="conteudo-principal">{children}</main>
        <Footer settings={settings} />
        <WhatsAppButton settings={settings} />
        {isEnabled && sanityEnv.configured && <VisualEditing />}
      </body>
    </html>
  );
}
