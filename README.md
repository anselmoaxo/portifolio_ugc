# Creator Site Template

Projeto independente criado a partir de uma cópia do Blog da Priscila para evoluir como modelo reutilizável de sites para criadores de conteúdo, profissionais autônomos e pequenos negócios.

## Estado atual

O site usa conteúdo local de `src/data` e `src/config` por padrão. Sanity e o painel estão desativados; credenciais existentes não ativam integrações automaticamente. O projeto não possui remote, deploy ou domínio de produção configurado.

O painel personalizado está implementado localmente com Supabase Auth, mas aguarda a escolha ou criação de um projeto Supabase próprio para este blog.

## Painel administrativo

- Login personalizado: `/login`
- Recuperação de senha: `/recuperar-senha`
- Painel próprio: `/admin`
- Sanity Studio avançado: `/studio`

As sessões usam cookies SSR. Todas as alterações e uploads para o Sanity são autenticados novamente no servidor; nenhum token secreto é enviado ao navegador.

## Segurança e isolamento

- O domínio oficial não está configurado neste projeto.
- A URL pública usa `http://localhost:3000` como fallback.
- Os workflows de deploy e Instagram estão bloqueados e servem apenas como referência.
- Não reutilize remotes, tokens ou credenciais do projeto original.
- Nunca faça commit de arquivos `.env`.

## Tecnologias

- Next.js 16 com App Router e renderização híbrida
- React 19 e TypeScript
- Tailwind CSS
- Sanity CMS
- Supabase Auth
- Framer Motion, Lucide React e Sharp

## Desenvolvimento local

Copie `.env.example` para `.env.local`, configure apenas credenciais do ambiente de desenvolvimento e execute:

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`.

## Verificações

```bash
npm run lint
npm run typecheck
npm run build
npm test
npm run security:secrets
```

O build gera páginas públicas estáticas/revalidadas e rotas dinâmicas para autenticação e administração.

## Scripts principais

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Servidor local |
| `npm run build` | Build de produção |
| `npm run lint` | Análise ESLint |
| `npm run typecheck` | Verificação TypeScript |
| `npm run migrate:sanity` | Migração idempotente para o dataset escolhido |
| `npm run rollback:sanity` | Rollback da migração |
| `npm run sync:instagram` | Sincronização do Instagram; requer credenciais próprias |

## Ativação do painel

O Sanity permanece desativado até configurar `SITE_CMS_ENABLED=true`. O painel personalizado também exige `SITE_ADMIN_ENABLED=true`. Para liberar gravações no painel, configure `SANITY_API_WRITE_TOKEN` somente no servidor.

O login exige selecionar ou criar um projeto Supabase e configurar a URL, a chave publicável e `ADMIN_EMAILS`, conforme `.env.example`.

- [Guia do painel](docs/ADMIN-GUIDE.md)
- [Operação, ambientes, migração e rollback](docs/OPERATIONS.md)
- [Critérios de aceitação](docs/ACCEPTANCE.md)

## Seguranca e publicacao

- `npm run dev` escuta somente em `127.0.0.1`.
- Sem `SITE_CMS_ENABLED=true`, nao ha consultas de conteudo ao Sanity, e Studio, preview e webhook retornam 404.
- Sem `SITE_ADMIN_ENABLED=true` (e CMS habilitado), login, painel, recuperacao e callback retornam 404; mutacoes administrativas sao recusadas no servidor.
- O frontend publico pode ser pre-renderizado pelo Next.js com dados locais. Isto nao configura `output: export`; os headers dependem do servidor Next.js ou de configuracao equivalente na hospedagem.
- Indexacao fica desativada por padrao, inclusive em builds locais. Para publicar, configure `NEXT_PUBLIC_SITE_URL=https://seu-dominio-real` e `NEXT_PUBLIC_SITE_INDEXABLE=true`, e gere novo build. O build rejeita origem local, HTTP, credenciais, caminho ou query quando a indexacao esta ativa. O sitemap fica vazio em ambientes nao indexaveis.
- A CSP permite scripts inline de hidratacao do Next.js para preservar pre-renderizacao estatica. Bloqueia handlers inline, objetos, formularios para outras origens e enquadramento externo; nao equivale a uma CSP estrita com nonce/hash. Nao habilite previews em dominios externos sem revisar a politica.
- Quando o painel for ativado, mutacoes bem-sucedidas emitem logs estruturados com ID do autor, operacao, documento e horario, sem conteudo ou tokens. Retencao e armazenamento de logs devem ser configurados na hospedagem.
- Execute `npm test`, `npm run security:secrets`, `npm run security:audit`, `npm run lint`, `npm run typecheck` e `npm run build` antes de publicar.

### Overrides de seguranca

Os overrides de js-yaml (3.15.2), smol-toml (1.8.0) e adm-zip (0.6.1) corrigem dependencias fixadas por ferramentas do Sanity. O override de uuid 11.1.1 fica restrito a typeid-js 1.2.0; seus usos de UUID v7 e conversao sao verificados separadamente. Revisar e remover cada override quando a dependencia de origem incorporar a correcao.
