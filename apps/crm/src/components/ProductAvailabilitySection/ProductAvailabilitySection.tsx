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
      title="Availability & kitchen routing"
      subtitle="Turn a product off per location, override its price, and choose which printer gets the comanda."
    />
    <Table columns={[{ label: 'Location' }, { label: 'Available' }, { label: 'Price override' }, { label: 'Prints to' }]}>
      {settings.map((setting) => (
        <tr key={setting.locationId}>
          <TableCell strong>{setting.locationName}</TableCell>
          <TableCell>
            <Switch
              checked={setting.isAvailable}
              ariaLabel={`Available in ${setting.locationName}`}
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
