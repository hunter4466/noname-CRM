import type { TerminalInfo } from '@noname/types';

export interface TerminalRecord extends TerminalInfo {
  boletaSeries: string;
  facturaSeries: string;
  notaVentaSeries: string;
}

export const createTerminalsMock = (): TerminalRecord[] => [
  {
    deviceCode: 'POS-MIR-01',
    terminalName: 'Counter POS',
    locationName: 'Miraflores',
    isOnline: true,
    syncedLabel: 'Online · synced 1 min ago',
    sunatConnected: true,
    printerLabel: 'Epson TM-T20III',
    printerPaperLow: true,
    lastCloseLabel: 'Last close: S/ 200.00 · Counter POS · yesterday 23:08',
    suggestedOpeningCash: 200,
    boletaSeries: 'B001',
    facturaSeries: 'F001',
    notaVentaSeries: 'NV01',
  },
  {
    deviceCode: 'POS-SIS-01',
    terminalName: 'Counter POS',
    locationName: 'San Isidro',
    isOnline: true,
    syncedLabel: 'Online · synced just now',
    sunatConnected: true,
    printerLabel: 'Star TSP143',
    printerPaperLow: false,
    lastCloseLabel: 'Last close: S/ 150.00 · Counter POS · yesterday 22:41',
    suggestedOpeningCash: 150,
    boletaSeries: 'B003',
    facturaSeries: 'F003',
    notaVentaSeries: 'NV03',
  },
];
