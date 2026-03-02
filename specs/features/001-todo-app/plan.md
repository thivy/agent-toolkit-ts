# Technical Design: Client-Side To-Do App

Replace the home page with a localStorage-persisted to-do application using Zustand (decoupled actions + `persist` middleware), new shadcn/ui-style primitives built on `@base-ui/react`, and React Hook Form + Zod for validation. The architecture mirrors the existing thin-route / fat-feature pattern and introduces the project's first Zustand store with a schema-versioned persistence layer.

---

## Steps

### Phase A — Foundation (types, store, dependencies)

**DES-1 — Data model & type definitions** _(REQ-1, REQ-2, REQ-9)_

Create `web/features/todo/todo-types.ts` exporting:

- `Priority` union type: `"low" | "medium" | "high" | "urgent"`
- `Todo` interface matching the data shape in requirements (id, title, description, priority, dueDate as ISO string | null, completed, createdAt as ISO string)
- `TodoFilter` union type: `"all" | "active" | "completed"`
- `PRIORITY_CONFIG` constant record mapping each `Priority` to its display label and Tailwind color classes (for REQ-9 badge rendering) — single source of truth for priority visuals

Generate `id` via `crypto.randomUUID()` (browser-native, no dependency).

**DES-2 — Zustand store with `persist` middleware** _(REQ-6, REQ-13)_

Create `web/store/use-todo-store.ts` following the decoupled actions pattern from `.github/skills/zustand/SKILL.md`:

- **State shape:**
  ```
  { todos: Todo[], filter: TodoFilter, schemaVersion: number }
  ```
- **Store creation** via `create<TodoState>()(persist(() => ({ ... }), { name: "todo-store", version: 1 }))`.
  - Zustand's `persist` middleware handles localStorage serialisation/deserialisation and fires `onRehydrateStorage` to confirm data is loaded.
  - `version` field enables future data migrations via `persist`'s `migrate` callback.
  - If localStorage is unavailable, `persist` silently falls back to in-memory-only (satisfies REQ-13).

- **Decoupled action exports** (plain functions, NOT inside `create()`):
  - `addTodo(input: CreateTodoInput)` — generates id + createdAt, prepends to array
  - `updateTodo(id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>)` — immutable update
  - `deleteTodo(id: string)` — filter out by id
  - `toggleTodo(id: string)` — flip `completed`
  - `setFilter(filter: TodoFilter)` — update filter state

- **Derived selectors** (exported functions consuming `useTodoStore.getState()` or as selector hooks):
  - `useFilteredTodos()` — applies filter + sorts by due date ascending (null last) per REQ-8. Sorting is always active (not a toggle), soonest-first with null-due-date tasks at the bottom.
  - `useTodoById(id: string)` — for edit form pre-population

Reference: reuse the exact `create` + standalone-action pattern from the Zustand skill.

**DES-3 — Install dependencies** _(REQ-1, REQ-6)_

Add to `web/package.json`:
| Package | Why |
|---|---|
| `zustand` | State management — prescribed by project skill, handles localStorage persist |
| `react-hook-form` | Form handling — prescribed tech stack (AGENTS.md) |
| `@hookform/resolvers` | Bridges Zod schemas to RHF |
| `zod` | Schema validation — prescribed tech stack (AGENTS.md), used for add/edit form |

No other new runtime deps. All UI components hand-built on existing `@base-ui/react` + `cva`.

---

### Phase B — UI Primitives (new shared components) _parallel with Phase A_

**DES-4 — Create missing shadcn/ui-style components** _(REQ-9, REQ-10, REQ-12)_

Each component follows the established pattern: `cva` variants, `@base-ui/react` primitive (where applicable), `cn()` merging, `data-slot` attribute, named exports. Since the shadcn registry is unreachable in the sandbox, all components are created manually.

| Component    | File                             | Base Primitive                             | Notes                                                                                                        |
| ------------ | -------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **Checkbox** | `web/components/ui/checkbox.tsx` | `@base-ui/react` Checkbox                  | Root + Indicator; used for REQ-3 toggle                                                                      |
| **Dialog**   | `web/components/ui/dialog.tsx`   | `@base-ui/react` Dialog                    | Backdrop, Popup, Title, Description, Close; used for REQ-5 delete confirmation and REQ-1/REQ-4 add/edit form |
| **Input**    | `web/components/ui/input.tsx`    | `@base-ui/react` Input or native `<input>` | Styled text input with focus ring, error state variant                                                       |
| **Textarea** | `web/components/ui/textarea.tsx` | Native `<textarea>`                        | For task description field                                                                                   |
| **Label**    | `web/components/ui/label.tsx`    | Native `<label>`                           | Styled label, pairs with Input/Select                                                                        |
| **Badge**    | `web/components/ui/badge.tsx`    | None (pure `cva`)                          | Variants for priority colours (REQ-9): low=slate, medium=blue, high=amber, urgent=red                        |
| **Select**   | `web/components/ui/select.tsx`   | `@base-ui/react` Select                    | Trigger, Popup, Option; used for priority picker                                                             |
| **Tabs**     | `web/components/ui/tabs.tsx`     | `@base-ui/react` Tabs                      | Root, List, Tab, Panel; used for REQ-7 filter (All/Active/Completed)                                         |

