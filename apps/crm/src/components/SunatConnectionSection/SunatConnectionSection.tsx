import { SunatConnectionMode, SunatEnvironment } from '@noname/types';
import { Card, CardBody, Field, FieldGrid, SegmentedControl, TextInput } from '@noname/ui';
import type { SunatSectionProps } from '@/types/SunatSectionProps';
import { RadioCard } from '../RadioCard/RadioCard';
import { SunatSectionHeader } from '../SunatSectionHeader/SunatSectionHeader';
import styles from './SunatConnectionSection.module.css';

const environmentOptions = [
  { value: SunatEnvironment.Beta, label: 'Beta (testing)' },
  { value: SunatEnvironment.Production, label: 'Producción' },
];

export const SunatConnectionSection = ({ draft, updateField }: SunatSectionProps) => {
  const isOse = draft.connectionMode === SunatConnectionMode.OseProvider;
  return (
    <Card>
      <SunatSectionHeader
        number={2}
        title="Connection"
        actions={
          <SegmentedControl
            ariaLabel="Environment"
            options={environmentOptions}
            value={draft.environment}
            onChange={(environment) => updateField('environment', environment)}
          />
        }
      />
      <CardBody>
        <div className={styles.modes}>
          <RadioCard
            title="Through an OSE / PSE provider"
            recommended
            detail="The provider signs, validates and sends; you get the CDR back. Handles retries and SUNAT downtime."
            isSelected={isOse}
            onSelect={() => updateField('connectionMode', SunatConnectionMode.OseProvider)}
          />
          <RadioCard
            title="Directly to SUNAT"
            detail="SEE – Del contribuyente. We sign with your certificate and call SUNAT's web services with your SOL user."
            isSelected={!isOse}
            onSelect={() => updateField('connectionMode', SunatConnectionMode.Direct)}
          />
        </div>
        {isOse ? (
          <FieldGrid>
            <Field label="Provider" htmlFor="providerName">
              <TextInput
                id="providerName"
                placeholder="Provider name"
                value={draft.providerName}
                onChange={(event) => updateField('providerName', event.target.value)}
              />
            </Field>
            <Field label="API endpoint" htmlFor="providerEndpoint">
              <TextInput
                id="providerEndpoint"
                monospace
                placeholder="https://"
                value={draft.providerEndpoint}
                onChange={(event) => updateField('providerEndpoint', event.target.value)}
              />
            </Field>
            <Field
              label="API token"
              htmlFor="providerToken"
              hint={draft.hasProviderToken ? 'Stored in Secret Manager · enter a new one to replace it' : 'Not set'}
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
                placeholder="RUC + user, e.g. 20XXXXXXXXXMODDATOS"
                value={draft.solUser}
                onChange={(event) => updateField('solUser', event.target.value)}
              />
            </Field>
            <Field label="Clave SOL" htmlFor="solPassword" hint="Stored in Secret Manager, never in the database">
              <TextInput id="solPassword" type="password" placeholder="••••••••" disabled />
            </Field>
          </FieldGrid>
        )}
      </CardBody>
    </Card>
  );
};
