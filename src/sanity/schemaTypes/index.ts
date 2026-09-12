import { defineArrayMember, defineField, defineType, type SchemaTypeDefinition } from "sanity";

const orderField = defineField({ name: "order", title: "Ordem", type: "number", initialValue: 0, validation: (rule) => rule.required().integer().min(0) });
const publishedField = defineField({ name: "published", title: "Exibir no site", type: "boolean", initialValue: true });
const imageWithAlt = (name: string, title: string) => defineField({
  name, title, type: "image", options: { hotspot: true },
  fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string", description: "Descreva objetivamente o conteúdo da imagem.", validation: (rule) => rule.required() })],
});

const siteSettings = defineType({
  name: "siteSettings", title: "Configurações do site", type: "document",
  groups: [{ name: "general", title: "Geral" }, { name: "contact", title: "Contato" }, { name: "seo", title: "SEO" }, { name: "sections", title: "Seções" }],
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", group: "general", validation: (rule) => rule.required() }),
    defineField({ name: "title", title: "Título principal", type: "string", group: "general", validation: (r) => r.required().max(70) }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "string", group: "general" }),
    defineField({ name: "description", title: "Descrição", type: "text", rows: 3, group: "general", validation: (rule) => rule.required() }),
    imageWithAlt("heroImage", "Foto principal"), imageWithAlt("profileImage", "Foto de perfil"),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string", group: "contact", description: "Somente país, DDD e número.", validation: (r) => r.required().regex(/^\d{12,13}$/, { name: "telefone" }) }),
    defineField({ name: "email", title: "E-mail", type: "string", group: "contact", validation: (r) => r.required().email() }),
    defineField({ name: "instagram", title: "Instagram", type: "url", group: "contact", validation: (r) => r.uri({ scheme: ["https"] }) }),
    defineField({ name: "instagramHandle", title: "Usuário do Instagram", type: "string", group: "contact" }),
    defineField({ name: "tiktok", title: "TikTok", type: "url", group: "contact", validation: (r) => r.uri({ scheme: ["https"] }) }),
    defineField({ name: "whatsappMessage", title: "Mensagem padrão do WhatsApp", type: "text", rows: 3, group: "contact", validation: (rule) => rule.required() }),
    defineField({ name: "seoTitle", title: "Título SEO", type: "string", group: "seo", validation: (r) => r.required().max(70) }),
    defineField({ name: "seoDescription", title: "Descrição SEO", type: "text", rows: 3, group: "seo", validation: (r) => r.required().min(70).max(170) }),
    imageWithAlt("ogImage", "Imagem de compartilhamento"),
    defineField({ name: "sectionVisibility", title: "Seções visíveis", type: "object", group: "sections", fields: ["about", "metrics", "services", "portfolio", "brands", "contact"].map((name) => defineField({ name, title: name, type: "boolean", initialValue: true })) }),
  ],
});

const category = defineType({ name: "category", title: "Categorias", type: "document", fields: [
  defineField({ name: "name", title: "Nome", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "slug", title: "Identificador", type: "slug", options: { source: "name" }, validation: (rule) => rule.required() }), orderField,
] });

const brand = defineType({ name: "brand", title: "Marcas", type: "document", fields: [
  defineField({ name: "legacyId", title: "ID de migração", type: "string", readOnly: true }),
  defineField({ name: "name", title: "Nome", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "slug", title: "Identificador", type: "slug", options: { source: "name" }, validation: (rule) => rule.required() }),
  imageWithAlt("logo", "Logotipo"),
  defineField({ name: "url", title: "Site", type: "url", validation: (r) => r.uri({ scheme: ["https"] }) }), orderField, publishedField,
] });

