import Image from "next/image";
import Link from "next/link";

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#241d1b] text-white">
      <div className="grid min-h-full lg:grid-cols-[1.08fr_.92fr]">
        <section className="relative hidden overflow-hidden bg-[#b97867] p-12 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-28 -top-24 h-96 w-96 rounded-full border border-white/20" />
          <div className="absolute -bottom-44 -left-24 h-[34rem] w-[34rem] rounded-full bg-[#8f5548]/60" />
          <Link href="/" className="relative inline-flex items-center gap-3 font-semibold">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#8f5548]">P</span>
            Blog da Priscila
          </Link>
          <div className="relative max-w-xl pb-10">
            <p className="eyebrow text-white/70">Conteúdo com identidade</p>
            <p className="mt-6 font-display text-6xl leading-[.92]">Seu conteúdo, organizado do seu jeito.</p>
            <p className="mt-7 max-w-md text-lg leading-8 text-white/75">Um espaço reservado para atualizar trabalhos, imagens e informações do site.</p>
          </div>
        </section>
        <main className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-10">
          <section className="w-full max-w-md">
            <Link href="/" className="mb-10 inline-flex items-center gap-3 lg:hidden">
              <Image src="/icon.svg" alt="" width={40} height={40} />
              <span className="font-semibold">Blog da Priscila</span>
            </Link>
            <p className="eyebrow text-[#e5c5bb]">{eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-none">{title}</h1>
            <p className="mt-4 leading-7 text-white/60">{description}</p>
            <div className="mt-9">{children}</div>
          </section>
        </main>
      </div>
    </div>
  );
}
