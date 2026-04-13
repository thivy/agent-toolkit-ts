## GitHub Copilot Agent Toolkit

This repo showcases GitHub Copilot coding agents and reusable skills that speed up modern frontend development. It pairs a Next.js (App Router) demo app with curated agent/skill guidance for Tailwind CSS, shadcn/ui components, and Zustand state management.

## What You Get

- A working Next.js app under [web/](web/) for hands-on examples.
- A 2-phase agent workflow under [.github/agents/](.github/agents/) for requirements discovery and implementation planning.
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
- [.github/agents/](.github/agents/) - Built-in planning agents:
  - [🔎 Discover](.github/agents/discover.agent.md) - Researches the request, aligns with the user, and writes the feature PRD to `requirement.md`.
  - [⚒️ Forge](.github/agents/forge.agent.md) - Uses the approved PRD to produce an execution-ready implementation plan in `plan.md`.
- [web/](web/) - Next.js application code.
- [.github/skills/](.github/skills/) - Skill references that guide Copilot on React composition, Next.js patterns, UI composition, and state management.

## Agent Workflow

Use the two agents in order for spec-driven delivery:

1. **🔎 Discover** → capture requirements, research constraints, and produce an approved PRD.
2. **⚒️ Forge** → turn the approved PRD into an execution-ready implementation plan.

Each agent is phase-scoped and writes only its own artifact under `specs/features/{NNN}-{feature-name}/`: Discover owns `requirement.md`, and Forge owns `plan.md`.

## Quick Start

From [web/](web/):

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Use With GitHub Copilot

Select the `Discover agent` and provide a feature request. For example:

```markdown
I want to build a fast guest check-in web app that captures first name, last name, and an webcam photo.

- the initial screen should always show the camera feed in the middle of the screen
- on right side of the screen, there should be a form to enter first name and last name, and a check in button
- on the left it should show all the guests that have been checked in during the current day, with their name and photo and the ability to click and sign out guests (which removes them from the checked in list)
- once a guest is successfully checked in, the UI should reset and show a success message and add the guest to the checked in list on the left.

- I want all information to be stored locally in the browser using IndexedDB.
```

Then select the `Forge agent` to turn the approved PRD into an implementation plan.

```markdown
Help me write an implementation plan for the attached requirement.
```

The skills in this repo are optimized to keep edits small, consistent, and aligned with the stack.
