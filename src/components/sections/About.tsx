import { ArrowUpRight, Instagram, Quote, Star } from "lucide-react";
import Image from "next/image";
import { CONTACT } from "@/config/contact";
import { resolveMediaPath } from "@/lib/asset-path";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const highlights = [
  { label: "Beleza", icon: "✨" },
  { label: "Skincare", icon: "🧴" },
  { label: "Cabelos", icon: "💇" },
  { label: "Autocuidado", icon: "🧖" },
];

export function About() {
  return (
    <section id="sobre" className="section-padding bg-white">
      <div className="container-shell grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-sand shadow-[0_20px_60px_rgba(88,58,47,.12)]">
            <Image
              src={resolveMediaPath("/images/instagram/2026-07-21_17-21-56_UTC.jpg")}
              alt="Priscila Almeida, criadora de conteúdo UGC"
              fill
              sizes="(max-width: 1024px) 90vw, 38vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute -bottom-4 -right-2 grid size-28 place-items-center rounded-full border-8 border-white bg-ink text-center text-xs uppercase leading-4 tracking-[.15em] text-white md:-right-6 shadow-lg">
            Criar<br />conectar<br />inspirar
          </div>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -left-2 -top-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-ink shadow-md transition hover:shadow-lg"
          >
            <Instagram size={14} className="text-rose-700" />
            {CONTACT.instagramHandle}
            <ArrowUpRight size={12} />
          </a>
        </Reveal>
        <Reveal>
          <SectionHeading eyebrow="Sobre mim" title="Olá! Sou Priscila Almeida" />
          <div className="mt-8 space-y-5 text-base leading-8 text-muted md:text-lg">
            <p>
              Tenho 39 anos, moro em Guarulhos, São Paulo, e sou apaixonada pelo universo da beleza, do skincare, dos cabelos e do autocuidado.
            </p>
            <p>
              Minha página é um espaço onde compartilho dicas, tutoriais e resenhas de produtos para ajudar minha audiência a se sentir mais confiante. Quero mostrar à minha comunidade como cuidar da beleza de maneira prática e sem complicação.
            </p>
          </div>
          <div className="mt-8 flex gap-4 border-l-2 border-rose-400 pl-5">
            <Quote className="shrink-0 text-rose-700" size={22} />
            <p className="font-display text-xl italic leading-7 text-brown">Produzo conteúdo digital com uma abordagem autêntica, próxima e apaixonada pelo assunto.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {highlights.map((h) => (
              <span key={h.label} className="inline-flex items-center gap-1.5 rounded-full border border-brown/15 bg-soft px-4 py-2 text-xs font-bold text-brown">
                {h.icon} {h.label}
              </span>
            ))}
          </div>
          <a href="#contato" className="button-primary mt-8">
            Quero uma parceria <Star size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
