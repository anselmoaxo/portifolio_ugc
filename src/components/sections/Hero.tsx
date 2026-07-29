import { ArrowDownRight, ArrowUpRight, Download, FileText, Instagram, Sparkles } from "lucide-react";
import Image from "next/image";
import { CONTACT } from "@/config/contact";
import { resolveMediaPath } from "@/lib/asset-path";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-cream pt-28">
      <div className="pointer-events-none absolute -left-32 top-36 size-[34rem] rounded-full bg-rose-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 size-96 rounded-full bg-brown/10 blur-3xl" />
      <div className="container-shell grid min-h-[calc(100vh-7rem)] items-center gap-12 py-12 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
        <div className="relative z-10 min-w-0">
          <p className="eyebrow flex items-center gap-2 text-rose-700">
            <Sparkles size={14} /> Criadora de conteúdo UGC
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,7.5vw,7rem)] leading-[.88] tracking-[-.05em] text-ink">
            Beleza real, conteúdo <span className="italic text-rose-700">autêntico</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-muted md:mt-8 md:text-lg md:leading-8">
            Transformo produtos de beleza, skincare e bem-estar em conteúdos que conversam de verdade com o público. Naturais, envolventes e feitos para gerar conexão.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            <a href="#portfolio" className="button-primary">
              Ver portfólio <ArrowDownRight size={17} />
            </a>
            <a href="#contato" className="button-secondary">
              Solicitar parceria
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="button-quiet"
            >
              <Instagram size={18} /> Seguir no Instagram
            </a>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap">
            <a
              href={resolveMediaPath("/portfolio/")}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border-2 border-rose-700 bg-rose-700 px-4 py-3 text-center text-sm font-bold text-white transition hover:border-rose-600 hover:bg-rose-600 sm:w-auto sm:px-7"
            >
              <FileText size={18} />
              Ver Mídia Kit
            </a>
            <a
              href={resolveMediaPath("/portfolio/Portfolio-Priscila.pdf")}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border-2 border-ink/20 bg-white px-4 py-3 text-center text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-ink/40 sm:w-auto sm:px-7"
            >
              <Download size={18} />
              Baixar Portfólio em PDF
            </a>
          </div>
          <p className="mt-10 max-w-xl border-l-2 border-rose-400 pl-4 text-sm leading-6 text-muted">
            Conteúdo sobre beleza, skincare, cabelos e autocuidado, apresentado com clareza e proximidade.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-[460px] lg:mr-0">
          <div className="absolute -right-6 -top-6 hidden font-display text-[8rem] italic leading-none text-rose-200/50 md:block">
            P
          </div>
          <div className="relative ml-auto aspect-[3/4] w-[90%] overflow-hidden rounded-[10rem_10rem_2rem_2rem] bg-rose-200 shadow-[0_30px_80px_rgba(88,58,47,.18)]">
            <Image
              src={resolveMediaPath("/images/instagram/2026-07-28_19-15-28_UTC.jpg")}
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
            rel="noopener noreferrer"
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
