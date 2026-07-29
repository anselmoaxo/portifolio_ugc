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
| Marcas presentes          | `src/data/brands.ts`             |
| Serviços                  | `src/data/services.ts`           |

## Segurança

- **Nunca** faça commit do arquivo `.env`
- **Nunca** coloque tokens, senhas ou chaves de API em variáveis `NEXT_PUBLIC_*`
- O formulário apenas monta uma mensagem e abre o WhatsApp; nenhum dado é armazenado pelo site
- A tradução para inglês ou espanhol abre o serviço Google Tradutor somente após a escolha do visitante
- Todos os links externos usam `rel="noopener noreferrer"`

## Licença

Este projeto é privado. Todos os direitos reservados.
