import type { TopProduct } from '@noname/types';
import { formatMoney } from '@noname/domain';
import { Card, CardHeader } from '@noname/ui';
import Link from 'next/link';
import { Route } from '@/types/Route';
import styles from './TopProductsCard.module.css';

export interface TopProductsCardProps {
  products: TopProduct[];
}

export const TopProductsCard = ({ products }: TopProductsCardProps) => (
  <Card>
    <CardHeader
      title="Productos más vendidos"
      actions={
        <Link href={Route.Products} className={styles.link}>
          Todos los productos
        </Link>
      }
    />
    {products.map((product) => (
      <div key={product.rank} className={styles.row}>
        <span className={styles.rank}>{product.rank}</span>
        <span className={styles.name}>{product.name}</span>
        <span className="hint">{product.soldLabel}</span>
        <span className={styles.revenue}>{formatMoney(product.revenue)}</span>
      </div>
    ))}
  </Card>
);
