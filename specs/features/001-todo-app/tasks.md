# Implementation Tasks: Client-Side To-Do App

End-to-end implementation of a localStorage-persisted to-do application replacing the home page. Tasks are sequenced in five phases: foundation (types + store + deps), UI primitives, feature components, route wiring, and polish/verification. Phases A and B are parallelizable; C depends on both; D and E depend on C.

---

## Phase A — Foundation (types, store, dependencies)

- [ ] **1. Install dependencies** _(DES-3)_
  - [ ] 1.1 Add `zustand`, `react-hook-form`, `@hookform/resolvers`, `zod` to `web/package.json`
    - Run `bun add zustand react-hook-form @hookform/resolvers zod` from `web/`
    - Verify all four appear in `dependencies` in `web/package.json`
    - _Requirements: REQ-1, REQ-6_
    - _Design: DES-3_
    - **Done when:** `bun install` succeeds and all four packages are listed in `web/package.json` dependencies

- [ ] **2. Data model & type definitions** _(DES-1)_
  - [ ] 2.1 Create `web/features/todo/todo-types.ts`
    - Define `Priority` union type: `"low" | "medium" | "high" | "urgent"`
    - Define `Todo` interface: `id`, `title`, `description`, `priority`, `dueDate` (ISO string | null), `completed`, `createdAt` (ISO string)
    - Define `TodoFilter` union type: `"all" | "active" | "completed"`
    - Define `PRIORITY_CONFIG` constant: `Record<Priority, { label: string; className: string }>` mapping each priority to display label and Tailwind colour classes (low=slate, medium=blue, high=amber, urgent=red)
    - Define `CreateTodoInput` type for form submission: `{ title: string; description?: string; priority: Priority; dueDate?: string | null }`
    - Define Zod schema `todoFormSchema` for form validation (title min 1 char required, description optional, priority enum, dueDate optional string)
    - Named exports only; no default export
    - _Requirements: REQ-1, REQ-2, REQ-9_
    - _Design: DES-1_
    - **Done when:** File exports `Priority`, `Todo`, `TodoFilter`, `PRIORITY_CONFIG`, `CreateTodoInput`, `todoFormSchema` with correct types; `bun run lint` passes

- [ ] **3. Zustand store with persist middleware** _depends on 2_
  - [ ] 3.1 Create `web/store/` directory and `web/store/use-todo-store.ts`
    - Follow the decoupled actions pattern from `.github/skills/zustand/SKILL.md` exactly
    - State shape: `{ todos: Todo[]; filter: TodoFilter; schemaVersion: number }`
    - Store creation: `create<TodoState>()(persist(() => ({ todos: [], filter: "all", schemaVersion: 1 }), { name: "todo-store", version: 1 }))`
    - Decoupled action exports (standalone functions using `useTodoStore.setState()`):
      - `addTodo(input: CreateTodoInput)` — generates `id` via `crypto.randomUUID()`, sets `createdAt` to `new Date().toISOString()`, `completed: false`, prepends to todos array
      - `updateTodo(id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>)` — immutable map update
      - `deleteTodo(id: string)` — filter out by id
      - `toggleTodo(id: string)` — flip `completed` boolean
      - `setFilter(filter: TodoFilter)` — update filter state
    - Derived selector hooks:
      - `useFilteredTodos()` — reads `todos` and `filter` from store (using `useShallow`), applies filter, sorts by `dueDate` ascending with null-last, returns filtered+sorted array
      - `useTodoById(id: string)` — returns single todo by id for edit form pre-population
    - Named exports only
    - _Requirements: REQ-6, REQ-13_
    - _Design: DES-2_
    - **Done when:** Store file exports `useTodoStore`, all 5 actions, and 2 selector hooks; `bun run lint` passes; store creation uses persist middleware with `version: 1`

---

## Phase B — UI Primitives _(parallel with Phase A)_

All components follow the established pattern from `web/components/ui/button.tsx` and `web/components/ui/card.tsx`: `cva` variants, `@base-ui/react` primitives where applicable, `cn()` merging, `data-slot` attribute, named exports, function declarations. Each component is independently implementable.

