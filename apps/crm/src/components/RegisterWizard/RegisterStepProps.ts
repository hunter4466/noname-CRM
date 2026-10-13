import type { RegisterRequest } from '@noname/types';

export interface RegisterStepProps {
  request: RegisterRequest;
  updateField: <K extends keyof RegisterRequest>(field: K, value: RegisterRequest[K]) => void;
}
