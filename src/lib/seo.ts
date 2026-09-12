import type { Metadata } from "next";

export function seoTitle(value: string, fallback: string): string {
  const title = value.trim() || fallback;
  return title.length <= 60 ? title : `${title.slice(0, 57).trimEnd()}?`;
}

export function seoDescription(value: string, fallback: string): string {
  const description = value.trim() || fallback;
  return description.length <= 160 ? description : `${description.slice(0, 157).trimEnd()}?`;
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  url: string;
  image: string;
  author: string;
  publishedAt: string;
  modifiedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: seoTitle(input.title, input.title),
    description: seoDescription(input.description, input.description),
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
    image: [input.image],
    author: { "@type": "Person", name: input.author },
    datePublished: input.publishedAt,
    dateModified: input.modifiedAt || input.publishedAt,
  } as const;
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\u003c");
}

export function metadataForPage(input: {
  title: string;
  description: string;
  canonical: string;
  siteName: string;
  image?: string;
}): Metadata {
  const title = seoTitle(input.title, input.siteName);
  const description = seoDescription(input.description, input.siteName);
  return {
    title,
    description,
    alternates: { canonical: input.canonical },
    openGraph: {
      title,
      description,
      url: input.canonical,
      siteName: input.siteName,
      locale: "pt_BR",
      type: "website",
      ...(input.image ? { images: [{ url: input.image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: { card: input.image ? "summary_large_image" : "summary", title, description, ...(input.image ? { images: [input.image] } : {}) },
  };
}
