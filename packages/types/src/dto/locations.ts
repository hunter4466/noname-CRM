import type { TerminalStatus } from '../enums/TerminalStatus';

export interface Terminal {
  id: string;
  name: string;
  placement: string;
  deviceCode: string;
  boletaSeries: string;
  facturaSeries: string;
  printerLabel: string;
  status: TerminalStatus;
  paperLow: boolean;
  salesToday: number;
}

export interface Location {
  id: string;
  name: string;
  receiptName: string;
  phone: string;
  openingHours: string;
  address: string;
  addressReference: string;
  department: string;
  province: string;
  district: string;
  ubigeo: string;
  establishmentCode: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  printerCount: number;
  printerOptions: string[];
  terminals: Terminal[];
}

export type LocationInput = Omit<Location, 'id' | 'terminals' | 'printerCount' | 'printerOptions'>;

export interface TerminalInput {
  name: string;
  placement: string;
  receiptPrinter: string;
  kitchenPrinter: string;
  boletaSeries: string;
  facturaSeries: string;
  allowOfflineSales: boolean;
}

export interface LocationsSummary {
  locationCount: number;
  terminalCount: number;
  onlineCount: number;
  printerCount: number;
}

export interface LocationsResponse {
  summary: LocationsSummary;
  items: Location[];
}
