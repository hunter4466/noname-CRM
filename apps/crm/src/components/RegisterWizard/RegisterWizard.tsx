'use client';

import { useRegisterWizard } from '@/hooks/useRegisterWizard';
import { RegisterStep } from '@/types/RegisterStep';
import { RegisterAccountStep } from '../RegisterAccountStep/RegisterAccountStep';
import { RegisterBusinessStep } from '../RegisterBusinessStep/RegisterBusinessStep';
import { RegisterLocationStep } from '../RegisterLocationStep/RegisterLocationStep';
import { RegisterProgress } from '../RegisterProgress/RegisterProgress';
import { RegisterVerifyStep } from '../RegisterVerifyStep/RegisterVerifyStep';

export const RegisterWizard = () => {
  const wizard = useRegisterWizard();
  const stepProps = { request: wizard.request, updateField: wizard.updateField };
  return (
    <>
      {wizard.step !== RegisterStep.VerifyEmail && <RegisterProgress step={wizard.step} />}
      {wizard.step === RegisterStep.Account && <RegisterAccountStep {...stepProps} onNext={wizard.goNext} />}
      {wizard.step === RegisterStep.Business && <RegisterBusinessStep {...stepProps} onBack={wizard.goBack} onNext={wizard.goNext} />}
      {wizard.step === RegisterStep.FirstLocation && (
        <RegisterLocationStep
          {...stepProps}
          onBack={wizard.goBack}
          onSubmit={wizard.submit}
          isSubmitting={wizard.register.isPending}
          error={wizard.register.error}
        />
      )}
      {wizard.step === RegisterStep.VerifyEmail && <RegisterVerifyStep email={wizard.request.email} onRestart={wizard.restart} />}
    </>
  );
};
