import { ModifierOptionKind, type ModifierGroup, type ModifierGroupInput, type ModifierOption, type ProductSummary } from '@noname/types';
import { useDraft } from './useDraft';
import { useSaveModifierGroup } from './useSaveModifierGroup';

const DEFAULT_PRE_MODIFIERS = [
  { id: 'pre_no', label: 'Sin', priceDelta: 0 },
  { id: 'pre_light', label: 'Poco', priceDelta: 0 },
  { id: 'pre_regular', label: 'Normal', priceDelta: 0 },
  { id: 'pre_extra', label: 'Extra', priceDelta: 1.5 },
  { id: 'pre_side', label: 'Aparte', priceDelta: 0 },
];

export const emptyModifierGroup: ModifierGroupInput = {
  name: '',
  ticketName: '',
  cashierPrompt: '',
  minSelections: 0,
  maxSelections: 1,
  freeSelections: 0,
  extraSelectionPrice: 0,
  allowRepeats: false,
  preModifiersEnabled: false,
  preModifiers: DEFAULT_PRE_MODIFIERS,
  isNested: false,
  options: [],
};

const toInput = ({ id: _id, usedInProductNames: _used, lastEditedLabel: _edited, ...input }: ModifierGroup): ModifierGroupInput => input;

const newOptionId = () => `opt_${Math.random().toString(36).slice(2, 10)}`;

export const useModifierGroupEditor = (group: ModifierGroup | null, onCreated: (groupId: string) => void) => {
  const save = useSaveModifierGroup(group?.id ?? null);
  const { draft, updateField, isDirty } = useDraft<ModifierGroupInput>(group ? toInput(group) : emptyModifierGroup);

  const updateOption = (optionId: string, changes: Partial<ModifierOption>) =>
    updateField(
      'options',
      draft.options.map((option) => (option.id === optionId ? { ...option, ...changes } : option)),
    );
  const setDefaultOption = (optionId: string) =>
    updateField(
      'options',
      draft.options.map((option) => ({ ...option, isDefault: option.id === optionId })),
    );
  const removeOption = (optionId: string) =>
    updateField(
      'options',
      draft.options.filter((option) => option.id !== optionId),
    );
  const addSimpleOption = () =>
    updateField('options', [
      ...draft.options,
      {
        id: newOptionId(),
        kind: ModifierOptionKind.Simple,
        label: 'Nueva opción',
        priceDelta: 0,
        linkedProductSku: null,
        followUpGroupName: null,
        isDefault: false,
        isAvailable: true,
        availabilityNote: null,
      },
    ]);
  const linkProduct = (product: ProductSummary) =>
    updateField('options', [
      ...draft.options,
      {
        id: newOptionId(),
        kind: ModifierOptionKind.LinkedProduct,
        label: product.name,
        priceDelta: product.price,
        linkedProductSku: product.sku,
        followUpGroupName: null,
        isDefault: false,
        isAvailable: true,
        availabilityNote: null,
      },
    ]);
  const setRequired = (isRequired: boolean) => updateField('minSelections', isRequired ? Math.max(1, draft.minSelections) : 0);

  const submit = () => save.mutate(draft, { onSuccess: (saved) => (group ? undefined : onCreated(saved.id)) });

  return {
    draft,
    updateField,
    isDirty,
    updateOption,
    setDefaultOption,
    removeOption,
    addSimpleOption,
    linkProduct,
    setRequired,
    submit,
    save,
  };
};
