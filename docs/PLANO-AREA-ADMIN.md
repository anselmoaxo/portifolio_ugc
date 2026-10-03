# Área administrativa do blog

## Objetivo

A dona do blog troca fotos e textos do site sem editar código e sem depender de um desenvolvedor.

## Como funciona

```
Painel /admin/ ──login GitHub──▶ edita textos e fotos ──Publicar──▶ commit na main
                                                                        │
                                       workflow "Deploy GitHub Pages" ◀─┘
                                       publica o site em alguns minutos
```

- O painel é o [Sveltia CMS](https://github.com/sveltia/sveltia-cms), um editor que roda no navegador e grava direto no repositório. Não precisa de servidor, banco de dados nem serviço pago, por isso funciona no GitHub Pages.
- O conteúdo editável fica em `src/content/`:
  - `site.json`: topo da página (título, texto, foto principal), "Sobre mim" (texto e foto), contatos, SEO e seções visíveis.
  - `portfolio.json`: trabalhos do portfólio (título, marca, foto de capa, link do vídeo).
  - `services.json`: serviços.
  - `brands.json`: marcas parceiras e logotipos.
- Fotos enviadas pelo painel ficam em `public/images/uploads/`.
- A configuração do painel está em `public/admin/config.yml`.

## Configuração (uma vez)

1. **Conta no GitHub para quem vai editar.** Adicione a pessoa como colaboradora do repositório (Settings → Collaborators) com permissão de escrita.
2. **Token de acesso.** Com a conta dela, crie um *fine-grained personal access token* em github.com/settings/personal-access-tokens:
   - Repository access: somente `anselmoaxo/portifolio_ugc`
   - Permissions: **Contents: Read and write**
3. **Entrar no painel.** Abra `https://blogdapriscila.com.br/admin/`, escolha *Sign In with Token* e cole o token. O navegador guarda o login.

Opcional: para entrar com o botão "Sign in with GitHub" sem token, publique o [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) no Cloudflare Workers (gratuito) e adicione `base_url` em `backend` no `config.yml`.

## Uso no dia a dia

1. Entre em `/admin/`.
2. Abra **Textos e fotos** → **Página inicial**, **Portfólio**, **Serviços** ou **Marcas**.
3. Altere os textos ou clique na foto para enviar outra.
4. Clique em **Save**. O painel grava a alteração no GitHub e o site é publicado de novo em alguns minutos (acompanhe em Actions → Deploy GitHub Pages).

## Próximos passos possíveis

- Tornar editáveis as métricas, cupons e descontos (`src/data/`).
- Adicionar posts de blog (coleção de arquivos Markdown e páginas `/blog/`).
