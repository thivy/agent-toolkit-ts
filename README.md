## GitHub Copilot Agent Toolkit

This repo showcases GitHub Copilot coding agents and reusable skills that speed up modern frontend development. It pairs a Next.js (App Router) demo app with curated agent/skill guidance for Tailwind CSS, shadcn/ui components, and Zustand state management.

## What You Get

- A working Next.js app under [web/](web/) for hands-on examples.
- A 3-phase agent workflow under [.github/agents/](.github/agents/) for requirements, technical design, and task planning.
- Agent and skill docs under [.github/skills/](.github/skills/) to guide Copilot on best practices.
- Consistent conventions for components, features, and state that keep changes small and reviewable.

## Stack Focus

- Next.js (App Router)
- Tailwind CSS
- shadcn/ui component library
- Zustand (decoupled actions pattern)
- Bun for package management and scripts

## Repo Tour

- [AGENTS.md](AGENTS.md) - How agents should work in this repo.
- [.github/agents/](.github/agents/) - Built-in multi-phase planning agents:
  - [📋 Requirements](.github/agents/requirements.agent.md) - Defines clear, testable feature requirements.
  - [📝 Plan](.github/agents/plan.agent.md) - Converts approved requirements into technical design.
  - [✅ Task](.github/agents/task.agent.md) - Breaks approved design into actionable implementation tasks.
- [web/](web/) - Next.js application code.
- [.github/skills/](.github/skills/) - Skill references that guide Copilot on React composition, Next.js patterns, UI composition, and state management.

## Agent Workflow

Use the three agents in order for spec-driven delivery:

1. **📋 Requirements** → capture and approve what to build.
2. **📝 Plan** → define architecture and implementation approach.
3. **✅ Task** → generate an execution-ready task breakdown.

Each agent is phase-scoped and writes only its phase artifact under `specs/features/{NNN}-{feature-name}/`.

## Quick Start

From [web/](web/):

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Use With GitHub Copilot

Ask Copilot to:

- Generate new UI using existing shadcn/ui primitives.
- Extend features using the composition patterns in the skills.
- Create or refactor Zustand stores using the decoupled actions template.

The skills in this repo are optimized to keep edits small, consistent, and aligned with the stack.
