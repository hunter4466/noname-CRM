# noname-CRM

Monorepo for a CRM platform for Peruvian restaurants and shops. The first module is Point of Sale with
SUNAT e-invoicing. Designs live in Claude Design ("CRM Core — POS Module"); a snapshot of the
screens is in `design/project/*.dc.html` (reference only — they need Claude Design's runtime to render).

## Layout

| Path | What |
|---|---|
| `apps/crm` | Central CRM (Next.js 16, port 3000): owner console — dashboard, catalog, locations, SUNAT config, sign-in/registration |
| `apps/pos` | POS register (Next.js 16, port 3001): staff PIN sign-in, shift opening, register, checkout. Web + tablet |
| `packages/db` | `@noname/db` — Prisma 7 schema, migrations, client (PostgreSQL) shared by both apps |
| `packages/types` | `@noname/types` — DTOs + TypeScript enums mirroring the Prisma enums |
| `packages/domain` | `@noname/domain` — pure business logic shared by client and server (modifier pricing, IGV, money) |
| `packages/ui` | `@noname/ui` — design tokens, primitives, icons used by both apps |
| `infra/terraform` | GCP infrastructure: `modules/platform` + `environments/{dev,staging,prod}` |
| `infra/docker`, `infra/cloudbuild`, `infra/scripts` | Images, pipelines, cleanup scripts |

Each app follows the same shape: `src/app` (thin route files + `api/**/route.ts`), `src/components`,
`src/hooks`, `src/lib`, `src/types` (app enums), `src/server` (auth guards, http helpers, validation,
repositories, mocks — server-only).

## Current state

- UI is implemented from the designs; **all data is mocked server-side**. Route handlers call
  repositories in `src/server/repositories/`, which read/write in-memory slices seeded from
  `src/server/mocks/`. The UI only talks to the API (TanStack Query hooks → `/api/...`).
- Auth is mocked: CRM login `owner@demo.pe` / `demo1234`; POS PINs Mario `1234`, Ana `1111`, Luis `2222`, Rosa `3333`.
- The Prisma schema and initial migration exist, but nothing reads the database yet. Swap a repository's
  internals for `getPrisma()` to go live — signatures stay the same.
- Terraform and pipelines are written but **have never been applied** (see `.claude/rules/infra.md`).

## Language

- Everything users see is **Spanish (Peru)**: UI copy, placeholders, aria labels, API error and validation
  messages, mock data. `<html lang="es">`, dates with `es-PE`. Money stays `S/ 1,330.00` (comma thousands,
  dot decimals, as on SUNAT comprobantes).
- Code stays **English**: identifiers, enum members/values, comments, commit messages, docs.
- Terms in use: local (location), caja (register/terminal), turno (shift), vuelto (change), comprobante,
  para llevar / en salón / recojo, término (cooking point), grupo de modificadores, paso (combo slot).

## Commands (repo root)

```bash
pnpm install
pnpm dev            # both apps (crm :3000, pos :3001)
pnpm dev:crm / pnpm dev:pos
pnpm build          # production build of everything (turbo)
pnpm typecheck      # next typegen + tsc in every package
pnpm lint
pnpm format         # prettier
pnpm db:up          # local Postgres 17 on localhost:5433
pnpm --filter @noname/domain test
```

## Rules

Project rules live in `.claude/rules/` — read the relevant one before changing code:
`api.md` (endpoints, permissions, migrations), `components.md`, `hooks.md`, `infra.md`, `skills.md`.
Next.js 16 differs from older versions — check `apps/<app>/node_modules/next/dist/docs/` (see each app's `AGENTS.md`).
