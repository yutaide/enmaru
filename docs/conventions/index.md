# Conventions

When the rules below are silent or feel out of sync, the default is to follow
existing patterns in the codebase. If something still feels off, open an issue
rather than silently extending the pattern.

## Make failures visible

A system that never surfaces errors is the most dangerous kind — not because
errors are absent, but because they are hidden. Aim not to suppress errors but to
detect them quickly, locate the cause, and respond at once.

Most irreversible failures are accumulations of smaller ones left unseen. Two
practices keep them visible and contained:

- **Tests and logging, at the right granularity.** Cover expected failure modes
  with tests; an expected failure is far cheaper to locate than an unexpected one.
  Log where it aids diagnosis — not on every hot-path call, which drowns the
  signal.
- **Well-factored structure.** Fast detection is wasted if the fix is slow. Keep
  responsibilities narrow — one role per directory, one concept per file (see
  [`docs/design.md`](../design.md)) — so a failure's blast radius stays inside one
  function or module.

## Ship with care

Two failure modes to avoid every time you push a change:

- **Verify the outcome yourself.** Type-checks and a green test suite verify code,
  not feature behavior. Actually use the change as a user would.
- **Don't merge what you can't explain.** If you cannot describe what a piece of
  the diff does and why, you have not reviewed it. This applies to your own code,
  to teammates' code, and to anything a coding agent produced.

## Areas

- [Coding](coding.md) — TypeScript / React / MUI style and structure
- [Repo](repo.md) — branching, commits, issues, pull requests
- [Docs](docs.md) — purpose, structure, and where to write what
