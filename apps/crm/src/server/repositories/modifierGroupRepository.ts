import 'server-only';
import type { ModifierGroup, ModifierGroupInput } from '@noname/types';
import { createModifierGroupsMock, type ModifierGroupRecord } from '../mocks/modifierGroupsMock';
import { createMockId, getMockSlice } from '../mocks/mockStore';
import { listProductRecords } from './productRepository';

const modifierGroups = () => getMockSlice('modifierGroups', createModifierGroupsMock);

const toModifierGroup = (record: ModifierGroupRecord): ModifierGroup => ({
  ...record,
  usedInProductNames: listProductRecords()
    .filter((product) => product.modifierGroups.some((link) => link.groupId === record.id))
    .map((product) => product.name),
});

export const findModifierGroupName = (groupId: string) => modifierGroups().find((group) => group.id === groupId)?.name ?? 'Unknown group';

export const listModifierGroups = (search?: string): ModifierGroup[] => {
  const query = search?.trim().toLowerCase();
  return modifierGroups()
    .filter((group) => !query || group.name.toLowerCase().includes(query))
    .map(toModifierGroup);
};

export const findModifierGroup = (groupId: string): ModifierGroup | null => {
  const record = modifierGroups().find((group) => group.id === groupId);
  return record ? toModifierGroup(record) : null;
};

export const createModifierGroup = (input: ModifierGroupInput): ModifierGroup => {
  const record: ModifierGroupRecord = { ...input, id: createMockId('mg'), lastEditedLabel: 'Created just now' };
  modifierGroups().push(record);
  return toModifierGroup(record);
};

export const updateModifierGroup = (groupId: string, input: Partial<ModifierGroupInput>): ModifierGroup | null => {
  const record = modifierGroups().find((group) => group.id === groupId);
  if (!record) {
    return null;
  }
  Object.assign(record, input, { lastEditedLabel: 'Last edited just now' });
  return toModifierGroup(record);
};
