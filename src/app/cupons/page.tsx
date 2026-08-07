import type { Metadata } from "next";
import { Heart } from "lucide-react";
import { SITE, siteUrl } from "@/config/site";
import { coupons } from "@/data/coupons";
import { CouponsCatalog } from "@/components/sections/CouponsCatalog";

const title = "Cupons de Desconto";
const description =
  "Confira os cupons, descontos, promoções e benefícios exclusivos compartilhados pela Priscila.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: siteUrl("/cupons/") },
  openGraph: {
    title: `${title} | ${SITE.name}`,
    description,
    url: siteUrl("/cupons/"),
    siteName: SITE.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary", title: `${title} | ${SITE.name}`, description },
};

export default function CuponsPage() {
  return (
    <div className="min-h-screen bg-cream pt-28">
      <div className="container-shell pb-16">
        <header className="max-w-2xl">
          <p className="eyebrow text-rose-700">Descontos exclusivos</p>
          <h1 className="mt-5 font-display text-5xl text-ink md:text-7xl">
            Meus Cupons{" "}
            <Heart className="inline size-10 fill-rose-700 text-rose-700 md:size-14" aria-hidden="true" />
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            Reuni aqui os meus descontos e benefícios favoritos para você economizar nas suas
            compras. Escolha sua loja preferida, copie o cupom e aproveite! 💕
          </p>
        </header>

        <CouponsCatalog coupons={coupons} />

        <p className="mx-auto mt-14 max-w-xl rounded-2xl border border-brown/12 bg-soft px-6 py-5 text-center text-xs leading-6 text-muted">
          Transparência: alguns links desta página são links de afiliados ou parcerias. Ao comprar
          através deles, posso receber uma pequena comissão — sem nenhum custo adicional para
          você. Obrigada por apoiar meu trabalho! 💕
        </p>
      </div>
    </div>
  );
}
