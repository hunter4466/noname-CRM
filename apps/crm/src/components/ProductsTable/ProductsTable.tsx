import type { Paginated, ProductSummary } from '@noname/types';
import { Button, ButtonSize } from '@noname/ui';
import { ProductRow } from '../ProductRow/ProductRow';
import { Table } from '../shared/Table/Table';
import { TableFooter } from '../shared/TableFooter/TableFooter';
import styles from './ProductsTable.module.css';

const columns = [
  { label: <input type="checkbox" aria-label="Select all" /> },
  { label: 'Product' },
  { label: 'Category' },
  { label: 'Price', alignEnd: true },
  { label: 'Modifier groups', wide: true },
  { label: 'Locations' },
  { label: 'Status' },
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
      {page.items.length === 0 && <div className={styles.empty}>No products match these filters.</div>}
      <TableFooter
        summary={`Showing ${firstIndex}–${lastIndex} of ${page.total} · prices include IGV`}
        actions={
          <>
            <Button size={ButtonSize.Small} disabled={page.page <= 1} onClick={() => onPageChange(page.page - 1)}>
              Previous
            </Button>
            <Button size={ButtonSize.Small} disabled={lastIndex >= page.total} onClick={() => onPageChange(page.page + 1)}>
              Next
            </Button>
          </>
        }
      />
    </>
  );
};
