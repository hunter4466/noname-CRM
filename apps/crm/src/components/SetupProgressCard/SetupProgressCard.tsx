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
    <Card ariaLabel="Setup progress" className={styles.card}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>Finish setting up Point of Sale</div>
          <div className="hint">
            {doneCount} of {steps.length} steps done · electronic receipts are in SUNAT Beta until the certificate is uploaded
          </div>
        </div>
        <ButtonLink href={Route.Configuration} size={ButtonSize.Small}>
          Continue setup
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
