import 'server-only';
import type { Shift } from '@noname/types';
import { createMockId, getMockSlice } from '../mocks/mockStore';

interface ShiftRecord extends Shift {
  deviceCode: string;
  staffId: string;
}

const shifts = () => getMockSlice('shifts', (): ShiftRecord[] => []);

const toShift = ({ id, openingCash, openedAt }: ShiftRecord): Shift => ({ id, openingCash, openedAt });

/** One open shift per device: reopening the register reuses the current one. */
export const findOpenShift = (deviceCode: string) => shifts().find((shift) => shift.deviceCode === deviceCode) ?? null;

export const openShift = (deviceCode: string, staffId: string, openingCash: number): Shift => {
  const existing = findOpenShift(deviceCode);
  if (existing) {
    return toShift(existing);
  }
  const shift: ShiftRecord = { id: createMockId('shf'), deviceCode, staffId, openingCash, openedAt: new Date().toISOString() };
  shifts().push(shift);
  return toShift(shift);
};