const portfolioItem = defineType({ name: "portfolioItem", title: "Trabalhos", type: "document", fields: [
  defineField({ name: "legacyId", title: "ID de migração", type: "string", readOnly: true }),
  defineField({ name: "title", title: "Título", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
  defineField({ name: "shortDescription", title: "Descrição curta", type: "text", rows: 2, validation: (r) => r.max(180) }),
  defineField({ name: "description", title: "Descrição completa", type: "array", of: [defineArrayMember({ type: "block" })] }),
  imageWithAlt("mainImage", "Imagem principal"),
  defineField({ name: "gallery", title: "Galeria", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (rule) => rule.required() })] })] }),
  defineField({ name: "videoUrl", title: "Vídeo ou publicação", type: "url", validation: (r) => r.uri({ scheme: ["https"] }) }),
  defineField({ name: "externalUrl", title: "Link externo", type: "url", validation: (r) => r.uri({ scheme: ["https"] }) }),
  defineField({ name: "source", title: "Origem", type: "string", options: { list: ["instagram", "youtube", "vimeo", "tiktok", "local", "external"] }, initialValue: "external" }),
  defineField({ name: "format", title: "Formato", type: "string" }),
  defineField({ name: "brand", title: "Marca", type: "reference", to: [{ type: "brand" }] }),
  defineField({ name: "category", title: "Categoria", type: "reference", to: [{ type: "category" }], validation: (rule) => rule.required() }),
  defineField({ name: "date", title: "Data", type: "date" }), orderField,
  defineField({ name: "featured", title: "Destaque", type: "boolean", initialValue: false }), publishedField,
] });

const service = defineType({ name: "service", title: "Serviços", type: "document", fields: [
  defineField({ name: "name", title: "Nome", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "description", title: "Descrição", type: "text", rows: 3, validation: (rule) => rule.required() }),
  defineField({ name: "icon", title: "Ícone", type: "string", options: { list: [{ title: "Vídeo", value: "video" }, { title: "Câmera", value: "camera" }, { title: "Destaque", value: "sparkles" }] }, validation: (rule) => rule.required() }),
  defineField({ name: "benefits", title: "Benefícios", type: "array", of: [defineArrayMember({ type: "string" })] }), orderField, publishedField,
] });

const promotion = defineType({ name: "promotion", title: "Cupons e descontos", type: "document", fields: [
  defineField({ name: "name", title: "Nome", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "description", title: "Descrição", type: "text", validation: (rule) => rule.required() }),
  defineField({ name: "coupon", title: "Cupom", type: "string" }),
  defineField({ name: "url", title: "Link", type: "url", validation: (r) => r.required().uri({ scheme: ["https"] }) }),
  defineField({ name: "category", title: "Categoria", type: "reference", to: [{ type: "category" }] }),
  defineField({ name: "startsAt", title: "Início", type: "datetime" }), defineField({ name: "endsAt", title: "Término", type: "datetime" }),
  defineField({ name: "featured", title: "Destaque", type: "boolean", initialValue: false }), orderField, publishedField,
] });

const testimonial = defineType({ name: "testimonial", title: "Depoimentos", type: "document", fields: [
  defineField({ name: "author", title: "Autor", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "role", title: "Cargo ou empresa", type: "string" }),
  defineField({ name: "text", title: "Depoimento", type: "text", validation: (rule) => rule.required() }), imageWithAlt("photo", "Foto"), orderField, publishedField,
] });

const faqItem = defineType({ name: "faqItem", title: "Perguntas frequentes", type: "document", fields: [
  defineField({ name: "question", title: "Pergunta", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "answer", title: "Resposta", type: "array", of: [defineArrayMember({ type: "block" })], validation: (rule) => rule.required() }), orderField, publishedField,
] });

const socialLink = defineType({ name: "socialLink", title: "Links sociais", type: "document", fields: [
  defineField({ name: "platform", title: "Plataforma", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "label", title: "Nome exibido", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "url", title: "URL", type: "url", validation: (r) => r.required().uri({ scheme: ["https"] }) }), orderField, publishedField,
] });

const downloadableFile = defineType({ name: "downloadableFile", title: "Arquivos para download", type: "document", fields: [
  defineField({ name: "title", title: "Título", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "description", title: "Descrição", type: "text" }),
  defineField({ name: "file", title: "Arquivo", type: "file", validation: (rule) => rule.required() }),
  defineField({ name: "version", title: "Versão ou data", type: "string" }), orderField, publishedField,
] });

export const schemaTypes: SchemaTypeDefinition[] = [siteSettings, portfolioItem, service, brand, category, promotion, testimonial, faqItem, socialLink, downloadableFile];
