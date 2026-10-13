import 'server-only';
import { TerminalStatus, type DashboardResponse } from '@noname/types';
import { createDashboardMock } from '../mocks/dashboardMock';
import { listAllTerminals } from './locationRepository';

export const getDashboard = (locationId?: string): DashboardResponse => ({
  ...createDashboardMock(),
  terminals: listAllTerminals()
    .filter((entry) => !locationId || entry.locationId === locationId)
    .map(({ terminal, locationName }) => ({
      id: terminal.id,
      name: terminal.name,
      locationName,
      status: terminal.status,
      statusLabel: terminal.status === TerminalStatus.Online ? 'En línea' : 'Sin conexión 1 h',
      printerLabel: terminal.printerLabel,
      paperLow: terminal.paperLow,
      salesToday: terminal.salesToday,
    })),
});
