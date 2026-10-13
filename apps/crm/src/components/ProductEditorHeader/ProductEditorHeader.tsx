import type { Product, ProductInput } from '@noname/types';
import { Button, ButtonVariant, Pill, Thumb, ThumbSize } from '@noname/ui';
import { toInitials } from '@/lib/toInitials';
import { productStatusLabel, productStatusTone } from '@/lib/productStatus';
import { Route } from '@/types/Route';
import { ButtonLink } from '../shared/ButtonLink/ButtonLink';
import { PageHeader } from '../shared/PageHeader/PageHeader';

export interface ProductEditorHeaderProps {
  product: Product | null;
  draft: ProductInput;
  isSaving: boolean;
  isDirty: boolean;
  onSave: () => void;
}

export const ProductEditorHeader = ({ product, draft, isSaving, isDirty, onSave }: ProductEditorHeaderProps) => {
  const title = draft.name || 'New product';
  return (
    <PageHeader
      breadcrumbs={[{ label: 'Point of Sale', href: Route.Dashboard }, { label: 'Products', href: Route.Products }, { label: title }]}
      title={title}
      leading={<Thumb initials={toInitials(title) || 'NP'} tone={product?.tone} size={ThumbSize.Large} />}
      meta={
        <>
          {product && (
            <Pill tone={productStatusTone[product.status]} withDot>
              {productStatusLabel[product.status]}
            </Pill>
          )}
          <span className="hint mono">{draft.sku || 'No SKU yet'}</span>
        </>
      }
      actions={
        <>
          <ButtonLink href={Route.Products}>Cancel</ButtonLink>
          <Button variant={ButtonVariant.Primary} disabled={isSaving || (!isDirty && product !== null)} onClick={onSave}>
            {isSaving ? 'Saving…' : 'Save product'}
          </Button>
        </>
      }
    />
  );
};
