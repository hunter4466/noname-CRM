import type { Location, LocationInput } from '@noname/types';
import { useRouter } from 'next/navigation';
import { locationRoute } from '@/types/Route';
import { useDraft } from './useDraft';
import { useSaveLocation } from './useSaveLocation';

export const emptyLocation: LocationInput = {
  name: '',
  receiptName: '',
  phone: '',
  openingHours: '',
  address: '',
  addressReference: '',
  department: 'Lima',
  province: 'Lima',
  district: 'Miraflores',
  ubigeo: '150122',
  establishmentCode: '',
  latitude: -12.12231,
  longitude: -77.03005,
  isActive: true,
};

const toInput = ({
  id: _id,
  terminals: _terminals,
  printerCount: _printers,
  printerOptions: _options,
  ...input
}: Location): LocationInput => input;

export const useLocationEditor = (location: Location | null) => {
  const router = useRouter();
  const save = useSaveLocation(location?.id ?? null);
  const { draft, updateField, replaceDraft, isDirty } = useDraft<LocationInput>(location ? toInput(location) : emptyLocation);

  const persist = (input: LocationInput) =>
    save.mutate(input, {
      onSuccess: (saved) => {
        replaceDraft(toInput(saved));
        if (!location) {
          router.replace(locationRoute(saved.id));
        }
      },
    });

  return {
    draft,
    updateField,
    isDirty,
    save,
    submit: () => persist(draft),
    toggleActive: () => persist({ ...draft, isActive: !draft.isActive }),
  };
};
