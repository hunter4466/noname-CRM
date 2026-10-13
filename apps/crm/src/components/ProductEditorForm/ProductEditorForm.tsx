import type { Category, ModifierGroup, Product, ProductInput } from '@noname/types';
import { useProductEditor } from '@/hooks/useProductEditor';
import { useProductPreview } from '@/hooks/useProductPreview';
import { FormError } from '../FormError/FormError';
import { PosPreviewCard } from '../PosPreviewCard/PosPreviewCard';
import { ProductAvailabilitySection } from '../ProductAvailabilitySection/ProductAvailabilitySection';
import { ProductEditorHeader } from '../ProductEditorHeader/ProductEditorHeader';
import { ProductGeneralSection } from '../ProductGeneralSection/ProductGeneralSection';
import { ProductModifierGroupsSection } from '../ProductModifierGroupsSection/ProductModifierGroupsSection';
import { ProductTaxSection } from '../ProductTaxSection/ProductTaxSection';
import { SplitLayout } from '../shared/SplitLayout/SplitLayout';

export interface ProductEditorFormProps {
  product: Product | null;
  emptyInput: ProductInput;
  categories: Category[];
  modifierGroups: ModifierGroup[];
}

export const ProductEditorForm = ({ product, emptyInput, categories, modifierGroups }: ProductEditorFormProps) => {
  const editor = useProductEditor(product, emptyInput);
  const preview = useProductPreview(editor.draft, modifierGroups);
  return (
    <>
      <ProductEditorHeader
        product={product}
        draft={editor.draft}
        isSaving={editor.save.isPending}
        isDirty={editor.isDirty}
        onSave={editor.submit}
      />
      <FormError error={editor.save.error} />
      <SplitLayout
        main={
          <>
            <ProductGeneralSection draft={editor.draft} categories={categories} updateField={editor.updateField} />
            <ProductModifierGroupsSection
              links={editor.draft.modifierGroups}
              allGroups={modifierGroups}
              onAttach={editor.attachGroup}
              onDetach={editor.detachGroup}
              onMove={editor.moveGroup}
            />
            <ProductTaxSection draft={editor.draft} updateField={editor.updateField} />
            <ProductAvailabilitySection
              settings={editor.draft.locationSettings}
              basePrice={editor.draft.price}
              onChange={editor.updateLocation}
            />
          </>
        }
        aside={
          <PosPreviewCard
            preview={preview}
            subtitle="Pruébalo: esto es lo que toca el cajero"
            ticketTitle="Se imprime en la comanda y la boleta como"
          />
        }
      />
    </>
  );
};
