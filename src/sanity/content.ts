import { CONTACT, whatsappDefaultMessage } from "@/config/contact";
import { SITE } from "@/config/site";
import { partnerBrands } from "@/data/brands";
import { portfolioVideos } from "@/data/portfolio";
import { getSanityClient } from "./client";
import { brandsQuery, portfolioQuery, servicesQuery, siteSettingsQuery } from "./queries";
import type { BrandItem, HomeContent, ServiceItem, SiteSettings } from "@/types/cms";
import type { PortfolioVideo } from "@/types/content";
import { cache } from "react";
import { cmsEnabled } from "@/config/features";

const localSettings: SiteSettings = {
  name: SITE.name,
  title: SITE.title,
  subtitle: "Influenciadora e criadora de conteúdo UGC",
  description: SITE.description,
  heroImage: "/images/foto_inicio.webp",
  profileImage: "/images/foto_sobremin.jpeg",
  whatsapp: CONTACT.whatsapp,
  email: CONTACT.email,
  instagram: CONTACT.instagram,
  instagramHandle: CONTACT.instagramHandle,
  tiktok: CONTACT.tiktok,
  whatsappMessage: whatsappDefaultMessage,
  seoTitle: SITE.title,
  seoDescription: SITE.description,
  ogImage: "/og-image.png",
  sectionVisibility: {
    about: true,
    metrics: true,
    services: true,
    portfolio: true,
    brands: true,
    contact: true,
  },
};

const localServices: ServiceItem[] = [
  { id: "video-ugc", name: "Vídeos UGC", description: "Produção de vídeos com apresentação, uso e experiência com produtos.", icon: "video", order: 1 },
  { id: "fotografia-ugc", name: "Fotografia UGC", description: "Fotografias de produtos em composições relacionadas à rotina e ao autocuidado.", icon: "camera", order: 2 },
];

export const localHomeContent: HomeContent = {
  settings: localSettings,
  portfolio: portfolioVideos,
  services: localServices,
  brands: partnerBrands.map((brand, order) => ({ ...brand, order })),
  source: "local",
};

function withTimeout<T>(promise: Promise<T>, milliseconds = 3500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("CMS timeout")), milliseconds)),
  ]);
}

export const getHomeContent = cache(async (): Promise<HomeContent> => {
  if (!cmsEnabled) return localHomeContent;
  // Static export: content is read once at build time; a Sanity webhook
  // triggers a new build when something is published.
  const client = getSanityClient();
  if (!client) return localHomeContent;

  try {
    const [settings, portfolio, services, brands] = await withTimeout(Promise.all([
      client.fetch<Partial<SiteSettings> | null>(siteSettingsQuery),
      client.fetch<PortfolioVideo[]>(portfolioQuery),
      client.fetch<ServiceItem[]>(servicesQuery),
      client.fetch<BrandItem[]>(brandsQuery),
    ]));

    // An empty dataset (content not migrated yet) must not blank the public site.
    if (!settings) return localHomeContent;

    return {
      settings: { ...localSettings, ...settings },
      portfolio: portfolio ?? [],
      services: services ?? [],
      brands: brands ?? [],
      source: "sanity",
    };
  } catch (error) {
    console.error("CMS indisponível; usando conteúdo local.", error instanceof Error ? error.message : "erro desconhecido");
    return localHomeContent;
  }
});

export async function getSiteSettings(): Promise<SiteSettings> {
  return (await getHomeContent()).settings;
}
