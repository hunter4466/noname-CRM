import { BusinessType } from '@noname/types';
import { Button, ButtonSize, ButtonVariant, Field, TextInput } from '@noname/ui';
import { useState } from 'react';
import { AuthHeading } from '../AuthHeading/AuthHeading';
import { BusinessTypePicker } from '../BusinessTypePicker/BusinessTypePicker';
import { RegisterStepButtons } from '../RegisterStepButtons/RegisterStepButtons';
import type { RegisterStepProps } from '../RegisterWizard/RegisterStepProps';
import styles from './RegisterBusinessStep.module.css';

const RUC_PATTERN = /^(10|20)\d{9}$/;

export interface RegisterBusinessStepProps extends RegisterStepProps {
  onBack: () => void;
  onNext: () => void;
}

export const RegisterBusinessStep = ({ request, updateField, onBack, onNext }: RegisterBusinessStepProps) => {
  const [rucChecked, setRucChecked] = useState(false);
  const rucIsValid = RUC_PATTERN.test(request.ruc);
  return (
    <>
      <AuthHeading title="Your business" hint="We use your RUC to fill in your SUNAT details." />
      <Field
        label="RUC"
        htmlFor="ruc"
        hint={
          rucChecked &&
          (rucIsValid ? 'RUC format is valid. SUNAT details load after sign-up.' : 'RUC must be 11 digits starting with 10 or 20.')
        }
      >
        <div className={styles.rucRow}>
          <TextInput
            id="ruc"
            large
            monospace
            inputMode="numeric"
            placeholder="20XXXXXXXXX"
            value={request.ruc}
            onChange={(event) => updateField('ruc', event.target.value.replace(/\D/g, '').slice(0, 11))}
          />
          <Button size={ButtonSize.Large} onClick={() => setRucChecked(true)}>
            Validate
          </Button>
        </div>
      </Field>
      <Field label="Commercial name" htmlFor="commercialName">
        <TextInput
          id="commercialName"
          large
          placeholder="Name customers see on receipts"
          value={request.commercialName}
          onChange={(event) => updateField('commercialName', event.target.value)}
        />
      </Field>
      <BusinessTypePicker value={request.businessType} onChange={(value: BusinessType) => updateField('businessType', value)} />
      <RegisterStepButtons onBack={onBack}>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Large}
          fullWidth
          disabled={!rucIsValid || !request.commercialName.trim()}
          onClick={onNext}
        >
          Continue
        </Button>
      </RegisterStepButtons>
    </>
  );
};
