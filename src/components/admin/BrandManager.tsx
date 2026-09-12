"use client";

import Image from "next/image";
import { useActionState } from "react";
import { deleteBrand, saveBrand, type AdminActionState } from "@/app/admin/actions";
import type { AdminBrand } from "@/sanity/admin";

const initialState: AdminActionState = { ok: false, message: "" };

function BrandForm({ brand, enabled }: { brand?: AdminBrand; enabled: boolean }) {
  const [state, action, pending] = useActionState(saveBrand, initialState);
  const suffix = brand?.id ?? "new";
  return (
    <form action={action} className="grid gap-4 border-t border-white/10 p-5 sm:grid-cols-2">
      {brand ? <input type="hidden" name="id" value={brand.id} /> : null}
      <div><label htmlFor={`brand-name-${suffix}`}>Nome *</label><input className="form-field" id={`brand-name-${suffix}`} name="name" required maxLength={100} defaultValue={brand?.name} /></div>
      <div><label htmlFor={`brand-url-${suffix}`}>Site</label><input className="form-field" id={`brand-url-${suffix}`} name="url" type="url" placeholder="https://" defaultValue={brand?.url} /></div>
      <div><label htmlFor={`brand-image-${suffix}`}>{brand ? "Substituir logotipo" : "Logotipo *"}</label><input className="form-field" id={`brand-image-${suffix}`} name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" required={!brand} /></div>
      <div><label htmlFor={`brand-alt-${suffix}`}>Descrição do logotipo *</label><input className="form-field" id={`brand-alt-${suffix}`} name="imageAlt" required={!brand?.imageAlt} maxLength={180} defaultValue={brand?.imageAlt} /></div>
      <div><label htmlFor={`brand-order-${suffix}`}>Ordem</label><input className="form-field" id={`brand-order-${suffix}`} name="order" type="number" min="0" defaultValue={brand?.order ?? 0} /></div>
      <label className="flex items-center gap-2 self-end pb-3"><input name="published" type="checkbox" defaultChecked={brand?.published ?? true} /> Exibir no site</label>
      {state.message ? <p className={`sm:col-span-2 rounded-xl px-4 py-3 text-sm ${state.ok ? "bg-emerald-400/10 text-emerald-200" : "bg-rose-400/10 text-rose-200"}`}>{state.message}</p> : null}
      <div className="flex flex-wrap gap-3 sm:col-span-2"><button className="button-light disabled:opacity-50" disabled={!enabled || pending}>{pending ? "Salvando…" : brand ? "Salvar marca" : "Criar marca"}</button>{brand ? <button className="rounded-full border border-rose-300/20 px-4 py-2 text-xs font-bold text-rose-200" formAction={deleteBrand} name="id" value={brand.id} type="submit" onClick={(event) => { if (!window.confirm(`Excluir a marca “${brand.name}”?`)) event.preventDefault(); }}>Excluir</button> : null}</div>
    </form>
  );
}

export function BrandManager({ brands, enabled }: { brands: AdminBrand[]; enabled: boolean }) {
  return (
    <section id="marcas" className="mt-12 scroll-mt-8">
      <p className="eyebrow text-[#c98d7c]">Prova social</p><h2 className="mt-2 font-display text-4xl">Marcas</h2>
      <details className="group mt-6 rounded-3xl border border-white/10 bg-white/[.04]"><summary className="flex cursor-pointer list-none justify-between p-5 font-semibold">Adicionar marca e logotipo <span className="text-2xl text-white/40 group-open:rotate-45">+</span></summary><BrandForm enabled={enabled} /></details>
      <div className="mt-4 grid gap-3 md:grid-cols-2">{brands.map((brand) => <details key={brand.id} className="rounded-2xl border border-white/10 bg-white/[.03]"><summary className="flex cursor-pointer list-none items-center gap-4 p-4">{brand.imageUrl ? <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white"><Image src={brand.imageUrl} alt="" fill sizes="48px" className="object-contain p-1" /></span> : null}<span className="min-w-0 flex-1"><strong className="truncate">{brand.name}</strong><small className="mt-1 block text-white/40">{brand.published ? "Publicada" : "Oculta"} · ordem {brand.order}</small></span><span className="text-xs text-white/40">Editar</span></summary><BrandForm brand={brand} enabled={enabled} /></details>)}</div>
    </section>
  );
}
