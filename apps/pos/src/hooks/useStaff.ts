import type { StaffMember } from '@noname/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { QueryKey } from '@/types/QueryKey';

export const useStaff = () => useQuery({ queryKey: [QueryKey.Staff], queryFn: () => apiClient.get<StaffMember[]>('/staff') });
