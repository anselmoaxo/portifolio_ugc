# Creator Site Template

Site estatico Next.js com conteudo local em `src/data` e `src/config`.

## Desenvolvimento

```bash
npm ci
npm run dev
```

Abra http://127.0.0.1:3000.

## Build e publicacao

```bash
npm run build
npm start
```

O build exporta HTML, CSS, JavaScript e imagens para `out/`. Publique o conteudo dessa pasta em uma hospedagem estatica, sem servidor Next.js. `npm start` apenas serve os arquivos exportados para visualizacao local. Atualizacoes de conteudo exigem novo build.

CMS, autenticacao, painel, Studio, preview e webhooks estao desativados. As entradas anteriores foram preservadas como `page.server.tsx` e `route.server.ts`, nomes que o Next.js nao registra como rotas. Flags de ambiente nao reativam esses recursos nesta versao.

## Seguranca

- Nao reutilize tokens, remotes ou credenciais do projeto original; nunca publique arquivos `.env`.
- Indexacao fica desativada por padrao. Para publicar, configure `NEXT_PUBLIC_SITE_URL=https://seu-dominio-real` e `NEXT_PUBLIC_SITE_INDEXABLE=true` antes do build.
- Headers HTTP de seguranca devem ser configurados na hospedagem estatica. A politica em `src/lib/security-headers.ts` serve como referencia; o Next.js nao aplica headers aos arquivos exportados.
- Guias de administracao e scripts de verificacao do servidor anterior sao referencias da implementacao arquivada.

## Verificacoes

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run security:secrets
```

### Overrides de seguranca

Os overrides de js-yaml (3.15.2), smol-toml (1.8.0) e adm-zip (0.6.1) corrigem dependencias fixadas por ferramentas do Sanity. O override de uuid 11.1.1 fica restrito a typeid-js 1.2.0; seus usos de UUID v7 e conversao sao verificados separadamente. Revisar e remover cada override quando a dependencia de origem incorporar a correcao.

## GitHub Pages

O repositorio usa GitHub Actions para publicar `out/` no dominio personalizado `https://blogdapriscila.com.br/`. O workflow `deploy-pages.yml` executa em pushes para `main` ou manualmente. A origem publica vem de `actions/configure-pages`; com o dominio na raiz, nao e necessario `basePath`.

GitHub Pages serve os arquivos exportados e nao executa `npm start`. O servidor em `scripts/serve-static.mjs` existe apenas para preview local e verificacao no CI. `node scripts/check-runtime.mjs` verifica essa exportacao.

GitHub Pages nao oferece configuracao de headers HTTP personalizados; a politica anterior de headers do Next.js nao e aplicada nessa hospedagem.
