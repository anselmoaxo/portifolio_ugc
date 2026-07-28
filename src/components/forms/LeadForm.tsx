"use client";

import { CheckCircle2, LoaderCircle, MessageCircle, Send } from "lucide-react";
import { useRef, useState } from "react";
import { CONTACT, isWhatsAppConfigured, whatsappUrl } from "@/config/contact";
import { validateLead } from "@/lib/lead-validation";
import { buildLeadMessage } from "@/lib/whatsapp";
import type { LeadData } from "@/types/content";

type Status = { type: "idle" | "loading" | "success" | "error" | "fallback"; message?: string; whatsapp?: string };

const contentOptions = ["Vídeo UGC", "Reels", "Stories", "Unboxing", "Review", "Fotografia", "Campanha completa", "Outro"];

export function LeadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data: LeadData = {
      name: String(form.get("name") || ""),
      company: String(form.get("company") || ""),
      email: String(form.get("email") || ""),
      whatsapp: String(form.get("whatsapp") || ""),
      instagram: String(form.get("instagram") || ""),
      segment: String(form.get("segment") || ""),
      contentType: String(form.get("contentType") || ""),
      deadline: String(form.get("deadline") || ""),
      message: String(form.get("message") || ""),
      privacy: form.get("privacy") === "on",
      website: String(form.get("website") || ""),
    };
    const nextErrors = validateLead(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus({ type: "error", message: "Revise os campos destacados antes de enviar." });
      return;
    }
    setStatus({ type: "loading" });
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.fallback) {
          setStatus({
            type: "fallback",
            message: "O envio automático não está disponível. Envie pelo WhatsApp com todos os dados preenchidos.",
            whatsapp: whatsappUrl(buildLeadMessage(data)),
          });
          return;
        }
        setErrors(result.errors || {});
        throw new Error(result.error || "Não foi possível enviar.");
      }
      formRef.current?.reset();
      setStatus({ type: "success", message: "Mensagem enviada com sucesso! Obrigada pelo interesse. Retornarei em breve." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Ocorreu um erro. Tente novamente.",
      });
    }
  }

  const fieldClass = "form-field";
  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-5 md:grid-cols-2">
      <div>
        <label htmlFor="name">Nome *</label>
        <input className={fieldClass} id="name" name="name" placeholder="Seu nome completo" autoComplete="name" aria-invalid={!!errors.name} />
        {errors.name && <FieldError text={errors.name} />}
      </div>
      <div>
        <label htmlFor="company">Empresa *</label>
        <input className={fieldClass} id="company" name="company" placeholder="Nome da sua marca" autoComplete="organization" aria-invalid={!!errors.company} />
        {errors.company && <FieldError text={errors.company} />}
      </div>
      <div>
        <label htmlFor="email">E-mail *</label>
        <input className={fieldClass} id="email" name="email" type="email" placeholder="seu@email.com" autoComplete="email" aria-invalid={!!errors.email} />
        {errors.email && <FieldError text={errors.email} />}
      </div>
      <div>
        <label htmlFor="whatsapp">WhatsApp *</label>
        <input className={fieldClass} id="whatsapp" name="whatsapp" type="tel" inputMode="tel" placeholder="(00) 00000-0000" autoComplete="tel" aria-invalid={!!errors.whatsapp} />
        {errors.whatsapp && <FieldError text={errors.whatsapp} />}
      </div>
      <div>
        <label htmlFor="instagram">Instagram da marca</label>
        <input className={fieldClass} id="instagram" name="instagram" placeholder="@suamarca" />
      </div>
      <div>
        <label htmlFor="segment">Segmento *</label>
        <input className={fieldClass} id="segment" name="segment" placeholder="Ex.: beleza, moda, alimentação" aria-invalid={!!errors.segment} />
        {errors.segment && <FieldError text={errors.segment} />}
      </div>
      <div>
        <label htmlFor="contentType">Tipo de conteúdo *</label>
        <select className={fieldClass} id="contentType" name="contentType" defaultValue="" aria-invalid={!!errors.contentType}>
          <option value="" disabled>Selecione uma opção</option>
          {contentOptions.map((item) => <option key={item}>{item}</option>)}
        </select>
        {errors.contentType && <FieldError text={errors.contentType} />}
      </div>
      <div>
        <label htmlFor="deadline">Prazo desejado *</label>
        <input className={fieldClass} id="deadline" name="deadline" placeholder="Ex.: até 30 dias" aria-invalid={!!errors.deadline} />
        {errors.deadline && <FieldError text={errors.deadline} />}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="message">Mensagem *</label>
        <textarea className={`${fieldClass} min-h-36 resize-y`} id="message" name="message" maxLength={2000} placeholder="Conte sobre o produto, objetivo da campanha, canais e outras informações relevantes..." aria-invalid={!!errors.message} />
        {errors.message && <FieldError text={errors.message} />}
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="md:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm font-normal leading-6 text-white/65">
          <input type="checkbox" name="privacy" className="mt-1 size-4 accent-[#b77967]" />
          <span>Li e aceito a <a className="underline underline-offset-2 hover:text-white" href="/politica-de-privacidade" target="_blank">política de privacidade</a> e autorizo o uso dos dados para este contato. *</span>
        </label>
        {errors.privacy && <FieldError text={errors.privacy} />}
      </div>
      <div className="md:col-span-2">
        <button type="submit" disabled={status.type === "loading"} className="button-light w-full justify-center sm:w-auto">
          {status.type === "loading" ? <><LoaderCircle className="animate-spin" size={18} /> Enviando...</> : <>Solicitar proposta <Send size={17} /></>}
        </button>
      </div>
      {status.type !== "idle" && status.type !== "loading" && (
        <div
          className={`md:col-span-2 rounded-xl border p-4 text-sm ${
            status.type === "success" ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100" : "border-rose-200/30 bg-rose-200/10 text-rose-100"
          }`}
          role="status"
        >
          <p className="flex items-center gap-2">
            {status.type === "success" ? <CheckCircle2 size={18} /> : <MessageCircle size={18} />}
            {status.message}
          </p>
          {status.type === "fallback" && isWhatsAppConfigured && status.whatsapp && (
            <a className="mt-4 inline-flex items-center gap-2 font-bold underline" href={status.whatsapp} target="_blank" rel="noreferrer">
              Continuar pelo WhatsApp <MessageCircle size={16} />
            </a>
          )}
          {status.type === "fallback" && !isWhatsAppConfigured && (
            <p className="mt-3 text-xs">
              Configure o WhatsApp em <code>src/config/contact.ts</code> para habilitar este canal.
            </p>
          )}
        </div>
      )}
      {CONTACT.email === "EMAIL_DA_PRISCILA" && (
        <p className="md:col-span-2 text-xs text-white/35">
          Configure o e-mail e WhatsApp em <code>src/config/contact.ts</code> antes da publicação.
        </p>
      )}
    </form>
  );
}

function FieldError({ text }: { text: string }) {
  return <p className="mt-1 text-xs text-rose-200">{text}</p>;
}
