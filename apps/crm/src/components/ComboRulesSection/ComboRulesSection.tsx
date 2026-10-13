import { ComboReceiptMode, type ComboInput } from '@noname/types';
import { Card, CardBody, CardHeader, Field, FieldGrid, Select, TextInput, ToggleRow } from '@noname/ui';

const receiptOptions = [
  { value: ComboReceiptMode.SingleLine, label: 'Una línea al precio del combo' },
  { value: ComboReceiptMode.LinePerItem, label: 'Una línea por ítem (precio repartido)' },
];

export interface ComboRulesSectionProps {
  draft: ComboInput;
  updateField: <K extends keyof ComboInput>(field: K, value: ComboInput[K]) => void;
}

export const ComboRulesSection = ({ draft, updateField }: ComboRulesSectionProps) => (
  <Card>
    <CardHeader title="Reglas" />
    <CardBody>
      <FieldGrid>
        <Field label="Disponible" htmlFor="comboAvailability" hint='"Todo el día" o un horario como "Lun–Vie · 12:00–15:00"'>
          <TextInput
            id="comboAvailability"
            value={draft.availabilityLabel}
            onChange={(event) => updateField('availabilityLabel', event.target.value)}
          />
        </Field>
        <Field label="En la boleta / factura" htmlFor="comboReceipt">
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
          label="Activo"
          hint="Se muestra en todos los POS"
          checked={draft.isActive}
          onChange={(isActive) => updateField('isActive', isActive)}
        />
        <ToggleRow
          label="Enviar cada ítem a su estación de cocina"
          hint="Hamburguesa a la parrilla, bebida a la barra"
          checked={draft.routeItemsToStations}
          onChange={(value) => updateField('routeItemsToStations', value)}
        />
        <ToggleRow
          label="Descontar stock de cada ítem"
          hint="Las ventas del combo cuentan en los reportes de cada producto"
          checked={draft.deductStockPerItem}
          onChange={(value) => updateField('deductStockPerItem', value)}
        />
      </FieldGrid>
    </CardBody>
  </Card>
);
