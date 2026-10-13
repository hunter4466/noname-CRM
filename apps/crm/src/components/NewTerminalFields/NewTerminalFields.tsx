import type { TerminalInput } from '@noname/types';
import { Field, FieldGrid, Select, TextInput } from '@noname/ui';

const NO_PRINTER = '';

export interface NewTerminalFieldsProps {
  input: TerminalInput;
  updateField: <K extends keyof TerminalInput>(field: K, value: TerminalInput[K]) => void;
  printerOptions: string[];
}

export const NewTerminalFields = ({ input, updateField, printerOptions }: NewTerminalFieldsProps) => {
  const printers = printerOptions.map((printer) => ({ value: printer, label: printer }));
  return (
    <FieldGrid>
      <Field label="Name" htmlFor="terminalName">
        <TextInput
          id="terminalName"
          placeholder="e.g. Counter POS, Curbside POS, Terrace POS"
          value={input.name}
          onChange={(event) => updateField('name', event.target.value)}
        />
      </Field>
      <Field label="Where is it?" htmlFor="terminalPlacement">
        <TextInput
          id="terminalPlacement"
          placeholder="e.g. Next to the terrace door"
          value={input.placement}
          onChange={(event) => updateField('placement', event.target.value)}
        />
      </Field>
      <Field label="Receipt printer" htmlFor="receiptPrinter">
        <Select
          id="receiptPrinter"
          options={[{ value: NO_PRINTER, label: 'Choose a printer…' }, ...printers]}
          value={input.receiptPrinter}
          onChange={(event) => updateField('receiptPrinter', event.target.value)}
        />
      </Field>
      <Field label="Kitchen printer (comandas)" htmlFor="kitchenPrinter">
        <Select
          id="kitchenPrinter"
          options={[{ value: NO_PRINTER, label: 'Use product routing' }, ...printers]}
          value={input.kitchenPrinter}
          onChange={(event) => updateField('kitchenPrinter', event.target.value)}
        />
      </Field>
      <Field label="Boleta series" htmlFor="boletaSeries">
        <TextInput
          id="boletaSeries"
          monospace
          maxLength={4}
          value={input.boletaSeries}
          onChange={(event) => updateField('boletaSeries', event.target.value.toUpperCase())}
        />
      </Field>
      <Field label="Factura series" htmlFor="facturaSeries">
        <TextInput
          id="facturaSeries"
          monospace
          maxLength={4}
          value={input.facturaSeries}
          onChange={(event) => updateField('facturaSeries', event.target.value.toUpperCase())}
        />
      </Field>
    </FieldGrid>
  );
};
