# AGENTS.md — Project Guidelines for AI Assistants

Guidelines for AI assistants (e.g., Codex, GitHub Copilot) contributing to this repo.

## 1. Golden rules

- Make small, correct, reviewable changes. Prefer the simplest solution that fits existing patterns.
- Keep diffs minimal; don’t refactor unrelated code.
- Prefer existing repo patterns over general best practices.
- Don’t add dependencies unless clearly necessary (explain why).
- Use Bun-native runtime APIs and patterns where possible, and avoid Node.js-specific runtime dependencies unless required.
- Before implementing any Next.js features, check the `nextjs` skills in the repo for project best practices.
- Before implementing any Bun features, check the `bun` skills in the repo for project best practices.
- Before implementing any state management features, check the `zustand` skills in the repo for project best practices.

## 2. Tech Stack

- Framework: Next.js (App Router) — see `web/package.json` for the exact version
- Runtime / package manager: Bun
- Bun in Docker: prefer Bun-native APIs and container-safe patterns (check Bun docs when unsure).
- UI: shadcn/ui components (built on Base UI primitives)
- Styling: Tailwind CSS
- Linting/formatting: oxlint / oxfmt (run via repo scripts)
- Type checking: TypeScript
- Forms: React Hook Form + Zod validation

## 3. Use MCP and SKILLs

When answering questions—especially about framework/library APIs—prefer MCP-backed documentation tools so guidance stays current.

- NextJS and ReactJS patters using the skills in `.github\skills\react-best-practices`
- Microsoft Foundry: Build AI integration using the skills in `.github\skills\microsoft-foundry-ts`
- State management using zustand patters using the skills in `.github\skills\zustand`
- Bun: You must use `query-docs` MCP for runtime/package-manager APIs and container-safe patterns, with the `resolve-library-id` as `/websites/bun_sh`.
- UI libraries: You must use `query-docs` MCP for UI components with the `resolve-library-id` as `/websites/ui_shadcn`.
- Tailwind CSS: You must use `query-docs` MCP for Tailwind CSS v4 documentation and examples with the `resolve-library-id` as `/websites/tailwindcss`.

If MCP tools are unavailable, use official docs plus the versions in `package.json` / lockfiles, and prefer reading existing repo code over assumptions.


## 5. Quality Bar

Run these from the root directory:

- Lint: `bun run lint`
- Format: `bun run format`

Also:

- Run relevant tests (if any).
- Manually sanity-check the affected page/component in dev.

## 6. When Changing Behavior

- Update/add tests if the repo has tests.
- Update docs/README if user-facing behavior changes.

## 7. Final Response Requirements

Include:

- What you changed (1–5 bullets)
- Why you changed it
- How you verified it (exact commands + results; if you couldn’t run commands, say so)
- Any follow-ups or risks (if applicable)
