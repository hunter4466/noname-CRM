import type { ModifierGroup, ModifierGroupInput } from '@noname/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useSaveModifierGroup = (groupId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ModifierGroupInput) =>
      groupId
        ? apiClient.patch<ModifierGroup>(`/modifier-groups/${groupId}`, input)
        : apiClient.post<ModifierGroup>('/modifier-groups', input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QueryKey.ModifierGroups] }),
  });
};
