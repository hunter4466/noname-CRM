import { Button, ButtonSize, ButtonVariant, Field, TextInput } from '@noname/ui';
import Link from 'next/link';
import { useState } from 'react';
import { evaluatePasswordRules, isPasswordAcceptable } from '@/lib/passwordRules';
import { Route } from '@/types/Route';
import { AuthDivider } from '../AuthDivider/AuthDivider';
import { AuthHeading } from '../AuthHeading/AuthHeading';
import { GoogleButton } from '../GoogleButton/GoogleButton';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { PasswordRules } from '../PasswordRules/PasswordRules';
import type { RegisterStepProps } from '../RegisterWizard/RegisterStepProps';
import styles from './RegisterAccountStep.module.css';

export interface RegisterAccountStepProps extends RegisterStepProps {
  onNext: () => void;
}

export const RegisterAccountStep = ({ request, updateField, onNext }: RegisterAccountStepProps) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const canContinue =
    request.fullName.trim() !== '' && request.email.includes('@') && isPasswordAcceptable(request.password) && acceptedTerms;
  return (
    <>
      <AuthHeading title="Crea tu cuenta" hint="Serás el propietario. Invita a tu equipo después." />
      <GoogleButton label="Registrarse con Google" onClick={onNext} />
      <AuthDivider label="o con correo" />
      <Field label="Nombre completo" htmlFor="fullName">
        <TextInput
          id="fullName"
          large
          autoComplete="name"
          placeholder="Tu nombre"
          value={request.fullName}
          onChange={(event) => updateField('fullName', event.target.value)}
        />
      </Field>
      <Field label="Correo de trabajo" htmlFor="registerEmail">
        <TextInput
          id="registerEmail"
          large
          type="email"
          autoComplete="email"
          placeholder="tu@empresa.pe"
          value={request.email}
          onChange={(event) => updateField('email', event.target.value)}
        />
      </Field>
      <Field label="Contraseña" htmlFor="registerPassword" hint={<PasswordRules rules={evaluatePasswordRules(request.password)} />}>
        <PasswordInput
          id="registerPassword"
          autoComplete="new-password"
          value={request.password}
          onChange={(value) => updateField('password', value)}
        />
      </Field>
      <label className={styles.checkbox}>
        <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />
        Acepto los Términos y la Política de Privacidad
      </label>
      <Button variant={ButtonVariant.Primary} size={ButtonSize.Large} fullWidth disabled={!canContinue} onClick={onNext}>
        Continuar
      </Button>
      <div className={styles.alternative}>
        ¿Ya tienes una cuenta? <Link href={Route.Login}>Iniciar sesión</Link>
      </div>
    </>
  );
};
