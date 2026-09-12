import "server-only";
import { getSanityClient } from "./client";

export type AdminPortfolioItem = {
  id: string;
  title: string;
  shortDescription?: string;
  externalUrl?: string;
  categoryId?: string;
  category: string;
  imageUrl?: string;
  imageAlt?: string;
  published: boolean;
  featured: boolean;
  order: number;
};

export type AdminCategory = { id: string; name: string };

export type AdminService = {
  id: string;
  name: string;
  description: string;
  icon: "video" | "camera" | "sparkles";
  benefits: string[];
  order: number;
  published: boolean;
};

export type AdminBrand = {
  id: string;
  name: string;
  url?: string;
  imageUrl?: string;
  imageAlt?: string;
  order: number;
  published: boolean;
};

export type AdminSettings = {
  name: string;
  title: string;
  subtitle?: string;
  description: string;
  whatsapp: string;
  email: string;
  instagram?: string;
  instagramHandle?: string;
  tiktok?: string;
  whatsappMessage: string;
  seoTitle: string;
  seoDescription: string;
  sectionVisibility: Record<string, boolean>;
  heroImageUrl?: string;
  heroImageAlt?: string;
  profileImageUrl?: string;
  profileImageAlt?: string;
  ogImageUrl?: string;
  ogImageAlt?: string;
};

export async function getAdminContent() {
  const client = getSanityClient();
  if (!client) return { items: [] as AdminPortfolioItem[], categories: [] as AdminCategory[], services: [] as AdminService[], brands: [] as AdminBrand[], settings: null as AdminSettings | null, counts: { portfolio: 0, brands: 0, services: 0 } };

  return client.fetch<{
    items: AdminPortfolioItem[];
    categories: AdminCategory[];
    services: AdminService[];
    brands: AdminBrand[];
    settings: AdminSettings | null;
    counts: { portfolio: number; brands: number; services: number };
  }>(`{
    "items": *[_type == "portfolioItem"] | order(order asc, _updatedAt desc)[0...60]{
      "id": _id, title, shortDescription, externalUrl, "categoryId": category._ref,
      "category": category->name, "imageUrl": mainImage.asset->url, "imageAlt": mainImage.alt,
      "published": coalesce(published, false), "featured": coalesce(featured, false), "order": coalesce(order, 0)
    },
    "categories": *[_type == "category"] | order(order asc, name asc){"id": _id, name},
    "services": *[_type == "service"] | order(order asc, name asc){
      "id": _id, name, description, icon, "benefits": coalesce(benefits, []),
      "order": coalesce(order, 0), "published": coalesce(published, false)
    },
    "brands": *[_type == "brand"] | order(order asc, name asc){
      "id": _id, name, url, "imageUrl": logo.asset->url, "imageAlt": logo.alt,
      "order": coalesce(order, 0), "published": coalesce(published, false)
    },
    "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]{
      name, title, subtitle, description, whatsapp, email, instagram, instagramHandle, tiktok,
      whatsappMessage, seoTitle, seoDescription, sectionVisibility,
      "heroImageUrl": heroImage.asset->url, "heroImageAlt": heroImage.alt,
      "profileImageUrl": profileImage.asset->url, "profileImageAlt": profileImage.alt,
      "ogImageUrl": ogImage.asset->url, "ogImageAlt": ogImage.alt
    },
    "counts": {
      "portfolio": count(*[_type == "portfolioItem"]),
      "brands": count(*[_type == "brand"]),
      "services": count(*[_type == "service"])
    }
  }`);
}

export function getSanityWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim() || process.env.SANITY_API_TOKEN?.trim();
  const client = getSanityClient();
  return token && client ? client.withConfig({ token, useCdn: false, perspective: "drafts" }) : null;
}

export const isSanityWriteConfigured = Boolean(
  process.env.SANITY_API_WRITE_TOKEN?.trim() || process.env.SANITY_API_TOKEN?.trim(),
);
