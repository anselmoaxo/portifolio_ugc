"use client";

import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { useRef, useState } from "react";
import { CONTACT, isWhatsAppConfigured } from "@/config/contact";
import { buildLeadMessage } from "@/lib/whatsapp";
import type { LeadData } from "@/types/content";

type Status = { type: "idle" | "success" | "fallback"; message?: string };

const contentOptions = [
  "Vídeo UGC",
  "Reels",
  "Stories",
  "Unboxing",
  "Review",
  "Fotografia",
  "Campanha completa",
  "Outro",
];

function validate(data: LeadData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name.trim() || data.name.length > 100) errors.name = "Nome obrigatório (máx. 100 caracteres).";
  if (!data.company.trim() || data.company.length > 100) errors.company = "Empresa obrigatória (máx. 100 caracteres).";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "E-mail válido obrigatório.";
  if (!data.whatsapp.trim() || data.whatsapp.replace(/\D/g, "").length < 10) errors.whatsapp = "WhatsApp com DDD obrigatório.";
  if (data.instagram && data.instagram.length > 100) errors.instagram = "Máximo de 100 caracteres.";
  if (!data.segment.trim()) errors.segment = "Segmento obrigatório.";
  if (!data.contentType) errors.contentType = "Selecione um tipo de conteúdo.";
  if (!data.deadline.trim()) errors.deadline = "Prazo obrigatório.";
  if (!data.message.trim() || data.message.length > 1000) errors.message = "Mensagem obrigatória (máx. 1000 caracteres).";
  if (!data.privacy) errors.privacy = "Aceite a política de privacidade.";
  return errors;
}

export function LeadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const name = String(form.get("name") || "").trim();
    const company = String(form.get("company") || "").trim();
    const email = String(form.get("email") || "").trim();
    const whatsapp = String(form.get("whatsapp") || "").trim().replace(/\D/g, "");
    const instagram = String(form.get("instagram") || "").trim();
    const segment = String(form.get("segment") || "").trim();
    const contentType = String(form.get("contentType") || "");
    const deadline = String(form.get("deadline") || "").trim();
    const message = String(form.get("message") || "").trim();
    const privacy = form.get("privacy") === "on";
    const website = String(form.get("website") || "");

    if (website) return;

    const data: LeadData = {
      name,
      company,
      email,
      whatsapp,
      instagram,
      segment,
      contentType,
      deadline,
      message: message.slice(0, 1000),
      privacy,
      website,
    };

    const nextErrors = validate(data);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    const encodedMessage = encodeURIComponent(buildLeadMessage(data));

    if (isWhatsAppConfigured) {
      formRef.current?.reset();
      setStatus({
        type: "success",
        message: "Redirecionando para o WhatsApp com sua proposta...",
      });
      setTimeout(() => {
        window.open(
          `https://wa.me/${CONTACT.whatsapp}?text=${encodedMessage}`,
          "_blank",
          "noopener,noreferrer"
        );
      }, 800);
    } else {
      setStatus({
        type: "fallback",
        message: "WhatsApp não configurado. Entre em contato pelo Instagram: @blogdapriscilaa",
      });
    }
  }

  const fieldClass = "form-field";
  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-5 md:grid-cols-2">
      <div>
        <label htmlFor="name">Nome *</label>
        <input className={fieldClass} id="name" name="name" placeholder="Seu nome completo" maxLength={100} autoComplete="name" aria-invalid={!!errors.name} />
        {errors.name && <FieldError text={errors.name} />}
      </div>
      <div>
        <label htmlFor="company">Empresa *</label>
        <input className={fieldClass} id="company" name="company" placeholder="Nome da sua marca" maxLength={100} autoComplete="organization" aria-invalid={!!errors.company} />
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
        <input className={fieldClass} id="instagram" name="instagram" placeholder="@suamarca" maxLength={100} />
        {errors.instagram && <FieldError text={errors.instagram} />}
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
        <textarea className={`${fieldClass} min-h-36 resize-y`} id="message" name="message" maxLength={1000} placeholder="Conte sobre o produto, objetivo da campanha, canais e outras informações relevantes..." aria-invalid={!!errors.message} />
        {errors.message && <FieldError text={errors.message} />}
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="md:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm font-normal leading-6 text-white/65">
          <input type="checkbox" name="privacy" className="mt-1 size-4 accent-[#b77967]" />
          <span>Li e aceito a <a className="underline underline-offset-2 hover:text-white" href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">política de privacidade</a> e autorizo o uso dos dados para este contato. *</span>
        </label>
        {errors.privacy && <FieldError text={errors.privacy} />}
      </div>
      <div className="md:col-span-2">
        <button type="submit" className="button-light w-full justify-center sm:w-auto">
          Enviar proposta pelo WhatsApp <Send size={17} />
        </button>
      </div>
      {status.type !== "idle" && (
        <div
          className={`md:col-span-2 rounded-xl border p-4 text-sm ${
            status.type === "success"
              ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
              : "border-amber-300/30 bg-amber-300/10 text-amber-100"
          }`}
          role="status"
        >
          <p className="flex items-center gap-2">
            {status.type === "success" ? <CheckCircle2 size={18} /> : <MessageCircle size={18} />}
            {status.message}
          </p>
        </div>
      )}
      <p className="md:col-span-2 text-xs text-white/35">
        Ao enviar, você será redirecionado para o WhatsApp com os dados preenchidos. Nenhum dado é armazenado neste site.
      </p>
    </form>
  );
}

function FieldError({ text }: { text: string }) {
  return <p className="mt-1 text-xs text-rose-200">{text}</p>;
}
