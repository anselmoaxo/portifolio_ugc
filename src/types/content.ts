export type PortfolioCategory =
  | "Beleza"
  | "Moda"
  | "Lifestyle"
  | "Casa"
  | "Alimentação"
  | "Serviços"
  | "Tecnologia";

export type VideoSource = "local" | "youtube" | "vimeo" | "instagram" | "tiktok" | "external";

export type PortfolioVideo = {
  id: number;
  title: string;
  brand: string;
  category: PortfolioCategory;
  format: string;
  thumbnail: string;
  videoUrl: string;
  source: VideoSource;
  accent: string;
  featured?: boolean;
  demo?: boolean;
  externalUrl?: string;
};

export type LeadData = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  instagram: string;
  segment: string;
  contentType: string;
  deadline: string;
  message: string;
  privacy: boolean;
  website?: string;
};
