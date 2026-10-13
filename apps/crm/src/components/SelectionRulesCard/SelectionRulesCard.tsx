import type { ModifierGroupInput } from '@noname/types';
import { Card, CardBody, CardHeader, Field, FieldGrid, TextInput, ToggleRow } from '@noname/ui';
import { describeSelectionRules } from '@/lib/describeSelectionRules';
import styles from './SelectionRulesCard.module.css';

export interface SelectionRulesCardProps {
  draft: ModifierGroupInput;
  updateField: <K extends keyof ModifierGroupInput>(field: K, value: ModifierGroupInput[K]) => void;
  onRequiredChange: (isRequired: boolean) => void;
}

const toCount = (value: string) => Math.max(0, Math.floor(Number(value) || 0));

export const SelectionRulesCard = ({ draft, updateField, onRequiredChange }: SelectionRulesCardProps) => (
  <Card>
    <CardHeader title="Reglas de selección" />
    <CardBody>
      <FieldGrid>
        <ToggleRow
          label="Obligatorio"
          hint="No se puede agregar el ítem sin elegir"
          checked={draft.minSelections > 0}
          onChange={onRequiredChange}
        />
        <Field label="Mínimo" htmlFor="groupMin">
          <TextInput
            id="groupMin"
            monospace
            type="number"
            min={0}
            value={draft.minSelections}
            onChange={(event) => updateField('minSelections', toCount(event.target.value))}
          />
        </Field>
        <Field label="Máximo" htmlFor="groupMax">
          <TextInput
            id="groupMax"
            monospace
            type="number"
            min={1}
            value={draft.maxSelections}
            onChange={(event) => updateField('maxSelections', Math.max(1, toCount(event.target.value)))}
          />
        </Field>
        <Field label="Elecciones gratis" htmlFor="groupFree">
          <TextInput
            id="groupFree"
            monospace
            type="number"
            min={0}
            value={draft.freeSelections}
            onChange={(event) => updateField('freeSelections', toCount(event.target.value))}
          />
        </Field>
      </FieldGrid>
      <ToggleRow
        label="Misma opción más de una vez"
        hint={'p. ej. "2 × Inca Kola" dentro de un combo'}
        checked={draft.allowRepeats}
        onChange={(allowRepeats) => updateField('allowRepeats', allowRepeats)}
      />
      <div className={styles.summary}>
        <strong>Se lee así:</strong> {describeSelectionRules(draft)}
      </div>
    </CardBody>
  </Card>
);
