# syntax=docker/dockerfile:1.7
# Builds one Next.js app of the monorepo into a minimal standalone image.
#   docker build -f infra/docker/next-app.Dockerfile --build-arg APP=crm -t crm .
#   docker build -f infra/docker/next-app.Dockerfile --build-arg APP=pos -t pos .
# The image is environment-agnostic: everything env-specific is injected at runtime by Cloud Run,
# so the exact image tested on staging is the one promoted to prod.

ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS base
RUN corepack enable && apk add --no-cache libc6-compat
WORKDIR /repo

# 1. Prune the workspace down to the app and the packages it depends on.
FROM base AS pruner
ARG APP
COPY . .
RUN pnpm dlx turbo@2.11.7 prune "@noname/${APP}" --docker

# 2. Install (cached on the lockfile) and build.
FROM base AS builder
ARG APP
ENV TURBO_TELEMETRY_DISABLED=1 NEXT_TELEMETRY_DISABLED=1
COPY --from=pruner /repo/out/json/ ./
COPY --from=pruner /repo/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile
COPY --from=pruner /repo/out/full/ ./
# turbo prune keeps only workspace packages; root config the packages extend must be copied explicitly.
COPY --from=pruner /repo/tsconfig.base.json ./tsconfig.base.json
RUN pnpm turbo run build --filter="@noname/${APP}"

# 3. Runtime: only the standalone server, static assets and public files.
FROM node:${NODE_VERSION} AS runner
ARG APP
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8080 \
    HOSTNAME=0.0.0.0 \
    APP_DIR=apps/${APP}
WORKDIR /app
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=builder --chown=nextjs:nodejs /repo/apps/${APP}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/${APP}/.next/static ./apps/${APP}/.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/apps/${APP}/public ./apps/${APP}/public
USER nextjs
EXPOSE 8080
CMD ["sh", "-c", "exec node \"$APP_DIR/server.js\""]
