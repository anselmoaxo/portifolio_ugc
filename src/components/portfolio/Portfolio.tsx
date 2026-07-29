"use client";

import { ExternalLink, Play, Star } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { portfolioCategories, portfolioVideos } from "@/data/portfolio";
import type { PortfolioCategory, PortfolioVideo } from "@/types/content";
import { resolveMediaPath } from "@/lib/asset-path";
import { VideoModal } from "./VideoModal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Portfolio() {
  const [category, setCategory] = useState<"Todos" | PortfolioCategory>("Todos");
  const [selected, setSelected] = useState<PortfolioVideo | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const visible =
    category === "Todos"
      ? portfolioVideos
      : portfolioVideos.filter((item) => item.category === category);

  return (
    <section id="portfolio" className="section-padding bg-cream">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Portfólio"
            title="Conteúdos que já produzi"
            description="Explore meus trabalhos como criadora UGC. Beleza, skincare, lifestyle e muito mais."
          />
          <p className="max-w-xs text-sm leading-6 text-muted">
            Conteúdo real do perfil {""}
            <a
              href="https://www.instagram.com/blogdapriscilaa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-700 underline"
            >
              @blogdapriscilaa
            </a>
            . Clique para ver no Instagram.
          </p>
        </div>

        <div
          className="scrollbar-none mt-10 flex gap-2 overflow-x-auto pb-2"
          role="group"
          aria-label="Filtrar portfólio por categoria"
        >
          {portfolioCategories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm transition ${
                category === item
                  ? "border-ink bg-ink text-white"
                  : "border-brown/15 bg-white/45 text-muted hover:border-rose-700"
              }`}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <article key={item.id} className="group">
              <button
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setSelected(item);
                }}
                className="relative block aspect-[2/3] w-full overflow-hidden rounded-[1.6rem] bg-sand text-left shadow-sm"
                aria-label={`Ver detalhes de ${item.title}`}
              >
                <Image
                  src={resolveMediaPath(item.thumbnail)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-rose-700/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">UGC</span>
                <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                  <span className="font-display text-lg leading-tight">{item.title}</span>
                  <Play size={24} className="shrink-0 opacity-80" />
                </span>
              </button>
              <div className="flex items-center justify-between px-1 pt-3">
                <p className="text-sm text-muted">
                  {item.brand} &middot; {item.format}
                </p>
                <a
                  href={item.externalUrl ?? item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-400"
                >
                  Instagram <ExternalLink size={11} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a href="#contato" className="button-primary inline-flex">
            <Star size={16} /> Quero produzir conteúdos assim
          </a>
        </div>
      </div>
      <VideoModal item={selected} onClose={() => {
        setSelected(null);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }} />
    </section>
  );
}
