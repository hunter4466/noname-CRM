import type { LocationInput } from '@noname/types';
import { Card, CardBody, CardHeader, Field, FieldGrid, TextInput } from '@noname/ui';

export interface LocationDetailsSectionProps {
  draft: LocationInput;
  updateField: <K extends keyof LocationInput>(field: K, value: LocationInput[K]) => void;
}

export const LocationDetailsSection = ({ draft, updateField }: LocationDetailsSectionProps) => (
  <Card>
    <CardHeader title="Details" />
    <CardBody>
      <FieldGrid>
        <Field label="Location name" htmlFor="locationName">
          <TextInput id="locationName" value={draft.name} onChange={(event) => updateField('name', event.target.value)} />
        </Field>
        <Field label="Name printed on receipts" htmlFor="receiptName">
          <TextInput
            id="receiptName"
            placeholder={`[YOUR BRAND] ${draft.name}`}
            value={draft.receiptName}
            onChange={(event) => updateField('receiptName', event.target.value)}
          />
        </Field>
        <Field label="Phone" htmlFor="locationPhone">
          <TextInput
            id="locationPhone"
            type="tel"
            placeholder="+51 1 000 0000"
            value={draft.phone}
            onChange={(event) => updateField('phone', event.target.value)}
          />
        </Field>
        <Field label="Opening hours" htmlFor="locationHours">
          <TextInput id="locationHours" value={draft.openingHours} onChange={(event) => updateField('openingHours', event.target.value)} />
        </Field>
      </FieldGrid>
    </CardBody>
  </Card>
);
