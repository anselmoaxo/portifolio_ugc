# Área administrativa do blog

## Objetivo

A dona do blog troca fotos e textos do site sem editar código e sem depender de um desenvolvedor.

## Como funciona

```
Painel /admin/ ──e-mail e senha──▶ edita textos e fotos ──Publicar──▶ commit na main
                                                                        │
                                       workflow "Deploy GitHub Pages" ◀─┘
                                       publica o site em alguns minutos
```

- O painel é o [Decap CMS](https://decapcms.org), um editor em português que roda no navegador e grava direto no repositório.
- O login por e-mail e senha (ou Google/Microsoft) é feito pelo [DecapBridge](https://decapbridge.com). Quem edita não precisa de conta no GitHub; o DecapBridge grava os commits em nome do site. O plano gratuito cobre 3 sites e 10 pessoas por site.
- Não há servidor nem banco de dados próprios, por isso funciona no GitHub Pages.
- O conteúdo editável fica em `src/content/`:
  - `site.json`: topo da página (título, texto, foto principal), "Sobre mim" (texto e foto), contatos, SEO e seções visíveis.
  - `portfolio.json`: trabalhos do portfólio (título, marca, foto de capa, link do vídeo).
  - `services.json`: serviços.
  - `brands.json`: marcas parceiras e logotipos.
- Fotos enviadas pelo painel ficam em `public/images/uploads/`.
- A configuração do painel está em `public/admin/config.yml`.

## Configuração (uma vez, feita pelo dono do repositório)

1. Crie uma conta gratuita em https://decapbridge.com.
2. Adicione o site:
   - Repositório: `anselmoaxo/portifolio_ugc`
   - Token do GitHub: um *fine-grained personal access token* restrito a este repositório com **Contents** e **Pull requests** em *Read and write*.
   - Endereço do painel: `https://blogdapriscila.com.br/admin/`
3. O DecapBridge mostra o trecho de configuração (`backend`, `auth`). Ele já está aplicado em `public/admin/config.yml` (site `ad5e65a5-…`, autenticação PKCE).
4. Em **Collaborators**, convide a Priscila pelo e-mail dela. Ela recebe um link, cria a senha e já pode entrar em `/admin/`.

Para remover o acesso de alguém, retire a pessoa dos colaboradores no DecapBridge.

## Uso no dia a dia

1. Entre em `/admin/`.
2. Abra **Textos e fotos** → **Página inicial**, **Portfólio**, **Serviços** ou **Marcas**.
3. Altere os textos ou clique na foto para enviar outra.
4. Clique em **Publicar**. O painel grava a alteração no GitHub e o site é publicado de novo em alguns minutos (acompanhe em Actions → Deploy GitHub Pages).

## Próximos passos possíveis

- Tornar editáveis as métricas, cupons e descontos (`src/data/`).
- Adicionar posts de blog (coleção de arquivos Markdown e páginas `/blog/`).
