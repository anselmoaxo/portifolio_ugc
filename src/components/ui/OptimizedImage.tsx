import Image, { type ImageProps } from "next/image";
import manifest from "@/generated/image-manifest.json";

type ManifestEntry = { width: number; height: number; blur?: string };

const instagramManifest = manifest.instagram as Record<string, ManifestEntry>;

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
}

/**
 * Wrapper de next/image que aplica automaticamente o blur placeholder
 * gerado por scripts/optimize-images.mjs (src/generated/image-manifest.json).
 */
export function OptimizedImage({ src, alt, placeholder, blurDataURL, ...props }: OptimizedImageProps) {
  const file = src.split("/").pop() ?? "";
  const entry = instagramManifest[file];

  const autoBlur = entry?.blur
    ? { placeholder: "blur" as const, blurDataURL: entry.blur }
    : {};

  return (
    <Image
      src={src}
      alt={alt}
      placeholder={placeholder ?? autoBlur.placeholder ?? "empty"}
      blurDataURL={blurDataURL ?? autoBlur.blurDataURL}
      {...props}
    />
  );
}
