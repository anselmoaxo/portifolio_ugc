import { BadgeCheck, Blend, ChartNoAxesCombined, Clock3, Fingerprint, MessageCircleHeart } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const items = [
  { title: "Conteúdo autêntico", text: "Produções naturais que não parecem propaganda tradicional — as pessoas confiam.", icon: Fingerprint },
  { title: "Conexão real", text: "Linguagem próxima e acolhedora, como uma amiga recomendando um produto.", icon: MessageCircleHeart },
  { title: "Personalização total", text: "Cada ideia nasce da identidade e dos objetivos únicos da sua marca.", icon: Blend },
  { title: "Foco em resultado", text: "Conteúdos pensados para gerar atenção, desejo e ação do público.", icon: ChartNoAxesCombined },
  { title: "Organização profissional", text: "Cumprimento de prazos, briefing claro e cuidado em cada detalhe.", icon: BadgeCheck },
  { title: "Formatos atuais", text: "Reels, TikTok, Stories e anúncios adaptados para cada plataforma.", icon: Clock3 },
];

export function Differentials() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-shell">
        <SectionHeading
          align="center"
          eyebrow="Por que trabalhar comigo"
          title="O que torna meu conteúdo diferente"
          description="Autenticidade, cuidado e um olhar sensível para o que realmente importa na comunicação com o público."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Reveal key={item.title}>
              <article className="group rounded-2xl border border-brown/10 bg-white p-7 transition hover:border-rose-700/30 hover:shadow-lg">
                <span className="grid size-12 place-items-center rounded-xl bg-rose-200/30 text-rose-700 transition group-hover:bg-rose-700 group-hover:text-white">
                  <item.icon size={22} strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-display text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
