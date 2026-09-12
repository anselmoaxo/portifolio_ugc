import { resolveSiteOrigin } from "../lib/site-origin.ts";

export const siteIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

export const SITE = {
  personName: "Priscila Almeida",
  name: "Blog da Priscila",
  title: "Priscila | Influenciadora e Criadora de Conteúdo UGC",
  description:
    "Conheça o portfólio UGC da Priscila, seus conteúdos, vídeos e trabalhos com marcas.",
  url: resolveSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL, siteIndexable),
} as const;

export function siteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalized}`;
}
