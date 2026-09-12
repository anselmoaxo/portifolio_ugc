"use client";

import Link from "next/link";
import { safeRedirectPath } from "@/lib/safe-redirect";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ configured, next = "/admin" }: { configured: boolean; next?: string }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setPending(true);
    const form = new FormData(event.currentTarget);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: String(form.get("email") ?? "").trim(),
        password: String(form.get("password") ?? ""),
      });
      if (error) {
        setMessage("E-mail ou senha incorretos.");
        return;
      }
      window.location.assign(safeRedirectPath(next));
    } catch {
      setMessage("Não foi possível entrar agora. Confira a configuração do painel.");
    } finally {
      setPending(false);
    }
  }

  if (!configured) {
    return <div className="rounded-2xl border border-[#e5c5bb]/25 bg-white/5 p-5 text-sm leading-6 text-white/70">A interface está pronta, mas o Supabase deste blog ainda precisa ser escolhido ou criado para liberar o acesso.</div>;
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label htmlFor="email">E-mail</label>
        <input className="form-field" id="email" name="email" type="email" autoComplete="email" required placeholder="seu@email.com" />
      </div>
      <div>
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="password">Senha</label>
          <Link className="mb-2 text-xs font-semibold text-[#e5c5bb] hover:text-white" href="/recuperar-senha">Esqueci minha senha</Link>
        </div>
        <input className="form-field" id="password" name="password" type="password" autoComplete="current-password" minLength={8} required placeholder="Sua senha" />
      </div>
      {message && <p role="alert" className="rounded-xl bg-[#c98d7c]/15 px-4 py-3 text-sm text-[#f3d2c9]">{message}</p>}
      <button className="button-light w-full disabled:cursor-wait disabled:opacity-60" disabled={pending} type="submit">{pending ? "Entrando…" : "Entrar no painel"}</button>
    </form>
  );
}

