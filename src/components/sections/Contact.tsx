import { Instagram, Mail, MessageCircle, Music2, Star } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { CONTACT, isWhatsAppConfigured, whatsappDefaultMessage, whatsappUrl } from "@/config/contact";

export function Contact() {
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
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/75 hover:text-white">
              <span className="grid size-10 place-items-center rounded-full border border-white/15"><Instagram size={18} /></span>
              {CONTACT.instagramHandle}
            </a>
            {CONTACT.email !== "EMAIL_DA_PRISCILA" && (
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-white/75 hover:text-white">
                <span className="grid size-10 place-items-center rounded-full border border-white/15"><Mail size={18} /></span>
                {CONTACT.email}
              </a>
            )}
            {isWhatsAppConfigured && (
              <a href={whatsappUrl(whatsappDefaultMessage)} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/75 hover:text-white">
                <span className="grid size-10 place-items-center rounded-full border border-white/15"><MessageCircle size={18} /></span>
                Conversar pelo WhatsApp
              </a>
            )}
            {CONTACT.tiktok && (
              <a href={CONTACT.tiktok} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/75 hover:text-white">
                <span className="grid size-10 place-items-center rounded-full border border-white/15"><Music2 size={18} /></span>
                TikTok
              </a>
            )}
          </div>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
