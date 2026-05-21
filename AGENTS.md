# Video-Player — AGENTS.md

## Commands
- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (type-check then bundle)
- `npm run lint` — `biome check src/` (lints all src/ via Biome)
- `npm run format` — `biome format --write src/` (auto-format all src/)
- `npm run check` — `biome check --write src/` (lint + format + organize imports in one pass)
- No standalone typecheck script; type-checking only via `build`
- No tests exist in the repo

## Architecture
- **Entry**: `src/main.tsx` → `src/App.tsx` → `VideoPlayerModal` wrapped in `VideoPlayerContext.Provider`
- **State machine**: XState v5 parallel machine (`src/machine/machineVideo.ts`) with 3 regions: `playback` (playing|paused), `muted` (muted|unmuted), `ui` (inline|detached)
- **Context**: `createActorContext` from `@xstate/react` (`src/machine/VideoPlayerContext.ts`)
- **UI**: Ant Design v6 (note: uses new `variant` prop on Button, not `type`)
- **Video**: `react-player` with HLS test stream (hardcoded in machine context)
- **No routing, no codegen, no migrations, no env files**

## TypeScript constraints
- `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax` are all strict — use `import type` for type-only imports
- `erasableSyntaxOnly` — no enums, no namespaces, no parameter properties

## Style
- Files use 2-space indentation (not 4)
