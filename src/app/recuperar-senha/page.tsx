import { notFound } from "next/navigation";
import { adminEnabled } from "@/config/features";
import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: false }, alternates: { canonical: null } };
import { AuthShell } from "@/components/auth/AuthShell";
import { RecoveryForm } from "@/components/auth/RecoveryForm";
import { SITE } from "@/config/site";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function RecoveryPage() {
  if (!adminEnabled) notFound();
  return <AuthShell eyebrow="Recuperação de acesso" title="Vamos recuperar sua senha" description="Informe seu e-mail e enviaremos um link seguro para redefinir a senha."><RecoveryForm configured={isSupabaseConfigured} siteUrl={SITE.url} /></AuthShell>;
}

