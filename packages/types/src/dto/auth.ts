import type { BusinessType } from '../enums/BusinessType';
import type { PermissionKey } from '../enums/PermissionKey';

export interface SessionUser {
  id: string;
  fullName: string;
  initials: string;
  email: string;
  roleName: string;
  companyId: string;
  companyName: string;
  permissions: PermissionKey[];
}

export interface LoginRequest {
  email: string;
  password: string;
  keepSignedIn: boolean;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  ruc: string;
  commercialName: string;
  businessType: BusinessType;
  firstLocationName: string;
  firstLocationDistrict: string;
  openingHours: string;
  terminalCount: number;
}

export interface RecoverRequest {
  email: string;
}

export interface RecoverVerifyRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface OkResponse {
  ok: true;
}
