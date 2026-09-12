import { createClient, type SanityDocument } from "@sanity/client";
import { readFileSync } from "node:fs";

const manifestPath = process.argv.find((arg) => arg.startsWith("--manifest="))?.split("=")[1];
if (!manifestPath || !process.argv.includes("--execute")) throw new Error("Use --manifest=<arquivo> --execute.");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as { dataset: string; documents: Array<{ id: string; before: SanityDocument | null }> };
if (manifest.dataset === "production" && !process.argv.includes("--confirm-production=production")) throw new Error("Rollback de produção bloqueado sem confirmação explícita.");
const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;
if (!projectId || !token) throw new Error("Projeto e token são obrigatórios.");
const client = createClient({ projectId, dataset: manifest.dataset, token, apiVersion: "2026-08-01", useCdn: false });

for (const entry of [...manifest.documents].reverse()) {
  if (entry.before) await client.createOrReplace(entry.before);
  else await client.delete(entry.id);
  console.log(`revertido: ${entry.id}`);
}

