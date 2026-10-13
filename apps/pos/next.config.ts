import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(import.meta.dirname, '../../'),
  transpilePackages: ['@noname/ui', '@noname/types', '@noname/domain', '@noname/db'],
  poweredByHeader: false,
  experimental: {
    // The persisted Turbopack dev cache got into a stale state after source edits and made pages
    // reload in a loop (hundreds of HMR reloads per second). Dev restarts are a bit slower without it.
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
