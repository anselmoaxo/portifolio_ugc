import { MessageCircle } from "lucide-react";
import { isWhatsAppConfigured, whatsappDefaultMessage, whatsappUrl } from "@/config/contact";

export function WhatsAppButton() {
  const href = isWhatsAppConfigured
    ? whatsappUrl(whatsappDefaultMessage)
    : "#contato";

  return (
    <a
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#1da851] focus-visible:outline-2 focus-visible:outline-offset-4"
      href={href}
      target={isWhatsAppConfigured ? "_blank" : undefined}
      rel={isWhatsAppConfigured ? "noreferrer" : undefined}
      aria-label="Conversar com Priscila pelo WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
