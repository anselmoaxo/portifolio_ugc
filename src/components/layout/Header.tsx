"use client";

import { Instagram, Menu, MessageCircle, Music2, TicketPercent, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CONTACT, whatsappDefaultMessage, whatsappUrl } from "@/config/contact";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const links = [
  ["Início", "/#inicio"],
  ["Sobre mim", "/#sobre"],
  ["Portfólio", "/#portfolio"],
  ["Mídia Kit", "/portfolio"],
  ["Marcas", "/#parcerias"],
  ["Contato", "/#contato"],
];

function DiscountsLink({ onClick, mobile = false }: { onClick?: () => void; mobile?: boolean }) {
  return (
    <Link
      href="/descontos"
      onClick={onClick}
      className={
        mobile
          ? "group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-rose-600 via-fuchsia-500 to-rose-600 bg-[length:200%_100%] px-6 py-3 font-display text-xl text-white shadow-[0_8px_30px_rgba(190,24,93,.45)] animate-[coupon-shine_3s_linear_infinite]"
          : "group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-rose-600 via-fuchsia-500 to-rose-600 bg-[length:200%_100%] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(190,24,93,.45)] transition-transform hover:scale-105 animate-[coupon-shine_3s_linear_infinite]"
      }
    >
      <span className="absolute inset-0 rounded-full border-2 border-white/40 opacity-75 animate-ping [animation-duration:2s]" aria-hidden="true" />
      <TicketPercent size={mobile ? 20 : 14} className="relative" />
      <span className="relative">Meus descontos</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brown/10 bg-cream/90 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link href="/#inicio" className="font-display text-xl text-ink" aria-label="Blog da Priscila, início">
          Blog da <span className="italic text-rose-700">Priscila</span>
        </Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Navegação principal">
          {links.map(([label, href], i) => (
            <span key={href} className="inline-flex items-center gap-5">
              <Link href={href} prefetch={href === "/portfolio" ? false : undefined} className="nav-link">{label}</Link>
              {i === 1 && <DiscountsLink />}
            </span>
          ))}
          <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="nav-link inline-flex items-center gap-1" aria-label="Instagram da Priscila — abre em nova aba"><Instagram size={14} /></a>
          {CONTACT.tiktok && <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" className="nav-link inline-flex items-center gap-1" aria-label="TikTok da Priscila — abre em nova aba"><Music2 size={14} /></a>}
        </nav>
        <div className="hidden items-center gap-4 xl:flex">
          <LanguageSwitcher />
          <Link href="/#contato" className="button-primary">Solicitar parceria</Link>
        </div>
        <div className="flex items-center gap-2 xl:hidden">
          <a href={whatsappUrl(whatsappDefaultMessage)} target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full bg-[#25D366] text-white shadow sm:hidden" aria-label="Solicitar orçamento pelo WhatsApp — abre em nova aba">
            <MessageCircle size={20} />
          </a>
          <button className="grid size-11 place-items-center rounded-full border border-brown/20" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Fechar menu" : "Abrir menu"}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="absolute inset-x-0 top-20 h-[calc(100dvh-5rem)] overflow-y-auto bg-cream px-6 py-6 pb-[max(2rem,env(safe-area-inset-bottom))] xl:hidden" aria-label="Navegação móvel">
          <div className="mx-auto flex max-w-lg flex-col">
            <div className="mb-3"><LanguageSwitcher /></div>
            {links.map(([label, href], index) => <Link key={href} href={href} prefetch={href === "/portfolio" ? false : undefined} onClick={() => setOpen(false)} className="border-b border-brown/10 py-3 font-display text-xl"><span className="mr-4 text-xs text-rose-700">{String(index + 1).padStart(2, "0")}</span>{label}</Link>)}
            <div className="pt-4"><DiscountsLink mobile onClick={() => setOpen(false)} /></div>
            <Link href="/#contato" onClick={() => setOpen(false)} className="button-primary mt-6 justify-center">Solicitar parceria</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
