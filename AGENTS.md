# Video-Player — AGENTS.md

## Commands
- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (type-check then bundle)
- `npm run lint` — `biome check src/` (lints all src/ via Biome)
- `npm run format` — `biome format --write src/` (auto-format all src/)
- `npm run check` — `biome check --write src/` (lint + format + organize imports in one pass)
- No standalone typecheck script; type-checking only via `build`
- `npm test` / `npm run test` — Vitest watch mode
- `npm run test:run` — Vitest single run (browser mode, Playwright Chromium)
- `npm run test:ui` — Vitest with UI (`npm install -D @vitest/ui` first)
- `npm run preview` — Vite preview of production build

## Architecture
- **Entry**: `src/main.tsx` → `src/App.tsx` → `VideoPlayerModal` wrapped in `VideoPlayerContext.Provider`
- **State machine**: XState v5 parallel machine (`src/machine/machineVideo.ts`) with 3 regions: `playback` (playing|paused), `muted` (muted|unmuted), `ui` (inline|detached)
- **Context**: `createActorContext` from `@xstate/react` (`src/machine/VideoPlayerContext.ts`)
- **UI**: Ant Design v6 (note: uses new `variant` prop on Button, not `type`)
- **Video**: `react-player` with HLS test stream (hardcoded in machine context)
- **Utils**: `src/utils/formatTime.ts` (time formatter `m:ss`) and `src/utils/throttle.ts` (leading-edge throttle)
- **Tests**: Vitest browser mode (Playwright Chromium) in `tests/`, mirroring `src/` structure
- **No routing, no codegen, no migrations, no env files**
- **Biome** covers both `src/` and `tests/` (`biome.json: includes: ["src/**", "tests/**"]`)

## TypeScript constraints
- `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax` are all strict — use `import type` for type-only imports
- `erasableSyntaxOnly` — no enums, no namespaces, no parameter properties

## Style
- Files use 2-space indentation (not 4)

## chrome-devtools MCP

The project includes a local MCP server for browser automation via Chrome DevTools Protocol (CDP). It is defined in `opencode.json` under the `chrome-devtools` key and is started automatically by OpenCode.

### Architecture

```
Windows                          WSL2
┌──────────────┐                ┌─────────────────────┐
│  Chrome.exe  │  :9222         │  chrome-devtools    │
│  (GUI+CDP)   │────┐           │  -mcp (stdio)       │
│  port 9222   │    │           │       ↑             │
└──────┬───────┘    │           │  OpenCode agent     │
       │            │           └─────────────────────┘
       │ portproxy  │ 172.x.x.x:9223
       │ 9223→9222  │
       └────────────┘
```

Chrome runs on **Windows** (with GUI). WSL2 uses NAT networking (no mirrored mode). A `netsh portproxy` on Windows forwards `0.0.0.0:9223` → `127.0.0.1:9222`. The `chrome-mcp` script dynamically resolves the Windows gateway IP from WSL and connects to port `9223`.

### Prerequisites (one-time)

1. **Windows Chrome** must be installed on the host.
2. **One-time portproxy + firewall** already set up on Windows (PowerShell Admin):
   ```powershell
   netsh interface portproxy add v4tov4 listenport=9223 listenaddress=0.0.0.0 connectport=9222 connectaddress=127.0.0.1
   New-NetFirewallRule -DisplayName "Allow MCP Chrome Debug" -Direction Inbound -Protocol TCP -LocalPort 9223 -Action Allow
   ```
3. **`chrome-debug`** launcher script at `~/.local/bin/chrome-debug`.
4. **`chrome-debug.bat`** shortcut at `C:\Temp\chrome-debug.bat` — double-click to launch Chrome with remote debugging.

### Workflow (для новой сессии)

1. **Запустить Chrome на Windows:**
   - Двойной клик по `C:\Temp\chrome-debug.bat`
   - Или из WSL: `chrome-debug`
   - Chrome откроется с флагами: `--remote-debugging-port=9222 --remote-debugging-address=0.0.0.0` и отдельным профилем

2. **Запустить dev-сервер:** `npm run dev` (если ещё не запущен)

3. **Проверить:** `chrome-status` — инструмент покажет статус Chrome, MCP, portproxy и список вкладок

4. **Работать через OpenCode** — MCP chrome-devtools подключается автоматически.
   Доступные MCP-инструменты:
   - `navigate_page` — загрузить URL (например `http://localhost:5173/`)
   - `take_screenshot` — скриншот viewport или full-page
   - `take_snapshot` — a11y-дерево для поиска элементов
   - `click`, `fill`, `fill_form` — взаимодействие с UI
   - `list_console_messages` / `list_network_requests` — консоль и сеть
   - `performance_start_trace` / `performance_stop_trace` — Core Web Vitals
   - `lighthouse_audit` — accessibility / best-practices / SEO

5. **По завершении:**
   - Закрыть Chrome (обычно или через `chrome-kill`)
   - MCP сервер завершится автоматически

### Verifying it is running

```bash
WINDOWS_IP=$(ip route show default | awk '{print $3}')
curl -s "http://${WINDOWS_IP}:9223/json/version"
opencode mcp ls
```

### Troubleshooting

| Проблема | Причина | Решение |
|----------|---------|---------|
| MCP tools показывают "Not connected" | Chrome не запущен, или MCP запущен до Chrome | `chrome-start` или двойной клик по `.bat` |
| `curl: (52) Empty reply from server` | portproxy 9222→9222 блокирует IPv4 | `netsh interface portproxy delete v4tov4 listenport=9222 listenaddress=0.0.0.0` (PowerShell Admin) |
| Ошибка `bind() returned an error` | Порт 9222 занят другим процессом или portproxy | `chrome-kill`, затем `chrome-start` |
| `ECONNRESET` / Connection refused | Chrome закрыт или не успел запуститься | Проверить `chrome-status`, запустить `chrome-start` |
| Windows IP изменился | После перезагрузки WSL2 | Не нужно ничего делать — `chrome-mcp` определяет IP динамически |
| MCP не перезапускается после `kill` | OpenCode не restart-ит упавшие MCP | Перезапустить OpenCode |
| Видео не найдено (`document.querySelector("video")`) | `react-player` рендерит `<hls-video>`, а не `<video>` | Использовать `document.querySelector("hls-video")` |
| HLS запросы дублируются в Network | Это нормально для HLS при переключении качества | Игнорировать |
| **Ошибка в консоли:** `element.getBoundingClientRect is not a function` | Происходит из приложения / react-player, не связана с MCP | Игнорировать |

### Custom Tools

| Инструмент | Описание |
|-----------|----------|
| `chrome-status` | Проверяет: Chrome (`:9223`), MCP, portproxy, список вкладок, dev-сервер — единый дашборд |
| `chrome-start` | Запускает Chrome с remote debugging (если ещё не запущен) и ждёт готовности |
| `chrome-kill` | Убивает все chrome.exe на Windows, проверяет что порт освободился |
| `countString` | Считает строки в `src/components/`, предупреждает если >150 |
