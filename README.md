# Blog da Priscila

Portfólio responsivo para a criadora de conteúdo UGC Priscila. Construído com Next.js, React, TypeScript e Tailwind CSS, sem banco de dados, autenticação ou painel administrativo.

## Executar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000`.

## Configuração obrigatória

Edite `src/config/contact.ts`:

- `email`: e-mail profissional da Priscila;
- `whatsapp`: número apenas com dígitos, incluindo DDI e DDD, por exemplo `5511999999999`;
- `tiktok`: perfil oficial, quando disponível.

Configure `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://dominio-oficial.com.br
NEXT_PUBLIC_LEAD_WEBHOOK_URL=https://seu-n8n/webhook/lead
NEXT_PUBLIC_EXTERNAL_FORM_URL=
```

O formulário tenta primeiro o webhook do n8n e depois o endpoint externo genérico. Se nenhum estiver configurado ou ambos falharem, oferece o envio da mensagem pelo WhatsApp.

## Substituir conteúdo

- Portfólio: `src/data/portfolio.ts`;
- Serviços: `src/data/services.ts`;
- Marcas: `src/data/brands.ts`;
- Depoimentos: `src/data/testimonials.ts`;
- Trabalhos em destaque: `src/data/featured-work.ts`;
- Fotos e thumbnails: `public/images/`.

Todos os materiais atuais estão identificados como demonstrativos. Antes da publicação, substitua fotos por arquivos oficiais em WebP ou AVIF e informe dimensões adequadas. Não publique nomes, logos ou depoimentos sem autorização.

## Vídeos

Cada item de `portfolioVideos` aceita:

- `source: "local"`: caminho de um MP4 em `public/videos/`;
- `source: "youtube"`: ID do vídeo;
- `source: "vimeo"`: ID do vídeo;
- `source: "instagram"` ou `"tiktok"`: URL pública do conteúdo.

Vídeos são carregados somente quando o modal é aberto. Arquivos locais usam `preload="metadata"` e não reproduzem automaticamente.

## Webhook

A rota `POST /api/leads` valida os dados, remove o campo honeypot, adiciona origem e data e encaminha JSON ao endpoint configurado. O endpoint deve responder com status HTTP entre 200 e 299. Configure CORS apenas se o serviço exigir; o navegador conversa com a rota interna do site.

## Verificações

```bash
npm run lint
npm run typecheck
npm run build
```

## Publicação

Antes do deploy:

1. Substitua todos os conteúdos demonstrativos.
2. Configure domínio, e-mail e WhatsApp.
3. Configure e teste o webhook.
4. Revise a política de privacidade com orientação jurídica adequada.
5. Teste o formulário e os vídeos em celular e desktop.
# portifolio_ugc
