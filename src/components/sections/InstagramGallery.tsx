"use client";

import { ArrowUpRight, ExternalLink, Instagram } from "lucide-react";
import Image from "next/image";
import { CONTACT } from "@/config/contact";
import { resolveMediaPath } from "@/lib/asset-path";
import { SectionHeading } from "@/components/ui/SectionHeading";

const galleryImages = [
  { src: "/images/instagram/2026-07-28_19-15-28_UTC.jpg", alt: "Conteúdo da Priscila sobre antioxidante e skincare", shortcode: "DbWQmS3yZYe" },
  { src: "/images/instagram/2026-07-27_21-11-21_UTC.jpg", alt: "Conteúdo da Priscila sobre seu cantinho de criação", shortcode: "DbT5QldSJZa" },
  { src: "/images/instagram/2026-07-24_21-15-20_UTC.jpg", alt: "Conteúdo da Priscila com produto Maybelline", shortcode: "DbMLL61SkA-" },
  { src: "/images/instagram/2026-07-23_01-01-35_UTC.jpg", alt: "Conteúdo da Priscila com produto Vizzela", shortcode: "DbHbsxFp5Bs" },
  { src: "/images/instagram/2026-07-21_17-21-56_UTC.jpg", alt: "Conteúdo da Priscila com produto Kérastase", shortcode: "DbEBocqRYHS" },
  { src: "/images/instagram/2026-07-19_22-18-47_UTC.jpg", alt: "Registro de lifestyle publicado por Priscila", shortcode: "Da_awlwy0Od" },
  { src: "/images/instagram/2026-07-18_22-55-06_UTC.jpg", alt: "Conteúdo de maquiagem com combinação de produtos para os lábios", shortcode: "Da854ncSwa1" },
  { src: "/images/instagram/2026-07-18_15-53-25_UTC.jpg", alt: "Produtos Vizzela escolhidos por Priscila", shortcode: "Da8Jp7RRocw" },
  { src: "/images/instagram/2026-07-16_19-34-18_UTC_1.jpg", alt: "Conteúdo sobre cuidados com o sorriso", shortcode: "Da3Zw8qGapI" },
  { src: "/images/instagram/2026-07-15_16-23-34_UTC.jpg", alt: "Conteúdo sobre cuidados com creme dental", shortcode: "Da0ezpIRLvK" },
  { src: "/images/instagram/2026-07-14_15-29-13_UTC.jpg", alt: "Conteúdo sobre perfume capilar", shortcode: "Daxz2LpRWUg" },
  { src: "/images/instagram/2026-07-19_16-43-03_UTC.jpg", alt: "Conteúdo de moda publicado por Priscila", shortcode: "Da-0ZYLRmGa" },
];

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
          {galleryImages.map((img) => (
            <a
              key={img.shortcode}
              href={`https://instagram.com/p/${img.shortcode}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mb-3 block overflow-hidden rounded-2xl bg-brown/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
              aria-label={`${img.alt}. Ver publicação no Instagram — abre em nova aba`}
            >
              <Image
                src={resolveMediaPath(img.src)}
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
