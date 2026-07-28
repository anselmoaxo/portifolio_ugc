import type { LeadData } from "@/types/content";

export function buildLeadMessage(data: LeadData) {
  return `Olá, Priscila! Conheci seu portfólio e gostaria de conversar sobre uma parceria UGC.

Nome: ${data.name}
Empresa: ${data.company}
Instagram: ${data.instagram || "Não informado"}
Tipo de conteúdo: ${data.contentType}
Prazo: ${data.deadline}
Mensagem: ${data.message}`;
}
