"use client";

import { Download, FileText } from "lucide-react";
import { resolveMediaPath } from "@/lib/asset-path";

const pdfUrl = resolveMediaPath("/portfolio/Portfolio-Priscila.pdf");

export function DownloadPortfolio() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a
        href="/portfolio"
        className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border-2 border-rose-700 bg-rose-700 px-7 py-3 text-sm font-bold text-white transition hover:bg-rose-600 hover:border-rose-600"
      >
        <FileText size={18} />
        Ver Media Kit
      </a>
      <a
        href={pdfUrl}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border-2 border-ink/20 bg-white px-7 py-3 text-sm font-bold text-ink transition hover:border-ink/40 hover:-translate-y-0.5"
      >
        <Download size={18} />
        Baixar Portfólio em PDF
      </a>
    </div>
  );
}
