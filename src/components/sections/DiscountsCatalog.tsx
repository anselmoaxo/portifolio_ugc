"use client";

import { Check, Copy, ExternalLink, Sparkles, Tag } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { Discount } from "@/data/discounts";

const buttonLabels: Record<Discount["type"], string> = {
  coupon: "Usar desconto",
  affiliate: "Ver ofertas",
  store: "Visitar loja",
  offer: "Ver benefício",
};

const categoryOrder = [
  "Favoritos",
  "Achadinhos",
  "Beleza",
  "Cabelos",
  "Maquiagem",
  "Skincare",
  "Saúde & Beleza",
  "Moda",
  "Outros",
];

function DiscountCard({ discount, featured = false }: { discount: Discount; featured?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copyCoupon() {
    if (!discount.coupon) return;
    await navigator.clipboard.writeText(discount.coupon);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(88,58,47,.15)] ${
        featured
          ? "border-rose-400/50 shadow-[0_14px_40px_rgba(163,95,80,.18)]"
          : "border-brown/12 shadow-[0_8px_30px_rgba(88,58,47,.08)]"
      }`}
    >
      {featured && (
        <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-rose-700 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white">
          <Sparkles size={11} /> Destaque
        </span>
      )}

      <p className="eyebrow pr-24 text-rose-700">{discount.brand}</p>
      <h3 className="mt-3 font-display text-2xl leading-tight text-ink md:text-3xl">
        {discount.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{discount.description}</p>
      <span className="mt-5 w-fit rounded-full border border-brown/15 bg-soft px-3 py-1.5 text-[0.65rem] font-bold text-brown">
        {discount.category}
      </span>

      {discount.coupon && (
        <div className="mt-4 rounded-2xl border border-dashed border-rose-400 bg-soft p-4">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
            <Tag size={14} className="text-rose-700" /> Cupom
          </p>
          <p className="mt-1 break-all text-sm font-extrabold tracking-widest text-brown">
            {discount.coupon}
          </p>
          <button
            type="button"
            onClick={copyCoupon}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-rose-700 px-4 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-700 hover:text-white"
            aria-label={`Copiar cupom ${discount.coupon}`}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Cupom copiado!" : "Copiar cupom"}
          </button>
        </div>
      )}

      <a
        href={discount.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="button-primary mt-4 min-h-12 w-full text-center"
      >
        {discount.category === "Favoritos" && !discount.coupon
          ? "Conhecer a marca"
          : buttonLabels[discount.type]}
        <ExternalLink size={15} />
      </a>
    </article>
  );
}

export function DiscountsCatalog({ discounts }: { discounts: Discount[] }) {
  const sortedDiscounts = [...discounts].sort(
    (a, b) => (a.priority ?? 999) - (b.priority ?? 999),
  );
  const availableCategories = new Set(sortedDiscounts.map((discount) => discount.category));
  const categories = ["Todos", ...categoryOrder.filter((item) => availableCategories.has(item))];
  const [category, setCategory] = useState("Todos");
  const featured = sortedDiscounts.filter((discount) => discount.featured);
  const visible =
    category === "Todos"
      ? sortedDiscounts
      : sortedDiscounts.filter((discount) => discount.category === category);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar descontos por categoria">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={`min-h-11 rounded-full border px-5 text-xs font-bold transition-all ${
              category === item
                ? "border-ink bg-ink text-white"
                : "border-brown/20 bg-white text-brown hover:border-rose-700 hover:text-rose-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {category === "Todos" && (
        <section className="mt-12" aria-labelledby="meus-favoritos">
          <h2 id="meus-favoritos" className="font-display text-3xl text-ink md:text-4xl">
            Meus <span className="italic text-rose-700">favoritos</span>
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((discount) => (
              <Reveal key={discount.id} className="h-full">
                <DiscountCard discount={discount} featured />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mt-14" aria-labelledby="todos-os-descontos">
        <h2 id="todos-os-descontos" className="font-display text-3xl text-ink md:text-4xl">
          {category === "Todos" ? "Todos os descontos" : category}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((discount) => (
            <Reveal key={discount.id} className="h-full">
              <DiscountCard discount={discount} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
