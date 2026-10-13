import type { Paginated, ProductSummary } from '@noname/types';
import { Button, ButtonSize } from '@noname/ui';
import { ProductRow } from '../ProductRow/ProductRow';
import { Table } from '../shared/Table/Table';
import { TableFooter } from '../shared/TableFooter/TableFooter';
import styles from './ProductsTable.module.css';

const columns = [
  { label: <input type="checkbox" aria-label="Seleccionar todo" /> },
  { label: 'Producto' },
  { label: 'Categoría' },
  { label: 'Precio', alignEnd: true },
  { label: 'Grupos de modificadores', wide: true },
  { label: 'Locales' },
  { label: 'Estado' },
];

export interface ProductsTableProps {
  page: Paginated<ProductSummary>;
  onPageChange: (page: number) => void;
}

export const ProductsTable = ({ page, onPageChange }: ProductsTableProps) => {
  const firstIndex = page.total === 0 ? 0 : (page.page - 1) * page.pageSize + 1;
  const lastIndex = Math.min(page.total, page.page * page.pageSize);
  return (
    <>
      <Table columns={columns}>
        {page.items.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </Table>
      {page.items.length === 0 && <div className={styles.empty}>Ningún producto coincide con estos filtros.</div>}
      <TableFooter
        summary={`Mostrando ${firstIndex}–${lastIndex} de ${page.total} · precios con IGV`}
        actions={
          <>
            <Button size={ButtonSize.Small} disabled={page.page <= 1} onClick={() => onPageChange(page.page - 1)}>
              Anterior
            </Button>
            <Button size={ButtonSize.Small} disabled={lastIndex >= page.total} onClick={() => onPageChange(page.page + 1)}>
              Siguiente
            </Button>
          </>
        }
      />
    </>
  );
};
