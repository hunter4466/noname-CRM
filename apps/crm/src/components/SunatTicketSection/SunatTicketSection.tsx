import { Button, Card, CardBody, Field, Pill, SegmentedControl, TextArea, ToggleRow } from '@noname/ui';
import { PaperWidth } from '@/types/PaperWidth';
import type { SunatSectionProps } from '@/types/SunatSectionProps';
import { PrintedTicketPreview } from '../PrintedTicketPreview/PrintedTicketPreview';
import { SunatSectionHeader } from '../SunatSectionHeader/SunatSectionHeader';
import styles from './SunatTicketSection.module.css';

const paperOptions = [
  { value: PaperWidth.Wide, label: '80 mm' },
  { value: PaperWidth.Narrow, label: '58 mm' },
];

export const SunatTicketSection = ({ draft, updateField }: SunatSectionProps) => (
  <Card>
    <SunatSectionHeader
      number={7}
      title="Printed ticket (representación impresa)"
      actions={
        <SegmentedControl
          ariaLabel="Paper width"
          options={paperOptions}
          value={String(draft.ticketPaperWidthMm) as PaperWidth}
          onChange={(width) => updateField('ticketPaperWidthMm', Number(width))}
        />
      }
    />
    <CardBody>
      <div className={styles.layout}>
        <div className={styles.settings}>
          <ToggleRow
            label="Print logo"
            hint="Monochrome PNG, max 384 px wide"
            checked={draft.printLogo}
            onChange={(value) => updateField('printLogo', value)}
          />
          <ToggleRow
            label="QR code"
            hint="Required on electronic comprobantes"
            checked
            onChange={() => undefined}
            trailing={<Pill>Always on</Pill>}
          />
          <ToggleRow
            label="Print kitchen comanda on payment"
            hint="Routed per product to its station printer"
            checked={draft.printKitchenTicket}
            onChange={(value) => updateField('printKitchenTicket', value)}
          />
          <Field label="Footer text" htmlFor="ticketFooter">
            <TextArea id="ticketFooter" value={draft.ticketFooter} onChange={(event) => updateField('ticketFooter', event.target.value)} />
          </Field>
          <Button disabled title="Needs a paired printer">
            Print test ticket
          </Button>
        </div>
        <PrintedTicketPreview config={draft} />
      </div>
    </CardBody>
  </Card>
);
