# Coding — TypeScript / React

Base: the
[Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html).
Formatting is delegated to Prettier ([`.prettierrc`](../../.prettierrc)) and
linting to ESLint ([`eslint.config.mjs`](../../eslint.config.mjs)) — run
`./cmd format` / `./cmd lint`. This doc covers what the tools do not enforce.

## Naming

```typescript
// Variables / functions / instances: camelCase
const batchSize = 32;
function imageProcessor() {}
const reservationItem = <ReservationCard />;

// Classes / interfaces / types / components: PascalCase
class ImageProcessor {}
interface ImageProps {}
type ImageType = '...';

// Constants: UPPER_SNAKE_CASE
const MAX_ITERATIONS = 100;
```

- **Component files**: PascalCase (`ReservationCard.tsx`). `index.tsx` is the
  exception. Files whose names Next.js dictates (`page.tsx`, `layout.tsx`,
  `route.ts`) are what they are.
- **Non-component modules**: camelCase (`server/auth.ts`, `lib/prisma.ts`).
  `types/` files are PascalCase because the file is named after the type
  (`types/Reservation.ts`).
- **Component name = filename.** For the root component of a directory, name the
  file `index.tsx` and use the directory name as the component name: import as
  `./Footer`, not `./Footer/Footer` or `./Footer/index`.
- **Props type name**: `Props` unless a more specific name is needed.

## Quotes

Prettier enforces these (`singleQuote: true`, `jsxSingleQuote: false`):

- Single quotes (`'`) for TypeScript string literals.
- Double quotes (`"`) for JSX attributes.

```typescript
const nick = 'some message';
<Person name="some name" />
```

## Components and functions

- Components are declared at the top level of source files, not nested inside
  other components.
- Use **function declarations** for top-level functions (this matches the
  Next.js convention for pages, layouts, and route handlers).
- Use arrow functions everywhere else.

## Types

- Prefer `interface` over `type` when both would work.

## Import paths

Pick the form based on the imported module's role, not by what is shortest:

- **Cross-cutting role directories** (`server/`, `services/`, `components/`,
  `lib/`, `types/`) — use the `@/` alias configured in
  [`tsconfig.json`](../../tsconfig.json): `from '@/types/Reservation'`, not
  `from '../../types/Reservation'`.
- **Sub-components or sub-modules that exist only to implement a specific
  component or page** — use relative paths (`./`, `..`). Their location is tied
  to the parent, and a relative path makes that relationship visible.

## Import order

Group imports into ordered blocks, separated by a blank line; alphabetical within
a block unless ordering matters:

```typescript
// 1. Third-party libraries
import {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';

// 2. Current repository (via @/)
import {listReservations} from '@/server/reservation';
import type {Reservation} from '@/types/Reservation';

// 3. Relative (sub-modules of this component/page)
import ReservationRow from './ReservationRow';
```

## MUI

- The theme lives in [`src/theme.ts`](../../src/theme.ts); the App Router
  integration (`AppRouterCacheProvider`, `ThemeProvider`, `CssBaseline`) is wired
  once in `src/app/layout.tsx`.
- Style through the theme first; use the `sx` prop for one-off adjustments. Avoid
  parallel styling systems (plain CSS files, CSS modules) for component styling.

## Comments

- All comments in English, ASCII only by default. Use non-ASCII characters only
  when there is a clear reason (e.g. a domain term that has no English
  equivalent).
- Comment WHY, not WHAT. Self-documenting names beat explanatory comments.
- Only add a comment when the rationale is non-obvious (a hidden constraint, a
  subtle invariant, a workaround). If removing the comment would not confuse a
  future reader, do not write it.
