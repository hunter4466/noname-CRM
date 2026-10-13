import 'server-only';
import {
  TerminalStatus,
  type Location,
  type LocationInput,
  type LocationsResponse,
  type Terminal,
  type TerminalInput,
} from '@noname/types';
import { createLocationsMock } from '../mocks/locationsMock';
import { createMockId, getMockSlice } from '../mocks/mockStore';

const locations = () => getMockSlice('locations', createLocationsMock);

export const listLocations = (search?: string): LocationsResponse => {
  const query = search?.trim().toLowerCase();
  const all = locations();
  const terminals = all.flatMap((location) => location.terminals);
  return {
    summary: {
      locationCount: all.length,
      terminalCount: terminals.length,
      onlineCount: terminals.filter((terminal) => terminal.status === TerminalStatus.Online).length,
      printerCount: all.reduce((sum, location) => sum + location.printerCount, 0),
    },
    items: all.filter(
      (location) => !query || location.name.toLowerCase().includes(query) || location.address.toLowerCase().includes(query),
    ),
  };
};

export const listAllTerminals = () =>
  locations().flatMap((location) =>
    location.terminals.map((terminal) => ({ terminal, locationName: location.name, locationId: location.id })),
  );

export const findLocation = (locationId: string): Location | null => locations().find((location) => location.id === locationId) ?? null;

export const createLocation = (input: LocationInput): Location => {
  const location: Location = { ...input, id: createMockId('loc'), terminals: [], printerCount: 0, printerOptions: [] };
  locations().push(location);
  return location;
};

export const updateLocation = (locationId: string, input: Partial<LocationInput>): Location | null => {
  const location = findLocation(locationId);
  if (!location) {
    return null;
  }
  Object.assign(location, input);
  return location;
};

export const addTerminal = (locationId: string, input: TerminalInput): Terminal | null => {
  const location = findLocation(locationId);
  if (!location) {
    return null;
  }
  const prefix = location.name.slice(0, 3).toUpperCase();
  const terminal: Terminal = {
    id: createMockId('trm'),
    name: input.name,
    placement: input.placement,
    deviceCode: `POS-${prefix}-${String(location.terminals.length + 1).padStart(2, '0')}`,
    boletaSeries: input.boletaSeries,
    facturaSeries: input.facturaSeries,
    printerLabel: input.receiptPrinter || '—',
    status: TerminalStatus.Offline,
    paperLow: false,
    salesToday: 0,
  };
  location.terminals.push(terminal);
  return terminal;
};
