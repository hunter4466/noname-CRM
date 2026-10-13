import type { SetupStep } from '@noname/types';
import { ButtonSize, Card, classNames } from '@noname/ui';
import { IconCheck } from '@noname/ui/icons';
import { Route } from '@/types/Route';
import { ButtonLink } from '../shared/ButtonLink/ButtonLink';
import styles from './SetupProgressCard.module.css';

export interface SetupProgressCardProps {
  steps: SetupStep[];
}

export const SetupProgressCard = ({ steps }: SetupProgressCardProps) => {
  const doneCount = steps.filter((step) => step.isDone).length;
  if (doneCount === steps.length) {
    return null;
  }
  return (
    <Card ariaLabel="Progreso de la configuración" className={styles.card}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>Termina de configurar el Punto de Venta</div>
          <div className="hint">
            {doneCount} de {steps.length} pasos completados · los comprobantes electrónicos están en SUNAT Beta hasta subir el certificado
          </div>
        </div>
        <ButtonLink href={Route.Configuration} size={ButtonSize.Small}>
          Continuar configuración
        </ButtonLink>
      </div>
      <div className={styles.steps}>
        {steps.map((step) => (
          <div key={step.label} className={classNames(styles.step, !step.isDone && styles.todo)}>
            {step.isDone ? (
              <span className={styles.check}>
                <IconCheck size={12} />
              </span>
            ) : (
              <span className={styles.pending} />
            )}
            {step.label}
          </div>
        ))}
      </div>
    </Card>
  );
};
