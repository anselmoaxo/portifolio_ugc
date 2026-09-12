"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function ResetPasswordForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    if (password !== String(form.get("confirmPassword") ?? "")) {
      setMessage("As senhas não são iguais.");
      return;
    }
    setPending(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      router.replace("/admin?senha=atualizada");
      router.refresh();
    } catch {
      setMessage("O link expirou ou não foi possível alterar a senha. Solicite um novo link.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div><label htmlFor="password">Nova senha</label><input className="form-field" id="password" name="password" type="password" autoComplete="new-password" minLength={8} required /></div>
      <div><label htmlFor="confirmPassword">Confirmar nova senha</label><input className="form-field" id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required /></div>
      {message && <p role="alert" className="rounded-xl bg-[#c98d7c]/15 px-4 py-3 text-sm text-[#f3d2c9]">{message}</p>}
      <button className="button-light w-full disabled:opacity-50" disabled={!configured || pending} type="submit">{pending ? "Salvando…" : "Salvar nova senha"}</button>
    </form>
  );
}

