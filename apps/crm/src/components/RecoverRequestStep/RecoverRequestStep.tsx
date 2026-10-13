import { Button, ButtonSize, ButtonVariant, Field, TextInput } from '@noname/ui';
import Link from 'next/link';
import type { FormEvent } from 'react';
import { Route } from '@/types/Route';
import { AuthHeading } from '../AuthHeading/AuthHeading';
import { FormError } from '../FormError/FormError';
import type { RecoverFlowState } from '../RecoverFlow/RecoverFlowState';
import styles from './RecoverRequestStep.module.css';

export interface RecoverRequestStepProps {
  flow: RecoverFlowState;
}

export const RecoverRequestStep = ({ flow }: RecoverRequestStepProps) => {
  const submit = (event: FormEvent) => {
    event.preventDefault();
    flow.sendCode();
  };
  return (
    <form className={styles.form} onSubmit={submit}>
      <Link href={Route.Login} className={styles.back}>
        ← Volver a iniciar sesión
      </Link>
      <AuthHeading
        title="Restablece tu contraseña"
        hint="Ingresa el correo con el que inicias sesión. Te enviaremos un código de 6 dígitos."
      />
      <Field label="Correo de trabajo" htmlFor="recoverEmail">
        <TextInput
          id="recoverEmail"
          large
          type="email"
          autoComplete="email"
          placeholder="tu@empresa.pe"
          value={flow.email}
          onChange={(event) => flow.setEmail(event.target.value)}
        />
      </Field>
      <FormError error={flow.requestCode.error} />
      <Button
        type="submit"
        variant={ButtonVariant.Primary}
        size={ButtonSize.Large}
        fullWidth
        disabled={flow.requestCode.isPending || !flow.email.includes('@')}
      >
        Enviar código
      </Button>
      <div className="hint">
        ¿Te registraste con Google? Mejor <Link href={Route.Login}>continúa con Google</Link>: no hay contraseña que restablecer.
      </div>
    </form>
  );
};
