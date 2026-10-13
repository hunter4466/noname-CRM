import type { ReactNode } from 'react';
import { BadgeTone } from '../../types/BadgeTone';
import styles from './Badge.module.css';

export interface BadgeProps {
  tone: BadgeTone;
  children: ReactNode;
}

export const Badge = ({ tone, children }: BadgeProps) => <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
