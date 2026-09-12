import { cmsEnabled } from "@/config/features";
import { draftMode } from "next/headers";

export async function GET(request: Request) {
  if (!cmsEnabled) return new Response(null, { status: 404 });
  const draft = await draftMode();
  draft.disable();
  return Response.redirect(new URL("/", request.url));
}

