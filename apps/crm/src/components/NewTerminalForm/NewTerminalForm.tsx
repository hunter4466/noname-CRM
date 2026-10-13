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
        <strong>Nuevo punto de venta</strong>
        <div className="hint">Al guardar recibirás un código de vinculación para ingresar en el equipo</div>
      </div>
      <NewTerminalFields input={form.input} updateField={form.updateField} printerOptions={printerOptions} />
      <ToggleRow
        label="Permitir ventas sin conexión (contingencia)"
        checked={form.input.allowOfflineSales}
        onChange={(value) => form.updateField('allowOfflineSales', value)}
      />
      <FormError error={form.addTerminal.error} />
      <div className={styles.actions}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant={ButtonVariant.Primary} disabled={form.addTerminal.isPending || !form.input.name.trim()} onClick={form.submit}>
          Agregar POS
        </Button>
      </div>
    </div>
  );
};
