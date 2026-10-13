import { Card, CardBody, Field, FieldGrid, Select, TextInput, ToggleRow } from '@noname/ui';
import { BoletaSending } from '@/types/BoletaSending';
import type { SunatSectionProps } from '@/types/SunatSectionProps';
import { SunatSectionHeader } from '../SunatSectionHeader/SunatSectionHeader';

const boletaOptions = [
  { value: BoletaSending.Immediately, label: 'Enviar cada una al instante' },
  { value: BoletaSending.DailySummary, label: 'Agrupar en el resumen diario' },
];

export const SunatSendingSection = ({ draft, updateField }: SunatSectionProps) => (
  <Card>
    <SunatSectionHeader number={6} title="Envío y contingencia" />
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
        <Field label="Hora del resumen diario" htmlFor="summaryTime">
          <TextInput
            id="summaryTime"
            monospace
            type="time"
            value={draft.dailySummaryTime}
            onChange={(event) => updateField('dailySummaryTime', event.target.value)}
          />
        </Field>
        <Field label="Facturas y notas" htmlFor="facturaSending">
          <Select
            id="facturaSending"
            options={[{ value: BoletaSending.Immediately, label: 'Enviar al instante' }]}
            value={BoletaSending.Immediately}
            disabled
          />
        </Field>
      </FieldGrid>
      <FieldGrid>
        <ToggleRow
          label="Seguir vendiendo sin conexión"
          hint="Emitir localmente y enviar cuando vuelva la conexión"
          checked={draft.offlineContingency}
          onChange={(value) => updateField('offlineContingency', value)}
        />
        <ToggleRow
          label="Enviar PDF + XML al cliente por correo"
          hint="Cuando se registra un correo al cobrar"
          checked={draft.emailDocuments}
          onChange={(value) => updateField('emailDocuments', value)}
        />
        <ToggleRow
          label="Avisarme de rechazos"
          hint="Correo y alerta en el panel"
          checked={draft.alertOnRejection}
          onChange={(value) => updateField('alertOnRejection', value)}
        />
      </FieldGrid>
    </CardBody>
  </Card>
);
