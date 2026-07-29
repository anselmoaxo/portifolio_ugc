"use client";

import { Send } from "lucide-react";
import { useRef, useState } from "react";
import { CONTACT, isWhatsAppConfigured } from "@/config/contact";
import { assetPath } from "@/lib/asset-path";
import { buildLeadMessage } from "@/lib/whatsapp";
import type { LeadData } from "@/types/content";

const contentOptions = ["Vídeo UGC", "Reels", "Stories", "Unboxing", "Resenha", "Fotografia", "Campanha completa", "Outro"];

function normalize(value: FormDataEntryValue | null, limit: number) {
  return String(value || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, limit);
}

function validate(data: LeadData) {
  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Informe seu nome.";
  if (!data.company) errors.company = "Informe a empresa ou marca.";
  if (!data.contentType) errors.contentType = "Selecione o tipo de conteúdo.";
  if (!data.message) errors.message = "Escreva uma mensagem.";
  if (!data.privacy) errors.privacy = "Aceite a política de privacidade para continuar.";
  return errors;
}

export function LeadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (String(form.get("website") || "")) return;

    const data: LeadData = {
      name: normalize(form.get("name"), 100),
      company: normalize(form.get("company"), 100),
      contentType: normalize(form.get("contentType"), 60),
      message: normalize(form.get("message"), 1000),
      privacy: form.get("privacy") === "on",
    };

    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstField = Object.keys(nextErrors)[0];
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus());
      return;
    }

    if (!isWhatsAppConfigured) return;
    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(buildLeadMessage(data))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-5 md:grid-cols-2">
      <div>
        <label htmlFor="name">Nome *</label>
        <input className="form-field" id="name" name="name" maxLength={100} autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        <FieldError id="name-error" text={errors.name} />
      </div>
      <div>
        <label htmlFor="company">Empresa ou marca *</label>
        <input className="form-field" id="company" name="company" maxLength={100} autoComplete="organization" required aria-invalid={!!errors.company} aria-describedby={errors.company ? "company-error" : undefined} />
        <FieldError id="company-error" text={errors.company} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="contentType">Tipo de conteúdo *</label>
        <select className="form-field" id="contentType" name="contentType" defaultValue="" required aria-invalid={!!errors.contentType} aria-describedby={errors.contentType ? "content-type-error" : undefined}>
          <option value="" disabled>Selecione uma opção</option>
          {contentOptions.map((item) => <option key={item}>{item}</option>)}
        </select>
        <FieldError id="content-type-error" text={errors.contentType} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="message">Mensagem *</label>
        <textarea className="form-field min-h-36 resize-y" id="message" name="message" maxLength={1000} required placeholder="Conte sobre o produto, o objetivo e o conteúdo desejado." aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
        <FieldError id="message-error" text={errors.message} />
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="md:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm font-normal leading-6 text-white/65">
          <input type="checkbox" name="privacy" required aria-invalid={!!errors.privacy} aria-describedby={errors.privacy ? "privacy-error" : undefined} className="mt-1 size-4 accent-[#b77967]" />
          <span>Li e aceito a <a className="underline underline-offset-2 hover:text-white" href={assetPath("/politica-de-privacidade/")} target="_blank" rel="noopener noreferrer">política de privacidade</a>. *</span>
        </label>
        <FieldError id="privacy-error" text={errors.privacy} />
      </div>
      <div className="md:col-span-2">
        <button type="submit" className="button-light w-full justify-center sm:w-auto">
          Enviar pelo WhatsApp <Send size={17} />
        </button>
      </div>
      <p className="md:col-span-2 text-xs leading-5 text-white/50">
        Ao continuar, o WhatsApp será aberto com uma mensagem preenchida. A mensagem só será enviada após sua confirmação.
      </p>
    </form>
  );
}

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return <p id={id} className="mt-1 text-xs text-rose-200">{text}</p>;
}