All components must be keyboard-accessible (REQ-12) — `@base-ui/react` primitives handle focus management and ARIA natively. Apply appropriate `aria-label` / `aria-describedby` where needed.

---

### Phase C — Feature Components _depends on Phase A + B_

**DES-5 — Todo form with validation** _(REQ-1, REQ-4)_

Create `web/features/todo/todo-form.tsx`:

- Rendered inside a **Dialog** (modal) — triggered by "Add Task" button or edit action on a task
- Uses React Hook Form with Zod resolver for validation
- Zod schema: `title` required string (min 1), `description` optional string, `priority` enum (default `"medium"`), `dueDate` optional date string
- On submit (add mode): calls `addTodo()`; on submit (edit mode): calls `updateTodo(id, values)`
- Form fields: Input (title), Textarea (description), Select (priority), native `<input type="date">` (due date)
- Validation error for empty title displayed inline under the field (REQ-1 acceptance criterion 2)
- `"use client"` directive
- Props: `mode: "add" | "edit"`, `todo?: Todo` (for pre-fill), `onClose: () => void`

**DES-6 — Todo list** _(REQ-2, REQ-7, REQ-8)_

Create `web/features/todo/todo-list.tsx`:

- Consumes `useFilteredTodos()` selector — list is already filtered and sorted
- Maps over todos, rendering `<TodoItem>` for each
- If array is empty, renders `<TodoEmptyState>` with context-aware messaging (see DES-9)
- `"use client"` directive

**DES-7 — Todo item** _(REQ-2, REQ-3, REQ-5, REQ-9)_

Create `web/features/todo/todo-item.tsx`:

- Displays: Checkbox (toggles completion via `toggleTodo(id)`), title (strikethrough + muted when completed), priority Badge, due date (formatted relative or absolute), edit button, delete button
- Edit button opens the form dialog in edit mode (DES-5)
- Delete button opens the delete confirmation dialog (DES-8)
- Layout: horizontal row on desktop (flex), stacked adaptation on mobile via responsive Tailwind utilities
- `"use client"` directive
- Props: `todo: Todo`

**DES-8 — Delete confirmation dialog** _(REQ-5)_

Create `web/features/todo/todo-delete-dialog.tsx`:

- Uses the Dialog component (DES-4)
- Shows task title in the message: "Delete '{title}'? This action cannot be undone."
- Two actions: Cancel (closes dialog, task unchanged — acceptance criterion 7) and Delete (calls `deleteTodo(id)`, closes dialog)
- `"use client"` directive
- Props: `todo: Todo`, `open: boolean`, `onOpenChange: (open: boolean) => void`

**DES-9 — Empty states** _(REQ-2 UX)_

Create `web/features/todo/todo-empty-state.tsx`:

- Three contextual messages based on current filter + total count:
  1. **No tasks at all** (total = 0): "No tasks yet — add your first one!" with CTA button that triggers add form
  2. **All completed** (filter = "active", 0 active, some completed): "All tasks done!"
  3. **Filter yields no results** (e.g., filter = "completed", 0 completed): "No completed tasks yet"
- `"use client"` directive
- Props: `filter: TodoFilter`, `totalCount: number`

**DES-10 — Todo page (feature entry)** _(REQ-2, REQ-7, REQ-10)_

Create `web/features/todo/todo-page.tsx`:

- `"use client"` directive, named export `TodoPage`
- Layout: centered container (`max-w-2xl mx-auto`), responsive padding
- Renders:
  - `<Heading variant="h1">` with app title
  - Header row: page title + "Add Task" Button (opens form dialog)
  - `<TodoFilters>` — Tabs component wired to `setFilter()` action, reads current filter from store
  - `<TodoList>`
- Owns the dialog open/close state for the add-task form
- Reference the existing `HomePage` layout pattern for container sizing

**DES-10.1 — Todo filters component**

Create `web/features/todo/todo-filters.tsx`:

- Uses Tabs component (DES-4) with three tabs: All, Active, Completed
- Reads `filter` from store, calls `setFilter()` on tab change
- Shows task counts per filter (total, active, completed) as subtle badges on tabs
- `"use client"` directive

---

### Phase D — Route Wiring _depends on Phase C_

