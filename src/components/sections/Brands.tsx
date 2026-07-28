import { ArrowUpRight, ExternalLink } from "lucide-react";
import { partnerBrands } from "@/data/brands";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Brands() {
  return (
    <section id="parcerias" className="section-padding bg-white">
      <div className="container-shell">
        <SectionHeading
          align="center"
          eyebrow="Parcerias"
          title="Marcas que confiam no meu conteúdo"
          description="Empresas e produtos que já fizeram parte da minha trajetória como criadora UGC."
        />
        <div className="mt-12 grid grid-cols-2 border-l border-t border-brown/10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {partnerBrands.map((brand) => (
            <a
              key={brand.name}
              href={brand.demo ? "#parcerias" : brand.website}
              target={brand.demo ? undefined : "_blank"}
              rel={brand.demo ? undefined : "noreferrer"}
              className={`group flex min-h-28 flex-col items-center justify-center gap-2 border-b border-r border-brown/10 p-4 text-center transition hover:bg-soft ${
                brand.demo ? "cursor-default" : ""
              }`}
            >
              <span className="font-display text-lg tracking-wider text-brown transition group-hover:text-rose-700">
                {brand.logo}
              </span>
              {!brand.demo && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-700 opacity-0 transition group-hover:opacity-100">
                  Site <ExternalLink size={10} />
                </span>
              )}
            </a>
          ))}
        </div>
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
