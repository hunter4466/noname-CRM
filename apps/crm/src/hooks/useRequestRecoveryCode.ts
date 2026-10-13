import type { OkResponse, RecoverRequest } from '@noname/types';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

export const useRequestRecoveryCode = () =>
  useMutation({ mutationFn: (request: RecoverRequest) => apiClient.post<OkResponse>('/auth/recover', request) });
