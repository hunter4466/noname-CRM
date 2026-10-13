import { BusinessType, type RegisterRequest } from '@noname/types';
import { useState } from 'react';
import { RegisterStep } from '@/types/RegisterStep';
import { useRegister } from './useRegister';

const initialRequest: RegisterRequest = {
  fullName: '',
  email: '',
  password: '',
  ruc: '',
  commercialName: '',
  businessType: BusinessType.Restaurant,
  firstLocationName: '',
  firstLocationDistrict: 'Miraflores',
  openingHours: '',
  terminalCount: 1,
};

export const useRegisterWizard = () => {
  const register = useRegister();
  const [step, setStep] = useState(RegisterStep.Account);
  const [request, setRequest] = useState(initialRequest);

  const updateField = <K extends keyof RegisterRequest>(field: K, value: RegisterRequest[K]) =>
    setRequest((current) => ({ ...current, [field]: value }));

  const goBack = () => setStep((current) => Math.max(RegisterStep.Account, current - 1));
  const goNext = () => setStep((current) => Math.min(RegisterStep.FirstLocation, current + 1));
  const restart = () => {
    register.reset();
    setRequest(initialRequest);
    setStep(RegisterStep.Account);
  };
  const submit = () => register.mutate(request, { onSuccess: () => setStep(RegisterStep.VerifyEmail) });

  return { step, request, updateField, goBack, goNext, restart, submit, register };
};
