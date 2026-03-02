# Requirements: To-Do Application

A client-side to-do application that lets users manage tasks with priorities and due dates, persisted in localStorage, served as the main page of the app.

## Problem & Goals

- Users need a simple, fast way to track tasks with priorities and deadlines without requiring an account or backend.
- **Business goal:** Provide a functional task management experience as the app's primary feature.
- **User outcome:** Users can create, view, edit, complete, and delete tasks — with data surviving page refreshes.

## Scope

- **In scope:**
  - Full CRUD for to-do items (create, read, update, delete)
  - Task fields: title, description, priority (Low / Medium / High / Urgent), due date, completion status
  - Persistent storage via localStorage
  - Filter tasks by completion status (all / active / completed)
  - Sort tasks by due date
  - Deletion confirmation dialog
  - Replace the current home page (`/`) with the to-do app
  - Responsive design (mobile + desktop)

- **Out of scope:**
  - User authentication / multi-user support
  - Server-side storage or database
  - Drag-and-drop reordering
  - Subtasks or nested to-do items
  - Tags, categories, or labels
  - Notifications or reminders
  - Export / import of tasks
  - Undo after delete

## Requirements

### Functional

- **REQ-1** (Must): Users can add a new task with a title (required), description (optional), priority level, and due date (optional).
- **REQ-2** (Must): Users can view all tasks in a list, showing title, priority, due date, and completion status.
- **REQ-3** (Must): Users can mark a task as complete or revert it to active by toggling its status.
- **REQ-4** (Must): Users can edit any field of an existing task (title, description, priority, due date).
- **REQ-5** (Must): Users can delete a task after confirming via a dialog.
- **REQ-6** (Must): All tasks are persisted in localStorage and restored on page load.
- **REQ-7** (Should): Users can filter the task list by status: All, Active, or Completed.
- **REQ-8** (Should): Users can sort tasks by due date (ascending — soonest first; tasks without a due date appear last).
- **REQ-9** (Should): Each priority level has a distinct visual indicator (color or badge).

### Non-Functional

- **REQ-10** (Must): The UI is responsive and usable on viewports from 320px to 1440px+.
- **REQ-11** (Must): Page load with 100 tasks in localStorage completes initial render in under 500ms.
- **REQ-12** (Should): All interactive elements are keyboard-accessible and have appropriate ARIA attributes.
- **REQ-13** (Should): The app functions fully without JavaScript errors when localStorage is unavailable (graceful degradation to in-memory only).

## UX & Data Notes

### Task Data Shape

| Field       | Type     | Required | Default   |
| ----------- | -------- | -------- | --------- |
| id          | string   | auto     | generated |
| title       | string   | yes      | —         |
| description | string   | no       | empty     |
| priority    | enum     | yes      | Medium    |
| dueDate     | date     | no       | null      |
| completed   | boolean  | auto     | false     |
| createdAt   | datetime | auto     | now       |

### Priority Levels

`Low` · `Medium` · `High` · `Urgent` — each with a distinct visual treatment.

### User Flows

1. **Add task:** User clicks "Add Task" button → form appears (inline or modal) → fills title + optional fields → submits → task appears in list.
2. **Edit task:** User clicks edit on an existing task → same form pre-filled → saves changes → list updates.
3. **Toggle complete:** User clicks a checkbox/toggle on a task → status flips → visual state changes (e.g., strikethrough).
4. **Delete task:** User clicks delete → confirmation dialog appears → user confirms → task is removed.
5. **Filter:** User selects a filter tab/button (All / Active / Completed) → list updates to show matching tasks.
6. **Sort:** Tasks are sorted by due date ascending by default; tasks without due dates appear at the end.

### States

- **Empty state:** No tasks yet — show a helpful message and call-to-action to add the first task.
- **All completed:** All tasks done — show a congratulatory or informational message.
- **Filter yields no results:** Show contextual empty state (e.g., "No active tasks").

## Acceptance Criteria

