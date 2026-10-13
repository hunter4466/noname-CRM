import { PermissionKey, type SessionUser } from '@noname/types';

export interface MockUserRecord {
  user: SessionUser;
  password: string;
  sessionToken: string;
}

export const createUsersMock = (): MockUserRecord[] => [
  {
    password: 'demo1234',
    sessionToken: 'mock-session-owner',
    user: {
      id: 'usr_owner',
      fullName: 'Mario C.',
      initials: 'MC',
      email: 'owner@demo.pe',
      roleName: 'Propietario',
      companyId: 'cmp_demo',
      companyName: 'Restaurante Demo S.A.C.',
      permissions: Object.values(PermissionKey),
    },
  },
];
