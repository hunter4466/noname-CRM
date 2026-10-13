import { ComboPricingMode, type Category, type Combo, type ComboInput } from '@noname/types';
import { formatMoney } from '@noname/domain';
import { Card, CardBody, CardHeader, Field, FieldGrid, Pill, PillTone, SegmentedControl, Select, TextInput } from '@noname/ui';
import styles from './ComboGeneralSection.module.css';

const pricingOptions = [
  { value: ComboPricingMode.FixedPrice, label: 'Fixed combo price' },
  { value: ComboPricingMode.ItemsTotalMinusDiscount, label: 'Items total − discount' },
];

export interface ComboGeneralSectionProps {
  combo: Combo | null;
  draft: ComboInput;
  categories: Category[];
  updateField: <K extends keyof ComboInput>(field: K, value: ComboInput[K]) => void;
}

export const ComboGeneralSection = ({ combo, draft, categories, updateField }: ComboGeneralSectionProps) => {
  const isFixed = draft.pricingMode === ComboPricingMode.FixedPrice;
  return (
    <Card>
      <CardHeader title="General" />
      <CardBody>
        <FieldGrid>
          <Field label="Combo name" htmlFor="comboName">
            <TextInput id="comboName" value={draft.name} onChange={(event) => updateField('name', event.target.value)} />
          </Field>
          <Field label="SKU" htmlFor="comboSku">
            <TextInput
              id="comboSku"
              monospace
              value={draft.sku}
              onChange={(event) => updateField('sku', event.target.value.toUpperCase())}
            />
          </Field>
          <Field label="Category" htmlFor="comboCategory">
            <Select
              id="comboCategory"
              options={categories.map((category) => ({ value: category.id, label: category.name }))}
              value={draft.categoryId}
              onChange={(event) => updateField('categoryId', event.target.value)}
            />
          </Field>
        </FieldGrid>
        <Field label="Pricing">
          <SegmentedControl
            ariaLabel="Pricing mode"
            options={pricingOptions}
            value={draft.pricingMode}
            onChange={(mode) => updateField('pricingMode', mode)}
          />
        </Field>
        <FieldGrid>
          <Field label={isFixed ? 'Combo price (IGV included)' : 'Discount on items total'} htmlFor="comboAmount">
            <TextInput
              id="comboAmount"
              prefix="S/"
              monospace
              type="number"
              min={0}
              step="0.10"
              value={isFixed ? draft.price : draft.discount}
              onChange={(event) => updateField(isFixed ? 'price' : 'discount', Number(event.target.value))}
            />
          </Field>
          {combo && (
            <div className={styles.worth}>
              <span className="hint">Default items à la carte</span>
              <span className={styles.regular}>{formatMoney(combo.regularPrice)}</span>
              <Pill tone={PillTone.Ok}>{`Customer saves ${formatMoney(combo.savings)} · ${combo.savingsPercent}%`}</Pill>
            </div>
          )}
        </FieldGrid>
      </CardBody>
    </Card>
  );
};
