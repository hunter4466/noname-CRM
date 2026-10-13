import 'server-only';
import type { MenuItem, MenuModifierGroup, MenuResponse } from '@noname/types';
import { createMenuCategoriesMock, createMenuGroupsMock, createMenuItemsMock } from '../mocks/menuMock';
import { getMockSlice } from '../mocks/mockStore';
import { peekNextOrderNumber } from './orderRepository';

const menuItems = () => getMockSlice('menuItems', createMenuItemsMock);
const menuGroups = () => getMockSlice('menuGroups', createMenuGroupsMock);
const menuCategories = () => getMockSlice('menuCategories', createMenuCategoriesMock);

const OPEN_TICKET_COUNT = 3;

export const getMenu = (deviceCode: string): MenuResponse => ({
  categories: menuCategories(),
  items: menuItems(),
  modifierGroups: menuGroups(),
  openTicketCount: OPEN_TICKET_COUNT,
  nextOrderNumber: peekNextOrderNumber(deviceCode),
});

export const findMenuItem = (itemId: string): MenuItem | null => menuItems().find((item) => item.id === itemId) ?? null;

export const findMenuGroups = (groupIds: string[]): MenuModifierGroup[] =>
  groupIds.flatMap((groupId) => menuGroups().filter((group) => group.id === groupId));
