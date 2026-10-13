import type { SunatConfig } from '@noname/types';

export interface SunatSectionProps {
  draft: SunatConfig;
  updateField: <K extends keyof SunatConfig>(field: K, value: SunatConfig[K]) => void;
}
