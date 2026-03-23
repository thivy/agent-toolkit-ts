## Implementation Tasks: In-Memory Todo App

Deliver a small, incremental Todo feature using runtime-only React state and existing UI primitives. The plan is execution-ready, but this tasks file is marked provisional because [specs/features/002-in-memory-todo-app/plan.md](specs/features/002-in-memory-todo-app/plan.md) does not yet contain canonical REQ-\* identifiers.

### Traceability Status

- Plan source: [specs/features/002-in-memory-todo-app/plan.md](specs/features/002-in-memory-todo-app/plan.md)
- Status: Provisional task draft pending canonical REQ-\* in plan.md
- Blocker: Plan has no explicit REQ-\* table or explicit approval marker

### Provisional Requirement Map

- REQ-001: Store todos in runtime memory only; reload resets data.
- REQ-002: Expose feature at /todos using App Router route-to-feature pattern.
- REQ-003: Feature entry owns todo state and add/toggle/delete actions.
- REQ-004: Presentational components receive behavior via props from feature entry.
- REQ-005: Ignore blank todo submissions.
- REQ-006: Completed todos have clear visual distinction.
- REQ-007: Empty-state messaging appears when list is empty.
- REQ-008: Reuse existing UI primitives and utilities; no new dependencies.
- REQ-009: Format, lint, build, and manual behavior checks pass.

### Design Token Map

- DES-001: Stateful feature entry at web/features/todo/todo-page.tsx.
- DES-002: Input/form component with controlled input and submit callback.
- DES-003: List/item rendering component with toggle/delete callbacks.
- DES-004: Empty-state component for zero todos.
- DES-005: Route module at web/app/todos/page.tsx mounting feature entry.
- DES-006: UI composition with Button/Card/Heading and cn() utility.

### Included Scope

- Single-page todo experience with add/toggle/delete in runtime memory.
- Feature-first structure under web/features/todo and thin route module.
- UX states for empty list, completed styling, and invalid blank submission handling.

### Excluded Scope

- localStorage/IndexedDB persistence.
- Backend/API/database/auth integration.
- Filtering, sorting, and collaborative/multi-user capabilities.

**Steps**

- [ ] 1. Foundation: create stateful feature entry
- [ ] 1.1 Build Todo feature root component
  - Objective: Implement feature entry that owns todo list state and action handlers.
  - Files/components/symbols: web/features/todo/todo-page.tsx, TodoPage, todo item type shape (id, text, completed), addTodo, toggleTodo, deleteTodo handlers.
  - Expected outcome: Feature root compiles and can orchestrate child components via props.
  - Done When: TodoPage is a client component with centralized state and typed handlers.
  - Verification expectation: Typecheck/build step compiles TodoPage with no unresolved imports.
  - _Requirements: REQ-001, REQ-003_
  - _Design: DES-001_

- [ ] 2. Presentational slice: input/list/empty components
- [ ] 2.1 Create add-todo input component
  - Objective: Capture todo text and submit only non-blank values.
  - Files/components/symbols: web/features/todo/components/todo-input.tsx, TodoInput, onAdd callback prop.
  - Expected outcome: Controlled input sends normalized text only for valid submissions.
  - Done When: Empty or whitespace-only input does not trigger onAdd; valid input does.
  - Verification expectation: Manual interaction confirms validation and callback invocation behavior.
  - _depends on 1.1_
  - _Requirements: REQ-004, REQ-005_
  - _Design: DES-002_

- [ ] 2.2 Create todo list/item component
  - Objective: Render todos and expose toggle/delete affordances.
  - Files/components/symbols: web/features/todo/components/todo-list.tsx, TodoList, TodoItem row rendering, onToggle, onDelete props.
  - Expected outcome: Items render deterministically and handlers are routed through props.
  - Done When: Toggle and delete controls invoke callbacks for the correct todo id.
  - Verification expectation: Manual interaction confirms each item action changes expected state.
  - _depends on 1.1_
  - _Requirements: REQ-004, REQ-006_
  - _Design: DES-003_

- [ ] 2.3 Create empty-state component
  - Objective: Display friendly message when there are zero todos.
  - Files/components/symbols: web/features/todo/components/todo-empty.tsx, TodoEmpty.
  - Expected outcome: Clear placeholder UI appears only when list is empty.
  - Done When: TodoPage conditionally renders TodoEmpty when todos.length is zero.
  - Verification expectation: Manual check confirms message toggles correctly as todos are added/removed.
  - _parallel with 2.1 and 2.2_
  - _Requirements: REQ-007_
  - _Design: DES-004_

