export const dynamic = "force-static";

import { cmsEnabled } from "@/config/features";
import { safeRedirectPath } from "@/lib/safe-redirect";

export async function GET(request: Request) {
  if (!cmsEnabled) return new Response(null, { status: 404 });
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const redirectPath = safeRedirectPath(url.searchParams.get("redirect") || "/", "");

  if (!process.env.SANITY_PREVIEW_SECRET || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return Response.json({ message: "Acesso não autorizado." }, { status: 401 });
  }
  if (!redirectPath) {
    return Response.json({ message: "Destino inválido." }, { status: 400 });
  }

  try {
    const { draftMode } = await import("next/headers");
    const draft = await draftMode();
    draft.enable();
  } catch {
    // Ignora draftMode durante geração puramente estática
  }

  return Response.redirect(new URL(redirectPath, url.origin));
}
