import 'server-only';
import { getMockSlice } from '../mocks/mockStore';
import { createTerminalsMock, type TerminalRecord } from '../mocks/terminalsMock';

const terminals = () => getMockSlice('terminals', createTerminalsMock);

export const findTerminal = (deviceCode: string): TerminalRecord | null =>
  terminals().find((terminal) => terminal.deviceCode === deviceCode) ?? null;
