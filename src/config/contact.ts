export const CONTACT = {
  instagram: "https://www.instagram.com/blogdapriscilaa/",
  instagramHandle: "@blogdapriscilaa",
  email: "almeidapriscilaaxoo@gmail.com",
  whatsapp: "5511930303849",
  tiktok: "",
} as const;

export const whatsappDefaultMessage =
  "Olá, Priscila! Conheci seu portfólio e gostaria de conversar sobre uma parceria UGC.";

export const isWhatsAppConfigured = /^\d{12,13}$/.test(CONTACT.whatsapp);

export function whatsappUrl(message: string) {
  if (!isWhatsAppConfigured) return "#contato";
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}
