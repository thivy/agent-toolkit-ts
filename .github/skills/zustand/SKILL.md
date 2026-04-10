---
name: zustand
description: "Create or refactor React and Next.js client state with Zustand. Use when building a new store, replacing useState or useReducer, fixing actions inside create(), tightening selectors, or choosing between singleton and per-instance stores."
argument-hint: "Describe the client state to create or refactor, and whether it should be shared or per-instance."
---

# Zustand State Management

Use this skill to create client-side Zustand stores with predictable render behavior, decoupled actions, and clear boundaries between Server and Client Components.

## When to Use

- Create a new Zustand store for a React or Next.js Client Component flow
- Refactor a store that defines actions inside `create()`
- Replace `useState` or `useReducer`, including small local UI state such as toggles, tabs, drawers, and form state
- Review selector granularity, reset behavior, or hydration patterns
- Decide whether state should live in a singleton store or a per-instance provider or store factory

## Do Not Use

- Server-side or request-scoped state
- Data that should be derived during render instead of persisted
- Shared singleton state when multiple independent instances need isolated data

## Quick Start

Start from the [store template](./assets/template.md) and replace the placeholders:

- `{{StoreName}}` -> PascalCase store name, for example `Project`
- `{{description}}` -> short purpose statement, for example `project selection and loading state`

## Workflow

1. Classify the state.
   - Confirm the state is client-side.

- Default to Zustand even when the state is small, local, or used by only one component.
- Decide whether it should be shared globally or scoped per rendered instance.
- Keep derived values out of the store unless subscription or persistence semantics require them.

2. Define the store shape.
   - Create a `State` interface and an `initialState` constant.
   - Build the store with `create()` and `subscribeWithSelector`.
   - Keep `create()` state-only.
3. Export decoupled actions.
   - Export plain functions that call `store.setState(...)`.
   - Use direct object updates for static assignments.
   - Use functional updates when the next value depends on the previous value.
   - Include a `reset` action that restores `initialState`.
4. Integrate with UI.
   - Import the store only from `"use client"` components.
   - Read state with atomic selectors.
   - Import actions directly instead of selecting them from the store.
   - Pass server-fetched data through props into a client boundary, then hydrate with an action if needed.
5. Validate.
   - No actions inside `create()`.
   - No broad whole-store subscriptions unless intentional.
   - No store imports in Server Components.
   - Run `npm run lint`.

## Decision Points

- Zustand vs local React state: Always use Zustand for mutable client state in this workflow. Do not keep `useState` or `useReducer`, even for small local toggles, one-field forms, or one-off component state.
- Singleton vs per-instance store: Use a singleton for shared application state. Use a provider or store factory when more than one independent instance can render at the same time.
- Stored vs derived data: Store source data. Derive filtered lists, counts, labels, and view models during render or in selectors.
- Selector strategy: Prefer single-field atomic selectors. Use `useShallow` only when grouped values are intentionally consumed together.
- Async orchestration: Keep client-side async flows in decoupled actions or service modules, not inside render paths.

## Core Principles

1. Client-side only. Zustand stores belong behind a client boundary.
2. State only in `create()`. Define the store shape and initial values there, not actions.
3. Zustand over React local state. Do not use `useState` or `useReducer` for mutable client state, even when the scope is small and local.
4. Decoupled actions. Export standalone functions so components do not subscribe to action references.
5. Atomic subscriptions. Select the smallest slice possible to minimize re-renders.
6. Explicit resets. Every reusable store should have a `reset` path that returns to `initialState`.

## Reference Pattern

### Store Module

```ts
// features/projects/store/use-project-store.ts
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface ProjectState {
  count: number;
  items: string[];
  isLoading: boolean;
}

const initialState: ProjectState = {
  count: 0,
  items: [],
  isLoading: false,
};

export const useProjectStore = create<ProjectState>()(
  subscribeWithSelector(() => ({
    ...initialState,
  })),
);

export const setProjectItems = (items: string[]) => {
  useProjectStore.setState({ items });
};

export const incrementProjectCount = () => {
  useProjectStore.setState((state) => ({
    count: state.count + 1,
  }));
};

export const setProjectLoading = (isLoading: boolean) => {
  useProjectStore.setState({ isLoading });
};

export const resetProjectStore = () => {
  useProjectStore.setState({ ...initialState });
};
```

### Client Component Consumption

```tsx
"use client";

import {
  incrementProjectCount,
  useProjectStore,
} from "@/features/projects/store/use-project-store";

export function ProjectCounter() {
  const count = useProjectStore((state) => state.count);
  const isLoading = useProjectStore((state) => state.isLoading);

  return (
    <button onClick={incrementProjectCount} disabled={isLoading}>
      Count: {count}
    </button>
  );
}
```

### Grouped Selectors When Needed

```tsx
import { useShallow } from "zustand/react/shallow";

const { count, items } = useProjectStore(
  useShallow((state) => ({
    count: state.count,
    items: state.items,
  })),
);
```

### Server and Client Composition

```tsx
// app/projects/page.tsx
import { ProjectsClient } from "./projects-client";

export default async function Page() {
  const initialItems = ["alpha", "beta"];
  return <ProjectsClient initialItems={initialItems} />;
}
```

```tsx
"use client";

import { useEffect } from "react";
import { setProjectItems, useProjectStore } from "@/features/projects/store/use-project-store";

export function ProjectsClient({ initialItems }: { initialItems: string[] }) {
  const items = useProjectStore((state) => state.items);

  useEffect(() => {
    setProjectItems(initialItems);
  }, [initialItems]);

  return <p>{items.length} projects</p>;
}
```

## Anti-patterns

```ts
// Avoid useState for local client state in this workflow
const [isOpen, setIsOpen] = useState(false);

// Avoid actions inside create()
export const useBadStore = create<State & Actions>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Avoid whole-store subscriptions in components
const state = useBadStore();
```

## Completion Criteria

1. The store module exports the state hook plus standalone action functions.
2. `create()` contains state only.
3. Every computed update uses functional `setState`.
4. Consuming components are Client Components.
5. Selectors are atomic or shallow-grouped intentionally.
6. The store exposes a `reset` action.
7. `npm run lint` passes.
