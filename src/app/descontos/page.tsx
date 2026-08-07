import { Heart } from "lucide-react";
import type { Metadata } from "next";
import { DiscountsCatalog } from "@/components/sections/DiscountsCatalog";
import { SITE, siteUrl } from "@/config/site";
import { discounts } from "@/data/discounts";

const title = "Descontos da Pri";
const description =
  "Cupons, ofertas e links especiais da Priscila para você economizar nas suas compras.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: siteUrl("/descontos/") },
  openGraph: {
    title: `${title} | ${SITE.name}`,
    description,
    url: siteUrl("/descontos/"),
    siteName: SITE.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary", title: `${title} | ${SITE.name}`, description },
};

export default function DescontosPage() {
  return (
    <div className="min-h-screen bg-cream pt-28">
      <div className="container-shell pb-16">
        <header className="max-w-2xl">
          <p className="eyebrow text-rose-700">Cupons, ofertas e achadinhos</p>
          <h1 className="mt-5 font-display text-5xl text-ink md:text-7xl">
            Descontos da Pri{" "}
            <Heart className="inline size-10 fill-rose-700 text-rose-700 md:size-14" aria-hidden="true" />
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            Reuni aqui meus cupons, ofertas e links especiais para você economizar nas suas
            compras. Escolha sua marca favorita e aproveite!
          </p>
        </header>

        <DiscountsCatalog discounts={discounts} />

        <p className="mx-auto mt-14 max-w-xl rounded-2xl border border-brown/12 bg-soft px-6 py-5 text-center text-xs leading-6 text-muted">
          Alguns links desta página são links de afiliados. Ao comprar por eles, posso receber uma
          comissão, sem custo adicional para você. 💕
        </p>
      </div>
    </div>
  );
}
