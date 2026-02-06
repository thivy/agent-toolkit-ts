---
name: ui-components
description: Best practices for building UI with shadcn/ui and Tailwind.
---

## Decision Flow

Before building any UI component, follow these steps in order. Stop as soon as you find a match.

1. **Check existing components** — Search `web/components/ui/` and `web/components/blocks/` for an existing component that fits. If found, import via `@/components/*` and use it.

2. **Check shadcn/ui library** — If no existing component matches, look up the equivalent in `./references/components.md`. If available, install it using instructions from the `web/` directory.

3. **Create a new primitive** — Only if steps 1 and 2 fail, create a new primitive under `web/components/ui/`. Keep it generic with no domain logic.

## Core Principles

1. **Compose, Don’t Rebuild** — Prefer composing existing shadcn/ui primitives over creating new primitives.
2. **Primitives Stay Generic** — `web/components/ui/*` must not contain domain logic, data fetching, or feature-specific state.
3. **Match the Design System** — Reuse existing patterns, spacing, typography, and interaction styles.
4. **Mobile-First Tailwind** — Write mobile classes first, then scale up (e.g., `flex-col md:flex-row`).
5. **Prefer Utility Classes** — Use Tailwind for layout/spacing/typography; avoid inline styles unless unavoidable.

## Component Placement Rules

- `web/components/ui/` — UI primitives only (buttons, inputs, dialogs, etc.).
- `web/components/blocks/` — reusable compositions built from primitives.
- `web/features/*` — feature/domain UI (may compose blocks + primitives; owns feature logic).

## Styling Conventions

- Prefer `cn()` for `className` composition (see `web/components/lib/utils.ts`).
- Keep responsive behavior consistent with existing layouts (container widths, breakpoints, spacing).
- Avoid inline styles; use Tailwind utilities.

## Anti-Patterns to Avoid

- Adding feature-specific behavior to `web/components/ui/*`.
- Introducing new primitives when an existing shadcn/ui primitive already matches.
- Deep relative imports across domains (prefer `@/` absolute imports).
- Desktop-first styling that breaks mobile layouts.

## Quality Checklist

Before completing any UI component task:

1. Component is placed in the correct folder (`ui/` vs `blocks/` vs `features/`).
2. `web/components/ui/*` contains no domain logic or data fetching.
3. Tailwind classes are mobile-first and match existing spacing/typography patterns.
4. `className` composition uses `cn()` when applicable.
