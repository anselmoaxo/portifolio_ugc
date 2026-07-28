import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { CONTACT } from "@/config/contact";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade e tratamento dos dados enviados pelo formulário de contato.",
};

export default function PrivacyPolicy() {
  return (
    <article className="bg-cream pb-24 pt-36">
      <div className="container-shell max-w-3xl">
        <p className="eyebrow text-rose-700">Transparência</p>
        <h1 className="mt-5 font-display text-5xl text-ink md:text-7xl">Política de privacidade</h1>
        <p className="mt-6 text-muted">Última atualização: julho de 2026.</p>
        <div className="mt-12 space-y-10 leading-8 text-muted">
          <PolicySection title="1. Dados coletados">O formulário pode solicitar nome, empresa, e-mail, WhatsApp, perfil do Instagram, segmento, tipo de conteúdo, prazo e mensagem. Esses dados são fornecidos voluntariamente para permitir o atendimento de uma solicitação de parceria.</PolicySection>
          <PolicySection title="2. Finalidade">As informações são utilizadas exclusivamente para analisar e responder ao contato comercial, preparar propostas e dar continuidade à conversa solicitada.</PolicySection>
          <PolicySection title="3. Envio e armazenamento">Este site não possui banco de dados. Os dados são enviados a um webhook ou serviço externo de formulários configurado pela responsável. Quando esses canais não estiverem disponíveis, o visitante poderá optar por enviar a mensagem diretamente pelo WhatsApp.</PolicySection>
          <PolicySection title="4. Compartilhamento">As informações não são vendidas. Elas podem ser processadas pelos fornecedores técnicos usados no recebimento da mensagem, conforme as políticas e configurações desses serviços.</PolicySection>
          <PolicySection title="5. Seus direitos">Você pode solicitar acesso, correção ou exclusão das informações enviadas entrando em contato pelos canais oficiais exibidos neste site.</PolicySection>
          <PolicySection title="6. Segurança e retenção">São adotadas medidas técnicas razoáveis no transporte das informações. O período de retenção deverá se limitar ao necessário para o atendimento e cumprimento de obrigações legais aplicáveis.</PolicySection>
          <PolicySection title="7. Contato">Dúvidas podem ser enviadas pelo Instagram <a className="text-rose-700 underline" href={CONTACT.instagram} target="_blank" rel="noreferrer">{CONTACT.instagramHandle}</a>{CONTACT.email !== "EMAIL_DA_PRISCILA" ? <> ou pelo e-mail <a className="text-rose-700 underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></> : ". O e-mail oficial será adicionado antes da publicação do site."}</PolicySection>
        </div>
        <Link href="/" className="button-primary mt-12">Voltar ao início</Link>
      </div>
    </article>
  );
}

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2 className="font-display text-3xl text-ink">{title}</h2><p className="mt-3">{children}</p></section>;
}
