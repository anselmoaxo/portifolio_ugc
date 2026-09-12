# Guia do painel administrativo

## Endereços

- Login personalizado: `/login`
- Recuperação de senha: `/recuperar-senha`
- Painel próprio do cliente: `/admin`
- Sanity Studio para manutenção avançada: `/studio`

## Primeiro acesso

O administrador cria ou convida cada pessoa individualmente no Supabase Auth. Não existe cadastro público. Além de possuir uma conta válida, o e-mail precisa constar em `ADMIN_EMAILS`, variável disponível somente no servidor.

## Publicar um trabalho

1. Entre em `/admin`.
2. Abra **Adicionar trabalho e imagem**.
3. Informe título, categoria, descrição e link HTTPS.
4. Escolha a posição e se o item ficará em destaque.
5. Marque **Exibir no site** para publicar ou desmarque para manter oculto.
6. Salve. O site é revalidado automaticamente.

Os trabalhos existentes podem ser editados, reordenados, publicados, ocultados e excluídos. A exclusão exige confirmação adicional.

## Serviços, marcas e configurações

As áreas **Serviços** e **Marcas** permitem criar, editar, ordenar, publicar, ocultar e excluir itens. Marcas aceitam logotipo com texto alternativo; uma marca vinculada a um trabalho não pode ser excluída.

Em **Configurações do site** é possível editar identidade, contatos, redes sociais, mensagem do WhatsApp, SEO, visibilidade das seções, foto principal, foto de perfil e imagem de compartilhamento.

## Como incluir imagens pelo Sanity

No formulário de criação ou edição, escolha uma imagem JPEG, PNG, WebP ou AVIF de até 8 MB e escreva uma descrição objetiva no campo de texto alternativo. O arquivo passa pelo servidor Next.js, que confirma o usuário, valida o tipo real do arquivo e faz o upload para os Assets do Sanity. O navegador nunca recebe o token de escrita.

## Recuperação e usuários

Em `/recuperar-senha`, o cliente informa o e-mail. O Supabase envia um link PKCE que termina em `/redefinir-senha`. A mensagem de resposta não revela se um e-mail está cadastrado.

Usuários devem ser criados ou convidados pelo administrador. Ao remover um cliente, exclua ou bloqueie a conta no Supabase e retire o e-mail de `ADMIN_EMAILS`.

## Configuração do servidor

- `NEXT_PUBLIC_SUPABASE_URL`: URL pública do projeto Supabase.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: chave publicável moderna.
- `ADMIN_EMAILS`: e-mails autorizados, separados por vírgula.
- `SANITY_API_WRITE_TOKEN`: token de escrita usado somente no servidor.

Sem Supabase configurado, `/admin` apresenta a tela de preparação. Sem o token de escrita, o painel permanece em modo de leitura.
