import type { ComboSummary } from '@noname/types';
import { formatMoney } from '@noname/domain';
import { ButtonSize, Chip, ChipList, Pill, PillTone } from '@noname/ui';
import { comboRoute } from '@/types/Route';
import { ComboSlotNumber } from '../ComboSlotNumber/ComboSlotNumber';
import { ButtonLink } from '../shared/ButtonLink/ButtonLink';
import { NameCell } from '../shared/NameCell/NameCell';
import { Table } from '../shared/Table/Table';
import { TableCell } from '../shared/TableCell/TableCell';
import { TableFooter } from '../shared/TableFooter/TableFooter';

const columns = [
  { label: 'Combo' },
  { label: 'Pasos' },
  { label: 'Precio', alignEnd: true },
  { label: 'El cliente ahorra' },
  { label: 'Disponible' },
  { label: 'Locales' },
  { label: 'Estado' },
  { label: <span className="visually-hidden">Acciones</span> },
];

export interface CombosTableProps {
  combos: ComboSummary[];
}

export const CombosTable = ({ combos }: CombosTableProps) => (
  <>
    <Table columns={columns}>
      {combos.map((combo) => (
        <tr key={combo.id}>
          <TableCell>
            <NameCell name={combo.name} code={combo.sku} href={comboRoute(combo.id)} tone={combo.tone} initials="CO" />
          </TableCell>
          <TableCell>
            <ChipList>
              {combo.slotNames.map((slotName, index) => (
                <Chip key={slotName}>
                  <ComboSlotNumber number={index + 1} small />
                  {slotName}
                </Chip>
              ))}
            </ChipList>
          </TableCell>
          <TableCell money>{formatMoney(combo.price)}</TableCell>
          <TableCell>
            <Pill tone={PillTone.Ok}>{`${formatMoney(combo.savings)} · ${combo.savingsPercent}%`}</Pill>
          </TableCell>
          <TableCell muted>{combo.availabilityLabel}</TableCell>
          <TableCell muted>{combo.locationsLabel}</TableCell>
          <TableCell>
            <Pill tone={combo.isActive ? PillTone.Ok : PillTone.Neutral} withDot>
              {combo.isActive ? 'Activo' : 'Inactivo'}
            </Pill>
          </TableCell>
          <TableCell alignEnd>
            <ButtonLink href={comboRoute(combo.id)} size={ButtonSize.Small} ariaLabel={`Editar ${combo.name}`}>
              Editar
            </ButtonLink>
          </TableCell>
        </tr>
      ))}
    </Table>
    <TableFooter summary={`${combos.length} combos · el ahorro se compara con los ítems predeterminados a su precio regular`} />
  </>
);
