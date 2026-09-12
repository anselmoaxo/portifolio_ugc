import { Instagram, Mail, MessageCircle, Music2, Star } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { whatsappUrlFor } from "@/config/contact";
import type { SiteSettings } from "@/types/cms";

export function Contact({ settings }: { settings: SiteSettings }) {
  const whatsappConfigured = /^\d{12,13}$/.test(settings.whatsapp);
  return (
    <section id="contato" className="section-padding relative overflow-hidden bg-brown text-white">
      <div className="absolute -right-36 -top-36 size-[34rem] rounded-full border border-white/10" />
      <div className="absolute -right-20 -top-20 size-80 rounded-full border border-white/10" />
      <div className="container-shell relative grid gap-14 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
        <div>
          <p className="eyebrow flex items-center gap-2 text-rose-200">
            <Star size={14} /> Sua marca + Priscila
          </p>
          <h2 className="mt-5 font-display text-5xl leading-[1.03] md:text-6xl">
            Vamos criar uma parceria?
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-white/65">
            Conte um pouco sobre sua marca e o conteúdo que você deseja produzir. Será um prazer conversar!
          </p>
          <div className="mt-10 space-y-4">
            {whatsappConfigured && (
              <a href={whatsappUrlFor(settings.whatsapp, settings.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="button-light mb-3 w-full justify-center sm:w-auto">
                <MessageCircle size={18} />
                Solicitar orçamento pelo WhatsApp
              </a>
            )}
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/75 hover:text-white">
              <span className="grid size-10 place-items-center rounded-full border border-white/15"><Instagram size={18} /></span>
              {settings.instagramHandle}
            </a>
            <a href={`mailto:${settings.email}?subject=Proposta%20de%20parceria%20UGC`} className="flex min-w-0 items-center gap-3 text-white/75 hover:text-white">
              <span className="grid size-10 place-items-center rounded-full border border-white/15"><Mail size={18} /></span>
              <span className="break-all">{settings.email}</span>
            </a>
            {whatsappConfigured && (
              <a href={whatsappUrlFor(settings.whatsapp, settings.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/75 hover:text-white">
                <span className="grid size-10 place-items-center rounded-full border border-white/15"><MessageCircle size={18} /></span>
                Abrir WhatsApp
              </a>
            )}
            {settings.tiktok && (
              <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/75 hover:text-white">
                <span className="grid size-10 place-items-center rounded-full border border-white/15"><Music2 size={18} /></span>
                TikTok
              </a>
            )}
          </div>
        </div>
        <LeadForm whatsapp={settings.whatsapp} />
      </div>
    </section>
  );
}
