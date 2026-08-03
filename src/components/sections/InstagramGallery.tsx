"use client";

import { ArrowUpRight, ExternalLink, Instagram } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { CONTACT } from "@/config/contact";
import { instagramGallery } from "@/data/instagram";
import { resolveMediaPath } from "@/lib/asset-path";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function InstagramGallery() {
  return (
    <section id="galeria" className="section-padding bg-soft">
      <div className="container-shell">
        <SectionHeading
          align="center"
          eyebrow="Galeria"
          title="Momentos em imagem"
          description="Fotos do meu perfil no Instagram. Cada clique conta um pedacinho da minha rotina, parcerias e descobertas."
        />

        <div className="mt-12 columns-2 gap-3 md:columns-3 lg:columns-4">
          {instagramGallery.map((img) => (
            <a
              key={img.shortcode}
              href={`https://instagram.com/p/${img.shortcode}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mb-3 block overflow-hidden rounded-2xl bg-brown/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
              aria-label={`${img.alt}. Ver publicação no Instagram — abre em nova aba`}
            >
              <OptimizedImage
                src={resolveMediaPath(img.thumbnail)}
                alt={img.alt}
                width={400}
                height={400}
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 24vw"
                className="w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-4 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-rose-200">
                  Ver no Instagram <ExternalLink size={11} />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary inline-flex"
          >
            <Instagram size={18} />
            Seguir no Instagram
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
