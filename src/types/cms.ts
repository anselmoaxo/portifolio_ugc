import type { PortfolioVideo } from "./content";

export type SiteSettings = {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroImageAlt?: string;
  profileImageAlt?: string;
  profileImage: string;
  whatsapp: string;
  email: string;
  instagram: string;
  instagramHandle: string;
  tiktok: string;
  whatsappMessage: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  sectionVisibility: Record<string, boolean>;
};

export type ServiceItem = {
  id: string;
  name: string;
  description: string;
  icon: "video" | "camera" | "sparkles";
  benefits?: string[];
  order?: number;
};

export type BrandItem = {
  id: string;
  name: string | null;
  image: string;
  alt?: string;
  url?: string;
  order?: number;
};

export type HomeContent = {
  settings: SiteSettings;
  portfolio: PortfolioVideo[];
  services: ServiceItem[];
  brands: BrandItem[];
  source: "sanity" | "local";
};

