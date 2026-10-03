// Editable in the admin panel (/admin/): src/content/brands.json
import brandsContent from "../content/brands.json" with { type: "json" };

type PartnerBrand = {
  id: string;
  name: string | null;
  image: string;
  alt?: string;
};

export const partnerBrands: readonly PartnerBrand[] = brandsContent.items;
