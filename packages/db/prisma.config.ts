import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Read lazily: `prisma generate` (CI, Docker builds) needs no database; migrate commands fail clearly when unset.
    url: process.env.DATABASE_URL ?? '',
  },
});
