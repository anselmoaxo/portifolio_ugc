import type { PortfolioCategory, PortfolioVideo } from "@/types/content";
// Editable in the admin panel (/admin/): src/content/portfolio.json
import portfolioContent from "../content/portfolio.json" with { type: "json" };

export const portfolioCategories: Array<"Todos" | PortfolioCategory> = [
  "Todos",
  "Beleza",
  "Moda",
  "Lifestyle",
  "Casa",
];

export const portfolioVideos = portfolioContent.items as PortfolioVideo[];