**DES-11 — Update route and clean up** _(REQ-2)_

- **Modify** `web/app/page.tsx`: replace `HomePage` import with `TodoPage` import from `@/features/todo/todo-page`
- **Retain** `web/features/home/home-page.tsx` (don't delete — preserve git history; mark deprecated with a comment if desired)
- The route file remains a Server Component that simply renders the Client Component feature entry

---

### Phase E — Polish & Edge Cases _depends on Phase C_

**DES-12 — Responsive design** _(REQ-10)_

- Mobile (320px–639px): single-column layout, stacked todo-item fields, full-width dialog
- Tablet (640px–1023px): same as desktop but with adjusted padding
- Desktop (1024px+): centered max-w-2xl container, horizontal todo-item rows
- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) — mobile-first approach
- No horizontal scroll at any viewport (test with responsive DevTools)

**DES-13 — Accessibility** _(REQ-12)_

- All interactive elements keyboard-accessible via `@base-ui/react` primitives (built-in focus management)
- Checkbox: `aria-checked`, keyboard toggle with Space
- Dialog: focus trap, Escape to close, `aria-labelledby` + `aria-describedby`
- Tabs: arrow-key navigation, `aria-selected`
- Form: `aria-invalid` + `aria-describedby` for validation errors
- Delete button: `aria-label="Delete task: {title}"`
- Priority badge: meaningful text content (not colour-only — satisfies colour-blind users)

**DES-14 — Performance** _(REQ-11)_

- `useFilteredTodos()` computes filter+sort in a single pass — O(n) filter + O(n log n) sort
- No unnecessary re-renders: atomic Zustand selectors ensure components only re-render when their subscribed slice changes
- For 100 todos, this is trivially fast (<500ms initial render)
- `persist` middleware hydrates synchronously from localStorage on store creation — data is available before first render

---

## Relevant Files

### New files to create

- `web/features/todo/todo-types.ts` — Data model, Priority config, Zod schemas (DES-1)
- `web/store/use-todo-store.ts` — Zustand store + decoupled actions + persist middleware (DES-2)
- `web/features/todo/todo-page.tsx` — Feature entry component, page layout (DES-10)
- `web/features/todo/todo-list.tsx` — Filtered/sorted list renderer (DES-6)
- `web/features/todo/todo-item.tsx` — Individual task row (DES-7)
- `web/features/todo/todo-form.tsx` — Add/edit form in dialog with RHF+Zod (DES-5)
- `web/features/todo/todo-filters.tsx` — Filter tabs (DES-10.1)
- `web/features/todo/todo-delete-dialog.tsx` — Delete confirmation (DES-8)
- `web/features/todo/todo-empty-state.tsx` — Context-aware empty states (DES-9)
- `web/components/ui/checkbox.tsx` — Checkbox primitive (DES-4)
- `web/components/ui/dialog.tsx` — Dialog primitive (DES-4)
- `web/components/ui/input.tsx` — Input primitive (DES-4)
- `web/components/ui/textarea.tsx` — Textarea primitive (DES-4)
- `web/components/ui/label.tsx` — Label primitive (DES-4)
- `web/components/ui/badge.tsx` — Badge with priority variants (DES-4)
- `web/components/ui/select.tsx` — Select primitive (DES-4)
- `web/components/ui/tabs.tsx` — Tabs primitive (DES-4)

### Files to modify

- `web/app/page.tsx` — Swap `HomePage` → `TodoPage` import (DES-11)
- `web/package.json` — Add `zustand`, `react-hook-form`, `@hookform/resolvers`, `zod` (DES-3)

### Files to reference (read-only, patterns to replicate)

- `web/components/ui/button.tsx` — cva + `@base-ui/react` primitive pattern (specifically `buttonVariants` and `ButtonPrimitive.Props` typing)
- `web/components/ui/card.tsx` — Compound component pattern (multiple named exports, `data-slot`, `cn()`)
- `web/components/ui/dropdown-menu.tsx` — Complex `@base-ui/react` primitive wrapping (Trigger, Popup, nested items)
- `web/components/ui/heading.tsx` — cva variants + polymorphic tag rendering
- `web/features/home/home-page.tsx` — Feature entry pattern (`"use client"`, named export, `@/` imports, container layout)
- `web/components/blocks/theme/theme-toggle.tsx` — How DropdownMenu composes with Button
- `.github/skills/zustand/SKILL.md` — Decoupled actions, `persist` middleware, atomic selectors

---

## Verification

