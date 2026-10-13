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
      <AuthHeading title="Create your account" hint="You'll be the owner. Invite your team later." />
      <GoogleButton label="Sign up with Google" onClick={onNext} />
      <AuthDivider label="or with email" />
      <Field label="Full name" htmlFor="fullName">
        <TextInput
          id="fullName"
          large
          autoComplete="name"
          placeholder="Your name"
          value={request.fullName}
          onChange={(event) => updateField('fullName', event.target.value)}
        />
      </Field>
      <Field label="Work email" htmlFor="registerEmail">
        <TextInput
          id="registerEmail"
          large
          type="email"
          autoComplete="email"
          placeholder="you@company.pe"
          value={request.email}
          onChange={(event) => updateField('email', event.target.value)}
        />
      </Field>
      <Field label="Password" htmlFor="registerPassword" hint={<PasswordRules rules={evaluatePasswordRules(request.password)} />}>
        <PasswordInput
          id="registerPassword"
          autoComplete="new-password"
          value={request.password}
          onChange={(value) => updateField('password', value)}
        />
      </Field>
      <label className={styles.checkbox}>
        <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />I agree to the Terms
        and Privacy Policy
      </label>
      <Button variant={ButtonVariant.Primary} size={ButtonSize.Large} fullWidth disabled={!canContinue} onClick={onNext}>
        Continue
      </Button>
      <div className={styles.alternative}>
        Already have an account? <Link href={Route.Login}>Sign in</Link>
      </div>
    </>
  );
};
