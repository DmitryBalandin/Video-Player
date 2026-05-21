import VideoPlayerModal from './components/VideoPlayerModal';
import { VideoPlayerContext } from './machine/VideoPlayerContext';

function App() {
  return (
    <VideoPlayerContext.Provider>
      <VideoPlayerModal />
    </VideoPlayerContext.Provider>
  );
}

export default App;
