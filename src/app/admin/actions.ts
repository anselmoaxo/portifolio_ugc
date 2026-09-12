"use server";

import { adminEnabled } from "@/config/features";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";
import { getSanityWriteClient } from "@/sanity/admin";
import { slugify } from "@/lib/slugify";

export type AdminActionState = { ok: boolean; message: string };

function cleanText(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

function optionalHttpsUrl(value: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") throw new Error();
    return url.toString();
  } catch {
    throw new Error("Informe um link HTTPS válido.");
  }
}

function imageBuffer(file: File) {
  if (file.size > 8 * 1024 * 1024) throw new Error("A imagem deve ter no máximo 8 MB.");
  if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) throw new Error("Use uma imagem JPEG, PNG, WebP ou AVIF.");
  return file.arrayBuffer().then((data) => {
    const bytes = new Uint8Array(data);
    const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    const png = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
    const webp = String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
    const avif = String.fromCharCode(...bytes.slice(4, 12)).includes("ftypavif");
    if (!jpeg && !png && !webp && !avif) throw new Error("O conteúdo do arquivo não corresponde a uma imagem permitida.");
    return Buffer.from(data);
  });
}

async function assertDocumentType(sanity: NonNullable<ReturnType<typeof getSanityWriteClient>>, id: string, type: "portfolioItem" | "category" | "service" | "brand" | "siteSettings") {
  const exists = await sanity.fetch<string | null>(`*[_id == $id && _type == $type][0]._id`, { id, type });
  if (!exists) throw new Error(type === "category" ? "Categoria inválida." : "Trabalho não encontrado.");
}

async function uploadImage(sanity: NonNullable<ReturnType<typeof getSanityWriteClient>>, image: File, alt: string) {
  if (!alt) throw new Error("Informe o texto alternativo da imagem.");
  const asset = await sanity.assets.upload("image", await imageBuffer(image), { filename: image.name, contentType: image.type });
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id }, alt };
}

async function requireServices() {
  const user = await getAdminUser();
  if (!user) throw new Error("Acesso não autorizado.");
  const sanity = getSanityWriteClient();
  if (!sanity) throw new Error("O token de escrita do Sanity ainda não foi configurado.");
  return { sanity, user };
}

function auditMutation(actorId: string, operation: string, documentId: string) {
  console.info(JSON.stringify({ event: "admin.content.changed", actorId, operation, documentId, timestamp: new Date().toISOString() }));
}

function refreshContent() {
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/admin");
}

export async function createPortfolioItem(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  try {
    const { sanity, user } = await requireServices();
    const title = cleanText(formData.get("title"), 120);
    const shortDescription = cleanText(formData.get("shortDescription"), 180);
    const categoryId = cleanText(formData.get("categoryId"), 200);
    const externalUrl = cleanText(formData.get("externalUrl"), 500);
    const imageAlt = cleanText(formData.get("imageAlt"), 180);
    const image = formData.get("image");
    if (!title || !categoryId) throw new Error("Preencha o título e a categoria.");
    const safeExternalUrl = optionalHttpsUrl(externalUrl);
    await assertDocumentType(sanity, categoryId, "category");

    let mainImage: { _type: "image"; asset: { _type: "reference"; _ref: string }; alt: string } | undefined;
    if (image instanceof File && image.size > 0) {
      if (!imageAlt) throw new Error("Informe o texto alternativo da imagem.");
      mainImage = await uploadImage(sanity, image, imageAlt);
    }

    const created = await sanity.create({
      _type: "portfolioItem",
      title,
      slug: { _type: "slug", current: slugify(title) },
      shortDescription,
      externalUrl: safeExternalUrl,
      source: "external",
      category: { _type: "reference", _ref: categoryId },
      mainImage,
      order: Number(formData.get("order") ?? 0) || 0,
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
    });
    auditMutation(user.id, "createPortfolioItem", created._id);
    refreshContent();
    return { ok: true, message: "Trabalho salvo no Sanity com sucesso." };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Não foi possível salvar." };
  }
}

