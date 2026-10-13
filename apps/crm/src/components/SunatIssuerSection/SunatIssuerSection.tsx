import { Card, CardBody, Field, FieldGrid, TextInput } from '@noname/ui';
import type { SunatSectionProps } from '@/types/SunatSectionProps';
import { SunatSectionHeader } from '../SunatSectionHeader/SunatSectionHeader';

export const SunatIssuerSection = ({ draft, updateField }: SunatSectionProps) => (
  <Card>
    <SunatSectionHeader number={1} title="Emisor" actions={<span className="hint">Debe coincidir exactamente con tu ficha RUC</span>} />
    <CardBody>
      <FieldGrid>
        <Field label="RUC" htmlFor="ruc">
          <TextInput
            id="ruc"
            monospace
            inputMode="numeric"
            maxLength={11}
            placeholder="20XXXXXXXXX"
            value={draft.ruc}
            onChange={(event) => updateField('ruc', event.target.value.replace(/\D/g, ''))}
          />
        </Field>
        <Field label="Razón social" htmlFor="legalName">
          <TextInput
            id="legalName"
            placeholder="[RAZÓN SOCIAL S.A.C.]"
            value={draft.legalName}
            onChange={(event) => updateField('legalName', event.target.value)}
          />
        </Field>
        <Field label="Nombre comercial" htmlFor="commercialName">
          <TextInput
            id="commercialName"
            placeholder="[TU MARCA]"
            value={draft.commercialName}
            onChange={(event) => updateField('commercialName', event.target.value)}
          />
        </Field>
      </FieldGrid>
      <FieldGrid>
        <Field label="Domicilio fiscal" htmlFor="fiscalAddress">
          <TextInput
            id="fiscalAddress"
            placeholder="Dirección registrada en SUNAT"
            value={draft.fiscalAddress}
            onChange={(event) => updateField('fiscalAddress', event.target.value)}
          />
        </Field>
        <Field label="Ubigeo" htmlFor="fiscalUbigeo">
          <TextInput
            id="fiscalUbigeo"
            monospace
            maxLength={6}
            placeholder="150122"
            value={draft.fiscalUbigeo}
            onChange={(event) => updateField('fiscalUbigeo', event.target.value.replace(/\D/g, ''))}
          />
        </Field>
      </FieldGrid>
    </CardBody>
  </Card>
);
