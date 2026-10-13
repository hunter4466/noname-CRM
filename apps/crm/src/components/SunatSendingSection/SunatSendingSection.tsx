import { Card, CardBody, Field, FieldGrid, Select, TextInput, ToggleRow } from '@noname/ui';
import { BoletaSending } from '@/types/BoletaSending';
import type { SunatSectionProps } from '@/types/SunatSectionProps';
import { SunatSectionHeader } from '../SunatSectionHeader/SunatSectionHeader';

const boletaOptions = [
  { value: BoletaSending.Immediately, label: 'Send each one right away' },
  { value: BoletaSending.DailySummary, label: 'Group in the resumen diario' },
];

export const SunatSendingSection = ({ draft, updateField }: SunatSectionProps) => (
  <Card>
    <SunatSectionHeader number={6} title="Sending & contingency" />
    <CardBody>
      <FieldGrid>
        <Field label="Boletas" htmlFor="boletaSending">
          <Select
            id="boletaSending"
            options={boletaOptions}
            value={draft.sendBoletasInSummary ? BoletaSending.DailySummary : BoletaSending.Immediately}
            onChange={(event) => updateField('sendBoletasInSummary', event.target.value === BoletaSending.DailySummary)}
          />
        </Field>
        <Field label="Resumen diario time" htmlFor="summaryTime">
          <TextInput
            id="summaryTime"
            monospace
            type="time"
            value={draft.dailySummaryTime}
            onChange={(event) => updateField('dailySummaryTime', event.target.value)}
          />
        </Field>
        <Field label="Facturas & notes" htmlFor="facturaSending">
          <Select
            id="facturaSending"
            options={[{ value: BoletaSending.Immediately, label: 'Send right away' }]}
            value={BoletaSending.Immediately}
            disabled
          />
        </Field>
      </FieldGrid>
      <FieldGrid>
        <ToggleRow
          label="Keep selling when offline"
          hint="Issue locally, send when the connection returns"
          checked={draft.offlineContingency}
          onChange={(value) => updateField('offlineContingency', value)}
        />
        <ToggleRow
          label="Email PDF + XML to the customer"
          hint="When an email is captured at checkout"
          checked={draft.emailDocuments}
          onChange={(value) => updateField('emailDocuments', value)}
        />
        <ToggleRow
          label="Alert me on rejections"
          hint="Email and dashboard alert"
          checked={draft.alertOnRejection}
          onChange={(value) => updateField('alertOnRejection', value)}
        />
      </FieldGrid>
    </CardBody>
  </Card>
);
