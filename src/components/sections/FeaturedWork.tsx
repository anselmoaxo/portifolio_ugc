"use client";

import { ArrowDown } from "lucide-react";
import { featuredWork } from "@/data/featured-work";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedWork() {
  return (
    <section className="section-padding bg-soft">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Cases em destaque"
          title="Trabalhos que representam meu estilo"
          description="Alguns exemplos de como cada parceria é pensada: do conceito à entrega, sempre com foco em autenticidade."
        />
        <div className="mt-14 space-y-5">
          {featuredWork.map((work) => (
            <article
              key={work.number}
              className="grid overflow-hidden rounded-3xl border border-brown/10 bg-white lg:grid-cols-[.55fr_1.45fr]"
            >
              <div className={`case-visual case-${work.tone} relative min-h-56 overflow-hidden p-7`}>
                <span className="font-display text-8xl italic text-white/35">{work.number}</span>
                <span className="absolute bottom-7 left-7 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brown">
                  {work.format}
                </span>
              </div>
              <div className="grid gap-8 p-7 md:grid-cols-2 md:p-10">
                <div>
                  <p className="eyebrow text-rose-700">{work.brand}</p>
                  <h3 className="mt-4 font-display text-3xl leading-tight text-ink">{work.objective}</h3>
                </div>
                <div className="space-y-5 text-sm leading-6 text-muted">
                  <div>
                    <strong className="block text-ink">Conteúdo produzido</strong>
                    {work.content}
                  </div>
                  <div>
                    <strong className="block text-ink">Formato</strong>
                    {work.format}
                  </div>
                  <a
                    href="#contato"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-rose-700 hover:text-rose-400"
                  >
                    Quero algo assim <ArrowDown size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
