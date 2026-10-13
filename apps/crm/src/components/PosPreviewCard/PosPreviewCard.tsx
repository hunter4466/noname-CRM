import { Card, CardBody, CardHeader, Pill, PillTone } from '@noname/ui';
import type { PosPreviewModel } from '@/types/PosPreview';
import { PreviewOptionGroup } from '../PreviewOptionGroup/PreviewOptionGroup';
import { TicketPreview } from '../TicketPreview/TicketPreview';
import styles from './PosPreviewCard.module.css';

export interface PosPreviewCardProps {
  preview: PosPreviewModel;
  subtitle: string;
  ticketTitle: string;
  ticketNote?: string;
}

export const PosPreviewCard = ({ preview, subtitle, ticketTitle, ticketNote }: PosPreviewCardProps) => (
  <Card ariaLabel="POS preview">
    <CardHeader title="POS preview" subtitle={subtitle} actions={<Pill tone={PillTone.Info}>Live</Pill>} />
    <CardBody>
      <div className={styles.device}>
        <div className={styles.heading}>
          <strong className={styles.title}>{preview.title}</strong>
          <span className="mono">{preview.basePrice}</span>
        </div>
        {preview.groups.map((group) => (
          <PreviewOptionGroup key={group.id} group={group} />
        ))}
        {preview.missingText && <div className={styles.missing}>{preview.missingText}</div>}
        <button type="button" className={styles.addButton} disabled={preview.missingText !== null}>
          <span>Add to order</span>
          <span className="mono">{preview.total}</span>
        </button>
      </div>
      <TicketPreview title={ticketTitle} lines={preview.ticketLines} total={preview.ticketTotal} note={ticketNote} />
    </CardBody>
  </Card>
);
