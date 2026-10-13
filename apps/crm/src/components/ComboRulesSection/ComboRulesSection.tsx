import { ComboReceiptMode, type ComboInput } from '@noname/types';
import { Card, CardBody, CardHeader, Field, FieldGrid, Select, TextInput, ToggleRow } from '@noname/ui';

const receiptOptions = [
  { value: ComboReceiptMode.SingleLine, label: 'One line at combo price' },
  { value: ComboReceiptMode.LinePerItem, label: 'One line per item (price split)' },
];

export interface ComboRulesSectionProps {
  draft: ComboInput;
  updateField: <K extends keyof ComboInput>(field: K, value: ComboInput[K]) => void;
}

export const ComboRulesSection = ({ draft, updateField }: ComboRulesSectionProps) => (
  <Card>
    <CardHeader title="Rules" />
    <CardBody>
      <FieldGrid>
        <Field label="Available" htmlFor="comboAvailability" hint='"All day" or a window like "Mon–Fri · 12:00–15:00"'>
          <TextInput
            id="comboAvailability"
            value={draft.availabilityLabel}
            onChange={(event) => updateField('availabilityLabel', event.target.value)}
          />
        </Field>
        <Field label="On the boleta / factura" htmlFor="comboReceipt">
          <Select
            id="comboReceipt"
            options={receiptOptions}
            value={draft.receiptMode}
            onChange={(event) => updateField('receiptMode', event.target.value as ComboReceiptMode)}
          />
        </Field>
      </FieldGrid>
      <FieldGrid>
        <ToggleRow
          label="Active"
          hint="Shown on every POS"
          checked={draft.isActive}
          onChange={(isActive) => updateField('isActive', isActive)}
        />
        <ToggleRow
          label="Send each item to its own kitchen station"
          hint="Burger to grill, drink to bar"
          checked={draft.routeItemsToStations}
          onChange={(value) => updateField('routeItemsToStations', value)}
        />
        <ToggleRow
          label="Deduct stock from each item"
          hint="Combo sales count in each product's reports"
          checked={draft.deductStockPerItem}
          onChange={(value) => updateField('deductStockPerItem', value)}
        />
      </FieldGrid>
    </CardBody>
  </Card>
);
