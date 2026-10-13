# Hooks Rule

## When to extract a hook

Extract business logic to a dedicated hook when either of these is true:
- The logic block is more than 7 lines
- The logic is reused in two or more components

Pure logic shared by both apps (pricing, modifier rules, IGV) does not belong in a hook at all: put it
in `packages/domain` as plain functions and call them from the hooks (and from the server).

## Hook authoring

- Arrow functions only: `export const useMyHook = () => { ... }`
- One hook per file, named `useXxx.ts`
- Hooks live in a flat `apps/<app>/src/hooks/` directory — no sub-folders
- camelCase names starting with `use`: `useCart`, `useProductDetail`, `useAppTheme`.
  Only hooks may start with `use` — never name a plain function or a returned callback `useX`.
- Server data goes through TanStack Query: one hook per endpoint (`useProducts`, `useSaveProduct`, …)
  calling `apiClient` from `src/lib/apiClient.ts`, with keys from the `QueryKey` enum in `src/types/QueryKey.ts`.
- Do not reassign variables inside render-time callbacks (`.map`, `.forEach`); compute totals with
  `reduce` (enforced by the React Compiler lint rule `react-hooks/immutability`).