export async function updatePortfolioItem(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  try {
    const { sanity, user } = await requireServices();
    const id = cleanText(formData.get("id"), 200);
    const title = cleanText(formData.get("title"), 120);
    const shortDescription = cleanText(formData.get("shortDescription"), 180);
    const categoryId = cleanText(formData.get("categoryId"), 200);
    const externalUrl = cleanText(formData.get("externalUrl"), 500);
    const imageAlt = cleanText(formData.get("imageAlt"), 180);
    const image = formData.get("image");
    if (!id || !title || !categoryId) throw new Error("Preencha o título e a categoria.");
    const safeExternalUrl = optionalHttpsUrl(externalUrl);
    await Promise.all([assertDocumentType(sanity, id, "portfolioItem"), assertDocumentType(sanity, categoryId, "category")]);

    const patch = sanity.patch(id).set({
      title,
      slug: { _type: "slug", current: slugify(title) },
      shortDescription,
      externalUrl: safeExternalUrl,
      category: { _type: "reference", _ref: categoryId },
      order: Number(formData.get("order") ?? 0) || 0,
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
    });

    if (image instanceof File && image.size > 0) {
      if (!imageAlt) throw new Error("Informe o texto alternativo da imagem.");
      patch.set({ mainImage: await uploadImage(sanity, image, imageAlt) });
    } else if (imageAlt) {
      patch.set({ "mainImage.alt": imageAlt });
    }

    await patch.commit();
    auditMutation(user.id, "updatePortfolioItem", id);
    refreshContent();
    return { ok: true, message: "Alterações salvas com sucesso." };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Não foi possível atualizar." };
  }
}

export async function togglePortfolioVisibility(formData: FormData) {
  const { sanity, user } = await requireServices();
  const id = cleanText(formData.get("id"), 200);
  const published = formData.get("published") !== "true";
  if (!id) throw new Error("Item inválido.");
  await assertDocumentType(sanity, id, "portfolioItem");
  await sanity.patch(id).set({ published }).commit();
  auditMutation(user.id, "togglePortfolioVisibility", id);
  refreshContent();
}

export async function deletePortfolioItem(formData: FormData) {
  const { sanity, user } = await requireServices();
  const id = cleanText(formData.get("id"), 200);
  if (!id) throw new Error("Item inválido.");
  await assertDocumentType(sanity, id, "portfolioItem");
  await sanity.delete(id);
  auditMutation(user.id, "deletePortfolioItem", id);
  refreshContent();
}

function benefitsFrom(formData: FormData) {
  return cleanText(formData.get("benefits"), 1000).split(/\r?\n/).map((item) => item.trim()).filter(Boolean).slice(0, 12);
}

export async function saveService(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  try {
    const { sanity, user } = await requireServices();
    let id = cleanText(formData.get("id"), 200);
    const name = cleanText(formData.get("name"), 100);
    const description = cleanText(formData.get("description"), 500);
    const icon = cleanText(formData.get("icon"), 20);
    if (!name || !description || !["video", "camera", "sparkles"].includes(icon)) throw new Error("Preencha os campos obrigatórios do serviço.");
    const values = { name, description, icon, benefits: benefitsFrom(formData), order: Number(formData.get("order") ?? 0) || 0, published: formData.get("published") === "on" };
    if (id) {
      await assertDocumentType(sanity, id, "service");
      await sanity.patch(id).set(values).commit();
    } else {
      id = (await sanity.create({ _type: "service", ...values }))._id;
    }
    auditMutation(user.id, "saveService", id);
    refreshContent();
    return { ok: true, message: id ? "Serviço atualizado." : "Serviço criado." };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Não foi possível salvar o serviço." };
  }
}

export async function deleteService(formData: FormData) {
  const { sanity, user } = await requireServices();
  const id = cleanText(formData.get("id"), 200);
  await assertDocumentType(sanity, id, "service");
  await sanity.delete(id);
  auditMutation(user.id, "deleteService", id);
  refreshContent();
}

