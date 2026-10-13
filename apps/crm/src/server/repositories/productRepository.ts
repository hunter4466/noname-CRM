import 'server-only';
import { ProductStatus, Tone, type Paginated, type Product, type ProductInput, type ProductSummary } from '@noname/types';
import { createMockId, getMockSlice } from '../mocks/mockStore';
import { createProductsMock, type ProductRecord } from '../mocks/productsMock';
import { findCategoryName } from './categoryRepository';
import { findModifierGroupName } from './modifierGroupRepository';

const products = () => getMockSlice('products', createProductsMock);

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  locationId?: string;
  status?: ProductStatus;
  page: number;
  pageSize: number;
}

const toLocationsLabel = (record: ProductRecord) => {
  const availableCount = record.locationSettings.filter((setting) => setting.isAvailable).length;
  if (availableCount === record.locationSettings.length) {
    return 'Todos';
  }
  if (availableCount === 1) {
    return record.locationSettings.find((setting) => setting.isAvailable)?.locationName ?? '1 local';
  }
  return `${availableCount} de ${record.locationSettings.length}`;
};

const toProduct = (record: ProductRecord): Product => ({
  ...record,
  categoryName: findCategoryName(record.categoryId),
  modifierGroupNames: record.modifierGroups.map((link) => findModifierGroupName(link.groupId)),
  locationsLabel: toLocationsLabel(record),
});

const toSummary = (product: Product): ProductSummary => ({
  id: product.id,
  name: product.name,
  sku: product.sku,
  categoryId: product.categoryId,
  categoryName: product.categoryName,
  price: product.price,
  status: product.status,
  tone: product.tone,
  modifierGroupNames: product.modifierGroupNames,
  usedInGroupName: product.usedInGroupName,
  locationsLabel: product.locationsLabel,
});

const matchesFilters = (record: ProductRecord, filters: ProductFilters) => {
  const search = filters.search?.trim().toLowerCase();
  if (search && !record.name.toLowerCase().includes(search) && !record.sku.toLowerCase().includes(search)) {
    return false;
  }
  if (filters.categoryId && record.categoryId !== filters.categoryId) {
    return false;
  }
  if (filters.status && record.status !== filters.status) {
    return false;
  }
  if (filters.locationId) {
    return record.locationSettings.some((setting) => setting.locationId === filters.locationId && setting.isAvailable);
  }
  return true;
};

export const listProductRecords = () => products();

export const listProducts = (filters: ProductFilters): Paginated<ProductSummary> => {
  const matching = products().filter((record) => matchesFilters(record, filters));
  const start = (filters.page - 1) * filters.pageSize;
  return {
    items: matching.slice(start, start + filters.pageSize).map((record) => toSummary(toProduct(record))),
    total: matching.length,
    page: filters.page,
    pageSize: filters.pageSize,
  };
};

export const findProduct = (productId: string): Product | null => {
  const record = products().find((product) => product.id === productId);
  return record ? toProduct(record) : null;
};

export const createProduct = (input: ProductInput): Product => {
  const record: ProductRecord = {
    ...input,
    id: createMockId('prd'),
    status: ProductStatus.Active,
    tone: Tone.Neutral,
    usedInGroupName: null,
  };
  products().push(record);
  return toProduct(record);
};

export const updateProduct = (productId: string, input: Partial<ProductInput>): Product | null => {
  const record = products().find((product) => product.id === productId);
  if (!record) {
    return null;
  }
  Object.assign(record, input);
  return toProduct(record);
};
