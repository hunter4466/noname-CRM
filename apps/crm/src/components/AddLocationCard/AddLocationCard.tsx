import { IconPlus } from '@noname/ui/icons';
import Link from 'next/link';
import { locationRoute, NEW_ENTITY_ID } from '@/types/Route';
import styles from './AddLocationCard.module.css';

export const AddLocationCard = () => (
  <Link href={locationRoute(NEW_ENTITY_ID)} className={styles.card}>
    <span className={styles.icon}>
      <IconPlus />
    </span>
    <span className={styles.title}>Agregar un local</span>
    <span className="hint">Busca la dirección, coloca el pin y luego agrega sus puntos de venta.</span>
  </Link>
);
