import assert from 'node:assert/strict';
import { test } from 'node:test';
import { groupExtra, missingRequiredGroups, toggleOption, unitPriceWithModifiers, type SelectableGroup } from './modifierSelection.ts';

const cremas: SelectableGroup = {
  id: 'cremas',
  minSelections: 0,
  maxSelections: 4,
  freeSelections: 2,
  extraSelectionPrice: 1,
  options: ['mayo', 'ketchup', 'aji', 'huacatay', 'tartara'].map((id) => ({ id, price: 0, isOutOfStock: false })),
};

const dressing: SelectableGroup = {
  id: 'dressing',
  minSelections: 1,
  maxSelections: 1,
  freeSelections: 0,
  extraSelectionPrice: 0,
  options: [
    { id: 'caesar', price: 0, isOutOfStock: false },
    { id: 'ranch', price: 0, isOutOfStock: false },
  ],
};

test('first two cremas are free, the rest cost extra', () => {
  assert.equal(groupExtra(cremas, ['mayo', 'ketchup']), 0);
  assert.equal(groupExtra(cremas, ['mayo', 'ketchup', 'aji', 'huacatay']), 2);
});

test('multi-choice groups stop at the maximum', () => {
  let selection = {};
  for (const id of ['mayo', 'ketchup', 'aji', 'huacatay', 'tartara']) {
    selection = toggleOption(selection, cremas, id);
  }
  assert.deepEqual(selection, { cremas: ['mayo', 'ketchup', 'aji', 'huacatay'] });
});

test('required single-choice groups swap and cannot be cleared', () => {
  let selection = toggleOption({}, dressing, 'caesar');
  selection = toggleOption(selection, dressing, 'ranch');
  selection = toggleOption(selection, dressing, 'ranch');
  assert.deepEqual(selection, { dressing: ['ranch'] });
});

test('missing required groups and unit price', () => {
  assert.deepEqual(missingRequiredGroups([dressing, cremas], {}), ['dressing']);
  assert.equal(unitPriceWithModifiers(24, [cremas], { cremas: ['mayo', 'ketchup', 'aji'] }), 25);
});
