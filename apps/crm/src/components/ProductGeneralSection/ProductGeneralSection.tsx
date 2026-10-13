import type { Category, ProductInput } from '@noname/types';
import { Card, CardBody, CardHeader, Field, FieldGrid, Select, TextArea, TextInput } from '@noname/ui';

export interface ProductGeneralSectionProps {
  draft: ProductInput;
  categories: Category[];
  updateField: <K extends keyof ProductInput>(field: K, value: ProductInput[K]) => void;
}

export const ProductGeneralSection = ({ draft, categories, updateField }: ProductGeneralSectionProps) => (
  <Card>
    <CardHeader title="General" />
    <CardBody>
      <FieldGrid>
        <Field label="Name" htmlFor="productName">
          <TextInput id="productName" value={draft.name} onChange={(event) => updateField('name', event.target.value)} />
        </Field>
        <Field label="Category" htmlFor="productCategory">
          <Select
            id="productCategory"
            options={categories.map((category) => ({ value: category.id, label: category.name }))}
            value={draft.categoryId}
            onChange={(event) => updateField('categoryId', event.target.value)}
          />
        </Field>
        <Field label="SKU" htmlFor="productSku">
          <TextInput
            id="productSku"
            monospace
            value={draft.sku}
            onChange={(event) => updateField('sku', event.target.value.toUpperCase())}
          />
        </Field>
        <Field label="Price (IGV included)" htmlFor="productPrice">
          <TextInput
            id="productPrice"
            prefix="S/"
            monospace
            type="number"
            min={0}
            step="0.10"
            value={draft.price}
            onChange={(event) => updateField('price', Number(event.target.value))}
          />
        </Field>
      </FieldGrid>
      <Field label="Description on menu & receipt" htmlFor="productDescription">
        <TextArea id="productDescription" value={draft.description} onChange={(event) => updateField('description', event.target.value)} />
      </Field>
    </CardBody>
  </Card>
);
