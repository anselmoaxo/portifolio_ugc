# Critérios de aceitação

- `npm ci`, lint, typecheck, testes e build aprovados.
- Textos e fotos editáveis pelo painel `/admin/`, sem serviços externos além do GitHub.
- Painel valida campos, URLs e textos alternativos.
- Rascunhos não aparecem publicamente; itens ocultos não são consultados.
- Preview e webhook rejeitam secrets/assinaturas inválidos.
- Migração em dry-run não escreve; repetição não duplica documentos.
- Navegação por teclado, foco, contraste e redução de movimento revisados.
- Canonical, Open Graph, sitemap e robots apontam para o ambiente correto.
- Nenhum segredo em Git, bundle ou logs.
- Rollback de conteúdo e deploy ensaiados antes do domínio oficial.

