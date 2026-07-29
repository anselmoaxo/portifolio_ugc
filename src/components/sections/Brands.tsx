import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { partnerBrands } from "@/data/brands";
import { resolveMediaPath } from "@/lib/asset-path";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Brands() {
  return (
    <section id="parcerias" className="section-padding bg-white">
      <div className="container-shell">
        <SectionHeading
          align="center"
          eyebrow="Marcas"
          title="Marcas trabalhadas"
          description="Parcerias e trabalhos apresentados no Mídia Kit oficial da Priscila."
        />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {partnerBrands.map((brand) => (
            <li
              key={brand.id}
              className="flex min-h-44 flex-col items-center justify-center rounded-3xl border border-brown/10 bg-soft/50 p-4 text-center"
            >
              <Image
                src={resolveMediaPath(brand.image)}
                alt={brand.name ? `Logotipo da marca ${brand.name}` : (brand.alt ?? "Marca apresentada no Mídia Kit")}
                width={160}
                height={160}
                sizes="(max-width: 640px) 36vw, (max-width: 1024px) 20vw, 150px"
                className="aspect-square w-full max-w-32 rounded-full object-cover shadow-sm"
              />
              {brand.name && <span className="mt-3 text-sm font-bold text-brown">{brand.name}</span>}
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
