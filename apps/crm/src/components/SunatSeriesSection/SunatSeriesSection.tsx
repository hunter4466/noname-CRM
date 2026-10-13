'use client';

import { Button, ButtonSize, Card, Pill, PillTone } from '@noname/ui';
import { useDocumentSeries } from '@/hooks/useDocumentSeries';
import { documentTypeLabel } from '@/lib/documentTypeLabels';
import { QueryState } from '../shared/QueryState/QueryState';
import { Table } from '../shared/Table/Table';
import { TableCell } from '../shared/TableCell/TableCell';
import { TableFooter } from '../shared/TableFooter/TableFooter';
import { SunatSectionHeader } from '../SunatSectionHeader/SunatSectionHeader';

export const SunatSeriesSection = () => {
  const series = useDocumentSeries();
  return (
    <Card>
      <SunatSectionHeader
        number={4}
        title="Series y numeración"
        subtitle="Una serie por POS, para que dos cajas nunca emitan el mismo número, incluso sin conexión."
        actions={
          <Button size={ButtonSize.Small} disabled title="Las series se crean con cada POS">
            Agregar serie
          </Button>
        }
      />
      <QueryState data={series.data} isLoading={series.isLoading} error={series.error}>
        {(items) => (
          <Table
            columns={[
              { label: 'Comprobante' },
              { label: 'Serie' },
              { label: 'Local · POS' },
              { label: 'Siguiente número' },
              { label: 'Estado' },
            ]}
          >
            {items.map((item) => (
              <tr key={item.id}>
                <TableCell>{documentTypeLabel[item.documentType]}</TableCell>
                <TableCell>
                  <span className="mono">{item.series}</span>
                </TableCell>
                <TableCell muted>{item.scopeLabel}</TableCell>
                <TableCell>
                  <span className="mono">{String(item.nextNumber).padStart(8, '0')}</span>
                </TableCell>
                <TableCell>
                  <Pill tone={item.isActive ? PillTone.Ok : PillTone.Neutral}>{item.isActive ? 'Activo' : 'Inactivo'}</Pill>
                </TableCell>
              </tr>
            ))}
          </Table>
        )}
      </QueryState>
      <TableFooter summary="Las facturas empiezan con F y las boletas con B; 4 caracteres. Las notas de crédito usan la misma letra que el comprobante que corrigen." />
    </Card>
  );
};
