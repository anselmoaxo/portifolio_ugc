"use client";

import { Instagram, Menu, Music2, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CONTACT } from "@/config/contact";

const links = [
  ["Início", "/#inicio"],
  ["Sobre mim", "/#sobre"],
  ["Portfólio", "/#portfolio"],
  ["Reels", "/#reels"],
  ["Galeria", "/#galeria"],
  ["Parcerias", "/#parcerias"],
  ["Serviços", "/#servicos"],
  ["Contato", "/#contato"],
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brown/10 bg-cream/90 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link href="/#inicio" className="font-display text-xl text-ink" aria-label="Blog da Priscila, início">
          Blog da <span className="italic text-rose-700">Priscila</span>
        </Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Navegação principal">
          {links.map(([label, href]) => <Link key={href} href={href} className="nav-link">{label}</Link>)}
          <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="nav-link inline-flex items-center gap-1"><Instagram size={14} /></a>
          {CONTACT.tiktok ? <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" className="nav-link inline-flex items-center gap-1"><Music2 size={14} /></a> : <span className="nav-link inline-flex items-center gap-1 opacity-40"><Music2 size={14} /></span>}
        </nav>
        <Link href="/#contato" className="button-primary hidden lg:inline-flex">Solicitar parceria</Link>
        <button className="grid size-11 place-items-center rounded-full border border-brown/20 xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Fechar menu" : "Abrir menu"}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" className="absolute inset-x-0 top-20 h-[calc(100vh-5rem)] bg-cream px-6 py-8 xl:hidden" aria-label="Navegação móvel">
          <div className="mx-auto flex max-w-lg flex-col">
            {links.map(([label, href], index) => <Link key={href} href={href} onClick={() => setOpen(false)} className="border-b border-brown/10 py-4 font-display text-2xl"><span className="mr-4 text-xs text-rose-700">0{index + 1}</span>{label}</Link>)}
            <Link href="/#contato" onClick={() => setOpen(false)} className="button-primary mt-8 justify-center">Solicitar parceria</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
