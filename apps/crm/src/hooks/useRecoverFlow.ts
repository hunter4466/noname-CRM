import { useState } from 'react';
import { RecoverStep } from '@/types/RecoverStep';
import { useRequestRecoveryCode } from './useRequestRecoveryCode';
import { useResetPassword } from './useResetPassword';

export const useRecoverFlow = () => {
  const requestCode = useRequestRecoveryCode();
  const resetPassword = useResetPassword();
  const [step, setStep] = useState(RecoverStep.RequestCode);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const sendCode = () => requestCode.mutate({ email }, { onSuccess: () => setStep(RecoverStep.EnterCode) });
  const submitNewPassword = () => resetPassword.mutate({ email, code, newPassword }, { onSuccess: () => setStep(RecoverStep.Done) });
  const switchEmail = () => {
    resetPassword.reset();
    setCode('');
    setStep(RecoverStep.RequestCode);
  };

  return {
    step,
    email,
    setEmail,
    code,
    setCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    passwordsMatch: newPassword !== '' && newPassword === confirmPassword,
    sendCode,
    submitNewPassword,
    switchEmail,
    requestCode,
    resetPassword,
  };
};
