const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "development";

export const sanityEnv = {
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-08-01",
  configured: /^[a-z0-9-]+$/.test(projectId) && projectId.length >= 3,
} as const;

