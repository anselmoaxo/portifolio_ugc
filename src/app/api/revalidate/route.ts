import { cmsEnabled } from "@/config/features";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

const allowedTypes = new Set(["siteSettings", "portfolioItem", "service", "brand", "category", "promotion", "testimonial", "faqItem", "socialLink", "downloadableFile"]);

export async function POST(request: NextRequest) {
  if (!cmsEnabled) return new Response(null, { status: 404 });
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return Response.json({ message: "Webhook não configurado." }, { status: 503 });

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret);
  if (!isValidSignature) return Response.json({ message: "Assinatura inválida." }, { status: 401 });
  if (!body?._type || !allowedTypes.has(body._type)) return Response.json({ message: "Tipo ignorado." }, { status: 202 });

  revalidateTag(body._type, "max");
  return Response.json({ revalidated: true, type: body._type });
}
