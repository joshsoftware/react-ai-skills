# BFSI React — Bootstrap Scripts

A single script and one Claude prompt take you from nothing to a tailored,
AI-ready BFSI React project.

The flow is straightforward:

| Step | React flow |
| ---- | ---------- |
| 1 | `create_react_project.sh` — scaffolds a Vite + React + TS app and copies the `.claude` toolkit |
| 2 | `cd project_name && claude` → tell Claude **"Initialize this project"** |
| 3 | The `bfsi-bootstrap` skill builds the complete foundation |

**The boilerplate is not cloned.** A fresh app is generated with **npm**, and the
`bfsi-bootstrap` skill — which contains the complete boilerplate setup spec —
drives Claude to build out the full BFSI foundation.

```text
reactjs/
├── bootstrap/
│   └── create_react_project.sh          # npm create vite + clone .claude toolkit
└── bfsi-boilerplate/
    └── .claude/skills/bfsi-bootstrap/   # the "complete boilerplate setup" skill
```

## Prerequisites

- `git`, `node` (≥ 20), `npm`
- For step 2: the [`claude`](https://code.claude.com) CLI
- On Windows: run via **Git Bash** or **WSL**

## Step 1 — Create the base project

Generates a fresh Vite + React + TypeScript app with npm (non-interactive, so it
does **not** auto-install or launch the dev server), then copies the `.claude`
toolkit (skills/agents/commands/hooks) and a starter `CLAUDE.md` into the project.

### Download Bootstrap Script

```bash
curl -O https://raw.githubusercontent.com/joshsoftware/ai-assistant-skilles/main/reactjs/bootstrap/create_react_project.sh
```

Make it executable:

```bash
chmod +x create_react_project.sh
```

### Create Claude Project

```bash
./create_react_project.sh my-bank-app
```

Open:

```bash
cd my-bank-app
claude
```

### Create Cursor Project

```bash
./create_react_project.sh my-bank-app cursor
```

Open:

```bash
cd my-bank-app
cursor .
```

What it does:

1. `npm create vite@latest my-bank-app -- --template react-ts --no-interactive`
   — non-interactive, so it scaffolds and exits; it does **not** auto-install
   dependencies or launch the dev server.
2. Sparse-clones the repo and copies the `.claude/` toolkit **and** a starter
   `CLAUDE.md` into `my-bank-app/`.
3. `npm install` (skip with `NO_INSTALL=1`).

The starter `CLAUDE.md` is copied as-is; the `bfsi-bootstrap` skill (Step 2)
refines it. Cursor mode mirrors `.claude/skills` → `.cursor/skills` and writes
the bootstrap skill to `AGENTS.md`.

| Env var       | Default                              | Purpose            |
| ------------- | ------------------------------------ | ------------------ |
| `BFSI_BRANCH` | `main`                               | Branch to clone    |
| `BFSI_REPO`   | `joshsoftware/ai-assistant-skilles`  | Repo to clone      |
| `NO_INSTALL`  | _(unset)_                            | `1` to skip install|

## Step 2 — Generate the boilerplate (skill-driven)

Once the project is created, enter it and launch Claude. The **`bfsi-bootstrap`**
skill builds the complete foundation from scratch — dependencies (npm), tooling
config, folder structure, HTTP/PII/i18n primitives, routing, layouts, and the
`login` reference feature — **without scaffolding business features**.

```bash
cd my-bank-app
claude
```

Then tell Claude:

```
Initialize this project
```

Claude will automatically invoke the `bfsi-bootstrap` skill and generate the
entire BFSI boilerplate. You can also say **"set up the BFSI boilerplate"**,
**"bootstrap this project"**, or **"build the foundation"** — the skill
recognises all of these phrases.

## Step 3 — Build features

```text
/bfsi-feature KycVerification
```

Set the canonical pattern in the first feature, commit it, then build the rest in
fresh sessions primed off that commit (see the working discipline in the
generated `CLAUDE.md`). Run the app with `npm run dev`.