---
name: prisma-migrate
description: Generate a Prisma migration for the current schema changes in packages/db.
---

Generate a Prisma migration for the current schema changes.

Do NOT ask the user for a migration name — auto-generate one using the format below. Then run, from the
repo root (local Postgres from `docker compose up -d postgres`, mapped to port 5433):

```bash
DATABASE_URL="postgresql://noname:noname@localhost:5433/noname_crm?schema=public" \
  pnpm --filter @noname/db exec prisma migrate dev --name <migration_name>
```

If the local database is not running, start it with `pnpm db:up` first. Never use `prisma db push`,
`prisma migrate reset` or raw SQL instead (see `.claude/rules/api.md`).

## Migration name format

Names follow the pattern `<adjective>-<noun>` (e.g. `electric-wolf`).

- Adjective and noun are arbitrary English words — pick any pair that sounds good. e.g. `happy-squirrel`, `fluorescent-tree`, `glowing-fox`, `silent-horn`.
- Before finalising the name, list the existing migration directories under `packages/db/prisma/migrations/` and confirm the adjective-noun pair is not already in use.

## Rules

- Never edit existing migration files — always create a new one.
- Migration files live in `packages/db/prisma/migrations/` and must be committed alongside the schema change.
- If the change touches an enum, follow the enum checklist in `.claude/rules/api.md`.
