import { notFound } from "next/navigation";
import { cmsEnabled } from "@/config/features";
import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: false }, alternates: { canonical: null } };
import { sanityEnv } from "@/sanity/env";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  if (!cmsEnabled) notFound();
  if (!sanityEnv.configured) {
    return <main className="grid min-h-screen place-items-center bg-cream px-6"><p>Sanity ainda não configurado.</p></main>;
  }
  const { SanityStudio } = await import("@/components/admin/SanityStudio");
  return <SanityStudio />;
}

