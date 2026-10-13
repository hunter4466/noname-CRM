import 'server-only';
import type { RegisterRequest, SessionUser } from '@noname/types';
import { createMockId, getMockSlice } from '../mocks/mockStore';
import { createUsersMock, type MockUserRecord } from '../mocks/usersMock';

const users = () => getMockSlice('users', createUsersMock);

const toInitials = (fullName: string) =>
  fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');

export const findUserByCredentials = (email: string, password: string): MockUserRecord | null =>
  users().find((record) => record.user.email.toLowerCase() === email.toLowerCase() && record.password === password) ?? null;

export const findUserBySessionToken = (sessionToken: string): SessionUser | null =>
  users().find((record) => record.sessionToken === sessionToken)?.user ?? null;

export const emailExists = (email: string) => users().some((record) => record.user.email.toLowerCase() === email.toLowerCase());

export const registerOwner = (request: RegisterRequest): MockUserRecord => {
  const owner = users()[0];
  const record: MockUserRecord = {
    password: request.password,
    sessionToken: createMockId('session'),
    user: {
      id: createMockId('usr'),
      fullName: request.fullName,
      initials: toInitials(request.fullName),
      email: request.email,
      roleName: 'Propietario',
      companyId: createMockId('cmp'),
      companyName: request.commercialName,
      permissions: owner?.user.permissions ?? [],
    },
  };
  users().push(record);
  return record;
};
