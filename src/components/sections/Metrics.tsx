import { BarChart3, MapPin, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ages = [
  { label: "25 a 34 anos", value: "40,5%" },
  { label: "18 a 24 anos", value: "29,4%" },
  { label: "45 a 54 anos", value: "6,3%" },
];

export function Metrics() {
  return (
    <section id="metricas" className="section-padding bg-ink text-white">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Instagram"
          title="Minhas métricas"
          description="Dados de audiência apresentados no Mídia Kit da Priscila."
          light
          align="center"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <Users className="text-rose-200" aria-hidden="true" />
            <p className="mt-5 font-display text-5xl text-white">4,2 mil</p>
            <h3 className="mt-2 text-sm font-bold uppercase tracking-wider text-white/65">Seguidores</h3>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <BarChart3 className="text-rose-200" aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl text-white">Gêneros atingidos</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <div className="flex justify-between"><dt>Feminino</dt><dd>86%</dd></div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[86%] rounded-full bg-rose-200" /></div>
              </div>
              <div>
                <div className="flex justify-between"><dt>Masculino</dt><dd>13%</dd></div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[13%] rounded-full bg-rose-200" /></div>
              </div>
            </dl>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <BarChart3 className="text-rose-200" aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl text-white">Faixa etária</h3>
            <dl className="mt-5 space-y-3 text-sm text-white/75">
              {ages.map((age) => (
                <div key={age.label} className="flex justify-between gap-3 border-b border-white/10 pb-3 last:border-0">
                  <dt>{age.label}</dt><dd className="font-bold text-white">{age.value}</dd>
                </div>
              ))}
            </dl>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <MapPin className="text-rose-200" aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl text-white">Principais localidades</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              <li>São Paulo</li>
              <li>Rio de Janeiro</li>
              <li>Guarulhos</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
