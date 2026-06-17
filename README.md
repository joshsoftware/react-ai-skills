# BFSI React Boilerplate

A production-grade React starter for **BFSI (Banking, Financial Services & Insurance)** applications. This repository is the canonical boilerplate for all BFSI front-end projects in our organisation — clone it, rename it, and start delivering features against the conventions that are already in place.

It bakes in:

- A secure-by-default stack (React 19 + Vite 5 + TypeScript strict).
- BFSI-specific guardrails: PII masking, in-memory tokens, Zod-validated boundaries, protected routes, encryption helpers.
- A complete **Claude Code** toolkit — skills, agents, and slash commands wired into `.claude/` — so AI-assisted work follows the same conventions as a human reviewer.
- Husky + lint-staged + commitlint with **Conventional Commits (BFSI types)**.
- Auto-review on every Claude turn that flags P0/P1 issues before they ship.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Prerequisites](#prerequisites)
3. [Clone & run](#clone--run)
4. [Available scripts](#available-scripts)
5. [Project structure](#project-structure)
6. [Critical BFSI conventions](#critical-bfsi-conventions)
7. [Feature-folder pattern](#feature-folder-pattern)
8. [Layouts (`src/layouts/`)](#layouts-srclayouts)
9. [Auth, tokens, and 401 handling](#auth-tokens-and-401-handling)
10. [Client state with Zustand](#client-state-with-zustand)
11. [Environment variables](#environment-variables)
12. [Testing](#testing)
13. [Performance baseline](#performance-baseline)
14. [Claude Code toolkit](#claude-code-toolkit)
    - [Slash commands](#slash-commands)
    - [Skills](#skills)
    - [Sub-agents](#sub-agents)
15. [Hooks & guardrails](#hooks--guardrails)
16. [Commit & PR conventions](#commit--pr-conventions)
17. [Using this as a boilerplate](#using-this-as-a-boilerplate)
18. [Gotchas](#gotchas)

---

## Tech stack

| Layer         | Choice                                                                      |
| ------------- | --------------------------------------------------------------------------- |
| Framework     | **React 19** + **Vite 5** + **TypeScript** (`strict`)                       |
| Styling       | **Tailwind CSS** + **shadcn/ui** (components owned in `src/components/ui/`) |
| Forms         | **React Hook Form** + **Zod** (`@hookform/resolvers/zod`)                   |
| Routing       | **react-router-dom v6** with `<ProtectedRoute permission="...">`            |
| Server state  | **TanStack Query v5** (`@tanstack/react-query`)                             |
| Client state  | **Zustand v5** (UI-only, never server data)                                 |
| HTTP          | **axios** with a single shared instance and in-memory token                 |
| i18n          | **react-i18next** (`en`, `hi` defaults)                                     |
| Tests (unit)  | **Vitest** + **Testing Library** + **jsdom**                                |
| Tests (E2E)   | **Playwright**                                                              |
| Lint / format | **ESLint 9** (`--max-warnings 0`) + **Prettier**                            |
| Git hooks     | **Husky** + **lint-staged** + **commitlint**                                |

---

## Prerequisites

- **Node.js** >= 20.x (LTS)
- **npm** >= 10.x (bundled with Node 20+)
- **Git** >= 2.40
- A modern browser (Chromium-based recommended for Playwright)

> Windows: PowerShell 7 is supported. macOS / Linux: any POSIX shell.

---

## Clone & run

```bash
# 1. Clone
git clone https://github.com/joshsoftware/react-ai-skills.git my-bank-app
cd my-bank-app

# 2. Remove the upstream git history and start fresh
rm -rf .git && git init

# 3. Install dependencies
npm install

# 4. Set up env — the app will throw a Zod error at boot if this is missing
cp .env.local.sample .env.local
# then open .env.local and fill in real values

# 5. Wire up Husky git hooks
git config core.hooksPath .husky

# 6. Start the dev server (http://localhost:5173)
npm run dev
```

You should see the **login** reference feature at `/login`. Use it as the shape for every new feature you add.

---

## Available scripts

```bash
npm run dev        # Vite dev server on :5173 (with security headers enforced)
npm run build      # tsc --noEmit && vite build (production bundle)
npm run preview    # Preview the production build locally
npm test           # Vitest — single run (CI mode)
npm run test:watch # Vitest — watch mode
npm run test:e2e   # Playwright E2E tests
npm run typecheck  # tsc --noEmit (no emit, just type-check)
npm run lint       # ESLint (--max-warnings 0; warnings fail CI)
npm run lint:fix   # ESLint with autofix
npm run format     # Prettier write across src/**
npm run analyze    # Bundle treemap -> dist/stats.html (auto-opens)
```

---

## Project structure

```
.
├── .claude/                Claude Code config: agents, skills, commands, hooks
│   ├── agents/             Sub-agents (security, code, a11y, PII, perf reviewers)
│   ├── skills/             Reference + action skills (bfsi-feature, bfsi-form, ...)
│   ├── commands/           Slash commands (/bfsi-review, /bfsi-scaffold, ...)
│   └── settings.json       Permission rules + hook registration
├── .husky/                 Git hooks (pre-commit, commit-msg)
├── src/
│   ├── api/                axiosInstance, http helpers (GET/POST/...), queryClient
│   ├── app/                App.tsx (providers), globals.css
│   ├── assets/             logo, images, fonts, icons (Vite-hashed imports — see assets/README.md)
│   ├── components/
│   │   ├── bfsi/           PIIMaskedDisplay and other BFSI primitives
│   │   ├── common/         FormInput, Image (typed wrappers)
│   │   └── ui/             shadcn-managed; add via `npx shadcn-ui@latest add <c>`
│   ├── constants/          endPoints.ts, statusCodes.ts, routes.ts (add queryKeys/regex/app as needed)
│   ├── features/
│   │   └── login/          Reference feature — copy its shape for new features
│   │       ├── components/ LoginForm.tsx
│   │       ├── hooks/      useLogin.ts (thin useMutation wrapper)
│   │       ├── __tests__/  Vitest specs (services, hooks, components, schema)
│   │       ├── index.tsx
│   │       ├── services.ts Typed service functions
│   │       ├── types.ts    Request/response interfaces
│   │       └── utils.ts    Zod schema + form defaults
│   ├── i18n/               react-i18next setup + en/hi translations
│   ├── layouts/            PublicLayout, AppLayout (shared chrome via <Outlet />)
│   ├── lib/
│   │   ├── encryption/     AES-GCM, RSA-OAEP, PBKDF2, envelope helpers
│   │   ├── http/           createAxios, interceptors, error helpers
│   │   ├── pii/            patterns, validators, maskers
│   │   └── utils/          cn() and small utilities
│   ├── routes/             ProtectedRoute + route config (layouts nest routes here)
│   ├── shared/             Cross-feature components (ErrorBoundary, Dashboard placeholder)
│   ├── env.ts              Zod-validated env (throws at boot on bad config)
│   └── main.tsx            Entry point
├── CLAUDE.md               Project context loaded by Claude Code at session start
├── ARCHITECTURE.txt        Detailed architecture guide
├── README.md               This file
├── .env.local.sample       Template — copy to .env.local
├── commitlint.config.cjs   Conventional Commits with BFSI types
├── eslint.config.js        Flat config; --max-warnings 0
├── tailwind.config.ts
├── tsconfig.json           strict TypeScript
└── vite.config.ts
```

---

## Critical BFSI conventions

These are **non-negotiable** and enforced by hooks, lint rules, and review agents.

1. **Tokens never in `localStorage`.** Use `setAuthToken(axiosInstance, token)` from `@/lib/http` at login — the token lives in memory only.
2. **API request/response shapes are typed with TypeScript interfaces** from the feature's `types.ts`, passed explicitly to the HTTP helpers (`POST<IRequest, IResponse>`). These are compile-time types.
3. **PII fields display via `<PIIMaskedDisplay>`.** Never render PAN / Aadhaar / account number / customer ID directly.
4. **No card data in HTML inputs.** Use a tokenised card input component; flag any plain `<input>` capturing PAN/CVV.
5. **Every route is a `<ProtectedRoute permission="...">`** with an explicit permission string. Public routes are the exception, not the default.
6. **No `dangerouslySetInnerHTML`** unless explicitly sanitised. A pre-write hook blocks it.
7. **No `console.log` of PII variables** (PAN, Aadhaar, account, password, OTP). A post-write hook scans for this.
8. **Conventional Commits with BFSI types** — `feat`, `fix`, **`security`**, **`compliance`**, `perf`, `refactor`, `docs`, `style`, `test`, `build`, `ci`, `chore`. No `Co-Authored-By` trailer.
9. **Grep before you reference.** Don't import a function/hook/component you haven't confirmed exists. The `bfsi-no-fabrication` skill (and a PreToolUse hook) enforces this.
10. **Constants are exhaustive.** Adding an endpoint/route/tag means updating the centralised constants file — no inline strings.

The full working-discipline list is in [`CLAUDE.md`](./CLAUDE.md).

---

## Feature-folder pattern

Every feature owns its services, hooks, types, schemas, components, and tests. `src/features/login/` is the working reference — copy its shape.

**`services.ts`** — typed async functions calling the HTTP helpers:

```ts
import { POST } from '@/api/http';
import { ENDPOINTS } from '@/constants/endPoints';
import type { ILoginRequest, ILoginResponse } from './types';

export const loginService = (payload: ILoginRequest): Promise<ILoginResponse> =>
  POST<ILoginRequest, ILoginResponse>(ENDPOINTS.LOGIN, payload);
```

Generic order is `<TRequest, TResponse>` — request first, response second.

**`hooks/useLogin.ts`** — thin `useMutation` wrapper, no baked-in side effects:

```ts
import { useMutation } from '@tanstack/react-query';
import { loginService } from '../services';

export const useLogin = () => useMutation({ mutationFn: loginService });
```

Don't bake `onSuccess` / `onError` into the hook — pass them at the call-site.

**`utils.ts`** — Zod schema + inferred type + defaults:

```ts
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().trim().min(1, 'Password is required'),
});

export type ILoginFormValues = z.infer<typeof loginSchema>;
export const LOGIN_FORM_DEFAULT_VALUES: ILoginFormValues = { username: '', password: '' };
```

Form value types are inferred from the schema — never hand-written.

To scaffold a new feature against this pattern, run `/bfsi-feature` inside Claude Code.

---

## Layouts (`src/layouts/`)

Two layouts ship by default. Both use the React-Router-v6 parent/`<Outlet />` pattern.

| Layout         | Used by                           | Chrome                                                                                          |
| -------------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| `PublicLayout` | Login, public pages               | Slim top bar with brand mark. No nav, no logout.                                                |
| `AppLayout`    | Dashboard and authenticated pages | Sticky header with brand + sign-out button (clears token + query cache, navigates to `/login`). |

Per-route permission stays at the leaf (`<ProtectedRoute permission="...">`), not the layout. Layouts are chrome only.

---

## Auth, tokens, and 401 handling

The shared axios instance has **no per-request token interceptor**. Set the token once on login success:

```ts
import { setAuthToken } from '@/lib/http';
import axiosInstance from '@/api/axiosInstance';

mutate(values, {
  onSuccess: (response) => {
    setAuthToken(axiosInstance, response.token);
    navigate('/dashboard', { replace: true });
  },
});
```

On a `401`, the instance's `onUnauthorized` callback clears the token and redirects to `/login`. See `src/lib/http/interceptors.ts` and the `axios-auth` skill for the full walkthrough.

---

## Client state with Zustand

**TanStack Query owns server state. Zustand owns client (UI) state.** They are complementary — never use Zustand to mirror data that came from the server.

### When to reach for Zustand (decision order)

1. **Server-owned data?** -> TanStack Query (`useQuery` / `useMutation`). Stop.
2. **Local to one component / tight parent-child tree?** -> `useState` / `useReducer`. Stop.
3. **Read in >= 3 distant components or shared across routes?** -> Zustand.
4. **Config that almost never changes (theme, locale)?** -> React Context.

Typical BFSI fits: idle-timer state, MFA challenge id + attempts, multi-step transaction wizard draft, toast/notification queue.

For full setup details, conventions, and the testing pattern, run `/bfsi-zustand-store` inside Claude Code or open `.claude/skills/bfsi-zustand-store/SKILL.md`.

---

## Environment variables

`src/env.ts` validates every `VITE_*` variable through Zod at boot. If anything is missing or wrong, the app **throws immediately** — fix `.env.local` before continuing.

Required keys (see `.env.local.sample` for the full list):

| Variable                         | Purpose                                |
| -------------------------------- | -------------------------------------- |
| `VITE_API_BASE_URL`              | API origin                             |
| `VITE_API_TIMEOUT_MS`            | axios timeout (ms)                     |
| `VITE_AUTH_HEADER_NAME`          | Header used to attach the bearer token |
| `VITE_SENTRY_DSN`                | Optional — leave empty to disable      |
| `VITE_IDLE_TIMEOUT_MS`           | Idle logout (ms)                       |
| `VITE_SENSITIVE_IDLE_TIMEOUT_MS` | Idle logout on transaction routes (ms) |
| `VITE_FEATURE_FLAGS_PROVIDER`    | `local` or your provider               |

> **Do not** rename `.env.local.sample` to `.env.example` — a PreToolUse hook (`env-file-convention.sh`) blocks it.

---

## Testing

- **Unit / component**: `npm test` (Vitest + Testing Library + jsdom). Helpers live in `tests/setup.ts`.
- **E2E**: `npm run test:e2e` (Playwright).
- **Patterns**: see the `testing-patterns` and `bfsi-test-pattern` skills — they cover schema tests, service mocks, TanStack Query hook tests, RHF form tests, and BFSI-specific cases (PII masking, auth bypass, race conditions, a11y).

Reference tests are in `src/features/login/__tests__/`.

---

## Performance baseline

The boilerplate ships sensible defaults so every cloned project starts from the same baseline.

| Optimisation              | Where it lives                                         | Status                                          |
| ------------------------- | ------------------------------------------------------ | ----------------------------------------------- |
| **Vendor code splitting** | `vite.config.ts` `manualChunks`                        | Splits react, forms, i18n into separate chunks  |
| **Route lazy loading**    | `src/routes/index.tsx` — `React.lazy()` + `<Suspense>` | Every feature page is its own chunk             |
| **Query caching**         | `src/api/queryClient.ts`                               | staleTime 60s, gcTime 5m, retry once on 5xx     |
| **Image CLS prevention**  | `src/components/common/Image.tsx`                      | Mandatory width/height; lazy + async by default |
| **Bundle analyzer**       | `npm run analyze`                                      | rollup-plugin-visualizer gated on analyze event |

Per-feature tuning is documented in the `bfsi-perf-react`, `bfsi-perf-real-time`, `bfsi-perf-virtualize-list`, and `perf-tuning` skills.

---

## Claude Code toolkit

This project is set up as a first-class Claude Code workspace. The `.claude/` directory ships with skills, agents, slash commands, and hooks that encode every convention listed above.

> **New to the codebase?** Run `/bfsi-onboarding` for a guided tour, or `/bfsi-doctor` to verify your local setup is healthy.

### Slash commands

| Command                  | Purpose                                                                  |
| ------------------------ | ------------------------------------------------------------------------ |
| `/bfsi-onboarding`       | Guided tour for a new developer on the codebase                          |
| `/bfsi-doctor`           | Health check — env, deps, `.claude` config, hook registration            |
| `/bfsi-feature`          | Scaffold a new feature folder (services + hooks + schema + form + tests) |
| `/bfsi-form`             | Generate an RHF + Zod form against the project's `FormInput` wrapper     |
| `/bfsi-pii-field`        | Render a PII field via `<PIIMaskedDisplay>` with the right pattern       |
| `/bfsi-api-endpoint`     | Add a new endpoint to `endPoints.ts` and wire a typed service            |
| `/bfsi-compliance-check` | Map current branch to RBI / PCI / IRDAI / SOC2 / ISO 27001 controls      |
| `/bfsi-commit`           | Stage and commit using Conventional Commits with the right BFSI type     |
| `/bfsi-review`           | Run the full PR review pipeline (security + code + a11y + PII + perf)    |
| `/bfsi-grep-conventions` | Surface all `// CONVENTION:` breadcrumbs ready to codify                 |
| `/bfsi-scaffold`         | Lower-level scaffolding for files the BFSI skills depend on              |

### Skills

**Architecture & feature shape**: `tanstack-services`, `query-client-setup`, `constants-organization`, `bfsi-zustand-store`, `axios-auth`

**Forms, UI & accessibility**: `bfsi-design-system`, `bfsi-form`, `bfsi-pii-field`, `bfsi-data-table`, `bfsi-confirm-modal`, `bfsi-i18n-key`

**Security & compliance**: `bfsi-encrypt-helper`, `bfsi-error-message`, `bfsi-no-fabrication`, `bfsi-verify-backend`, `bfsi-regulation-quote`, `bfsi-protected-route`, `bfsi-route-constant`

**Performance**: `perf-tuning`, `bfsi-perf-react`, `bfsi-perf-real-time`, `bfsi-perf-virtualize-list`

**Testing**: `testing-patterns`, `bfsi-test-pattern`

### Sub-agents

| Agent                        | Use                                                                |
| ---------------------------- | ------------------------------------------------------------------ |
| `bfsi-pr-reviewer`           | **Orchestrator** — runs the full review pipeline in parallel       |
| `bfsi-architect`             | Design / sanity-check a feature before scaffolding                 |
| `bfsi-security-reviewer`     | OWASP Top 10 + BFSI specifics (CSRF, secrets, weak crypto)         |
| `bfsi-code-reviewer`         | Readability, complexity, test coverage, type safety                |
| `bfsi-accessibility-auditor` | WCAG 2.1 AA — semantics, ARIA, focus, keyboard, contrast           |
| `bfsi-pii-scanner`           | Find PII in console logs, URLs, errors, localStorage, telemetry    |
| `bfsi-performance-reviewer`  | Virtualisation, real-time feeds, render hotspots, bundle deltas    |
| `bfsi-compliance-auditor`    | RBI / PCI-DSS / IRDAI / SOC2 / ISO 27001 control-by-control report |

---

## Hooks & guardrails

The repo ships with PreToolUse, PostToolUse, and Stop hooks registered in `.claude/settings.json`. Highlights:

- **`no-fabrication-guard.sh`** — blocks fabricated imports where the symbol doesn't exist.
- **`protect-skill-mandated.sh`** — blocks `rm` / `git rm` / `mv` of skill-mandated files. Edits are fine; deletions require an explicit override.
- **`env-file-convention.sh`** — blocks renaming `.env.local.sample`.
- **`git-author-guard.sh`** — verifies commit author identity after every commit.
- **Auto-review on Stop** — after every coding turn, a review sub-agent scans the uncommitted diff. If it finds P0 (security / PII / secrets) or P1 (convention violations), it shows the list and offers to fix them.

---

## Commit & PR conventions

- **Conventional Commits** are enforced by `commitlint` + `husky/commit-msg`.
- Allowed types: `feat`, `fix`, `security`, `compliance`, `perf`, `refactor`, `docs`, `style`, `test`, `build`, `ci`, `chore`.
- **No `Co-Authored-By` trailer** — keep commits owned by the actual author.
- `npx lint-staged` runs on `pre-commit`.
- Use `/bfsi-commit` to stage + commit with the right type chosen automatically.

---

## Using this as a boilerplate

When starting a new BFSI project from this repo:

1. **Clone** the repo:
   ```bash
   git clone https://github.com/joshsoftware/react-ai-skills.git my-new-app
   cd my-new-app
   rm -rf .git && git init
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Rename** the project in `package.json` (`name`) and update `CLAUDE.md` with project-specific context.
4. **Set up environment**:
   ```bash
   cp .env.local.sample .env.local
   # edit .env.local with your real API URL and config
   ```
5. **Wire Husky** and make the initial commit:
   ```bash
   git config core.hooksPath .husky
   git add -A
   git commit -m "chore: initialize project from BFSI boilerplate"
   ```
6. **Set the upstream remote**:
   ```bash
   git remote add origin https://github.com/<your-org>/<new-repo>.git
   git push -u origin main
   ```
7. **Run `/bfsi-doctor`** in a Claude Code session to confirm everything is wired.
8. **Build your first feature**:
   ```
   /bfsi-feature KycVerification
   ```
   Set the canonical pattern in the first feature, commit it, then build the rest in fresh sessions primed off that commit.

> Treat the conventions in `CLAUDE.md` and `.claude/` as the contract. Updates to the boilerplate should be PR'd back here so every BFSI project benefits.

---

## Gotchas

- `.env.local` is gitignored. If the app fails at boot with a Zod error, copy `.env.local.sample` -> `.env.local` and fill in real values.
- `src/components/ui/` is shadcn-managed. Add components via `npx shadcn-ui@latest add <component>` — don't hand-author there.
- Dev server enforces tight security headers (`X-Frame-Options: DENY`, etc.). If iframe embedding fails in dev, that's why.
- ESLint runs with `--max-warnings 0`. Warnings fail CI — fix them as they appear.
- **Husky** is wired with `git config core.hooksPath .husky`. If hooks stop firing, check that config first.
- **Fabricated imports are blocked** by `no-fabrication-guard.sh`. If you see it fail, the symbol doesn't exist — grep to find the real name.
- **Skill-mandated files can't be deleted by `rm` / `git rm`.** Edits are fine; deletions require an explicit override.

---

## License

Internal — for use within the organisation. See your team lead for distribution policy.
