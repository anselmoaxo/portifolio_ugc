import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

import { safeRedirectPath } from "@/lib/safe-redirect";
import { adminEnabled } from "@/config/features";

export async function GET(request: Request) {
  if (!adminEnabled) return new Response(null, { status: 404 });
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = safeRedirectPath(url.searchParams.get("next"));
  const supabase = await createClient();

  if (code && supabase) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, url.origin));
  }

  return NextResponse.redirect(new URL("/login?erro=link-invalido", url.origin));
}

