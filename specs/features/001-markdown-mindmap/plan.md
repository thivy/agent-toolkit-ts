## Plan: Markdown To Mindmap

Build a new web feature that lets the user choose a markdown file already saved inside the repository, parse its heading and list structure into a normalized tree, and render that tree as an interactive mindmap view. The implementation should follow existing web feature conventions, keep file system access server-side, and keep the first iteration focused on deterministic parsing and clear UX feedback.

**Steps**

1. Phase 1 - Feature framing and contracts
   1.1 Define the supported markdown subset for V1: ATX headings (# to ######), nested unordered lists, ordered lists, and paragraph text under current node.
   1.2 Define a MindmapNode contract in a shared feature type file with stable id, label, children, and optional metadata (depth, source line, kind).
   1.3 Define explicit out-of-scope behavior for V1: no Mermaid, no embedded HTML parsing, no cross-file wiki links, no image node rendering.
2. Phase 2 - Server-side file discovery and loading (blocks Phase 3)
   2.1 Add a server-side module to enumerate allowed markdown files under a safe project-relative directory boundary.
   2.2 Add a server action or route handler that accepts a selected relative path, validates traversal safety, reads file content, and returns normalized text or a typed error.
   2.3 Add input validation with clear error categories: file-not-found, forbidden-path, unsupported-encoding, empty-content.
3. Phase 3 - Markdown parsing and transformation (depends on 2)
   3.1 Add a markdown parsing utility in shared feature code, using a markdown AST pipeline.
   3.2 Convert parsed AST to MindmapNode tree with deterministic parent-child rules:

- Headings create major branches.
- List items become child nodes under nearest heading or root.
- Paragraph-only documents map to root child nodes.
  3.3 Add normalization rules: trim labels, collapse duplicate whitespace, skip empty nodes, preserve input order.
  3.4 Add unit tests for parser edge cases and malformed markdown tolerance.

4. Phase 4 - Mindmap UI feature (parallel with Phase 3.4 tests after parser API stabilizes)
   4.1 Create a new feature module for the mindmap page with three UI states: idle, loading, and rendered/error.
   4.2 Add a file picker UI (repository markdown files only) and a generate action.
   4.3 Render tree output as an interactive mindmap-style visualization (expand/collapse branches, selectable active node, scroll-safe layout).
   4.4 Add empty/error messaging for unsupported markdown patterns and file load failures.
5. Phase 5 - Route integration and app wiring (depends on 4)
   5.1 Add a dedicated route for the mindmap feature and link entry from the home page.
   5.2 Keep feature boundaries aligned with web project conventions: feature logic in web/features/mindmap, shared parsing/file utilities in web/features/shared.
6. Phase 6 - Verification and hardening
   6.1 Run format, lint, and build from the web directory.
   6.2 Manually verify desktop and mobile behavior for long files, deep nesting, and narrow viewport overflow.
   6.3 Validate security constraints by testing path traversal attempts and non-markdown file selection handling.

**Relevant files**

- /specs/features/001-markdown-mindmap/plan.md - this implementation plan.
- /web/app/page.tsx - add entry point link to the mindmap route.
- /web/app/(mindmap)/page.tsx or /web/app/mindmap/page.tsx - create route-level page for the new feature.
- /web/features/mindmap/mindmap-page.tsx - feature entry UI and interaction orchestration.
- /web/features/mindmap/components/\* - visualization and control components (picker, canvas/tree, node details).
- /web/features/shared/markdown-parser.ts - markdown AST to MindmapNode transformer.
- /web/features/shared/file-service.ts - safe markdown file enumeration and read helpers.
- /web/features/mindmap/types.ts - shared feature contracts, including MindmapNode.
- /web/package.json - add markdown parsing dependency set if missing.

**Verification**

1. From web directory run bun run format and confirm formatting completes.
2. From web directory run bun run lint and confirm zero lint errors.
3. From web directory run bun run build and confirm successful production build.
4. Manual checks:

- Select a valid markdown file and verify a tree renders with expected hierarchy.
- Verify empty markdown shows a graceful empty-state message.
- Verify invalid path input is rejected with a safe error.
- Verify deep nested lists remain navigable on mobile and desktop.

5. Add parser-level unit tests that cover heading-only, list-only, mixed, and malformed markdown inputs.

**Decisions**

- Included scope: markdown file selection from local repository, parsing into canonical tree, and interactive mindmap rendering in web UI.
- Excluded scope: exporting to PNG/SVG, collaborative editing, drag-and-drop node editing, and external file system browsing outside allowed workspace paths.
- Assumption: feature is intended for the Next.js web app (web/) rather than a separate CLI.
- Assumption: local file means files inside repository boundaries and not arbitrary user machine paths.

**Further Considerations**

1. Visualization approach recommendation:
   Option A: Render a custom collapsible tree layout first (lowest complexity, fastest delivery).
   Option B: Integrate a graph library for radial mindmap layout (better visuals, higher complexity).
   Option C: Start with A and keep adapter boundary so B can be swapped in later.
2. Parsing strategy recommendation:
   Option A: Support headings + lists only in V1 for deterministic behavior.
   Option B: Attempt full markdown construct coverage immediately.
   Option C: Start with A and add constructs incrementally behind parser tests.
3. File source recommendation:
   Option A: Restrict to a configured docs/content directory.
   Option B: Allow full repository markdown discovery with denylist support.
   Option C: Start with B plus strict traversal checks and max-file-size guard.
