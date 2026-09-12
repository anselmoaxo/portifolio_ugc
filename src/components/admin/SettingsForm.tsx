"use client";

import { useActionState } from "react";
import { saveSettings, type AdminActionState } from "@/app/admin/actions";
import type { AdminSettings } from "@/sanity/admin";

const initialState: AdminActionState = { ok: false, message: "" };
const sections = [{ name: "about", label: "Sobre" }, { name: "metrics", label: "Métricas" }, { name: "services", label: "Serviços" }, { name: "portfolio", label: "Portfólio" }, { name: "brands", label: "Marcas" }, { name: "contact", label: "Contato" }];

export function SettingsForm({ settings, enabled }: { settings: AdminSettings; enabled: boolean }) {
  const [state, action, pending] = useActionState(saveSettings, initialState);
  return (
    <section id="configuracoes" className="mt-12 scroll-mt-8">
      <p className="eyebrow text-[#c98d7c]">Identidade e contato</p><h2 className="mt-2 font-display text-4xl">Configurações do site</h2>
      <form action={action} className="mt-6 grid gap-5 rounded-3xl border border-white/10 bg-white/[.04] p-5 sm:p-7 md:grid-cols-2">
        <div><label htmlFor="settings-name">Nome *</label><input className="form-field" id="settings-name" name="name" required defaultValue={settings.name} /></div>
        <div><label htmlFor="settings-title">Título principal *</label><input className="form-field" id="settings-title" name="title" required maxLength={70} defaultValue={settings.title} /></div>
        <div className="md:col-span-2"><label htmlFor="settings-subtitle">Subtítulo</label><input className="form-field" id="settings-subtitle" name="subtitle" defaultValue={settings.subtitle} /></div>
        <div className="md:col-span-2"><label htmlFor="settings-description">Descrição *</label><textarea className="form-field" id="settings-description" name="description" required rows={4} defaultValue={settings.description} /></div>
        <div><label htmlFor="settings-whatsapp">WhatsApp *</label><input className="form-field" id="settings-whatsapp" name="whatsapp" required inputMode="numeric" defaultValue={settings.whatsapp} /></div>
        <div><label htmlFor="settings-email">E-mail *</label><input className="form-field" id="settings-email" name="email" required type="email" defaultValue={settings.email} /></div>
        <div><label htmlFor="settings-instagram">Instagram</label><input className="form-field" id="settings-instagram" name="instagram" type="url" defaultValue={settings.instagram} /></div>
        <div><label htmlFor="settings-handle">Usuário do Instagram</label><input className="form-field" id="settings-handle" name="instagramHandle" defaultValue={settings.instagramHandle} /></div>
        <div><label htmlFor="settings-tiktok">TikTok</label><input className="form-field" id="settings-tiktok" name="tiktok" type="url" defaultValue={settings.tiktok} /></div>
        <div><label htmlFor="settings-message">Mensagem do WhatsApp *</label><textarea className="form-field" id="settings-message" name="whatsappMessage" required rows={3} defaultValue={settings.whatsappMessage} /></div>
        <div><label htmlFor="settings-seo-title">Título SEO *</label><input className="form-field" id="settings-seo-title" name="seoTitle" required maxLength={70} defaultValue={settings.seoTitle} /></div>
        <div><label htmlFor="settings-seo-description">Descrição SEO (70–170 caracteres) *</label><textarea className="form-field" id="settings-seo-description" name="seoDescription" required minLength={70} maxLength={170} rows={4} defaultValue={settings.seoDescription} /></div>
        {[{ field: "heroImage", label: "Foto principal", alt: settings.heroImageAlt }, { field: "profileImage", label: "Foto de perfil", alt: settings.profileImageAlt }, { field: "ogImage", label: "Imagem de compartilhamento", alt: settings.ogImageAlt }].map(({ field, label, alt }) => <div key={field} className="rounded-2xl border border-white/10 p-4"><label htmlFor={field}>{label}</label><input className="form-field" id={field} name={field} type="file" accept="image/jpeg,image/png,image/webp,image/avif" /><label className="mt-3" htmlFor={`${field}Alt`}>Texto alternativo</label><input className="form-field" id={`${field}Alt`} name={`${field}Alt`} defaultValue={alt} maxLength={180} /></div>)}
        <fieldset className="md:col-span-2"><legend className="mb-3 text-sm font-bold">Seções visíveis</legend><div className="flex flex-wrap gap-5">{sections.map((section) => <label key={section.name} className="flex items-center gap-2"><input name={`section-${section.name}`} type="checkbox" defaultChecked={settings.sectionVisibility?.[section.name] ?? true} /> {section.label}</label>)}</div></fieldset>
        {state.message ? <p className={`md:col-span-2 rounded-xl px-4 py-3 text-sm ${state.ok ? "bg-emerald-400/10 text-emerald-200" : "bg-rose-400/10 text-rose-200"}`}>{state.message}</p> : null}
        <div className="md:col-span-2"><button className="button-light disabled:opacity-50" disabled={!enabled || pending}>{pending ? "Salvando…" : "Salvar configurações"}</button></div>
      </form>
    </section>
  );
}

