'use client';

import type { Location } from '@noname/types';
import { Button, ButtonSize, ButtonVariant, Card, CardHeader } from '@noname/ui';
import { useState } from 'react';
import { NewTerminalForm } from '../NewTerminalForm/NewTerminalForm';
import { TerminalRow } from '../TerminalRow/TerminalRow';

export interface LocationTerminalsSectionProps {
  location: Location;
}

export const LocationTerminalsSection = ({ location }: LocationTerminalsSectionProps) => {
  const [isAdding, setIsAdding] = useState(false);
  return (
    <Card>
      <CardHeader
        title="Puntos de venta"
        subtitle="Cada POS es un equipo. Ponle un nombre e indica dónde está, para que el personal sepa cuál es cuál."
        actions={
          <Button size={ButtonSize.Small} variant={ButtonVariant.Primary} disabled={isAdding} onClick={() => setIsAdding(true)}>
            Agregar POS
          </Button>
        }
      />
      {location.terminals.map((terminal) => (
        <TerminalRow key={terminal.id} terminal={terminal} />
      ))}
      {isAdding && (
        <NewTerminalForm
          locationId={location.id}
          printerOptions={location.printerOptions}
          nextIndex={location.terminals.length + 1}
          onClose={() => setIsAdding(false)}
        />
      )}
    </Card>
  );
};
