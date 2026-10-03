# Plano: área administrativa do blog

## Objetivo

Permitir que a dona do blog atualize textos, fotos, portfólio, serviços, marcas e configurações sem editar código e sem depender de um desenvolvedor.

## Situação atual

- O site é exportado como HTML estático (`output: "export"`) e publicado no GitHub Pages em `https://blogdapriscila.com.br/`.
- O GitHub Pages não executa servidor. Por isso o painel próprio `/admin` (login Supabase + Server Actions) e o Studio embutido em `/studio` foram arquivados como `page.server.tsx`.
- Os schemas do Sanity (configurações, portfólio, serviços, marcas, categorias etc.) e o script `migrate:sanity` já existem.

## Caminho escolhido: Sanity Studio hospedado + rebuild automático

```
Priscila ──edita──▶ Sanity Studio (https://<nome>.sanity.studio)
                         │ publica
                         ▼
                  Webhook do Sanity ──▶ GitHub (repository_dispatch)
                                              │
                                              ▼
                            Workflow "Deploy GitHub Pages" lê o Sanity
                            no build e publica o site estático novo
```

- **Login e usuários**: feitos pelo próprio Sanity (Google, GitHub ou e-mail). Cada pessoa é convidada em sanity.io/manage com o papel adequado (Editor ou Administrator). Não há senha guardada no projeto.
- **Publicação**: ao clicar em *Publish*, o webhook dispara um novo build; o site atualiza em poucos minutos.
- **Segurança**: o site continua 100% estático; nenhum token de escrita vai para o navegador nem para o build.
- **Custo**: o plano gratuito do Sanity atende o volume de um blog pessoal.
- **Sem Sanity configurado** o build usa o conteúdo local de `src/data` e `src/config`, como hoje.

Alternativa descartada por enquanto: migrar a hospedagem para a Vercel e reativar o `/admin` próprio. Exige trocar DNS e hospedagem, configurar Supabase e manter um servidor.

## O que este PR implementa

1. `SITE_CMS_ENABLED=true` no build passa a buscar o conteúdo publicado no Sanity (`src/config/features.ts`, `src/sanity/content.ts`). Se o Sanity falhar ou o dataset estiver vazio, o site usa o conteúdo local.
2. `sanity.config.ts` e `sanity.cli.ts` aceitam as variáveis `SANITY_STUDIO_*`, necessárias para o Studio hospedado.
3. Workflow `deploy-studio.yml`: publica o Studio em `https://<SANITY_STUDIO_HOSTNAME>.sanity.studio` quando os schemas mudam (ou manualmente).
4. Workflow `deploy-pages.yml`: aceita o evento `sanity-content-published` e repassa as variáveis do Sanity ao build.

## O que precisa ser feito fora do código (uma vez)

1. **Criar o projeto no Sanity** em https://www.sanity.io/manage com um dataset `production` público (o padrão). Anote o *Project ID*.
2. **Variáveis do repositório** (GitHub → Settings → Secrets and variables → Actions → *Variables*):
   - `SANITY_PROJECT_ID` = Project ID
   - `SANITY_DATASET` = `production`
   - `SANITY_STUDIO_HOSTNAME` = nome do endereço do painel, por exemplo `blogdapriscila`
   - `SITE_CMS_ENABLED` = `true` (só depois da migração do passo 5)
3. **Segredo do repositório** (*Secrets*): `SANITY_AUTH_TOKEN`, um token do tipo *Deploy Studio* criado em sanity.io/manage → API → Tokens.
4. **Publicar o Studio**: GitHub → Actions → *Deploy Sanity Studio* → *Run workflow*.
5. **Migrar o conteúdo atual** para o Sanity, a partir de uma máquina local com `.env` preenchido:
   ```bash
   npm run migrate:sanity                       # simulação
   npm run migrate:sanity -- --execute --production --confirm-production=production
   ```
   O script grava um manifesto que permite desfazer com `npm run rollback:sanity`.
6. **Webhook de publicação** (sanity.io/manage → API → Webhooks):
   - URL: `https://api.github.com/repos/anselmoaxo/portifolio_ugc/dispatches`
   - Método `POST`, dataset `production`, gatilhos *Create*, *Update* e *Delete*
   - Projeção: `{"event_type": "sanity-content-published"}`
   - Headers: `Accept: application/vnd.github+json` e `Authorization: Bearer <token>`, onde o token é um *fine-grained personal access token* do GitHub restrito a este repositório com permissão **Contents: Read and write**.
7. **Convidar a Priscila** em sanity.io/manage → Members com o papel *Editor*.
8. Ativar `SITE_CMS_ENABLED=true` e rodar *Deploy GitHub Pages* uma vez para conferir.

## Próximos passos possíveis

- Adicionar posts de blog (schema `post` com texto rico, capa e SEO) e as páginas `/blog` e `/blog/[slug]` geradas no build.
- Pré-visualização de rascunhos: exige servidor; só faz sentido se a hospedagem migrar para a Vercel.
- Reativar o `/admin` próprio, caso a hospedagem mude.
