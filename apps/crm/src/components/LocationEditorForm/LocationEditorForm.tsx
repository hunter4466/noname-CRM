import type { Location } from '@noname/types';
import { Button, ButtonVariant, Pill, PillTone } from '@noname/ui';
import { useLocationEditor } from '@/hooks/useLocationEditor';
import { Route } from '@/types/Route';
import { FormError } from '../FormError/FormError';
import { LocationAddressSection } from '../LocationAddressSection/LocationAddressSection';
import { LocationDetailsSection } from '../LocationDetailsSection/LocationDetailsSection';
import { LocationTerminalsSection } from '../LocationTerminalsSection/LocationTerminalsSection';
import { PageHeader } from '../shared/PageHeader/PageHeader';

export interface LocationEditorFormProps {
  location: Location | null;
}

export const LocationEditorForm = ({ location }: LocationEditorFormProps) => {
  const editor = useLocationEditor(location);
  const title = editor.draft.name || 'Nuevo local';
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Punto de Venta', href: Route.Dashboard }, { label: 'Locales', href: Route.Locations }, { label: title }]}
        title={title}
        meta={
          <>
            <Pill tone={editor.draft.isActive ? PillTone.Ok : PillTone.Neutral} withDot>
              {editor.draft.isActive ? 'Abierto · recibiendo pedidos' : 'Inactivo'}
            </Pill>
            {editor.draft.establishmentCode && <span className="hint">Establecimiento {editor.draft.establishmentCode}</span>}
          </>
        }
        actions={
          <>
            {location && (
              <Button onClick={editor.toggleActive} disabled={editor.save.isPending}>
                {editor.draft.isActive ? 'Desactivar' : 'Activar'}
              </Button>
            )}
            <Button
              variant={ButtonVariant.Primary}
              disabled={editor.save.isPending || (!editor.isDirty && location !== null)}
              onClick={editor.submit}
            >
              {editor.save.isPending ? 'Guardando…' : location ? 'Guardar cambios' : 'Crear local'}
            </Button>
          </>
        }
      />
      <FormError error={editor.save.error} />
      <LocationDetailsSection draft={editor.draft} updateField={editor.updateField} />
      <LocationAddressSection draft={editor.draft} updateField={editor.updateField} />
      {location && <LocationTerminalsSection location={location} />}
    </>
  );
};
