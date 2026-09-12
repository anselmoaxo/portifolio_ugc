"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export function RecoveryForm({ configured, siteUrl }: { configured: boolean; siteUrl: string }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const supabase = createClient();
      const redirectTo = `${siteUrl}/auth/callback?next=/redefinir-senha`;
      await supabase.auth.resetPasswordForEmail(String(form.get("email") ?? "").trim(), { redirectTo });
      setSent(true);
      setMessage("Se o e-mail estiver cadastrado, você receberá um link para criar uma nova senha.");
    } catch {
      setMessage("Não foi possível solicitar a recuperação agora.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label htmlFor="email">E-mail cadastrado</label>
        <input className="form-field" id="email" name="email" type="email" autoComplete="email" required disabled={!configured || sent} placeholder="seu@email.com" />
      </div>
      {message && <p role="status" className="rounded-xl bg-white/5 px-4 py-3 text-sm leading-6 text-white/70">{message}</p>}
      <button className="button-light w-full disabled:opacity-50" disabled={!configured || pending || sent} type="submit">{pending ? "Enviando…" : "Enviar link de recuperação"}</button>
      <Link className="block text-center text-sm font-semibold text-[#e5c5bb]" href="/login">Voltar ao login</Link>
    </form>
  );
}

