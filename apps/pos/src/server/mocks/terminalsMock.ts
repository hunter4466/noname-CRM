import type { TerminalInfo } from '@noname/types';

export interface TerminalRecord extends TerminalInfo {
  boletaSeries: string;
  facturaSeries: string;
  notaVentaSeries: string;
}

export const createTerminalsMock = (): TerminalRecord[] => [
  {
    deviceCode: 'POS-MIR-01',
    terminalName: 'Caja mostrador',
    locationName: 'Miraflores',
    isOnline: true,
    syncedLabel: 'En línea · sincronizado hace 1 min',
    sunatConnected: true,
    printerLabel: 'Epson TM-T20III',
    printerPaperLow: true,
    lastCloseLabel: 'Último cierre: S/ 200.00 · Caja mostrador · ayer 23:08',
    suggestedOpeningCash: 200,
    boletaSeries: 'B001',
    facturaSeries: 'F001',
    notaVentaSeries: 'NV01',
  },
  {
    deviceCode: 'POS-SIS-01',
    terminalName: 'Caja mostrador',
    locationName: 'San Isidro',
    isOnline: true,
    syncedLabel: 'En línea · recién sincronizado',
    sunatConnected: true,
    printerLabel: 'Star TSP143',
    printerPaperLow: false,
    lastCloseLabel: 'Último cierre: S/ 150.00 · Caja mostrador · ayer 22:41',
    suggestedOpeningCash: 150,
    boletaSeries: 'B003',
    facturaSeries: 'F003',
    notaVentaSeries: 'NV03',
  },
];
