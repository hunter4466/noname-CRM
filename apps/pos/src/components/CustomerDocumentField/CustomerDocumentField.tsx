import styles from './CustomerDocumentField.module.css';

export interface CustomerDocumentFieldProps {
  isFactura: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const CustomerDocumentField = ({ isFactura, value, onChange }: CustomerDocumentFieldProps) => {
  const label = isFactura ? 'RUC del cliente' : 'DNI del cliente (opcional)';
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>{label}</h3>
      <div className={styles.row}>
        <input
          className={styles.input}
          aria-label={label}
          inputMode="numeric"
          placeholder={isFactura ? '20XXXXXXXXX' : '8 dígitos'}
          maxLength={isFactura ? 11 : 8}
          value={value}
          onChange={(event) => onChange(event.target.value.replace(/\D/g, ''))}
        />
        <button type="button" className={styles.lookup} disabled title="Próximamente">
          Buscar
        </button>
      </div>
      <span className="hint">
        {isFactura
          ? 'La factura necesita un RUC activo; la razón social se completa desde SUNAT.'
          : 'Obligatorio en boletas mayores a S/ 700.'}
      </span>
    </section>
  );
};
