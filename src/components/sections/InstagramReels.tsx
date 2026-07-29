"use client";

import { ArrowUpRight, ExternalLink, Instagram, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CONTACT } from "@/config/contact";
import { resolveMediaPath } from "@/lib/asset-path";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reels = [
  { id: 1, shortcode: "DbWQmS3yZYe", title: "Antioxidante na rotina de skincare", thumbnail: "/images/instagram/2026-07-28_19-15-28_UTC.jpg", views: "8.2K" },
  { id: 2, shortcode: "DbT5QldSJZa", title: "Cantinho da blogueira", thumbnail: "/images/instagram/2026-07-27_21-11-21_UTC.jpg", views: "12.5K" },
  { id: 3, shortcode: "DbQ5uumR_eK", title: "CeraVe Hidratante", thumbnail: "/images/instagram/2026-07-26_17-16-03_UTC.jpg", views: "6.7K" },
  { id: 4, shortcode: "DbMLL61SkA-", title: "Trend Bubble Maybelline", thumbnail: "/images/instagram/2026-07-24_21-15-20_UTC.jpg", views: "15.1K" },
  { id: 5, shortcode: "DbHbsxFp5Bs", title: "Meu pandinha Vizzela", thumbnail: "/images/instagram/2026-07-23_01-01-35_UTC.jpg", views: "9.3K" },
  { id: 6, shortcode: "DbEBocqRYHS", title: "Drop L'Oréal Kérastase", thumbnail: "/images/instagram/2026-07-21_17-21-56_UTC.jpg", views: "21.8K" },
];

export function InstagramReels() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="section-padding bg-cream">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Últimos Reels"
            title="Conteúdo em movimento"
            description="Meus Reels mais recentes. Histórias reais, beleza e autenticidade em cada vídeo."
          />
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary shrink-0"
          >
            <Instagram size={18} />
            Seguir no Instagram
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reels.map((reel) => (
            <article
              key={reel.id}
              className={`group relative overflow-hidden rounded-2xl border border-brown/10 bg-white transition-all ${
                active === reel.id ? "ring-2 ring-rose-700" : ""
              }`}
            >
              {active === reel.id ? (
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-ink">
                  <iframe
                    src={`https://www.instagram.com/p/${reel.shortcode}/embed/`}
                    title={reel.title}
                    className="size-full"
                    allowFullScreen
                    loading="lazy"
                  />
                  <button
                    onClick={() => setActive(null)}
                    className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-ink/60 text-white backdrop-blur transition hover:bg-ink"
                    aria-label="Fechar embed"
                  >
                    <ExternalLink size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setActive(reel.id)}
                  className="relative aspect-[9/16] w-full overflow-hidden"
                  aria-label={`Assistir ${reel.title}`}
                >
                  <Image
                    src={resolveMediaPath(reel.thumbnail)}
                    alt={reel.title}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-rose-700/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                    Reels
                  </span>
                  <span className="absolute left-4 top-14 rounded-full bg-ink/70 px-3 py-1 text-[10px] font-bold text-white backdrop-blur">
                    {reel.views} views
                  </span>
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid size-16 place-items-center rounded-full bg-white/90 text-ink shadow-xl transition-transform group-hover:scale-110">
                      <Play size={26} className="ml-1" />
                    </span>
                  </span>
                  <span className="absolute bottom-4 left-4 right-4 font-display text-lg text-white">
                    {reel.title}
                  </span>
                </button>
              )}
              <div className="flex items-center justify-between p-4">
                <p className="text-xs text-muted">@{reel.shortcode.slice(0, 6)}</p>
                <a
                  href={`https://instagram.com/p/${reel.shortcode}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-rose-700 transition hover:text-rose-400"
                >
                  Ver no Instagram <ExternalLink size={12} className="inline" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
