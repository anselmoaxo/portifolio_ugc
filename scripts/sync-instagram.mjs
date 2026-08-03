/**
 * Sincroniza posts/reels do Instagram com o site.
 *
 * Requer (via ambiente ou .env local, NUNCA commitado):
 *   IG_ACCESS_TOKEN — token de longa duração da Instagram Graph API
 *   IG_USER_ID      — id numérico da conta (business/creator)
 *
 * Sem as variáveis, o script sai com código 0 sem alterar nada
 * (o site continua funcionando com os dados atuais).
 *
 * Uso: node scripts/sync-instagram.mjs
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const INSTAGRAM_DIR = path.join(ROOT, "public", "images", "instagram");
const DATA_FILE = path.join(ROOT, "src", "data", "instagram.ts");
const GALLERY_LIMIT = 12;
const REELS_LIMIT = 6;

const token = process.env.IG_ACCESS_TOKEN;
const userId = process.env.IG_USER_ID;

if (!token || !userId) {
  console.log("IG_ACCESS_TOKEN/IG_USER_ID não configurados — nada a fazer.");
  process.exit(0);
}

const shortcodeOf = (permalink) => permalink.match(/\/p\/([^/]+)/)?.[1] ?? null;

async function fetchMedia() {
  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=30&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Graph API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.data ?? [];
}

async function downloadThumbnail(media) {
  const src = media.media_type === "VIDEO" ? media.thumbnail_url : media.media_url;
  if (!src) return null;
  const res = await fetch(src);
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  const stamp = media.timestamp.slice(0, 19).replace(/[:T]/g, "-");
  const file = `${stamp}_${media.id}.webp`;
  const out = path.join(INSTAGRAM_DIR, file);
  try {
    await fs.access(out);
  } catch {
    await sharp(buf)
      .rotate()
      .resize(1080, 1080, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);
    console.log(`thumbnail -> ${file}`);
  }
  return file;
}

/** Lê os itens existentes do arquivo de dados (para preservar os pinned). */
async function readExisting() {
  try {
    const src = await fs.readFile(DATA_FILE, "utf8");
    const entries = new Map();
    for (const m of src.matchAll(
      /\{ shortcode: "([^"]+)", thumbnail: ig\("([^"]+)"\), (?:alt|title): ("(?:[^"\\]|\\.)*")(, pinned: true)?/g,
    )) {
      entries.set(m[1], {
        shortcode: m[1],
        thumbnail: `/images/instagram/${m[2]}`,
        caption: JSON.parse(m[3]),
        pinned: Boolean(m[4]),
      });
    }
    return entries;
  } catch {
    return new Map();
  }
}

function firstLine(caption) {
  if (!caption) return "Conteúdo do Instagram";
  const line = caption.split("\n")[0].replace(/[#@][\w.]+/g, "").trim();
  return line.length > 3 ? line.slice(0, 90) : "Conteúdo do Instagram";
}

async function main() {
  const media = await fetchMedia();
  if (media.length === 0) {
    console.log("Nenhuma mídia retornada pela API.");
    return;
  }

  const existing = await readExisting();
  const posts = [];
  const reels = [];
  const seen = new Set();

  for (const item of media) {
    const shortcode = shortcodeOf(item.permalink);
    if (!shortcode || seen.has(shortcode)) continue;
    seen.add(shortcode);
    const prev = existing.get(shortcode);
    const file = (await downloadThumbnail(item)) ?? prev?.thumbnail.split("/").pop();
    if (!file) continue;
    const entry = {
      shortcode,
      thumbnail: `/images/instagram/${file}`,
      caption: prev?.pinned ? prev.caption : firstLine(item.caption),
      pinned: prev?.pinned ?? false,
    };
    if (item.media_type === "VIDEO") reels.push(entry);
    else posts.push(entry);
  }

  // Reinsere itens pinned que saíram dos 30 mais recentes
  for (const prev of existing.values()) {
    if (prev.pinned && !seen.has(prev.shortcode)) {
      posts.push(prev);
      seen.add(prev.shortcode);
    }
  }

  const gallery = posts.slice(0, GALLERY_LIMIT);
  const reelList = reels.slice(0, REELS_LIMIT);

  const fmtPost = (p) =>
    `  { shortcode: "${p.shortcode}", thumbnail: ig("${p.thumbnail.split("/").pop()}"), alt: ${JSON.stringify(p.caption)}${p.pinned ? ", pinned: true" : ""} },`;
  const fmtReel = (r, i) =>
    `  { id: ${i + 1}, shortcode: "${r.shortcode}", thumbnail: ig("${r.thumbnail.split("/").pop()}"), title: ${JSON.stringify(r.caption)}${r.pinned ? ", pinned: true" : ""} },`;

  const content = `/**
 * Fonte única de dados dos conteúdos do Instagram exibidos no site.
 * Gerado/atualizado automaticamente por scripts/sync-instagram.mjs.
 * Itens com \`pinned: true\` nunca são removidos pela sincronização.
 */

export interface InstagramPost {
  shortcode: string;
  thumbnail: string;
  alt: string;
  pinned?: boolean;
}

export interface InstagramReel {
  id: number;
  shortcode: string;
  title: string;
  thumbnail: string;
  pinned?: boolean;
}

const ig = (file: string) => \`/images/instagram/\${file}\`;

export const instagramGallery: InstagramPost[] = [
${gallery.map(fmtPost).join("\n")}
];

export const instagramReels: InstagramReel[] = [
${reelList.map(fmtReel).join("\n")}
];
`;

  await fs.writeFile(DATA_FILE, content);
  console.log(`Sincronizado: ${gallery.length} posts, ${reelList.length} reels.`);
}

main().catch((err) => {
  console.error("Falha na sincronização (site permanece com dados atuais):", err.message);
  process.exit(0); // falha graciosa: não quebra o pipeline
});
