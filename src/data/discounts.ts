// Editable in the admin panel (/admin/): src/content/discounts.json
import discountsContent from "../content/discounts.json" with { type: "json" };

export type Discount = {
  id: string;
  brand: string;
  title: string;
  description: string;
  coupon?: string;
  url: string;
  category: string;
  type: "coupon" | "affiliate" | "store" | "offer";
  featured?: boolean;
  priority?: number;
};

export const discounts = discountsContent.items as Discount[];
