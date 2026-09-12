import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "creator_site",
  title: "Painel do site",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "project-not-configured",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "development",
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((template) => template.schemaType !== "siteSettings"),
  },
});
