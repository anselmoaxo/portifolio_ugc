"use client";

import { useActionState, useRef } from "react";
import { ImagePlus } from "lucide-react";
import { createPortfolioItem, type AdminActionState } from "@/app/admin/actions";
import type { AdminCategory } from "@/sanity/admin";

const initialState: AdminActionState = { ok: false, message: "" };

export function PortfolioCreateForm({ categories, enabled }: { categories: AdminCategory[]; enabled: boolean }) {
  const [state, action, pending] = useActionState(createPortfolioItem, initialState);
  const details = useRef<HTMLDetailsElement>(null);

  return (
    <details ref={details} className="group rounded-3xl border border-white/10 bg-white/[.04]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold">
        <span className="flex items-center gap-3"><ImagePlus size={20} /> Adicionar trabalho e imagem</span>
        <span className="text-2xl text-white/40 group-open:rotate-45">+</span>
      </summary>
      <form action={action} className="grid gap-5 border-t border-white/10 p-5 md:grid-cols-2">
        <div className="md:col-span-2"><label htmlFor="title">Título *</label><input className="form-field" id="title" name="title" required maxLength={120} /></div>
        <div><label htmlFor="categoryId">Categoria *</label><select className="form-field" id="categoryId" name="categoryId" required defaultValue=""><option value="" disabled>Selecione</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>
        <div><label htmlFor="order">Ordem</label><input className="form-field" id="order" name="order" type="number" min="0" defaultValue="0" /></div>
        <div className="md:col-span-2"><label htmlFor="shortDescription">Descrição curta</label><textarea className="form-field" id="shortDescription" name="shortDescription" rows={3} maxLength={180} /></div>
        <div className="md:col-span-2"><label htmlFor="externalUrl">Link do vídeo ou publicação</label><input className="form-field" id="externalUrl" name="externalUrl" type="url" placeholder="https://" /></div>
        <div><label htmlFor="image">Imagem (até 8 MB)</label><input className="form-field file:mr-3 file:rounded-full file:border-0 file:px-3 file:py-1" id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" /></div>
        <div><label htmlFor="imageAlt">Descrição acessível da imagem</label><input className="form-field" id="imageAlt" name="imageAlt" maxLength={180} /></div>
        <div className="flex flex-wrap gap-6 md:col-span-2">
          <label className="flex items-center gap-2"><input name="published" type="checkbox" defaultChecked /> Exibir no site</label>
          <label className="flex items-center gap-2"><input name="featured" type="checkbox" /> Marcar como destaque</label>
        </div>
        {state.message && <p className={`md:col-span-2 rounded-xl px-4 py-3 text-sm ${state.ok ? "bg-emerald-400/10 text-emerald-200" : "bg-rose-400/10 text-rose-200"}`} role="status">{state.message}</p>}
        <div className="md:col-span-2"><button className="button-light disabled:opacity-50" type="submit" disabled={!enabled || pending}>{pending ? "Enviando para o Sanity…" : "Salvar trabalho"}</button></div>
      </form>
    </details>
  );
}

