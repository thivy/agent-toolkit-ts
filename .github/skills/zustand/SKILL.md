---
name: zustand
description: Expert knowledge for client-side state management with Zustand using the decoupled actions pattern.
---

Create Zustand stores following established patterns with proper TypeScript types and middleware.

## Quick Start

Copy the template from [assets/template.md](assets/template.md) and replace placeholders:

- `{{StoreName}}` → PascalCase store name (e.g., `Project`)
- `{{description}}` → Brief description for JSDoc

## Core Principles

1. **Client-Side Only** — Use Zustand for client-side state only. Store modules must only be imported from Client Components.
2. **State Only in Store** — `create()` should define the state shape and initial values, not actions.
3. **Decoupled Actions** — Export actions as plain functions that update state via `store.setState(...)`.
4. **Atomic Selectors** — Select the smallest slice of state needed to minimize re-renders.
5. **useState vs Zustand** — Prefer Zustand even for local UI state so components stay dumb and state lives in stores. Use React's `useState` only for truly trivial, one-off UI toggles that do not justify a store.

## The Decoupled Actions Pattern

### Why This Pattern?

- **No hook for actions** — Components import actions directly to avoid subscribing to action references and causing unnecessary re-renders.
- **Testable** — Actions are plain functions that can be tested in isolation.
- **Tree-shakeable** — Unused actions are eliminated from the bundle.

### Store Definition

```ts
// web/store/use-example-store.ts
import { create } from "zustand";

interface ExampleState {
  count: number;
  items: string[];
}

// 1) Store definition (state only)
export const useExampleStore = create<ExampleState>(() => ({
  count: 0,
  items: [],
}));

// 2) Decoupled actions (exported individually)
export const increment = () => {
  useExampleStore.setState((state) => ({ count: state.count + 1 }));
};

export const decrement = () => {
  useExampleStore.setState((state) => ({ count: state.count - 1 }));
};

export const addItem = (item: string) => {
  useExampleStore.setState((state) => ({ items: [...state.items, item] }));
};

export const reset = () => {
  useExampleStore.setState({ count: 0, items: [] });
};
```

### Consuming in Client Components

```tsx
"use client";

import { increment, decrement, useExampleStore } from "@/store/use-example-store";

export function Counter() {
  // Atomic selector: only re-renders when count changes
  const count = useExampleStore((state) => state.count);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## Best Practices

### Default to Stores, Even for Local State

- Store form and UI state in Zustand by default, even when used in a single component, to keep components presentational.
- Use `useState` only when the state is tiny, ephemeral, and unlikely to grow (e.g., a one-off boolean toggle).
- If multiple instances of the same UI can render at once, scope the store per instance (avoid shared singleton state collisions).

### Always Use subscribeWithSelector

```ts
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useMyStore = create<MyStore>()(
  subscribeWithSelector((set, get) => ({
    // state...
  })),
);
```

### Separate State and Actions

```ts
export interface MyState {
  items: Item[];
  isLoading: boolean;
}

export interface MyActions {
  addItem: (item: Item) => void;
  loadItems: () => Promise<void>;
}

export type MyStore = MyState & MyActions;
```

### Use Individual Selectors

```ts
// ✅ Correct: only re-renders when `items` changes
const items = useMyStore((state) => state.items);

// ❌ Avoid: re-renders on any state change
const { items, isLoading } = useMyStore();
```

### Functional Updates

Use functional updates when the new value depends on previous state:

```ts
// ✅ Correct: functional update
export const increment = () => {
  useExampleStore.setState((state) => ({ count: state.count + 1 }));
};

// ❌ Avoid: reading state outside setState when updating
export const incrementBad = () => {
  const current = useExampleStore.getState().count;
  useExampleStore.setState({ count: current + 1 });
};
```

### Atomic Selectors

Select only what you need to prevent unnecessary re-renders:

```tsx
// ✅ Correct: atomic selector
const count = useExampleStore((state) => state.count);

// ❌ Avoid: selecting entire state
const state = useExampleStore();
```

### Multiple Selectors

When you need multiple values, use separate selectors or shallow equality:

```tsx
import { useShallow } from "zustand/react/shallow";

// Option 1: Multiple atomic selectors
const count = useExampleStore((state) => state.count);
const items = useExampleStore((state) => state.items);

// Option 2: useShallow for object selection
const { count, items } = useExampleStore(
  useShallow((state) => ({ count: state.count, items: state.items })),
);
```

### Don't Import Stores in Server Components

```tsx
// ❌ Avoid: This will fail - Server Components cannot use client state
// app/page.tsx (Server Component)
import { useExampleStore } from "@/store/use-example-store";

// ✅ Correct: Pass data from Server Component to Client Component via props
// app/page.tsx
export default function Page() {
  return <ClientCounter initialCount={0} />;
}
```

### Don't Define Actions Inside create()

```ts
// ❌ Avoid: actions inside create
export const useStore = create<State & Actions>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// ✅ Correct: decoupled actions
export const useStore = create<State>(() => ({ count: 0 }));
export const increment = () => useStore.setState((s) => ({ count: s.count + 1 }));
```

## Quality Checklist

Before completing any Zustand-related task:

1. Verify stores are only imported in Client Components (`'use client'`)
2. Actions are exported as standalone functions, not inside `create()`
3. Components use atomic selectors to minimize re-renders
4. Functional updates are used when new state depends on previous state
5. Run `bun run lint` to verify no type errors
