import { NextResponse, type NextRequest } from "next/server";
import { adminEnabled } from "./src/config/features";

export async function proxy(request: NextRequest) {
  if (!adminEnabled) return NextResponse.next();
  const { updateSession } = await import("@/lib/supabase/proxy");
  return updateSession(request);
}

export const config = { matcher: ["/admin/:path*", "/login"] };
