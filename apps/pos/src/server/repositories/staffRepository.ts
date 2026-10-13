import 'server-only';
import { getMockSlice } from '../mocks/mockStore';
import { createStaffMock, type StaffRecord } from '../mocks/staffMock';

const staff = () => getMockSlice('staff', createStaffMock);

export const listStaff = () => staff().map((record) => record.member);

export const findStaff = (staffId: string): StaffRecord | null => staff().find((record) => record.member.id === staffId) ?? null;

export const verifyPin = (staffId: string, pin: string): StaffRecord | null => {
  const record = findStaff(staffId);
  return record && record.pin === pin ? record : null;
};
