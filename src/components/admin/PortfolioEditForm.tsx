"use client";

import { useActionState } from "react";
import { updatePortfolioItem, type AdminActionState } from "@/app/admin/actions";
import type { AdminCategory, AdminPortfolioItem } from "@/sanity/admin";

const initialState: AdminActionState = { ok: false, message: "" };

export function PortfolioEditForm({ item, categories, enabled }: { item: AdminPortfolioItem; categories: AdminCategory[]; enabled: boolean }) {
  const [state, action, pending] = useActionState(updatePortfolioItem, initialState);
  return (
    <details className="relative">
      <summary className="cursor-pointer list-none rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-white/60 hover:text-white">Editar</summary>
      <form action={action} className="fixed inset-x-4 top-1/2 z-50 mx-auto max-h-[90vh] max-w-2xl -translate-y-1/2 overflow-y-auto rounded-3xl border border-white/10 bg-[#302827] p-6 shadow-2xl sm:inset-x-10">
        <div className="mb-5 flex items-start justify-between gap-4"><div><p className="eyebrow text-[#c98d7c]">Editar trabalho</p><h3 className="mt-2 font-display text-3xl">{item.title}</h3></div><span className="text-xs text-white/40">Clique em “Editar” novamente para fechar</span></div>
        <input type="hidden" name="id" value={item.id} />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><label htmlFor={`title-${item.id}`}>Título *</label><input className="form-field" id={`title-${item.id}`} name="title" defaultValue={item.title} required maxLength={120} /></div>
          <div><label htmlFor={`category-${item.id}`}>Categoria *</label><select className="form-field" id={`category-${item.id}`} name="categoryId" defaultValue={item.categoryId} required>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>
          <div><label htmlFor={`order-${item.id}`}>Ordem</label><input className="form-field" id={`order-${item.id}`} name="order" type="number" min="0" defaultValue={item.order} /></div>
          <div className="sm:col-span-2"><label htmlFor={`description-${item.id}`}>Descrição curta</label><textarea className="form-field" id={`description-${item.id}`} name="shortDescription" rows={3} maxLength={180} defaultValue={item.shortDescription} /></div>
          <div className="sm:col-span-2"><label htmlFor={`url-${item.id}`}>Link do vídeo ou publicação</label><input className="form-field" id={`url-${item.id}`} name="externalUrl" type="url" defaultValue={item.externalUrl} /></div>
          <div><label htmlFor={`image-${item.id}`}>Substituir imagem</label><input className="form-field" id={`image-${item.id}`} name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" /></div>
          <div><label htmlFor={`alt-${item.id}`}>Descrição acessível</label><input className="form-field" id={`alt-${item.id}`} name="imageAlt" maxLength={180} defaultValue={item.imageAlt} /></div>
          <div className="flex flex-wrap gap-6 sm:col-span-2"><label className="flex items-center gap-2"><input name="published" type="checkbox" defaultChecked={item.published} /> Exibir no site</label><label className="flex items-center gap-2"><input name="featured" type="checkbox" defaultChecked={item.featured} /> Destaque</label></div>
        </div>
        {state.message && <p className={`mt-4 rounded-xl px-4 py-3 text-sm ${state.ok ? "bg-emerald-400/10 text-emerald-200" : "bg-rose-400/10 text-rose-200"}`} role="status">{state.message}</p>}
        <button className="button-light mt-5 disabled:opacity-50" type="submit" disabled={!enabled || pending}>{pending ? "Salvando…" : "Salvar alterações"}</button>
      </form>
    </details>
  );
}
