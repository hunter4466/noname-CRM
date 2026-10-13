import { getButtonClassName, type ButtonSize, type ButtonVariant } from '@noname/ui';
import Link from 'next/link';
import type { ReactNode } from 'react';

export interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  ariaLabel?: string;
  children: ReactNode;
}

export const ButtonLink = ({ href, variant, size, fullWidth, ariaLabel, children }: ButtonLinkProps) => (
  <Link href={href} className={getButtonClassName({ variant, size, fullWidth })} aria-label={ariaLabel}>
    {children}
  </Link>
);
