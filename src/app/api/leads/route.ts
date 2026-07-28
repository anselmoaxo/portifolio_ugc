import { NextResponse } from "next/server";
import { validateLead } from "@/lib/lead-validation";
import type { LeadData } from "@/types/content";

const webhookUrl = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL;

export async function POST(request: Request) {
  let data: LeadData;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  if (data.website) return NextResponse.json({ success: true });

  const errors = validateLead(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Revise os campos informados.", errors }, { status: 400 });
  }

  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook não configurado.", fallback: true }, { status: 503 });
  }

  const payload = {
    ...data,
    website: undefined,
    source: "portfolio-blogdapriscilaa",
    submittedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Erro ao enviar para o webhook.", fallback: true }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Não foi possível enviar. Tente pelo WhatsApp.", fallback: true }, { status: 502 });
  }
}
