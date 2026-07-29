import { ExternalLink, Instagram, Mail, MessageCircle, Music2 } from "lucide-react";
import Link from "next/link";
import { CONTACT, isWhatsAppConfigured, whatsappUrl, whatsappDefaultMessage } from "@/config/contact";

const links = [["Sobre mim", "/#sobre"], ["Portfólio", "/#portfolio"], ["Mídia Kit", "/portfolio"], ["Marcas", "/#parcerias"], ["Contato", "/#contato"]];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_1fr]">
        <div>
          <p className="font-display text-3xl">Blog da <span className="italic text-rose-200">Priscila</span></p>
          <p className="mt-5 max-w-md leading-7 text-white/60">Criadora de conteúdo UGC. Beleza, skincare, maquiagem e bem-estar. Conteúdo autêntico para marcas que desejam conversar com pessoas reais.</p>
          <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="button-light mt-6 inline-flex">
            <Instagram size={16} /> Seguir no Instagram <ExternalLink size={13} />
          </a>
        </div>
        <div>
          <h2 className="eyebrow text-rose-200">Navegue</h2>
          <div className="mt-5 flex flex-col gap-3">
            {links.map(([label, href]) => <Link className="text-white/65 transition hover:text-white" href={href} prefetch={href === "/portfolio" ? false : undefined} key={href}>{label}</Link>)}
            <Link className="text-white/65 transition hover:text-white" href="/politica-de-privacidade">Política de privacidade</Link>
          </div>
        </div>
        <div>
          <h2 className="eyebrow text-rose-200">Vamos conversar</h2>
          <div className="mt-5 flex flex-col gap-4 text-white/65">
            <a className="flex items-center gap-3 hover:text-white" href={CONTACT.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18} />{CONTACT.instagramHandle}</a>
            <a className="flex min-w-0 items-center gap-3 hover:text-white" href={`mailto:${CONTACT.email}?subject=Proposta%20de%20parceria%20UGC`}><Mail size={18} /><span className="break-all">{CONTACT.email}</span></a>
            {isWhatsAppConfigured && <a className="flex items-center gap-3 hover:text-white" href={whatsappUrl(whatsappDefaultMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />WhatsApp</a>}
            {CONTACT.tiktok && <a className="flex items-center gap-3 hover:text-white" href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer"><Music2 size={18} />TikTok</a>}
            {!CONTACT.tiktok && <span className="flex items-center gap-3 text-white/40"><Music2 size={18} />TikTok — em breve</span>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10"><div className="container-shell flex flex-col gap-2 pb-24 pt-6 text-sm text-white/45 sm:flex-row sm:justify-between sm:py-6"><p>© {new Date().getFullYear()} Blog da Priscila. Todos os direitos reservados.</p><p>Feito com cuidado para conexões reais.</p></div></div>
    </footer>
  );
}
