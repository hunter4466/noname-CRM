import type { TextareaHTMLAttributes } from 'react';
import { classNames } from '../../classNames';
import styles from './TextArea.module.css';

export const TextArea = ({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className={classNames(styles.textArea, className)} {...props} />
);
