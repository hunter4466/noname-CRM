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
  { value: '10.5', label: 'Reduced · restaurants & hotels (Ley 31556)' },
];

export const SunatTaxSection = ({ draft, updateField }: SunatSectionProps) => (
  <Card>
    <SunatSectionHeader number={5} title="Taxes & document rules" />
    <CardBody>
      <FieldGrid>
        <Field label="IGV rate" htmlFor="igvRate">
          <Select
            id="igvRate"
            options={igvRateOptions}
            value={String(draft.igvRate)}
            onChange={(event) => updateField('igvRate', Number(event.target.value))}
          />
        </Field>
        <Field label="ICBPER per plastic bag" htmlFor="icbper">
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
        <Field label="Default document at checkout" htmlFor="defaultDocument">
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
          label="Catalog prices include IGV"
          hint="IGV is broken out on the comprobante"
          checked={draft.pricesIncludeIgv}
          onChange={(value) => updateField('pricesIncludeIgv', value)}
        />
        <ToggleRow
          label="Ask for DNI on boletas over S/ 700"
          hint="POS blocks checkout until the customer is identified"
          checked={draft.requireDniOverAmount}
          onChange={(value) => updateField('requireDniOverAmount', value)}
        />
      </FieldGrid>
      <div className="hint">
        Check the reduced rate&apos;s current percentage and your eligibility with your accountant before switching.
      </div>
    </CardBody>
  </Card>
);
