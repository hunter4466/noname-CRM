import type { ButtonHTMLAttributes } from 'react';
import { classNames } from '../../classNames';
import { ButtonSize } from '../../types/ButtonSize';
import { ButtonVariant } from '../../types/ButtonVariant';
import styles from './Button.module.css';

interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

export const getButtonClassName = ({
  variant = ButtonVariant.Secondary,
  size = ButtonSize.Medium,
  fullWidth = false,
  className,
}: ButtonClassOptions) => classNames(styles.button, styles[variant], styles[size], fullWidth && styles.fullWidth, className);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonClassOptions {}

export const Button = ({ variant, size, fullWidth, className, type = 'button', ...props }: ButtonProps) => (
  <button type={type} className={getButtonClassName({ variant, size, fullWidth, className })} {...props} />
);
