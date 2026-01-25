import ReactPlayer from 'react-player'
import { useState } from 'react';
const VideoPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const handleButton = () => setIsPlaying((prev) => !prev)
    return (
        <ReactPlayer
            src='https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8'
            playing={isPlaying}
        />
    )
};

export default VideoPlayer;