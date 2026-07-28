import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  "Contato da marca",
  "Envio do briefing",
  "Definição da proposta",
  "Planejamento criativo",
  "Gravação do conteúdo",
  "Edição e refinamento",
  "Aprovação pela marca",
  "Entrega final",
];

export function WorkProcess() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <SectionHeading
            eyebrow="Do primeiro oi à entrega"
            title="Um processo leve e transparente"
            description="Cada etapa é conduzida com organização, clareza e espaço para troca. A marca participa de perto de todo o processo criativo."
          />
          <ol className="grid gap-x-6 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li
                key={step}
                className="group flex items-center gap-5 border-b border-brown/15 py-6"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-rose-700/25 font-display italic text-rose-700 transition group-hover:bg-rose-700 group-hover:text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-12 text-center">
          <a href="#contato" className="button-primary inline-flex">
            Iniciar uma parceria <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
