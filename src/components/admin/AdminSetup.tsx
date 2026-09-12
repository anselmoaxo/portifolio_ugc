export function AdminSetup() {
  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-[#241d1b] px-6 text-white">
      <section className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="eyebrow text-[#e5c5bb]">Painel personalizado</p>
        <h1 className="mt-4 font-display text-5xl">Interface pronta para ativação</h1>
        <p className="mt-5 leading-7 text-white/65">O login real está aguardando a escolha de um projeto Supabase. Os dois projetos encontrados pertencem a outros sistemas e foram preservados.</p>
        <div className="mt-6 rounded-2xl bg-black/20 p-4 text-sm leading-6 text-white/60">Após a escolha, serão configuradas a URL, a chave publicável, a lista de administradores e o token de escrita do Sanity somente no servidor.</div>
      </section>
    </div>
  );
}

