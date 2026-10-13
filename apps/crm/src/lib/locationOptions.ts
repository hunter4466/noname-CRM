import type { Location } from '@noname/types';
import type { SelectOption } from '@noname/ui';
import { FilterValue } from '@/types/FilterValue';

export const toLocationOptions = (locations: Location[] | undefined, allLabel = 'Todos los locales'): SelectOption[] => [
  { value: FilterValue.All, label: allLabel },
  ...(locations ?? []).map((location) => ({ value: location.id, label: location.name })),
];
