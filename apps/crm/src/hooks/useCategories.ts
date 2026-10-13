import type { Category } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useCategories = () => useQuery({ queryKey: [QueryKey.Categories], queryFn: () => apiClient.get<Category[]>('/categories') });
