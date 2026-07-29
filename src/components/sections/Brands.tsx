import { ArrowUpRight } from "lucide-react";
import { partnerBrands } from "@/data/brands";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Brands() {
  return (
    <section id="parcerias" className="section-padding bg-white">
      <div className="container-shell">
        <SectionHeading
          align="center"
          eyebrow="Marcas"
          title="Marcas presentes no meu conteúdo"
          description="Produtos e marcas que já apareceram em publicações do meu perfil."
        />
        <ul className="mt-12 grid grid-cols-2 border-l border-t border-brown/10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {partnerBrands.map((brand) => (
            <li
              key={brand.name}
              className="flex min-h-28 items-center justify-center border-b border-r border-brown/10 p-4 text-center"
            >
              <span className="font-display text-lg tracking-wider text-brown" aria-hidden="true">
                {brand.logo}
              </span>
              <span className="sr-only">{brand.name}</span>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl bg-soft p-7 text-center sm:flex-row sm:text-left md:p-10">
          <div>
            <p className="font-display text-3xl text-ink">Quer ver sua marca aqui?</p>
            <p className="mt-2 text-muted">
              Vamos criar conteúdo autêntico que conecta sua marca com pessoas reais.
            </p>
          </div>
          <a className="button-primary shrink-0" href="#contato">
            Solicitar parceria <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
