import { Download, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { resolveMediaPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Portfólio em PDF | Priscila",
  description: "Baixe o portfólio completo da Priscila — criadora de conteúdo UGC, influenciadora digital e media kit.",
  openGraph: { title: "Portfólio em PDF | Priscila", description: "Media kit e portfólio UGC completo para download." },
};

const pdfUrl = resolveMediaPath("/portfolio/Portfolio-Priscila.pdf");

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-cream pt-28">
      <div className="container-shell pb-16">
        <p className="eyebrow text-rose-700">Media Kit</p>
        <h1 className="mt-5 font-display text-5xl text-ink md:text-7xl">
          Portfólio <span className="italic text-rose-700">Priscila</span>
        </h1>
        <p className="mt-4 text-lg text-muted">
          Visualize ou baixe o portfólio oficial completo.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={pdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary inline-flex"
          >
            <Download size={18} />
            Baixar PDF
          </a>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary inline-flex"
          >
            <ExternalLink size={18} />
            Abrir em tela cheia
          </a>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-brown/15 bg-white shadow-lg">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=1`}
            title="Portfólio Priscila Almeida"
            className="h-[80vh] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </main>
  );
}