- [ ] **4. Badge component**
  - [ ] 4.1 Create `web/components/ui/badge.tsx`
    - Pure `cva` component (no `@base-ui/react` primitive needed)
    - Define `badgeVariants` with `variant` prop: `default`, `secondary`, `destructive`, `outline`, and priority-specific variants: `low` (slate), `medium` (blue), `high` (amber), `urgent` (red)
    - Pattern reference: `heading.tsx` (cva variants + no base-ui primitive)
    - `data-slot="badge"`, extend `React.ComponentProps<"span">`
    - _Requirements: REQ-9_
    - _Design: DES-4_
    - **Done when:** `Badge` and `badgeVariants` exported; renders with correct priority colour classes; lint passes

- [ ] **5. Label component** _(parallel with 4)_
  - [ ] 5.1 Create `web/components/ui/label.tsx`
    - Native `<label>` wrapper with consistent styling
    - `data-slot="label"`, extend `React.ComponentProps<"label">`
    - Apply standard text-sm font-medium styling with error state support
    - Pattern reference: `heading.tsx` (pure HTML wrapper with cva)
    - _Requirements: REQ-12_
    - _Design: DES-4_
    - **Done when:** `Label` exported; renders styled label element; lint passes

- [ ] **6. Input component** _(parallel with 4)_
  - [ ] 6.1 Create `web/components/ui/input.tsx`
    - Styled `<input>` with focus ring, border, and error state variant (`aria-invalid` styling)
    - `data-slot="input"`, extend `React.ComponentProps<"input">`
    - Include `cva` variant for `error` state (red border/ring)
    - Pattern reference: `heading.tsx` for pure HTML + cva approach
    - _Requirements: REQ-1, REQ-12_
    - _Design: DES-4_
    - **Done when:** `Input` exported; renders with focus ring and error styling on `aria-invalid`; lint passes

- [ ] **7. Textarea component** _(parallel with 4)_
  - [ ] 7.1 Create `web/components/ui/textarea.tsx`
    - Native `<textarea>` with matching Input styling
    - `data-slot="textarea"`, extend `React.ComponentProps<"textarea">`
    - Same focus ring and error state pattern as Input
    - _Requirements: REQ-1_
    - _Design: DES-4_
    - **Done when:** `Textarea` exported; consistent with Input styling; lint passes

- [ ] **8. Checkbox component** _(parallel with 4)_
  - [ ] 8.1 Create `web/components/ui/checkbox.tsx`
    - Built on `@base-ui/react` Checkbox primitive (Root + Indicator)
    - Pattern reference: `button.tsx` for base-ui primitive wrapping
    - `data-slot="checkbox"`, `aria-checked` handled by base-ui
    - Keyboard toggle with Space built-in from base-ui primitive
    - Visual: border, rounded, check indicator on checked state
    - _Requirements: REQ-3, REQ-12_
    - _Design: DES-4_
    - **Done when:** `Checkbox` exported; toggles with click and Space key; `aria-checked` present; lint passes

- [ ] **9. Dialog component** _(parallel with 4)_
  - [ ] 9.1 Create `web/components/ui/dialog.tsx`
    - Built on `@base-ui/react` Dialog primitive
    - Compound component exports: `Dialog` (Root), `DialogTrigger`, `DialogBackdrop`, `DialogPopup` (content), `DialogTitle`, `DialogDescription`, `DialogClose`
    - Pattern reference: `dropdown-menu.tsx` for complex base-ui composition; `card.tsx` for compound export pattern
    - `DialogBackdrop`: fixed overlay with backdrop blur/opacity
    - `DialogPopup`: centered, responsive (full-width on mobile, max-w on desktop), focus trap, Escape to close
    - `data-slot` on each sub-component
    - `aria-labelledby` auto-linked via base-ui Title, `aria-describedby` via Description
    - _Requirements: REQ-5, REQ-12_
    - _Design: DES-4_
    - **Done when:** All 7 compound exports work together; focus trap active; Escape closes; lint passes

