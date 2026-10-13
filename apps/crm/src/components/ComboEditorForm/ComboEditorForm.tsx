import type { Category, Combo, ProductSummary } from '@noname/types';
import { useComboEditor } from '@/hooks/useComboEditor';
import { useComboPreview } from '@/hooks/useComboPreview';
import { ComboEditorHeader } from '../ComboEditorHeader/ComboEditorHeader';
import { ComboGeneralSection } from '../ComboGeneralSection/ComboGeneralSection';
import { ComboRulesSection } from '../ComboRulesSection/ComboRulesSection';
import { ComboSlotsSection } from '../ComboSlotsSection/ComboSlotsSection';
import { FormError } from '../FormError/FormError';
import { PosPreviewCard } from '../PosPreviewCard/PosPreviewCard';
import { SplitLayout } from '../shared/SplitLayout/SplitLayout';

export interface ComboEditorFormProps {
  combo: Combo | null;
  categories: Category[];
  products: ProductSummary[];
  defaultCategoryId: string;
}

export const ComboEditorForm = ({ combo, categories, products, defaultCategoryId }: ComboEditorFormProps) => {
  const editor = useComboEditor(combo, defaultCategoryId);
  const preview = useComboPreview(editor.draft, combo?.regularPrice ?? 0);
  return (
    <>
      <ComboEditorHeader
        combo={combo}
        draft={editor.draft}
        isSaving={editor.save.isPending}
        isDirty={editor.isDirty}
        onSave={editor.submit}
      />
      <FormError error={editor.save.error} />
      <SplitLayout
        main={
          <>
            <ComboGeneralSection combo={combo} draft={editor.draft} categories={categories} updateField={editor.updateField} />
            <ComboSlotsSection
              slots={editor.draft.slots}
              products={products}
              onUpdateSlot={editor.updateSlot}
              onRemoveSlot={editor.removeSlot}
              onAddSlot={editor.addSlot}
              onAddItem={editor.addItem}
            />
            <ComboRulesSection draft={editor.draft} updateField={editor.updateField} />
          </>
        }
        aside={
          <PosPreviewCard
            preview={preview}
            subtitle="Toca para armar el combo como el cajero"
            ticketTitle="Se imprime en la boleta como"
            ticketNote={`Cocina recibe ${editor.draft.slots.length} comandas, una por ítem, cuando el envío por estación está activo.`}
          />
        }
      />
    </>
  );
};
