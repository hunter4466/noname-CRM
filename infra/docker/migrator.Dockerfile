# syntax=docker/dockerfile:1.7
# Runs `prisma migrate deploy` against DATABASE_URL. Deployed as a Cloud Run Job and executed
# by the pipeline before the apps roll out — schema changes never happen by hand (see .claude/rules/api.md).

ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS pruner
RUN corepack enable
WORKDIR /repo
COPY . .
RUN pnpm dlx turbo@2.11.7 prune @noname/db --docker

FROM node:${NODE_VERSION}
RUN corepack enable
ENV TURBO_TELEMETRY_DISABLED=1
WORKDIR /repo
COPY --from=pruner /repo/out/json/ ./
COPY --from=pruner /repo/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --filter @noname/db...
COPY --from=pruner /repo/out/full/ ./
# turbo prune keeps only workspace packages; root config the packages extend must be copied explicitly.
COPY --from=pruner /repo/tsconfig.base.json ./tsconfig.base.json
USER node
WORKDIR /repo/packages/db
CMD ["pnpm", "exec", "prisma", "migrate", "deploy"]
