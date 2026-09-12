"use client";

import { Check, Copy, ExternalLink, Share2, Sparkles, Tag } from "lucide-react";
import { useMemo, useState } from "react";
import type { Coupon, CouponCategory } from "@/data/coupons";
import { Reveal } from "@/components/ui/Reveal";

type Filter = "Todos" | CouponCategory;

function CouponCard({ coupon, featured = false }: { coupon: Coupon; featured?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copyCoupon = async () => {
    if (!coupon.coupon) return;
    try {
      await navigator.clipboard.writeText(coupon.coupon);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponível */
    }
  };

  const share = async () => {
    const text = coupon.coupon
      ? `${coupon.name} — cupom ${coupon.coupon} via Blog da Priscila`
      : `${coupon.name} — oferta via Blog da Priscila`;
    if (navigator.share) {
      try {
        await navigator.share({ title: coupon.name, text, url: coupon.url });
      } catch {
        /* compartilhamento cancelado */
      }
    } else {
      try {
        await navigator.clipboard.writeText(coupon.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* clipboard indisponível */
      }
    }
  };

  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(88,58,47,.15)] ${
        featured
          ? "border-rose-400/50 shadow-[0_14px_40px_rgba(163,95,80,.18)]"
          : "border-brown/12 shadow-[0_8px_30px_rgba(88,58,47,.08)]"
      }`}
    >
      {featured && (
        <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-600 to-fuchsia-500 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white">
          <Sparkles size={11} /> Destaque
        </span>
      )}
      <span className="eyebrow text-rose-700">{coupon.category}</span>
      <h3 className="mt-2 font-display text-2xl text-ink md:text-3xl">{coupon.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{coupon.description}</p>

      {coupon.coupon && (
        <button
          type="button"
          onClick={copyCoupon}
          className="mt-4 inline-flex items-center justify-between gap-3 rounded-xl border border-dashed border-rose-400 bg-soft px-4 py-3 text-left transition-colors hover:border-rose-700"
          aria-label={`Copiar cupom ${coupon.coupon}`}
        >
          <span className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-brown">
            <Tag size={15} className="text-rose-700" />
            {coupon.coupon}
          </span>
          <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider text-rose-700">
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copiado!" : "Copiar"}
          </span>
        </button>
      )}

      <div className="mt-4 flex items-center gap-2">
        <a
          href={coupon.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="button-primary min-h-12 flex-1 text-center"
        >
          {coupon.coupon ? "Usar cupom" : "Ver oferta"}
          <ExternalLink size={15} />
        </a>
        <button
          type="button"
          onClick={share}
          className="grid size-12 shrink-0 place-items-center rounded-full border border-brown/20 text-brown transition-colors hover:border-rose-700 hover:text-rose-700"
          aria-label={`Compartilhar oferta de ${coupon.name}`}
          title="Compartilhar"
        >
          <Share2 size={17} />
        </button>
      </div>
    </article>
  );
}

export function CouponsCatalog({ coupons }: { coupons: readonly Coupon[] }) {
  const categories = useMemo<Filter[]>(() => {
    const present = new Set(coupons.map((c) => c.category));
    return ["Todos", ...Array.from(present)];
  }, [coupons]);

  const [filter, setFilter] = useState<Filter>("Todos");

  const featured = coupons.filter((c) => c.featured);
  const visible = filter === "Todos" ? coupons : coupons.filter((c) => c.category === filter);

  return (
    <>
      {categories.length > 2 && (
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar cupons por categoria">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={`min-h-11 rounded-full border px-5 text-xs font-bold transition-all ${
                filter === category
                  ? "border-ink bg-ink text-white"
                  : "border-brown/20 bg-white text-brown hover:border-rose-700 hover:text-rose-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {filter === "Todos" && featured.length > 0 && (
        <section aria-labelledby="cupons-destaque" className="mt-12">
          <h2 id="cupons-destaque" className="font-display text-3xl text-ink md:text-4xl">
            Cupons em <span className="italic text-rose-700">destaque</span>
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {featured.map((coupon) => (
              <Reveal key={coupon.id}>
                <CouponCard coupon={coupon} featured />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section aria-label="Todos os cupons" className="mt-12">
        {filter !== "Todos" && (
          <h2 className="font-display text-3xl text-ink md:text-4xl">{filter}</h2>
        )}
        <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${filter !== "Todos" ? "mt-6" : ""}`}>
          {visible.map((coupon) => (
            <Reveal key={coupon.id}>
              <CouponCard coupon={coupon} featured={filter === "Todos" && coupon.featured === true} />
            </Reveal>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="mt-6 text-muted">Nenhum cupom nesta categoria no momento.</p>
        )}
      </section>
    </>
  );
}
