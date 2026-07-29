import { Download, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { SITE, siteUrl } from "@/config/site";
import { resolveMediaPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Mídia kit",
  description: "Visualize e baixe o mídia kit e o portfólio UGC de Priscila Almeida.",
  alternates: { canonical: siteUrl("/portfolio/") },
  openGraph: { title: "Mídia kit | Blog da Priscila", description: "Visualize e baixe o mídia kit e o portfólio UGC de Priscila Almeida.", url: siteUrl("/portfolio/"), siteName: SITE.name, locale: "pt_BR", type: "website", images: [{ url: siteUrl("/og-image.png"), width: 1200, height: 630, alt: "Mídia kit da Priscila" }] },
  twitter: { card: "summary_large_image", title: "Mídia kit | Blog da Priscila", description: "Visualize e baixe o mídia kit e o portfólio UGC de Priscila Almeida.", images: [siteUrl("/og-image.png")] },
};

const pdfUrl = resolveMediaPath("/portfolio/Portfolio-Priscila.pdf");

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-cream pt-28">
      <div className="container-shell pb-16">
        <p className="eyebrow text-rose-700">Mídia Kit</p>
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
            className="h-[65dvh] min-h-[28rem] w-full md:h-[80vh]"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
