# 🎬 Video Player

Video player with state management based on **finite state machine** (XState).

---

## 🚀 Demo

Live demo: [video-player-zw3m.onrender.com](https://video-player-zw3m.onrender.com)

---

## 🎯 Features

- Finite state machine with [XState](https://xstate.js.org/) – explicit states and transitions
- Full **TypeScript** support
- Built with **React** and **Vite**
- Clear separation of UI logic and player state
- Mini-screen mode for multitasking

---

## 🔄 State machine

The player uses a finite state machine with the following states:

- **closedPlayer** - Player is closed, only "Open" button is visible
- **openPlayer** - Player modal is open, video is paused
- **fullScreenPlaying** - Video is playing in full-screen mode
- **fullScreenPause** - Video is paused in full-screen mode
- **miniScreenPlaying** - Video is playing in mini-screen mode (50% width)
- **miniScreenPause** - Video is paused in mini-screen mode

State transitions are triggered by user actions:
- `toggle` - Open/close player
- `play`/`stop` - Play/pause video
- `fullScreen`/`miniScreen` - Switch between screen modes

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

---

## 📁 Project structure

```
src/
├── machine/          – XState state machine definition (machineVideo.ts)
├── components/       – React components
│   ├── VideoPlayer.tsx
│   ├── VideoPlayerModal.tsx
│   ├── GroupControlsButtons.tsx
│   └── TitleModal.tsx
├── types/            – TypeScript interfaces (types.ts)
└── App.tsx           – root component
```

---

## 🎮 Controls

- **Play/Pause** - Toggle video playback
- **Screen Size** - Switch between full-screen and mini-screen modes
- **Close** - Close the player modal (or press Escape)

---

## 📄 License

MIT