import { notFound } from "next/navigation";
import { adminEnabled } from "@/config/features";
import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: false }, alternates: { canonical: null } };
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  if (!adminEnabled) notFound();
  const { next } = await searchParams;
  return <AuthShell eyebrow="Área administrativa" title="Bem-vinda de volta" description="Entre com seu e-mail e senha para cuidar do conteúdo do site."><LoginForm configured={isSupabaseConfigured} next={next} /></AuthShell>;
}

