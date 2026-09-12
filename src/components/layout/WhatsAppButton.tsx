import { MessageCircle } from "lucide-react";
import { whatsappUrlFor } from "@/config/contact";
import type { SiteSettings } from "@/types/cms";

export function WhatsAppButton({ settings }: { settings: SiteSettings }) {
  const configured = /^\d{12,13}$/.test(settings.whatsapp);
  const href = configured
    ? whatsappUrlFor(settings.whatsapp, settings.whatsappMessage)
    : "#contato";

  return (
    <a
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 hidden size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#1da851] focus-visible:outline-2 focus-visible:outline-offset-4 sm:grid"
      href={href}
      target={configured ? "_blank" : undefined}
      rel={configured ? "noreferrer" : undefined}
      aria-label="Conversar com Priscila pelo WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
