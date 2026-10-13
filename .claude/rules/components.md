# Components Rule

Applies to React code in `apps/crm/src`, `apps/pos/src` and `packages/ui/src`.

## Where components live

- App components: `apps/<app>/src/components/ComponentName/ComponentName.tsx`.
- Shared primitives used across three or more pages of one app: `apps/<app>/src/components/shared/`.
- Primitives used by **both** apps (buttons, pills, cards, fields, icons, design tokens) live in
  `packages/ui` and are imported from `@noname/ui` / `@noname/ui/icons`. Never copy a primitive from one
  app into the other — move it to `packages/ui`.
- Next.js route files (`page.tsx`, `layout.tsx`) are thin: they read params / session and render a
  screen component from `src/components`. No markup or business logic in them.
- Client components start with `'use client'`; keep server-only code (`src/server/**`, which imports
  `server-only`) out of client components.

## Component authoring

- Arrow-function components only: `export const Foo = (props: FooProps) => { ... }`.
  Next.js route files are the one exception that needs a default export:
  `const ProductsPage = () => <ProductsScreen />; export default ProductsPage;`
- One component per file; the file must live in a named folder matching the component: `components/ComponentName/ComponentName.tsx`
- JSX return must be ≤ 30 lines. If it exceeds that, extract child blocks into sibling component files in the same folder.

## Icons convention

- Each icon lives in its own named folder: `packages/ui/src/components/icons/IconName/IconName.tsx`
- The barrel `packages/ui/src/components/icons/index.ts` re-exports every icon as a named export; import from `@noname/ui/icons`
- Name icons as `IconFoo` (PascalCase with `Icon` prefix), e.g. `IconSearch`, `IconDashboard`
- Do not use object wrappers like `{ CIcon }` or `{ Icons }` — import named exports directly

## Naming

- Component names must be full, descriptive PascalCase. No abbreviations: `Checkbox` not `Cb`, `Dropdown` not `Dd`.
- Variable, parameter, and prop names must be full camelCase words. Single-letter names are forbidden except for standard loop indices (`i`, `j`, `k`) and generic type parameters (`T`, `K`, `V`).
- Plurals formed by appending `s` to an abbreviated name are forbidden (`ps`, `bs`, `rs`). Use the full plural word: `products`, `banners`, `roles`.

## Enum keys

- Never use raw string literals as discriminant values — map keys, filter conditions, status identifiers, route names, and similar. Define a TypeScript `enum` for each distinct set and reference its members everywhere.
- Example: instead of `view === 'low'`, define `enum StockView { Low = 'low', OutOfStock = 'oos', Draft = 'draft' }` and use `StockView.Low`.
- Where enums live:
  - Domain enums that mirror Prisma (statuses, document types, permissions…) and enums shared by both
    apps: `packages/types/src/enums/<Name>.ts`, imported from `@noname/types`.
  - App-only UI enums (routes, query keys, tabs, wizard steps…): `apps/<app>/src/types/<Name>.ts`.
  - UI-kit enums (button variants, pill tones…): `packages/ui/src/types/<Name>.ts`.
- Routes are the `Route` enum in `apps/<app>/src/types/Route.ts` (+ helpers like `productRoute(id)`); never hard-code a path string.

## CSS isolation (CSS Modules)

- Every component folder contains a CSS Module named after the component: `components/ComponentName/ComponentName.module.css`.
- The component imports it as `import styles from './ComponentName.module.css'` and uses `className={styles.foo}`.
  Combine classes with `classNames(...)` from `@noname/ui`.
- No `style={{}}` props anywhere in JSX. All visual properties go in the component's CSS Module.
  Data-driven sizes (charts, bars) are drawn with SVG attributes (`<rect height={...}>`), not inline styles.
- Colors, radii, fonts and sizes come from the design tokens in `packages/ui/src/styles/tokens.css`
  (`var(--color-brand)`, …) — no new hex values for things a token already covers.
- Global CSS is limited to `packages/ui/src/styles/tokens.css` (design tokens) and `base.css` (reset +
  the few utility classes shared by 3+ unrelated components: `mono`, `hint`, `visually-hidden`), both
  imported once in each app's root `layout.tsx`.
