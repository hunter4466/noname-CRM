import styles from './CustomerDocumentField.module.css';

export interface CustomerDocumentFieldProps {
  isFactura: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const CustomerDocumentField = ({ isFactura, value, onChange }: CustomerDocumentFieldProps) => {
  const label = isFactura ? 'Customer RUC' : 'Customer DNI (optional)';
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>{label}</h3>
      <div className={styles.row}>
        <input
          className={styles.input}
          aria-label={label}
          inputMode="numeric"
          placeholder={isFactura ? '20XXXXXXXXX' : '8 digits'}
          maxLength={isFactura ? 11 : 8}
          value={value}
          onChange={(event) => onChange(event.target.value.replace(/\D/g, ''))}
        />
        <button type="button" className={styles.lookup} disabled title="Coming soon">
          Look up
        </button>
      </div>
      <span className="hint">
        {isFactura ? 'A factura needs an active RUC; the business name is filled from SUNAT.' : 'Required for boletas over S/ 700.'}
      </span>
    </section>
  );
};
