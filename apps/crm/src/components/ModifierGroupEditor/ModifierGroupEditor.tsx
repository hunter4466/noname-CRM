import type { ModifierGroup, ProductSummary } from '@noname/types';
import { useModifierGroupEditor } from '@/hooks/useModifierGroupEditor';
import { FormError } from '../FormError/FormError';
import { ModifierGroupGeneralCard } from '../ModifierGroupGeneralCard/ModifierGroupGeneralCard';
import { ModifierGroupUsageCard } from '../ModifierGroupUsageCard/ModifierGroupUsageCard';
import { ModifierOptionsCard } from '../ModifierOptionsCard/ModifierOptionsCard';
import { PreModifiersCard } from '../PreModifiersCard/PreModifiersCard';
import { SelectionRulesCard } from '../SelectionRulesCard/SelectionRulesCard';

export interface ModifierGroupEditorProps {
  group: ModifierGroup | null;
  products: ProductSummary[];
  onCreated: (groupId: string) => void;
}

export const ModifierGroupEditor = ({ group, products, onCreated }: ModifierGroupEditorProps) => {
  const editor = useModifierGroupEditor(group, onCreated);
  return (
    <>
      <ModifierGroupGeneralCard
        group={group}
        draft={editor.draft}
        updateField={editor.updateField}
        isDirty={editor.isDirty}
        isSaving={editor.save.isPending}
        onSave={editor.submit}
      />
      <FormError error={editor.save.error} />
      <SelectionRulesCard draft={editor.draft} updateField={editor.updateField} onRequiredChange={editor.setRequired} />
      <ModifierOptionsCard
        options={editor.draft.options}
        products={products}
        onUpdate={editor.updateOption}
        onSetDefault={editor.setDefaultOption}
        onRemove={editor.removeOption}
        onAddSimple={editor.addSimpleOption}
        onLinkProduct={editor.linkProduct}
      />
      <PreModifiersCard draft={editor.draft} onToggle={(enabled) => editor.updateField('preModifiersEnabled', enabled)} />
      {group && <ModifierGroupUsageCard productNames={group.usedInProductNames} />}
    </>
  );
};
