import { ButtonSize, ButtonVariant } from '@noname/ui';
import { IconCheck } from '@noname/ui/icons';
import { Route } from '@/types/Route';
import { AuthHeading } from '../AuthHeading/AuthHeading';
import { ButtonLink } from '../shared/ButtonLink/ButtonLink';
import styles from './RecoverDoneStep.module.css';

export const RecoverDoneStep = () => (
  <>
    <span className={styles.icon}>
      <IconCheck size={30} />
    </span>
    <AuthHeading
      title="Password updated"
      hint="You've been signed out on other devices. Registers stay signed in, since they use staff PINs."
    />
    <ButtonLink href={Route.Login} variant={ButtonVariant.Primary} size={ButtonSize.Large} fullWidth>
      Sign in
    </ButtonLink>
  </>
);
