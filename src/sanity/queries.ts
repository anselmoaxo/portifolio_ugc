import { defineQuery } from "next-sanity";

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  name, title, subtitle, description,
  "heroImage": heroImage.asset->url, "heroImageAlt": heroImage.alt,
  "profileImage": profileImage.asset->url, "profileImageAlt": profileImage.alt,
  whatsapp, email, instagram, instagramHandle, tiktok, whatsappMessage,
  seoTitle, seoDescription, "ogImage": ogImage.asset->url,
  sectionVisibility
}`);

export const portfolioQuery = defineQuery(`*[_type == "portfolioItem" && published == true] | order(order asc, date desc){
  "id": coalesce(legacyId, _id), title, "slug": slug.current,
  "brand": brand->name, "category": category->name, format,
  "thumbnail": mainImage.asset->url, videoUrl, source, accent,
  featured, "externalUrl": coalesce(externalUrl, videoUrl),
  "alt": mainImage.alt
}`);

export const servicesQuery = defineQuery(`*[_type == "service" && published == true] | order(order asc, name asc){
  "id": _id, name, description, icon, benefits, order
}`);

export const brandsQuery = defineQuery(`*[_type == "brand" && published == true] | order(order asc, name asc){
  "id": coalesce(legacyId, _id), name, "image": logo.asset->url,
  "alt": logo.alt, url, order
}`);

