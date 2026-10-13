import { Button, ButtonSize, ButtonVariant, Field, Select, TextInput } from '@noname/ui';
import { AuthHeading } from '../AuthHeading/AuthHeading';
import { FormError } from '../FormError/FormError';
import { RegisterStepButtons } from '../RegisterStepButtons/RegisterStepButtons';
import type { RegisterStepProps } from '../RegisterWizard/RegisterStepProps';
import { TerminalCountStepper } from '../TerminalCountStepper/TerminalCountStepper';
import styles from './RegisterLocationStep.module.css';

const districts = ['Miraflores', 'San Isidro', 'Barranco', 'Surco'].map((district) => ({ value: district, label: district }));

export interface RegisterLocationStepProps extends RegisterStepProps {
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  error: Error | null;
}

export const RegisterLocationStep = ({ request, updateField, onBack, onSubmit, isSubmitting, error }: RegisterLocationStepProps) => (
  <>
    <AuthHeading title="Your first location" hint="You can add the map pin, printers and more locations later." />
    <Field label="Location name" htmlFor="locationName">
      <TextInput
        id="locationName"
        large
        placeholder="e.g. Miraflores"
        value={request.firstLocationName}
        onChange={(event) => updateField('firstLocationName', event.target.value)}
      />
    </Field>
    <div className={styles.row}>
      <Field label="District" htmlFor="district">
        <Select
          id="district"
          large
          options={districts}
          value={request.firstLocationDistrict}
          onChange={(event) => updateField('firstLocationDistrict', event.target.value)}
        />
      </Field>
      <Field label="Opening hours" htmlFor="openingHours">
        <TextInput
          id="openingHours"
          large
          placeholder="12:00 – 23:00"
          value={request.openingHours}
          onChange={(event) => updateField('openingHours', event.target.value)}
        />
      </Field>
    </div>
    <TerminalCountStepper value={request.terminalCount} onChange={(value) => updateField('terminalCount', value)} />
    <FormError error={error} />
    <RegisterStepButtons onBack={onBack}>
      <Button
        variant={ButtonVariant.Primary}
        size={ButtonSize.Large}
        fullWidth
        disabled={isSubmitting || !request.firstLocationName.trim()}
        onClick={onSubmit}
      >
        {isSubmitting ? 'Creating account…' : 'Create account'}
      </Button>
    </RegisterStepButtons>
  </>
);
