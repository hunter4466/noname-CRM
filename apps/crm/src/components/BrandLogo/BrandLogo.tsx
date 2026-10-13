import { classNames } from '@noname/ui';
import { IconBrandMark } from '@noname/ui/icons';
import Link from 'next/link';
import { Route } from '@/types/Route';
import styles from './BrandLogo.module.css';

export interface BrandLogoProps {
  large?: boolean;
}

export const BrandLogo = ({ large = false }: BrandLogoProps) => (
  <Link href={Route.Dashboard} className={classNames(styles.brand, large && styles.large)}>
    <span className={styles.mark}>
      <IconBrandMark size={large ? 18 : 16} />
    </span>
    CRM
  </Link>
);
