import { ArrowUpRight, Instagram } from "lucide-react";
import Image from "next/image";
import { CONTACT } from "@/config/contact";
import { SectionHeading } from "@/components/ui/SectionHeading";

const images = [1, 2, 3, 4, 5, 6];

export function InstagramSection() {
  return <section className="section-padding overflow-hidden bg-soft"><div className="container-shell"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><SectionHeading eyebrow="Mais do dia a dia" title="Acompanhe meu conteúdo" description="Veja mais conteúdos, experiências, dicas e parcerias no meu Instagram." /><a className="button-secondary shrink-0" href={CONTACT.instagram} target="_blank" rel="noreferrer"><Instagram size={18}/>{CONTACT.instagramHandle}<ArrowUpRight size={16}/></a></div><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">{images.map((image, index) => <a href={CONTACT.instagram} target="_blank" rel="noreferrer" key={image} className={`group relative aspect-square overflow-hidden rounded-2xl ${index % 2 ? "md:translate-y-5" : ""}`} aria-label={`Ver Instagram da Priscila, imagem provisória ${image}`}><Image src={`/images/portfolio-${image}.svg`} alt={`Imagem provisória ${image} para o feed do Instagram`} fill sizes="(max-width: 768px) 46vw, (max-width: 1024px) 30vw, 16vw" className="object-cover transition duration-500 group-hover:scale-105"/><span className="absolute inset-0 grid place-items-center bg-ink/0 text-white opacity-0 transition group-hover:bg-ink/35 group-hover:opacity-100"><Instagram size={26}/></span></a>)}</div><p className="mt-10 text-center text-xs font-bold uppercase tracking-widest text-rose-700">Imagens demonstrativas para substituição pelo feed oficial</p></div></section>;
}
