import type { TestConnectionResponse } from '@noname/types';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

export const useTestSunatConnection = () =>
  useMutation({ mutationFn: () => apiClient.post<TestConnectionResponse>('/sunat/test-connection') });
