import { DocumentType, SunatConnectionMode, SunatEnvironment } from '@noname/types';
import { z } from 'zod';

export const sunatConfigInputSchema = z
  .object({
    ruc: z.string().regex(/^(\d{11})?$/, 'El RUC tiene 11 dígitos'),
    legalName: z.string(),
    commercialName: z.string(),
    fiscalAddress: z.string(),
    fiscalUbigeo: z.string().regex(/^(\d{6})?$/, 'El ubigeo tiene 6 dígitos'),
    environment: z.enum(SunatEnvironment),
    connectionMode: z.enum(SunatConnectionMode),
    providerName: z.string(),
    providerEndpoint: z.string(),
    solUser: z.string(),
    igvRate: z.number().min(0).max(100),
    icbperAmount: z.number().min(0),
    defaultDocumentType: z.enum(DocumentType),
    pricesIncludeIgv: z.boolean(),
    requireDniOverAmount: z.boolean(),
    sendBoletasInSummary: z.boolean(),
    dailySummaryTime: z.string().regex(/^\d{2}:\d{2}$/, 'Usa HH:MM'),
    offlineContingency: z.boolean(),
    emailDocuments: z.boolean(),
    alertOnRejection: z.boolean(),
    ticketPaperWidthMm: z.union([z.literal(58), z.literal(80)]),
    printLogo: z.boolean(),
    printKitchenTicket: z.boolean(),
    ticketFooter: z.string(),
  })
  .partial();
