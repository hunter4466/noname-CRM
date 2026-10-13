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
      title="Contraseña actualizada"
      hint="Se cerró tu sesión en otros equipos. Las cajas siguen activas porque usan el PIN del personal."
    />
    <ButtonLink href={Route.Login} variant={ButtonVariant.Primary} size={ButtonSize.Large} fullWidth>
      Iniciar sesión
    </ButtonLink>
  </>
);
