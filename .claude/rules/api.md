# API Rule

Applies to every endpoint in the monorepo: Next.js Route Handlers under
`apps/crm/src/app/api/**/route.ts` and `apps/pos/src/app/api/**/route.ts`.

## Endpoint permissions

Every time a new endpoint (or a new HTTP method on an existing `route.ts`) is added, you must:

1. Inspect `enum PermissionKey` in `packages/db/prisma/schema.prisma` and select the permission flags
   that fit the endpoint's intent.
2. Before writing the endpoint code, present the proposed permission flags to the user (list them by
   enum member name with a one-line justification each). Endpoints that are intentionally public or
   device-scoped must be presented too, stating why no permission applies.
3. Stop and ask the user to confirm the selection. Do not continue implementing the endpoint until the
   user approves or amends the flags.

Only after explicit user confirmation may you wire the chosen flags into the endpoint with the app's guard:

- **crm** — wrap the handler in `withPermissions([...], handler)` from `apps/crm/src/server/auth/withPermissions.ts`
  (`[]` = any signed-in user).
- **pos** — `withStaffPermissions([...], handler)` for staff actions, or `withDevice(handler)` for
  paired-device endpoints used before a PIN sign-in, both in `apps/pos/src/server/auth/guards.ts`.

Never export an unguarded handler except deliberate public ones (health checks, sign-in, sign-up,
password recovery, logout/lock); mark those with a `// Public endpoint` comment saying why.

## Endpoint structure

- `route.ts` stays thin: parse with a zod schema from `src/server/validation/`, call a repository in
  `src/server/repositories/`, return `NextResponse.json<Dto>(...)` typed with a DTO from `@noname/types`.
- Errors go through `jsonError` / `validationError` / `notFound` in `src/server/http/responses.ts`
  (`{ error: { code: ApiErrorCode, message } }`).
- Prices, totals and taxes are always recomputed on the server with `@noname/domain` — never trust
  client-side totals.
- Data is currently **mocked**: repositories read/write in-memory slices from `src/server/mocks/`.
  When wiring the database, replace the repository internals with `getPrisma()` from `@noname/db`
  and keep the repository function signatures, so routes and UI do not change.

## Database changes — migrations only, never raw SQL

Never change any database with raw SQL. This is absolute and applies to every environment
(local, dev, staging, prod):

- Do **not** run `psql`, `prisma db execute`, `prisma db push`, `prisma migrate reset`,
  `--force-reset`, or any hand-written `ALTER`/`INSERT`/`UPDATE`/`DROP` against a database.
- Every schema change goes through a Prisma migration **file**, created with the `prisma-migrate` skill.
  It writes a timestamped folder under `packages/db/prisma/migrations/` (commit the generated
  `migration.sql` with the schema change) and applies it to the local database. Deployed environments
  get it from the `noname-<env>-migrate` Cloud Run job (`prisma migrate deploy`), which the pipeline
  runs before deploying the apps.
- After adding or changing an **enum**, update **every** copy of it — a stale copy fails at runtime
  (e.g. a role save is rejected with "Value 'X' does not exist in 'PermissionKey' enum"), not at
  build time. Checklist:
  1. `packages/db/prisma/schema.prisma` (+ its migration).
  2. The TypeScript mirror in `packages/types/src/enums/<EnumName>.ts` (string values must match the
     Prisma member names exactly) and its export in `packages/types/src/index.ts`.
  3. Any label/option maps keyed by the enum (`Record<EnumName, …>`) in `apps/*/src/lib/` — the
     compiler flags missing keys, so run `pnpm typecheck` from the repo root.
- Data corrections (e.g. granting a permission to a role) are done through the app's own endpoints
  or a Prisma migration file — never ad-hoc SQL.

See `packages/db/prisma/CLAUDE.md` for the schema, soft-delete and multi-tenancy conventions.
