import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import { videoActor } from './machine/videoActor.ts';

videoActor.start();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
};

const root = createRoot(rootElement);
root.render(<App />);
