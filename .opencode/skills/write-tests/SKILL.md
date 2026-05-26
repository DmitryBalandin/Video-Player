---
name: write-tests
description: >-
  Use when writing or editing Vitest browser-mode tests for this project.
  Covers conventions, positive/negative/edge-case patterns for utils,
  XState machines, React components, and context integration.
---

# Write Tests — Video-Player

## Conventions

- All tests in `tests/` directory, mirroring `src/` structure
- File naming: `<module>.test.ts` or `<module>.test.tsx`
- One test runner: Vitest browser mode with Playwright (Chromium, headless)
- Import `expect`, `test`, `vi` explicitly from `vitest`
- Type-only imports use `import type { ... }`
- Follow Biome rules: 2-space indent, single quotes, semicolons
- Run `npm run test:run` after writing tests, then `npm run check`

## Three test types

| Type | What | Example |
|------|------|---------|
| **Positive** (happy path) | Valid inputs, expected state transitions, UI renders | `formatTime(65) → '1:05'` |
| **Negative** (unhappy path) | Invalid/forbidden inputs, impossible state transitions | `actor.send({ type: 'MUTE' })` when already muted |
| **Edge** (boundary/corner) | Min/max values, empty/null, rapid interactions, 0, Infinity, NaN | `formatTime(0)`, `formatTime(Infinity)` |

## Patterns per module type

### Utils (pure functions)

```
tests/utils/formatTime.test.ts
tests/utils/throttle.test.ts
```

- **Positive**: normal range inputs (e.g. `5`, `65`, `3661` for formatTime)
- **Negative**: non-finite values (`NaN`, `Infinity`), missing args
- **Edge**: zero, negative numbers (even if contract says none — test defensively)

### XState machine

```
tests/machine/machineVideo.test.ts
```

Use `setup()` and interpret the machine directly — no React needed even in browser mode.

```ts
import { expect, test } from 'vitest'
import { machine } from '../../src/machine/machineVideo'

function createMachine(...reachableStates: string[][]) {
  let actor = machine.newInstance({ systemId: 'test' })
  // send events to reach initial state, or start fresh
  return actor
}
```

- **Positive**: each transition `PLAY → playing`, `PAUSE → paused`, `MUTE → muted`, `UNMUTE → unmuted`, `TOGGLE_MUTE → `muted/unmuted flip, `DETACH → detached`, `CLOSE_DETACHED → inline + PAUSE raise`
- **Negative**: send `MUTE` while already `muted` → no transition; send an unknown event → no change
- **Edge**: `CLOSE_DETACHED` raises `PAUSE` (check that playback goes to paused); `SET_VOLUME` raises `UNMUTE`; `TOGGLE_SIZE` flips `small ↔ large`; check `state.can(...)` before sending
- **Context checks**: after `SET_CURRENT_TIME { currentTime: 42 }` → `state.context.currentTime === 42`

### React components

```
tests/components/VideoPlayerModal.test.tsx
tests/components/GroupControlsButtons.test.tsx
tests/components/VideoProgress.test.tsx
tests/components/TitleModal.test.tsx
```

Use `vitest-browser-react` to render components inside `VideoPlayerContext.Provider` with a test machine instance.

```tsx
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { VideoPlayerContext } from '../../src/machine/VideoPlayerContext'
import { machine } from '../../src/machine/machineVideo'

function renderWithContext(ui: React.ReactElement) {
  return render(
    <VideoPlayerContext.Provider>
      {ui}
    </VideoPlayerContext.Provider>
  )
}
```

- **Positive**: component renders, elements appear in DOM, click dispatches events
- **Negative**: component handles null/undefined props, empty state (video not loaded)
- **Edge**: slider at min/max values, rapid button clicks, keyboard interactions (Space, Enter), aria labels
- Use `await expect.element(page.getByText(...)).toBeInTheDocument()`
- Use `await page.getByRole('button').click()` for interactions
- Use `await page.getByLabelText(...).fill(value)` for form inputs
- For `VideoProgress`: check that slider value updates when context.currentTime changes

### Context + integration

- Verify that `VideoPlayerContext.Provider` renders children
- Verify that machine state changes propagate to component selectors (e.g. `isPlaying` updates on PLAY/PAUSE)
- Verify `actorRef.send(...)`) updates `state.context`

## Key API references

| Import | From | Usage |
|--------|------|-------|
| `test`, `expect`, `vi` | `vitest` | Core test API |
| `render` | `vitest-browser-react` | Render React components in browser |
| `page` | `vitest/browser` | Locator API (`getByRole`, `getByText`, `getByLabelText`) |
| `userEvent` | `vitest/browser` | User interaction helpers |
| `expect.element(...)` | `vitest/browser` | DOM assertions (`toBeInTheDocument`, `toHaveTextContent`, etc.) |

## TypeScript constraints (keep these in mind)

- `verbatimModuleSyntax` → always `import type` for type-only imports
- `erasableSyntaxOnly` → no enums, no namespaces, no parameter properties
- `noUnusedLocals` / `noUnusedParameters` → remove unused variables, prefix ignored params with `_`

## After writing tests

1. `npm run test:run` — all tests pass
2. `npm run check` — Biome passes (no formatting/lint errors)
