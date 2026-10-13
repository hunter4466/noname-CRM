import type { DocumentType } from '../enums/DocumentType';
import type { SunatConnectionMode } from '../enums/SunatConnectionMode';
import type { SunatEnvironment } from '../enums/SunatEnvironment';

export interface SunatConfig {
  ruc: string;
  legalName: string;
  commercialName: string;
  fiscalAddress: string;
  fiscalUbigeo: string;
  environment: SunatEnvironment;
  connectionMode: SunatConnectionMode;
  providerName: string;
  providerEndpoint: string;
  hasProviderToken: boolean;
  solUser: string;
  hasCertificate: boolean;
  certificateExpiresAt: string | null;
  igvRate: number;
  icbperAmount: number;
  defaultDocumentType: DocumentType;
  pricesIncludeIgv: boolean;
  requireDniOverAmount: boolean;
  sendBoletasInSummary: boolean;
  dailySummaryTime: string;
  offlineContingency: boolean;
  emailDocuments: boolean;
  alertOnRejection: boolean;
  ticketPaperWidthMm: number;
  printLogo: boolean;
  printKitchenTicket: boolean;
  ticketFooter: string;
  lastTestLabel: string;
}

export interface DocumentSeries {
  id: string;
  documentType: DocumentType;
  series: string;
  scopeLabel: string;
  nextNumber: number;
  isActive: boolean;
}

export interface TestConnectionResponse {
  ok: boolean;
  message: string;
}
