"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, MessageCircle, RotateCcw, Send } from "lucide-react";
import { useRef, useState } from "react";
import { assetPath } from "@/lib/asset-path";
import { sendLead } from "@/lib/lead";
import { buildLeadMessage } from "@/lib/whatsapp";
import type { LeadData } from "@/types/content";

const contentOptions = ["Vídeo UGC", "Reels", "Stories", "Unboxing", "Resenha", "Fotografia", "Campanha completa", "Outro"];

const steps = [
  { title: "Sobre você", hint: "Quem está falando com a Priscila?" },
  { title: "O conteúdo", hint: "Que tipo de conteúdo você procura?" },
  { title: "Sua mensagem", hint: "Conte sobre o produto e o objetivo." },
] as const;

type Field = keyof Omit<LeadData, "website">;
type Status = "editing" | "sending" | "sent" | "failed";

const stepFields: Field[][] = [["name", "company", "whatsapp"], ["contentType"], ["message", "privacy"]];

const emptyLead: LeadData = { name: "", company: "", whatsapp: "", contentType: "", message: "", privacy: false };

// (11) 98765-4321 enquanto digita.
function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function normalize(value: string, limit: number) {
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, limit);
}

function validate(data: LeadData, fields: Field[]) {
  const errors: Partial<Record<Field, string>> = {};
  if (fields.includes("name") && !data.name) errors.name = "Informe seu nome.";
  if (fields.includes("company") && !data.company) errors.company = "Informe a empresa ou marca.";
  if (fields.includes("whatsapp") && !/^\d{10,13}$/.test(data.whatsapp.replace(/\D/g, ""))) errors.whatsapp = "Informe um WhatsApp com DDD.";
  if (fields.includes("contentType") && !data.contentType) errors.contentType = "Escolha o tipo de conteúdo.";
  if (fields.includes("message") && !data.message) errors.message = "Escreva uma mensagem.";
  if (fields.includes("privacy") && !data.privacy) errors.privacy = "Aceite a política de privacidade para continuar.";
  return errors;
}

