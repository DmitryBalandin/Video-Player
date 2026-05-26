# 🎬 Video Player

Video player with state management based on **finite state machine** (XState).

---

## 🚀 Demo

Live demo: [video-player-zw3m.onrender.com](https://video-player-zw3m.onrender.com)

---

## 🎯 Features

- Finite state machine with [XState](https://xstate.js.org/) v5 – parallel regions for playback, mute, and UI state
- Full **TypeScript** support
- Built with **React** and **Vite**
- Clear separation of UI logic and player state
- Size toggle (small/large modal width)
- Detach mode — pop player into a separate modal window
- Volume control with mute toggle
- Video progress bar with seeking

---

## 🔄 State machine

The player uses a **parallel** finite state machine ([XState](https://xstate.js.org/) v5) with three independent regions:

| Region | States |
|--------|--------|
| `playback` | `playing` / `paused` |
| `muted` | `muted` / `unmuted` |
| `ui` | `inline` / `detached` |

All regions run simultaneously — e.g. the player can be `playing` + `unmuted` + `detached`.

### Context

```ts
{
  src: string;
  size: 'small' | 'large'; // modal width
  volume: number;           // 0–1
  currentTime: number;
  duration: number;
}
```

### Events

| Event | Effect |
|-------|--------|
| `PLAY` / `PAUSE` | Start / stop playback |
| `MUTE` / `UNMUTE` / `TOGGLE_MUTE` | Mute control |
| `SET_VOLUME { volume }` | Set volume (also unmutes) |
| `DETACH` | Open player in modal |
| `CLOSE_DETACHED` | Close modal (also pauses) |
| `TOGGLE_SIZE` | Toggle `small` ↔ `large` |
| `SET_CURRENT_TIME` / `SET_DURATION` | Sync playback position |
| `SEEK { currentTime }` | Seek to position |

---

## 🛠️ Tech stack

- **React** – UI
- **XState** – finite state machine
- **TypeScript** – type safety
- **Vite** – build tool
- **Ant Design** – UI components
- **react-player** – video player component

---

## 📦 Installation

Clone the repository:

```sh
git clone https://github.com/DmitryBalandin/Video-Player.git
cd Video-Player
```

Install dependencies:

```sh
npm ci
```

Run in development mode:

```sh
npm run dev
```

Build for production (output in `/dist` folder):

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

Lint and format code:

```sh
npm run check
```

---

## 📁 Project structure

```
src/
├── machine/            – XState state machine + context
│   ├── machineVideo.ts
│   └── VideoPlayerContext.ts
├── components/         – React components
│   ├── GroupControlsButtons.tsx
│   ├── TitleModal.tsx
│   ├── VideoPlayer.tsx
│   ├── VideoPlayerModal.tsx
│   └── VideoProgress.tsx
├── types/              – TypeScript interfaces (types.ts)
├── utils/              – Pure utility functions
│   ├── formatTime.ts
│   └── throttle.ts
├── App.tsx             – root component
└── main.tsx            – entry point

tests/                  – Vitest browser-mode tests
├── formatTime.test.ts
└── throttle.test.ts
```

---

## 🎮 Controls

- **Play/Pause** — toggle video playback (click the video or the toolbar button)
- **Size toggle** — switch modal between small (50vw) and large (100vw)
- **Detach** — inline button opens the player in a modal window
- **Volume** — slider (0–100%) with mute button
- **Seek** — drag the progress bar to jump to any position
- **Close** — close the modal (or press Escape)

---

## 🧪 Testing

Tests use **Vitest** in browser mode with Playwright (Chromium, headless).

```sh
npm test          # watch mode
npm run test:run  # single run
```

---

## 📄 License

MIT