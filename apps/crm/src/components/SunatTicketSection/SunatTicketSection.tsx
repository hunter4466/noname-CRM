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
      title="Ticket impreso (representación impresa)"
      actions={
        <SegmentedControl
          ariaLabel="Ancho del papel"
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
            label="Imprimir logo"
            hint="PNG monocromático, máx. 384 px de ancho"
            checked={draft.printLogo}
            onChange={(value) => updateField('printLogo', value)}
          />
          <ToggleRow
            label="Código QR"
            hint="Obligatorio en comprobantes electrónicos"
            checked
            onChange={() => undefined}
            trailing={<Pill>Siempre activo</Pill>}
          />
          <ToggleRow
            label="Imprimir la comanda al cobrar"
            hint="Se envía por producto a la impresora de su estación"
            checked={draft.printKitchenTicket}
            onChange={(value) => updateField('printKitchenTicket', value)}
          />
          <Field label="Texto al pie" htmlFor="ticketFooter">
            <TextArea id="ticketFooter" value={draft.ticketFooter} onChange={(event) => updateField('ticketFooter', event.target.value)} />
          </Field>
          <Button disabled title="Necesita una impresora vinculada">
            Imprimir ticket de prueba
          </Button>
        </div>
        <PrintedTicketPreview config={draft} />
      </div>
    </CardBody>
  </Card>
);
