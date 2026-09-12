import { notFound } from "next/navigation";
import { adminEnabled } from "@/config/features";
import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: false }, alternates: { canonical: null } };
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, ExternalLink, Images, LayoutDashboard, LogOut, Settings, Trash2, Users } from "lucide-react";
import { AdminSetup } from "@/components/admin/AdminSetup";
import { BrandManager } from "@/components/admin/BrandManager";
import { PortfolioCreateForm } from "@/components/admin/PortfolioCreateForm";
import { PortfolioEditForm } from "@/components/admin/PortfolioEditForm";
import { ServiceManager } from "@/components/admin/ServiceManager";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getAdminUser } from "@/lib/auth/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getAdminContent, isSanityWriteConfigured } from "@/sanity/admin";
import { deletePortfolioItem, signOut, togglePortfolioVisibility } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!adminEnabled) notFound();
  if (!isSupabaseConfigured) return <AdminSetup />;

  const user = await getAdminUser();
  if (!user) {
    return (
      <div className="fixed inset-0 z-[200] grid place-items-center bg-[#241d1b] px-6 text-white">
        <section className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="eyebrow text-[#e5c5bb]">Acesso restrito</p>
          <h1 className="mt-4 font-display text-5xl">Seu usuário não é administrador</h1>
          <p className="mt-5 leading-7 text-white/60">O login é válido, mas este e-mail não está na lista segura de administradores.</p>
          <form action={signOut} className="mt-7"><button className="button-light" type="submit">Sair e usar outra conta</button></form>
        </section>
      </div>
    );
  }

  const { items, categories, services, brands, settings, counts } = await getAdminContent();
  const cards = [
    { label: "Trabalhos", value: counts.portfolio },
    { label: "Marcas", value: counts.brands },
    { label: "Serviços", value: counts.services },
  ];

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#171313] text-white">
      <div className="mx-auto flex min-h-full max-w-[1500px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-white/10 p-7 lg:flex lg:flex-col">
          <Link href="/" className="flex items-center gap-3 font-semibold"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#c98d7c]">P</span> Blog da Priscila</Link>
          <nav className="mt-12 space-y-2 text-sm">
            <a className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3" href="#inicio"><LayoutDashboard size={18} /> Visão geral</a>
            <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/55 hover:bg-white/5 hover:text-white" href="#conteudos"><Images size={18} /> Conteúdos</a>
            <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/55 hover:bg-white/5 hover:text-white" href="#servicos">Serviços</a>
            <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/55 hover:bg-white/5 hover:text-white" href="#marcas">Marcas</a>
            <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/55 hover:bg-white/5 hover:text-white" href="#configuracoes"><Settings size={18} /> Configurações</a>
            <span className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/35"><Users size={18} /> Usuários</span>
            <Link className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/55 hover:bg-white/5 hover:text-white" href="/studio" target="_blank"><Settings size={18} /> Studio avançado <ExternalLink size={13} /></Link>
          </nav>
          <form action={signOut} className="mt-auto"><button className="flex items-center gap-3 text-sm text-white/55 hover:text-white" type="submit"><LogOut size={17} /> Sair</button></form>
        </aside>

        <main id="inicio" className="min-w-0 flex-1 px-5 py-7 sm:px-9 lg:px-12 lg:py-10">
          <header className="flex flex-wrap items-start justify-between gap-5">
            <div><p className="eyebrow text-[#c98d7c]">Painel administrativo</p><h1 className="mt-3 font-display text-5xl sm:text-6xl">Olá, {user.email?.split("@")[0]}</h1><p className="mt-3 text-white/50">Atualize o site sem precisar alterar código.</p></div>
            <div className="flex gap-3"><Link href="/" target="_blank" className="button-secondary border-white/15 text-white">Ver site <ExternalLink size={15} /></Link><form action={signOut} className="lg:hidden"><button className="button-secondary border-white/15 text-white" aria-label="Sair"><LogOut size={17} /></button></form></div>
          </header>

          {!isSanityWriteConfigured && <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-5 py-4 text-sm leading-6 text-amber-100">Modo de leitura ativo. Para salvar textos e enviar imagens, falta configurar o token de escrita do Sanity no servidor.</div>}

          <section className="mt-9 grid gap-4 sm:grid-cols-3">
            {cards.map((card) => <article key={card.label} className="rounded-3xl border border-white/10 bg-white/[.04] p-6"><p className="text-sm text-white/45">{card.label}</p><p className="mt-3 font-display text-5xl">{card.value}</p></article>)}
          </section>

          <section id="conteudos" className="mt-12 scroll-mt-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-[#c98d7c]">Conteúdo e imagens</p><h2 className="mt-2 font-display text-4xl">Portfólio</h2></div><p className="max-w-md text-sm leading-6 text-white/45">Ao escolher uma imagem no formulário, o servidor envia o arquivo ao Sanity e grava apenas a referência segura no conteúdo.</p></div>
            <PortfolioCreateForm categories={categories} enabled={isSanityWriteConfigured} />

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
              {items.length === 0 ? <p className="p-7 text-white/50">Nenhum trabalho encontrado.</p> : items.map((item) => (
                <article key={item.id} className="grid grid-cols-[72px_1fr] items-center gap-4 border-b border-white/10 p-4 last:border-b-0 sm:grid-cols-[80px_1fr_auto]">
                  <div className="relative h-16 overflow-hidden rounded-xl bg-white/5 sm:h-20">{item.imageUrl ? <Image src={item.imageUrl} alt="" fill sizes="80px" className="object-cover" /> : <span className="grid h-full place-items-center text-white/20"><Images /></span>}</div>
                  <div className="min-w-0"><h3 className="truncate font-semibold">{item.title}</h3><p className="mt-1 text-sm text-white/40">{item.category || "Sem categoria"} · ordem {item.order}</p>{item.featured && <span className="mt-2 inline-block rounded-full bg-[#c98d7c]/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#e5c5bb]">Destaque</span>}</div>
                  <div className="col-span-2 flex justify-end gap-2 sm:col-span-1">
                    <PortfolioEditForm item={item} categories={categories} enabled={isSanityWriteConfigured} />
                    <form action={togglePortfolioVisibility}><input type="hidden" name="id" value={item.id} /><input type="hidden" name="published" value={String(item.published)} /><button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/55 hover:text-white" title={item.published ? "Ocultar do site" : "Exibir no site"}>{item.published ? <Eye size={17} /> : <EyeOff size={17} />}</button></form>
                    <details className="relative"><summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full border border-white/10 text-white/40 hover:text-rose-200" title="Excluir"><Trash2 size={17} /></summary><form action={deletePortfolioItem} className="absolute bottom-12 right-0 z-10 w-56 rounded-2xl border border-white/10 bg-[#302827] p-4 shadow-2xl"><p className="text-xs leading-5 text-white/60">Excluir “{item.title}” definitivamente?</p><input type="hidden" name="id" value={item.id} /><button className="mt-3 rounded-full bg-rose-300 px-3 py-2 text-xs font-bold text-[#302827]" type="submit">Confirmar exclusão</button></form></details>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <ServiceManager services={services} enabled={isSanityWriteConfigured} />
          <BrandManager brands={brands} enabled={isSanityWriteConfigured} />
          {settings ? <SettingsForm settings={settings} enabled={isSanityWriteConfigured} /> : null}
        </main>
      </div>
    </div>
  );
}