1. **Lint + build pass:** Run `bun run lint` and `bun run build` from `web/` — zero errors
2. **Add task flow:** Click "Add Task" → fill title → submit → task appears in list with correct priority badge and default values
3. **Validation:** Submit add form with empty title → inline error shown, submission blocked
4. **Edit task:** Click edit on a task → form pre-filled → change title + priority → save → list updates, page refresh preserves changes
5. **Toggle completion:** Click checkbox on task → visual strikethrough applied → refresh page → state persisted
6. **Filter:** Click "Active" tab → completed tasks hidden; click "Completed" → only completed shown; click "All" → all shown
7. **Sort order:** Add tasks with varied due dates → verify soonest-first order; tasks without due dates appear last
8. **Delete:** Click delete → confirmation dialog shows task title → cancel → task retained; confirm → task removed → refresh → still gone
9. **Empty state:** Delete all tasks → "No tasks yet" message with CTA shown; complete all tasks → filter to Active → "All tasks done!" shown
10. **Responsive:** Open browser DevTools, test at 320px, 768px, 1440px — no overflow, no horizontal scroll, layout adapts
11. **Keyboard:** Tab through all interactive elements (buttons, checkbox, tabs, dialog) — all reachable and operable
12. **localStorage fallback:** In DevTools console, override `localStorage` with throwing proxy → reload → app works in-memory without errors
13. **Performance:** Seed 100 tasks in localStorage → reload → verify list renders within 500ms (DevTools Performance tab)

---

## Decisions

- **Dialog-based form for add/edit** rather than inline form — keeps the task list clean, reuses a single form component in two modes, and aligns with the user flow described in requirements ("form appears" on add)
- **Zustand `persist` middleware** for localStorage instead of manual `localStorage.getItem/setItem` — provides automatic serialisation, hydration, schema versioning (`version` + `migrate`), and silent fallback when localStorage is unavailable (REQ-13)
- **React Hook Form + Zod** added as dependencies — matches the tech stack prescribed in AGENTS.md, provides robust validation UX for the form even though the schema is simple, and establishes the pattern for future forms
- **Schema version field** (`version: 1` in persist config) — enables non-breaking data migrations in future iterations (per requirements risk recommendation)
- **Sort always active** — tasks are always sorted by due date ascending (not a user toggle), per REQ-8 wording. No separate sort UI needed.
- **`crypto.randomUUID()` for IDs** — browser-native, no dependency; supported in all modern browsers
- **Retained `home-page.tsx`** — not deleted to preserve git history; route simply re-pointed
- **Eight new UI components** — necessary because shadcn registry is unreachable in sandbox and none of the required primitives (checkbox, dialog, input, etc.) exist yet. All follow the established cva + @base-ui/react + data-slot pattern.

---

## Traceability

| Design   | Requirement(s)             | Summary                                                   |
| -------- | -------------------------- | --------------------------------------------------------- |
| DES-1    | REQ-1, REQ-2, REQ-9        | Data model, Priority type + visual config                 |
| DES-2    | REQ-6, REQ-13              | Zustand store with persist middleware + graceful fallback |
| DES-3    | REQ-1, REQ-6               | New dependencies (zustand, RHF, zod)                      |
| DES-4    | REQ-9, REQ-10, REQ-12      | Eight new UI primitive components                         |
| DES-5    | REQ-1, REQ-4               | Add/edit form with validation                             |
| DES-6    | REQ-2, REQ-7, REQ-8        | Filtered + sorted task list                               |
| DES-7    | REQ-2, REQ-3, REQ-5, REQ-9 | Task item with toggle, priority badge, actions            |
| DES-8    | REQ-5                      | Delete confirmation dialog                                |
| DES-9    | REQ-2 (UX)                 | Context-aware empty states                                |
| DES-10   | REQ-2, REQ-7, REQ-10       | Page layout + filter tabs                                 |
| DES-10.1 | REQ-7                      | Filter tab component with counts                          |
| DES-11   | REQ-2                      | Route wiring (page.tsx → TodoPage)                        |
| DES-12   | REQ-10                     | Responsive layout (320px–1440px+)                         |
| DES-13   | REQ-12                     | Keyboard accessibility + ARIA                             |
| DES-14   | REQ-11                     | Performance (<500ms for 100 items)                        |

---

## Further Considerations

1. **Date picker component**: The plan uses native `<input type="date">` for the due-date field. This is functional and accessible but has inconsistent styling across browsers. A custom date picker from `@base-ui/react` could provide a polished experience — but would add significant component complexity. **Recommendation:** Ship with native date input for v1; upgrade later if needed.
2. **Optimistic vs. batched persistence**: Zustand's `persist` middleware writes to localStorage on every state change. For rapid toggling this is fine for v1 volumes. If perf becomes a concern, a debounced write strategy could be added via custom `persist` storage adapter.
3. **Component count**: Eight new UI primitives is substantial upfront work. Phases A+B can run in parallel to reduce wall-clock time. Each component is independently testable.
