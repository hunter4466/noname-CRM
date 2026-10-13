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
      title="Certificado digital"
      actions={
        <Pill tone={config.hasCertificate ? PillTone.Ok : PillTone.Warn} withDot>
          {config.hasCertificate ? 'Subido' : 'No subido'}
        </Pill>
      }
    />
    <CardBody>
      <div className={styles.drop}>
        <span className={styles.icon}>
          <IconUpload />
        </span>
        <div className={styles.text}>
          <div className={styles.title}>Suelta tu certificado .pfx o .p12</div>
          <div className="hint">Emitido para tu RUC. Lo guardamos cifrado y te avisamos 30 días antes de que venza.</div>
        </div>
        <Button disabled title="Próximamente">
          Elegir archivo
        </Button>
      </div>
      <FieldGrid>
        <Field label="Contraseña del certificado" htmlFor="certificatePassword">
          <TextInput id="certificatePassword" type="password" placeholder="••••••••" disabled />
        </Field>
        <Field label="Vence" htmlFor="certificateExpires">
          <TextInput
            id="certificateExpires"
            monospace
            readOnly
            placeholder="Se lee del certificado"
            value={config.certificateExpiresAt ?? ''}
          />
        </Field>
      </FieldGrid>
    </CardBody>
  </Card>
);
