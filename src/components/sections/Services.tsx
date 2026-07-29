import { ArrowUpRight, Star } from "lucide-react";
import { services } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  return (
    <section id="servicos" className="section-padding bg-ink text-white">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <Reveal>
            <SectionHeading
              light
              eyebrow="Produção de conteúdo"
              title="Fotografia e vídeos UGC"
              description="Conheça exemplos de fotografias e vídeos produzidos para apresentar produtos de forma clara e próxima."
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map(({ name, description, icon: Icon }, index) => (
              <Reveal key={name}>
                <article className="group flex min-h-48 flex-col rounded-2xl border border-white/10 bg-white/[.035] p-6 transition hover:border-rose-200/40 hover:bg-white/[.07]">
                  <div className="flex justify-between">
                    <Icon size={25} strokeWidth={1.5} className="text-rose-200" />
                    <span className="text-xs text-white/25">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-7 font-display text-xl">{name}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{description}</p>
                  <a
                    href="#contato"
                    className="mt-auto flex items-center gap-2 pt-5 text-xs font-bold uppercase tracking-widest text-rose-200 hover:text-white"
                  >
                    Solicitar <ArrowUpRight size={14} />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <a href="#contato" className="button-light inline-flex">
            <Star size={16} /> Solicitar orçamento
          </a>
        </div>
      </div>
    </section>
  );
}
