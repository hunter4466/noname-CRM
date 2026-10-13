import 'server-only';
import type { DocumentSeries, SunatConfig, TestConnectionResponse } from '@noname/types';
import { getMockSlice } from '../mocks/mockStore';
import { createDocumentSeriesMock, createSunatConfigMock } from '../mocks/sunatMock';

const sunatConfig = () => getMockSlice('sunatConfig', createSunatConfigMock);
const documentSeries = () => getMockSlice('documentSeries', createDocumentSeriesMock);

export const getSunatConfig = (): SunatConfig => sunatConfig();

export const updateSunatConfig = (input: Partial<SunatConfig>): SunatConfig => Object.assign(sunatConfig(), input);

export const listDocumentSeries = (): DocumentSeries[] => documentSeries();

// Mock: a real implementation calls the OSE provider / SUNAT beta web service.
export const testSunatConnection = (): TestConnectionResponse => {
  const config = sunatConfig();
  if (!config.ruc) {
    return { ok: false, message: 'Add the issuer RUC before testing the connection.' };
  }
  return { ok: true, message: `Connected to SUNAT ${config.environment.toLowerCase()} · test boleta accepted with CDR.` };
};
