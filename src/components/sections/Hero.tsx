import { ArrowDownRight, ArrowUpRight, Instagram, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { CONTACT } from "@/config/contact";

const stats = [
  { label: "Seguidores", value: "4.3K" },
  { label: "Posts publicados", value: "525+" },
  { label: "Marcas parceiras", value: "12+" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-cream pt-28">
      <div className="pointer-events-none absolute -left-32 top-36 size-[34rem] rounded-full bg-rose-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 size-96 rounded-full bg-brown/10 blur-3xl" />
      <div className="container-shell grid min-h-[calc(100vh-7rem)] items-center gap-12 py-12 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
        <div className="relative z-10">
          <p className="eyebrow flex items-center gap-2 text-rose-700">
            <Sparkles size={14} /> Criadora de conteúdo UGC
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.2rem,7.5vw,7rem)] leading-[.86] tracking-[-.05em] text-ink">
            Beleza real, conteúdo <span className="italic text-rose-700">autêntico</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
            Transformo produtos de beleza, skincare e bem-estar em conteúdos que conversam de verdade com o público. Natural, envolvente e feito para conectar.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#portfolio" className="button-primary">
              Ver portfólio <ArrowDownRight size={17} />
            </a>
            <a href="#contato" className="button-secondary">
              Solicitar parceria
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              className="button-quiet"
            >
              <Instagram size={18} /> Seguir no Instagram
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <Star size={14} className="text-rose-700" />
                <span className="text-sm">
                  <strong className="text-ink">{stat.value}</strong>{" "}
                  <span className="text-muted">{stat.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[460px] lg:mr-0">
          <div className="absolute -right-6 -top-6 hidden font-display text-[8rem] italic leading-none text-rose-200/50 md:block">
            P
          </div>
          <div className="relative ml-auto aspect-[3/4] w-[90%] overflow-hidden rounded-[10rem_10rem_2rem_2rem] bg-rose-200 shadow-[0_30px_80px_rgba(88,58,47,.18)]">
            <Image
              src="/images/instagram/2026-07-28_19-15-28_UTC.jpg"
              alt="Foto da Priscila - criadora de conteúdo UGC"
              fill
              priority
              sizes="(max-width: 1024px) 88vw, 40vw"
              className="object-cover object-center"
            />
          </div>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noreferrer"
            className="absolute -bottom-5 left-0 inline-flex items-center gap-2 rounded-2xl border border-white/70 bg-white/90 px-5 py-3 text-sm font-bold text-ink shadow-xl backdrop-blur transition hover:bg-white"
          >
            <Instagram size={16} className="text-rose-700" />
            @blogdapriscilaa
            <ArrowUpRight size={14} className="text-rose-700" />
          </a>
        </div>
      </div>
    </section>
  );
}
