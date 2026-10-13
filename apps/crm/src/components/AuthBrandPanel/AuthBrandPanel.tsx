import { IconMapPin, IconReceipt, IconTerminal } from '@noname/ui/icons';
import { BrandLogo } from '../BrandLogo/BrandLogo';
import styles from './AuthBrandPanel.module.css';

const features = [
  { icon: IconTerminal, title: 'POS para web y tablet', detail: 'La misma caja en todos los equipos, funciona sin conexión.' },
  { icon: IconReceipt, title: 'Boletas y facturas a SUNAT', detail: 'Emitidas, firmadas y enviadas al cobrar.' },
  { icon: IconMapPin, title: 'Todos los locales en una vista', detail: 'Cartas, cajas e impresoras por local.' },
];

export const AuthBrandPanel = () => (
  <aside className={styles.panel}>
    <BrandLogo large />
    <div className={styles.middle}>
      <h2 className={styles.headline}>Gestiona todas tus cajas desde un solo lugar.</h2>
      <p className={styles.sub}>Punto de venta, facturación electrónica SUNAT y todos tus locales, gestionados desde un solo panel.</p>
      <div className={styles.features}>
        {features.map(({ icon: Icon, title, detail }) => (
          <div key={title} className={styles.feature}>
            <span className={styles.featureIcon}>
              <Icon />
            </span>
            <div>
              <b className={styles.featureTitle}>{title}</b>
              <span className={styles.featureDetail}>{detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className={styles.footer}>© 2026 CRM · Lima, Perú</div>
  </aside>
);
