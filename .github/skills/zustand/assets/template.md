import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// ============================================================================
// Types
// ============================================================================

/**
 * {{StoreName}}State - The state shape for this store
 */
export interface {{StoreName}}State {
  // Add state properties
  items: unknown[];
  selectedId: string | null;
  isLoading: boolean;
  error: string | null;
}

// ============================================================================
// Initial State
// ============================================================================

const initialState: {{StoreName}}State = {
  items: [],
  selectedId: null,
  isLoading: false,
  error: null,
};

// ============================================================================
// Store
// ============================================================================

/**
 * use{{StoreName}}Store - Zustand store for managing {{description}}
 *
 * @example
 * ```typescript
 * // In a component - use individual selectors for performance
 * const items = use{{StoreName}}Store((state) => state.items);
 * const loadItems = use{{StoreName}}Store((state) => state.loadItems);
 *
 * // Subscribe to changes outside React
 * use{{StoreName}}Store.subscribe(
 *   (state) => state.selectedId,
 *   (selectedId) => console.log('Selected:', selectedId)
 * );
 * ```
 */
export const use{{StoreName}}Store = create<{{StoreName}}State>()(
  subscribeWithSelector(() => ({
    // Initial state
    ...initialState,
  }))
);

// ============================================================================
// Actions (decoupled)
// ============================================================================

export const setItems = (items: unknown[]) => {
  use{{StoreName}}Store.setState({ items });
};

export const setSelectedId = (selectedId: string | null) => {
  use{{StoreName}}Store.setState({ selectedId });
};

export const setLoading = (isLoading: boolean) => {
  use{{StoreName}}Store.setState({ isLoading });
};

export const setError = (error: string | null) => {
  use{{StoreName}}Store.setState({ error });
};

export const loadItems = async () => {
  use{{StoreName}}Store.setState({ isLoading: true, error: null });
  try {
    // const items = await fetchItems();
    const items: unknown[] = []; // Replace with actual fetch
    use{{StoreName}}Store.setState({ items, isLoading: false });
  } catch (error) {
    use{{StoreName}}Store.setState({
      error: error instanceof Error ? error.message : "Failed to load",
      isLoading: false,
    });
  }
};

export const addItem = (item: unknown) => {
  use{{StoreName}}Store.setState((state) => ({
    items: [...state.items, item],
  }));
};

export const removeItem = (id: string) => {
  use{{StoreName}}Store.setState((state) => ({
    items: state.items.filter((item) => (item as { id: string }).id !== id),
    // Clear selection if removed item was selected
    selectedId: state.selectedId === id ? null : state.selectedId,
  }));
};

export const reset = () => {
  use{{StoreName}}Store.setState(initialState);
};