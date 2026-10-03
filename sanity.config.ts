import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

// `sanity build/deploy` only exposes SANITY_STUDIO_* variables to the hosted Studio;
// the NEXT_PUBLIC_* names keep working for the embedded /studio route and local dev.
export default defineConfig({
  name: "creator_site",
  title: "Painel do site",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "project-not-configured",
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "development",
  basePath: process.env.SANITY_STUDIO_BASE_PATH || "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((template) => template.schemaType !== "siteSettings"),
  },
});
