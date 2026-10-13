import type { Combo, ComboInput } from '@noname/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useSaveCombo = (comboId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ComboInput) =>
      comboId ? apiClient.patch<Combo>(`/combos/${comboId}`, input) : apiClient.post<Combo>('/combos', input),
    onSuccess: (combo) => {
      queryClient.setQueryData([QueryKey.Combo, combo.id], combo);
      void queryClient.invalidateQueries({ queryKey: [QueryKey.Combos] });
    },
  });
};
