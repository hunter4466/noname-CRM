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
      <Field label="Nombre" htmlFor="terminalName">
        <TextInput
          id="terminalName"
          placeholder="p. ej. Caja mostrador, Caja recojo, Caja terraza"
          value={input.name}
          onChange={(event) => updateField('name', event.target.value)}
        />
      </Field>
      <Field label="¿Dónde está?" htmlFor="terminalPlacement">
        <TextInput
          id="terminalPlacement"
          placeholder="p. ej. Junto a la puerta de la terraza"
          value={input.placement}
          onChange={(event) => updateField('placement', event.target.value)}
        />
      </Field>
      <Field label="Impresora de comprobantes" htmlFor="receiptPrinter">
        <Select
          id="receiptPrinter"
          options={[{ value: NO_PRINTER, label: 'Elige una impresora…' }, ...printers]}
          value={input.receiptPrinter}
          onChange={(event) => updateField('receiptPrinter', event.target.value)}
        />
      </Field>
      <Field label="Impresora de cocina (comandas)" htmlFor="kitchenPrinter">
        <Select
          id="kitchenPrinter"
          options={[{ value: NO_PRINTER, label: 'Usar el envío por producto' }, ...printers]}
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
      <Field label="Serie de facturas" htmlFor="facturaSeries">
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
