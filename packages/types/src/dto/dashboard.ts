import type { SunatDocumentStatus } from '../enums/SunatDocumentStatus';
import type { TerminalStatus } from '../enums/TerminalStatus';

export interface SetupStep {
  label: string;
  isDone: boolean;
}

export interface Kpi {
  label: string;
  value: string;
  delta: string | null;
  deltaIsPositive: boolean;
  hint: string;
}

export interface HourlySale {
  hour: number;
  amount: number;
  isForecast: boolean;
}

export interface SunatAlert {
  status: SunatDocumentStatus;
  title: string;
  detail: string;
  isMonospace: boolean;
}

export interface SunatSnapshot {
  accepted: number;
  pending: number;
  rejected: number;
  alerts: SunatAlert[];
}

export interface TerminalSnapshot {
  id: string;
  name: string;
  locationName: string;
  status: TerminalStatus;
  statusLabel: string;
  printerLabel: string;
  paperLow: boolean;
  salesToday: number;
}

export interface TopProduct {
  rank: number;
  name: string;
  soldLabel: string;
  revenue: number;
}

export interface DashboardResponse {
  dateLabel: string;
  setupSteps: SetupStep[];
  kpis: Kpi[];
  hourlySales: HourlySale[];
  peakLabel: string;
  sunat: SunatSnapshot;
  terminals: TerminalSnapshot[];
  topProducts: TopProduct[];
}
