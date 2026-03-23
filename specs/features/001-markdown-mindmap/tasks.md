## Implementation Tasks: Markdown Mindmap With React Flow

Create a dependency-aware implementation plan that delivers markdown-to-mindmap in vertical slices while preserving Next.js feature boundaries and server-side file safety. This task plan is provisional because the approved plan file does not contain explicit REQ-\* identifiers; provisional REQ tokens are defined below for traceability and must be reconciled in the planning phase.

## Traceability Baseline

Status: Provisional task draft due to missing REQ-_ in [specs/features/001-markdown-mindmap/plan.md](specs/features/001-markdown-mindmap/plan.md).
Blocker: Planning artifact lacks explicit REQ-_ IDs and formal approval marker.
Resolution expectation: Planning phase updates plan.md with canonical REQ-\* and approval note; this tasks file can then be re-keyed without changing execution order.

### Provisional Requirements Map (derived from approved plan intent)

- REQ-001: User can select a markdown file stored inside repository boundaries.
- REQ-002: System securely reads selected markdown with traversal prevention and typed error handling.
- REQ-003: System transforms markdown headings/lists/paragraphs into a deterministic MindmapNode tree.
- REQ-004: UI renders an interactive mindmap with idle/loading/success/error states.
- REQ-005: Feature is routable from the app and follows web project conventions.
- REQ-006: Feature passes formatting, lint, build, parser tests, and manual responsive/security checks.

### Design Token Map (DES-\*)

- DES-001: V1 markdown subset is ATX headings, ordered/unordered nested lists, and paragraph text.
- DES-002: Canonical MindmapNode includes stable id, label, children, and optional metadata.
- DES-003: Markdown file discovery is server-side and constrained to safe project-relative paths.
- DES-004: File load layer returns typed errors (file-not-found, forbidden-path, unsupported-encoding, empty-content).
- DES-005: Parsing uses markdown AST pipeline in shared feature logic.
- DES-006: AST-to-tree mapping rules are deterministic (heading branches, lists under nearest heading/root, paragraph-only fallback).
- DES-007: Normalization trims labels, collapses whitespace, skips empty nodes, preserves order.
- DES-008: UI state model includes idle, loading, rendered, and error.
- DES-009: Code placement follows feature/shared boundaries under web/features.
- DES-010: Mindmap rendering uses React Flow as the V1 visualization engine.
- DES-011: Security verification includes traversal and non-markdown rejection behavior.

## Steps

### Phase A: Contracts and parsing baseline

- [x] 1.0 Establish mindmap contracts and parser interfaces
- [x] 1.1 Define `MindmapNode` and parser input/output contracts in `web/features/mindmap/types.ts`; objective is stable type-first foundation for all downstream modules; expected outcome is shared contracts consumed by parser, server action/route, and UI.
  - Files/symbols: `web/features/mindmap/types.ts`, `MindmapNode`, `ParseMarkdownInput`, `ParseMarkdownResult`.
  - Requirements: REQ-003.
  - Design: DES-001, DES-002.
  - Done When: Type definitions compile and are imported by parser and UI modules without duplicate local node types.
- [x] 1.2 Implement markdown parser adapter and AST-to-tree transformer in `web/features/shared/markdown-parser.ts`; objective is deterministic conversion from markdown content into MindmapNode tree; expected outcome is reusable pure transformation API.
  - Files/symbols: `web/features/shared/markdown-parser.ts`, `parseMarkdownToMindmap`, `mapAstToMindmapNodes`.
  - Requirements: REQ-003.
  - Design: DES-001, DES-005, DES-006, DES-007.
  - _depends on 1.1_
  - Done When: Transformer returns deterministic node order and structure across repeated runs on same input.
- [x] 1.3 Add parser unit tests for heading-only, list-only, mixed-content, malformed markdown, and paragraph-only files; objective is parser confidence before UI wiring; expected outcome is regression-safe parsing behavior.
  - Files/symbols: `web/features/shared/markdown-parser.test.ts` (or existing test convention equivalent).
  - Requirements: REQ-003, REQ-006.
  - Design: DES-001, DES-006, DES-007.
  - _depends on 1.2_
  - Done When: Tests cover documented edge cases and pass locally.

### Phase B: Secure file discovery and loading

- [x] 2.0 Build server-side markdown file access layer
- [x] 2.1 Implement safe markdown file enumeration utility in `web/features/shared/file-service.ts`; objective is bounded repository-local file selection; expected outcome is sanitized relative file list for UI selection.
  - Files/symbols: `web/features/shared/file-service.ts`, `listMarkdownFiles`, `isAllowedMarkdownPath`.
  - Requirements: REQ-001, REQ-002.
  - Design: DES-003, DES-011.
  - Done When: Enumeration excludes paths outside allowed root and includes only markdown extensions.
- [x] 2.2 Implement typed file-read operation with validation and explicit error taxonomy; objective is secure file read with reliable UI-consumable failures; expected outcome is structured success/error result.
  - Files/symbols: `web/features/shared/file-service.ts`, `readMarkdownFile`, `FileLoadErrorCode`.
  - Requirements: REQ-002.
  - Design: DES-003, DES-004, DES-011.
  - _depends on 2.1_
  - Done When: Traversal attempts and invalid files produce typed errors, not unhandled exceptions.
- [x] 2.3 Add server action or route handler for file list and file parse trigger; objective is thin server boundary between UI and shared logic; expected outcome is input validation + orchestration only.
  - Files/symbols: `web/app/api/mindmap/route.ts` or colocated server action under `web/features/mindmap/`.
  - Requirements: REQ-001, REQ-002, REQ-003.
  - Design: DES-003, DES-004, DES-005, DES-009.
  - _depends on 1.2, 2.2_
  - Done When: Endpoint/action returns consistent typed payloads for list/load/parse flows.

