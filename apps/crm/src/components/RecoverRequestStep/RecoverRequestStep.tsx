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
        ← Back to sign in
      </Link>
      <AuthHeading title="Reset your password" hint="Enter the email you sign in with. We'll send you a 6-digit code." />
      <Field label="Work email" htmlFor="recoverEmail">
        <TextInput
          id="recoverEmail"
          large
          type="email"
          autoComplete="email"
          placeholder="you@company.pe"
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
        Send code
      </Button>
      <div className="hint">
        Signed up with Google? <Link href={Route.Login}>Continue with Google</Link> instead. There&apos;s no password to reset.
      </div>
    </form>
  );
};
