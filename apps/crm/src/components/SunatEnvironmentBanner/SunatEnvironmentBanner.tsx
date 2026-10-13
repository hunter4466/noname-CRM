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
          {isBeta ? 'Los comprobantes se envían al entorno de pruebas de SUNAT' : 'Los comprobantes se envían a SUNAT producción'}
        </div>
        <div className="hint">
          {testResult
            ? testResult.message
            : `${config.lastTestLabel} ${config.hasCertificate ? '' : 'Sube el certificado digital para pasar a producción.'}`}
        </div>
      </div>
      <Button disabled={!config.hasCertificate} title={config.hasCertificate ? undefined : 'Primero sube el certificado'}>
        Pasar a producción
      </Button>
    </div>
  );
};
