# Guia do painel administrativo

O painel fica em `/admin/` (por exemplo `https://blogdapriscila.com.br/admin/`). Entre com o e-mail e a senha criados pelo convite. A configuração inicial e o funcionamento estão em [PLANO-AREA-ADMIN.md](PLANO-AREA-ADMIN.md).

## Trocar uma foto

1. Entre em `/admin/` e abra **Textos e fotos**.
2. Escolha **Página inicial** (foto principal e foto de perfil), **Portfólio** (capas) ou **Marcas** (logotipos).
3. Clique na imagem, envie o arquivo novo (JPEG, PNG ou WebP) e preencha a descrição da foto.
4. Clique em **Publicar**.

## Mudar um texto

1. Abra **Textos e fotos** → **Página inicial**.
2. Edite o título, a apresentação, o "Sobre mim", os contatos ou os textos para o Google.
3. Clique em **Publicar**.

## Portfólio, descontos, serviços e marcas

Cada lista permite adicionar, editar, reordenar (arrastando) e remover itens. Em **Seções visíveis** é possível esconder uma seção inteira do site.

Em **Descontos e cupons** ficam os links e cupons da página Descontos da Pri. Deixe o código do cupom vazio quando for só um link. O campo **Ordem** define quem aparece primeiro (número menor primeiro).

## Quando a mudança aparece

Cada **Publicar** grava um commit na branch `main`. O workflow **Deploy GitHub Pages** reconstrói o site; em poucos minutos a alteração está no ar. Se ainda aparecer a versão antiga, atualize a página com Ctrl+Shift+R (no celular, feche e abra a aba de novo). Se o build falhar, o site anterior continua publicado e o erro aparece em Actions.

## Remover o acesso de alguém

No DecapBridge, abra o site e remova a pessoa da lista de colaboradores.
