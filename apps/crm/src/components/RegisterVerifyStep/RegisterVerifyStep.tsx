import { ButtonSize, ButtonVariant } from '@noname/ui';
import { IconCheck } from '@noname/ui/icons';
import { Route } from '@/types/Route';
import { AuthHeading } from '../AuthHeading/AuthHeading';
import { ButtonLink } from '../shared/ButtonLink/ButtonLink';
import styles from './RegisterVerifyStep.module.css';

export interface RegisterVerifyStepProps {
  email: string;
  onRestart: () => void;
}

export const RegisterVerifyStep = ({ email, onRestart }: RegisterVerifyStepProps) => (
  <>
    <span className={styles.icon}>
      <IconCheck size={30} />
    </span>
    <AuthHeading
      title="Check your inbox"
      hint={
        <>
          We sent a verification link to <b className={styles.email}>{email}</b>. Open it to activate your account.
        </>
      }
    />
    <ButtonLink href={Route.Dashboard} variant={ButtonVariant.Primary} size={ButtonSize.Large} fullWidth>
      I&apos;ve verified, go to my dashboard
    </ButtonLink>
    <div className="hint">
      Wrong email?{' '}
      <button type="button" className={styles.link} onClick={onRestart}>
        Start over
      </button>
    </div>
  </>
);
