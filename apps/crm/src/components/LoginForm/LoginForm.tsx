'use client';

import { Button, ButtonSize, ButtonVariant, Field, TextInput } from '@noname/ui';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { useLogin } from '@/hooks/useLogin';
import { Route } from '@/types/Route';
import { AuthDivider } from '../AuthDivider/AuthDivider';
import { AuthHeading } from '../AuthHeading/AuthHeading';
import { FormError } from '../FormError/FormError';
import { GoogleButton } from '../GoogleButton/GoogleButton';
import { LoginFooter } from '../LoginFooter/LoginFooter';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import styles from './LoginForm.module.css';

const DEMO_CREDENTIALS = { email: 'owner@demo.pe', password: 'demo1234' };

export const LoginForm = () => {
  const login = useLogin();
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    login.mutate({ email, password, keepSignedIn });
  };

  return (
    <>
      <AuthHeading title="Sign in" hint="Welcome back. Use your work account." />
      <GoogleButton label="Continue with Google" onClick={() => login.mutate({ ...DEMO_CREDENTIALS, keepSignedIn })} />
      <AuthDivider label="or with email" />
      <form className={styles.form} onSubmit={submit}>
        <Field label="Work email" htmlFor="email">
          <TextInput
            id="email"
            large
            type="email"
            autoComplete="email"
            placeholder="you@company.pe"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Field label="Password" htmlFor="password" aside={<Link href={Route.Recover}>Forgot password?</Link>}>
          <PasswordInput id="password" autoComplete="current-password" value={password} onChange={setPassword} />
        </Field>
        <label className={styles.checkbox}>
          <input type="checkbox" checked={keepSignedIn} onChange={(event) => setKeepSignedIn(event.target.checked)} />
          Keep me signed in on this device
        </label>
        <FormError error={login.error} />
        <Button type="submit" variant={ButtonVariant.Primary} size={ButtonSize.Large} fullWidth disabled={login.isPending}>
          {login.isPending ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
      <LoginFooter />
    </>
  );
};