- [ ] 3. Route and UI integration
- [ ] 3.1 Add /todos route module
  - Objective: Register app route that mounts the feature entry component.
  - Files/components/symbols: web/app/todos/page.tsx, default export page component.
  - Expected outcome: Route resolves and renders TodoPage.
  - Done When: Navigating to /todos in dev serves the Todo feature UI.
  - Verification expectation: Manual route check in bun dev confirms page loads without runtime errors.
  - _depends on 1.1_
  - _parallel with 2.1, 2.2, 2.3 after 1.1_
  - _Requirements: REQ-002_
  - _Design: DES-005_

- [ ] 3.2 Apply shared UI primitives and class composition
  - Objective: Use existing design-system primitives for consistent look and behavior.
  - Files/components/symbols: web/features/todo/todo-page.tsx, web/features/todo/components/todo-input.tsx, web/features/todo/components/todo-list.tsx, imports from web/components/ui/button.tsx, web/components/ui/card.tsx, web/components/ui/heading.tsx, web/components/lib/utils.ts.
  - Expected outcome: No new primitives/dependencies; consistent Tailwind + cn() usage.
  - Done When: Todo UI uses Button/Card/Heading and conditional classes use cn().
  - Verification expectation: Lint/build pass and visual sanity check show no style regressions.
  - _depends on 2.1, 2.2, 3.1_
  - _Requirements: REQ-008_
  - _Design: DES-006_

- [ ] 4. End-to-end UX and behavior finalization
- [ ] 4.1 Validate runtime-only behavior and edge states
  - Objective: Confirm all required interactions match scope.
  - Files/components/symbols: web/features/todo/todo-page.tsx, web/features/todo/components/todo-input.tsx, web/features/todo/components/todo-list.tsx, web/features/todo/components/todo-empty.tsx.
  - Expected outcome: Add/toggle/delete, empty-state, and completed styling all work as designed.
  - Done When: Reloading /todos clears data, proving in-memory-only behavior.
  - Verification expectation: Manual scenario checklist completes without runtime errors.
  - _depends on 2.1, 2.2, 2.3, 3.2_
  - _Requirements: REQ-001, REQ-005, REQ-006, REQ-007_
  - _Design: DES-001, DES-002, DES-003, DES-004, DES-006_

- [ ] 5. Quality gate verification
- [ ] 5.1 Run repository validation commands
  - Objective: Verify formatting, linting, and production build health.
  - Files/components/symbols: N/A (verification tasks).
  - Expected outcome: All required checks pass from web directory.
  - Done When: Commands succeed and /todos behavior is manually validated.
  - Verification expectation:
    - Run bun run format from web/.
    - Run bun run lint from web/.
    - Run bun run build from web/.
    - Run bun run dev from web/, open /todos, verify add/toggle/delete/empty-state.
    - Reload /todos and confirm todos reset.
  - _depends on 4.1_
  - _Requirements: REQ-009_
  - _Design: DES-001, DES-005, DES-006_

### Relevant files

- web/app/page.tsx — reference thin route-to-feature pattern.
- web/app/todos/page.tsx — create route module mounting TodoPage.
- web/features/todo/todo-page.tsx — create feature entry owning state and orchestration.
- web/features/todo/components/todo-input.tsx — create add form component.
- web/features/todo/components/todo-list.tsx — create list rendering and item actions.
- web/features/todo/components/todo-empty.tsx — create empty-state messaging.
- web/components/ui/button.tsx — reuse existing button primitive.
- web/components/ui/card.tsx — reuse existing card primitive.
- web/components/ui/heading.tsx — reuse existing heading primitive.
- web/components/lib/utils.ts — reuse cn() for conditional classes.

### Decisions and Risks

- Decision: Keep tasks aligned to existing architecture and avoid redesign during task planning phase.
- Risk: Until plan.md is updated with canonical REQ-\* and approval marker, traceability references are provisional.
- Follow-up: Once plan.md is formalized, replace provisional REQ mappings in this tasks file with canonical identifiers only (task sequencing remains unchanged).
