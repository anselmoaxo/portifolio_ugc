/**
 * Otimiza as imagens do portfólio:
 * - Converte JPG/PNG de public/images/instagram para WebP (máx. 1080px, q80)
 * - Otimiza logos de public/images/brands (PNG otimizado, máx. 400px de largura)
 * - Gera public/images/manifest.json com dimensões e blur placeholder (base64)
 *
 * Uso: node scripts/optimize-images.mjs
 * Fotos novas podem ser colocadas em public/images/raw/ — serão otimizadas
 * e movidas para public/images/ automaticamente.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, "public", "images");
const INSTAGRAM_DIR = path.join(IMAGES_DIR, "instagram");
const BRANDS_DIR = path.join(IMAGES_DIR, "brands");
const RAW_DIR = path.join(IMAGES_DIR, "raw");
const MANIFEST_PATH = path.join(ROOT, "src", "generated", "image-manifest.json");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function listImages(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && IMAGE_EXTS.has(path.extname(e.name).toLowerCase()))
      .map((e) => path.join(dir, e.name));
  } catch {
    return [];
  }
}

async function blurPlaceholder(image) {
  const buf = await image
    .clone()
    .resize(16, 16, { fit: "inside" })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

async function optimizeInstagram(file) {
  const name = path.basename(file, path.extname(file));
  const out = path.join(INSTAGRAM_DIR, `${name}.webp`);
  const image = sharp(file).rotate();
  const meta = await image.metadata();
  const resized = image.resize(1080, 1080, { fit: "inside", withoutEnlargement: true });
  const info = await resized.webp({ quality: 80 }).toFile(out);
  const blur = await blurPlaceholder(sharp(out));
  if (out !== file) await fs.unlink(file);
  return { file: path.basename(out), width: info.width, height: info.height, blur, originalWidth: meta.width };
}

async function optimizeBrand(file) {
  const image = sharp(file);
  const resized = image.resize(400, 200, { fit: "inside", withoutEnlargement: true });
  const info = await resized.png({ compressionLevel: 9, palette: true }).toBuffer();
  await fs.writeFile(file, info);
  return { file: path.basename(file), width: info.width, height: info.height };
}

async function processRaw() {
  const files = await listImages(RAW_DIR);
  for (const file of files) {
    const name = path.basename(file, path.extname(file));
    const out = path.join(IMAGES_DIR, `${name}.webp`);
    await sharp(file)
      .rotate()
      .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out);
    await fs.unlink(file);
    console.log(`raw -> ${path.basename(out)}`);
  }
}

async function main() {
  await processRaw();

  const manifest = { generatedAt: new Date().toISOString(), instagram: {}, brands: {} };

  for (const file of await listImages(INSTAGRAM_DIR)) {
    if (file.endsWith(".webp")) {
      // já otimizado: apenas registra metadados
      const meta = await sharp(file).metadata();
      manifest.instagram[path.basename(file)] = {
        width: meta.width,
        height: meta.height,
        blur: await blurPlaceholder(sharp(file)),
      };
      continue;
    }
    const r = await optimizeInstagram(file);
    manifest.instagram[r.file] = { width: r.width, height: r.height, blur: r.blur };
    console.log(`instagram -> ${r.file} (${r.width}x${r.height})`);
  }

  for (const file of await listImages(BRANDS_DIR)) {
    const r = await optimizeBrand(file);
    manifest.brands[r.file] = { width: r.width, height: r.height };
    console.log(`brand -> ${r.file}`);
  }

  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest salvo em ${path.relative(ROOT, MANIFEST_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
