import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { CONTACT } from "@/config/contact";
import { SITE, siteUrl } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Saiba como os dados preenchidos para contato são tratados no portfólio da Priscila.",
  alternates: { canonical: siteUrl("/politica-de-privacidade/") },
  openGraph: { title: "Política de privacidade | Blog da Priscila", description: "Saiba como os dados preenchidos para contato são tratados no portfólio da Priscila.", url: siteUrl("/politica-de-privacidade/"), siteName: SITE.name, locale: "pt_BR", type: "website", images: [{ url: siteUrl("/og-image.png"), width: 1200, height: 630, alt: "Blog da Priscila" }] },
  twitter: { card: "summary_large_image", title: "Política de privacidade | Blog da Priscila", description: "Saiba como os dados preenchidos para contato são tratados no portfólio da Priscila.", images: [siteUrl("/og-image.png")] },
};

export default function PrivacyPolicy() {
  return (
    <article className="bg-cream pb-24 pt-36">
      <div className="container-shell max-w-3xl">
        <p className="eyebrow text-rose-700">Transparência</p>
        <h1 className="mt-5 font-display text-5xl text-ink md:text-7xl">Política de privacidade</h1>
        <p className="mt-6 text-muted">Última atualização: julho de 2026.</p>
        <div className="mt-12 space-y-10 leading-8 text-muted">
          <PolicySection title="1. Dados coletados">O formulário solicita nome, empresa ou marca, tipo de conteúdo e mensagem. Esses dados são fornecidos voluntariamente para facilitar o contato sobre uma possível parceria.</PolicySection>
          <PolicySection title="2. Finalidade">As informações são utilizadas exclusivamente para analisar e responder ao contato comercial, preparar propostas e dar continuidade à conversa solicitada.</PolicySection>
          <PolicySection title="3. Envio e armazenamento">Este site não possui banco de dados. Os dados preenchidos são usados apenas para montar uma mensagem e abrir o WhatsApp. A mensagem só é enviada quando você confirma o envio no aplicativo ou no WhatsApp Web.</PolicySection>
          <PolicySection title="4. Compartilhamento">Ao continuar no WhatsApp, as informações passam a ser processadas pelo WhatsApp/Meta conforme as políticas desse serviço. Este site não vende nem armazena os dados preenchidos.</PolicySection>
          <PolicySection title="5. Seus direitos">Você pode solicitar acesso, correção ou exclusão das informações enviadas entrando em contato pelos canais oficiais exibidos neste site.</PolicySection>
          <PolicySection title="6. Segurança e retenção">Como não há banco de dados, este site não mantém uma cópia das informações preenchidas. O histórico da conversa poderá permanecer no WhatsApp conforme as configurações dos participantes e da plataforma.</PolicySection>
          <PolicySection title="7. Contato">Dúvidas podem ser enviadas pelo Instagram <a className="text-rose-700 underline" href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">{CONTACT.instagramHandle}</a> ou pelo e-mail <a className="text-rose-700 underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</PolicySection>
          <PolicySection title="8. Serviços externos">Ao abrir publicações incorporadas do Instagram ou escolher a tradução para inglês ou espanhol, você acessará serviços externos do Instagram/Meta ou do Google Tradutor. O tratamento de dados nesses ambientes segue as políticas das respectivas plataformas.</PolicySection>
        </div>
        <Link href="/" className="button-primary mt-12">Voltar ao início</Link>
      </div>
    </article>
  );
}

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2 className="font-display text-3xl text-ink">{title}</h2><p className="mt-3">{children}</p></section>;
}
