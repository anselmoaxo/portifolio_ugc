import type { MetadataRoute } from "next";
import { siteUrl, siteIndexable } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteIndexable) return [];
  return [
    { url: siteUrl(), changeFrequency: "monthly", priority: 1 },
    { url: siteUrl("/portfolio/"), changeFrequency: "monthly", priority: 0.8 },
    { url: siteUrl("/descontos/"), changeFrequency: "weekly", priority: 0.7 },
    { url: siteUrl("/cupons/"), changeFrequency: "weekly", priority: 0.7 },
    { url: siteUrl("/politica-de-privacidade/"), changeFrequency: "yearly", priority: 0.3 },
  ];
}
