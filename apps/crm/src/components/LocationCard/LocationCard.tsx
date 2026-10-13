import type { Location } from '@noname/types';
import { ButtonSize, Card, Pill } from '@noname/ui';
import Link from 'next/link';
import { locationStatus } from '@/lib/locationStatus';
import { pluralize } from '@/lib/pluralize';
import { locationRoute } from '@/types/Route';
import { LocationTerminalLine } from '../LocationTerminalLine/LocationTerminalLine';
import { MapIllustration } from '../MapIllustration/MapIllustration';
import { ButtonLink } from '../shared/ButtonLink/ButtonLink';
import styles from './LocationCard.module.css';

export interface LocationCardProps {
  location: Location;
}

export const LocationCard = ({ location }: LocationCardProps) => {
  const status = locationStatus(location);
  const meta = [
    { label: 'Est. code', value: location.establishmentCode },
    { label: 'Ubigeo', value: location.ubigeo },
    { label: 'Coords', value: `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` },
  ];
  return (
    <Card className={styles.card}>
      <MapIllustration label={`Map preview, ${location.name}`} />
      <div className={styles.body}>
        <div className={styles.title}>
          <Link href={locationRoute(location.id)} className={styles.name}>
            {location.name}
          </Link>
          <Pill tone={status.tone} withDot>
            {status.label}
          </Pill>
        </div>
        <div className="hint">{`${location.address}, ${location.district}, ${location.department}`}</div>
        <div className={styles.meta}>
          {meta.map((item) => (
            <div key={item.label}>
              <div className={styles.metaLabel}>{item.label}</div>
              <div className="mono">{item.value}</div>
            </div>
          ))}
        </div>
        {location.terminals.map((terminal) => (
          <LocationTerminalLine key={terminal.id} terminal={terminal} />
        ))}
      </div>
      <div className={styles.footer}>
        <span className="hint">{`${pluralize(location.terminals.length, 'POS', 'POS')} · ${pluralize(location.printerCount, 'printer')}`}</span>
        <ButtonLink href={locationRoute(location.id)} size={ButtonSize.Small}>
          Manage
        </ButtonLink>
      </div>
    </Card>
  );
};
