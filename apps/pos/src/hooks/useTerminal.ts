import type { TerminalInfo } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useTerminal = () =>
  useQuery({ queryKey: [QueryKey.Terminal], queryFn: () => apiClient.get<TerminalInfo>('/terminal'), refetchInterval: 60_000 });
