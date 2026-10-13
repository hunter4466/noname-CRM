import 'server-only';

// In-memory mock store. Kept on globalThis so `next dev` hot reloads keep edits made through the API.
// Each repository owns one slice; swap a repository's internals for Prisma when the DB is wired.
const globalStore = globalThis as unknown as { posMockStore?: Map<string, unknown> };

export const getMockSlice = <T>(sliceName: string, createInitial: () => T): T => {
  globalStore.posMockStore ??= new Map();
  if (!globalStore.posMockStore.has(sliceName)) {
    globalStore.posMockStore.set(sliceName, createInitial());
  }
  return globalStore.posMockStore.get(sliceName) as T;
};

export const createMockId = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
