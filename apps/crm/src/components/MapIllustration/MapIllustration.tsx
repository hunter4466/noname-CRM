import { classNames } from '@noname/ui';
import styles from './MapIllustration.module.css';

export interface MapIllustrationProps {
  label: string;
  large?: boolean;
}

/** Static stand-in until the Google Maps JS widget is wired. */
export const MapIllustration = ({ label, large = false }: MapIllustrationProps) => (
  <svg
    className={classNames(styles.map, large && styles.large)}
    viewBox="0 0 300 140"
    preserveAspectRatio="xMidYMid slice"
    role="img"
    aria-label={label}
  >
    <rect className={styles.land} width="300" height="140" />
    <rect className={styles.sea} width="54" height="140" />
    <rect className={styles.park} x="138" y="25" width="54" height="42" rx="4" />
    <rect className={styles.block} x="72" y="14" width="48" height="42" rx="3" />
    <rect className={styles.block} x="210" y="84" width="66" height="40" rx="3" />
    <rect className={styles.road} x="54" y="73" width="246" height="9" />
    <rect className={styles.road} x="126" y="0" width="7" height="140" />
    <rect className={styles.road} x="198" y="0" width="5" height="140" />
    <g className={styles.pin} transform="translate(132 58)">
      <path d="M0 22s-10-8.9-10-15.7a10 10 0 0 1 20 0C10 13.1 0 22 0 22z" />
      <circle className={styles.pinDot} cx="0" cy="6" r="3.5" />
    </g>
  </svg>
);
