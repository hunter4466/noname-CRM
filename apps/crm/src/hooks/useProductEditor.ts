import type { Product, ProductInput } from '@noname/types';
import { useRouter } from 'next/navigation';
import { productRoute } from '@/types/Route';
import { useDraft } from './useDraft';
import { useSaveProduct } from './useSaveProduct';

const toInput = (product: Product): ProductInput => ({
  name: product.name,
  sku: product.sku,
  categoryId: product.categoryId,
  price: product.price,
  description: product.description,
  igvAffectation: product.igvAffectation,
  unitOfMeasure: product.unitOfMeasure,
  sunatProductCode: product.sunatProductCode,
  appliesIcbper: product.appliesIcbper,
  modifierGroups: product.modifierGroups,
  locationSettings: product.locationSettings,
});

export const useProductEditor = (product: Product | null, emptyInput: ProductInput) => {
  const router = useRouter();
  const save = useSaveProduct(product?.id ?? null);
  const { draft, updateField, replaceDraft, isDirty } = useDraft<ProductInput>(product ? toInput(product) : emptyInput);

  const attachGroup = (groupId: string) => {
    if (!draft.modifierGroups.some((link) => link.groupId === groupId)) {
      updateField('modifierGroups', [...draft.modifierGroups, { groupId, maxOverride: null }]);
    }
  };
  const detachGroup = (groupId: string) =>
    updateField(
      'modifierGroups',
      draft.modifierGroups.filter((link) => link.groupId !== groupId),
    );
  const moveGroup = (groupId: string, direction: -1 | 1) => {
    const links = [...draft.modifierGroups];
    const index = links.findIndex((link) => link.groupId === groupId);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= links.length) {
      return;
    }
    [links[index], links[target]] = [links[target]!, links[index]!];
    updateField('modifierGroups', links);
  };
  const updateLocation = (locationId: string, changes: Partial<ProductInput['locationSettings'][number]>) =>
    updateField(
      'locationSettings',
      draft.locationSettings.map((setting) => (setting.locationId === locationId ? { ...setting, ...changes } : setting)),
    );

  const submit = () =>
    save.mutate(draft, {
      onSuccess: (saved) => {
        replaceDraft(toInput(saved));
        if (!product) {
          router.replace(productRoute(saved.id));
        }
      },
    });

  return { draft, updateField, isDirty, attachGroup, detachGroup, moveGroup, updateLocation, submit, save };
};
