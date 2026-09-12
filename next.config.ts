import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  trailingSlash: true,
  experimental: { optimizePackageImports: ["lucide-react"] },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
