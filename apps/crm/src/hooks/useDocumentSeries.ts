import type { DocumentSeries } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useDocumentSeries = () =>
  useQuery({ queryKey: [QueryKey.DocumentSeries], queryFn: () => apiClient.get<DocumentSeries[]>('/sunat/series') });
