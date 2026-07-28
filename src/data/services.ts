import { Box, Camera, CirclePlay, Clapperboard, Heart, Images, Megaphone, MessageCircle, PackageOpen, ShoppingBag, Smartphone, Star } from "lucide-react";

export const services = [
  { name: "Vídeos UGC", description: "Conteúdo natural criado para aproximar sua marca de pessoas reais.", icon: CirclePlay },
  { name: "Reels para Instagram", description: "Vídeos dinâmicos, verticais e alinhados à linguagem da plataforma.", icon: Clapperboard },
  { name: "Vídeos para TikTok", description: "Narrativas ágeis que acompanham tendências sem perder autenticidade.", icon: Smartphone },
  { name: "Stories", description: "Sequências espontâneas para apresentar, explicar e gerar interação.", icon: Images },
  { name: "Unboxing", description: "A experiência de abrir e descobrir seu produto em cada detalhe.", icon: PackageOpen },
  { name: "Demonstração", description: "Benefícios e uso do produto mostrados de forma simples e visual.", icon: Box },
  { name: "Review de produtos", description: "Percepções claras e honestas para apoiar a decisão do público.", icon: Star },
  { name: "Depoimentos", description: "Relatos em primeira pessoa com uma comunicação próxima e confiável.", icon: MessageCircle },
  { name: "Conteúdo lifestyle", description: "Seu produto inserido naturalmente em cenas e rotinas reais.", icon: Heart },
  { name: "Fotografia de produtos", description: "Imagens cuidadosas para redes sociais e canais da marca.", icon: Camera },
  { name: "Vídeos para anúncios", description: "Criativos com gancho, contexto e chamada para ação.", icon: Megaphone },
  { name: "Marketplaces", description: "Conteúdo direto que facilita a descoberta e compreensão do produto.", icon: ShoppingBag },
] as const;
