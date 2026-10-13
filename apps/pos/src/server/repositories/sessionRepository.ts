import 'server-only';
import { createMockId, getMockSlice } from '../mocks/mockStore';

export interface StaffSessionRecord {
  token: string;
  staffId: string;
  deviceCode: string;
  shiftId: string | null;
}

const sessions = () => getMockSlice('staffSessions', () => new Map<string, StaffSessionRecord>());

export const createStaffSession = (staffId: string, deviceCode: string, shiftId: string | null): StaffSessionRecord => {
  const session = { token: createMockId('pos_session'), staffId, deviceCode, shiftId };
  sessions().set(session.token, session);
  return session;
};

export const findStaffSession = (token: string) => sessions().get(token) ?? null;

export const attachShift = (token: string, shiftId: string) => {
  const session = sessions().get(token);
  if (session) {
    session.shiftId = shiftId;
  }
};

export const deleteStaffSession = (token: string) => sessions().delete(token);
