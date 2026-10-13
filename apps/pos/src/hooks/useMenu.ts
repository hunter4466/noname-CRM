import type { MenuResponse } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useMenu = () => useQuery({ queryKey: [QueryKey.Menu], queryFn: () => apiClient.get<MenuResponse>('/menu') });
