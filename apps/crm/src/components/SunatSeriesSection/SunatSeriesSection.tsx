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
        title="Series & numbering"
        subtitle="One series per POS, so two terminals never issue the same number — even offline."
        actions={
          <Button size={ButtonSize.Small} disabled title="Series are created with each POS">
            Add series
          </Button>
        }
      />
      <QueryState data={series.data} isLoading={series.isLoading} error={series.error}>
        {(items) => (
          <Table
            columns={[
              { label: 'Document' },
              { label: 'Series' },
              { label: 'Location · POS' },
              { label: 'Next number' },
              { label: 'Status' },
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
                  <Pill tone={item.isActive ? PillTone.Ok : PillTone.Neutral}>{item.isActive ? 'Active' : 'Inactive'}</Pill>
                </TableCell>
              </tr>
            ))}
          </Table>
        )}
      </QueryState>
      <TableFooter summary="Facturas start with F, boletas with B; 4 characters. Credit notes use the same letter as the document they correct." />
    </Card>
  );
};
