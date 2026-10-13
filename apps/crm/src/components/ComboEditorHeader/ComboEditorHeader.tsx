import { Tone, type Combo, type ComboInput } from '@noname/types';
import { Button, ButtonVariant, Pill, PillTone, Thumb, ThumbSize } from '@noname/ui';
import { Route } from '@/types/Route';
import { ButtonLink } from '../shared/ButtonLink/ButtonLink';
import { PageHeader } from '../shared/PageHeader/PageHeader';

export interface ComboEditorHeaderProps {
  combo: Combo | null;
  draft: ComboInput;
  isSaving: boolean;
  isDirty: boolean;
  onSave: () => void;
}

export const ComboEditorHeader = ({ combo, draft, isSaving, isDirty, onSave }: ComboEditorHeaderProps) => {
  const title = draft.name || 'Nuevo combo';
  return (
    <PageHeader
      breadcrumbs={[
        { label: 'Punto de Venta', href: Route.Dashboard },
        { label: 'Productos', href: Route.Products },
        { label: 'Combos', href: Route.Combos },
        { label: title },
      ]}
      title={title}
      leading={<Thumb initials="CO" tone={combo?.tone ?? Tone.Ink} size={ThumbSize.Large} />}
      meta={
        <>
          <Pill tone={draft.isActive ? PillTone.Ok : PillTone.Neutral} withDot>
            {draft.isActive ? 'Activo' : 'Inactivo'}
          </Pill>
          <span className="hint mono">{draft.sku || 'Sin SKU'}</span>
        </>
      }
      actions={
        <>
          <ButtonLink href={Route.Combos}>Cancelar</ButtonLink>
          <Button variant={ButtonVariant.Primary} disabled={isSaving || (!isDirty && combo !== null)} onClick={onSave}>
            {isSaving ? 'Guardando…' : 'Guardar combo'}
          </Button>
        </>
      }
    />
  );
};
