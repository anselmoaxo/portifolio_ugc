import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl(), lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: siteUrl("/portfolio/"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: siteUrl("/politica-de-privacidade/"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
