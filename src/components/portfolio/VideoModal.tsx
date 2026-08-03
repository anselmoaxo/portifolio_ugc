"use client";

import { ExternalLink, Play, X } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { useEffect, useRef } from "react";
import { resolveMediaPath } from "@/lib/asset-path";
import type { PortfolioVideo } from "@/types/content";

export function VideoModal({ item, onClose }: { item: PortfolioVideo | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", keydown);
    };
  }, [item, onClose]);

  if (!item) return null;
  const publicationUrl = item.externalUrl ?? item.videoUrl;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-ink/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="video-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} className="relative grid max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-cream shadow-2xl md:grid-cols-[minmax(280px,.75fr)_1fr]">
        <button ref={closeRef} onClick={onClose} className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-ink shadow" aria-label="Fechar detalhes">
          <X size={19} />
        </button>
        <div className="relative aspect-[9/16] min-h-[26rem] overflow-hidden bg-brown">
          <OptimizedImage src={resolveMediaPath(item.thumbnail)} alt={item.title} fill sizes="420px" className="object-cover" />
          <div className="absolute inset-0 grid place-items-center bg-ink/35 p-8 text-center">
            <div>
              <Play size={48} className="mx-auto text-white" aria-hidden="true" />
              <a href={publicationUrl} target="_blank" rel="noopener noreferrer" className="button-light mt-6 inline-flex items-center gap-2">
                Ver publicação no Instagram <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center p-7 md:p-12">
          <p className="eyebrow text-rose-700">{item.category} · {item.format}</p>
          <h2 id="video-title" className="mt-4 font-display text-4xl leading-tight text-ink">{item.title}</h2>
          <p className="mt-4 text-muted">{item.brand}</p>
          <p className="mt-8 rounded-xl border border-rose-700/15 bg-rose-200/20 p-4 text-sm leading-6 text-muted">
            Conteúdo publicado no perfil <strong className="text-ink">@blogdapriscilaa</strong>. A publicação completa será aberta no Instagram.
          </p>
        </div>
      </div>
    </div>
  );
}
