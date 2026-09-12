import { createClient, type SanityClient } from "next-sanity";
import { sanityEnv } from "./env";

let client: SanityClient | null = null;

export function getSanityClient(preview = false): SanityClient | null {
  if (!sanityEnv.configured) return null;
  client ??= createClient({
    projectId: sanityEnv.projectId,
    dataset: sanityEnv.dataset,
    apiVersion: sanityEnv.apiVersion,
    useCdn: process.env.NODE_ENV === "production",
    perspective: "published",
  });
  if (!preview) return client;
  const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;
  return token ? client.withConfig({ token, useCdn: false, perspective: "drafts" }) : client;
}
