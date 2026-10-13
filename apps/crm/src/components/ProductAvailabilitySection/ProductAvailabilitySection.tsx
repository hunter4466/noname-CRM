import type { ProductLocationSetting } from '@noname/types';
import { Card, CardHeader, Select, Switch, TextInput } from '@noname/ui';
import { Table } from '../shared/Table/Table';
import { TableCell } from '../shared/TableCell/TableCell';
import styles from './ProductAvailabilitySection.module.css';

export interface ProductAvailabilitySectionProps {
  settings: ProductLocationSetting[];
  basePrice: number;
  onChange: (locationId: string, changes: Partial<ProductLocationSetting>) => void;
}

export const ProductAvailabilitySection = ({ settings, basePrice, onChange }: ProductAvailabilitySectionProps) => (
  <Card>
    <CardHeader
      title="Disponibilidad y envío a cocina"
      subtitle="Desactiva un producto por local, cambia su precio y elige qué impresora recibe la comanda."
    />
    <Table columns={[{ label: 'Local' }, { label: 'Disponible' }, { label: 'Precio especial' }, { label: 'Imprime en' }]}>
      {settings.map((setting) => (
        <tr key={setting.locationId}>
          <TableCell strong>{setting.locationName}</TableCell>
          <TableCell>
            <Switch
              checked={setting.isAvailable}
              ariaLabel={`Disponible en ${setting.locationName}`}
              onChange={(isAvailable) => onChange(setting.locationId, { isAvailable })}
            />
          </TableCell>
          <TableCell>
            <div className={styles.price}>
              <TextInput
                prefix="S/"
                monospace
                type="number"
                min={0}
                step="0.10"
                aria-label={`${setting.locationName} price`}
                placeholder={basePrice.toFixed(2)}
                value={setting.priceOverride ?? ''}
                onChange={(event) =>
                  onChange(setting.locationId, { priceOverride: event.target.value === '' ? null : Number(event.target.value) })
                }
              />
            </div>
          </TableCell>
          <TableCell muted>
            {setting.isAvailable && setting.printerOptions.length > 0 ? (
              <Select
                aria-label={`${setting.locationName} printer`}
                options={setting.printerOptions.map((printer) => ({ value: printer, label: printer }))}
                value={setting.routedPrinterName ?? setting.printerOptions[0]}
                onChange={(event) => onChange(setting.locationId, { routedPrinterName: event.target.value })}
              />
            ) : (
              '—'
            )}
          </TableCell>
        </tr>
      ))}
    </Table>
  </Card>
);
