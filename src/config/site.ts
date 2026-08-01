export const SITE = {
  name: "Blog da Priscila",
  title: "Priscila | Influenciadora e Criadora de Conteúdo UGC",
  description:
    "Conheça o portfólio UGC da Priscila, seus conteúdos, vídeos e trabalhos com marcas.",
  url: "https://blogdapriscila.com.br",
} as const;

export function siteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalized}`;
}
