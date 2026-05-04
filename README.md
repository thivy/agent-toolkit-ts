## GitHub Copilot Agent Toolkit

This repo showcases GitHub Copilot coding agents and reusable skills that speed up modern frontend development. It pairs a Next.js (App Router) demo app with curated agent/skill guidance for Tailwind CSS, shadcn/ui components, and Zustand state management.

## What You Get

- A working Next.js app under [web/](web/) for hands-on examples.
- A 2-step planning workflow with prompt entry points `create-spec` and `create-plan`.
- Direct agent entry points `spec` and `planner` for the same planning workflow.
- Prompt, agent, and skill docs under [.github/](.github/) to guide Copilot on best practices.
- Consistent conventions for components, features, and state that keep changes small and reviewable.

## Stack Focus

- Next.js (App Router)
- Tailwind CSS
- shadcn/ui component library
- Zustand (decoupled actions pattern)
- Bun for package management and scripts

## Repo Tour

- [AGENTS.md](AGENTS.md) - How agents should work in this repo.
- [.github/prompts/](.github/prompts/) - Prompt entry points for the planning workflow:
  - [create-spec](.github/prompts/create-spec.prompt.md) - Uses the `spec` agent to research the request and write `spec.md`.
  - [create-plan](.github/prompts/create-plan.prompt.md) - Uses the `planner` agent to turn an approved `spec.md` into `plan.md`.
- [.github/agents/](.github/agents/) - Direct planning agents for the same two-step workflow:
  - [spec](.github/agents/spec.agent.md) - Researches the request and writes the feature PRD to `spec.md`.
  - [planner](.github/agents/planner.agent.md) - Uses the approved `spec.md` to produce an execution-ready implementation plan in `plan.md`.
- [web/](web/) - Next.js application code.
- [.github/skills/](.github/skills/) - Skill references that guide Copilot on React composition, Next.js patterns, UI composition, and state management.

## Planning Workflow

Use either entry point, but keep the sequence the same every time:

| Step             | Prompt-driven path                                | Direct-agent path                             | Output                                        |
| ---------------- | ------------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| 1. Specification | `create-spec`                                     | `spec`                                        | `specs/features/{NNN}-{feature-name}/spec.md` |
| 2. Planning      | `create-plan` after the specification is approved | `planner` after the specification is approved | `specs/features/{NNN}-{feature-name}/plan.md` |

The prompts are the guided entry points for the same workflow: `create-spec` uses `spec`, and `create-plan` uses `planner`.

## Quick Start

From [web/](web/):

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Use With GitHub Copilot

You can start with prompts or invoke the agents directly. Both paths produce the same artifacts in the same order.

### Prompt-Driven Path

Run the `create-spec` prompt with a feature request. For example:

```markdown
I want to build a fast guest check-in web app that captures first name, last name, and an webcam photo.

- the initial screen should always show the camera feed in the middle of the screen
- on right side of the screen, there should be a form to enter first name and last name, and a check in button
- on the left it should show all the guests that have been checked in during the current day, with their name and photo and the ability to click and sign out guests (which removes them from the checked in list)
- once a guest is successfully checked in, the UI should reset and show a success message and add the guest to the checked in list on the left.

- I want all information to be stored locally in the browser using IndexedDB.
```

This creates the PRD at `specs/features/{NNN}-{feature-name}/spec.md`.

After the specification is approved, run the `create-plan` prompt for the same feature folder to create `specs/features/{NNN}-{feature-name}/plan.md`.

### Direct-Agent Path

1. Use `spec` with the same feature request to produce `specs/features/{NNN}-{feature-name}/spec.md`.
2. After the specification is approved, use `planner` for the same feature to turn that specification into `specs/features/{NNN}-{feature-name}/plan.md`.

The skills in this repo are optimized to keep edits small, consistent, and aligned with the stack.
