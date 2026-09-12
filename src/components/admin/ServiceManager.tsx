"use client";

import { useActionState } from "react";
import { deleteService, saveService, type AdminActionState } from "@/app/admin/actions";
import type { AdminService } from "@/sanity/admin";

const initialState: AdminActionState = { ok: false, message: "" };

function ServiceForm({ service, enabled }: { service?: AdminService; enabled: boolean }) {
  const [state, action, pending] = useActionState(saveService, initialState);
  const suffix = service?.id ?? "new";
  return (
    <form action={action} className="grid gap-4 border-t border-white/10 p-5 sm:grid-cols-2">
      {service ? <input type="hidden" name="id" value={service.id} /> : null}
      <div><label htmlFor={`service-name-${suffix}`}>Nome *</label><input className="form-field" id={`service-name-${suffix}`} name="name" required maxLength={100} defaultValue={service?.name} /></div>
      <div><label htmlFor={`service-icon-${suffix}`}>Ícone *</label><select className="form-field" id={`service-icon-${suffix}`} name="icon" defaultValue={service?.icon ?? "sparkles"}><option value="sparkles">Destaque</option><option value="camera">Câmera</option><option value="video">Vídeo</option></select></div>
      <div className="sm:col-span-2"><label htmlFor={`service-description-${suffix}`}>Descrição *</label><textarea className="form-field" id={`service-description-${suffix}`} name="description" required rows={3} maxLength={500} defaultValue={service?.description} /></div>
      <div className="sm:col-span-2"><label htmlFor={`service-benefits-${suffix}`}>Benefícios (um por linha)</label><textarea className="form-field" id={`service-benefits-${suffix}`} name="benefits" rows={4} defaultValue={service?.benefits.join("\n")} /></div>
      <div><label htmlFor={`service-order-${suffix}`}>Ordem</label><input className="form-field" id={`service-order-${suffix}`} name="order" type="number" min="0" defaultValue={service?.order ?? 0} /></div>
      <label className="flex items-center gap-2 self-end pb-3"><input name="published" type="checkbox" defaultChecked={service?.published ?? true} /> Exibir no site</label>
      {state.message ? <p className={`sm:col-span-2 rounded-xl px-4 py-3 text-sm ${state.ok ? "bg-emerald-400/10 text-emerald-200" : "bg-rose-400/10 text-rose-200"}`}>{state.message}</p> : null}
      <div className="flex flex-wrap gap-3 sm:col-span-2"><button className="button-light disabled:opacity-50" disabled={!enabled || pending}>{pending ? "Salvando…" : service ? "Salvar serviço" : "Criar serviço"}</button>{service ? <button className="rounded-full border border-rose-300/20 px-4 py-2 text-xs font-bold text-rose-200" formAction={deleteService} name="id" value={service.id} type="submit" onClick={(event) => { if (!window.confirm(`Excluir o serviço “${service.name}”?`)) event.preventDefault(); }}>Excluir</button> : null}</div>
    </form>
  );
}

export function ServiceManager({ services, enabled }: { services: AdminService[]; enabled: boolean }) {
  return (
    <section id="servicos" className="mt-12 scroll-mt-8">
      <p className="eyebrow text-[#c98d7c]">Oferta comercial</p><h2 className="mt-2 font-display text-4xl">Serviços</h2>
      <details className="group mt-6 rounded-3xl border border-white/10 bg-white/[.04]"><summary className="flex cursor-pointer list-none justify-between p-5 font-semibold">Adicionar serviço <span className="text-2xl text-white/40 group-open:rotate-45">+</span></summary><ServiceForm enabled={enabled} /></details>
      <div className="mt-4 grid gap-3 md:grid-cols-2">{services.map((service) => <details key={service.id} className="rounded-2xl border border-white/10 bg-white/[.03]"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5"><span><strong>{service.name}</strong><small className="mt-1 block text-white/40">{service.published ? "Publicado" : "Oculto"} · ordem {service.order}</small></span><span className="text-xs text-white/40">Editar</span></summary><ServiceForm service={service} enabled={enabled} /></details>)}</div>
    </section>
  );
}
