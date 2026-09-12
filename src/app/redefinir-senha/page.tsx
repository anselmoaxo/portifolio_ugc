import { notFound } from "next/navigation";
import { adminEnabled } from "@/config/features";
import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: false }, alternates: { canonical: null } };
import { AuthShell } from "@/components/auth/AuthShell";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  if (!adminEnabled) notFound();
  return <AuthShell eyebrow="Nova senha" title="Crie uma senha segura" description="Use pelo menos oito caracteres e evite repetir senhas de outros serviços."><ResetPasswordForm configured={isSupabaseConfigured} /></AuthShell>;
}

