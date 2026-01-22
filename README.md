# QubicaAMF Ecommerce

Vue 3 + Vite ecommerce demo using FakeStore API, with Pinia stores, i18n, and Storybook.

## Requirements

- Node.js: `>=20.19.0 <21` or `>=22.12.0`
- Recommended for development: Node.js `24.10.0`
- npm

## Install the project

```bash
npm install
```

## Quick start

```bash
npm run dev

# Storybook (optional)
npm run storybook
```

## PWA (minimal)

This project includes a minimal PWA setup using `vite-plugin-pwa`:

- App shell is available offline after the first load.
- Product API responses are cached at runtime.
- Auth/login is not supported offline.

### Run as PWA

```bash
npm run build
npm run preview
```

## Scripts

- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`
- Type check: `npm run type-check`
- Format: `npm run format`
- Storybook (dev): `npm run storybook`
- Storybook (build): `npm run build-storybook`

## Tech stack

- UI: Vue 3, Vue Router
- State: Pinia (+ persistence via VueUse `useLocalStorage`)
- i18n: `vue-i18n
- HTTP: Axios (`src/core/services/http.ts`)
- Component docs: Storybook

## API

This project uses FakeStore API:

- Base URL: `https://fakestoreapi.com`
- Endpoints/constants: `src/core/services/constants/api.constants.ts`

## Project structure (high level)

- `src/core/`: app-level services, router, core components (header, dialogs)
- `src/features/`: feature pages and dumb/presentational components (home/product/cart/wishlist)
- `src/shared/`: shared UI kit components, types, constants, utilities

## Component approach

This project follows a “smart/dumb” split:

- Smart components (containers/views) orchestrate data fetching, routing, and store interactions.
- Dumb components (presentational) focus on rendering and emit events to the parent.

## Recommended IDE setup

- VS Code
