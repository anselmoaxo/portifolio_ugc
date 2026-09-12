export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { siteUrl, siteIndexable } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  if (!siteIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: siteUrl("/sitemap.xml") };
}
