# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on http://localhost:5173
- `npm run build` — type-checks with `tsc -b` then `vite build`. Type errors fail the build.
- `npm run lint` — ESLint (flat config) over the repo
- `npm run format` / `npm run format:check` — Prettier write / check
- `npm run preview` — serve the production build

No test runner is configured. Do not add `npm test` instructions unless tests are introduced.

## Architecture

Feature-Sliced Design with the standard layer order:

```
app → processes → pages → widgets → features → entities → shared
```

A higher layer may import from any lower layer, never the reverse. Layers also do not import siblings (e.g. one `entities/*` slice must not import another). Inside a slice the conventional folders are `model/` (types + Zustand store), `ui/` (components), `api/` (API calls), and `lib/` (hooks/utilities). Slices typically expose a public `index.ts` barrel.

Path alias: `@/` → `src/` (configured in both `tsconfig.app.json` and `vite.config.ts`). Use `@/...` everywhere — relative `../../` imports across slices are considered wrong.

Composition:
- `src/app/main.tsx` mounts providers in order: `MantineProvider` → `QueryProvider` → `StoreProvider` → `BrowserRouter` → `App`.
- `src/app/App.tsx` short-circuits to `LoginForm` when `useAuth().isAuthenticated` is false; otherwise renders the Mantine `AppShell` with `Header`, `Sidebar`, and `<Router />` in main.
- `src/app/Router.tsx` is the single route table. Every route path comes from `Routes` in `src/shared/constants/routes.ts` — when adding pages, add the constant there first, then wire the `<Route>` in `Router.tsx`.

Data + state:
- **Zustand** for client state. User state in `src/entities/user/model/store.ts` is persisted via `zustand/middleware` `persist` and currently ships a hardcoded teacher user — treat that as a dev stub, not real auth.
- **TanStack Query** for server data (provider in `src/app/providers/QueryProvider.tsx`).
- **API client** is a hand-rolled fetch wrapper at `src/shared/api/instance.ts` (`apiClient.get/post/put/delete`). It reads `VITE_API_URL` (default `http://localhost:3000/api`). Throws on non-2xx; there are no interceptors or auth header handling yet — extend this module rather than calling `fetch` directly from slices.

UI: Mantine v7 (`@mantine/core`, `@mantine/hooks`) with `postcss-preset-mantine`. Global styles in `src/app/styles/`; theme overrides go in `src/app/styles/mantine-theme.ts`.

Env: copy `.env.example` to `.env`. Vite only exposes `VITE_*` vars.

## Code style

ESLint (`eslint.config.js`) enforces opinionated rules that are easy to trip:
- 2-space indent, single quotes, **semicolons required**, trailing commas on multiline, max line length 100.
- `padding-line-between-statements`: blank line **after** any `const`/`let`/`var` block, and a blank line **before** every `return`. This is the most common autofix surprise.
- `newline-per-chained-call` triggers after depth 2.

`prettier.config.cjs` is configured with `semi: false`, which **conflicts** with the ESLint `semi: ['error', 'always']` rule. ESLint wins — keep semicolons. If you run `npm run format`, expect to follow up with `npm run lint --fix` (or just leave formatting to ESLint).

TypeScript is `strict` with `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax` (use `import type { ... }` for type-only imports), and `erasableSyntaxOnly` (no enums/namespaces — use `as const` objects, as `Routes` does).

## Reference docs in this repo

`README.md`, `STRUCTURE.md`, and `QUICKSTART.md` (mostly Russian) cover the same FSD methodology in more depth and include slice-creation examples. Consult `STRUCTURE.md` when adding a new entity/feature.