- [ ] **10. Select component** _(parallel with 4)_
  - [ ] 10.1 Create `web/components/ui/select.tsx`
    - Built on `@base-ui/react` Select primitive
    - Compound exports: `Select` (Root), `SelectTrigger`, `SelectValue`, `SelectPopup`, `SelectOption`
    - Pattern reference: `dropdown-menu.tsx` for Portal/Positioner pattern
    - Trigger styled as button-like with chevron indicator
    - Options with hover/focus highlighting
    - Keyboard: arrow keys to navigate, Enter to select, Escape to close
    - `data-slot` on each sub-component
    - _Requirements: REQ-1, REQ-12_
    - _Design: DES-4_
    - **Done when:** Select opens, displays options, keyboard-navigable, value selection works; lint passes

- [ ] **11. Tabs component** _(parallel with 4)_
  - [ ] 11.1 Create `web/components/ui/tabs.tsx`
    - Built on `@base-ui/react` Tabs primitive
    - Compound exports: `Tabs` (Root), `TabsList`, `TabsTab`, `TabsPanel`
    - Pattern reference: `card.tsx` for compound exports
    - Arrow-key navigation between tabs, `aria-selected` on active tab
    - Styled: subtle border-bottom indicator on active tab, hover states
    - `data-slot` on each sub-component
    - _Requirements: REQ-7, REQ-12_
    - _Design: DES-4_
    - **Done when:** Tabs switch panels, arrow-key navigation works, active state visible; lint passes

---

## Phase C — Feature Components _(depends on Phase A + Phase B)_

- [ ] **12. Todo empty state component**
  - [ ] 12.1 Create `web/features/todo/todo-empty-state.tsx`
    - `"use client"` directive
    - Props: `filter: TodoFilter`, `totalCount: number`, `onAddClick: () => void`
    - Three contextual messages:
      1. No tasks at all (totalCount = 0): "No tasks yet — add your first one!" with CTA Button triggering `onAddClick`
      2. All completed (filter = "active", 0 active results): "All tasks done!"
      3. Filter yields no results (filter = "completed", 0 completed): "No completed tasks yet"
    - Uses `Button` from `@/components/ui/button`, `Heading` from `@/components/ui/heading`
    - _Requirements: REQ-2_
    - _Design: DES-9_
    - **Done when:** Renders correct message for each scenario; CTA button present when totalCount = 0; lint passes

- [ ] **13. Todo delete confirmation dialog** _(parallel with 12)_
  - [ ] 13.1 Create `web/features/todo/todo-delete-dialog.tsx`
    - `"use client"` directive
    - Props: `todo: Todo`, `open: boolean`, `onOpenChange: (open: boolean) => void`
    - Uses Dialog compound components from DES-4/task 9
    - Message: "Delete '{todo.title}'? This action cannot be undone."
    - Two action buttons: Cancel (closes dialog) and Delete (calls `deleteTodo(todo.id)` then closes)
    - Cancel returns focus; task is unchanged after cancel (REQ-5 acceptance criterion)
    - _Requirements: REQ-5_
    - _Design: DES-8_
    - **Done when:** Dialog shows task title; Cancel preserves task; Delete removes task and closes; lint passes

- [ ] **14. Todo form with validation** _(parallel with 12)_
  - [ ] 14.1 Create `web/features/todo/todo-form.tsx`
    - `"use client"` directive
    - Props: `mode: "add" | "edit"`, `todo?: Todo` (for pre-fill in edit mode), `open: boolean`, `onOpenChange: (open: boolean) => void`
    - Rendered inside Dialog (from task 9)
    - React Hook Form with Zod resolver using `todoFormSchema` from `todo-types.ts`
    - Fields: Input (title, required), Textarea (description, optional), Select (priority, default "medium"), native `<input type="date">` (due date, optional)
    - Each field wrapped with Label component
    - Validation: empty title shows inline error under the field via `aria-invalid` + `aria-describedby`
    - On submit (add mode): calls `addTodo()` with form values, closes dialog, resets form
    - On submit (edit mode): calls `updateTodo(todo.id, values)`, closes dialog
    - Edit mode pre-fills form from `todo` prop
    - Dialog title: "Add Task" or "Edit Task" based on mode
    - _Requirements: REQ-1, REQ-4_
    - _Design: DES-5_
    - **Done when:** Add mode creates task; edit mode updates task; empty title shows inline error and blocks submit; form resets after add; lint passes

