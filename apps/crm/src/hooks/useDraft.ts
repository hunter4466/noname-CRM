import { useCallback, useState } from 'react';

/** Local editable copy of a server entity. `isDirty` flips on the first edit. */
export const useDraft = <T extends object>(initial: T) => {
  const [draft, setDraft] = useState<T>(initial);
  const [isDirty, setIsDirty] = useState(false);

  const updateField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setIsDirty(true);
  }, []);

  const replaceDraft = useCallback((next: T) => {
    setDraft(next);
    setIsDirty(false);
  }, []);

  return { draft, updateField, setDraft, replaceDraft, isDirty };
};