export function LeadForm({ whatsapp }: { whatsapp: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lead, setLead] = useState<LeadData>(emptyLead);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("editing");
  const [submitError, setSubmitError] = useState("");

  const clean: LeadData = {
    name: normalize(lead.name, 100),
    company: normalize(lead.company, 100),
    whatsapp: normalize(lead.whatsapp, 20),
    contentType: normalize(lead.contentType, 60),
    message: normalize(lead.message, 1000),
    privacy: lead.privacy,
  };
  const whatsappLink = /^\d{12,13}$/.test(whatsapp)
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(buildLeadMessage(clean))}`
    : "";

  function update<K extends Field>(field: K, value: LeadData[K]) {
    setLead((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function focusFirst(fieldErrors: Partial<Record<Field, string>>) {
    const first = Object.keys(fieldErrors)[0];
    if (first) setTimeout(() => formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(), 320);
  }

  function goTo(next: number) {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  }

  function next() {
    const stepErrors = validate(clean, stepFields[step]);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length) return focusFirst(stepErrors);
    goTo(step + 1);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    if (step < steps.length - 1) return next();

    const allErrors = validate(clean, stepFields.flat());
    setErrors(allErrors);
    if (Object.keys(allErrors).length) {
      const firstStep = stepFields.findIndex((fields) => fields.some((field) => allErrors[field]));
      if (firstStep !== step) goTo(firstStep);
      return focusFirst(allErrors);
    }

    // Bot preencheu o campo escondido: finge sucesso e não envia nada.
    if (honeypot) return setStatus("sent");

    setStatus("sending");
    setSubmitError("");
    const result = await sendLead({ ...clean, website: honeypot });
    if (result === "sent") {
      setStatus("sent");
    } else if (result === "invalid") {
      setStatus("editing");
      setSubmitError("Confira os campos e tente de novo.");
    } else {
      setStatus("failed");
    }
  }

  function restart(keepData: boolean) {
    if (!keepData) setLead(emptyLead);
    setErrors({});
    setSubmitError("");
    setStatus("editing");
    setDirection(-1);
    setStep(keepData ? steps.length - 1 : 0);
  }

  const slide = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: (d: number) => ({ opacity: 0, x: d * 40 }),
        animate: { opacity: 1, x: 0 },
        exit: (d: number) => ({ opacity: 0, x: d * -40 }),
      };

  if (status === "sent" || status === "failed") {
    const sent = status === "sent";
    return (
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="lead-card flex flex-col items-start gap-5"
        role="status"
        aria-live="polite"
      >
        <span className={`grid size-14 place-items-center rounded-full ${sent ? "bg-[#f8f3ed] text-[#292320]" : "bg-white/10 text-white"}`}>
          {sent ? <Check size={26} /> : <MessageCircle size={26} />}
        </span>
        <h3 className="font-display text-4xl leading-tight">{sent ? "Mensagem enviada!" : "Quase lá"}</h3>
        <p className="max-w-lg leading-7 text-white/70">
          {sent
            ? "Obrigada pelo contato. A Priscila recebeu sua mensagem e vai responder em breve."
            : "Não consegui enviar por aqui agora. Sua mensagem já está pronta: é só continuar pelo WhatsApp."}
        </p>
        <div className="flex flex-wrap gap-3">
          {!sent && whatsappLink && (
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="button-light" data-umami-event="Formulário: fallback WhatsApp">
              <MessageCircle size={17} /> Continuar no WhatsApp
            </a>
          )}
          <button type="button" onClick={() => restart(!sent)} className="lead-ghost">
            <RotateCcw size={16} /> {sent ? "Enviar outra mensagem" : "Tentar de novo"}
          </button>
        </div>
      </motion.div>
    );
  }

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="lead-card">
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[.18em] text-white/55">
          <span>Etapa {step + 1} de {steps.length}</span>
          <span className="sm:hidden">{steps[step].title}</span>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-[#e5c5bb] to-[#f8f3ed]" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }} />
        </div>
        <ol className="mt-5 hidden gap-2 sm:flex" aria-label="Etapas do formulário">
          {steps.map((item, index) => (
            <li key={item.title} className={`lead-step ${index === step ? "lead-step-active" : index < step ? "lead-step-done" : ""}`} aria-current={index === step ? "step" : undefined}>
              <span className="lead-step-dot">{index < step ? <Check size={12} /> : index + 1}</span>
              {item.title}
            </li>
          ))}
        </ol>
      </div>

      <h3 className="font-display text-3xl leading-tight md:text-4xl" aria-live="polite">{steps[step].hint}</h3>

      <div className="relative mt-7 min-h-[14rem]">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div key={step} custom={direction} variants={slide} initial="initial" animate="animate" exit="exit" transition={{ duration: reduceMotion ? 0.1 : 0.28, ease: "easeOut" }}>
            {step === 0 && (
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="name">Seu nome *</label>
                  <input className="form-field" id="name" name="name" value={lead.name} onChange={(e) => update("name", e.target.value)} maxLength={100} autoComplete="name" placeholder="Como podemos te chamar?" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                  <FieldError id="name-error" text={errors.name} />
                </div>
                <div>
                  <label htmlFor="company">Empresa ou marca *</label>
                  <input className="form-field" id="company" name="company" value={lead.company} onChange={(e) => update("company", e.target.value)} maxLength={100} autoComplete="organization" placeholder="Nome da marca" aria-invalid={!!errors.company} aria-describedby={errors.company ? "company-error" : undefined} />
                  <FieldError id="company-error" text={errors.company} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="whatsapp">Seu WhatsApp *</label>
                  <input className="form-field" id="whatsapp" name="whatsapp" type="tel" inputMode="tel" value={lead.whatsapp} onChange={(e) => update("whatsapp", formatPhone(e.target.value))} maxLength={16} autoComplete="tel-national" placeholder="(11) 98765-4321" aria-invalid={!!errors.whatsapp} aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined} />
                  <FieldError id="whatsapp-error" text={errors.whatsapp} />
                </div>
              </div>
            )}

            {step === 1 && (
              <fieldset aria-describedby={errors.contentType ? "content-type-error" : undefined}>
                <legend className="sr-only">Tipo de conteúdo *</legend>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {contentOptions.map((item) => {
                    const selected = lead.contentType === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        name="contentType"
                        aria-pressed={selected}
                        onClick={() => update("contentType", item)}
                        className={`lead-chip ${selected ? "lead-chip-selected" : ""}`}
                      >
                        {selected && <Check size={14} />}
                        {item}
                      </button>
                    );
                  })}
                </div>
                <FieldError id="content-type-error" text={errors.contentType} />
              </fieldset>
            )}

            {step === 2 && (
              <div className="grid gap-5">
                <div>
                  <label htmlFor="message">Mensagem *</label>
                  <textarea className="form-field min-h-36 resize-y" id="message" name="message" value={lead.message} onChange={(e) => update("message", e.target.value)} maxLength={1000} placeholder="Conte sobre o produto, o objetivo e o conteúdo desejado." aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
                  <div className="mt-1 flex justify-between gap-4">
                    <FieldError id="message-error" text={errors.message} />
                    <span className="ml-auto text-xs text-white/40" aria-hidden="true">{lead.message.length}/1000</span>
                  </div>
                </div>
                <div>
                  <label className="mb-0 flex cursor-pointer items-start gap-3 text-sm font-normal leading-6 tracking-normal text-white/65">
                    <input type="checkbox" name="privacy" checked={lead.privacy} onChange={(e) => update("privacy", e.target.checked)} aria-invalid={!!errors.privacy} aria-describedby={errors.privacy ? "privacy-error" : undefined} className="mt-1 size-4 accent-[#b77967]" />
                    <span>Li e aceito a <a className="underline underline-offset-2 hover:text-white" href={assetPath("/politica-de-privacidade/")} target="_blank" rel="noopener noreferrer">política de privacidade</a>. *</span>
                  </label>
                  <FieldError id="privacy-error" text={errors.privacy} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {submitError && <p className="mt-4 text-sm text-rose-200" role="alert">{submitError}</p>}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {step > 0 && (
          <button type="button" onClick={() => goTo(step - 1)} className="lead-ghost" disabled={status === "sending"}>
            <ArrowLeft size={16} /> Voltar
          </button>
        )}
        <button type="submit" className="button-light ml-auto min-w-40 justify-center disabled:cursor-wait disabled:opacity-80" disabled={status === "sending"} data-umami-event={step === steps.length - 1 ? "Formulário: enviar" : undefined}>
          {step < steps.length - 1 ? (
            <>Continuar <ArrowRight size={17} /></>
          ) : status === "sending" ? (
            <><Loader2 size={17} className="animate-spin" /> Enviando...</>
          ) : (
            <>Enviar mensagem <Send size={17} /></>
          )}
        </button>
      </div>
      {step === steps.length - 1 && (
        <p className="mt-5 text-xs leading-5 text-white/45">Sua mensagem chega direto no WhatsApp da Priscila. Se algo falhar, você poderá continuar pelo WhatsApp.</p>
      )}
    </form>
  );
}

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return <p id={id} className="mt-2 text-xs text-rose-200">{text}</p>;
}
