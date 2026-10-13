import { DocumentType } from '@noname/types';
import { Card, CardBody, Field, FieldGrid, Select, TextInput, ToggleRow } from '@noname/ui';
import { documentTypeLabel } from '@/lib/documentTypeLabels';
import type { SunatSectionProps } from '@/types/SunatSectionProps';
import { SunatSectionHeader } from '../SunatSectionHeader/SunatSectionHeader';

const checkoutDocuments = [DocumentType.Boleta, DocumentType.Factura, DocumentType.NotaVenta].map((type) => ({
  value: type,
  label: documentTypeLabel[type],
}));

const igvRateOptions = [
  { value: '18', label: '18% · General (16% IGV + 2% IPM)' },
  { value: '10.5', label: 'Reducida · restaurantes y hoteles (Ley 31556)' },
];

export const SunatTaxSection = ({ draft, updateField }: SunatSectionProps) => (
  <Card>
    <SunatSectionHeader number={5} title="Impuestos y reglas de comprobantes" />
    <CardBody>
      <FieldGrid>
        <Field label="Tasa de IGV" htmlFor="igvRate">
          <Select
            id="igvRate"
            options={igvRateOptions}
            value={String(draft.igvRate)}
            onChange={(event) => updateField('igvRate', Number(event.target.value))}
          />
        </Field>
        <Field label="ICBPER por bolsa plástica" htmlFor="icbper">
          <TextInput
            id="icbper"
            prefix="S/"
            monospace
            type="number"
            step="0.10"
            min={0}
            value={draft.icbperAmount}
            onChange={(event) => updateField('icbperAmount', Number(event.target.value))}
          />
        </Field>
        <Field label="Comprobante predeterminado al cobrar" htmlFor="defaultDocument">
          <Select
            id="defaultDocument"
            options={checkoutDocuments}
            value={draft.defaultDocumentType}
            onChange={(event) => updateField('defaultDocumentType', event.target.value as DocumentType)}
          />
        </Field>
      </FieldGrid>
      <FieldGrid>
        <ToggleRow
          label="Los precios del catálogo incluyen IGV"
          hint="El IGV se desglosa en el comprobante"
          checked={draft.pricesIncludeIgv}
          onChange={(value) => updateField('pricesIncludeIgv', value)}
        />
        <ToggleRow
          label="Pedir DNI en boletas mayores a S/ 700"
          hint="El POS bloquea el cobro hasta identificar al cliente"
          checked={draft.requireDniOverAmount}
          onChange={(value) => updateField('requireDniOverAmount', value)}
        />
      </FieldGrid>
      <div className="hint">
        Antes de cambiar, confirma con tu contador el porcentaje vigente de la tasa reducida y si aplica a tu negocio.
      </div>
    </CardBody>
  </Card>
);
