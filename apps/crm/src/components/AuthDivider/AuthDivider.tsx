import styles from './AuthDivider.module.css';

export interface AuthDividerProps {
  label: string;
}

export const AuthDivider = ({ label }: AuthDividerProps) => <div className={styles.divider}>{label}</div>;
