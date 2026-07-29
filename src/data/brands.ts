type PartnerBrand = {
  id: string;
  name: string | null;
  image: string;
  alt?: string;
};

export const partnerBrands: readonly PartnerBrand[] = [
  { id: "love-rain", name: "Lové Rain", image: "/images/brands/love-rain.png" },
  { id: "loreal-paris", name: "L'Oréal Paris", image: "/images/brands/loreal-paris.png" },
  { id: "pantene", name: "Pantene", image: "/images/brands/pantene.png" },
  { id: "niely-gold", name: "Niely Gold", image: "/images/brands/niely-gold.png" },
  { id: "downy", name: "Downy", image: "/images/brands/downy.png" },
  { id: "creamy", name: "Creamy", image: "/images/brands/creamy.png" },
  { id: "organica-body-spa", name: "Orgânica Body & Spa", image: "/images/brands/organica-body-spa.png" },
  { id: "freshmile", name: "Freshmile", image: "/images/brands/freshmile.png" },
  { id: "ollie", name: "Ollie", image: "/images/brands/ollie.png" },
  { id: "sace-lady", name: "Sace Lady", image: "/images/brands/sace-lady.png" },
  { id: "dove", name: "Dove", image: "/images/brands/dove.png" },
  { id: "seda", name: "Seda", image: "/images/brands/seda.png" },
  { id: "new-dental-care", name: "N&W New Dental Care", image: "/images/brands/new-dental-care.png" },
  { id: "simbolo-floral", name: null, image: "/images/brands/simbolo-floral.png", alt: "Marca representada por um símbolo floral no Mídia Kit" },
  { id: "mac-cosmetics", name: "M·A·C Cosmetics", image: "/images/brands/mac-cosmetics.png" },
  { id: "garnier", name: "Garnier", image: "/images/brands/garnier.png" },
  { id: "saint-germain", name: "Saint Germain", image: "/images/brands/saint-germain.png" },
  { id: "perfil-sem-nome", name: null, image: "/images/brands/perfil-sem-nome.png", alt: "Marca representada por uma imagem de perfil no Mídia Kit" },
  { id: "simbolo-esportivo", name: null, image: "/images/brands/simbolo-esportivo.png", alt: "Marca representada por um símbolo esportivo no Mídia Kit" },
  { id: "skelt", name: "Skelt", image: "/images/brands/skelt.png" },
  { id: "soliv", name: "Soliv", image: "/images/brands/soliv.png" },
  { id: "vizzela", name: "Vizzela", image: "/images/brands/vizzela.png" },
  { id: "simbolo-botanico", name: null, image: "/images/brands/simbolo-botanico.png", alt: "Marca representada por um símbolo botânico no Mídia Kit" },
  { id: "jungle", name: "Jungle", image: "/images/brands/jungle.png" },
  { id: "renova-be", name: "Renova Be", image: "/images/brands/renova-be.png" },
  { id: "cerave", name: "CeraVe", image: "/images/brands/cerave.png" },
  { id: "neutrogena", name: "Neutrogena", image: "/images/brands/neutrogena.png" },
] as const;
