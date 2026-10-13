import 'server-only';
import type { PublicConfig } from '@/types/PublicConfig';

export const getPublicConfig = (): PublicConfig => ({
  appEnv: process.env.APP_ENV ?? 'dev',
  crmUrl: process.env.CRM_URL ?? 'http://localhost:3000',
  posUrl: process.env.POS_URL ?? 'http://localhost:3001',
});
