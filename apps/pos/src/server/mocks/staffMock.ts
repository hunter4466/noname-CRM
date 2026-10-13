import { PermissionKey, type StaffMember } from '@noname/types';

export interface StaffRecord {
  member: StaffMember;
  pin: string;
  permissions: PermissionKey[];
}

const cashier = [PermissionKey.PosSell, PermissionKey.PosShiftOpen];

// Mock PINs — real PINs are hashed in User.pinHash.
export const createStaffMock = (): StaffRecord[] => [
  {
    pin: '1234',
    permissions: Object.values(PermissionKey),
    member: { id: 'stf_mario', fullName: 'Mario C.', shortName: 'Mario', initials: 'MC', roleName: 'Owner' },
  },
  {
    pin: '1111',
    permissions: cashier,
    member: { id: 'stf_ana', fullName: 'Ana P.', shortName: 'Ana', initials: 'AP', roleName: 'Cashier' },
  },
  {
    pin: '2222',
    permissions: cashier,
    member: { id: 'stf_luis', fullName: 'Luis R.', shortName: 'Luis', initials: 'LR', roleName: 'Cashier' },
  },
  {
    pin: '3333',
    permissions: cashier,
    member: { id: 'stf_rosa', fullName: 'Rosa M.', shortName: 'Rosa', initials: 'RM', roleName: 'Supervisor' },
  },
];
