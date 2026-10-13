import { IconMapPin, IconReceipt, IconTerminal } from '@noname/ui/icons';
import { BrandLogo } from '../BrandLogo/BrandLogo';
import styles from './AuthBrandPanel.module.css';

const features = [
  { icon: IconTerminal, title: 'POS for web and tablet', detail: 'Same register on every device, works offline.' },
  { icon: IconReceipt, title: 'Boletas and facturas to SUNAT', detail: 'Issued, signed and sent at checkout.' },
  { icon: IconMapPin, title: 'Every location, one view', detail: 'Menus, terminals and printers per store.' },
];

export const AuthBrandPanel = () => (
  <aside className={styles.panel}>
    <BrandLogo large />
    <div className={styles.middle}>
      <h2 className={styles.headline}>Run every counter from one place.</h2>
      <p className={styles.sub}>Point of sale, SUNAT e-invoicing and all your locations, managed from one dashboard.</p>
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
