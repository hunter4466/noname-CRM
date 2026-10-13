# Prisma schema conventions

- One schema for the whole monorepo: `packages/db/prisma/schema.prisma`. Both `apps/crm` and
  `apps/pos` share the same PostgreSQL database and import the client from `@noname/db`.
- Prisma 7: the datasource URL lives in `packages/db/prisma.config.ts` (read from `DATABASE_URL`),
  not in the schema. The client is generated to `packages/db/src/generated/prisma` (git-ignored)
  and is created with the `@prisma/adapter-pg` driver adapter in `src/index.ts`.
- **Soft delete**: business tables carry `deletedAt DateTime?`. Never hard-delete those rows;
  set `deletedAt` and filter `deletedAt: null` in every read.
- **Multi-tenancy**: every top-level business table is scoped by `companyId`. Every query must
  filter by the session's company.
- **Money** is `Decimal @db.Decimal(10, 2)`, never `Float`. Catalog prices include IGV.
- **Secrets** (SUNAT certificate, SOL password, provider tokens) are never stored in the DB —
  only the Secret Manager reference (`*Secret` columns).
- Schema changes only through migration files — see `.claude/rules/api.md` and the
  `prisma-migrate` skill.