1. **REQ-1** — When the user submits the add-task form with a valid title, the system shall create a new task with the provided fields and display it in the task list.
2. **REQ-1** — If the user submits the form without a title, the system shall display a validation error and prevent submission.
3. **REQ-2** — The system shall display all tasks showing title, priority indicator, due date (if set), and completion status.
4. **REQ-3** — When the user toggles a task's completion status, the system shall immediately update the visual state and persist the change to localStorage.
5. **REQ-4** — When the user edits a task and saves, the system shall update the task with the new values and persist changes to localStorage.
6. **REQ-5** — When the user clicks delete on a task, the system shall show a confirmation dialog before removing the task.
7. **REQ-5** — If the user cancels the delete confirmation, the system shall retain the task unchanged.
8. **REQ-6** — When the page loads, the system shall restore all tasks from localStorage and render them.
9. **REQ-6** — When any task is created, updated, or deleted, the system shall synchronize the full task list to localStorage.
10. **REQ-7** — Where the filter is set to "Active", the system shall display only tasks where completed is false.
11. **REQ-7** — Where the filter is set to "Completed", the system shall display only tasks where completed is true.
12. **REQ-8** — The system shall sort tasks by due date ascending, with null due dates appearing after all dated tasks.
13. **REQ-9** — The system shall render each priority level with a visually distinct indicator (color-coded badge or similar).
14. **REQ-10** — The layout shall adapt responsively from 320px to 1440px+ viewports without horizontal scrolling or content overflow.
15. **REQ-13** — If localStorage is unavailable, then the system shall fall back to in-memory storage without errors.

## Dependencies & Constraints

- **Zustand** will be added as a new dependency for client-side state management (justified: prescribed by project skill, manages complex cross-component state, decoupled actions pattern).
- **React Hook Form + Zod** may be added for form handling and validation (listed in project tech stack per AGENTS.md but not yet installed).
- Must follow existing project conventions: kebab-case files, named exports, feature-folder structure, shadcn/ui components, Tailwind CSS styling, `@base-ui/react` primitives.
- The current home page (`web/features/home/home-page.tsx` and `web/app/page.tsx`) will be replaced.
- No backend or API dependencies.

## Risks & Open Questions

1. **localStorage quota:** localStorage is limited to ~5MB in most browsers. For a personal to-do app this is more than sufficient, but no quota-warning mechanism is planned. _Low risk._
2. **No data migration:** If the localStorage data shape changes in a future iteration, existing saved tasks may be incompatible. _Recommendation:_ include a schema version field in the stored data for future-proofing.
3. **No undo:** Deletion is permanent after confirmation. This is accepted for v1 scope.

## References

- [web/features/home/home-page.tsx](web/features/home/home-page.tsx) — existing feature entry component pattern
- [web/app/page.tsx](web/app/page.tsx) — route file to be updated
- [web/components/ui/button.tsx](web/components/ui/button.tsx) — UI component pattern (cva + Base UI primitives)
- [web/components/ui/card.tsx](web/components/ui/card.tsx) — compound component pattern
- `.github/skills/zustand/SKILL.md` — Zustand decoupled actions pattern
- `.github/skills/web-project-conventions/SKILL.md` — file/folder naming conventions
- `.github/skills/ui-components/SKILL.md` — component creation guidelines

## Verification Readiness

1. Add 3+ tasks with varying priorities and due dates → verify list displays correctly, sorted by due date.
2. Edit a task's title and priority → verify changes persist after page refresh.
3. Toggle a task complete → filter to "Active" → verify completed task is hidden.
4. Delete a task → confirm dialog appears → confirm → verify task is removed and stays removed after refresh.
5. Clear all tasks → verify empty state message appears.
6. Open browser DevTools → delete localStorage key → reload → verify app loads without errors (graceful degradation).
7. `bun run lint` and `bun run build` from `web/` pass without errors.

## Decisions

- **localStorage over server-side:** User explicitly chose client-side persistence. No backend needed for v1.
- **Replace home page:** The to-do app becomes the primary `/` route, replacing the existing home page.
- **No auth:** App is open to anyone — single-user, single-browser experience.
- **Priority levels:** Low / Medium / High / Urgent (4 levels, user-selected).
