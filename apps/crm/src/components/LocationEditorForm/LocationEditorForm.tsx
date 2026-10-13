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
  const title = editor.draft.name || 'New location';
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Point of Sale', href: Route.Dashboard }, { label: 'Locations', href: Route.Locations }, { label: title }]}
        title={title}
        meta={
          <>
            <Pill tone={editor.draft.isActive ? PillTone.Ok : PillTone.Neutral} withDot>
              {editor.draft.isActive ? 'Open · accepting orders' : 'Inactive'}
            </Pill>
            {editor.draft.establishmentCode && <span className="hint">Establishment {editor.draft.establishmentCode}</span>}
          </>
        }
        actions={
          <>
            {location && (
              <Button onClick={editor.toggleActive} disabled={editor.save.isPending}>
                {editor.draft.isActive ? 'Deactivate' : 'Activate'}
              </Button>
            )}
            <Button
              variant={ButtonVariant.Primary}
              disabled={editor.save.isPending || (!editor.isDirty && location !== null)}
              onClick={editor.submit}
            >
              {editor.save.isPending ? 'Saving…' : location ? 'Save changes' : 'Create location'}
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