### Phase C: React Flow mindmap feature slice

- [x] 3.0 Implement mindmap feature UI with React Flow
- [x] 3.1 Add feature entry component with state machine and orchestration in `web/features/mindmap/mindmap-page.tsx`; objective is single feature entry coordinating load/parse/render lifecycle; expected outcome is clear idle/loading/rendered/error transitions.
  - Files/symbols: `web/features/mindmap/mindmap-page.tsx`, `MindmapPage`.
  - Requirements: REQ-004.
  - Design: DES-008, DES-009.
  - _depends on 2.3_
  - Done When: UI transitions correctly across initial load, successful render, and typed error cases.
- [x] 3.2 Implement file picker and generate controls using existing UI primitives and blocks; objective is accessible repository markdown selection flow; expected outcome is valid selection triggers server parse operation.
  - Files/symbols: `web/features/mindmap/components/mindmap-file-picker.tsx` plus reused `web/components/ui/*` primitives.
  - Requirements: REQ-001, REQ-004.
  - Design: DES-003, DES-008, DES-009.
  - _depends on 3.1_
  - Done When: User can select discovered markdown file and trigger mindmap generation without direct path text entry.
- [x] 3.3 Add React Flow renderer adapter that maps MindmapNode tree into nodes/edges; objective is React Flow-based visual mindmap implementation per user direction; expected outcome is expandable/collapsible, selectable node graph with overflow-safe canvas behavior.
  - Files/symbols: `web/features/mindmap/components/mindmap-flow-canvas.tsx`, `toReactFlowNodesAndEdges`, `onNodeToggle`.
  - Requirements: REQ-004.
  - Design: DES-002, DES-006, DES-008, DES-010.
  - _depends on 1.1, 3.1_
  - Done When: Parsed tree renders in React Flow with stable ids, selectable node focus, and controlled branch visibility.
- [x] 3.4 Implement empty/error UX states for unsupported/empty documents and load failures; objective is predictable user feedback; expected outcome is no silent failures.
  - Files/symbols: `web/features/mindmap/components/mindmap-status.tsx`.
  - Requirements: REQ-004.
  - Design: DES-004, DES-008.
  - _parallel with 3.3 after 3.1_
  - Done When: Every typed error path and empty parse result maps to a user-visible message/action.

### Phase D: Route wiring and end-to-end validation

- [x] 4.0 Integrate route and validate end-to-end behavior
- [x] 4.1 Add route module and wire home-page entry point; objective is discoverable feature navigation; expected outcome is dedicated mindmap route reachable from home.
  - Files/symbols: `web/app/mindmap/page.tsx`, `web/app/page.tsx`.
  - Requirements: REQ-005.
  - Design: DES-009.
  - _depends on 3.1_
  - Done When: Navigating to `/mindmap` renders `MindmapPage` and home includes an entry link/action.
- [x] 4.2 Execute repository validation commands and manual QA checks; objective is release readiness; expected outcome is green automation checks plus manual confidence for responsive and security behavior.
  - Files/symbols: no product file changes expected; record results in PR notes.
  - Requirements: REQ-006.
  - Design: DES-011.
  - _depends on 1.3, 2.3, 3.2, 3.3, 3.4, 4.1_
  - Done When: `bun run format`, `bun run lint`, `bun run build`, parser tests, responsive manual test, and traversal rejection checks all pass.

## Relevant files

- `specs/features/001-markdown-mindmap/plan.md` — approved planning source; missing canonical REQ IDs (blocker).
- `specs/features/001-markdown-mindmap/tasks.md` — this implementation task plan.
- `web/features/mindmap/types.ts` — canonical mindmap contracts.
- `web/features/shared/markdown-parser.ts` — markdown AST transformation logic.
- `web/features/shared/file-service.ts` — secure markdown discovery and read logic.
- `web/app/api/mindmap/route.ts` or feature-colocated server action — server boundary.
- `web/features/mindmap/mindmap-page.tsx` — feature orchestrator.
- `web/features/mindmap/components/mindmap-file-picker.tsx` — file selection controls.
- `web/features/mindmap/components/mindmap-flow-canvas.tsx` — React Flow renderer.
- `web/features/mindmap/components/mindmap-status.tsx` — empty/error state UI.
- `web/app/mindmap/page.tsx` and `web/app/page.tsx` — route integration and entry link.
- `web/package.json` — add React Flow and parser dependencies if absent.

## Verification

1. Run from `web/`: `bun run format` and confirm success.
2. Run from `web/`: `bun run lint` and confirm zero errors.
3. Run from `web/`: `bun run build` and confirm successful production build.
4. Run parser tests and confirm coverage for heading-only, list-only, mixed, malformed, and paragraph-only markdown.
5. Manual: generate mindmap from valid markdown, verify React Flow rendering and interactions.
6. Manual: verify empty markdown and typed file errors produce user-visible states.
7. Manual: verify path traversal and non-markdown selection are rejected safely.
8. Manual: verify mobile and desktop usability for deep nesting and long files.

## Decisions

- Included in scope: repository-local markdown selection, secure load/parse pipeline, React Flow mindmap rendering, route integration, and validation.
- Excluded from scope: export image/vector, collaborative editing, drag-drop node editing, and arbitrary local machine path browsing.
- User-directed update captured: React Flow is selected for V1 renderer (DES-010), superseding undecided visualization option in plan further considerations.

## Further Considerations

1. Planning-phase follow-up: add canonical REQ-\* IDs and approval marker in plan.md, then re-key provisional REQ mapping in this tasks file.
2. Execution-phase follow-up: decide whether to include node auto-layout strategy in first React Flow slice or defer to enhancement.
3. Execution-phase follow-up: define max markdown file size threshold for safe server parsing behavior.
