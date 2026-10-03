// Editable in the admin panel (/admin/): src/content/site.json
import siteContent from "../content/site.json" with { type: "json" };

const { whatsappMessage, ...contact } = siteContent.contact;

export const CONTACT = contact;

export const whatsappDefaultMessage = whatsappMessage;

export const isWhatsAppConfigured = /^\d{12,13}$/.test(CONTACT.whatsapp);

export function whatsappUrl(message: string) {
  return whatsappUrlFor(CONTACT.whatsapp, message);
}

export function whatsappUrlFor(number: string, message: string) {
  if (!/^\d{12,13}$/.test(number)) return "#contato";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
