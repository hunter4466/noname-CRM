import type { OkResponse, RecoverVerifyRequest } from '@noname/types';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

export const useResetPassword = () =>
  useMutation({ mutationFn: (request: RecoverVerifyRequest) => apiClient.post<OkResponse>('/auth/recover/verify', request) });
