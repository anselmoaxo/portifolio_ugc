# Operação, ambientes e publicação

## Ambientes

- Local: `npm run dev`, conteúdo lido de `src/content/` e `src/data/`.
- Produção: GitHub Pages, publicado pelo workflow `deploy-pages.yml` a cada push na `main`.

## Publicação

Alterações feitas no painel `/admin/` viram commits na `main` e disparam o deploy. Alterações de código seguem por pull request. O workflow `quality.yml` roda testes, auditoria, lint, typecheck e build em cada PR.

## Falhas

Se um build falhar, o GitHub Pages mantém o último deploy válido. Corrija o conteúdo pelo painel (ou reverta o commit) e o próximo push publica de novo. Nunca registre tokens em issues, commits ou logs.

## Entrega e desligamento

Transfira a propriedade do repositório e do domínio, entregue a documentação, revogue os tokens de acesso ao painel e remova colaboradores que não precisam mais de acesso.
