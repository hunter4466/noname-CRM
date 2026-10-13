// Mirror of `enum PermissionKey` in packages/db/prisma/schema.prisma — keep in sync.
export enum PermissionKey {
  DashboardView = 'DASHBOARD_VIEW',
  CatalogView = 'CATALOG_VIEW',
  CatalogManage = 'CATALOG_MANAGE',
  LocationsView = 'LOCATIONS_VIEW',
  LocationsManage = 'LOCATIONS_MANAGE',
  SunatView = 'SUNAT_VIEW',
  SunatManage = 'SUNAT_MANAGE',
  PosSell = 'POS_SELL',
  PosShiftOpen = 'POS_SHIFT_OPEN',
}
