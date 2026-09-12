import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="text-center">
        <p className="font-display text-[8rem] leading-none text-rose-200">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl text-ink">
          Página não encontrada
        </h1>
        <p className="mt-4 text-muted">
          A página que você procura não existe ou foi movida.
        </p>
        <Link href="/" className="button-primary mt-8">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
