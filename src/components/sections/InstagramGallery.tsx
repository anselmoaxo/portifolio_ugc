"use client";

import { ArrowUpRight, ExternalLink, Heart, Instagram, MessageCircle } from "lucide-react";
import Image from "next/image";
import { CONTACT } from "@/config/contact";
import { SectionHeading } from "@/components/ui/SectionHeading";

const galleryImages = [
  { src: "/images/instagram/2026-07-28_19-15-28_UTC.jpg", alt: "Antioxidante skincare", shortcode: "DbWQmS3yZYe", likes: 847, comments: 32 },
  { src: "/images/instagram/2026-07-27_21-11-21_UTC.jpg", alt: "Cantinho blogueira", shortcode: "DbT5QldSJZa", likes: 1250, comments: 48 },
  { src: "/images/instagram/2026-07-24_21-15-20_UTC.jpg", alt: "Bubble Maybelline", shortcode: "DbMLL61SkA-", likes: 1530, comments: 67 },
  { src: "/images/instagram/2026-07-23_01-01-35_UTC.jpg", alt: "Pandinha Vizzela", shortcode: "DbHbsxFp5Bs", likes: 932, comments: 41 },
  { src: "/images/instagram/2026-07-21_17-21-56_UTC.jpg", alt: "Drop L'Oréal", shortcode: "DbEBocqRYHS", likes: 2180, comments: 95 },
  { src: "/images/instagram/2026-07-19_22-18-47_UTC.jpg", alt: "Copa do Mundo", shortcode: "Da_awlwy0Od", likes: 756, comments: 28 },
  { src: "/images/instagram/2026-07-18_22-55-06_UTC.jpg", alt: "Lip combo inverno", shortcode: "Da854ncSwa1", likes: 1100, comments: 52 },
  { src: "/images/instagram/2026-07-18_15-53-25_UTC.jpg", alt: "Escolhidos Vizzela", shortcode: "Da8Jp7RRocw", likes: 980, comments: 35 },
  { src: "/images/instagram/2026-07-16_19-34-18_UTC_1.jpg", alt: "Sorriso saudável", shortcode: "Da3Zw8qGapI", likes: 1340, comments: 61 },
  { src: "/images/instagram/2026-07-15_16-23-34_UTC.jpg", alt: "Creme dental", shortcode: "Da0ezpIRLvK", likes: 820, comments: 37 },
  { src: "/images/instagram/2026-07-14_15-29-13_UTC.jpg", alt: "Perfume cabelo", shortcode: "Daxz2LpRWUg", likes: 1050, comments: 44 },
  { src: "/images/instagram/2026-07-19_16-43-03_UTC.jpg", alt: "Blusinha diva", shortcode: "Da-0ZYLRmGa", likes: 690, comments: 22 },
];

export function InstagramGallery() {
  return (
    <section className="section-padding bg-soft">
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
              rel="noreferrer"
              className="group relative mb-3 block overflow-hidden rounded-2xl bg-brown/10"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={400}
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 24vw"
                className="w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                <div className="flex items-center gap-4 text-sm text-white">
                  <span className="flex items-center gap-1.5"><Heart size={15} className="text-rose-400" /> {img.likes}</span>
                  <span className="flex items-center gap-1.5"><MessageCircle size={15} /> {img.comments}</span>
                </div>
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
            rel="noreferrer"
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
