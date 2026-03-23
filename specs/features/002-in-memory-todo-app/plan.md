## Plan: In-Memory Todo App

Build a focused Todo feature in the existing Next.js App Router web app using local React state only. Follow the current feature-first structure, mount the page via a new `/todos` route, and reuse existing UI primitives so no new dependencies are needed.

**Steps**

1. Confirm scope and persistence model: store todos only in runtime memory (React state), so items reset on page reload; exclude browser persistence (`localStorage`), backend APIs, auth integration, and sync.
2. Create a feature entry component under the todo feature as a client component that owns todo state and actions (`add`, `toggle complete`, `delete`).
3. Add focused presentational components under the todo feature for input/form and list rendering; pass behavior via props from the feature entry to keep state centralized. _depends on 2_
4. Add a new App Router page for `/todos` that renders the todo feature, following the same route-to-feature pattern as `web/app/page.tsx`. _parallel with 3 after 2 starts_
5. Apply repository UI conventions: reuse `web/components/ui/button.tsx`, `web/components/ui/card.tsx`, and `web/components/ui/heading.tsx`; use `web/components/lib/utils.ts` when class composition is needed. _parallel with 3_
6. Handle UX edge states in the feature: empty-list messaging, basic input validation (ignore blank values), and clear styling for completed items.
7. Verify quality bar from `web/package.json` scripts by running format/lint/build from the `web/` directory, then manually sanity-check `/todos` in dev.

**Relevant files**

- `web/app/page.tsx` — reference route-to-feature wiring pattern.
- `web/features/home/home-page.tsx` — reference feature component structure/style baseline.
- `web/components/ui/button.tsx` — reuse for add/delete/toggle actions.
- `web/components/ui/card.tsx` — reuse for todo container layout.
- `web/components/ui/heading.tsx` — reuse for heading consistency.
- `web/components/lib/utils.ts` — reuse `cn()` utility for conditional styles.
- `web/app` — add the new `/todos` route page here.
- `web/features` — add the new todo feature module and its components here.

**Verification**

1. From `web/`, run `bun run format` and confirm no formatting errors.
2. From `web/`, run `bun run lint` and confirm no lint errors.
3. From `web/`, run `bun run build` and confirm production build succeeds.
4. From `web/`, run `bun run dev`, open `/todos`, and verify add/toggle/delete behavior plus empty-state messaging.
5. Reload `/todos` and verify todos reset, confirming in-memory-only behavior.

**Decisions**

- Included: Single-page todo feature with local runtime state and basic interactions.
- Excluded: Persistence (`localStorage`, IndexedDB), backend/API, multi-user collaboration, auth-bound todos, and advanced filtering/sorting.
- Assumption: “stores todos locally in memory” means state survives only while the current app session is running.

**Further Considerations**

1. Route naming recommendation: keep `/todos` for clarity and parity with feature name.
2. Component split recommendation: keep to 2-3 focused components initially to preserve a small, reviewable diff.
3. Optional follow-up feature: add `localStorage` hydration/persistence in a separate spec.
