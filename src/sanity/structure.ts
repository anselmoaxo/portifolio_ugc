import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list().title("Painel administrativo").items([
    S.listItem().title("Configurações do site").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    S.divider(),
    ...["portfolioItem", "service", "brand", "category", "promotion", "testimonial", "faqItem", "socialLink", "downloadableFile"].map((type) => S.documentTypeListItem(type)),
  ]);

