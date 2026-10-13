import { Button, ButtonSize, ButtonVariant, Field } from '@noname/ui';
import { evaluatePasswordRules, isPasswordAcceptable } from '@/lib/passwordRules';
import { AuthHeading } from '../AuthHeading/AuthHeading';
import { CodeInput } from '../CodeInput/CodeInput';
import { FormError } from '../FormError/FormError';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { PasswordRules } from '../PasswordRules/PasswordRules';
import type { RecoverFlowState } from '../RecoverFlow/RecoverFlowState';
import styles from './RecoverCodeStep.module.css';

const CODE_LENGTH = 6;

export interface RecoverCodeStepProps {
  flow: RecoverFlowState;
}

export const RecoverCodeStep = ({ flow }: RecoverCodeStepProps) => {
  const canSubmit = flow.code.length === CODE_LENGTH && isPasswordAcceptable(flow.newPassword) && flow.passwordsMatch;
  return (
    <>
      <button type="button" className={styles.back} onClick={flow.switchEmail}>
        ← Use a different email
      </button>
      <AuthHeading
        title="Enter the code"
        hint={
          <>
            We sent a 6-digit code to <b className={styles.email}>{flow.email}</b>. It expires in 10 minutes. (Demo code: 481920)
          </>
        }
      />
      <CodeInput length={CODE_LENGTH} value={flow.code} onChange={flow.setCode} />
      <Field label="New password" htmlFor="newPassword" hint={<PasswordRules rules={evaluatePasswordRules(flow.newPassword)} />}>
        <PasswordInput id="newPassword" autoComplete="new-password" value={flow.newPassword} onChange={flow.setNewPassword} />
      </Field>
      <Field
        label="Confirm new password"
        htmlFor="confirmPassword"
        hint={flow.confirmPassword && !flow.passwordsMatch ? "Passwords don't match" : undefined}
      >
        <PasswordInput id="confirmPassword" autoComplete="new-password" value={flow.confirmPassword} onChange={flow.setConfirmPassword} />
      </Field>
      <FormError error={flow.resetPassword.error} />
      <Button
        variant={ButtonVariant.Primary}
        size={ButtonSize.Large}
        fullWidth
        disabled={!canSubmit || flow.resetPassword.isPending}
        onClick={flow.submitNewPassword}
      >
        Update password
      </Button>
    </>
  );
};
