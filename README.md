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

## Area administrativa

Fotos e textos sao editados no painel em `/admin/` (Decap CMS, login por e-mail via DecapBridge), que grava os arquivos de `src/content/` direto no GitHub; cada alteracao dispara o deploy. Configuracao e uso em [docs/PLANO-AREA-ADMIN.md](docs/PLANO-AREA-ADMIN.md).

## Seguranca

- Nao reutilize tokens, remotes ou credenciais do projeto original; nunca publique arquivos `.env`.
- Indexacao fica desativada por padrao. Para publicar, configure `NEXT_PUBLIC_SITE_URL=https://seu-dominio-real` e `NEXT_PUBLIC_SITE_INDEXABLE=true` antes do build.
- Headers HTTP de seguranca devem ser configurados na hospedagem estatica. A politica em `src/lib/security-headers.ts` serve como referencia; o Next.js nao aplica headers aos arquivos exportados.
- O painel `/admin/` autentica pelo DecapBridge; o token do GitHub fica no DecapBridge, nunca no repositorio ou no site.

## Verificacoes

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run security:secrets
```

### Overrides de seguranca

Os overrides de brace-expansion, minimatch, postcss e sharp fixam versoes corrigidas de dependencias transitivas. Revisar e remover cada override quando a dependencia de origem incorporar a correcao.

## GitHub Pages

O repositorio usa GitHub Actions para publicar `out/` no dominio personalizado `https://blogdapriscila.com.br/`. O workflow `deploy-pages.yml` executa em pushes para `main` ou manualmente. A origem publica vem de `actions/configure-pages`; com o dominio na raiz, nao e necessario `basePath`.

GitHub Pages serve os arquivos exportados e nao executa `npm start`. O servidor em `scripts/serve-static.mjs` existe apenas para preview local e verificacao no CI. `node scripts/check-runtime.mjs` verifica essa exportacao.

GitHub Pages nao oferece configuracao de headers HTTP personalizados; a politica anterior de headers do Next.js nao e aplicada nessa hospedagem.