export async function saveBrand(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  try {
    const { sanity, user } = await requireServices();
    let id = cleanText(formData.get("id"), 200);
    const name = cleanText(formData.get("name"), 100);
    const url = optionalHttpsUrl(cleanText(formData.get("url"), 500));
    const imageAlt = cleanText(formData.get("imageAlt"), 180);
    const image = formData.get("image");
    if (!name) throw new Error("Informe o nome da marca.");
    const values = { name, slug: { _type: "slug", current: slugify(name) }, url, order: Number(formData.get("order") ?? 0) || 0, published: formData.get("published") === "on" };
    if (id) {
      await assertDocumentType(sanity, id, "brand");
      const patch = sanity.patch(id).set(values);
      if (image instanceof File && image.size > 0) patch.set({ logo: await uploadImage(sanity, image, imageAlt) });
      else if (imageAlt) patch.set({ "logo.alt": imageAlt });
      await patch.commit();
    } else {
      if (!(image instanceof File) || image.size === 0) throw new Error("Escolha o logotipo da marca.");
      id = (await sanity.create({ _type: "brand", ...values, logo: await uploadImage(sanity, image, imageAlt) }))._id;
    }
    auditMutation(user.id, "saveBrand", id);
    refreshContent();
    return { ok: true, message: id ? "Marca atualizada." : "Marca criada." };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Não foi possível salvar a marca." };
  }
}

export async function deleteBrand(formData: FormData) {
  const { sanity, user } = await requireServices();
  const id = cleanText(formData.get("id"), 200);
  await assertDocumentType(sanity, id, "brand");
  const references = await sanity.fetch<number>(`count(*[references($id)])`, { id });
  if (references > 0) throw new Error("Esta marca está ligada a um trabalho e não pode ser excluída.");
  await sanity.delete(id);
  auditMutation(user.id, "deleteBrand", id);
  refreshContent();
}

export async function saveSettings(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  try {
    const { sanity, user } = await requireServices();
    await assertDocumentType(sanity, "siteSettings", "siteSettings");
    const email = cleanText(formData.get("email"), 200);
    const whatsapp = cleanText(formData.get("whatsapp"), 20).replace(/\D/g, "");
    const seoTitle = cleanText(formData.get("seoTitle"), 70);
    const seoDescription = cleanText(formData.get("seoDescription"), 170);
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Informe um e-mail válido.");
    if (!/^\d{12,13}$/.test(whatsapp)) throw new Error("Informe WhatsApp com país, DDD e número.");
    if (!seoTitle || seoDescription.length < 70) throw new Error("Revise o título e a descrição de SEO.");
    const values = {
      name: cleanText(formData.get("name"), 100), title: cleanText(formData.get("title"), 70), subtitle: cleanText(formData.get("subtitle"), 160),
      description: cleanText(formData.get("description"), 1000), whatsapp, email,
      instagram: optionalHttpsUrl(cleanText(formData.get("instagram"), 500)), instagramHandle: cleanText(formData.get("instagramHandle"), 100),
      tiktok: optionalHttpsUrl(cleanText(formData.get("tiktok"), 500)), whatsappMessage: cleanText(formData.get("whatsappMessage"), 500),
      seoTitle, seoDescription,
      sectionVisibility: Object.fromEntries(["about", "metrics", "services", "portfolio", "brands", "contact"].map((name) => [name, formData.get(`section-${name}`) === "on"])),
    };
    if (!values.name || !values.title || !values.description || !values.whatsappMessage) throw new Error("Preencha os campos obrigatórios.");
    const patch = sanity.patch("siteSettings").set(values);
    const imageUpdates = await Promise.all((["heroImage", "profileImage", "ogImage"] as const).map(async (field) => {
      const file = formData.get(field);
      const alt = cleanText(formData.get(`${field}Alt`), 180);
      return { field, alt, image: file instanceof File && file.size > 0 ? await uploadImage(sanity, file, alt) : null };
    }));
    imageUpdates.forEach(({ field, alt, image }) => {
      if (image) patch.set({ [field]: image });
      else if (alt) patch.set({ [`${field}.alt`]: alt });
    });
    await patch.commit();
    auditMutation(user.id, "saveSettings", "siteSettings");
    refreshContent();
    return { ok: true, message: "Configurações atualizadas." };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Não foi possível salvar as configurações." };
  }
}

export async function signOut() {
  if (!adminEnabled) redirect("/");
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/login");
}
