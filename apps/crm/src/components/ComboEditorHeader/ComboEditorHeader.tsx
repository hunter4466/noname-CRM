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
  const title = draft.name || 'New combo';
  return (
    <PageHeader
      breadcrumbs={[
        { label: 'Point of Sale', href: Route.Dashboard },
        { label: 'Products', href: Route.Products },
        { label: 'Combos', href: Route.Combos },
        { label: title },
      ]}
      title={title}
      leading={<Thumb initials="CO" tone={combo?.tone ?? Tone.Ink} size={ThumbSize.Large} />}
      meta={
        <>
          <Pill tone={draft.isActive ? PillTone.Ok : PillTone.Neutral} withDot>
            {draft.isActive ? 'Active' : 'Inactive'}
          </Pill>
          <span className="hint mono">{draft.sku || 'No SKU yet'}</span>
        </>
      }
      actions={
        <>
          <ButtonLink href={Route.Combos}>Cancel</ButtonLink>
          <Button variant={ButtonVariant.Primary} disabled={isSaving || (!isDirty && combo !== null)} onClick={onSave}>
            {isSaving ? 'Saving…' : 'Save combo'}
          </Button>
        </>
      }
    />
  );
};
