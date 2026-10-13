import { SunatEnvironment, type SunatConfig, type TestConnectionResponse } from '@noname/types';
import { Button, Pill, PillTone } from '@noname/ui';
import styles from './SunatEnvironmentBanner.module.css';

export interface SunatEnvironmentBannerProps {
  config: SunatConfig;
  testResult: TestConnectionResponse | null;
}

export const SunatEnvironmentBanner = ({ config, testResult }: SunatEnvironmentBannerProps) => {
  const isBeta = config.environment === SunatEnvironment.Beta;
  return (
    <div className={styles.banner} role="status">
      <Pill tone={isBeta ? PillTone.Warn : PillTone.Ok} withDot>
        {isBeta ? 'SUNAT Beta' : 'Producción'}
      </Pill>
      <div className={styles.text}>
        <div className={styles.title}>
          {isBeta ? "Documents are being sent to SUNAT's test environment" : 'Documents are being sent to SUNAT production'}
        </div>
        <div className="hint">
          {testResult
            ? testResult.message
            : `${config.lastTestLabel} ${config.hasCertificate ? '' : 'Upload the digital certificate to go live.'}`}
        </div>
      </div>
      <Button disabled={!config.hasCertificate} title={config.hasCertificate ? undefined : 'Upload the certificate first'}>
        Go to production
      </Button>
    </div>
  );
};
