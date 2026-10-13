import styles from './FormError.module.css';

export interface FormErrorProps {
  error: Error | null;
}

export const FormError = ({ error }: FormErrorProps) =>
  error ? (
    <div className={styles.error} role="alert">
      {error.message}
    </div>
  ) : null;
