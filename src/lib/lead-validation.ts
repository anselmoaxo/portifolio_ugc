import type { LeadData } from "@/types/content";

const required: Array<keyof LeadData> = ["name", "company", "email", "whatsapp", "segment", "contentType", "deadline", "message"];

export function validateLead(input: Partial<LeadData>) {
  const errors: Record<string, string> = {};
  for (const field of required) {
    if (!String(input[field] ?? "").trim()) errors[field] = "Preencha este campo.";
  }
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) errors.email = "Informe um e-mail válido.";
  if (input.whatsapp && input.whatsapp.replace(/\D/g, "").length < 10) errors.whatsapp = "Informe um WhatsApp com DDD.";
  if (!input.privacy) errors.privacy = "É necessário aceitar a política de privacidade.";
  if ((input.message?.length ?? 0) > 2000) errors.message = "A mensagem deve ter até 2.000 caracteres.";
  return errors;
}
