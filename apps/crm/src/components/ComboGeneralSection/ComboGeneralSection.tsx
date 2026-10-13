import { ComboPricingMode, type Category, type Combo, type ComboInput } from '@noname/types';
import { formatMoney } from '@noname/domain';
import { Card, CardBody, CardHeader, Field, FieldGrid, Pill, PillTone, SegmentedControl, Select, TextInput } from '@noname/ui';
import styles from './ComboGeneralSection.module.css';

const pricingOptions = [
  { value: ComboPricingMode.FixedPrice, label: 'Precio fijo del combo' },
  { value: ComboPricingMode.ItemsTotalMinusDiscount, label: 'Total de ítems − descuento' },
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
          <Field label="Nombre del combo" htmlFor="comboName">
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
          <Field label="Categoría" htmlFor="comboCategory">
            <Select
              id="comboCategory"
              options={categories.map((category) => ({ value: category.id, label: category.name }))}
              value={draft.categoryId}
              onChange={(event) => updateField('categoryId', event.target.value)}
            />
          </Field>
        </FieldGrid>
        <Field label="Precio">
          <SegmentedControl
            ariaLabel="Modo de precio"
            options={pricingOptions}
            value={draft.pricingMode}
            onChange={(mode) => updateField('pricingMode', mode)}
          />
        </Field>
        <FieldGrid>
          <Field label={isFixed ? 'Precio del combo (IGV incluido)' : 'Descuento sobre el total de ítems'} htmlFor="comboAmount">
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
              <span className="hint">Ítems predeterminados a la carta</span>
              <span className={styles.regular}>{formatMoney(combo.regularPrice)}</span>
              <Pill tone={PillTone.Ok}>{`El cliente ahorra ${formatMoney(combo.savings)} · ${combo.savingsPercent}%`}</Pill>
            </div>
          )}
        </FieldGrid>
      </CardBody>
    </Card>
  );
};
