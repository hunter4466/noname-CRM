'use client';

import { Button, ButtonSize, ButtonVariant, Field, TextInput } from '@noname/ui';
import { IconArrowRight } from '@noname/ui/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useOpenShift } from '@/hooks/useOpenShift';
import { useTerminal } from '@/hooks/useTerminal';
import { Route } from '@/types/Route';
import styles from './OpenShiftCard.module.css';

export interface OpenShiftCardProps {
  staffName: string;
  onSwitchUser: () => void;
}

export const OpenShiftCard = ({ staffName, onSwitchUser }: OpenShiftCardProps) => {
  const router = useRouter();
  const openShift = useOpenShift();
  const { data: terminal } = useTerminal();
  const [openingCash, setOpeningCash] = useState(() => (terminal?.suggestedOpeningCash ?? 200).toFixed(2));
  const start = () => openShift.mutate({ openingCash: Number(openingCash) }, { onSuccess: () => router.replace(Route.Register) });
  return (
    <>
      <div>
        <h1 className={styles.title}>Hola {staffName}, abre tu turno</h1>
        <div className="hint">Cuenta el efectivo de la gaveta antes de la primera venta</div>
      </div>
      <div className={styles.card}>
        <Field label="Efectivo inicial" htmlFor="openingCash" hint={terminal?.lastCloseLabel}>
          <TextInput
            id="openingCash"
            large
            prefix="S/"
            monospace
            type="number"
            min={0}
            step="0.10"
            value={openingCash}
            onChange={(event) => setOpeningCash(event.target.value)}
          />
        </Field>
        {openShift.error && <div className={styles.error}>{openShift.error.message}</div>}
        <Button variant={ButtonVariant.Primary} size={ButtonSize.Large} fullWidth disabled={openShift.isPending} onClick={start}>
          Abrir turno y caja
          <IconArrowRight />
        </Button>
      </div>
      <button type="button" className={styles.switch} onClick={onSwitchUser}>
        ¿No eres tú? Cambiar de usuario
      </button>
    </>
  );
};