- [ ] **15. Todo item component** _(parallel with 12)_
  - [ ] 15.1 Create `web/features/todo/todo-item.tsx`
    - `"use client"` directive
    - Props: `todo: Todo`
    - Layout: horizontal row with flex (desktop), responsive stacking (mobile) using Tailwind responsive prefixes
    - Elements:
      - Checkbox (toggles via `toggleTodo(todo.id)`) — left side
      - Title text (strikethrough + `text-muted-foreground` when completed)
      - Priority Badge (using `PRIORITY_CONFIG` for variant selection)
      - Due date (formatted, or hidden if null)
      - Edit button (icon or text) — opens form dialog in edit mode
      - Delete button with `aria-label="Delete task: {todo.title}"` — opens delete dialog
    - Manages local state for edit dialog open/close and delete dialog open/close
    - Imports `TodoForm` (task 14), `TodoDeleteDialog` (task 13)
    - _Requirements: REQ-2, REQ-3, REQ-5, REQ-9_
    - _Design: DES-7_
    - **Done when:** Displays all todo fields; checkbox toggles completion with visual feedback; edit/delete open respective dialogs; priority badge uses correct colour; lint passes

- [ ] **16. Todo list component** _depends on 12, 15_
  - [ ] 16.1 Create `web/features/todo/todo-list.tsx`
    - `"use client"` directive
    - Consumes `useFilteredTodos()` selector — list is already filtered and sorted by due date ascending (null last)
    - Maps over todos rendering `<TodoItem>` for each (keyed by `todo.id`)
    - If filtered array is empty, renders `<TodoEmptyState>` with current filter and total todo count
    - Passes `onAddClick` to empty state for the CTA button
    - Props: `onAddClick: () => void` (passed through to empty state)
    - _Requirements: REQ-2, REQ-7, REQ-8_
    - _Design: DES-6_
    - **Done when:** Renders sorted/filtered list of TodoItems; shows empty state when no results; lint passes

- [ ] **17. Todo filters component** _(parallel with 16)_
  - [ ] 17.1 Create `web/features/todo/todo-filters.tsx`
    - `"use client"` directive
    - Uses Tabs compound component (from task 11)
    - Three tabs: "All", "Active", "Completed"
    - Reads `filter` from store via atomic selector: `useTodoStore((s) => s.filter)`
    - Calls `setFilter()` action on tab change
    - Shows task count badges on each tab: total, active count, completed count (derived from `useTodoStore((s) => s.todos)`)
    - _Requirements: REQ-7_
    - _Design: DES-10.1_
    - **Done when:** Tabs switch filter; counts display correctly; active tab visually highlighted; lint passes

- [ ] **18. Todo page (feature entry)** _depends on 16, 17_
  - [ ] 18.1 Create `web/features/todo/todo-page.tsx`
    - `"use client"` directive, named export `TodoPage`
    - Layout: centered container (`max-w-2xl mx-auto`), responsive padding (`px-4 py-8 sm:px-6 lg:px-8`)
    - Renders:
      1. `<Heading variant="h1">` with app title (e.g., "Tasks")
      2. Header row: title + "Add Task" `<Button>` that opens add form dialog
      3. `<TodoFilters>` — filter tab bar
      4. `<TodoList>` — filtered/sorted task list
    - Owns the dialog open/close state for the add-task form (`useState`)
    - Passes `onAddClick` to `TodoList` for empty-state CTA
    - Pattern reference: `web/features/home/home-page.tsx` for container layout
    - Entry component arrow function pattern: `export const TodoPage = () => { ... }`
    - _Requirements: REQ-2, REQ-7, REQ-10_
    - _Design: DES-10_
    - **Done when:** Page renders heading, add button, filter tabs, and task list in centered responsive layout; add dialog opens/closes; lint passes

