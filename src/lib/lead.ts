import type { LeadData } from "@/types/content";

// Workflow n8n "Contato - Portfólio UGC": entrega o contato no WhatsApp da Priscila.
export const LEAD_WEBHOOK_URL = "https://n8n.anselmotech.com.br/webhook/contato-ugc-7f3a9c2e1b5d4086a1c9e8d27b46f035";

export type LeadResult = "sent" | "invalid" | "failed";

export async function sendLead(data: LeadData, fetchImpl: typeof fetch = fetch, timeoutMs = 12000): Promise<LeadResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: data.name,
        empresa: data.company,
        tipo_conteudo: data.contentType,
        mensagem: data.message,
        website: data.website ?? "",
      }),
      signal: controller.signal,
    });
    if (response.status === 400) return "invalid";
    const body = await response.json().catch(() => ({}));
    return response.ok && body?.ok === true ? "sent" : "failed";
  } catch {
    return "failed";
  } finally {
    clearTimeout(timer);
  }
}
