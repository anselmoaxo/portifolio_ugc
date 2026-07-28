import { Quote } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section id="depoimentos" className="section-padding bg-soft">
      <div className="container-shell">
        <SectionHeading
          align="center"
          eyebrow="Depoimentos"
          title="O que as marcas dizem"
          description="Espaço preparado para receber relatos reais e autorizados das marcas parceiras."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={`${item.company}-${item.work}`}
              className="flex flex-col rounded-3xl border border-brown/10 bg-white p-7"
            >
              <div className="flex justify-between">
                <Quote size={30} strokeWidth={1.3} className="text-rose-700" />
                {item.demo && (
                  <span className="rounded-full bg-rose-200/35 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-700">
                    Pendente
                  </span>
                )}
              </div>
              <blockquote className="mt-9 font-display text-2xl italic leading-9 text-ink">
                &ldquo;{item.text}&rdquo;
              </blockquote>
              <div className="mt-9 flex items-center gap-4 border-t border-brown/10 pt-5">
                <span className="grid size-11 place-items-center rounded-full bg-rose-700 text-xs font-bold text-white">
                  {item.initials}
                </span>
                <div>
                  <p className="font-bold text-ink">{item.name}</p>
                  <p className="text-sm text-muted">{item.company} &middot; {item.work}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="#contato" className="button-secondary inline-flex">
            Quero ser a próxima marca parceira <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
