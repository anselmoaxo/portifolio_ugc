export const SITE = {
  name: "Blog da Priscila",
  title: "Priscila | Criadora de Conteúdo UGC",
  description:
    "Conheça o portfólio UGC da Priscila, seus conteúdos, vídeos e trabalhos com marcas.",
  url: "https://anselmoaxo.github.io/portifolio_ugc",
} as const;

export function siteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalized}`;
}
