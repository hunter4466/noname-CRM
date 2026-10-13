import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(import.meta.dirname, '../../'),
  transpilePackages: ['@noname/ui', '@noname/types', '@noname/domain', '@noname/db'],
  poweredByHeader: false,
};

export default nextConfig;