---

## Phase D — Route Wiring _(depends on Phase C)_

- [ ] **19. Update route to render TodoPage**
  - [ ] 19.1 Modify `web/app/page.tsx`
    - Replace `import { HomePage } from "@/features/home/home-page"` with `import { TodoPage } from "@/features/todo/todo-page"`
    - Replace `<HomePage />` with `<TodoPage />` in the returned JSX
    - Keep the file as a Server Component (no `"use client"`) — thin route pattern
    - Do NOT delete `web/features/home/home-page.tsx` (preserve git history per design decision)
    - _Requirements: REQ-2_
    - _Design: DES-11_
    - **Done when:** `web/app/page.tsx` imports and renders `TodoPage`; file remains a Server Component; lint passes

---

## Phase E — Polish & Verification _(depends on Phase D)_

- [ ] **20. Responsive design validation**
  - [ ] 20.1 Verify responsive layout across breakpoints
    - Check all components at 320px, 768px, 1440px viewports
    - Ensure no horizontal scroll at any viewport
    - Todo items: horizontal row on desktop, stacked on mobile
    - Dialog: full-width on mobile, constrained max-width on desktop
    - Container: proper padding at all breakpoints
    - _Requirements: REQ-10_
    - _Design: DES-12_
    - **Done when:** No layout overflow; adaptive layouts at all three breakpoints

- [ ] **21. Accessibility audit**
  - [ ] 21.1 Verify keyboard navigation and ARIA attributes
    - Tab through all interactive elements: buttons, checkbox, tabs, dialog fields
    - Checkbox: `aria-checked` present, Space toggles
    - Dialog: focus trap active, Escape closes, `aria-labelledby` set
    - Tabs: arrow keys navigate, `aria-selected` on active
    - Form: `aria-invalid` + `aria-describedby` on validation errors
    - Delete button: `aria-label="Delete task: {title}"` present
    - Priority badge: meaningful text content (not colour-only)
    - _Requirements: REQ-12_
    - _Design: DES-13_
    - **Done when:** All elements keyboard-reachable; ARIA attributes correct per DES-13 checklist

- [ ] **22. Final build & lint validation**
  - [ ] 22.1 Run `bun run lint` from `web/` — zero errors
  - [ ] 22.2 Run `bun run format` from `web/` — formatting applied
  - [ ] 22.3 Run `bun run build` from `web/` — production build succeeds
    - _Requirements: all_
    - _Design: all_
    - **Done when:** All three commands pass with zero errors

---

## Relevant Files

### New files to create

- `web/features/todo/todo-types.ts` — Data model, Priority config, Zod schema (tasks 2)
- `web/store/use-todo-store.ts` — Zustand store + decoupled actions + persist middleware (task 3)
- `web/components/ui/badge.tsx` — Badge with priority colour variants (task 4)
- `web/components/ui/label.tsx` — Styled label component (task 5)
- `web/components/ui/input.tsx` — Styled text input with error state (task 6)
- `web/components/ui/textarea.tsx` — Styled textarea matching Input (task 7)
- `web/components/ui/checkbox.tsx` — Checkbox via `@base-ui/react` primitive (task 8)
- `web/components/ui/dialog.tsx` — Dialog compound component via `@base-ui/react` (task 9)
- `web/components/ui/select.tsx` — Select compound component via `@base-ui/react` (task 10)
- `web/components/ui/tabs.tsx` — Tabs compound component via `@base-ui/react` (task 11)
- `web/features/todo/todo-empty-state.tsx` — Contextual empty states (task 12)
- `web/features/todo/todo-delete-dialog.tsx` — Delete confirmation dialog (task 13)
- `web/features/todo/todo-form.tsx` — Add/edit form with RHF + Zod (task 14)
- `web/features/todo/todo-item.tsx` — Individual task row with actions (task 15)
- `web/features/todo/todo-list.tsx` — Filtered/sorted list renderer (task 16)
- `web/features/todo/todo-filters.tsx` — Filter tabs with counts (task 17)
- `web/features/todo/todo-page.tsx` — Feature entry component (task 18)

