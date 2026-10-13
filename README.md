# noname-CRM

CRM platform with a Point of Sale module (SUNAT e-invoicing), as a pnpm + Turborepo monorepo:

- **crm** (`apps/crm`, http://localhost:3000) — owner console.
- **pos** (`apps/pos`, http://localhost:3001) — register for web and tablet.

## Getting started

Requirements: Node 22+ (`.nvmrc`), pnpm 10, Docker (for the local database).

```bash
pnpm install
pnpm dev
```

Everything runs on mocked server-side data, so no database is required yet.

- CRM: sign in with `owner@demo.pe` / `demo1234`.
- POS: pick a staff member and enter their PIN (Mario `1234`, Ana `1111`), open the shift, start selling.

### Local database

```bash
cp .env.example .env
pnpm db:up                       # Postgres 17 on localhost:5433
DATABASE_URL=postgresql://noname:noname@localhost:5433/noname_crm pnpm prisma:migrate:deploy
```

## Repository layout

See [`CLAUDE.md`](CLAUDE.md) for the full layout and conventions, and [`infra/README.md`](infra/README.md)
for environments and deployment.
