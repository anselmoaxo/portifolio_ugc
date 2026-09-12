export const dynamic = "force-static";

import { safeRedirectPath } from "@/lib/safe-redirect";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const redirectPath = safeRedirectPath(url.searchParams.get("redirect") || "/", "");

  try {
    const { draftMode } = await import("next/headers");
    const draft = await draftMode();
    draft.disable();
  } catch {
    // Ignora draftMode durante exportação estática
  }

  return Response.redirect(new URL(redirectPath || "/", url.origin));
}
