import type { LeadData } from "@/types/content";

export function buildLeadMessage(data: LeadData) {
  return `Olá, Priscila!

Meu nome é: ${data.name}
Empresa ou marca: ${data.company}
Tipo de conteúdo: ${data.contentType}
Mensagem: ${data.message}

Conheci seu trabalho pelo portfólio e gostaria de conversar sobre uma parceria.`;
}
