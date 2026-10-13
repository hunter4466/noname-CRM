import type { ComponentType } from 'react';
import { IconBox, IconBuilding, IconDashboard, IconMapPin, IconReceipt, IconShield, IconUsers, type IconProps } from '@noname/ui/icons';
import { NavItemKey } from '@/types/NavItemKey';
import { Route } from '@/types/Route';

export interface NavItem {
  key: NavItemKey;
  label: string;
  href: Route | null;
  icon: ComponentType<IconProps>;
  /** Extra path prefixes that also mark this item active (e.g. combos live under Products). */
  matchPrefixes: string[];
  section?: string;
}

export const posModuleNav: NavItem[] = [
  { key: NavItemKey.Dashboard, label: 'Panel', href: Route.Dashboard, icon: IconDashboard, matchPrefixes: [] },
  {
    key: NavItemKey.Products,
    label: 'Productos',
    href: Route.Products,
    icon: IconBox,
    matchPrefixes: [Route.Products, Route.Combos, Route.ModifierGroups],
    section: 'Catálogo',
  },
  {
    key: NavItemKey.Locations,
    label: 'Locales',
    href: Route.Locations,
    icon: IconMapPin,
    matchPrefixes: [Route.Locations],
    section: 'Configuración',
  },
  {
    key: NavItemKey.Configuration,
    label: 'Configuración',
    href: Route.Configuration,
    icon: IconReceipt,
    matchPrefixes: [Route.Configuration],
  },
];

// Not built yet — rendered disabled so the information architecture matches the design.
export const configurationNav: NavItem[] = [
  { key: NavItemKey.Users, label: 'Usuarios', href: null, icon: IconUsers, matchPrefixes: [] },
  { key: NavItemKey.Roles, label: 'Roles y permisos', href: null, icon: IconShield, matchPrefixes: [] },
  { key: NavItemKey.Company, label: 'Empresa', href: null, icon: IconBuilding, matchPrefixes: [] },
];

export const isNavItemActive = (item: NavItem, pathname: string) =>
  item.href === pathname || item.matchPrefixes.some((prefix) => pathname.startsWith(prefix));
