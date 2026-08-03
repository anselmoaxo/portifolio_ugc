/**
 * Fonte única de dados dos conteúdos do Instagram exibidos no site.
 * Gerado/atualizado automaticamente por scripts/sync-instagram.mjs.
 * Itens com `pinned: true` nunca são removidos pela sincronização.
 */

export interface InstagramPost {
  shortcode: string;
  thumbnail: string;
  alt: string;
  pinned?: boolean;
}

export interface InstagramReel {
  id: number;
  shortcode: string;
  title: string;
  thumbnail: string;
  pinned?: boolean;
}

const ig = (file: string) => `/images/instagram/${file}`;

export const instagramGallery: InstagramPost[] = [
  { shortcode: "DbWQmS3yZYe", thumbnail: ig("2026-07-28_19-15-28_UTC.webp"), alt: "Conteúdo da Priscila sobre antioxidante e skincare", pinned: true },
  { shortcode: "DbT5QldSJZa", thumbnail: ig("2026-07-27_21-11-21_UTC.webp"), alt: "Conteúdo da Priscila sobre seu cantinho de criação", pinned: true },
  { shortcode: "DbMLL61SkA-", thumbnail: ig("2026-07-24_21-15-20_UTC.webp"), alt: "Conteúdo da Priscila com produto Maybelline", pinned: true },
  { shortcode: "DbHbsxFp5Bs", thumbnail: ig("2026-07-23_01-01-35_UTC.webp"), alt: "Conteúdo da Priscila com produto Vizzela", pinned: true },
  { shortcode: "DbEBocqRYHS", thumbnail: ig("2026-07-21_17-21-56_UTC.webp"), alt: "Conteúdo da Priscila com produto Kérastase", pinned: true },
  { shortcode: "Da_awlwy0Od", thumbnail: ig("2026-07-19_22-18-47_UTC.webp"), alt: "Registro de lifestyle publicado por Priscila" },
  { shortcode: "Da854ncSwa1", thumbnail: ig("2026-07-18_22-55-06_UTC.webp"), alt: "Conteúdo de maquiagem com combinação de produtos para os lábios" },
  { shortcode: "Da8Jp7RRocw", thumbnail: ig("2026-07-18_15-53-25_UTC.webp"), alt: "Produtos Vizzela escolhidos por Priscila" },
  { shortcode: "Da3Zw8qGapI", thumbnail: ig("2026-07-16_19-34-18_UTC_1.webp"), alt: "Conteúdo sobre cuidados com o sorriso" },
  { shortcode: "Da0ezpIRLvK", thumbnail: ig("2026-07-15_16-23-34_UTC.webp"), alt: "Conteúdo sobre cuidados com creme dental" },
  { shortcode: "Daxz2LpRWUg", thumbnail: ig("2026-07-14_15-29-13_UTC.webp"), alt: "Conteúdo sobre perfume capilar" },
  { shortcode: "Da-0ZYLRmGa", thumbnail: ig("2026-07-19_16-43-03_UTC.webp"), alt: "Conteúdo de moda publicado por Priscila" },
];

export const instagramReels: InstagramReel[] = [
  { id: 1, shortcode: "DbWQmS3yZYe", thumbnail: ig("2026-07-28_19-15-28_UTC.webp"), title: "Antioxidante na rotina de skincare", pinned: true },
  { id: 2, shortcode: "DbT5QldSJZa", thumbnail: ig("2026-07-27_21-11-21_UTC.webp"), title: "Cantinho da blogueira", pinned: true },
  { id: 3, shortcode: "DbQ5uumR_eK", thumbnail: ig("2026-07-26_17-16-03_UTC.webp"), title: "CeraVe Creme Hidratante", pinned: true },
  { id: 4, shortcode: "DbMLL61SkA-", thumbnail: ig("2026-07-24_21-15-20_UTC.webp"), title: "Trend Bubble com Maybelline", pinned: true },
  { id: 5, shortcode: "DbHbsxFp5Bs", thumbnail: ig("2026-07-23_01-01-35_UTC.webp"), title: "Meu pandinha da Vizzela", pinned: true },
  { id: 6, shortcode: "DbEBocqRYHS", thumbnail: ig("2026-07-21_17-21-56_UTC.webp"), title: "Drop da Kérastase", pinned: true },
];
