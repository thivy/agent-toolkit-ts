# Zustand Store Template

Replace the placeholders before using this template:

- `{{StoreName}}` -> PascalCase store name, for example `Project`
- `{{description}}` -> short purpose statement, for example `project selection and loading state`

```ts
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface {{StoreName}}State {
  items: string[];
  selectedId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: {{StoreName}}State = {
  items: [],
  selectedId: null,
  isLoading: false,
  error: null,
};

/**
 * Zustand store for {{description}}.
 */
export const use{{StoreName}}Store = create<{{StoreName}}State>()(
  subscribeWithSelector(() => ({
    ...initialState,
  })),
);

export const set{{StoreName}}Items = (items: string[]) => {
  use{{StoreName}}Store.setState({ items });
};

export const set{{StoreName}}SelectedId = (selectedId: string | null) => {
  use{{StoreName}}Store.setState({ selectedId });
};

export const start{{StoreName}}Loading = () => {
  use{{StoreName}}Store.setState({ isLoading: true, error: null });
};

export const finish{{StoreName}}Loading = (items: string[]) => {
  use{{StoreName}}Store.setState({ items, isLoading: false });
};

export const fail{{StoreName}}Loading = (message: string) => {
  use{{StoreName}}Store.setState({ error: message, isLoading: false });
};

export const add{{StoreName}}Item = (item: string) => {
  use{{StoreName}}Store.setState((state) => ({
    items: [...state.items, item],
  }));
};

export const remove{{StoreName}}Item = (item: string) => {
  use{{StoreName}}Store.setState((state) => ({
    items: state.items.filter((currentItem) => currentItem !== item),
    selectedId: state.selectedId === item ? null : state.selectedId,
  }));
};

export const reset{{StoreName}}Store = () => {
  use{{StoreName}}Store.setState({ ...initialState });
};
```

## Usage Notes

- Keep async fetching and orchestration in decoupled actions or service modules, not render functions.
- In Client Components, subscribe with atomic selectors such as `const items = use{{StoreName}}Store((state) => state.items);`.
- Import actions directly rather than selecting them from the store.
- If multiple independent instances can render, wrap a per-instance store factory in context instead of reusing this singleton template.
