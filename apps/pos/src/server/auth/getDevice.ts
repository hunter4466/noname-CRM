import 'server-only';
import { cookies } from 'next/headers';
import type { TerminalRecord } from '../mocks/terminalsMock';
import { findTerminal } from '../repositories/terminalRepository';
import { DEVICE_COOKIE_NAME } from './cookies';

const DEFAULT_DEVICE_CODE = 'POS-MIR-01';

// Mocked pairing: the device is identified by a cookie set at pairing time, falling back to
// POS_DEVICE_CODE so a fresh browser behaves like a paired counter terminal.
export const getDevice = async (): Promise<TerminalRecord | null> => {
  const cookieStore = await cookies();
  const deviceCode = cookieStore.get(DEVICE_COOKIE_NAME)?.value ?? process.env.POS_DEVICE_CODE ?? DEFAULT_DEVICE_CODE;
  return findTerminal(deviceCode);
};
