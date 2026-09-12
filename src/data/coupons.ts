export type CouponCategory =
  | "Beleza"
  | "Moda"
  | "Casa"
  | "Saúde e Bem-estar"
  | "Marketplace"
  | "Outros";

export type Coupon = {
  id: string;
  name: string;
  description: string;
  coupon: string | null;
  url: string;
  category: CouponCategory;
  featured?: boolean;
};

/**
 * Central de cupons da Priscila.
 *
 * ⚠️ EXEMPLOS — substitua pelos links reais do Instagram
 * (https://www.instagram.com/blogdapriscilaa/links/).
 * Para adicionar um parceiro, copie um bloco abaixo.
 * Quando não houver código de cupom, use `coupon: null`.
 */
export const coupons: readonly Coupon[] = [
  {
    id: "exemplo-beleza",
    name: "Loja de Beleza (exemplo)",
    description: "Desconto em produtos de skincare e maquiagem selecionados.",
    coupon: "PRISCILA10",
    url: "https://exemplo.com.br/?afiliado=priscila",
    category: "Beleza",
    featured: true,
  },
  {
    id: "exemplo-moda",
    name: "Loja de Moda (exemplo)",
    description: "Looks e acessórios com benefício exclusivo da comunidade.",
    coupon: "BLOGDAPRISCILA",
    url: "https://exemplo.com.br/moda?ref=priscila",
    category: "Moda",
    featured: true,
  },
  {
    id: "exemplo-marketplace",
    name: "Marketplace (exemplo)",
    description: "Achadinhos com desconto e frete especial no link.",
    coupon: null,
    url: "https://exemplo.com.br/ofertas?ref=priscila",
    category: "Marketplace",
  },
] as const;
