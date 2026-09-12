import type { NextConfig } from "next";
import { securityHeaders, sanityImagePatterns } from "./src/lib/security-headers.ts";
import { resolveSiteOrigin } from "./src/lib/site-origin.ts";

const cmsEnabled = process.env.SITE_CMS_ENABLED === "true";
const indexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";
resolveSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL, indexable);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  experimental: { optimizePackageImports: ["lucide-react"] },
  images: {
    remotePatterns: sanityImagePatterns(cmsEnabled, process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, process.env.NEXT_PUBLIC_SANITY_DATASET || "development"),
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders(process.env.NODE_ENV !== "production", cmsEnabled, indexable) },
      ...["admin", "login", "recuperar-senha", "redefinir-senha", "studio", "auth", "api"].map((path) => ({
        source: `/${path}/:path*`,
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }, { key: "Cache-Control", value: "private, no-store" }],
      })),
    ];
  },
};

export default nextConfig;
