# Testing

Two layers. Unit tests sit alongside the code they cover; end-to-end tests live at
the repository root as a standalone package.

| Layer | Location                          | Scope                                                                       |
| ----- | --------------------------------- | --------------------------------------------------------------------------- |
| Unit  | `src/**/*.test.ts(x)` (colocated) | Components (Testing Library + jsdom), `server/` logic, `types/` conversions |
| E2E   | [`e2e/`](../e2e/README.md)        | Browser-driven flows (Playwright, starts the app via `webServer`)           |

## Running

```bash
./cmd test unit          # Vitest
./cmd test e2e-setup     # one-time: install e2e deps + browser
./cmd test e2e           # Playwright
./cmd test e2e-report    # open the last HTML report
pnpm test:unit:watch     # Vitest watch mode while developing
```

CI runs format check, lint, typecheck, unit, and e2e on every push to `main` and
every pull request ([`.github/workflows/ci.yml`](../.github/workflows/ci.yml)).

## Placement

- **Colocate** a unit test next to the file it covers:
  `src/components/ReservationCard.test.tsx` beside
  `src/components/ReservationCard.tsx`. Vitest picks up
  `src/**/*.{test,spec}.{ts,tsx}` (see [`vitest.config.ts`](../vitest.config.ts)).
- E2E specs, page objects, and fixtures follow the structure described in
  [`e2e/README.md`](../e2e/README.md).

## What to test where

- **Unit** — behavior that can be verified without the real cloud services:
  component rendering and interaction, `server/` logic with `lib/` clients
  mocked, pure conversions in `types/`.
- **E2E** — flows that cross the tiers (page → server → page) through a real
  browser. E2E runs against the dev cloud instances configured in `.env.local`
  (or CI's environment), never against production.

A failure should point at its layer: when a unit test can catch it, do not push it
up to e2e — e2e runs are slower and their failures are harder to localize.
