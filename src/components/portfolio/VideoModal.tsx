"use client";

import { ExternalLink, Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { PortfolioVideo } from "@/types/content";

function embedUrl(item: PortfolioVideo) {
  if (item.source === "youtube") return `https://www.youtube-nocookie.com/embed/${item.videoUrl}`;
  if (item.source === "vimeo") return `https://player.vimeo.com/video/${item.videoUrl}`;
  return item.videoUrl;
}

export function VideoModal({ item, onClose }: { item: PortfolioVideo | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!item) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const keydown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", keydown); };
  }, [item, onClose]);
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-ink/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="video-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="relative grid max-h-[92vh] w-full max-w-4xl overflow-auto rounded-3xl bg-cream shadow-2xl md:grid-cols-[minmax(280px,.75fr)_1fr]">
        <button ref={closeRef} onClick={onClose} className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-ink shadow" aria-label="Fechar vídeo"><X size={19} /></button>
        <div className="relative aspect-[9/16] min-h-[420px] overflow-hidden bg-brown">
          {!item.videoUrl ? <><Image src={item.thumbnail} alt="" fill sizes="420px" className="object-cover opacity-50" /><div className="absolute inset-0 grid place-items-center p-8 text-center"><div><p className="eyebrow text-white">Conteúdo demonstrativo</p><p className="mt-4 font-display text-3xl text-white">Vídeo oficial será inserido aqui</p></div></div></> : item.source === "local" ? <video src={item.videoUrl} poster={item.thumbnail} controls playsInline preload="metadata" className="size-full object-cover" /> : item.source === "youtube" || item.source === "vimeo" ? <iframe src={embedUrl(item)} title={item.title} className="size-full" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen /> : item.source === "instagram" ? <><Image src={item.thumbnail} alt={item.title} fill sizes="420px" className="object-cover" /><div className="absolute inset-0 grid place-items-center bg-ink/40 p-8 text-center"><div><Play size={48} className="mx-auto text-white" /><a href={item.externalUrl ?? item.videoUrl} target="_blank" rel="noreferrer" className="button-light mt-6 inline-flex items-center gap-2">Ver no Instagram <ExternalLink size={16} /></a></div></div></> : <div className="grid size-full place-items-center p-8 text-center text-white"><a href={item.videoUrl} target="_blank" rel="noreferrer" className="button-light">Assistir na plataforma <ExternalLink size={16} /></a></div>}
        </div>
        <div className="flex flex-col justify-center p-7 md:p-12"><p className="eyebrow text-rose-700">{item.category} · {item.format}</p><h3 id="video-title" className="mt-4 font-display text-4xl leading-tight text-ink">{item.title}</h3><p className="mt-4 text-muted">{item.brand}</p><div className="mt-8 rounded-xl border border-rose-700/15 bg-rose-200/20 p-4 text-sm leading-6 text-muted">{item.demo ? <><strong className="text-ink">Material demonstrativo.</strong> Este projeto ilustra a apresentação do portfólio e deve ser substituído por um trabalho autorizado.</> : <>Conteúdo original do perfil <strong className="text-ink">@blogdapriscilaa</strong>. Clique em &quot;Ver no Instagram&quot; para assistir o conteúdo completo na plataforma.</>}</div></div>
      </div>
    </div>
  );
}
