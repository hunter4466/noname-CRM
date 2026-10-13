import type { ModifierGroup, ModifierGroupInput } from '@noname/types';
import { Button, ButtonSize, ButtonVariant, Card, CardBody, CardHeader, Field, FieldGrid, TextInput } from '@noname/ui';
import { pluralize } from '@/lib/pluralize';
import styles from './ModifierGroupGeneralCard.module.css';

export interface ModifierGroupGeneralCardProps {
  group: ModifierGroup | null;
  draft: ModifierGroupInput;
  updateField: <K extends keyof ModifierGroupInput>(field: K, value: ModifierGroupInput[K]) => void;
  isDirty: boolean;
  isSaving: boolean;
  onSave: () => void;
}

export const ModifierGroupGeneralCard = ({ group, draft, updateField, isDirty, isSaving, onSave }: ModifierGroupGeneralCardProps) => (
  <Card>
    <CardHeader
      title={<span className={styles.title}>{draft.name || 'Nuevo grupo'}</span>}
      subtitle={
        group ? `Usado en ${pluralize(group.usedInProductNames.length, 'producto')} · ${group.lastEditedLabel}` : 'Aún no se ha guardado'
      }
      actions={
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Primary}
          disabled={isSaving || !isDirty || !draft.name.trim()}
          onClick={onSave}
        >
          {isSaving ? 'Guardando…' : 'Guardar grupo'}
        </Button>
      }
    />
    <CardBody>
      <FieldGrid>
        <Field label="Nombre del grupo" htmlFor="groupName">
          <TextInput id="groupName" value={draft.name} onChange={(event) => updateField('name', event.target.value)} />
        </Field>
        <Field label="Nombre en la comanda" htmlFor="groupTicketName">
          <TextInput id="groupTicketName" value={draft.ticketName} onChange={(event) => updateField('ticketName', event.target.value)} />
        </Field>
        <Field label="Sugerencia para el cajero" htmlFor="groupPrompt">
          <TextInput id="groupPrompt" value={draft.cashierPrompt} onChange={(event) => updateField('cashierPrompt', event.target.value)} />
        </Field>
      </FieldGrid>
    </CardBody>
  </Card>
);
