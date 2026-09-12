import { createClient, type SanityDocument } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import { createReadStream, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { partnerBrands } from "../src/data/brands.ts";
import { portfolioVideos } from "../src/data/portfolio.ts";
import { CONTACT, whatsappDefaultMessage } from "../src/config/contact.ts";
import { SITE } from "../src/config/site.ts";

const args = new Set(process.argv.slice(2));
const execute = args.has("--execute");
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "development";
const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const token = process.env.SANITY_API_TOKEN;
const productionConfirmed = args.has("--production") && args.has("--confirm-production=production");

if (dataset === "production" && !productionConfirmed) throw new Error("Produção bloqueada. Use --production --confirm-production=production conscientemente.");
if (execute && !projectId) throw new Error("SANITY_PROJECT_ID ou NEXT_PUBLIC_SANITY_PROJECT_ID é obrigatório para executar.");

const client = execute && !token
  ? getCliClient({ apiVersion: "2026-08-01" }).withConfig({ projectId, dataset, useCdn: false })
  : createClient({ projectId: projectId || "dry-run", dataset, apiVersion: "2026-08-01", token, useCdn: false });
const manifest: { dataset: string; dryRun: boolean; startedAt: string; documents: Array<{ id: string; before: SanityDocument | null }>; assets: string[]; errors: string[] } = {
  dataset, dryRun: !execute, startedAt: new Date().toISOString(), documents: [], assets: [], errors: [],
};

const slugify = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const publicFile = (url: string) => path.join(process.cwd(), "public", url.replace(/^\//, ""));

async function uploadImage(url: string, alt: string) {
  const file = publicFile(url);
  if (!existsSync(file)) throw new Error(`Imagem ausente: ${file}`);
  if (!execute) return { _type: "image", alt, asset: { _type: "reference", _ref: `dry-run-${slugify(path.basename(file))}` } };
  const asset = await client.assets.upload("image", createReadStream(file), { filename: path.basename(file) });
  manifest.assets.push(asset._id);
  return { _type: "image", alt, asset: { _type: "reference", _ref: asset._id } };
}

async function upsert(document: Record<string, unknown> & { _id: string; _type: string }) {
  const before = execute ? await client.getDocument<SanityDocument>(document._id) : null;
  manifest.documents.push({ id: document._id, before: before ?? null });
  if (execute) await client.createOrReplace(document);
  console.log(`${execute ? "migrado" : "simulado"}: ${document._id}`);
}

async function main() {
  const categories = [...new Set(portfolioVideos.map((item) => item.category))];
  for (const [order, name] of categories.entries()) await upsert({ _id: `category.${slugify(name)}`, _type: "category", name, slug: { _type: "slug", current: slugify(name) }, order });

  for (const [order, brand] of partnerBrands.entries()) await upsert({
    _id: `brand.${brand.id}`, _type: "brand", legacyId: brand.id, name: brand.name || brand.alt || brand.id,
    slug: { _type: "slug", current: brand.id }, logo: await uploadImage(brand.image, brand.alt || `Logotipo da marca ${brand.name}`), order, published: true,
  });

  await upsert({ _id: "service.video-ugc", _type: "service", name: "Vídeos UGC", description: "Produção de vídeos com apresentação, uso e experiência com produtos.", icon: "video", order: 1, published: true });
  await upsert({ _id: "service.fotografia-ugc", _type: "service", name: "Fotografia UGC", description: "Fotografias de produtos em composições relacionadas à rotina e ao autocuidado.", icon: "camera", order: 2, published: true });

  for (const [order, item] of portfolioVideos.entries()) await upsert({
    _id: `portfolio.${item.id}`, _type: "portfolioItem", legacyId: String(item.id), title: item.title,
    slug: { _type: "slug", current: `${slugify(item.title)}-${item.id}` },
    mainImage: await uploadImage(item.thumbnail, item.title), videoUrl: item.videoUrl, externalUrl: item.externalUrl,
    source: item.source, format: item.format, category: { _type: "reference", _ref: `category.${slugify(item.category)}` },
    order, featured: item.featured ?? false, published: true,
  });

  await upsert({
    _id: "siteSettings", _type: "siteSettings", name: SITE.name, title: SITE.title,
    subtitle: "Influenciadora e criadora de conteúdo UGC", description: SITE.description,
    heroImage: await uploadImage("/images/foto_inicio.webp", "Ambiente de gravação UGC"),
    profileImage: await uploadImage("/images/foto_sobremin.jpeg", "Priscila Almeida, criadora de conteúdo UGC"),
    whatsapp: CONTACT.whatsapp, email: CONTACT.email, instagram: CONTACT.instagram,
    instagramHandle: CONTACT.instagramHandle, tiktok: CONTACT.tiktok, whatsappMessage: whatsappDefaultMessage,
    seoTitle: SITE.title, seoDescription: SITE.description,
    ogImage: await uploadImage("/og-image.png", SITE.name),
    sectionVisibility: { about: true, metrics: true, services: true, portfolio: true, brands: true, contact: true },
  });

  const dir = path.join(process.cwd(), ".migration");
  mkdirSync(dir, { recursive: true });
  const output = path.join(dir, `migration-${dataset}-${Date.now()}.json`);
  writeFileSync(output, JSON.stringify(manifest, null, 2));
  console.log(`Manifesto: ${output}`);
}

main().catch((error) => { manifest.errors.push(error instanceof Error ? error.message : String(error)); console.error(manifest.errors.at(-1)); process.exitCode = 1; });
