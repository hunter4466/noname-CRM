import type { TerminalInput } from '@noname/types';
import { useState } from 'react';
import { useAddTerminal } from './useAddTerminal';

const NO_PRINTER = '';

export const createEmptyTerminal = (nextIndex: number): TerminalInput => {
  const suffix = String(nextIndex).padStart(3, '0');
  return {
    name: '',
    placement: '',
    receiptPrinter: NO_PRINTER,
    kitchenPrinter: NO_PRINTER,
    boletaSeries: `B${suffix}`,
    facturaSeries: `F${suffix}`,
    allowOfflineSales: true,
  };
};

export const useNewTerminalForm = (locationId: string, nextIndex: number, onDone: () => void) => {
  const addTerminal = useAddTerminal(locationId);
  const [input, setInput] = useState(() => createEmptyTerminal(nextIndex));
  const updateField = <K extends keyof TerminalInput>(field: K, value: TerminalInput[K]) =>
    setInput((current) => ({ ...current, [field]: value }));
  const submit = () => addTerminal.mutate(input, { onSuccess: onDone });
  return { input, updateField, submit, addTerminal };
};