### Files to modify

- `web/package.json` — Add zustand, react-hook-form, @hookform/resolvers, zod (task 1)
- `web/app/page.tsx` — Swap `HomePage` → `TodoPage` import (task 19)

### Files to reference (patterns to replicate)

- `web/components/ui/button.tsx` — cva + `@base-ui/react` primitive pattern (`buttonVariants`, `ButtonPrimitive.Props` typing)
- `web/components/ui/card.tsx` — Compound component pattern (multiple named exports, `data-slot`, `cn()`)
- `web/components/ui/dropdown-menu.tsx` — Complex `@base-ui/react` composition (Portal, Positioner, aliases)
- `web/components/ui/heading.tsx` — cva variants + pure HTML wrapper (no base-ui primitive)
- `web/features/home/home-page.tsx` — Feature entry pattern (`"use client"`, named export, container layout)
- `.github/skills/zustand/SKILL.md` — Decoupled actions, `persist` middleware, atomic selectors

---

## Verification

1. **Lint + format + build:** `bun run lint`, `bun run format`, `bun run build` from `web/` — all pass with zero errors
2. **Add task flow:** Click "Add Task" → fill title → submit → task appears in list with correct priority badge and default values
3. **Validation:** Submit add form with empty title → inline error shown, submission blocked
4. **Edit task:** Click edit → form pre-filled → change title + priority → save → list updates; page refresh preserves changes
5. **Toggle completion:** Click checkbox → strikethrough applied → refresh → state persisted
6. **Filter:** Click "Active" tab → completed tasks hidden; "Completed" → only completed; "All" → all shown
7. **Sort order:** Add tasks with varied due dates → soonest-first order; null due dates appear last
8. **Delete:** Click delete → confirmation dialog shows title → cancel → task retained; confirm → task removed → refresh → still gone
9. **Empty state:** Delete all tasks → "No tasks yet" w/ CTA shown; complete all → filter Active → "All tasks done!"
10. **Responsive:** DevTools at 320px, 768px, 1440px — no overflow, layout adapts
11. **Keyboard:** Tab through all controls — all reachable and operable; dialog traps focus; Escape closes
12. **localStorage fallback:** Override localStorage with throwing proxy → reload → app works without errors

---

## Dependency Summary

**Critical path:** Task 1 (deps) → Task 2 (types) → Task 3 (store) → Tasks 12-15 (feature components) → Task 16 (list) → Task 18 (page) → Task 19 (route) → Task 22 (verification)

**Parallelizable groups:**
- **Group 1 (fully parallel):** Tasks 4–11 (all 8 UI primitives) — no interdependencies, can all be built simultaneously
- **Group 2 (parallel with Group 1):** Tasks 1–3 (foundation) — run in sequence but parallel with UI primitives
- **Group 3 (parallel within):** Tasks 12, 13, 14, 15 (empty state, delete dialog, form, item) — parallel once Phases A+B complete
- **Group 4 (parallel):** Tasks 16, 17 (list + filters) — parallel once their inputs from Group 3 exist
- **Group 5 (parallel):** Tasks 20, 21 (responsive + a11y audit) — parallel after route wiring

---

## Decisions

- Dialog-based form for add/edit rather than inline — reuses single component in two modes, keeps list clean
- Zustand `persist` middleware handles localStorage serialisation, schema versioning, and silent fallback — no manual `localStorage.getItem/setItem`
- Sort is always active (due date ascending, null last) — no separate sort UI per REQ-8
- `crypto.randomUUID()` for IDs — browser-native, no dependency
- Retained `home-page.tsx` without deletion — preserves git history
- Eight new UI primitives hand-built — shadcn registry unreachable in sandbox
- Tasks 4–11 are independent and parallelizable to minimize wall-clock time
