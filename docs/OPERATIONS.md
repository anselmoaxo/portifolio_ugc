# Operação, ambientes e publicação

## Ambientes

- Local e preview: dataset `development`, tokens próprios e domínio temporário.
- Produção futura: dataset `production`, tokens exclusivos e domínio somente após aprovação.
- Nunca conecte preview ao dataset de produção.

## Publicação

O endpoint `/api/revalidate` valida a assinatura do webhook Sanity e revalida somente tipos conhecidos. Configure o webhook apenas depois de definir `SANITY_REVALIDATE_SECRET` no ambiente de destino.

O preview usa `/api/draft?secret=...&redirect=/`. `SANITY_PREVIEW_SECRET` e tokens de leitura são somente de servidor.

## Migração

`npm run migrate:sanity` é sempre simulação. Para escrever com um token explícito, use `npm run migrate:sanity -- --execute`. Também é possível usar a sessão autenticada do CLI com `sanity exec scripts/migrate-to-sanity.ts --with-user-token -- --execute`. Produção exige `--production --confirm-production=production` em qualquer caso.

Cada execução registra `.migration/migration-<dataset>-<timestamp>.json`. O rollback usa `npm run rollback:sanity -- --manifest=<arquivo> --execute`; produção exige novamente confirmação explícita.

## Falhas

Se o CMS estiver ausente, lento ou indisponível, o site usa os dados locais. Em falha de deploy, mantenha o último deploy válido. Nunca registre tokens ou o corpo completo de webhooks.

## Entrega e desligamento

Transfira propriedade do repositório, Sanity, hospedagem e domínio; exporte o dataset; entregue documentação; rotacione secrets; depois remova acessos do prestador ou cliente encerrado.
