import { Button, ButtonVariant, ToggleRow } from '@noname/ui';
import { useNewTerminalForm } from '@/hooks/useNewTerminalForm';
import { FormError } from '../FormError/FormError';
import { NewTerminalFields } from '../NewTerminalFields/NewTerminalFields';
import styles from './NewTerminalForm.module.css';

export interface NewTerminalFormProps {
  locationId: string;
  printerOptions: string[];
  nextIndex: number;
  onClose: () => void;
}

export const NewTerminalForm = ({ locationId, printerOptions, nextIndex, onClose }: NewTerminalFormProps) => {
  const form = useNewTerminalForm(locationId, nextIndex, onClose);
  return (
    <div className={styles.form}>
      <div>
        <strong>New point of sale</strong>
        <div className="hint">After saving you get a pairing code to enter on the device</div>
      </div>
      <NewTerminalFields input={form.input} updateField={form.updateField} printerOptions={printerOptions} />
      <ToggleRow
        label="Allow offline sales (contingency)"
        checked={form.input.allowOfflineSales}
        onChange={(value) => form.updateField('allowOfflineSales', value)}
      />
      <FormError error={form.addTerminal.error} />
      <div className={styles.actions}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant={ButtonVariant.Primary} disabled={form.addTerminal.isPending || !form.input.name.trim()} onClick={form.submit}>
          Add POS
        </Button>
      </div>
    </div>
  );
};
