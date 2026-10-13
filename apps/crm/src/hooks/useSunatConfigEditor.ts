import type { SunatConfig } from '@noname/types';
import { useDraft } from './useDraft';
import { useSaveSunatConfig } from './useSaveSunatConfig';
import { useTestSunatConnection } from './useTestSunatConnection';

// Read-only fields the server computes; never sent back on save.
const toInput = ({
  hasProviderToken: _token,
  hasCertificate: _certificate,
  certificateExpiresAt: _expires,
  lastTestLabel: _test,
  ...input
}: SunatConfig) => input;

export const useSunatConfigEditor = (config: SunatConfig) => {
  const save = useSaveSunatConfig();
  const testConnection = useTestSunatConnection();
  const { draft, updateField, replaceDraft, isDirty } = useDraft<SunatConfig>(config);
  const submit = () => save.mutate(toInput(draft), { onSuccess: replaceDraft });
  return { draft, updateField, isDirty, submit, save, testConnection };
};
