'use client';

import { createContext, type ReactNode } from 'react';
import type { PublicConfig } from '@/types/PublicConfig';

export const PublicConfigContext = createContext<PublicConfig | null>(null);

export interface PublicConfigProviderProps {
  config: PublicConfig;
  children: ReactNode;
}

export const PublicConfigProvider = ({ config, children }: PublicConfigProviderProps) => (
  <PublicConfigContext.Provider value={config}>{children}</PublicConfigContext.Provider>
);
