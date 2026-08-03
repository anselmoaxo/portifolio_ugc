# Blog da Priscila — Portfólio UGC

Portfólio de criadora de conteúdo UGC. Site estático construído com Next.js, hospedado no GitHub Pages.

## Tecnologias

- [Next.js](https://nextjs.org/) (export estático)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Framer Motion](https://www.framer.com/motion/)

## Como instalar

```bash
git clone https://github.com/anselmoaxo/portifolio_ugc.git
cd portifolio_ugc
npm ci
```

## Como executar localmente

```bash
npm run dev
```

Acesse: `http://localhost:3000`

## Como gerar o build

```bash
npm run build
```

O site estático será gerado na pasta `out/`.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub chamado `portifolio_ugc`
2. Envie o código para a branch `main`
3. Vá em **Settings > Pages** e selecione **GitHub Actions** como source
4. O deploy será feito automaticamente após cada push

A URL publicada é: `https://anselmoaxo.github.io/portifolio_ugc/`

## Onde alterar

| O que                     | Arquivo                          |
| ------------------------- | -------------------------------- |
| Número do WhatsApp        | `src/config/contact.ts`          |
| Link do Instagram         | `src/config/contact.ts`          |
| Link do TikTok            | `src/config/contact.ts`          |
| E-mail                    | `src/config/contact.ts`          |
| URL do site               | `src/config/site.ts`             |
| Fotos do portfólio        | `public/images/instagram/`       |
| PDF oficial               | `public/portfolio/Portfolio-Priscila.pdf` |
| Dados dos posts           | `src/data/portfolio.ts`          |
| Galeria e Reels (home)    | `src/data/instagram.ts`          |
| Marcas presentes          | `src/data/brands.ts`             |
| Serviços                  | `src/data/services.ts`           |

## Automações (GitHub Actions)

- **Deploy** (`.github/workflows/deploy-pages.yml`): build e deploy no GitHub Pages a cada push na `main`.
- **Qualidade** (`.github/workflows/quality.yml`): lint, typecheck e build em pushes e PRs.
- **Sync Instagram** (`.github/workflows/sync-instagram.yml`): roda diariamente (cron) e sob demanda (*Run workflow*). Busca posts/reels novos via Instagram Graph API, baixa e otimiza as thumbnails (WebP) e atualiza `src/data/instagram.ts`, commitando direto na `main` (o deploy do Pages dispara em seguida).

### Configurar o Sync Instagram

1. Crie um token de longa duração da [Instagram Graph API](https://developers.facebook.com/docs/instagram-api/) (conta Business/Creator).
2. No repositório, vá em **Settings > Secrets and variables > Actions** e crie:
   - `IG_ACCESS_TOKEN` — token de longa duração
   - `IG_USER_ID` — ID numérico da conta Instagram
3. Sem os secrets, o workflow não altera nada (o site continua com os dados atuais).

Itens marcados com `pinned: true` em `src/data/instagram.ts` nunca são removidos pela sincronização.

## Scripts úteis

| Comando                    | O que faz                                                        |
| -------------------------- | ---------------------------------------------------------------- |
| `npm run optimize:images`  | Otimiza imagens (WebP, redimensiona, gera blur placeholders)     |
| `npm run sync:instagram`   | Sincroniza posts/reels do Instagram (requer `IG_ACCESS_TOKEN` e `IG_USER_ID` no ambiente) |
| `npm run lint`             | ESLint                                                           |
| `npm run typecheck`        | Verificação de tipos TypeScript                                  |

Fotos novas (hero, perfil etc.) podem ser colocadas em `public/images/raw/` — o `npm run optimize:images` otimiza e move para `public/images/` automaticamente.

## Segurança

- **Nunca** faça commit do arquivo `.env`
- **Nunca** coloque tokens, senhas ou chaves de API em variáveis `NEXT_PUBLIC_*`
- O formulário apenas monta uma mensagem e abre o WhatsApp; nenhum dado é armazenado pelo site
- A tradução para inglês ou espanhol abre o serviço Google Tradutor somente após a escolha do visitante
- Todos os links externos usam `rel="noopener noreferrer"`

## Licença

Este projeto é privado. Todos os direitos reservados.
