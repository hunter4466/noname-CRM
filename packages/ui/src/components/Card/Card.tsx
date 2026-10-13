import type { ReactNode } from 'react';
import { classNames } from '../../classNames';
import styles from './Card.module.css';

export interface CardProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const Card = ({ children, className, ariaLabel }: CardProps) => (
  <section className={classNames(styles.card, className)} aria-label={ariaLabel}>
    {children}
  </section>
);
