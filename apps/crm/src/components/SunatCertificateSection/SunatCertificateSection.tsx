import type { SunatConfig } from '@noname/types';
import { Button, Card, CardBody, Field, FieldGrid, Pill, PillTone, TextInput } from '@noname/ui';
import { IconUpload } from '@noname/ui/icons';
import { SunatSectionHeader } from '../SunatSectionHeader/SunatSectionHeader';
import styles from './SunatCertificateSection.module.css';

export interface SunatCertificateSectionProps {
  config: SunatConfig;
}

// Upload is not wired yet: certificates go to Secret Manager through a dedicated endpoint (to be approved).
export const SunatCertificateSection = ({ config }: SunatCertificateSectionProps) => (
  <Card>
    <SunatSectionHeader
      number={3}
      title="Digital certificate"
      actions={
        <Pill tone={config.hasCertificate ? PillTone.Ok : PillTone.Warn} withDot>
          {config.hasCertificate ? 'Uploaded' : 'Not uploaded'}
        </Pill>
      }
    />
    <CardBody>
      <div className={styles.drop}>
        <span className={styles.icon}>
          <IconUpload />
        </span>
        <div className={styles.text}>
          <div className={styles.title}>Drop your .pfx or .p12 certificate</div>
          <div className="hint">Issued for your RUC. We store it encrypted and warn you 30 days before it expires.</div>
        </div>
        <Button disabled title="Coming soon">
          Choose file
        </Button>
      </div>
      <FieldGrid>
        <Field label="Certificate password" htmlFor="certificatePassword">
          <TextInput id="certificatePassword" type="password" placeholder="••••••••" disabled />
        </Field>
        <Field label="Expires" htmlFor="certificateExpires">
          <TextInput
            id="certificateExpires"
            monospace
            readOnly
            placeholder="Read from certificate"
            value={config.certificateExpiresAt ?? ''}
          />
        </Field>
      </FieldGrid>
    </CardBody>
  </Card>
);
