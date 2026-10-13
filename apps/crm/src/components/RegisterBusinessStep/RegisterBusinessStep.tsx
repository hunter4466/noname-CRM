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
      <AuthHeading title="Tu negocio" hint="Usamos tu RUC para completar tus datos de SUNAT." />
      <Field
        label="RUC"
        htmlFor="ruc"
        hint={
          rucChecked &&
          (rucIsValid
            ? 'El formato del RUC es válido. Los datos de SUNAT se cargan después del registro.'
            : 'El RUC debe tener 11 dígitos y empezar con 10 o 20.')
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
            Validar
          </Button>
        </div>
      </Field>
      <Field label="Nombre comercial" htmlFor="commercialName">
        <TextInput
          id="commercialName"
          large
          placeholder="Nombre que ven los clientes en los comprobantes"
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
          Continuar
        </Button>
      </RegisterStepButtons>
    </>
  );
};
