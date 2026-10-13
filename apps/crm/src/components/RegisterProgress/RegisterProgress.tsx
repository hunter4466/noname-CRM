import { classNames } from '@noname/ui';
import { RegisterStep } from '@/types/RegisterStep';
import styles from './RegisterProgress.module.css';

const steps = [
  { step: RegisterStep.Account, label: 'Cuenta' },
  { step: RegisterStep.Business, label: 'Negocio' },
  { step: RegisterStep.FirstLocation, label: 'Primer local' },
];

export interface RegisterProgressProps {
  step: RegisterStep;
}

export const RegisterProgress = ({ step }: RegisterProgressProps) => (
  <div className={styles.steps} aria-label="Progreso">
    {steps.map((item) => (
      <div key={item.step} className={classNames(styles.step, item.step === step && styles.current, item.step < step && styles.done)}>
        <i className={styles.bar} />
        {item.label}
      </div>
    ))}
  </div>
);
