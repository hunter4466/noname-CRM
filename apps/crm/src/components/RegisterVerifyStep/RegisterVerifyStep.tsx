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
      title="Revisa tu correo"
      hint={
        <>
          Enviamos un enlace de verificación a <b className={styles.email}>{email}</b>. Ábrelo para activar tu cuenta.
        </>
      }
    />
    <ButtonLink href={Route.Dashboard} variant={ButtonVariant.Primary} size={ButtonSize.Large} fullWidth>
      Ya verifiqué, ir a mi panel
    </ButtonLink>
    <div className="hint">
      ¿Correo incorrecto?{' '}
      <button type="button" className={styles.link} onClick={onRestart}>
        Empezar de nuevo
      </button>
    </div>
  </>
);
