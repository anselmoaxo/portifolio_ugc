// Site content edited through the admin panel (/admin/). Each JSON file in this
// folder is a collection in public/admin/config.yml; saving there commits the
// file to GitHub and the Pages workflow rebuilds the site.
import { SITE } from "@/config/site";
import { partnerBrands } from "@/data/brands";
import { portfolioVideos } from "@/data/portfolio";
import type { HomeContent, ServiceItem, SiteSettings } from "@/types/cms";
import servicesContent from "./services.json" with { type: "json" };
import site from "./site.json" with { type: "json" };

export type HeroContent = typeof site.hero;
export type AboutContent = typeof site.about;

const settings: SiteSettings = {
  name: SITE.name,
  title: site.seo.title,
  subtitle: site.hero.eyebrow,
  description: site.seo.description,
  heroImage: site.hero.image,
  heroImageAlt: site.hero.imageAlt,
  profileImage: site.about.image,
  profileImageAlt: site.about.imageAlt,
  ...site.contact,
  seoTitle: site.seo.title,
  seoDescription: site.seo.description,
  ogImage: site.seo.image,
  sectionVisibility: site.sections,
};

const homeContent: HomeContent = {
  settings,
  portfolio: portfolioVideos,
  services: servicesContent.items as ServiceItem[],
  brands: partnerBrands.map((brand, order) => ({ ...brand, order })),
  source: "local",
};

export const heroContent: HeroContent = site.hero;
export const aboutContent: AboutContent = site.about;

export async function getHomeContent(): Promise<HomeContent> {
  return homeContent;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return settings;
}
