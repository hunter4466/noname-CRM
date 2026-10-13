import { SunatConnectionMode, SunatEnvironment } from '@noname/types';
import { Card, CardBody, Field, FieldGrid, SegmentedControl, TextInput } from '@noname/ui';
import type { SunatSectionProps } from '@/types/SunatSectionProps';
import { RadioCard } from '../RadioCard/RadioCard';
import { SunatSectionHeader } from '../SunatSectionHeader/SunatSectionHeader';
import styles from './SunatConnectionSection.module.css';

const environmentOptions = [
  { value: SunatEnvironment.Beta, label: 'Beta (pruebas)' },
  { value: SunatEnvironment.Production, label: 'Producción' },
];

export const SunatConnectionSection = ({ draft, updateField }: SunatSectionProps) => {
  const isOse = draft.connectionMode === SunatConnectionMode.OseProvider;
  return (
    <Card>
      <SunatSectionHeader
        number={2}
        title="Conexión"
        actions={
          <SegmentedControl
            ariaLabel="Entorno"
            options={environmentOptions}
            value={draft.environment}
            onChange={(environment) => updateField('environment', environment)}
          />
        }
      />
      <CardBody>
        <div className={styles.modes}>
          <RadioCard
            title="A través de un proveedor OSE / PSE"
            recommended
            detail="El proveedor firma, valida y envía; tú recibes el CDR. Gestiona reintentos y caídas de SUNAT."
            isSelected={isOse}
            onSelect={() => updateField('connectionMode', SunatConnectionMode.OseProvider)}
          />
          <RadioCard
            title="Directo a SUNAT"
            detail="SEE – Del contribuyente. Firmamos con tu certificado y llamamos a los servicios web de SUNAT con tu usuario SOL."
            isSelected={!isOse}
            onSelect={() => updateField('connectionMode', SunatConnectionMode.Direct)}
          />
        </div>
        {isOse ? (
          <FieldGrid>
            <Field label="Proveedor" htmlFor="providerName">
              <TextInput
                id="providerName"
                placeholder="Nombre del proveedor"
                value={draft.providerName}
                onChange={(event) => updateField('providerName', event.target.value)}
              />
            </Field>
            <Field label="Endpoint de la API" htmlFor="providerEndpoint">
              <TextInput
                id="providerEndpoint"
                monospace
                placeholder="https://"
                value={draft.providerEndpoint}
                onChange={(event) => updateField('providerEndpoint', event.target.value)}
              />
            </Field>
            <Field
              label="Token de la API"
              htmlFor="providerToken"
              hint={draft.hasProviderToken ? 'Guardado en Secret Manager · ingresa uno nuevo para reemplazarlo' : 'No configurado'}
            >
              <TextInput id="providerToken" monospace type="password" placeholder="••••••••••••" disabled />
            </Field>
          </FieldGrid>
        ) : (
          <FieldGrid>
            <Field label="Usuario SOL secundario" htmlFor="solUser">
              <TextInput
                id="solUser"
                monospace
                placeholder="RUC + usuario, p. ej. 20XXXXXXXXXMODDATOS"
                value={draft.solUser}
                onChange={(event) => updateField('solUser', event.target.value)}
              />
            </Field>
            <Field label="Clave SOL" htmlFor="solPassword" hint="Guardada en Secret Manager, nunca en la base de datos">
              <TextInput id="solPassword" type="password" placeholder="••••••••" disabled />
            </Field>
          </FieldGrid>
        )}
      </CardBody>
    </Card>
  );
};
